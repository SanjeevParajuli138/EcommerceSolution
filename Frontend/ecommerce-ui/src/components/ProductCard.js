import { Link } from "react-router-dom";
export default function ProductCard({ product, addToCart }) {
    return (
        <div className="group flex flex-col bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-soft transition-all duration-300 border border-gray-100">

            <Link to={`/products/${product.id}`}>

                <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden relative cursor-pointer bg-earth-bg">
                    <img
                        src={`https://localhost:7068${product.imageUrl}`}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                </div>

                <div className="mt-6 px-2 flex flex-col flex-grow">
                    <h2 className="text-xl font-serif font-medium">
                        {product.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 font-light leading-relaxed flex-grow">
                        {product.description}
                    </p>
                </div>

            </Link>

            <div className="mt-6 flex items-center justify-between px-2">
                <p className="text-lg text-earth-accent font-medium">
                    Rs. {product.price}
                </p>

                <button
                    onClick={() => addToCart(product.id)}
                    className="bg-earth-green text-white px-5 py-2 rounded-full text-sm hover:bg-opacity-90 transition-all"
                >
                    Add to Cart
                </button>
            </div>

        </div>
    );
}