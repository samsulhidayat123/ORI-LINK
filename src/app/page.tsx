import Image from "next/image";
import {
  ShoppingBag,
  Zap,
  Globe,
  MessageCircle,
  Github,
  Instagram,
  Share2
} from "lucide-react";

const links = [
  {
    title: "SHOPEE",
    url: "https://shopee.co.id",
    icon: <ShoppingBag size={18} />,
    className: "bg-purple-600 text-white",
  },
  {
    title: "NEW COLLECTION: CONCRETE",
    url: "#",
    icon: <Zap size={18} />,
    className: "bg-yellow-400 text-black font-bold",
  },
  {
    title: "TIKTOK",
    url: "https://www.tiktok.com/@projct.78",
    icon: <Globe size={18} />,
    className: "bg-white text-black",
  },
  {
    title: "WHATSAPP",
    url: "https://wa.me/6283156492864",
    icon: <MessageCircle size={18} />,
    className: "bg-green-500 text-black",
  },
  {
    title: "INSTAGRAM",
    url: "https://www.instagram.com/by.samsul_/",
    icon: <Instagram size={18} />,
    className: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white",
  },
  {
    title: "GITHUB PORTFOLIO",
    url: "https://github.com/samsulhidayat123",
    icon: <Github size={18} />,
    className: "bg-neutral-800 text-white",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex justify-center px-4 py-16">
      <div className="w-full max-w-md text-center text-white">

        {/* PROFILE - Diperbaiki agar ukuran stabil */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/profile.png"
            alt="Profile"
            fill
            className="rounded-full object-cover border border-white/20 animate-spin-slow"
            priority
          />
        </div>

        <h1 className="text-2xl font-extrabold uppercase tracking-tight">SAMSUL HIDAYAT</h1>
        <p className="text-sm text-gray-400 mb-8">
          Tech Enthusiast & Digital Creator
        </p>

        {/* LINKS */}
        <div className="space-y-3">
          {links.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-4 h-12 rounded-lg transition-all active:scale-95 hover:opacity-90 ${item.className}`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              <Share2 size={14} opacity={0.6} />
            </a>
          ))}
        </div>

        <p className="mt-12 text-[10px] text-gray-500 tracking-[0.3em] uppercase">
          EST. 2026
        </p>
      </div>
    </main>
  );
};