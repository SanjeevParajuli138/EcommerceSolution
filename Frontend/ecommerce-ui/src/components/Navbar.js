import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let isAdmin = false;
    let isLoggedIn = false;

    if (token) {
        isLoggedIn = true;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            isAdmin = role === "Admin";
        } catch (e) {
            console.error("Token parsing error");
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchCartCount();
    }, []);

    const fetchCartCount = async () => {
        try {
            const res = await api.get("/cart");
            const totalItems = res.data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            setCartCount(totalItems);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className="bg-earth-text text-white px-8 py-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 shadow-soft">
            <Link to="/" className="text-3xl font-serif font-bold italic text-white mb-4 md:mb-0 hover:text-earth-accent transition-colors">
                Aura
            </Link>

            <div className="flex gap-8 items-center font-sans text-sm font-medium">
                <Link to="/" className="hover:text-earth-accent transition-colors">Home</Link>
                <Link to="/products" className="hover:text-earth-accent transition-colors">Shop</Link>
                
                <Link to="/cart" className="relative hover:text-earth-accent transition-colors flex items-center">
                    Cart
                    {cartCount > 0 && (
                        <span className="ml-1.5 bg-earth-accent text-earth-text px-2 py-0.5 text-xs rounded-full font-bold">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {isLoggedIn && <Link to="/orders" className="hover:text-earth-accent transition-colors">Orders</Link>}
                {isAdmin && <Link to="/admin" className="hover:text-earth-accent transition-colors">Admin</Link>}

                {!isLoggedIn ? (
                    <Link to="/login" className="bg-earth-accent text-earth-text px-5 py-2 rounded-full hover:bg-opacity-90 transition-all font-semibold">
                        Sign In
                    </Link>
                ) : (
                    <button
                        onClick={logout}
                        className="bg-transparent border border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-earth-text transition-all focus:outline-none font-semibold"
                    >
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    );
}