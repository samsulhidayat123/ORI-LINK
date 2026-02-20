'use client'

import { useEffect, useState } from 'react'
import { supabase, LinkItem } from '@/lib/supabase'
import {
  ShoppingBag, Zap, Globe, MessageCircle,
  Github, Instagram, Share2, Youtube,
  Twitter, Facebook, Linkedin, Mail, Phone
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  ShoppingBag: <ShoppingBag size={18} />,
  Zap: <Zap size={18} />,
  Globe: <Globe size={18} />,
  MessageCircle: <MessageCircle size={18} />,
  Github: <Github size={18} />,
  Instagram: <Instagram size={18} />,
  Youtube: <Youtube size={18} />,
  Twitter: <Twitter size={18} />,
  Facebook: <Facebook size={18} />,
  Linkedin: <Linkedin size={18} />,
  Mail: <Mail size={18} />,
  Phone: <Phone size={18} />,
}

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase
        .from('links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (data) setLinks(data)
      setLoading(false)
    }
    fetchLinks()
  }, [])

  return (
    <main className="min-h-screen bg-black flex justify-center px-4 py-16">
      <div className="w-full max-w-md text-center text-white">

        {/* PROFILE */}
        <div style={{ width: '96px', height: '96px', margin: '0 auto 16px', position: 'relative' }}>
          <img
            src="/profile.png"
            alt="Profile"
            style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%', border: '1px solid rgba(255,255,255,0.2)' }}
          />
        </div>

        <h1 className="text-2xl font-extrabold uppercase tracking-tight">SAMSUL HIDAYAT</h1>
        <p className="text-sm text-gray-400 mb-8">
          Tech Enthusiast & Digital Creator
        </p>

        {/* LINKS */}
        <div className="space-y-3">
          {loading ? (
            // Skeleton loading
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-white/10 animate-pulse" />
            ))
          ) : (
            links.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between px-4 h-12 rounded-lg transition-all active:scale-95 hover:opacity-90 ${item.color}`}
              >
                <div className="flex items-center gap-3">
                  {iconMap[item.icon] ?? <Globe size={18} />}
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <Share2 size={14} opacity={0.6} />
              </a>
            ))
          )}
        </div>

        <p className="mt-12 text-[10px] text-gray-500 tracking-[0.3em] uppercase">
          EST. 2026
        </p>
      </div>
    </main>
  )
}
