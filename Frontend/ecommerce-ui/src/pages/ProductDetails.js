import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data);
    };

    if (!product) {
        return <h1>Loading...</h1>;
    }

    const addToCart = async () => {
        try {
            await api.post("/cart/add", {
                productId: product.id,
                quantity: quantity
            });

            alert("Added to cart");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-10 rounded-3xl shadow-xl">

            {/* IMAGE */}
            <div>
                <img
                    src={`https://localhost:7068${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-[600px] object-cover rounded-3xl"
                />
            </div>

            {/* INFO */}
            <div className="flex flex-col justify-center">

                <h1 className="text-5xl font-extrabold mb-6">
                    {product.name}
                </h1>

                <p className="text-gray-500 text-lg mb-8">
                    {product.description}
                </p>

                <h2 className="text-4xl font-bold mb-8">
                    Rs. {product.price}
                </h2>

                <div className="flex items-center gap-5 mb-8">

                    <button
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        className="w-12 h-12 rounded-full bg-gray-200 text-2xl"
                    >
                        -
                    </button>

                    <span className="text-2xl font-bold">
                        {quantity}
                    </span>

                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-full bg-gray-200 text-2xl"
                    >
                        +
                    </button>

                </div>

                <button
                    onClick={addToCart}
                    className="bg-black text-white px-8 py-4 rounded-2xl text-xl hover:scale-105 transition w-fit"
                >
                    Add To Cart
                </button>

            </div>
        </div>
    );
}