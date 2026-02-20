'use client'

import { useEffect, useState } from 'react'
import { supabase, LinkItem } from '@/lib/supabase'
import {
  Plus, Pencil, Trash2, Eye, EyeOff,
  ChevronUp, ChevronDown, LogOut, Save, X, Share2
} from 'lucide-react'

const ICON_OPTIONS = [
  'ShoppingBag', 'Zap', 'Globe', 'MessageCircle',
  'Github', 'Instagram', 'Youtube', 'Twitter',
  'Facebook', 'Linkedin', 'Mail', 'Phone'
]

const COLOR_OPTIONS = [
  { label: 'Purple', value: 'bg-purple-600 text-white' },
  { label: 'Yellow', value: 'bg-yellow-400 text-black font-bold' },
  { label: 'White', value: 'bg-white text-black' },
  { label: 'Green', value: 'bg-green-500 text-black' },
  { label: 'Instagram', value: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white' },
  { label: 'Dark', value: 'bg-neutral-800 text-white' },
  { label: 'Blue', value: 'bg-blue-600 text-white' },
  { label: 'Red', value: 'bg-red-600 text-white' },
  { label: 'Pink', value: 'bg-pink-500 text-white' },
  { label: 'Orange', value: 'bg-orange-500 text-white' },
]

const emptyForm = {
  title: '',
  url: '',
  color: 'bg-neutral-800 text-white',
  icon: 'Globe',
  is_active: true,
  sort_order: 0,
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPass, setWrongPass] = useState(false)

  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthed(true)
      setWrongPass(false)
    } else {
      setWrongPass(true)
    }
  }

  const fetchLinks = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('links')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data) setLinks(data)
    setLoading(false)
  }

  useEffect(() => {
    if (authed) fetchLinks()
  }, [authed])

  const handleSave = async () => {
    if (!form.title || !form.url) return
    setSaving(true)

    if (editId !== null) {
      await supabase.from('links').update(form).eq('id', editId)
    } else {
      const maxOrder = links.length > 0 ? Math.max(...links.map(l => l.sort_order)) + 1 : 1
      await supabase.from('links').insert({ ...form, sort_order: maxOrder })
    }

    await fetchLinks()
    setShowForm(false)
    setEditId(null)
    setForm(emptyForm)
    setSaving(false)
  }

  const handleEdit = (link: LinkItem) => {
    setForm({
      title: link.title,
      url: link.url,
      color: link.color,
      icon: link.icon,
      is_active: link.is_active,
      sort_order: link.sort_order,
    })
    setEditId(link.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus link ini?')) return
    await supabase.from('links').delete().eq('id', id)
    await fetchLinks()
  }

  const toggleActive = async (link: LinkItem) => {
    await supabase.from('links').update({ is_active: !link.is_active }).eq('id', link.id)
    await fetchLinks()
  }

  const moveOrder = async (link: LinkItem, dir: 'up' | 'down') => {
    const idx = links.findIndex(l => l.id === link.id)
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= links.length) return

    const swap = links[swapIdx]
    await supabase.from('links').update({ sort_order: swap.sort_order }).eq('id', link.id)
    await supabase.from('links').update({ sort_order: link.sort_order }).eq('id', swap.id)
    await fetchLinks()
  }

  // LOGIN SCREEN
  if (!authed) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-neutral-900 rounded-2xl p-8 border border-white/10">
          <h1 className="text-2xl font-black text-white mb-2 text-center">ADMIN PANEL</h1>
          <p className="text-gray-400 text-sm text-center mb-6">Masukkan password untuk lanjut</p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-3"
          />
          {wrongPass && <p className="text-red-400 text-sm mb-3">Password salah!</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Masuk
          </button>
        </div>
      </main>
    )
  }

  // ADMIN DASHBOARD
  return (
    <main className="min-h-screen bg-black px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">ADMIN PANEL</h1>
            <p className="text-gray-400 text-sm">Kelola link kamu</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm) }}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
            >
              <Plus size={16} /> Tambah
            </button>
            <button
              onClick={() => setAuthed(false)}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* FORM TAMBAH / EDIT */}
        {showForm && (
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-bold mb-4">{editId ? 'Edit Link' : 'Tambah Link Baru'}</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Judul (contoh: SHOPEE)"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="URL (contoh: https://shopee.co.id)"
                value={form.url}
                onChange={e => setForm({ ...form, url: e.target.value })}
                className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />

              {/* ICON */}
              <div>
                <p className="text-gray-400 text-xs mb-2">Icon</p>
                <div className="flex flex-wrap gap-2">
                  {ICON_OPTIONS.map(ic => (
                    <button
                      key={ic}
                      onClick={() => setForm({ ...form, icon: ic })}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${form.icon === ic ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* WARNA */}
              <div>
                <p className="text-gray-400 text-xs mb-2">Warna</p>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setForm({ ...form, color: c.value })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border-2 ${c.value} ${form.color === c.value ? 'border-white scale-105' : 'border-transparent'}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PREVIEW */}
              <div className={`flex items-center justify-between px-4 h-12 rounded-lg ${form.color}`}>
                <span className="text-sm font-medium">{form.title || 'Preview Link'}</span>
                <Share2 size={14} opacity={0.6} />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all disabled:opacity-50"
                >
                  <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button
                  onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }}
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2 rounded-lg text-sm transition-all"
                >
                  <X size={16} /> Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LIST LINKS */}
        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-neutral-900 animate-pulse" />
            ))
          ) : links.length === 0 ? (
            <div className="text-center text-gray-500 py-12">Belum ada link. Klik Tambah!</div>
          ) : (
            links.map((link, idx) => (
              <div
                key={link.id}
                className={`flex items-center gap-3 bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 ${!link.is_active ? 'opacity-50' : ''}`}
              >
                {/* ORDER BUTTONS */}
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveOrder(link, 'up')} disabled={idx === 0} className="text-gray-500 hover:text-white disabled:opacity-20 transition-all">
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => moveOrder(link, 'down')} disabled={idx === links.length - 1} className="text-gray-500 hover:text-white disabled:opacity-20 transition-all">
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* PREVIEW COLOR */}
                <div className={`w-3 h-10 rounded-full ${link.color.split(' ')[0]}`} />

                {/* INFO */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{link.title}</p>
                  <p className="text-gray-500 text-xs truncate">{link.url}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(link)} className="text-gray-400 hover:text-white transition-all" title={link.is_active ? 'Nonaktifkan' : 'Aktifkan'}>
                    {link.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => handleEdit(link)} className="text-blue-400 hover:text-blue-300 transition-all">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="text-red-400 hover:text-red-300 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* LINK KE HALAMAN UTAMA */}
        <div className="mt-8 text-center">
          <a href="/" target="_blank" className="text-gray-500 hover:text-white text-sm underline transition-all">
            Lihat halaman utama →
          </a>
        </div>

      </div>
    </main>
  )
}