import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { SCHOOL } from '@/lib/data'

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 bangla">
          আপনার সন্তানের ভবিষ্যৎ গড়ুন আমাদের সাথে
        </h2>
        <p className="text-primary-200 bangla text-lg mb-8 max-w-2xl mx-auto">
          ২০২৫ সালে ভর্তির আবেদন চলছে। আসন সীমিত — আজই যোগাযোগ করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/admission" className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-7 py-4 rounded-xl font-semibold transition-colors bangla">
            ভর্তির আবেদন করুন
            <ArrowRight size={18} />
          </Link>
          <a href={`tel:${SCHOOL.contact.phone[0]}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-4 rounded-xl font-medium transition-colors bangla">
            <Phone size={16} />
            {SCHOOL.contact.phone[0]}
          </a>
        </div>
      </div>
    </section>
  )
}
