import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get("/order").then((res) => setOrders(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-earth-bg text-earth-text font-sans py-16 px-6 md:px-12 selection:bg-earth-green selection:text-white">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-earth-green italic mb-4">Your Orders</h1>
                    <p className="text-gray-500 font-light">A history of your curated pieces.</p>
                </header>

                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.map((o) => (
                            <div key={o.id} className="bg-white rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm border border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Order Ref</p>
                                    <p className="text-xl font-serif font-medium">#{o.id}</p>
                                </div>
                                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Total</p>
                                    <p className="text-xl text-earth-accent font-medium">Rs. {o.totalAmount}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-16 text-center text-gray-500 font-light bg-white rounded-3xl border border-gray-100">
                            You haven't placed any orders yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}