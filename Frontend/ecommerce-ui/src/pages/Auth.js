import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? "/auth/login" : "/auth/register";
            const res = await api.post(endpoint, { email, password });
            localStorage.setItem("token", res.data.token);
            alert(isLogin ? "Login successful" : "Registration successful");
            navigate("/products");
        } catch (err) {
            alert(err.response?.data || "Authentication failed");
        }
    };

    return (
        <div className="min-h-screen bg-earth-bg flex items-center justify-center py-24 px-6 selection:bg-earth-green selection:text-white">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-earth-green italic">
                        {isLogin ? "Welcome Back" : "Join Our Space"}
                    </h1>
                    <p className="mt-3 text-sm text-gray-500 font-light">
                        {isLogin ? "Sign in to continue your journey." : "Create an account to begin."}
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-earth-bg px-5 py-4 rounded-2xl focus:outline-none focus:ring-1 focus:ring-earth-accent transition-all text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-earth-bg px-5 py-4 rounded-2xl focus:outline-none focus:ring-1 focus:ring-earth-accent transition-all text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-earth-accent text-white py-4 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-soft mt-4"
                    >
                        {isLogin ? "Sign In" : "Register"}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500 font-light">
                        {isLogin ? "Don't have an account?" : "Already a member?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-earth-green font-medium hover:underline"
                        >
                            {isLogin ? "Create one" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}