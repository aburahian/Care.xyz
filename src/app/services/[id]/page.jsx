import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import staticServices from "@/lib/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Clock, CheckCircle2, ArrowRight, Heart, Sparkles } from "lucide-react";

async function getService(id) {
    try {
        await dbConnect();
        // Try finding by ID first
        let service = await Service.findById(id).catch(() => null);

        // If not found, try finding by slug/name match
        if (!service) {
            const allServices = await Service.find({});
            service = allServices.find(s => s.name.toLowerCase().replace(/\s+/g, "-") === id);
        }

        // Fallback to static services
        if (!service) {
            service = staticServices.find(s => s.name.toLowerCase().replace(/\s+/g, "-") === id);
        }

        return service;
    } catch (err) {
        return staticServices.find(s => s.name.toLowerCase().replace(/\s+/g, "-") === id);
    }
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const service = await getService(id);

    return {
        title: service ? `${service.name} - Care.xyz` : 'Service Not Found',
        description: service ? service.description : 'Details about our care services.',
    }
}

export default async function ServiceDetailPage({ params }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Hero Header */}
            <div className="bg-indigo-900 pt-32 pb-40 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-indigo-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-700/50">
                                <Sparkles className="w-4 h-4 text-indigo-300" />
                                <span className="text-indigo-200 text-xs font-black uppercase tracking-widest">{service.category || 'Premium Care'}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                                {service.name}
                            </h1>
                            <p className="text-xl text-indigo-100/80 font-medium max-w-2xl leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex flex-col">
                                    <span className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-1">Price per hour</span>
                                    <span className="text-4xl font-black text-white">${service.price}</span>
                                </div>
                                <div className="h-12 w-px bg-indigo-700/50" />
                                <div className="flex flex-col">
                                    <span className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-1">Availability</span>
                                    <span className="text-xl font-bold text-white">24/7 Support</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full lg:max-w-xl">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-indigo-500/20 rounded-[3rem] blur-2xl group-hover:bg-indigo-500/30 transition-all" />
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="relative w-full aspect-[4/3] object-cover rounded-[2.5rem] shadow-2xl border border-white/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <div className="bg-indigo-50 p-2 rounded-xl">
                                    <Heart className="w-6 h-6 text-indigo-600" />
                                </div>
                                What's included in this service?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    "Professional and vetted caretakers",
                                    "24/7 availability and support",
                                    "Comprehensive liability insurance",
                                    "Daily progress and health reports",
                                    "Personalized care plans",
                                    "Emergency rapid response team"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 bg-emerald-50 p-1 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-slate-600 font-bold leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-indigo-600 rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl shadow-indigo-200">
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                                <div className="space-y-4 text-center md:text-left">
                                    <h3 className="text-3xl font-black tracking-tight">Need a customized plan?</h3>
                                    <p className="text-indigo-100 font-medium text-lg">Talk to our experts about a specialized care routine for your specific needs.</p>
                                </div>
                                <button className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl active:scale-95 whitespace-nowrap">
                                    Talk to Expert
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-slate-100 sticky top-28">
                            <h3 className="text-2xl font-black text-slate-900 mb-6">Book Now</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between py-4 border-b border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-indigo-600" />
                                        <span className="text-slate-500 font-bold">Min. Duration</span>
                                    </div>
                                    <span className="text-slate-900 font-black">1 Hour</span>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                                        <span className="text-slate-500 font-bold">Service Type</span>
                                    </div>
                                    <span className="text-slate-900 font-black">On-Demand</span>
                                </div>
                            </div>

                            <Link
                                href={`/booking/${id}`}
                                className="group flex items-center justify-center w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-[0.98]"
                            >
                                Book this Service
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <p className="text-center text-slate-400 text-xs font-bold mt-6 uppercase tracking-widest">
                                Secure booking via Care.xyz
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
