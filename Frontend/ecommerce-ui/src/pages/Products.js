import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await api.get("/product");
                setProducts(res.data);
            } finally {
                setLoading(false); // ✅ safe here
            }
        };

        fetchData();
    }, []);
    if (loading) return <Loader />;

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
                        <ProductCard
                            key={p.id}
                            product={p}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}