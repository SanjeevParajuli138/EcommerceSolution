using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs
{
    public class CheckoutDto
    {
        public List<int> CartItemIds { get; set; } = [];

    }
}
