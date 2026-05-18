import Link from 'next/link'
import { Baby, BookOpen, Layers, GraduationCap, Download } from 'lucide-react'

const levels = [
  {
    icon: Baby,
    title: 'প্রাক-প্রাথমিক',
    classes: 'প্লে ও নার্সারি',
    desc: 'খেলার ছলে শেখার আনন্দময় পরিবেশে শিশুদের বিকাশ',
    color: 'bg-pink-50 border-pink-200 text-pink-700',
    iconColor: 'bg-pink-100 text-pink-600',
  },
  {
    icon: BookOpen,
    title: 'প্রাথমিক',
    classes: 'প্রথম থেকে পঞ্চম',
    desc: 'মূল্যবোধ ও জ্ঞানের ভিত্তি গড়ার পর্যায়',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconColor: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Layers,
    title: 'নিম্ন মাধ্যমিক',
    classes: 'ষষ্ঠ থেকে অষ্টম',
    desc: 'বিষয়ভিত্তিক জ্ঞানের প্রসার ও দক্ষতা উন্নয়ন',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    iconColor: 'bg-purple-100 text-purple-600',
  },
  {
    icon: GraduationCap,
    title: 'মাধ্যমিক',
    classes: 'নবম ও দশম শ্রেণি',
    desc: 'বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগ',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    iconColor: 'bg-amber-100 text-amber-600',
  },
]

export default function AcademicsSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4 bangla">
            একাডেমিক বিভাগ
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 bangla">
            সকল স্তরে মানসম্মত শিক্ষা
          </h2>
          <p className="text-neutral-500 mt-3 bangla max-w-xl mx-auto">
            প্লে থেকে দশম শ্রেণি পর্যন্ত NCTB অনুমোদিত কারিকুলামে সুশৃঙ্খল পাঠদান
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {levels.map((level) => (
            <div key={level.title} className={`rounded-2xl border p-6 ${level.color} transition-shadow hover:shadow-md`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${level.iconColor}`}>
                <level.icon size={22} />
              </div>
              <h3 className="font-display font-bold text-lg mb-1 bangla">{level.title}</h3>
              <p className="text-sm font-medium mb-2 bangla opacity-80">{level.classes}</p>
              <p className="text-sm opacity-70 bangla leading-relaxed">{level.desc}</p>
            </div>
          ))}
        </div>

        {/* NCTB books link */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Download size={22} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 bangla">NCTB পাঠ্যপুস্তক ডাউনলোড</h3>
              <p className="text-neutral-500 text-sm bangla">সরাসরি NCTB ওয়েবসাইট থেকে বিনামূল্যে বই ডাউনলোড করুন</p>
            </div>
          </div>
          <a
            href="https://nctb.gov.bd/site/page/aad2b658-73a0-4d55-83a0-e6e7f69e5519/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors bangla text-sm"
          >
            <Download size={16} />
            বই ডাউনলোড করুন
          </a>
        </div>
      </div>
    </section>
  )
}
