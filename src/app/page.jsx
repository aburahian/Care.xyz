"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ServiceCard from "@/components/shared/ServiceCard";
import staticServices from "@/lib/services";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Users } from "lucide-react";

export default function Home() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => {
                // API returns { services: [...] }
                const fetchedServices = data.services || data;
                if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
                    setServices(fetchedServices.slice(0, 3));
                } else {
                    setServices(staticServices.slice(0, 3));
                }
            })
            .catch(() => setServices(staticServices.slice(0, 3)));
    }, []);

    return (
        <div className="space-y-32 pb-20">
            {/* Premium Banner Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden mesh-gradient">
                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

                <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center z-10">
                    <div className="glass-card p-6 md:p-20 lg:p-24 rounded-[2.5rem] md:rounded-[4rem] group hover:shadow-indigo-200/50 transition-all duration-700">
                        <div className="inline-flex items-center space-x-2 bg-indigo-50/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-indigo-100 mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                            <span className="text-indigo-900 text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">The Evolution of Care</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[1.1] md:leading-[0.95] text-slate-900 mb-6 md:mb-10 break-words">
                            Compassionate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Care</span> for All
                        </h1>

                        <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-slate-600 font-medium leading-relaxed max-w-4xl mx-auto mb-8 md:mb-16 px-2 md:px-4">
                            Premium baby sitting, elderly support, and professional nursing services.
                            Vetted experts delivering excellence to your doorstep.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center relative z-20">
                            <Link
                                href="/services"
                                className="group relative px-8 py-4 md:px-12 md:py-6 bg-indigo-600 text-white font-black rounded-2xl md:rounded-[2rem] tracking-tight overflow-hidden transition-all shadow-2xl shadow-indigo-200 active:scale-95 text-lg md:text-xl w-full sm:w-auto text-center"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    Browse Services
                                    <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Link>
                            <Link
                                href="/register"
                                className="px-8 py-4 md:px-12 md:py-6 bg-white/50 backdrop-blur-md border-2 border-slate-200 text-slate-900 font-black rounded-2xl md:rounded-[2rem] tracking-tight hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95 text-lg md:text-xl w-full sm:w-auto text-center"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Interaction Badges - Visible on all screens now */}
                        <div className="flex justify-center gap-4 mt-12 lg:mt-0 lg:block">
                            <div className="relative static lg:absolute lg:-top-12 lg:-left-12 p-4 lg:p-8 glass-card rounded-2xl lg:rounded-[2.5rem] animate-float lg:animate-float">
                                <div className="flex items-center gap-3 lg:gap-4">
                                    <div className="bg-indigo-600 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center">
                                        <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-lg lg:text-2xl font-black text-slate-900 leading-none">5k+</p>
                                        <p className="text-slate-500 font-bold text-[10px] lg:text-xs uppercase tracking-widest">Happy Families</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative static lg:absolute lg:-bottom-16 lg:-right-16 p-4 lg:p-10 glass-card rounded-2xl lg:rounded-[3rem] animate-float" style={{ animationDelay: '-2s' }}>
                                <div className="flex items-center gap-3 lg:gap-5">
                                    <div className="bg-emerald-500 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center p-0.5">
                                        <div className="w-full h-full bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                                            <ShieldCheck className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-lg lg:text-xl font-black text-slate-900">100% Vetted</p>
                                        <p className="text-slate-500 font-bold text-xs lg:text-sm tracking-tighter">Safe & Professional</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unique Staggered Bento Grid Value Props */}
            <section className="max-w-7xl mx-auto px-4 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div className="md:col-span-2 lg:col-span-3 bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-500 border border-slate-50 group">
                        <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Fully Vetted Specialists</h3>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            Every single caregiver undergoes rigorous multi-layer background checks and professional training.
                        </p>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl hover:shadow-indigo-900/20 transition-all duration-500 group">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-md group-hover:scale-110 transition-transform">
                            <Heart className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Compassion First</h3>
                        <p className="text-xl text-slate-300 font-medium leading-relaxed">
                            We select specialists who don't just work—they care. Empathy is our core requirement for every role.
                        </p>
                    </div>

                    <div className="md:col-span-4 lg:col-span-6 bg-indigo-50/50 p-12 rounded-[4rem] border border-indigo-100/50 flex flex-col lg:flex-row items-center justify-between gap-12 group">
                        <div className="max-w-2xl">
                            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Trusted by the Community</h3>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                Join over 5,000+ happy families who have found their perfect care match through our secure, vetted, and specialized platform.
                            </p>
                        </div>
                        <div className="flex -space-x-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-20 h-20 rounded-full border-4 border-white bg-slate-200 shadow-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                            <div className="w-20 h-20 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center shadow-xl text-white font-black text-xl">
                                +5k
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Geometric Collage About Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 overflow-hidden">
                <div className="relative">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-indigo-50/30 rounded-[5rem] -skew-y-3 translate-x-1/4 -z-10" />

                    <div className="flex flex-col lg:flex-row gap-24 items-center">
                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em] rounded-lg">Legacy of Trust</span>
                                <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95]">
                                    Bridging <span className="text-indigo-600">Heart</span> <br />
                                    with <span className="text-indigo-600">Expertise</span>.
                                </h2>
                            </div>
                            <p className="text-2xl text-slate-500 font-medium leading-relaxed">
                                Care.xyz was born from a simple vision: to make high-quality care accessible to everyone.
                                We don't just provide services; we build relationships that last generations.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div>
                                    <p className="text-5xl font-black text-slate-900 mb-2">12+</p>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Years of Service</p>
                                </div>
                                <div>
                                    <p className="text-5xl font-black text-indigo-600 mb-2">98%</p>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Client Satisfaction</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-4 text-2xl font-black text-slate-900 group"
                                >
                                    <span className="border-b-4 border-indigo-600 group-hover:border-slate-900 transition-colors">Our Full Story</span>
                                    <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-6">
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform aspect-[4/5]">
                                        <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80" alt="Elderly Care" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform aspect-square">
                                        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=400&q=80" alt="Nurse" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="space-y-6 pt-12">
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform aspect-square">
                                        <img src="https://i.ibb.co.com/S4KcbN14/48.jpg" alt="Baby Care" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform aspect-[4/5]">
                                        <img src="https://i.ibb.co.com/qPrYVzb/images-q-tbn-ANd9-Gc-RQda-DSh-hc-Bg-Cw32nxrgy4n6m-Ikm-a-Cjpx-A-s.jpg" alt="Caregiver" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Blobs */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50 -z-10 animate-float" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50 -z-10 animate-float" style={{ animationDelay: '-3s' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="bg-slate-50 py-32 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="space-y-4">
                            <span className="text-indigo-600 text-sm font-black uppercase tracking-widest">Our Services</span>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Professional care for <br />every family need.</h2>
                        </div>
                        <Link href="/services" className="group flex items-center px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-xl active:scale-95">
                            View all services
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <ServiceCard key={service.name} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-slate-50 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-indigo-600 text-sm font-black uppercase tracking-widest block mb-4">Success Stories</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Trusted by families <br />
                            <span className="text-indigo-600">across the country</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Jenkins",
                                role: "Mother of 2",
                                content: "Finding a reliable babysitter was a nightmare until I found Care.xyz. The vetting process gives me total peace of mind.",
                                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
                            },
                            {
                                name: "Michael Chen",
                                role: "Son of elderly parent",
                                content: "The elderly care specialist we hired is an angel. She treats my father with so much respect and patience. Highly recommended!",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                            },
                            {
                                name: "Emily Davis",
                                role: "Expecting Mother",
                                content: "I booked a consultation for newborn care, and the advice I received was invaluable. The professionals here are truly experts.",
                                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                            }
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all hover:-translate-y-1 duration-300 border border-slate-100">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Sparkles key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">"{testimonial.content}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-4 border-slate-50" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="relative bg-indigo-900 rounded-[3.5rem] shadow-2xl shadow-indigo-100 overflow-hidden px-8 py-24 md:p-24">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                            src="https://images.unsplash.com/photo-1584515933487-5f9f7e1b8c3a?auto=format&fit=crop&w=1950&q=80"
                            alt="People caring"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-900/80 to-transparent" />
                    </div>
                    <div className="relative max-w-2xl">
                        <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-8">
                            Ready to give them the <span className="text-indigo-400">best</span> care?
                        </h2>
                        <p className="text-xl md:text-2xl leading-relaxed text-indigo-100/90 font-medium mb-12">
                            Join thousands of happy families who trust our platform every single day.
                            Start your journey with a professional caregiver tonight.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/register"
                                className="bg-white text-indigo-900 px-10 py-5 rounded-[1.5rem] text-xl font-black hover:bg-indigo-50 transition-all shadow-2xl shadow-black/20 active:scale-95 text-center"
                            >
                                Get Started Now
                            </Link>
                            <Link
                                href="/services"
                                className="bg-indigo-700/50 backdrop-blur-lg border border-indigo-400/30 text-white px-10 py-5 rounded-[1.5rem] text-xl font-black hover:bg-indigo-600 transition-all active:scale-95 text-center"
                            >
                                Browse Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
