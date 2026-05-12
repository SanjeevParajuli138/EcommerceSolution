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
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        public OrderService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Order> Checkout(int userId, List<int> cartItemIds)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                throw new Exception("Cart not found");

            var selectedItems = cart.Items
                .Where(ci => cartItemIds.Contains(ci.Id))
                .ToList();

            if (!selectedItems.Any())
                throw new Exception("No items selected");

            var order = new Order
            {
                UserId = userId,
                /*CreatedAt = DateTime.UtcNow,*/
                Items = selectedItems.Select(ci => new OrderItem
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Price
                }).ToList()
            };

            _context.Orders.Add(order);

            _context.CartItems.RemoveRange(selectedItems);

            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<List<Order>> GetUserOrders(int userId)
        {
            return await _context.Orders
                .Include(o => o.Items)
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }
    }
}
