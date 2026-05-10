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
        Task<Order> Checkout(int userId);
        Task<List<Order>> GetUserOrders(int userId);
    }
}
