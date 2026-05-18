'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { FileText, Image as ImageIcon, Download, Search, Bell } from 'lucide-react'

type Notice = { id: string; title: string; file_type: 'pdf' | 'image'; file_url: string; created_at: string; is_important: boolean }

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false })
      setNotices(data as Notice[] || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = notices.filter(n => n.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-display text-3xl font-bold mb-2 bangla">নোটিশ বোর্ড</h1>
            <p className="text-primary-200 bangla">সকল বিজ্ঞপ্তি ও সময়সূচি</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Search */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="নোটিশ খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 bangla"
            />
          </div>

          {loading ? (
            <div className="text-center py-20 text-neutral-400 bangla">লোড হচ্ছে...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Bell size={40} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-neutral-500 bangla">কোনো নোটিশ পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(notice => (
                <div key={notice.id} className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    notice.file_type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {notice.file_type === 'pdf' ? <FileText size={22} /> : <ImageIcon size={22} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {notice.is_important && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full bangla font-medium shrink-0">জরুরি</span>
                      )}
                      <p className="text-neutral-800 font-medium bangla">{notice.title}</p>
                    </div>
                    <p className="text-neutral-400 text-xs mt-1">
                      {new Date(notice.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <a
                    href={notice.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors bangla"
                  >
                    <Download size={15} />
                    দেখুন
                  </a>
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
