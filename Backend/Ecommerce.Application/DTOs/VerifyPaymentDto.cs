using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs
{
    public class VerifyPaymentDto
    {
        public int OrderId { get; set; }

        public string Pidx { get; set; } = string.Empty;
    }
}
