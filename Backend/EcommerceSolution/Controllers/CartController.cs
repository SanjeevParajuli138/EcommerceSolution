using Ecommerce.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        private int GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (claim == null)
                throw new Exception("User ID claim missing");

            return int.Parse(claim.Value);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(int productId, int quantity)
        {
            await _cartService.AddtoCart(GetUserId(), productId, quantity);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _cartService.GetCart(GetUserId()));
        }

        [HttpDelete]
        public async Task<IActionResult> Remove(int productId)
        {
            await _cartService.RemoveItem(GetUserId(), productId);
            return Ok();
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveFromCart(int productId)
        {
            await _cartService.RemoveFromCart(GetUserId(), productId);
            return Ok();
        }

        [HttpPut("{productId}/increase")]
        public async Task<IActionResult> IncreaseQuantity(int productId)
        {
            await _cartService.ChangeQuantity(GetUserId(), productId, 1);
            return Ok();
        }

        [HttpPut("{productId}/decrease")]
        public async Task<IActionResult> DecreaseQuantity(int productId)
        {
            await _cartService.ChangeQuantity(GetUserId(), productId, -1);
            return Ok();
        }
    }
}
