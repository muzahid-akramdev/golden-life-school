import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

const highlights = [
  'প্লে থেকে দশম শ্রেণি পর্যন্ত একই ক্যাম্পাসে',
  'NCTB অনুমোদিত পাঠ্যক্রম অনুসরণ',
  'অভিজ্ঞ ও প্রশিক্ষিত শিক্ষক মণ্ডলী',
  'নিয়মিত সহশিক্ষা কার্যক্রম ও সাংস্কৃতিক অনুষ্ঠান',
  'অনলাইনে ফলাফল ও নোটিশ দেখার সুবিধা',
]

export default function AboutSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left visual */}
          <div className="relative">
            <div className="bg-primary-800 rounded-3xl p-10 text-white">
              <div className="text-6xl font-display font-bold text-gold-400 mb-2">২০১৫</div>
              <p className="text-2xl font-display font-semibold mb-4 bangla">থেকে আলোকিত পথচলা</p>
              <p className="text-primary-200 bangla leading-relaxed">
                একটি স্বপ্ন থেকে জন্ম নেওয়া এই বিদ্যালয় আজ কাজিপুরের অগণিত পরিবারের বিশ্বাসের প্রতিষ্ঠান হয়ে উঠেছে।
              </p>
              <div className="mt-8 pt-8 border-t border-primary-700 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-gold-400 bangla">প্লে</div>
                  <div className="text-primary-300 text-sm bangla">থেকে শুরু</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-400 bangla">দশম</div>
                  <div className="text-primary-300 text-sm bangla">শ্রেণি পর্যন্ত</div>
                </div>
              </div>
            </div>

            {/* Accent card */}
            <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white rounded-2xl p-5 shadow-xl max-w-xs">
              <div className="text-sm font-semibold bangla">সরকার অনুমোদিত</div>
              <div className="text-xs opacity-80 bangla">বিদ্যালয় কোড: ৪৫০৭৯৫</div>
            </div>
          </div>

          {/* Right content */}
          <div>
            <div className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4 bangla">
              আমাদের সম্পর্কে
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-5 bangla leading-snug">
              কাজিপুরের ব্যতিক্রমধর্মী <span className="text-primary-600">শিক্ষাপ্রতিষ্ঠান</span>
            </h2>
            <p className="text-neutral-600 bangla leading-relaxed mb-6">
              ২০১৫ সালে প্রধান শিক্ষক ডাঃ মোঃ আমিনুল ইসলামের হাত ধরে প্রাক-প্রাথমিক দুটি শ্রেণি নিয়ে যে যাত্রা শুরু হয়েছিল, অভিভাবকদের আস্থা ও ভালোবাসায় আজ তা দশম শ্রেণি পর্যন্ত বিস্তৃত।
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-700 bangla">
                  <CheckCircle size={18} className="text-primary-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/about" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors bangla">
              বিস্তারিত জানুন
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
