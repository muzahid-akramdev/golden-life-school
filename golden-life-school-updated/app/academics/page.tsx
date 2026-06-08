import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GRADING, SCHOOL } from '@/lib/data'
import { Download, BookOpen, ExternalLink } from 'lucide-react'

// NCTB official page URLs (class-wise)
const nctbLinks = [
  { label: 'প্লে ও নার্সারি', url: 'https://nctb.gov.bd/site/page/aad2b658-73a0-4d55-83a0-e6e7f69e5519/', note: 'প্রাক-প্রাথমিক' },
  { label: 'প্রথম শ্রেণি', url: 'https://nctb.gov.bd/site/page/aad2b658-73a0-4d55-83a0-e6e7f69e5519/', note: 'প্রাথমিক' },
  { label: 'দ্বিতীয় শ্রেণি', url: 'https://nctb.gov.bd/site/page/aad2b658-73a0-4d55-83a0-e6e7f69e5519/', note: 'প্রাথমিক' },
  { label: 'তৃতীয় শ্রেণি', url: 'https://nctb.gov.bd/site/page/aad2b658-73a0-4d55-83a0-e6e7f69e5519/', note: 'প্রাথমিক' },
  { label: 'চতুর্থ শ্রেণি', url: 'https://nctb.gov.bd/site/page/aad2b658-73a0-4d55-83a0-e6e7f69e5519/', note: 'প্রাথমিক' },
  { label: 'পঞ্চম শ্রেণি', url: 'https://nctb.gov.bd/site/page/aad2b658-73a0-4d55-83a0-e6e7f69e5519/', note: 'প্রাথমিক' },
  { label: 'ষষ্ঠ শ্রেণি', url: 'https://nctbbooks.com/categories/class-six/', note: 'নিম্ন মাধ্যমিক' },
  { label: 'সপ্তম শ্রেণি', url: 'https://nctbbooks.com/categories/class-seven/', note: 'নিম্ন মাধ্যমিক' },
  { label: 'অষ্টম শ্রেণি', url: 'https://nctbbooks.com/categories/class-eight/', note: 'নিম্ন মাধ্যমিক' },
  { label: 'নবম-দশম শ্রেণি', url: 'https://nctbbooks.com/categories/class-nine-ten/', note: 'মাধ্যমিক (SSC)' },
]

// 6-8 subjects with MCQ/written breakdown
const sixToEightSubjects = [
  { name: 'বাংলা প্রথম পত্র', full: 100, mcq: 30, written: 70, hasObjective: true },
  { name: 'বাংলা দ্বিতীয় পত্র', full: 50, mcq: 0, written: 50, hasObjective: false },
  { name: 'ইংরেজি প্রথম পত্র', full: 100, mcq: 0, written: 100, hasObjective: false },
  { name: 'ইংরেজি দ্বিতীয় পত্র', full: 50, mcq: 0, written: 50, hasObjective: false },
  { name: 'গণিত', full: 100, mcq: 30, written: 70, hasObjective: true },
  { name: 'বিজ্ঞান', full: 100, mcq: 30, written: 70, hasObjective: true },
  { name: 'বাংলাদেশ ও বিশ্বপরিচয়', full: 100, mcq: 30, written: 70, hasObjective: true },
  { name: 'ইসলাম শিক্ষা', full: 100, mcq: 30, written: 70, hasObjective: true },
  { name: 'কৃষি শিক্ষা', full: 100, mcq: 30, written: 70, hasObjective: true },
  { name: 'তথ্য প্রযুক্তি', full: 25, mcq: 25, written: 0, hasObjective: true },
]

// 9-10 subjects (Science) with MCQ/written
const nineToTenScience = [
  { name: 'বাংলা প্রথম পত্র', full: 100, mcq: 30, written: 70 },
  { name: 'বাংলা দ্বিতীয় পত্র', full: 100, mcq: 30, written: 70 },
  { name: 'ইংরেজি প্রথম পত্র', full: 100, mcq: 0, written: 100 },
  { name: 'ইংরেজি দ্বিতীয় পত্র', full: 100, mcq: 0, written: 100 },
  { name: 'গণিত', full: 100, mcq: 30, written: 70 },
  { name: 'পদার্থবিজ্ঞান', full: 100, mcq: 30, written: 70 },
  { name: 'রসায়ন', full: 100, mcq: 30, written: 70 },
  { name: 'জীববিজ্ঞান', full: 100, mcq: 30, written: 70 },
  { name: 'উচ্চতর গণিত / কৃষিশিক্ষা', full: 100, mcq: 30, written: 70 },
  { name: 'বাংলাদেশ ও বিশ্বপরিচয়', full: 100, mcq: 30, written: 70 },
  { name: 'ইসলাম শিক্ষা', full: 100, mcq: 30, written: 70 },
  { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', full: 50, mcq: 25, written: 25 },
]

function SubjectTable({ subjects }: { subjects: { name: string; full: number; mcq: number; written: number }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-primary-800 text-white">
          <tr>
            {['বিষয়', 'পূর্ণমান', 'নৈবত্তিক', 'লিখিত', 'বিভাজন'].map(h => (
              <th key={h} className="text-left px-4 py-2.5 bangla font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subjects.map((s, i) => (
            <tr key={s.name} className={`border-b border-neutral-100 ${i%2===0?'bg-white':'bg-neutral-50'}`}>
              <td className="px-4 py-2.5 font-medium text-neutral-800 bangla">{s.name}</td>
              <td className="px-4 py-2.5 text-center font-semibold text-primary-700">{s.full}</td>
              <td className="px-4 py-2.5 text-center text-neutral-600">{s.mcq > 0 ? s.mcq : '—'}</td>
              <td className="px-4 py-2.5 text-center text-neutral-600">{s.written > 0 ? s.written : '—'}</td>
              <td className="px-4 py-2.5">
                <span className={`text-xs px-2 py-0.5 rounded-full bangla ${s.full===100?'bg-primary-100 text-primary-700':s.full===50?'bg-gold-100 text-gold-700':'bg-neutral-100 text-neutral-600'}`}>
                  {s.full >= 100 ? '৩০+৭০' : s.full === 50 ? '২০+৩০' : s.full === 25 ? 'শুধু নৈবত্তিক' : `${s.mcq}+${s.written}`}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AcademicsPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-display text-3xl font-bold mb-2 bangla">একাডেমিক তথ্য</h1>
            <p className="text-primary-200 bangla">পাঠ্যক্রম, বিষয়, পরীক্ষা ও গ্রেডিং সিস্টেম</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

          {/* NCTB Books — class by class */}
          <section className="bg-white rounded-2xl border border-neutral-200 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <Download size={20} className="text-primary-600"/>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-neutral-800 bangla">NCTB পাঠ্যপুস্তক ডাউনলোড</h2>
                <p className="text-sm text-neutral-500 bangla">শ্রেণি অনুযায়ী সরাসরি ডাউনলোড করুন</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {nctbLinks.map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 border border-primary-200 rounded-xl p-4 hover:bg-primary-50 hover:border-primary-400 transition-all text-center group">
                  <BookOpen size={20} className="text-primary-500 group-hover:text-primary-700"/>
                  <span className="text-primary-700 font-medium bangla text-sm">{link.label}</span>
                  <span className="text-xs text-neutral-400 bangla">{link.note}</span>
                  <ExternalLink size={12} className="text-neutral-300 group-hover:text-primary-400"/>
                </a>
              ))}
            </div>
          </section>

          {/* Exams */}
          <section className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl font-bold text-neutral-800 mb-4 bangla">পরীক্ষা পদ্ধতি</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SCHOOL.exams.map((exam, i) => (
                <div key={exam} className="bg-primary-50 rounded-xl p-5 border border-primary-100">
                  <div className="text-3xl font-bold text-primary-200 mb-2">{i+1}</div>
                  <h3 className="font-semibold text-primary-800 bangla">{exam}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Grading — all classes */}
          <section className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl font-bold text-neutral-800 mb-4 bangla">গ্রেডিং সিস্টেম</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Primary 1-8 */}
              <div>
                <h3 className="font-semibold text-neutral-700 bangla mb-3 text-sm bg-neutral-100 px-3 py-1.5 rounded-lg inline-block">প্রথম — অষ্টম শ্রেণি</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-primary-800 text-white">
                    <tr>{['গ্রেড','GPA','নম্বর সীমা','মন্তব্য'].map(h => <th key={h} className="text-left px-3 py-2 bangla font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {GRADING.map((g, i) => (
                      <tr key={g.grade} className={`border-b border-neutral-100 ${i%2===0?'bg-white':'bg-neutral-50'}`}>
                        <td className="px-3 py-2 font-bold text-primary-700 bangla">{g.grade}</td>
                        <td className="px-3 py-2 text-neutral-700 bangla">{g.gpa}</td>
                        <td className="px-3 py-2 text-neutral-600 bangla">{g.range}</td>
                        <td className="px-3 py-2 text-neutral-500 bangla text-xs">{g.point}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* SSC 9-10 */}
              <div>
                <h3 className="font-semibold text-neutral-700 bangla mb-3 text-sm bg-neutral-100 px-3 py-1.5 rounded-lg inline-block">নবম — দশম শ্রেণি (SSC)</h3>
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-primary-800 text-white">
                    <tr>{['গ্রেড','GPA','নম্বর সীমা','মন্তব্য'].map(h => <th key={h} className="text-left px-3 py-2 bangla font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {GRADING.map((g, i) => (
                      <tr key={g.grade} className={`border-b border-neutral-100 ${i%2===0?'bg-white':'bg-neutral-50'}`}>
                        <td className="px-3 py-2 font-bold text-primary-700 bangla">{g.grade}</td>
                        <td className="px-3 py-2 bangla">{g.gpa}</td>
                        <td className="px-3 py-2 bangla">{g.range}</td>
                        <td className="px-3 py-2 bangla text-xs text-neutral-500">{g.point}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 bg-gold-50 border border-gold-200 rounded-lg p-3 text-xs bangla text-gold-800">
                  <strong>বিশেষ নিয়ম:</strong> যেকোনো একটি বিষয়ে F পেলে সামগ্রিক ফলাফল Fail।  CGPA = মূল বিষয়গুলোর গড় GPA।
                </div>
              </div>
            </div>
          </section>

          {/* 6-8 subjects */}
          <section className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl font-bold text-neutral-800 mb-2 bangla">ষষ্ঠ — অষ্টম শ্রেণি: বিষয় ও নম্বর বিভাজন</h2>
            <p className="text-sm text-neutral-500 bangla mb-4">১০০ নম্বরে → নৈবত্তিক ৩০ + লিখিত ৭০ | ৫০ নম্বরে → নৈবত্তিক ২০ + লিখিত ৩০</p>
            <SubjectTable subjects={sixToEightSubjects} />
          </section>

          {/* 9-10 subjects */}
          <section className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl font-bold text-neutral-800 mb-2 bangla">নবম — দশম শ্রেণি (বিজ্ঞান বিভাগ): বিষয় ও নম্বর বিভাজন</h2>
            <p className="text-sm text-neutral-500 bangla mb-4">মানবিক ও ব্যবসায় শিক্ষার জন্য ঐচ্ছিক বিষয় পরিবর্তিত হবে</p>
            <SubjectTable subjects={nineToTenScience} />
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
