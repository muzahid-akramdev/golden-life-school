'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { Image as ImageIcon } from 'lucide-react'

type GalleryItem = { id: string; title: string; image_url: string; category: string; created_at: string }

const categories = ['সব', 'অনুষ্ঠান', 'পরীক্ষা', 'ক্রীড়া', 'শ্রেণিকক্ষ', 'অন্যান্য']

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [cat, setCat] = useState('সব')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
      setItems(data as GalleryItem[] || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = cat === 'সব' ? items : items.filter(i => i.category === cat)

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-display text-3xl font-bold mb-2 bangla">ফটো গ্যালারি</h1>
            <p className="text-primary-200 bangla">স্মরণীয় মুহূর্তের সংকলন</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium bangla transition-colors ${
                  cat === c ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300'
                }`}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-neutral-400 bangla">লোড হচ্ছে...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon size={40} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-neutral-500 bangla">কোনো ছবি পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map(item => (
                <div key={item.id} className="break-inside-avoid rounded-xl overflow-hidden bg-white border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="relative aspect-square bg-primary-100">
                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-neutral-700 bangla">{item.title}</p>
                    <span className="text-xs text-primary-600 bangla">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
