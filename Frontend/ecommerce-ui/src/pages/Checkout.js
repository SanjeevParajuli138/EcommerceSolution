import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {

  const { state } = useLocation();

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const items = state?.items || [];
  const total = state?.total || 0;

  return (
    <div className="min-h-screen bg-earth-bg px-6 py-12">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">

          <h1 className="text-4xl font-serif mb-8">
            Checkout
          </h1>

          <div className="space-y-5">

            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >

                <div>
                  <h2 className="font-medium">
                    Product #{item.productId}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  Rs. {item.price * item.quantity}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl p-8 shadow-sm h-fit sticky top-10">

          <h2 className="text-2xl font-serif mb-6">
            Payment
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              Cash on Delivery
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="KHALTI"
                checked={paymentMethod === "KHALTI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              Khalti
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="ESEWA"
                checked={paymentMethod === "ESEWA"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              eSewa
            </label>

          </div>

          <div className="mt-10">

            <div className="flex justify-between mb-6">
              <span>Total</span>
              <span className="font-bold text-2xl">
                Rs. {total}
              </span>
            </div>

            <button
              className="w-full bg-earth-green text-white py-4 rounded-full"
            >
              Continue Payment
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}