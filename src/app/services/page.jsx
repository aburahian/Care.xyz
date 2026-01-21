"use client";

import { useEffect, useState } from "react";
import ServiceCard from "@/components/shared/ServiceCard";
import staticServices from "@/lib/services";
import { Sparkles, Search, Filter } from "lucide-react";

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchServices = (page) => {
        setLoading(true);
        fetch(`/api/services?page=${page}&limit=6`)
            .then((res) => res.json())
            .then((data) => {
                if (data.services && Array.isArray(data.services)) {
                    setServices(data.services);
                    setTotalPages(data.totalPages);
                    setCurrentPage(data.currentPage);
                } else if (Array.isArray(data)) {
                    setServices(data);
                } else {
                    setServices(staticServices);
                }
            })
            .catch(() => setServices(staticServices))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchServices(currentPage);
    }, [currentPage]);

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Header Section */}
            <div className="bg-indigo-900 pt-32 pb-24 px-4 text-center">
                <div className="inline-flex items-center space-x-2 bg-indigo-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-700/50 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    <span className="text-indigo-200 text-xs font-black uppercase tracking-widest">Our Offerings</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 transition-all">
                    Premium Care <span className="text-indigo-400">Services</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-indigo-100/80 font-medium">
                    Choose from our wide range of professional care services designed to provide comfort and safety for your loved ones.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 -mt-12">
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-3xl p-4 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-4 mb-16">
                    <div className="flex-1 relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for care services..."
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-900"
                        />
                    </div>
                    <button className="flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95 gap-2">
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-4 border border-slate-100 animate-pulse">
                                <div className="bg-slate-100 rounded-[1.5rem] aspect-[4/3] mb-6"></div>
                                <div className="h-6 bg-slate-100 rounded-full w-2/3 mb-4"></div>
                                <div className="h-4 bg-slate-100 rounded-full w-full mb-2"></div>
                                <div className="h-4 bg-slate-100 rounded-full w-4/5 mb-8"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-8 bg-slate-100 rounded-full w-1/4"></div>
                                    <div className="h-12 bg-slate-100 rounded-2xl w-1/3"></div>
                                    {/* Pagination Controls */}
                                    {!loading && totalPages > 1 && (
                                        <div className="flex justify-center items-center mt-12 gap-4">
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
                                            >
                                                Previous
                                            </button>

                                            <div className="flex gap-2">
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`w-12 h-12 rounded-xl font-black transition-all ${currentPage === page
                                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                                                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard key={service.name} service={service} />
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-12 h-12 rounded-xl font-black transition-all ${currentPage === page
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
