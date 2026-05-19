using Ecommerce.Application.DTOs;
using Ecommerce.Application.Interfaces;
using Ecommerce.Domain.Enums;
using Ecommerce.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly IOrderService _orderService;
    private readonly ICommonService _commonService;

    public PaymentController(IPaymentService paymentService, IOrderService orderService, ICommonService commonService)
    {
        _paymentService = paymentService;
        _orderService = orderService;
        _commonService = commonService;
    }


    [HttpPost("verify")]
    public async Task<IActionResult> Verify(VerifyPaymentDto dto)
    {
        var verified = await _paymentService
            .VerifyKhalti(dto.Pidx);

        if (!verified)
        {
            await _orderService
                .MarkOrderFailed(dto.OrderId);

            return BadRequest("Payment failed");
        }

        await _orderService.MarkOrderPaid(
            dto.OrderId,
            dto.Pidx
        );

        await _commonService.ReduceStock(dto.OrderId);

        return Ok();
    }
}