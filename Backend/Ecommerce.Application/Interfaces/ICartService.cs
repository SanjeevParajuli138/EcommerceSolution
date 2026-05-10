using Ecommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.Interfaces
{
    public interface ICartService
    {
        Task AddtoCart(int userId, int productId, int quantity);
        Task<Cart> GetCart(int userId);
        Task RemoveItem(int userId, int productId);
        Task RemoveFromCart(int userId, int productId);
        Task ChangeQuantity(int userId, int productId, int amount);
    }
}
