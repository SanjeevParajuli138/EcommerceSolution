using Ecommerce.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Text.Json;

namespace Ecommerce.Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public PaymentService(
        HttpClient httpClient,
        IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<string> InitiateKhaltiPayment(decimal amount, string purchaseOrderId)
    {
        var payload = new
        {
            return_url = "http://localhost:3000/payment-success",
            website_url = "http://localhost:3000",
            amount = amount * 100,
            purchase_order_id = purchaseOrderId,
            purchase_order_name = "Ecommerce Order"
        };

        var request = new HttpRequestMessage(
            HttpMethod.Post,
            $"{_config["Khalti:BaseUrl"]}/api/v2/epayment/initiate/"
        );

        request.Headers.Add(
            "Authorization",
            $"Key {_config["Khalti:SecretKey"]}"
        );

        request.Content = new StringContent(
            System.Text.Json.JsonSerializer.Serialize(payload),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.SendAsync(request);

        var json = await response.Content.ReadAsStringAsync();

        Console.WriteLine(json);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Khalti Error: {json}");
        }

        using var doc = System.Text.Json.JsonDocument.Parse(json);

        if (doc.RootElement.TryGetProperty(
            "payment_url",
            out var paymentUrl))
        {
            return paymentUrl.GetString()!;
        }

        throw new Exception("payment_url not found");
    }

    public async Task<bool> VerifyKhalti(string pidx)
    {
        var request = new HttpRequestMessage(
            HttpMethod.Post,
            $"{_config["Khalti:BaseUrl"]}/api/v2/epayment/lookup/"
        );

        request.Headers.Add(
            "Authorization",
            $"Key {_config["Khalti:SecretKey"]}"
        );

        request.Content = new StringContent(
            JsonSerializer.Serialize(new
            {
                pidx = pidx
            }),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient
            .SendAsync(request);

        var json = await response
            .Content
            .ReadAsStringAsync();

        using var doc = JsonDocument.Parse(json);

        if (!doc.RootElement.TryGetProperty(
    "status",
    out var statusElement))
        {
            Console.WriteLine(json);

            throw new Exception(
                "Status not found in Khalti response"
            );
        }

        var status = statusElement.GetString();

        return status == "Completed";
    }
}