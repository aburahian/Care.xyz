"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, DollarSign, Image as ImageIcon, Layout, Type, FileText, CheckCircle2 } from "lucide-react";

export default function AddServicePage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.price = parseFloat(data.price);

        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/services");
                    router.refresh();
                }, 2000);
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Failed to add service");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="text-center animate-in fade-in zoom-in duration-500">
                    <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Service Added!</h2>
                    <p className="text-slate-500 font-medium">Redirecting you to the services page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100 text-white">
                        <PlusCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add New Service</h1>
                        <p className="text-slate-500 font-medium">Expand our care offerings with a new service category.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <Type className="w-4 h-4 mr-2 text-indigo-500" />
                                Service Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="e.g., Specialized Medical Care"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <Layout className="w-4 h-4 mr-2 text-indigo-500" />
                                Category
                            </label>
                            <select
                                name="category"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 appearance-none"
                            >
                                <option value="Baby Care">Baby Care</option>
                                <option value="Elderly Care">Elderly Care</option>
                                <option value="Sick Care">Sick Care</option>
                                <option value="Housekeeping">Housekeeping</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
                                Hourly Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
                                <input
                                    name="price"
                                    type="number"
                                    required
                                    className="w-full pl-10 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                    placeholder="45"
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <ImageIcon className="w-4 h-4 mr-2 text-indigo-500" />
                                Cover Image URL
                            </label>
                            <input
                                name="image"
                                type="url"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                                Description
                            </label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="Describe the service details, what's included, etc."
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Adding Service...' : 'Create Service Entry'}
                    </button>
                </form>
            </div>
        </div>
    );
}
