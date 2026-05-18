import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* AUTH */}
                <Route path="/login" element={<Auth />} />

                {/* MAIN LAYOUT */}
                <Route element={<MainLayout />}>

                    <Route path="/" element={<Home />} />

                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <Admin />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/products/:id"
                        element={
                            <ProtectedRoute>
                                <ProductDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/payment-success"
                        element={
                            <ProtectedRoute>
                                <PaymentSuccess />
                            </ProtectedRoute>
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;