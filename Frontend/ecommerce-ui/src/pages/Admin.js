import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Admin() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stockQuantity, setQuantity] = useState("");
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState(null);

    const startEdit = (product) => {
        setEditId(product.id);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.stockQuantity);
        setImage(null);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await api.get("/product");
        setProducts(res.data);
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete product?")) return;
        await api.delete(`/product/${id}`);
        fetchProducts();
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stockQuantity", stockQuantity);
        formData.append("imageUrl", image);

        if (editId) {
            await api.put(`/product/${editId}`, formData);
            alert("Product updated!");
        } else {
            await api.post("/product", formData);
            alert("Product added!");
        }

        setEditId(null);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImage(null);
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-earth-bg text-earth-text font-sans py-16 px-6 md:px-12 selection:bg-earth-green selection:text-white">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-serif text-earth-green italic mb-2">Curator Dashboard</h1>
                    <p className="text-gray-500 font-light">Manage your collection.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-2xl font-serif font-medium mb-8 text-center">
                                {editId ? "Update Item" : "Add New Item"}
                            </h2>
                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full bg-earth-bg px-4 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-earth-accent transition-all text-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Description"
                                        className="w-full bg-earth-bg px-4 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-earth-accent transition-all text-sm resize-none h-24"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        className="w-full bg-earth-bg px-4 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-earth-accent transition-all text-sm"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        className="w-full bg-earth-bg px-4 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-earth-accent transition-all text-sm"
                                        value={stockQuantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-earth-bg file:text-earth-text hover:file:bg-gray-200 transition-colors cursor-pointer"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-earth-green text-white py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-soft mt-4"
                                >
                                    {editId ? "Save Item" : "Create Item"}
                                </button>
                                {editId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditId(null);
                                            setName("");
                                            setDescription("");
                                            setPrice("");
                                            setQuantity("");
                                            setImage(null);
                                        }}
                                        className="w-full text-gray-500 py-3 rounded-full text-sm font-medium hover:bg-earth-bg transition-all mt-2"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Product List Section */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-serif font-medium mb-8 text-center lg:text-left">Inventory</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {products.map((p) => (
                                <div key={p.id} className="bg-white rounded-3xl p-5 flex flex-col justify-between shadow-sm border border-gray-100">
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-20 h-24 bg-earth-bg rounded-2xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={`https://localhost:7068${p.imageUrl}`}
                                                alt={p.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-serif font-medium leading-tight">{p.name}</h3>
                                            <p className="text-earth-accent text-sm mt-1">Rs. {p.price}</p>
                                            <p className="text-gray-400 text-xs mt-1">Stock: {p.stockQuantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => startEdit(p)}
                                            className="flex-1 bg-earth-bg text-earth-text py-2 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(p.id)}
                                            className="flex-1 border border-red-200 text-red-500 py-2 rounded-full text-xs font-medium hover:bg-red-50 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}