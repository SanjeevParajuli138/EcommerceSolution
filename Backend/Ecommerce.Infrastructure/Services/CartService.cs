using Ecommerce.Application.Interfaces;
using Ecommerce.Domain.Entities;
using Ecommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Infrastructure.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;

        public CartService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddtoCart(int userId, int productId, int quantity)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
            }

            var product = await _context.Products.FindAsync(productId);

            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);

            if (item == null)
            {
                cart.Items.Add(new CartItem
                {
                    ProductId = productId,
                    Quantity = quantity,
                    Price = product!.Price,
                });
            }
            else
            {
                item.Quantity += quantity;
            }

            await _context.SaveChangesAsync();

        }

        public async Task<Cart> GetCart(int userId)
        {
            return await _context.Carts.Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId) ?? new Cart();
        }

        public async Task RemoveItem(int userId, int productId)
        {
           var cart = await _context.Carts.Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            var item = cart?.Items.FirstOrDefault(i => i.ProductId == productId);

            if (cart != null)
            {
                if (item != null)
                {
                    cart!.Items.Remove(item);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public async Task RemoveFromCart(int userId, int productId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                return;

            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);

            if (item == null)
                return;

            _context.CartItems.Remove(item);

            await _context.SaveChangesAsync();
        }

        public async Task ChangeQuantity(int userId, int productId, int amount)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                return;

            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);

            if (item == null)
                return;

            item.Quantity += amount;

            if (item.Quantity <= 0)
            {
                _context.CartItems.Remove(item);
            }

            await _context.SaveChangesAsync();
        }
    }
}
