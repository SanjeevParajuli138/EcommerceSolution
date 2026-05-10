import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-earth-bg text-earth-text font-sans selection:bg-earth-green selection:text-white pb-24">
            {/* HERO SECTION */}
            <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                        Cultivate a <br />
                        <span className="italic text-earth-green">mindful</span> space.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 font-light max-w-md">
                        Organic materials, slow craftsmanship, and timeless design for the modern home.
                    </p>
                    <div className="pt-4 flex gap-4">
                        <Link
                            to="/products"
                            className="bg-earth-accent text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-soft"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
                        alt="Earthy Interior"
                        className="w-full h-[500px] object-cover rounded-[2.5rem] shadow-soft"
                    />
                </div>
            </section>

            {/* CURATED FAVORITES */}
            <section className="px-6 md:px-12 mt-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif italic text-earth-green">Curated Favorites</h2>
                    <p className="text-gray-500 mt-2 font-light">Pieces we love right now.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group cursor-pointer">
                        <div className="w-full aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm mb-6">
                            <img src="https://images.unsplash.com/photo-1610505466038-16e737145f8f?q=80&w=800&auto=format&fit=crop" alt="Ceramic Vase" className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-serif">Stoneware Vase</h3>
                            <p className="text-earth-accent mt-1">Rs. 3200</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="group cursor-pointer mt-0 md:mt-12">
                        <div className="w-full aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm mb-6">
                            <img src="https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=800&auto=format&fit=crop" alt="Linen Throw" className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-serif">Woven Linen Throw</h3>
                            <p className="text-earth-accent mt-1">Rs. 4500</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="group cursor-pointer">
                        <div className="w-full aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm mb-6">
                            <img src="https://images.unsplash.com/photo-1603006905393-21b369c02d53?q=80&w=800&auto=format&fit=crop" alt="Table Lamp" className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-serif">Terracotta Lamp</h3>
                            <p className="text-earth-accent mt-1">Rs. 8900</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}