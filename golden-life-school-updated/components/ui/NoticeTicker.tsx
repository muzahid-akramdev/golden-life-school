'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function NoticeTicker() {
  const [notices, setNotices] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('notices')
        .select('id, title')
        .order('created_at', { ascending: false })
        .limit(5)
      if (data) setNotices(data)
    }
    fetch()
  }, [])

  const items = notices.length > 0
    ? notices
    : [
        { id: '1', title: 'ভর্তি চলছে — প্লে থেকে দশম শ্রেণি পর্যন্ত আসন সীমিত' },
        { id: '2', title: 'প্রথম সাময়িক পরীক্ষার সময়সূচি প্রকাশিত হয়েছে' },
        { id: '3', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা আগামী মাসে অনুষ্ঠিত হবে' },
      ]

  return (
    <div className="bg-gold-50 border-y border-gold-200 py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5 shrink-0 bg-gold-500 text-white text-xs font-medium px-3 py-1 rounded-full bangla">
          <Bell size={12} />
          নোটিশ
        </div>
        <div className="ticker-wrapper flex-1 overflow-hidden">
          <div className="ticker-content bangla text-sm text-neutral-700">
            {items.map((n, i) => (
              <span key={n.id}>
                <Link href="/notice" className="hover:text-primary-700 transition-colors">
                  {n.title}
                </Link>
                {i < items.length - 1 && <span className="mx-8 text-gold-400">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
