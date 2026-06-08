'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { LogIn, LogOut, Save, CheckCircle } from 'lucide-react'
import { SCHOOL } from '@/lib/data'

type Teacher = { id: string; name: string; subjects: string[]; classes: string[] }
type Student = { id: string; name: string; roll: string; class: string; section: string | null }

const examTypes = SCHOOL.exams
const sessions = ['২০২৫', '২০২৪', '২০২৩']

export default function TeacherPortal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedExam, setSelectedExam] = useState('')
  const [selectedSession, setSelectedSession] = useState('২০২৫')
  const [selectedSection, setSelectedSection] = useState('')
  const [students, setStudents] = useState<Student[]>([])
  const [marks, setMarks] = useState<Record<string, string>>({})
  const [fullMarks, setFullMarks] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password })
    if (authErr) { setError('ইমেইল বা পাসওয়ার্ড ভুল'); setLoading(false); return }
    const { data: tData } = await supabase.from('teachers').select('*').eq('user_id', data.user?.id).single()
    if (tData) setTeacher(tData as Teacher)
    else setError('শিক্ষক অ্যাকাউন্ট পাওয়া যায়নি')
    setLoading(false)
  }

  const logout = async () => { await supabase.auth.signOut(); setTeacher(null) }

  const loadStudents = async () => {
    if (!selectedClass || !selectedExam || !selectedSubject) return
    let q = supabase.from('students').select('*').eq('class', selectedClass).eq('session', selectedSession)
    if (selectedSection) q = q.eq('section', selectedSection)
    const { data } = await q.order('roll')
    setStudents(data as Student[] || [])
    const initMarks: Record<string, string> = {}
    const initFull: Record<string, string> = {}
    const { data: existing } = await supabase.from('results').select('*')
      .eq('exam_type', selectedExam).eq('subject', selectedSubject).eq('session', selectedSession)
    ;(data as Student[] || []).forEach(s => {
      const ex = (existing || []).find((r: any) => r.student_id === s.id)
      initMarks[s.id] = ex ? String(ex.marks_obtained) : ''
      initFull[s.id] = ex ? String(ex.full_marks) : '100'
    })
    setMarks(initMarks); setFullMarks(initFull); setSaved(false)
  }

  const saveResults = async () => {
    setSaving(true)
    const upserts = students.map(s => ({
      student_id: s.id, exam_type: selectedExam, subject: selectedSubject,
      marks_obtained: Number(marks[s.id] || 0), full_marks: Number(fullMarks[s.id] || 100),
      class: selectedClass, section: selectedSection || null, session: selectedSession,
    }))
    await supabase.from('results').upsert(upserts, { onConflict: 'student_id,exam_type,subject,session' })
    setSaved(true); setSaving(false)
  }

  const field = "border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 bangla"

  if (!teacher) return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 w-full max-w-sm shadow-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <LogIn size={24} className="text-gold-600" />
            </div>
            <h1 className="font-display text-xl font-bold text-neutral-800 bangla">শিক্ষক পোর্টাল</h1>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5 bangla">ইমেইল</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full ${field}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5 bangla">পাসওয়ার্ড</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className={`w-full ${field}`} />
            </div>
            {error && <p className="text-red-500 text-sm bangla">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-xl font-medium bangla transition-colors">
              {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-gradient-to-r from-gold-600 to-gold-700 text-white py-4">
          <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
            <div className="bangla">
              <p className="font-semibold">{teacher.name}</p>
              <p className="text-gold-200 text-xs">শিক্ষক পোর্টাল</p>
            </div>
            <button onClick={logout} className="flex items-center gap-1.5 text-gold-200 hover:text-white text-sm bangla">
              <LogOut size={15} /> লগআউট
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-neutral-800 mb-4 bangla">ফলাফল এন্ট্রি</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)} className={field}>
                {sessions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={field}>
                <option value="">শ্রেণি</option>
                {(teacher.classes || SCHOOL.classes).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className={field}>
                <option value="">বিভাগ (ঐচ্ছিক)</option>
                {SCHOOL.sections.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className={field}>
                <option value="">বিষয়</option>
                {(teacher.subjects || []).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className={field}>
                <option value="">পরীক্ষা</option>
                {examTypes.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <button onClick={loadStudents}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium bangla transition-colors">
              শিক্ষার্থী লোড করুন
            </button>
          </div>

          {students.length > 0 && (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <p className="font-medium text-neutral-700 bangla text-sm">{selectedClass} — {selectedSubject} — {selectedExam}</p>
                <p className="text-neutral-500 text-sm bangla">{students.length} জন শিক্ষার্থী</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      {['রোল', 'নাম', 'পূর্ণমান', 'প্রাপ্তমান'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-neutral-600 bangla">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => (
                      <tr key={s.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="px-4 py-3 text-neutral-600 bangla">{s.roll}</td>
                        <td className="px-4 py-3 font-medium text-neutral-800 bangla">{s.name}</td>
                        <td className="px-4 py-3">
                          <input type="number" value={fullMarks[s.id] || '100'} onChange={e => setFullMarks(m => ({ ...m, [s.id]: e.target.value }))}
                            className="w-20 border border-neutral-300 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:border-primary-400" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" min="0" max={fullMarks[s.id] || '100'}
                            value={marks[s.id] || ''} onChange={e => setMarks(m => ({ ...m, [s.id]: e.target.value }))}
                            className="w-24 border border-neutral-300 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:border-primary-400"
                            placeholder="নম্বর" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-neutral-200 flex items-center gap-4">
                <button onClick={saveResults} disabled={saving}
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium bangla transition-colors">
                  <Save size={15} />
                  {saving ? 'সংরক্ষণ হচ্ছে...' : 'ফলাফল সংরক্ষণ করুন'}
                </button>
                {saved && <span className="flex items-center gap-1.5 text-green-600 text-sm bangla"><CheckCircle size={15} /> সংরক্ষিত!</span>}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
