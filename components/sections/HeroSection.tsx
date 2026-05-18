'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Award, GraduationCap } from 'lucide-react'
import SchoolLogo from '../ui/SchoolLogo'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Gold decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gold-400/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left - Text */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 text-gold-300 px-4 py-1.5 rounded-full text-sm mb-6 bangla">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
              ২০২৫ সালে ভর্তি চলছে
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 bangla">
              গোল্ডেন লাইফ
              <span className="block text-gold-400">পাবলিক স্কুল</span>
            </h1>

            <p className="text-primary-200 text-lg mb-2 bangla">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ</p>
            <p className="text-white/90 text-lg mb-8 bangla leading-relaxed max-w-lg">
              জ্ঞানের আলোয় আলোকিত জীবন গড়ার প্রতিশ্রুতি নিয়ে ২০১৫ সাল থেকে কাজিপুরের শিক্ষার্থীদের পাশে আছি।
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/admission" className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 bangla shadow-lg hover:shadow-xl">
                ভর্তির আবেদন করুন
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-xl font-medium transition-all duration-200 bangla">
                আরও জানুন
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/20">
              {[
                { icon: GraduationCap, label: 'প্লে-১০ম শ্রেণি', value: '১২টি ক্লাস' },
                { icon: Users, label: 'অভিজ্ঞ শিক্ষক', value: 'দক্ষ মণ্ডলী' },
                { icon: Award, label: 'প্রতিষ্ঠাকাল', value: '২০১৫ ইং' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon size={20} className="text-gold-400" />
                  <div>
                    <p className="text-white font-semibold text-sm bangla">{stat.value}</p>
                    <p className="text-primary-300 text-xs bangla">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 text-center">
                <SchoolLogo size={140} className="mx-auto mb-6" />
                <h2 className="font-display text-white text-2xl font-bold mb-2 bangla">
                  গোল্ডেন লাইফ পাবলিক স্কুল
                </h2>
                <p className="text-primary-200 bangla text-sm mb-4">বিদ্যালয় কোড: ৪৫০৭৯৫</p>
                <div className="inline-block bg-gold-500/20 border border-gold-400/40 text-gold-300 px-4 py-1.5 rounded-full text-xs bangla">
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-primary-600" />
                  <div>
                    <p className="text-xs text-neutral-500 bangla">কারিকুলাম</p>
                    <p className="text-sm font-bold text-neutral-800">NCTB</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-gold-500" />
                  <div>
                    <p className="text-xs text-neutral-500 bangla">স্থাপিত</p>
                    <p className="text-sm font-bold text-neutral-800">২০১৫</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
