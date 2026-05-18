using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.Interfaces
{
    public interface IPaymentService
    {
        Task<string> InitiateKhaltiPayment(decimal amount, string purchaseOrderId);

        Task<bool> VerifyKhalti(string pidx);
    }
}