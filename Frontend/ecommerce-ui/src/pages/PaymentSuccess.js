import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PaymentSuccess() {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const pidx = searchParams.get("pidx");

    const orderId =
        searchParams.get("purchase_order_id");

    useEffect(() => {

        const verifyPayment = async () => {

            try {

                await api.post(
                    "/payment/verify",
                    {
                        orderId: Number(orderId),
                        pidx
                    }
                );

                alert("Payment verified");

                navigate("/orders");

            } catch (err) {

                console.log(err);

            }
        };

        if (pidx && orderId) {

            verifyPayment();

        }

    }, [pidx, orderId, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-serif">
                Verifying Payment...
            </h1>
        </div>
    );
}