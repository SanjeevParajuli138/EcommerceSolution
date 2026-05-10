import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/product").then(res => setProducts(res.data));
    }, []);

    const addToCart = async (id) => {
        await api.post(`/cart/add?productId=${id}&quantity=1`);
        alert("Added to cart");
    };

    return (
        <div className="min-h-screen bg-earth-bg text-earth-text font-sans py-16 px-6 md:px-12 selection:bg-earth-green selection:text-white">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-earth-green italic mb-4">Our Collection</h1>
                    <p className="text-gray-500 font-light max-w-lg mx-auto">Thoughtfully designed pieces for your everyday rituals.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((p) => (
                        <div key={p.id} className="group flex flex-col bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-soft transition-all duration-300 border border-gray-100">
                            <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden relative cursor-pointer bg-earth-bg">
                                <img
                                    src={`https://localhost:7068${p.imageUrl}`}
                                    alt={p.name}
                                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                                />
                                {console.log(p) }
                            </div>

                            <div className="mt-6 px-2 flex flex-col flex-grow">
                                <h2 className="text-xl font-serif font-medium">{p.name}</h2>
                                <p className="text-sm text-gray-500 mt-2 font-light leading-relaxed flex-grow">{p.description}</p>
                                
                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-lg text-earth-accent font-medium">Rs. {p.price}</p>
                                    <button
                                        onClick={() => addToCart(p.id)}
                                        className="bg-earth-green text-white px-5 py-2 rounded-full text-sm hover:bg-opacity-90 transition-all"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}