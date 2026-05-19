using Ecommerce.Application.Interfaces;
using Ecommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Infrastructure.Services
{
    public class CommonService : ICommonService
    {
        private readonly AppDbContext _context;

        public CommonService(AppDbContext context)
        {
            _context = context;
        }
        public async Task ReduceStock(int orderId)
        {
            var order = await _context.Orders
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.Id == orderId);

            if (order == null)
                throw new Exception("Order not found");

            foreach (var item in order.Items)
            {
                if (item?.Product?.StockQuantity < item?.Quantity)
                {
                    throw new Exception(
                        $"{item.Product.Name} is out of stock"
                    );
                }

                item.Product.StockQuantity -= item.Quantity;
            }

            await _context.SaveChangesAsync();
        }
    }
}
