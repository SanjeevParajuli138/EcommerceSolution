import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Cart() {
    const [cart, setCart] = useState(null);

    const checkout = async () => {
        try {
            await api.post("/order/checkout");
            alert("Order placed!");
        } catch (err) {
            alert(err.response?.data || "Checkout failed");
        }
    };

    useEffect(() => {
        api.get("/cart").then((res) => setCart(res.data));
    }, []);

    const total = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

    const refreshCart = async () => {
        const res = await api.get("/cart");
        setCart(res.data);
    };

    const adjustQuantity = async (id, delta) => {
        if (delta > 0) {
            await api.put(`/cart/${id}/increase`);
        } else {
            await api.put(`/cart/${id}/decrease`);
        }
        refreshCart();
    };

    const remove = async (id) => {
        await api.delete(`/cart/${id}`);
        refreshCart();
    };

    return (
        <div className="min-h-screen bg-earth-bg text-earth-text font-sans py-16 px-6 md:px-12 selection:bg-earth-green selection:text-white">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-earth-green italic mb-4">Your Bag</h1>
                    <p className="text-gray-500 font-light">Review your curated selection.</p>
                </header>

                <div className="space-y-6">
                    {cart?.items?.length > 0 ? (
                        cart.items.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-6 w-full sm:w-auto">
                                    <div className="w-24 h-24 bg-earth-bg rounded-2xl overflow-hidden flex-shrink-0">
                                        <img src={`https://localhost:7068${item.ImageUrl}`} alt={item.productId} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-serif font-medium">Product #{item.productId}</h2>
                                        <p className="text-earth-accent mt-1">Rs. {item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-6 sm:mt-0 gap-8">
                                    <div className="flex items-center bg-earth-bg rounded-full px-2 py-1">
                                        <button onClick={() => adjustQuantity(item.productId, -1)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white transition-colors">-</button>
                                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                                        <button onClick={() => adjustQuantity(item.productId, 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white transition-colors">+</button>
                                    </div>
                                    <button onClick={() => remove(item.productId)} className="text-sm font-medium text-gray-400 hover:text-earth-text underline">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-16 text-center text-gray-500 font-light bg-white rounded-3xl border border-gray-100">
                            Your bag is beautifully empty.
                        </div>
                    )}
                </div>

                {cart?.items?.length > 0 && (
                    <div className="mt-12 flex flex-col items-end">
                        <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-serif">Subtotal</span>
                                <span className="text-2xl font-medium text-earth-accent">Rs. {total}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-8 font-light">Taxes and shipping calculated at checkout.</p>
                            <button onClick={checkout} className="w-full bg-earth-green text-white py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-soft">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}