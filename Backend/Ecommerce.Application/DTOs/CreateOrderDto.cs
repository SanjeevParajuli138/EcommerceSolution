using Ecommerce.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs
{
    public class CreateOrderDto
    {
        public List<int> CartItemIds { get; set; } = [];

        public PaymentMethod PaymentMethod { get; set; }

    }
}
