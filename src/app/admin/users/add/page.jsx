"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, CreditCard, Phone, Shield, ArrowLeft, CheckCircle2, User } from "lucide-react";
import Link from "next/link";

export default function AdminAddUserPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/admin/users");
                    router.refresh();
                }, 2000);
            } else {
                const errData = await res.json();
                alert(errData.error || "Failed to add user");
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
                    <h2 className="text-3xl font-black text-slate-900 mb-2">User Created!</h2>
                    <p className="text-slate-500 font-medium">Adding account to database...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin/users" className="inline-flex items-center text-slate-500 font-bold mb-8 hover:text-indigo-600 transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to User List
                </Link>

                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100 text-white">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add New User</h1>
                        <p className="text-slate-500 font-medium">Create a new account manually with specific privileges.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <User className="w-4 h-4 mr-2 text-indigo-500" />
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <Lock className="w-4 h-4 mr-2 text-indigo-500" />
                                Initial Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* NID */}
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <CreditCard className="w-4 h-4 mr-2 text-indigo-500" />
                                NID Card Number
                            </label>
                            <input
                                name="nid"
                                type="text"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="1234567890123"
                            />
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-indigo-500" />
                                Contact Number
                            </label>
                            <input
                                name="contact"
                                type="tel"
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                                placeholder="+880 1XXX-XXXXXX"
                            />
                        </div>

                        {/* Role */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center">
                                <Shield className="w-4 h-4 mr-2 text-indigo-500" />
                                Account Privilege
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="role" value="user" defaultChecked className="peer sr-only" />
                                    <div className="px-6 py-4 rounded-2xl border-2 border-slate-100 peer-checked:border-indigo-500 peer-checked:bg-indigo-50/50 transition-all font-bold text-slate-600 peer-checked:text-indigo-700 flex items-center justify-center">
                                        Standard User
                                    </div>
                                </label>
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="role" value="staff" className="peer sr-only" />
                                    <div className="px-6 py-4 rounded-2xl border-2 border-slate-100 peer-checked:border-indigo-500 peer-checked:bg-indigo-50/50 transition-all font-bold text-slate-600 peer-checked:text-indigo-700 flex items-center justify-center">
                                        Staff Member
                                    </div>
                                </label>
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="role" value="admin" className="peer sr-only" />
                                    <div className="px-6 py-4 rounded-2xl border-2 border-slate-100 peer-checked:border-indigo-500 peer-checked:bg-indigo-50/50 transition-all font-bold text-slate-600 peer-checked:text-indigo-700 flex items-center justify-center">
                                        System Admin
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating User...' : 'Provision Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}
