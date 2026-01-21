"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, ChevronRight, X, User, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function MyBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const handleCancel = async (bookingId) => {
        if (!confirm("Are you sure you want to cancel this booking? This will permanently delete it.")) {
            return;
        }

        try {
            const res = await fetch(`/api/booking?id=${bookingId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setBookings(prev => prev.filter(b => b._id !== bookingId));
                setSelectedBooking(null);
            } else {
                const data = await res.json();
                alert(data.error || "Failed to cancel booking");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while cancelling");
        }
    };

    useEffect(() => {
        if (session) {
            setLoading(true);
            fetch(`/api/booking?userId=${session.user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setBookings(data);
                    } else {
                        setBookings([]);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Fetch error:", err);
                    setBookings([]);
                    setLoading(false);
                });
        }
    }, [session]);

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Bookings</h1>
                        <p className="mt-2 text-slate-500 font-medium">Manage and track your care service requests.</p>
                    </div>
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                    >
                        Book New Service
                    </Link>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-16 text-center border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No bookings found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
                            You haven't made any bookings yet. Explore our services to find the right care for your loved ones.
                        </p>
                        <Link
                            href="/services"
                            className="text-indigo-600 font-bold hover:text-indigo-500 underline decoration-2 underline-offset-4"
                        >
                            Browse Services
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="group bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                                onClick={() => setSelectedBooking(booking)}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-600 transition-colors">
                                        <Calendar className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {booking.serviceId}
                                        </h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                            <span className="flex items-center text-sm font-semibold text-slate-500">
                                                <Clock className="w-4 h-4 mr-1.5" />
                                                {booking.duration} Hours
                                            </span>
                                            <span className="flex items-center text-sm font-semibold text-slate-500">
                                                <Calendar className="w-4 h-4 mr-1.5" />
                                                {formatDate(booking.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 justify-between md:justify-end">
                                    <div className="text-right">
                                        <span className="block text-xs uppercase tracking-widest font-black text-slate-400 mb-1">Total Paid</span>
                                        <span className="text-2xl font-black text-slate-900">${booking.totalCost}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tight
                                            ${booking.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                    'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                                            {booking.status}
                                        </span>
                                        <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-[100] preserve-3d">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedBooking(null)}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
                            {/* Modal Header */}
                            <div className="bg-indigo-600 p-8 flex justify-between items-center text-white">
                                <div>
                                    <span className="text-indigo-100 text-xs font-black uppercase tracking-[0.2em] mb-2 block">Booking Details</span>
                                    <h3 className="text-3xl font-black tracking-tight">{selectedBooking.serviceId}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 md:p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                                                <Clock className="w-3.5 h-3.5 mr-2" />
                                                Time & Duration
                                            </h4>
                                            <p className="text-lg font-bold text-slate-900">{selectedBooking.duration} Hours Service</p>
                                            <p className="text-slate-500 font-medium">Booked on {formatDate(selectedBooking.createdAt)}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                                                <DollarSign className="w-3.5 h-3.5 mr-2" />
                                                Payment & Contact
                                            </h4>
                                            <p className="text-2xl font-black text-indigo-600">${selectedBooking.totalCost}</p>
                                            <p className="text-slate-500 font-bold text-sm mt-1">{selectedBooking.email}</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-bold capitalize
                                                ${selectedBooking.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {selectedBooking.paymentStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                                                <MapPin className="w-3.5 h-3.5 mr-2" />
                                                Service Location
                                            </h4>
                                            <p className="text-slate-900 font-bold leading-snug">
                                                {selectedBooking.location.address}
                                            </p>
                                            <p className="text-slate-500 font-medium mt-1">
                                                {selectedBooking.location.area}, {selectedBooking.location.city}
                                            </p>
                                            <p className="text-slate-500 font-medium">
                                                {selectedBooking.location.district}, {selectedBooking.location.division}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                                                <CheckCircle className="w-3.5 h-3.5 mr-2" />
                                                Current Status
                                            </h4>
                                            <div className="flex items-center">
                                                <div className={`w-3 h-3 rounded-full mr-2.5 animate-pulse
                                                    ${selectedBooking.status === 'Pending' ? 'bg-amber-400' :
                                                        selectedBooking.status === 'Confirmed' ? 'bg-emerald-400' :
                                                            'bg-slate-400'}`}></div>
                                                <span className="text-slate-900 font-black">{selectedBooking.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4">
                                    <button
                                        className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                        onClick={() => setSelectedBooking(null)}
                                    >
                                        Close Details
                                    </button>
                                    {selectedBooking.status === 'Pending' && (
                                        <button
                                            className="flex-1 bg-white text-rose-600 border-2 border-rose-100 font-bold py-4 rounded-2xl hover:bg-rose-50 hover:border-rose-200 transition-all active:scale-95"
                                            onClick={() => handleCancel(selectedBooking._id)}
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
