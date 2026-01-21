"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, Calendar, Home as HomeIcon, Briefcase, PlusCircle, Users as UsersIcon, Menu, X } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 py-3 items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-indigo-600 rounded-lg p-1.5 shadow-md shadow-indigo-100">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <Link href="/" className="text-2xl font-black text-slate-900 tracking-tight">
                            Care<span className="text-indigo-600">.xyz</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                        <Link href="/" className="text-slate-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 text-sm font-semibold transition-all">
                            <HomeIcon className="w-4 h-4 mr-1.5" />
                            Home
                        </Link>
                        <Link href="/services" className="text-slate-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 text-sm font-semibold transition-all">
                            Services
                        </Link>
                        {session && (
                            <Link href="/my-bookings" className="text-slate-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 text-sm font-semibold transition-all">
                                <Calendar className="w-4 h-4 mr-1.5" />
                                My Bookings
                            </Link>
                        )}
                        {(session?.user?.role === "admin" || session?.user?.role === "staff") && (
                            <Link href="/admin/add-service" className="text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-400 text-sm font-black transition-all">
                                <PlusCircle className="w-4 h-4 mr-1.5" />
                                Add Service
                            </Link>
                        )}
                        {session?.user?.role === "admin" && (
                            <Link href="/admin/users" className="text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-400 text-sm font-black transition-all">
                                <UsersIcon className="w-4 h-4 mr-1.5" />
                                Manage Users
                            </Link>
                        )}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {session ? (
                            <div className="flex items-center space-x-5">
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-inner hover:border-indigo-300 hover:bg-white transition-all active:scale-95 group"
                                >
                                    <div className="bg-indigo-100 rounded-full p-1 group-hover:bg-indigo-600 transition-colors">
                                        <UserIcon className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{session.user.name.split(' ')[0]}</span>
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center space-x-1.5 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="text-slate-600 hover:text-indigo-600 px-4 py-2 text-sm font-bold transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-all"
                        >
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <HomeIcon className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/services"
                            className="flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Calendar className="w-5 h-5" />
                            <span>Services</span>
                        </Link>
                        {session && (
                            <Link
                                href="/my-bookings"
                                className="flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Calendar className="w-5 h-5" />
                                <span>My Bookings</span>
                            </Link>
                        )}
                        {(session?.user?.role === "admin" || session?.user?.role === "staff") && (
                            <Link
                                href="/admin/add-service"
                                className="flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-black text-indigo-600 hover:bg-indigo-50 transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <PlusCircle className="w-5 h-5" />
                                <span>Add Service</span>
                            </Link>
                        )}
                        {session?.user?.role === "admin" && (
                            <Link
                                href="/admin/users"
                                className="flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-black text-indigo-600 hover:bg-indigo-50 transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <UsersIcon className="w-5 h-5" />
                                <span>Manage Users</span>
                            </Link>
                        )}
                    </div>

                    <div className="pt-4 pb-6 px-5 border-t border-slate-100">
                        {session ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-indigo-100 rounded-full p-2">
                                        <UserIcon className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-slate-900">{session.user.name}</p>
                                        <p className="text-sm font-medium text-slate-500">{session.user.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        <span>Profile</span>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <Link
                                    href="/login"
                                    className="block w-full text-center px-4 py-3 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
