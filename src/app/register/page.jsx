"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, CreditCard, Phone, UserPlus } from "lucide-react";

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const password = data.password;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!isLongEnough || !hasUpper || !hasLower) {
            setError("Password must be 6+ chars, 1 uppercase, 1 lowercase");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/login?registered=true");
            } else {
                const { message } = await res.json();
                setError(message || "Registration failed. Try again.");
                setLoading(false);
            }
        } catch (err) {
            setError("A server error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center">
                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200 inline-block">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-4xl font-extrabold text-[#1e293b] tracking-tight">
                    Join Care.xyz
                </h2>
                <p className="mt-2 text-sm text-[#64748b]">
                    Start providing or receiving professional care today.
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-10 px-4 shadow-2xl shadow-indigo-100 sm:rounded-3xl sm:px-10 border border-slate-100">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-semibold text-[#1e293b]">Full Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-[#94a3b8]" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all sm:text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-semibold text-[#1e293b]">Email Address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-[#94a3b8]" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all sm:text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* NID */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-semibold text-[#1e293b]">NID Number</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CreditCard className="h-5 w-5 text-[#94a3b8]" />
                                </div>
                                <input
                                    name="nid"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all sm:text-sm"
                                    placeholder="1234567890"
                                />
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-semibold text-[#1e293b]">Contact Number</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-[#94a3b8]" />
                                </div>
                                <input
                                    name="contact"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all sm:text-sm"
                                    placeholder="+880 1XXX-XXXXXX"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-[#1e293b]">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#94a3b8]" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            <p className="mt-2 text-xs text-[#94a3b8]">Must be at least 6 characters with uppercase and lowercase letters.</p>
                        </div>

                        {error && (
                            <div className="col-span-2 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div className="col-span-2 mt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-[#64748b]">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
