import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SCHOOL, GRADING } from '@/lib/data'
import { CheckCircle } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-block bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-4 bangla">আমাদের সম্পর্কে</div>
            <h1 className="font-display text-4xl font-bold mb-3 bangla">গোল্ডেন লাইফ পাবলিক স্কুল</h1>
            <p className="text-primary-200 bangla">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {/* History */}
              <section>
                <h2 className="font-display text-2xl font-bold text-primary-800 mb-4 bangla">প্রতিষ্ঠার ইতিহাস</h2>
                <div className="prose bangla text-neutral-600 leading-relaxed space-y-4">
                  <p>২০১৫ সালে একটি মহৎ স্বপ্ন নিয়ে যাত্রা শুরু করেছিল গোল্ডেন লাইফ পাবলিক স্কুল। দীর্ঘদিন ধরে শিক্ষকতায় নিয়োজিত ডাঃ মোঃ আমিনুল ইসলাম অনুভব করলেন, কাজিপুরের শিশুদের জন্য একটি মানসম্পন্ন প্রাক-প্রাথমিক শিক্ষা প্রতিষ্ঠানের বড় প্রয়োজন।</p>
                  <p>অভিভাবকদের অনুরোধ ও উৎসাহে প্রথমে মাত্র প্লে ও নার্সারি ক্লাস নিয়ে শুরু হয় এই বিদ্যালয়ের পথচলা। ছোট্ট পরিসরে শুরু হলেও শিক্ষার গুণগত মান ও শিক্ষকদের আন্তরিক প্রচেষ্টায় দ্রুতই অভিভাবকদের আস্থা অর্জন করে নেয় প্রতিষ্ঠানটি।</p>
                  <p>বছরের পর বছর ধরে একটি একটি করে শ্রেণি বাড়তে থাকে। অভিভাবকরা চাইছিলেন তাদের সন্তানরা যেন একই পরিবেশে সব শ্রেণির পড়াশোনা সম্পন্ন করতে পারে। সেই চাওয়াকে সম্মান জানিয়ে আজ গোল্ডেন লাইফ পাবলিক স্কুল প্লে থেকে শুরু করে দশম শ্রেণি পর্যন্ত বিস্তৃত হয়েছে।</p>
                  <p>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত এই বিদ্যালয় (কোড: ৪৫০৭৯৫) আজ কাজিপুরের অগণিত পরিবারের বিশ্বাস ও ভালোবাসার প্রতিষ্ঠান।</p>
                </div>
              </section>

              {/* Mission Vision */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                    <h3 className="font-display text-xl font-bold text-primary-800 mb-3 bangla">আমাদের লক্ষ্য</h3>
                    <p className="text-neutral-600 bangla leading-relaxed text-sm">
                      প্রতিটি শিক্ষার্থীর মেধা, মনন ও মানবিক মূল্যবোধের সমন্বিত বিকাশের মাধ্যমে আদর্শ নাগরিক তৈরি করা এবং তাদের ভবিষ্যৎ জীবনে সফল হওয়ার উপযুক্ত ভিত্তি রচনা করা।
                    </p>
                  </div>
                  <div className="bg-gold-50 rounded-2xl p-6 border border-gold-100">
                    <h3 className="font-display text-xl font-bold text-gold-700 mb-3 bangla">আমাদের দৃষ্টিভঙ্গি</h3>
                    <p className="text-neutral-600 bangla leading-relaxed text-sm">
                      কাজিপুরের শ্রেষ্ঠ বিদ্যাপীঠ হিসেবে নিজেকে প্রতিষ্ঠিত করা, যেখান থেকে বের হওয়া প্রতিটি শিক্ষার্থী দেশ ও সমাজের জন্য আলোকবর্তিকা হয়ে উঠবে।
                    </p>
                  </div>
                </div>
              </section>

              {/* Obligations */}
              <section>
                <h2 className="font-display text-2xl font-bold text-primary-800 mb-4 bangla">শিক্ষার্থীর অঙ্গীকার</h2>
                <div className="space-y-2">
                  {[
                    'প্রতাহ সমাবেশের পূর্বে বিদ্যালয়ে আগমন করা',
                    'বিদ্যালয়ের নির্দিষ্ট পোষাক পরিধান করা',
                    'প্রতিটি মাসের সকল পাওনাদি নির্দিষ্ট সময়ের মধ্যে পরিশোধ করা',
                    'সহপাঠক্রমিক কার্যাবলী ও জাতীয় দিবসের কর্মসূচিতে অংশগ্রহণ করা',
                    'বিনা অনুমতিতে বিদ্যালয় থেকে বিরত না থাকা',
                    'বিনা কারণে অনুপস্থিত না থাকা এবং সার্বিক শৃঙ্খলা বজায় রাখা',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 py-2 border-b border-neutral-100 last:border-0">
                      <CheckCircle size={16} className="text-primary-600 mt-0.5 shrink-0" />
                      <span className="text-neutral-700 bangla text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info card */}
              <div className="bg-primary-800 text-white rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 bangla">বিদ্যালয়ের তথ্য</h3>
                <dl className="space-y-3 bangla text-sm">
                  {[
                    ['প্রতিষ্ঠাকাল', SCHOOL.established],
                    ['বিদ্যালয় কোড', SCHOOL.code],
                    ['শ্রেণি', 'প্লে — দশম'],
                    ['মাধ্যম', 'বাংলা'],
                    ['কারিকুলাম', 'NCTB'],
                    ['পরিচালক', SCHOOL.principal],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-primary-300">{k}</dt>
                      <dd className="font-medium text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Grading */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h3 className="font-display font-bold text-lg text-neutral-800 mb-4 bangla">গ্রেডিং সিস্টেম</h3>
                <table className="w-full text-sm bangla">
                  <thead>
                    <tr className="text-neutral-500 border-b border-neutral-100">
                      <th className="text-left pb-2">গ্রেড</th>
                      <th className="text-left pb-2">GPA</th>
                      <th className="text-left pb-2">নম্বর</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GRADING.map((g) => (
                      <tr key={g.grade} className="border-b border-neutral-50">
                        <td className="py-1.5 font-semibold text-primary-700">{g.grade}</td>
                        <td className="py-1.5 text-neutral-600">{g.gpa}</td>
                        <td className="py-1.5 text-neutral-500">{g.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
