'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { Calendar, User, ArrowRight } from 'lucide-react'

type Blog = { id: string; title: string; content: string; image_url: string | null; author: string; created_at: string }

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Blog|null>(null)

  useEffect(() => {
    supabase.from('blogs').select('*').eq('is_published', true).order('created_at', { ascending: false })
      .then(({ data }) => { setPosts(data as Blog[] || []); setLoading(false) })
  }, [])

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-display text-3xl font-bold mb-2 bangla">সংবাদ ও ব্লগ</h1>
            <p className="text-primary-200 bangla">স্কুলের সর্বশেষ সংবাদ ও তথ্য</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <p className="text-center text-neutral-400 bangla py-20">লোড হচ্ছে...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-neutral-400 bangla py-20">কোনো পোস্ট নেই</p>
          ) : selected ? (
            <div className="max-w-3xl mx-auto">
              <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-primary-600 bangla text-sm mb-6 hover:underline">
                ← ফিরে যান
              </button>
              {selected.image_url && (
                <img src={selected.image_url} alt={selected.title} className="w-full h-64 object-cover rounded-2xl mb-6" crossOrigin="anonymous"/>
              )}
              <h1 className="font-display text-2xl font-bold text-neutral-800 bangla mb-3">{selected.title}</h1>
              <div className="flex items-center gap-4 text-neutral-400 text-sm bangla mb-6">
                <span className="flex items-center gap-1"><User size={13}/>{selected.author}</span>
                <span className="flex items-center gap-1"><Calendar size={13}/>{new Date(selected.created_at).toLocaleDateString('bn-BD')}</span>
              </div>
              <div className="prose bangla text-neutral-700 leading-relaxed whitespace-pre-wrap">{selected.content}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setSelected(post)}>
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                    {post.image_url ? (
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" crossOrigin="anonymous"
                        onError={(e:any) => { e.target.parentElement.style.background='linear-gradient(135deg,#dbeafe,#bfdbfe)' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-primary-400 text-5xl font-display font-bold">GL</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-display font-bold text-neutral-800 text-lg mb-2 bangla line-clamp-2">{post.title}</h2>
                    <p className="text-neutral-500 text-sm bangla line-clamp-3 mb-4">{post.content.substring(0, 120)}...</p>
                    <div className="flex items-center justify-between text-xs text-neutral-400 bangla">
                      <span className="flex items-center gap-1"><User size={12}/>{post.author}</span>
                      <span className="flex items-center gap-1 text-primary-600 font-medium">পড়ুন <ArrowRight size={12}/></span>
                    </div>
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
