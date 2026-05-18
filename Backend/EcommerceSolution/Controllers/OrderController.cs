using Ecommerce.Application.DTOs;
using Ecommerce.Application.Interfaces;
using Ecommerce.Domain.Enums;
using Ecommerce.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IPaymentService _paymentService;
        public OrderController(IOrderService orderService, IPaymentService paymentService)
        {
            _orderService = orderService;
            _paymentService = paymentService;
        }
        private int GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (claim == null)
                throw new Exception("User ID claim not found in token");

            return int.Parse(claim.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserOrders()
        {
            return Ok(await _orderService.GetUserOrders(GetUserId()));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateOrderDto dto)
        {
            var order = await _orderService
                .CreateOrder(
                    GetUserId(),
                    dto
                );
            // KHALTI
            if (dto.PaymentMethod == PaymentMethod.Khalti)
            {
                var paymentUrl = await _paymentService
                    .InitiateKhaltiPayment(
                        order.TotalAmount,
                        order.Id.ToString()
                    );

                return Ok(new
                {
                    success = true,
                    paymentUrl
                });
            }
            return Ok(order);
        }

    }
}
