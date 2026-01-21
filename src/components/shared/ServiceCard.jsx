import Link from "next/link";
import { ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";

export default function ServiceCard({ service }) {
    const slug = service._id || service.name.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm border border-white/20">
                        {service.category || 'Premium Care'}
                    </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-8">
                <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-tighter">Top Rated Service</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 tracking-tight">
                    {service.name}
                </h3>

                <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed mb-8">
                    {service.description}
                </p>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting at</span>
                        <span className="text-2xl font-black text-slate-900">${service.price}<span className="text-sm font-bold text-slate-400">/hr</span></span>
                    </div>

                    <Link
                        href={`/services/${slug}`}
                        className="group/btn flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                    >
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
