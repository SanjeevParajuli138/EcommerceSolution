using Ecommerce.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public decimal TotalAmount { get; set; }

        public List<OrderItem> Items { get; set; } = new();

        public PaymentMethod PaymentMethod { get; set; }

        public PaymentStatus PaymentStatus { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public string? TransactionId { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    }
}
