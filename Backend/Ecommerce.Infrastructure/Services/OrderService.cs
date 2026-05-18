using Ecommerce.Application.DTOs;
using Ecommerce.Application.Interfaces;
using Ecommerce.Domain.Entities;
using Ecommerce.Domain.Enums;
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


        public async Task<Order> CreateOrder(int userId,CreateOrderDto dto)
        {
            var cartItems = await _context.CartItems
                .Where(x =>
                    dto.CartItemIds.Contains(x.Id))
                .ToListAsync();

            if (!cartItems.Any())
                throw new Exception("No cart items");

            var order = new Order
            {
                UserId = userId,

                PaymentMethod = dto.PaymentMethod,

                PaymentStatus =
                    dto.PaymentMethod == PaymentMethod.COD
                    ? PaymentStatus.Paid
                    : PaymentStatus.Pending,

                OrderStatus =
                    dto.PaymentMethod == PaymentMethod.COD
                    ? OrderStatus.Processing
                    : OrderStatus.Pending,

                TotalAmount = cartItems.Sum(x =>
                    x.Price * x.Quantity),

                Items = cartItems.Select(x => new OrderItem
                {
                    ProductId = x.ProductId,
                    Quantity = x.Quantity,
                    Price = x.Price
                }).ToList()
            };

            _context.Orders.Add(order);

            
            _context.CartItems.RemoveRange(cartItems);
            

            await _context.SaveChangesAsync();

            return order;
        }

        public async Task MarkOrderPaid(int orderId, string transactionId)
        {
            var order = await _context.Orders
                .FindAsync(orderId);

            if (order == null)
                throw new Exception("Order not found");

            order.PaymentStatus = PaymentStatus.Paid;

            order.OrderStatus = OrderStatus.Processing;

            order.TransactionId = transactionId;

            var cartItems = await _context.CartItems
                .Where(x =>
                    order.Items.Select(i => i.ProductId)
                        .Contains(x.ProductId))
                .ToListAsync();

            _context.CartItems.RemoveRange(cartItems);

            await _context.SaveChangesAsync();
        }

        public async Task MarkOrderFailed(int orderId)
        {
            var order = await _context.Orders
                .FindAsync(orderId);

            if (order == null)
                throw new Exception("Order not found");

            order.PaymentStatus = PaymentStatus.Failed;

            await _context.SaveChangesAsync();
        }
    }
}
