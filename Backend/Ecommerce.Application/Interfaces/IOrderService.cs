using Ecommerce.Application.DTOs;
using Ecommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.Interfaces
{
    public interface IOrderService
    {
        Task<Order> Checkout(int userId, List<int> cartItemIds);
        Task<List<Order>> GetUserOrders(int userId);
        Task<Order> CreateOrder(int userId, CreateOrderDto dto);

        Task MarkOrderPaid(int orderId, string transactionId);

        Task MarkOrderFailed(int orderId);
    }
}
