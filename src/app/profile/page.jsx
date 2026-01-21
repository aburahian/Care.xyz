"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Mail, CreditCard, Phone, Shield, Edit2, Save, X, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: "", contact: "" });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            fetch("/api/profile")
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setFormData({ name: data.name, contact: data.contact });
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [session]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser);
                setEditing(false);
                setMessage({ type: "success", text: "Profile updated successfully!" });
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ type: "error", text: "Failed to update profile" });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "An error occurred" });
        } finally {
            setSaving(false);
        }
    };

    if (loading || status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#f8fafc] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-indigo-200">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-tight
                                    ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' :
                                        user.role === 'staff' ? 'bg-emerald-100 text-emerald-700' :
                                            'bg-slate-100 text-slate-600'}`}>
                                    <Shield className="w-3 h-3 mr-1.5" />
                                    {user.role} role
                                </span>
                                <span className="text-slate-400 text-sm font-bold">Member since {new Date(user.createdAt).getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="inline-flex items-center px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-100"
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit Profile
                        </button>
                    )}
                </div>

                {message && (
                    <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300
                        ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                        <CheckCircle2 className="w-5 h-5" />
                        <p className="font-bold">{message.text}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Info Card */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem] -mr-16 -mt-16 pointer-events-none"></div>

                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
                                <User className="w-5 h-5 mr-3 text-indigo-500" />
                                Personal Information
                            </h3>

                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            disabled={!editing}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full px-6 py-4 rounded-2xl border-2 transition-all font-bold 
                                                ${editing ? 'bg-slate-50 border-indigo-100 focus:border-indigo-500 bg-white outline-none' : 'bg-slate-50/50 border-transparent text-slate-600'}`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                        <input
                                            type="text"
                                            value={formData.contact}
                                            disabled={!editing}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                            className={`w-full px-6 py-4 rounded-2xl border-2 transition-all font-bold 
                                                ${editing ? 'bg-slate-50 border-indigo-100 focus:border-indigo-500 bg-white outline-none' : 'bg-slate-50/50 border-transparent text-slate-600'}`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="flex items-center px-6 py-4 bg-slate-50/50 rounded-2xl text-slate-500 font-bold border-2 border-transparent">
                                        <Mail className="w-4 h-4 mr-3 text-slate-300" />
                                        {user.email}
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold ml-1 italic italic">Email cannot be changed for security reasons.</p>
                                </div>

                                {editing && (
                                    <div className="flex items-center gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                                        >
                                            {saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditing(false);
                                                setFormData({ name: user.name, contact: user.contact });
                                            }}
                                            className="px-8 bg-slate-100 text-slate-600 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Secondary Info */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
                                <Shield className="w-5 h-5 mr-3 text-indigo-500" />
                                Verification
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">National ID (NID)</label>
                                    <div className="flex items-center px-5 py-4 bg-slate-50/50 rounded-2xl text-slate-600 font-bold border-2 border-transparent">
                                        <CreditCard className="w-4 h-4 mr-3 text-slate-300" />
                                        {user.nid}
                                    </div>
                                </div>
                                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 p-1 bg-indigo-100 rounded-lg">
                                            <Shield className="w-3 h-3 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-indigo-900">Verified Account</p>
                                            <p className="text-[10px] text-indigo-700 mt-1 font-bold leading-relaxed">Your identity has been verified with the provided NID during registration.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-600 rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-lg font-black mb-4 relative z-10">Care Services</h3>
                            <p className="text-sm font-bold text-indigo-100 mb-6 relative z-10">View your active bookings and request history.</p>
                            <button
                                onClick={() => router.push("/my-bookings")}
                                className="w-full bg-white text-indigo-600 font-black py-4 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 relative z-10"
                            >
                                View My Bookings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
