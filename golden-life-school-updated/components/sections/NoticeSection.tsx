'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell, FileText, Image as ImageIcon, ArrowRight, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Notice = { id: string; title: string; file_type: 'pdf' | 'image'; file_url: string; created_at: string; is_important: boolean }

const mockNotices: Notice[] = [
  { id: '1', title: '২০২৫ সালের ভর্তি বিজ্ঞপ্তি', file_type: 'pdf', file_url: '#', created_at: new Date().toISOString(), is_important: true },
  { id: '2', title: 'প্রথম সাময়িক পরীক্ষার সময়সূচি', file_type: 'pdf', file_url: '#', created_at: new Date(Date.now() - 86400000).toISOString(), is_important: false },
  { id: '3', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতার বিজ্ঞপ্তি', file_type: 'image', file_url: '#', created_at: new Date(Date.now() - 172800000).toISOString(), is_important: false },
]

export default function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(5)
      if (data && data.length > 0) setNotices(data as Notice[])
    }
    fetch()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div>
            <div className="inline-block bg-gold-100 text-gold-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4 bangla">
              সর্বশেষ নোটিশ
            </div>
            <h2 className="font-display text-3xl font-bold text-neutral-800 bangla mb-4">
              নোটিশ বোর্ড
            </h2>
            <p className="text-neutral-500 bangla leading-relaxed mb-6">
              স্কুলের সকল গুরুত্বপূর্ণ বিজ্ঞপ্তি ও সময়সূচি এখানে প্রকাশিত হয়।
            </p>
            <Link href="/notice" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors bangla">
              সব নোটিশ দেখুন
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-2 space-y-3">
            {notices.map((notice) => (
              <a
                key={notice.id}
                href={notice.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  notice.file_type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {notice.file_type === 'pdf' ? <FileText size={18} /> : <ImageIcon size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {notice.is_important && (
                      <span className="shrink-0 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full bangla font-medium">
                        জরুরি
                      </span>
                    )}
                    <p className="text-neutral-800 font-medium bangla text-sm truncate group-hover:text-primary-700">
                      {notice.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-neutral-400 text-xs">
                    <Calendar size={11} />
                    {new Date(notice.created_at).toLocaleDateString('bn-BD')}
                  </div>
                </div>
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-primary-600 shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
