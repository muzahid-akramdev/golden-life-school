'use client'
import { useState, useRef } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { Search, Printer, GraduationCap } from 'lucide-react'
import { calcResult, CLASS_GROUPS, EXAM_TYPES, GRADE_COLORS } from '@/lib/grades'

const currentYear = new Date().getFullYear()
const sessions = Array.from({ length: 8 }, (_, i) => String(currentYear - 2 + i))

export default function ResultPage() {
  const [roll, setRoll] = useState('')
  const [cls, setCls] = useState('9')
  const [exam, setExam] = useState(EXAM_TYPES[1])
  const [session, setSession] = useState(String(currentYear))
  const [loading, setLoading] = useState(false)
  const [student, setStudent] = useState<any>(null)
  const [result, setResult] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setNotFound(false); setStudent(null); setResult(null)
    const { data } = await supabase.from('gl_students').select('*')
      .eq('roll', Number(roll)).eq('class_num', cls).eq('exam_type', exam).eq('exam_year', session).single()
    if (!data) { setNotFound(true); setLoading(false); return }
    setStudent(data)
    setResult(calcResult(data))
    setLoading(false)
  }

  const handlePrint = () => {
    if (!student || !result) return
    const win = window.open('', '_blank')
    if (!win) return
    const subjectRows = result.subjects.map((s: any, i: number) => {
      const gc = (GRADE_COLORS as any)[s.grade] || (GRADE_COLORS as any)['F']
      return `<tr style="background:${i%2===0?'#fff':'#f9fafb'}">
        <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${i+1}</td>
        <td style="border:1px solid #ddd;padding:5px 10px;font-size:12px;font-weight:500;text-align:left">${s.label}</td>
        <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${s.max}</td>
        <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${s.naib>0?s.naib:'—'}</td>
        <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${s.written>0?s.written:'—'}</td>
        <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px;font-weight:700">${s.total}</td>
        <td style="border:1px solid #ddd;padding:5px 8px;text-align:center"><span style="background:${gc.bg};color:${gc.text};padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700">${s.grade}</span></td>
        <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px;font-weight:600">${s.gpa.toFixed(2)}</td>
      </tr>`
    }).join('')
    win.document.write(`<!DOCTYPE html><html lang="bn"><head>
      <meta charset="UTF-8"><title>মার্কশিট — ${student.name}</title>
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        *{box-sizing:border-box}
        body{font-family:'Hind Siliguri',sans-serif;margin:0;padding:16px;background:#f3f4f6}
        .toolbar{text-align:center;margin-bottom:16px}
        .btn{background:#1D5FA8;color:white;border:none;padding:10px 24px;border-radius:8px;font-size:14px;font-family:inherit;cursor:pointer;font-weight:600}
        .card{max-width:700px;margin:0 auto;background:white;border:2px solid #1D5FA8;border-radius:8px;overflow:hidden}
        @media print{.toolbar{display:none!important}body{background:white;padding:0}*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}}
      </style></head><body>
      <div class="toolbar"><button class="btn" onclick="window.print()">🖨️ প্রিন্ট / PDF সেভ করুন</button></div>
      <div class="card">
        <div style="background:#ffffff;color:#1D5FA8;padding:20px;text-align:center;border-bottom:3px solid #1D5FA8">
          <div style="font-size:18px;font-weight:700;margin-bottom:4px;color:#1D5FA8">গোল্ডেন লাইফ পাবলিক স্কুল</div>
          <div style="font-size:12px;color:#555">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ | স্থাপিতঃ ২০১৫ ইং</div>
          <div style="font-size:12px;color:#555">পরিচালকঃ ডাঃ মোঃ আমিনুল ইসলাম | মোবাইলঃ ০১৭৩৩৬৯৬৪৭৭</div>
          <div style="margin-top:10px;display:inline-block;border:2px solid #1D5FA8;color:#1D5FA8;padding:4px 20px;border-radius:20px;font-size:13px;font-weight:600">প্রগতি পত্র / মার্কশীট</div>
        </div>
        <div style="background:#f9fafb;padding:12px 16px;border-bottom:1px solid #e5e7eb;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
          <div style="font-size:12px"><span style="color:#6b7280">নামঃ </span><strong>${student.name}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">শ্রেণিঃ </span><strong>${student.class}${student.section?' ('+student.section+')':''}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">রোলঃ </span><strong>${student.roll}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">পরীক্ষাঃ </span><strong>${exam}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">সেশনঃ </span><strong>${session}</strong></div>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="background:#f3f4f6;color:#1D5FA8;border-bottom:2px solid #1D5FA8">
            <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">ক্রম</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:left;font-size:12px">বিষয়</th>
            <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">পূর্ণমান</th>
            <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">নৈবত্তিক</th>
            <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">লিখিত</th>
            <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">মোট</th>
            <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">গ্রেড</th>
            <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">জিপিএ</th>
          </tr></thead>
          <tbody>${subjectRows}</tbody>
          <tfoot><tr style="background:#EFF6FF;-webkit-print-color-adjust:exact;print-color-adjust:exact">
            <td colspan="5" style="border:1px solid #ddd;padding:8px;text-align:right;font-weight:700;font-size:12px">সর্বমোট</td>
            <td style="border:1px solid #ddd;padding:8px;text-align:center;font-weight:700;font-size:13px">${result.totalMarks}</td>
            <td colspan="2"></td>
          </tr></tfoot>
        </table>
        <div style="padding:16px;text-align:center">
          <div style="display:inline-flex;gap:16px;margin-bottom:12px">
            <div style="border:2px solid ${result.passed?'#86efac':'#fca5a5'};border-radius:10px;padding:8px 20px">
              <div style="font-size:18px;font-weight:700;color:${result.passed?'#16a34a':'#dc2626'}">${result.passed?'উত্তীর্ণ':'অনুত্তীর্ণ'}</div>
              <div style="font-size:11px;color:#6b7280">ফলাফল</div>
            </div>
            <div style="border:2px solid #93c5fd;border-radius:10px;padding:8px 20px">
              <div style="font-size:18px;font-weight:700;color:#1d4ed8">${result.cgpa.toFixed(2)}</div>
              <div style="font-size:11px;color:#6b7280">CGPA</div>
            </div>
            <div style="border:2px solid #fcd34d;border-radius:10px;padding:8px 20px">
              <div style="font-size:18px;font-weight:700;color:#d97706">${result.cgpaGrade}</div>
              <div style="font-size:11px;color:#6b7280">গ্রেড</div>
            </div>
          </div>
          <p style="font-size:10px;color:#9ca3af">[ This marksheet is computer generated ]</p>
          <div style="display:flex;justify-content:space-between;margin-top:24px;padding-top:12px;border-top:1px solid #e5e7eb">
            <div style="text-align:center"><div style="width:120px;border-bottom:1px solid #333;margin-bottom:4px"></div><div style="font-size:11px;color:#6b7280">শিক্ষার্থীর স্বাক্ষর</div></div>
            <div style="text-align:center"><div style="width:150px;border-bottom:1px solid #333;margin-bottom:4px"></div><div style="font-size:11px;color:#6b7280">অধক্ষ্যের স্বাক্ষর ও সীলমোহর</div></div>
          </div>
        </div>
      </div>
    </body></html>`)
    win.document.close()
  }

  const sel = "w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla"

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-display text-3xl font-bold mb-2 bangla">পরীক্ষার ফলাফল</h1>
            <p className="text-primary-200 bangla">রোল নম্বর, শ্রেণি ও পরীক্ষা বেছে দেখুন</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div><label className="block text-xs font-medium text-neutral-600 mb-1 bangla">রোল *</label>
                <input required value={roll} onChange={e=>setRoll(e.target.value)} className={sel} placeholder="রোল নম্বর"/></div>
              <div><label className="block text-xs font-medium text-neutral-600 mb-1 bangla">শ্রেণি *</label>
                <select required value={cls} onChange={e=>setCls(e.target.value)} className={sel}>
                  {Object.entries(CLASS_GROUPS as any).map(([k,v]:any)=><option key={k} value={k}>{v.label}</option>)}
                </select></div>
              <div><label className="block text-xs font-medium text-neutral-600 mb-1 bangla">পরীক্ষা *</label>
                <select required value={exam} onChange={e=>setExam(e.target.value)} className={sel}>
                  {EXAM_TYPES.map((e:string)=><option key={e} value={e}>{e}</option>)}
                </select></div>
              <div><label className="block text-xs font-medium text-neutral-600 mb-1 bangla">সেশন *</label>
                <select required value={session} onChange={e=>setSession(e.target.value)} className={sel}>
                  {sessions.map(s=><option key={s} value={s}>{s}</option>)}
                </select></div>
            </div>
            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl text-sm bangla">
              <Search size={16}/>{loading?'খোঁজা হচ্ছে...':'ফলাফল দেখুন'}
            </button>
          </form>

          {notFound && <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center bangla text-red-700">তথ্য পাওয়া যায়নি।</div>}

          {student && result && (
            <div>
              <div className="flex justify-end mb-3">
                <button onClick={handlePrint} className="flex items-center gap-2 border border-neutral-300 hover:bg-neutral-50 px-4 py-2 rounded-xl text-sm bangla text-neutral-600">
                  <Printer size={15}/> প্রিন্ট / ডাউনলোড
                </button>
              </div>

              <div ref={printRef} className="bg-white rounded-2xl border-2 border-primary-800 overflow-hidden">
                {/* Header */}
                <div className="bg-primary-800 text-white p-6 text-center header">
                  <div className="flex justify-center mb-3"><GraduationCap size={32} className="text-gold-400"/></div>
                  <h2 className="font-display text-xl font-bold bangla">গোল্ডেন লাইফ পাবলিক স্কুল</h2>
                  <p className="text-primary-200 text-sm bangla">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ | স্থাপিতঃ ২০১৫ ইং</p>
                  <p className="text-primary-200 text-sm bangla">পরিচালকঃ ডাঃ মোঃ আমিনুল ইসলাম | মোবাইলঃ ০১৭৩৩৬৯৬৪৭৭</p>
                  <div className="mt-3 inline-block bg-gold-500 text-white px-6 py-1.5 rounded-full text-sm font-semibold bangla">প্রগতি পত্র / মার্কশীট</div>
                </div>

                {/* Student info */}
                <div className="p-4 border-b border-neutral-200 bg-neutral-50 info">
                  {[
                    ['নামঃ', student.name], ['শ্রেণিঃ', `${(CLASS_GROUPS as any)[student.class_num]?.label||student.class_num}${student.section?` (${student.section})`:''}`],
                    ['রোলঃ', student.roll], ['পরীক্ষাঃ', student.exam_type],
                    ['সেশনঃ', student.exam_year],
                  ].map(([k,v])=>(
                    <div key={String(k)} className="text-sm bangla"><span className="text-neutral-500">{k} </span><span className="font-semibold text-neutral-800">{v}</span></div>
                  ))}
                </div>

                {/* Subjects table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-primary-800 text-white">
                      <tr>
                        <th className="px-3 py-3 text-left bangla w-6">ক্রম</th>
                        <th className="px-4 py-3 text-left bangla">বিষয়</th>
                        <th className="px-3 py-3 bangla">পূর্ণমান</th>
                        <th className="px-3 py-3 bangla">নৈবত্তিক</th>
                        <th className="px-3 py-3 bangla">লিখিত</th>
                        <th className="px-3 py-3 bangla">মোট</th>
                        <th className="px-3 py-3 bangla">গ্রেড</th>
                        <th className="px-3 py-3 bangla">জিপিএ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((s: any, i: number) => {
                        const gc = (GRADE_COLORS as any)[s.grade] || (GRADE_COLORS as any)['F']
                        return (
                          <tr key={s.key} className={`border-b border-neutral-100 ${i%2===0?'bg-white':'bg-neutral-50'}`}>
                            <td className="px-3 py-3 text-center text-neutral-400 text-xs">{i+1}</td>
                            <td className="px-4 py-3 font-medium text-neutral-800 bangla">{s.label}</td>
                            <td className="px-3 py-3 text-center text-neutral-500">{s.max}</td>
                            <td className="px-3 py-3 text-center text-neutral-600">{s.naib > 0 ? s.naib : '—'}</td>
                            <td className="px-3 py-3 text-center text-neutral-600">{s.written > 0 ? s.written : '—'}</td>
                            <td className="px-3 py-3 text-center font-bold text-neutral-800">{s.total}</td>
                            <td className="px-3 py-3 text-center">
                              <span className="px-2 py-0.5 rounded text-xs font-bold" style={{background: gc.bg, color: gc.text}}>{s.grade}</span>
                            </td>
                            <td className="px-3 py-3 text-center font-semibold text-neutral-700">{s.gpa.toFixed(2)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot className="bg-primary-50 border-t-2 border-primary-300">
                      <tr>
                        <td colSpan={5} className="px-4 py-3 text-right font-bold text-primary-800 bangla">সর্বমোট</td>
                        <td className="px-3 py-3 text-center font-bold text-primary-800">{result.totalMarks}</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Summary */}
                <div className="p-6 border-t border-neutral-200">
                  <div className="summary flex flex-wrap justify-center gap-4 mb-8">
                    {[
                      {label:'ফলাফল', value: result.passed?'উত্তীর্ণ':'অনুত্তীর্ণ', c: result.passed?'border-green-300 text-green-700':'border-red-300 text-red-700'},
                      {label:'CGPA', value: result.cgpa.toFixed(2), c:'border-primary-300 text-primary-700'},
                      {label:'গ্রেড', value: result.cgpaGrade, c:'border-gold-300 text-gold-700'},
                      {label:'মোট নম্বর', value: String(result.totalMarks), c:'border-neutral-300 text-neutral-700'},
                    ].map(item => (
                      <div key={item.label} className={`box border-2 rounded-xl px-6 py-3 text-center ${item.c}`}>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <div className="text-xs bangla mt-0.5 text-neutral-500">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-neutral-400 mb-8">[ This marksheet is computer generated ]</p>
                  <div className="sig flex justify-between items-end pt-4 border-t border-neutral-200">
                    <div className="text-center"><div className="sig-line w-32 border-b border-neutral-400 mb-1"></div><p className="text-xs text-neutral-500 bangla">শিক্ষার্থীর স্বাক্ষর</p></div>
                    <div className="text-center"><div className="sig-line w-40 border-b border-neutral-400 mb-1"></div><p className="text-xs text-neutral-500 bangla">অধক্ষ্যের স্বাক্ষর ও সীলমোহর</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
