"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import staticServices from "@/lib/services";
import { Clock, MapPin, DollarSign, ChevronRight, CheckCircle2, ShieldCheck, Info } from "lucide-react";

export default function BookingPage({ params }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [service, setService] = useState(null);
    const [duration, setDuration] = useState(1);
    const [location, setLocation] = useState({
        division: "",
        district: "",
        city: "",
        area: "",
        address: "",
    });
    const [totalCost, setTotalCost] = useState(0);
    const [loading, setLoading] = useState(true);

    const locationData = {
        "Dhaka Division": ["Dhaka", "Gazipur", "Narayanganj", "Narsingdi", "Munshiganj", "Manikganj", "Tangail", "Kishoreganj", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur"],
        "Chattogram Division": ["Chattogram", "Cox’s Bazar", "Cumilla", "Brahmanbaria", "Chandpur", "Feni", "Noakhali", "Lakshmipur", "Khagrachhari", "Rangamati", "Bandarban"],
        "Rajshahi Division": ["Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj"],
        "Khulna Division": ["Khulna", "Bagerhat", "Satkhira", "Jessore", "Jhenaidah", "Narail", "Magura", "Kushtia", "Chuadanga", "Meherpur"],
        "Barishal Division": ["Barishal", "Bhola", "Patuakhali", "Pirojpur", "Jhalokathi", "Barguna"],
        "Sylhet Division": ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
        "Rangpur Division": ["Rangpur", "Dinajpur", "Thakurgaon", "Panchagarh", "Nilphamari", "Lalmonirhat", "Kurigram", "Gaibandha"],
        "Mymensingh Division": ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"]
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchService = async () => {
            const p = await params;
            try {
                const res = await fetch("/api/services");
                const data = await res.json();

                // Handle both array (legacy) and object (paginated) responses
                const servicesList = Array.isArray(data) ? data : (data.services || []);

                let foundService = null;
                if (Array.isArray(servicesList)) {
                    foundService = servicesList.find(s =>
                        s._id === p.id || s.name.toLowerCase().replace(/\s+/g, "-") === p.id
                    );
                }

                if (!foundService) {
                    foundService = staticServices.find(s =>
                        s.name.toLowerCase().replace(/\s+/g, "-") === p.id
                    );
                }

                setService(foundService);
            } catch (err) {
                const fallback = staticServices.find(s =>
                    s.name.toLowerCase().replace(/\s+/g, "-") === p.id
                );
                setService(fallback);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [params]);

    useEffect(() => {
        if (service) {
            setTotalCost(duration * service.price);
        }
    }, [duration, service]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            userId: session.user.id,
            email: session.user.email,
            serviceId: service.name,
            duration,
            location,
            totalCost,
        };

        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                router.push("/my-bookings");
            } else {
                alert("Booking failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (status === "loading" || loading || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Form */}
                    <div className="flex-[2] space-y-8">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                                Book <span className="text-indigo-600">{service.name}</span>
                            </h1>
                            <p className="text-slate-500 font-medium">Complete the form below to schedule your care service.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 space-y-10">
                            {/* Section: Duration */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-indigo-500" />
                                    Service Duration
                                </h3>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1"
                                        value={duration}
                                        onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                                        required
                                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-black text-slate-900 text-lg pl-16"
                                    />
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Hrs</div>
                                </div>
                            </div>

                            {/* Section: Location */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-indigo-500" />
                                    Service Location
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Division</label>
                                        <select
                                            value={location.division}
                                            onChange={(e) => setLocation({ ...location, division: e.target.value, district: "" })}
                                            required
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Division</option>
                                            {Object.keys(locationData).map((div) => (
                                                <option key={div} value={div}>{div}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">District</label>
                                        <select
                                            value={location.district}
                                            onChange={(e) => setLocation({ ...location, district: e.target.value })}
                                            required
                                            disabled={!location.division}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">Select District</option>
                                            {location.division && locationData[location.division]?.map((dist) => (
                                                <option key={dist} value={dist}>{dist}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">City</label>
                                        <input
                                            type="text"
                                            value={location.city}
                                            onChange={(e) => setLocation({ ...location, city: e.target.value })}
                                            required
                                            placeholder="e.g., Dhaka"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Area</label>
                                        <input
                                            type="text"
                                            value={location.area}
                                            onChange={(e) => setLocation({ ...location, area: e.target.value })}
                                            required
                                            placeholder="e.g., Banani"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Street Address</label>
                                        <textarea
                                            value={location.address}
                                            onChange={(e) => setLocation({ ...location, address: e.target.value })}
                                            required
                                            rows="3"
                                            placeholder="House no, Street name, Apartment details..."
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-6 bg-indigo-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                Confirm Booking
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="flex-1">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <ShieldCheck className="w-24 h-24" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-indigo-600 rounded-full" />
                                    Order Summary
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-bold">Service</span>
                                        <span className="text-slate-900 font-extrabold">{service.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-bold">Rate</span>
                                        <span className="text-slate-900 font-extrabold">${service.price}/hr</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-bold">Duration</span>
                                        <span className="text-slate-900 font-extrabold">{duration} Hours</span>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-2xl">
                                        <span className="font-black text-slate-900 tracking-tight">Total Cost</span>
                                        <span className="font-black text-indigo-600 tracking-tight">${totalCost}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-50 rounded-[2rem] p-6 border border-indigo-100">
                                <div className="flex gap-4">
                                    <Info className="w-6 h-6 text-indigo-600 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-1">Caretaker Guarantee</h4>
                                        <p className="text-indigo-700/70 text-sm font-medium leading-relaxed">
                                            All our caregivers are professional, vetted, and carry liability insurance for your peace of mind.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
