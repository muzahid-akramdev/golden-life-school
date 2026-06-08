'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { SCHOOL } from '@/lib/data'
import { generateAdmissionPDF } from '@/lib/admissionPDF'
import { generatePratyayanPatra, generatePrashangsaPatra, generateTransferCertificate } from '@/lib/certificatesPDF'
import { calcResult, GRADE_COLORS } from '@/lib/grades'
import {
  LogIn, LogOut, Bell, Users, BookOpen, Image, FileText,
  Upload, Plus, Trash2, Eye, CheckCircle, X, Save,
  Download, UserPlus, Newspaper, Settings, Search, Award, FileCheck
} from 'lucide-react'

type Tab = 'dashboard' | 'notices' | 'students' | 'results' | 'admissions' | 'gallery' | 'blog' | 'teachers' | 'contacts' | 'signups' | 'certificates'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'g.l.k.g.a.p.h.s@gmail.com'

export default function AdminPanel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('dashboard')
  const [stats, setStats] = useState({ students: 0, admissions: 0, notices: 0, contacts: 0 })

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err || data.user?.email !== ADMIN_EMAIL) { setError('অ্যাক্সেস অনুমোদিত নয়'); return }
    setAuthed(true)
  }

  useEffect(() => {
    if (!authed) return
    Promise.all([
      supabase.from('students').select('id', { count: 'exact', head: true }),
      supabase.from('admissions').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('notices').select('id', { count: 'exact', head: true }),
      supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
    ]).then(([s, a, n, c]) => setStats({
      students: s.count || 0, admissions: a.count || 0,
      notices: n.count || 0, contacts: c.count || 0
    }))
  }, [authed])

  const field = "w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla"

  if (!authed) return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Settings size={24} className="text-primary-600" />
          </div>
          <h1 className="font-display text-xl font-bold text-neutral-800 bangla">অ্যাডমিন প্যানেল</h1>
          <p className="text-xs text-neutral-400 bangla mt-1">গোল্ডেন লাইফ পাবলিক স্কুল</p>
        </div>
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5 bangla">ইমেইল</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={field} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5 bangla">পাসওয়ার্ড</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className={field} />
          </div>
          {error && <p className="text-red-500 text-sm bangla">{error}</p>}
          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium bangla">লগইন</button>
        </form>
      </div>
    </div>
  )

  const navItems: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: Settings },
    { id: 'notices', label: 'নোটিশ', icon: Bell, badge: stats.notices },
    { id: 'students', label: 'শিক্ষার্থী', icon: Users, badge: stats.students },
    { id: 'results', label: 'ফলাফল', icon: BookOpen },
    { id: 'admissions', label: 'ভর্তি আবেদন', icon: UserPlus, badge: stats.admissions },
    { id: 'certificates', label: 'সার্টিফিকেট', icon: Award },
    { id: 'gallery', label: 'গ্যালারি', icon: Image },
    { id: 'blog', label: 'ব্লগ', icon: Newspaper },
    { id: 'teachers', label: 'শিক্ষক', icon: Users },
    { id: 'contacts', label: 'বার্তা', icon: FileText, badge: stats.contacts },
    { id: 'signups', label: 'শিক্ষার্থী অনুরোধ', icon: UserPlus },
  ]

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-primary-900 text-white shrink-0 flex flex-col">
        <div className="p-5 border-b border-primary-700">
          <p className="font-display font-bold text-sm bangla">অ্যাডমিন প্যানেল</p>
          <p className="text-primary-400 text-xs bangla mt-0.5">গোল্ডেন লাইফ স্কুল</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm bangla transition-colors ${
                tab === n.id ? 'bg-primary-600 text-white' : 'text-primary-300 hover:bg-primary-800 hover:text-white'
              }`}>
              <n.icon size={16} />
              <span className="flex-1 text-left">{n.label}</span>
              {n.badge ? <span className="bg-gold-500 text-white text-xs px-1.5 py-0.5 rounded-full">{n.badge}</span> : null}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-primary-700">
          <button onClick={() => { supabase.auth.signOut(); setAuthed(false) }}
            className="w-full flex items-center gap-2 text-primary-400 hover:text-white text-sm bangla px-3 py-2 rounded-xl hover:bg-primary-800 transition-colors">
            <LogOut size={15} /> লগআউট
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {tab === 'dashboard' && <DashboardTab stats={stats} />}
          {tab === 'notices' && <NoticesTab />}
          {tab === 'students' && <StudentsTab />}
          {tab === 'results' && <ResultsTab />}
          {tab === 'admissions' && <AdmissionsTab />}
          {tab === 'certificates' && <CertificatesTab />}
          {tab === 'gallery' && <GalleryTab />}
          {tab === 'blog' && <BlogTab />}
          {tab === 'teachers' && <TeachersTab />}
          {tab === 'contacts' && <ContactsTab />}
          {tab === 'signups' && <SignupsTab />}
        </div>
      </main>
    </div>
  )
}

// ── Dashboard ──────────────────────────────────────────
function DashboardTab({ stats }: { stats: any }) {
  const cards = [
    { label: 'মোট শিক্ষার্থী', value: stats.students, color: 'bg-primary-600' },
    { label: 'ভর্তি আবেদন (অপেক্ষমান)', value: stats.admissions, color: 'bg-gold-500' },
    { label: 'প্রকাশিত নোটিশ', value: stats.notices, color: 'bg-green-600' },
    { label: 'অপঠিত বার্তা', value: stats.contacts, color: 'bg-purple-600' },
  ]
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">ড্যাশবোর্ড</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className={`${c.color} text-white rounded-2xl p-5`}>
            <p className="text-3xl font-bold">{c.value}</p>
            <p className="text-sm opacity-80 bangla mt-1">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Notices ────────────────────────────────────────────
function NoticesTab() {
  const [notices, setNotices] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [important, setImportant] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.from('notices').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setNotices(data || []))
  }, [])

  const upload = async () => {
    if (!title || !file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `notices/${Date.now()}.${ext}`
    const { error: upErr } = await supabase.storage.from('school-files').upload(path, file, {cacheControl:'3600',upsert:false})
    if (upErr) { setMsg('আপলোড ব্যর্থ'); setUploading(false); return }
    const { data: urlData } = supabase.storage.from('school-files').getPublicUrl(path)
    const fileType = file.type.includes('pdf') ? 'pdf' : 'image'
    const { data } = await supabase.from('notices').insert([{ title, file_url: urlData.publicUrl, file_type: fileType, is_important: important }]).select().single()
    setNotices(n => [data, ...n])
    setTitle(''); setFile(null); setImportant(false); setMsg('নোটিশ প্রকাশিত হয়েছে!')
    setUploading(false)
  }

  const del = async (id: string) => {
    await supabase.from('notices').delete().eq('id', id)
    setNotices(n => n.filter(x => x.id !== id))
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">নোটিশ ব্যবস্থাপনা</h2>
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <h3 className="font-semibold text-neutral-800 mb-4 bangla">নতুন নোটিশ যোগ করুন</h3>
        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="নোটিশের শিরোনাম"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla" />
          <div className="flex items-center gap-4">
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 border-2 border-dashed border-neutral-300 hover:border-primary-400 rounded-xl px-6 py-3 text-sm text-neutral-500 bangla transition-colors">
              <Upload size={16} />
              {file ? file.name : 'PDF বা ছবি আপলোড করুন'}
            </button>
            <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
            <label className="flex items-center gap-2 text-sm bangla cursor-pointer">
              <input type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} className="w-4 h-4" />
              জরুরি নোটিশ
            </label>
          </div>
          {msg && <p className="text-green-600 text-sm bangla flex items-center gap-1"><CheckCircle size={14} />{msg}</p>}
          <button onClick={upload} disabled={uploading || !title || !file}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white px-5 py-2.5 rounded-xl text-sm bangla transition-colors">
            <Plus size={15} />{uploading ? 'আপলোড হচ্ছে...' : 'প্রকাশ করুন'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>{['শিরোনাম', 'ধরন', 'তারিখ', ''].map(h => <th key={h} className="text-left px-4 py-3 font-medium text-neutral-600 bangla">{h}</th>)}</tr>
          </thead>
          <tbody>
            {notices.map(n => (
              <tr key={n.id} className="border-b border-neutral-100">
                <td className="px-4 py-3 bangla font-medium">{n.title}{n.is_important && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">জরুরি</span>}</td>
                <td className="px-4 py-3 text-neutral-500 bangla">{n.file_type}</td>
                <td className="px-4 py-3 text-neutral-400 text-xs">{new Date(n.created_at).toLocaleDateString('bn-BD')}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <a href={n.file_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg"><Eye size={15} /></a>
                    <button onClick={() => del(n.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Students ───────────────────────────────────────────
function StudentsTab() {
  const [students, setStudents] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', roll: '', class: '', section: '', session: '২০২৫', father_name: '', mother_name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [search, setSearch] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.from('students').select('*').order('class').order('roll')
      .then(({ data }) => setStudents(data || []))
  }, [])

  const add = async () => {
    setLoading(true)
    const { data } = await supabase.from('students').insert([form]).select().single()
    if (data) { setStudents(s => [...s, data]); setMsg('শিক্ষার্থী যোগ হয়েছে!'); setForm({ name: '', roll: '', class: '', section: '', session: '২০২৫', father_name: '', mother_name: '', phone: '' }) }
    setLoading(false)
  }

  const del = async (id: string) => {
    await supabase.from('students').delete().eq('id', id)
    setStudents(s => s.filter(x => x.id !== id))
  }

  const handleExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const XLSX = await import('xlsx')
    const buf = await file.arrayBuffer()
    const wb = XLSX.read(buf)
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(ws) as any[]
    const mapped = rows.map(r => ({
      name: r['নাম'] || r['name'] || '',
      roll: String(r['রোল'] || r['roll'] || ''),
      class: r['শ্রেণি'] || r['class'] || '',
      section: r['বিভাগ'] || r['section'] || null,
      session: String(r['সেশন'] || r['session'] || '২০২৫'),
      father_name: r['পিতার নাম'] || r['father_name'] || '',
      mother_name: r['মাতার নাম'] || r['mother_name'] || '',
      phone: String(r['ফোন'] || r['phone'] || ''),
    }))
    const { data } = await supabase.from('students').insert(mapped).select()
    if (data) setStudents(s => [...s, ...data])
    setMsg(`${mapped.length}টি শিক্ষার্থী আমদানি হয়েছে!`)
  }

  const filtered = students.filter(s => s.name.includes(search) || s.roll.includes(search))
  const inputCls = "border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 bangla"

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">শিক্ষার্থী ব্যবস্থাপনা</h2>

      {/* Add form */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <h3 className="font-semibold mb-4 bangla">নতুন শিক্ষার্থী যোগ করুন</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="নাম *" className={inputCls} />
          <input value={form.roll} onChange={e => setForm(f => ({...f, roll: e.target.value}))} placeholder="রোল *" className={inputCls} />
          <select value={form.class} onChange={e => setForm(f => ({...f, class: e.target.value}))} className={inputCls}>
            <option value="">শ্রেণি *</option>
            {SCHOOL.classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={form.section} onChange={e => setForm(f => ({...f, section: e.target.value}))} className={inputCls}>
            <option value="">বিভাগ</option>
            {SCHOOL.sections.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input value={form.father_name} onChange={e => setForm(f => ({...f, father_name: e.target.value}))} placeholder="পিতার নাম" className={inputCls} />
          <input value={form.mother_name} onChange={e => setForm(f => ({...f, mother_name: e.target.value}))} placeholder="মাতার নাম" className={inputCls} />
          <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="ফোন *" className={inputCls} />
          <input value={form.session} onChange={e => setForm(f => ({...f, session: e.target.value}))} placeholder="সেশন" className={inputCls} />
        </div>
        {msg && <p className="text-green-600 text-sm bangla mb-3 flex items-center gap-1"><CheckCircle size={14} />{msg}</p>}
        <div className="flex gap-3">
          <button onClick={add} disabled={loading || !form.name || !form.roll || !form.class}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white px-5 py-2.5 rounded-xl text-sm bangla">
            <Plus size={15} />{loading ? 'যোগ হচ্ছে...' : 'যোগ করুন'}
          </button>
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 border border-neutral-300 hover:border-primary-400 text-neutral-600 px-4 py-2.5 rounded-xl text-sm bangla">
            <Upload size={15} /> Excel আমদানি
          </button>
          <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleExcel} />
          <a href="/demo-students.xlsx" download className="flex items-center gap-2 border border-neutral-300 text-neutral-600 px-4 py-2.5 rounded-xl text-sm bangla hover:bg-neutral-50">
            <Download size={15} /> ডেমো ফাইল
          </a>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="নাম বা রোল দিয়ে খুঁজুন..."
            className="w-full max-w-xs border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 bangla" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>{['রোল', 'নাম', 'শ্রেণি', 'বিভাগ', 'পিতা', 'ফোন', ''].map(h => <th key={h} className="text-left px-4 py-3 font-medium text-neutral-600 bangla">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map(s => (
                <tr key={s.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-4 py-3 bangla">{s.roll}</td>
                  <td className="px-4 py-3 font-medium bangla">{s.name}</td>
                  <td className="px-4 py-3 bangla text-sm">{s.class}</td>
                  <td className="px-4 py-3 bangla text-sm text-neutral-500">{s.section || '—'}</td>
                  <td className="px-4 py-3 bangla text-sm text-neutral-500">{s.father_name}</td>
                  <td className="px-4 py-3 text-sm text-neutral-500">{s.phone}</td>
                  <td className="px-4 py-3"><button onClick={() => del(s.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Results (gl-result style) ─────────────────────────
function ResultsTab() {
  const [activeTab, setActiveTab] = useState<'upload'|'view'>('upload')
  const [classNum, setClassNum] = useState('9')
  const [examYear, setExamYear] = useState(String(new Date().getFullYear()))
  const [examType, setExamType] = useState('নির্বাচনি পরীক্ষা')
  const [file, setFile] = useState<File|null>(null)
  const [preview, setPreview] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // View/edit state
  const [viewData, setViewData] = useState<any[]>([])
  const [viewLoading, setViewLoading] = useState(false)
  const [editRow, setEditRow] = useState<any>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [searchRoll, setSearchRoll] = useState('')

  const years = Array.from({length:8},(_,i)=>String(new Date().getFullYear()-i))
  const examTypes = ['প্রথম সাময়িক পরীক্ষা','নির্বাচনি পরীক্ষা','বার্ষিক পরীক্ষা']
  const classList = ['play','nursery','1','2','3','4','5','6','7','8','9','10']
  const classLabels: Record<string,string> = {play:'প্লে',nursery:'নার্সারি','1':'১ম','2':'২য়','3':'৩য়','4':'৪র্থ','5':'৫ম','6':'৬ষ্ঠ','7':'৭ম','8':'৮ম','9':'৯ম','10':'১০ম'}

  const n = (v:any) => Number(v)||0

  const getMapper = (c:string) => {
    if(c==='play'||c==='nursery') return (r:any[])=>({bangla1_written:n(r[2]),math_written:n(r[3]),english1:n(r[4]),islam_written:n(r[5]),bgst_written:n(r[6]),krishi_written:n(r[7])})
    if(c==='1') return (r:any[])=>({bangla1_written:n(r[2]),english1:n(r[3]),math_written:n(r[4]),science_written:n(r[5]),islam_written:n(r[6]),krishi_written:n(r[7]),bgst_written:n(r[8])})
    if(c==='2') return (r:any[])=>({bangla1_written:n(r[2]),bangla2_written:n(r[3]),english1:n(r[4]),english2:n(r[5]),math_written:n(r[6]),science_written:n(r[7]),islam_written:n(r[8]),ict:n(r[9]),krishi_written:n(r[10]),bgst_written:n(r[11])})
    if(c==='3') return (r:any[])=>({bangla1_written:n(r[2]),bangla2_written:n(r[3]),english1:n(r[4]),english2:n(r[5]),math_written:n(r[6]),science_written:n(r[7]),bgst_written:n(r[8]),islam_written:n(r[9]),ict:n(r[10]),krishi_written:n(r[11]),physics_written:n(r[12])})
    if(c==='4') return (r:any[])=>({bangla1_written:n(r[2]),bangla2_written:n(r[3]),english1:n(r[4]),english2:n(r[5]),math_written:n(r[6]),science_written:n(r[7]),bgst_written:n(r[8]),islam_written:n(r[9]),ict:n(r[10]),krishi_written:n(r[11]),physics_written:n(r[12])})
    if(c==='5') return (r:any[])=>({bangla1_written:n(r[2]),bangla2_written:n(r[3]),english1:n(r[4]),english2:n(r[5]),math_written:n(r[6]),science_written:n(r[7]),bgst_written:n(r[8]),islam_written:n(r[9]),physics_written:n(r[10])})
    if(['6','7','8'].includes(c)) return (r:any[])=>({bangla1_naib:n(r[2]),bangla1_written:n(r[3]),bangla2_naib:n(r[4]),bangla2_written:n(r[5]),english1:n(r[6]),english2:n(r[7]),math_naib:n(r[8]),math_written:n(r[9]),science_naib:n(r[10]),science_written:n(r[11]),bgst_naib:n(r[12]),bgst_written:n(r[13]),islam_naib:n(r[14]),islam_written:n(r[15]),krishi_naib:n(r[16]),krishi_written:n(r[17]),ict:n(r[18])})
    return (r:any[])=>({bangla1_naib:n(r[2]),bangla1_written:n(r[3]),bangla2_naib:n(r[4]),bangla2_written:n(r[5]),english1:n(r[6]),english2:n(r[7]),math_naib:n(r[8]),math_written:n(r[9]),physics_naib:n(r[10]),physics_written:n(r[11]),chemistry_naib:n(r[12]),chemistry_written:n(r[13]),biology_naib:n(r[14]),biology_written:n(r[15]),higher_math_naib:n(r[16]),higher_math_written:n(r[17]),bgst_naib:n(r[18]),bgst_written:n(r[19]),islam_naib:n(r[20]),islam_written:n(r[21]),ict:n(r[22])})
  }

  const parseFile = (f:File):Promise<any[]> => new Promise((res,rej)=>{
    const reader = new FileReader()
    reader.onload = async e => {
      try {
        const XLSX = await import('xlsx')
        const wb = (XLSX as any).read(e.target!.result, {type:'array'})
        const ws = wb.Sheets[wb.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(ws,{header:1,defval:''}) as any[][]
        const mapper = getMapper(classNum)
        const students:any[] = []
        for(let i=6;i<data.length;i++){
          const row=data[i]; if(!row[0]||isNaN(Number(row[0]))) continue
          const name=String(row[1]||'').trim(); if(!name) continue
          students.push({roll:Number(row[0]),name,class_num:classNum,exam_year:examYear,exam_type:examType,...mapper(row)})
        }
        res(students)
      } catch(err:any){rej(new Error('ফাইল পড়তে সমস্যা: '+err.message))}
    }
    reader.onerror=()=>rej(new Error('ফাইল পড়া যায়নি'))
    reader.readAsArrayBuffer(f)
  })

  const handleFile = async (f:File) => {
    setFile(f); setError(''); setPreview([])
    try { setPreview(await parseFile(f)) } catch(e:any){setError(e.message)}
  }

  const handleUpload = async () => {
    if(!preview.length) return
    setLoading(true); setError('')
    try {
      for(let i=0;i<preview.length;i+=50){
        const {error:err} = await supabase.from('gl_students').insert(preview.slice(i,i+50))
        if(err) throw err
      }
      setSuccess(`${preview.length} জন সফলভাবে আপলোড হয়েছে!`)
      setFile(null); setPreview([])
    } catch(e:any){setError('আপলোড ব্যর্থ: '+e.message)}
    setLoading(false)
  }

  const loadViewData = async () => {
    setViewLoading(true)
    const {data} = await supabase.from('gl_students').select('*')
      .eq('class_num', classNum).eq('exam_year', examYear).eq('exam_type', examType)
      .order('roll')
    setViewData(data || [])
    setSelectedIds(new Set())
    setViewLoading(false)
  }

  const deleteSelected = async () => {
    if(!selectedIds.size) return
    const ids = Array.from(selectedIds)
    await supabase.from('gl_students').delete().in('id', ids)
    setViewData(d => d.filter(r => !selectedIds.has(r.id)))
    setSelectedIds(new Set())
  }

  const deleteOne = async (id: string) => {
    await supabase.from('gl_students').delete().eq('id', id)
    setViewData(d => d.filter(r => r.id !== id))
  }

  const saveEdit = async () => {
    if(!editRow) return
    const {error: err} = await supabase.from('gl_students').update(editForm).eq('id', editRow.id)
    if(!err) {
      setViewData(d => d.map(r => r.id === editRow.id ? {...r,...editForm} : r))
      setEditRow(null)
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if(selectedIds.size === viewData.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(viewData.map(r => r.id)))
  }

  const downloadSelected = async (ids?: string[]) => {
    const rows = ids ? viewData.filter(r => ids.includes(r.id)) : viewData
    if(!rows.length) return
    const XLSX = await import('xlsx')
    const headers = ['রোল','নাম','শ্রেণি','পরীক্ষা','সেশন','বাংলা১নৈব','বাংলা১লিখিত','বাংলা২নৈব','বাংলা২লিখিত','ইং১','ইং২','গণিতনৈব','গণিতলিখিত','বিজ্ঞাননৈব','বিজ্ঞানলিখিত','বাওবিনৈব','বাওবিলিখিত','ইসলামনৈব','ইসলামলিখিত','কৃষিনৈব','কৃষিলিখিত','পদার্থনৈব','পদার্থলিখিত','রসায়ননৈব','রসায়নলিখিত','জীবনৈব','জীবলিখিত','উচ্চনৈব','উচ্চলিখিত','বাবিপনৈব','বাবিপলিখিত','তথ্য']
    const data = rows.map(r => [r.roll,r.name,r.class_num,r.exam_type,r.exam_year,r.bangla1_naib,r.bangla1_written,r.bangla2_naib,r.bangla2_written,r.english1,r.english2,r.math_naib,r.math_written,r.science_naib,r.science_written,r.bgst_naib,r.bgst_written,r.islam_naib,r.islam_written,r.krishi_naib,r.krishi_written,r.physics_naib,r.physics_written,r.chemistry_naib,r.chemistry_written,r.biology_naib,r.biology_written,r.higher_math_naib,r.higher_math_written,r.bgst910_naib,r.bgst910_written,r.ict])
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([headers,...data])
    XLSX.utils.book_append_sheet(wb, ws, 'ফলাফল')
    const wbout = XLSX.write(wb, {bookType:'xlsx',type:'array'})
    const blob = new Blob([wbout], {type:'application/octet-stream'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `result_${classNum}_${examType}_${examYear}.xlsx`; a.click()
    URL.revokeObjectURL(url)
  }

  const generateMarksheetHTML = (rows: any[]) => {
    return rows.map(student => {
      const result = calcResult(student)
      const subjectRows = result.subjects.map((s: any, i: number) => {
        const gc = (GRADE_COLORS as any)[s.grade] || (GRADE_COLORS as any)['F']
        return `<tr style="background:${i%2===0?'#fff':'#f9fafb'}">
          <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${i+1}</td>
          <td style="border:1px solid #ddd;padding:5px 10px;font-size:12px;font-weight:500">${s.label}</td>
          <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${s.max}</td>
          <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${s.naib>0?s.naib:'—'}</td>
          <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px">${s.written>0?s.written:'—'}</td>
          <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px;font-weight:700">${s.total}</td>
          <td style="border:1px solid #ddd;padding:5px 8px;text-align:center"><span style="background:${gc.bg};color:${gc.text};padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700">${s.grade}</span></td>
          <td style="border:1px solid #ddd;padding:5px 8px;text-align:center;font-size:12px;font-weight:600">${s.gpa.toFixed(2)}</td>
        </tr>`
      }).join('')

      return `
      <div style="page-break-after:always;max-width:700px;margin:0 auto;font-family:'Hind Siliguri',sans-serif;border:2px solid #1D5FA8;border-radius:8px;overflow:hidden;margin-bottom:20px">
        <div style="background:#1D5FA8;color:white;padding:20px;text-align:center">
          <div style="font-size:18px;font-weight:700;margin-bottom:4px">গোল্ডেন লাইফ পাবলিক স্কুল</div>
          <div style="font-size:12px;opacity:0.8">পাইকরতলী, কাজিপুর, সিরাজগঞ্জ | স্থাপিতঃ ২০১৫ ইং</div>
          <div style="font-size:12px;opacity:0.8">পরিচালকঃ ডাঃ মোঃ আমিনুল ইসলাম | মোবাইলঃ ০১৭৩৩৬৯৬৪৭৭</div>
          <div style="margin-top:10px;display:inline-block;background:#D97706;color:white;padding:4px 20px;border-radius:20px;font-size:13px;font-weight:600">প্রগতি পত্র / মার্কশীট</div>
        </div>
        <div style="background:#f9fafb;padding:12px 16px;border-bottom:1px solid #e5e7eb;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
          <div style="font-size:12px"><span style="color:#6b7280">নামঃ </span><strong>${student.name}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">শ্রেণিঃ </span><strong>${student.class_num}${student.section?' ('+student.section+')':''}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">রোলঃ </span><strong>${student.roll}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">পরীক্ষাঃ </span><strong>${student.exam_type}</strong></div>
          <div style="font-size:12px"><span style="color:#6b7280">সেশনঃ </span><strong>${student.exam_year}</strong></div>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#1D5FA8;color:white">
              <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">ক্রম</th>
              <th style="border:1px solid #d1d5db;padding:8px;text-align:left;font-size:12px">বিষয়</th>
              <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">পূর্ণমান</th>
              <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">নৈবত্তিক</th>
              <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">লিখিত</th>
              <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">মোট</th>
              <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">গ্রেড</th>
              <th style="border:1px solid #d1d5db;padding:8px;font-size:12px">জিপিএ</th>
            </tr>
          </thead>
          <tbody>${subjectRows}</tbody>
          <tfoot>
            <tr style="background:#EFF6FF;border-top:2px solid #93c5fd">
              <td colspan="5" style="border:1px solid #ddd;padding:8px;text-align:right;font-weight:700;font-size:12px">সর্বমোট</td>
              <td style="border:1px solid #ddd;padding:8px;text-align:center;font-weight:700;font-size:13px">${result.totalMarks}</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
        <div style="padding:16px;text-align:center">
          <div style="display:inline-flex;gap:16px;margin-bottom:16px">
            <div style="border:2px solid ${result.passed?'#86efac':'#fca5a5'};border-radius:10px;padding:8px 20px;text-align:center">
              <div style="font-size:18px;font-weight:700;color:${result.passed?'#16a34a':'#dc2626'}">${result.passed?'উত্তীর্ণ':'অনুত্তীর্ণ'}</div>
              <div style="font-size:11px;color:#6b7280">ফলাফল</div>
            </div>
            <div style="border:2px solid #93c5fd;border-radius:10px;padding:8px 20px;text-align:center">
              <div style="font-size:18px;font-weight:700;color:#1d4ed8">${result.cgpa.toFixed(2)}</div>
              <div style="font-size:11px;color:#6b7280">CGPA</div>
            </div>
            <div style="border:2px solid #fcd34d;border-radius:10px;padding:8px 20px;text-align:center">
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
      </div>`
    }).join('')
  }

  const downloadMarksheetPDF = (ids?: string[]) => {
    const rows = ids ? viewData.filter(r => ids.includes(r.id)) : viewData
    if(!rows.length) return
    const win = window.open('', '_blank')
    if(!win) return
    win.document.write(`<!DOCTYPE html><html lang="bn"><head>
      <meta charset="UTF-8"><title>মার্কশিট</title>
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body{font-family:'Hind Siliguri',sans-serif;margin:16px;background:#fff}
        @media print{body{margin:0}button{display:none!important}.no-print{display:none!important}}
      </style></head><body>
      <div class="no-print" style="text-align:center;margin-bottom:16px">
        <button onclick="window.print()" style="background:#1D5FA8;color:white;border:none;padding:12px 32px;border-radius:8px;font-size:15px;font-family:'Hind Siliguri',sans-serif;cursor:pointer">
          🖨️ প্রিন্ট / PDF সেভ করুন (${rows.length} টি মার্কশিট)
        </button>
      </div>
      ${generateMarksheetHTML(rows)}
    </body></html>`)
    win.document.close()
    // Don't auto-print, let user click button
  }

  const downloadTemplate = async () => {
    const TMPL:any = {
      play:{h:['বাংলা(১০০)','গণিত(১০০)','ইংরেজি(১০০)','ধর্ম(১০০)','ছবি অংকন(৫০)','সাঃজ্ঞান(৫০)'],s:[85,78,72,90,42,38]},
      nursery:{h:['বাংলা(১০০)','গণিত(১০০)','ইংরেজি(১০০)','ধর্ম(১০০)','ছবি অংকন(৫০)','সাঃজ্ঞান(৫০)'],s:[80,75,68,88,40,35]},
      '1':{h:['বাংলা(১০০)','ইংরেজি(১০০)','গণিত(১০০)','পরিবেশ(৫০)','ধর্ম(৫০)','সাঃজ্ঞান(৫০)','ছবি অংকন(৫০)'],s:[85,72,78,40,45,38,42]},
      '2':{h:['বাংলা১ম(১০০)','বাংলা২য়(৫০)','ইং১ম(১০০)','ইং২য়(৫০)','গণিত(১০০)','পরিবেশ(১০০)','ধর্ম(১০০)','কম্পিউটার(৫০)','সাঃজ্ঞান(৫০)','ছবি অংকন(৫০)'],s:[85,38,72,40,78,80,90,42,38,40]},
      '3':{h:['বাংলা১ম(১০০)','বাংলা২য়(৫০)','ইং১ম(১০০)','ইং২য়(৫০)','গণিত(১০০)','বিজ্ঞান(১০০)','বাওবি(১০০)','ধর্ম(১০০)','কম্পিউটার(৫০)','সাঃজ্ঞান(৫০)','ছবি অংকন(৫০)'],s:[85,38,72,40,78,80,75,90,42,38,40]},
      '4':{h:['বাংলা১ম(১০০)','বাংলা২য়(৫০)','ইং১ম(১০০)','ইং২য়(৫০)','গণিত(১০০)','বিজ্ঞান(১০০)','বাওবি(১০০)','ধর্ম(১০০)','কম্পিউটার(৫০)','সাঃজ্ঞান(৫০)','ছবি অংকন(৫০)'],s:[85,38,72,40,78,80,75,90,42,38,40]},
      '5':{h:['বাংলা১ম(১০০)','বাংলা২য়(১০০)','ইং১ম(১০০)','ইং২য়(১০০)','গণিত(১০০)','বিজ্ঞান(১০০)','বাওবি(১০০)','ধর্ম(১০০)','ছবি অংকন(৫০)'],s:[85,78,72,68,78,80,75,90,42]},
      '6':{h:['বাং১নৈব','বাং১লিখিত','বাং২নৈব','বাং২লিখিত','ইং১ম','ইং২য়','গণিতনৈব','গণিতলিখিত','বিজ্ঞাননৈব','বিজ্ঞানলিখিত','বাওবিনৈব','বাওবিলিখিত','ইসলামনৈব','ইসলামলিখিত','কৃষিনৈব','কৃষিলিখিত','তথ্য'],s:[18,62,17,25,66,45,28,45,16,67,17,45,11,29,27,56,22]},
      '9':{h:['বাং১নৈব','বাং১লিখিত','বাং২নৈব','বাং২লিখিত','ইং১ম(১০০)','ইং২য়(১০০)','গণিতনৈব','গণিতলিখিত','পদার্থনৈব','পদার্থলিখিত','রসায়ননৈব','রসায়নলিখিত','জীবনৈব','জীবলিখিত','উচ্চনৈব','উচ্চলিখিত','বাবিপনৈব','বাবিপলিখিত','ইসলামনৈব','ইসলামলিখিত','তথ্য'],s:[18,62,17,25,66,68,28,45,16,50,17,45,11,29,27,45,22,65,14,72,20]},
    }
    const cfg = TMPL[classNum] || (['7','8'].includes(classNum) ? TMPL['6'] : TMPL['9'])
    const XLSX = await import('xlsx')
    const wb = XLSX.utils.book_new()
    const rows = [
      ['গোল্ডেন লাইফ পাবলিক স্কুল'],['পাইকরতলী, কাজিপুর, সিরাজগঞ্জ'],
      [examType+' '+examYear],['শ্রেণিঃ '+classNum],
      ['(নিচে থেকে ডেটা দিন — ৭ম সারি থেকে শুরু)'],
      ['রোল','নাম',...cfg.h],[1,'নমুনা ছাত্র',...cfg.s],
    ]
    const ws = XLSX.utils.aoa_to_sheet(rows)
    XLSX.utils.book_append_sheet(wb,ws,'মেইন শিট')
    const wbout = XLSX.write(wb,{bookType:'xlsx',type:'array'})
    const blob = new Blob([wbout],{type:'application/octet-stream'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href=url; a.download=`template_class_${classNum}.xlsx`; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = viewData.filter(r => !searchRoll || String(r.roll).includes(searchRoll) || r.name.includes(searchRoll))
  const inputCls = "border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla"

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-4 bangla">ফলাফল ব্যবস্থাপনা</h2>

      {/* Filter bar - shared */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 mb-4 space-y-4">
        <div>
          <p className="text-xs text-neutral-500 bangla mb-2">সাল</p>
          <div className="flex gap-2 flex-wrap">{years.map(y=>(
            <button key={y} type="button" onClick={()=>setExamYear(y)}
              className={`bangla text-sm px-4 py-1.5 rounded-xl font-medium ${examYear===y?'bg-primary-600 text-white':'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>{y}</button>
          ))}</div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 bangla mb-2">পরীক্ষা</p>
          <div className="flex gap-2 flex-wrap">{examTypes.map(e=>(
            <button key={e} type="button" onClick={()=>setExamType(e)}
              className={`bangla text-sm px-4 py-2 rounded-xl ${examType===e?'bg-primary-700 text-white':'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>{e}</button>
          ))}</div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 bangla mb-2">শ্রেণি</p>
          <div className="flex gap-2 flex-wrap">{classList.map(c=>(
            <button key={c} type="button" onClick={()=>{setClassNum(c);setFile(null);setPreview([]);setViewData([]);setSelectedIds(new Set())}}
              className={`bangla text-sm px-4 py-1.5 rounded-xl font-medium ${classNum===c?'bg-gold-500 text-white':'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
              {classLabels[c]||c}
            </button>
          ))}</div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setActiveTab('upload')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bangla transition-colors ${activeTab==='upload'?'bg-primary-600 text-white':'bg-white border border-neutral-200 text-neutral-600'}`}>
          <Upload size={15}/> আপলোড
        </button>
        <button onClick={()=>{setActiveTab('view');loadViewData()}} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bangla transition-colors ${activeTab==='view'?'bg-primary-600 text-white':'bg-white border border-neutral-200 text-neutral-600'}`}>
          <Eye size={15}/> দেখুন ও সম্পাদনা
        </button>
      </div>

      {/* UPLOAD TAB */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          <button onClick={downloadTemplate}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-neutral-300 hover:border-primary-400 py-3 rounded-xl text-sm text-primary-600 bangla transition-colors">
            <Download size={16}/> ডেমো Excel ডাউনলোড — শ্রেণি {classLabels[classNum]||classNum}
          </button>

          <button onClick={()=>fileRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 transition-all ${file?'border-primary-400 bg-primary-50':'border-neutral-200 hover:border-neutral-300'}`}>
            <FileText size={28} className={file?'text-primary-600':'text-neutral-400'}/>
            {file ? (
              <><p className="text-sm font-semibold text-primary-600 bangla">{file.name}</p>
              <p className="text-xs text-neutral-500 bangla">{preview.length} জন পাওয়া গেছে</p></>
            ) : (
              <><p className="text-sm text-neutral-500 bangla">Excel ফাইল বেছে নিন (.xlsx)</p>
              <p className="text-xs text-neutral-400 bangla">শ্রেণি {classLabels[classNum]||classNum} · {examYear} · {examType}</p></>
            )}
          </button>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.xlsm" className="hidden" onChange={e=>e.target.files?.[0]&&handleFile(e.target.files[0])}/>

          {preview.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <p className="text-sm font-semibold text-neutral-600 bangla mb-3">প্রিভিউ — {preview.length} জন</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="text-neutral-400 border-b"><th className="text-left py-1.5 bangla">রোল</th><th className="text-left py-1.5 bangla pl-2">নাম</th></tr></thead>
                  <tbody>{preview.slice(0,5).map((s,i)=>(
                    <tr key={i} className="border-b border-neutral-50">
                      <td className="py-1.5 font-mono">{s.roll}</td>
                      <td className="py-1.5 bangla pl-2">{s.name}</td>
                    </tr>
                  ))}</tbody>
                </table>
                {preview.length>5&&<p className="text-xs text-neutral-400 bangla py-1 text-center">আরো {preview.length-5} জন...</p>}
              </div>
            </div>
          )}

          {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm bangla">{error}</div>}
          {success && <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm bangla flex items-center gap-2"><CheckCircle size={15}/>{success}</div>}

          {preview.length > 0 && (
            <div className="flex gap-3">
              <button onClick={()=>{setFile(null);setPreview([])}} className="flex items-center gap-2 border border-neutral-300 px-4 py-2.5 rounded-xl text-sm bangla text-neutral-600">
                <Trash2 size={14}/> বাতিল
              </button>
              <button onClick={handleUpload} disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white py-2.5 rounded-xl text-sm bangla font-medium">
                <Upload size={16}/>{loading?'আপলোড হচ্ছে...':`${preview.length} জন আপলোড করুন`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW/EDIT TAB */}
      {activeTab === 'view' && (
        <div className="space-y-4">
          {/* Action bar */}
          <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-wrap items-center gap-3">
            <input value={searchRoll} onChange={e=>setSearchRoll(e.target.value)} placeholder="রোল বা নাম খুঁজুন..."
              className="border border-neutral-300 rounded-lg px-3 py-2 text-sm bangla focus:outline-none focus:border-primary-400 w-48"/>
            <button onClick={loadViewData} disabled={viewLoading}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl text-sm bangla hover:bg-primary-700">
              <Search size={14}/>{viewLoading?'লোড...':'লোড করুন'}
            </button>
            <div className="flex-1"/>
            {/* Download options */}
            <div className="flex gap-2 flex-wrap">
              {/* Excel downloads */}
              <button onClick={()=>downloadSelected(Array.from(selectedIds))} disabled={!selectedIds.size}
                className="flex items-center gap-1.5 border border-neutral-300 px-3 py-2 rounded-xl text-xs bangla text-neutral-600 hover:bg-neutral-50 disabled:opacity-40">
                <Download size={13}/> Excel নির্বাচিত ({selectedIds.size})
              </button>
              <button onClick={()=>downloadSelected()}
                className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-2 rounded-xl text-xs bangla hover:bg-green-700">
                <Download size={13}/> Excel সব ({filtered.length})
              </button>
              {/* PDF Marksheet downloads */}
              <button onClick={()=>downloadMarksheetPDF(Array.from(selectedIds))} disabled={!selectedIds.size}
                className="flex items-center gap-1.5 border border-primary-400 text-primary-600 px-3 py-2 rounded-xl text-xs bangla hover:bg-primary-50 disabled:opacity-40">
                <FileText size={13}/> PDF নির্বাচিত ({selectedIds.size})
              </button>
              <button onClick={()=>downloadMarksheetPDF()}
                className="flex items-center gap-1.5 bg-primary-600 text-white px-3 py-2 rounded-xl text-xs bangla hover:bg-primary-700">
                <FileText size={13}/> PDF সব ({filtered.length})
              </button>
              {selectedIds.size > 0 && (
                <button onClick={deleteSelected}
                  className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-2 rounded-xl text-xs bangla hover:bg-red-600">
                  <Trash2 size={13}/> নির্বাচিত মুছুন
                </button>
              )}
            </div>
          </div>

          {viewLoading ? (
            <div className="text-center py-12 text-neutral-400 bangla">লোড হচ্ছে...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 bangla bg-white rounded-xl border border-neutral-200">
              {viewData.length === 0 ? 'লোড করুন বাটন চাপুন' : 'কোনো ফলাফল পাওয়া যায়নি'}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-3 py-3">
                        <input type="checkbox" checked={selectedIds.size===filtered.length&&filtered.length>0} onChange={selectAll} className="w-4 h-4"/>
                      </th>
                      {['রোল','নাম','বাংলা১','বাংলা২','ইংরেজি','গণিত','বিজ্ঞান','ইসলাম','তথ্য',''].map(h=>(
                        <th key={h} className="text-left px-3 py-3 font-medium text-neutral-600 bangla text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(r=>(
                      <tr key={r.id} className={`border-b border-neutral-100 hover:bg-neutral-50 ${selectedIds.has(r.id)?'bg-primary-50':''}`}>
                        <td className="px-3 py-2.5">
                          <input type="checkbox" checked={selectedIds.has(r.id)} onChange={()=>toggleSelect(r.id)} className="w-4 h-4"/>
                        </td>
                        <td className="px-3 py-2.5 font-mono text-sm">{r.roll}</td>
                        <td className="px-3 py-2.5 bangla font-medium max-w-24 truncate">{r.name}</td>
                        <td className="px-3 py-2.5 text-center text-sm">{(r.bangla1_naib||0)+(r.bangla1_written||0)}</td>
                        <td className="px-3 py-2.5 text-center text-sm">{(r.bangla2_naib||0)+(r.bangla2_written||0)}</td>
                        <td className="px-3 py-2.5 text-center text-sm">{(r.english1||0)+(r.english2||0)}</td>
                        <td className="px-3 py-2.5 text-center text-sm">{(r.math_naib||0)+(r.math_written||0)}</td>
                        <td className="px-3 py-2.5 text-center text-sm">{(r.science_naib||0)+(r.science_written||0)}</td>
                        <td className="px-3 py-2.5 text-center text-sm">{(r.islam_naib||0)+(r.islam_written||0)}</td>
                        <td className="px-3 py-2.5 text-center text-sm">{r.ict||0}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1">
                            <button onClick={()=>{setEditRow(r);setEditForm({...r})}} className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg"><Save size={13}/></button>
                            <button onClick={()=>deleteOne(r.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={13}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 bangla">
                মোট {filtered.length} জন | নির্বাচিত {selectedIds.size} জন
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editRow && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setEditRow(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-lg text-neutral-800 bangla">সম্পাদনা — {editRow.name} (রোল: {editRow.roll})</h3>
              <button onClick={()=>setEditRow(null)} className="text-neutral-400 hover:text-neutral-600"><X size={20}/></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              {Object.keys(editForm).filter(k=>!['id','created_at','name','roll','class_num','exam_year','exam_type','section'].includes(k)).map(key=>(
                <div key={key}>
                  <label className="block text-xs text-neutral-500 mb-1">{key}</label>
                  <input type="number" value={editForm[key]||0} onChange={e=>setEditForm((f:any)=>({...f,[key]:Number(e.target.value)}))}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 text-center"/>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={()=>setEditRow(null)} className="border border-neutral-300 px-5 py-2.5 rounded-xl text-sm bangla text-neutral-600">বাতিল</button>
              <button onClick={saveEdit} className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm bangla font-medium flex items-center gap-2">
                <Save size={14}/> সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Admissions ─────────────────────────────────────────
function AdmissionsTab() {
  const [apps, setApps] = useState<any[]>([])
  useEffect(() => { supabase.from('admissions').select('*').order('created_at', { ascending: false }).then(({ data }) => setApps(data || [])) }, [])
  const update = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('admissions').update({ status }).eq('id', id)
    setApps(a => a.map(x => x.id === id ? { ...x, status } : x))
  }
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">ভর্তি আবেদন</h2>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>{['নাম','শ্রেণি','পিতা','ফোন','তারিখ','স্ট্যাটাস',''].map(h => <th key={h} className="text-left px-4 py-3 font-medium text-neutral-600 bangla">{h}</th>)}</tr>
            </thead>
            <tbody>
              {apps.map(a => (
                <tr key={a.id} className="border-b border-neutral-100">
                  <td className="px-4 py-3 font-medium bangla">{a.student_name_bn}</td>
                  <td className="px-4 py-3 bangla text-sm">{a.class_applying}</td>
                  <td className="px-4 py-3 bangla text-sm text-neutral-500">{a.father_name_bn}</td>
                  <td className="px-4 py-3 text-sm">{a.phone_father}</td>
                  <td className="px-4 py-3 text-xs text-neutral-400">{new Date(a.created_at).toLocaleDateString('bn-BD')}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bangla ${a.status === 'approved' ? 'bg-green-100 text-green-700' : a.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gold-100 text-gold-700'}`}>
                      {a.status === 'approved' ? 'অনুমোদিত' : a.status === 'rejected' ? 'বাতিল' : 'অপেক্ষমান'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {a.status === 'pending' && <>
                        <button onClick={() => update(a.id, 'approved')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={15} /></button>
                        <button onClick={() => update(a.id, 'rejected')} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><X size={15} /></button>
                      </>}
                      <button onClick={() => generateAdmissionPDF(a)} title="ডাউনলোড" className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg"><Download size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Gallery ────────────────────────────────────────────
function GalleryTab() {
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState(''); const [category, setCategory] = useState('অনুষ্ঠান')
  const [file, setFile] = useState<File | null>(null); const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const cats = ['অনুষ্ঠান','পরীক্ষা','ক্রীড়া','শ্রেণিকক্ষ','অন্যান্য']

  useEffect(() => { supabase.from('gallery').select('*').order('created_at', { ascending: false }).then(({ data }) => setItems(data || [])) }, [])

  const upload = async () => {
    if (!title || !file) return; setUploading(true)
    const path = `gallery/${Date.now()}-${file.name}`
    await supabase.storage.from('school-files').upload(path, file, {cacheControl:'3600',upsert:false})
    const { data: url } = supabase.storage.from('school-files').getPublicUrl(path)
    const { data } = await supabase.from('gallery').insert([{ title, image_url: url.publicUrl, category }]).select().single()
    setItems(i => [data, ...i]); setTitle(''); setFile(null); setUploading(false)
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">গ্যালারি ব্যবস্থাপনা</h2>
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <div className="flex flex-wrap gap-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="ছবির শিরোনাম" className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla flex-1 min-w-40" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm bangla">
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 border-2 border-dashed border-neutral-300 hover:border-primary-400 rounded-xl px-4 py-2 text-sm text-neutral-500 bangla">
            <Upload size={15} />{file ? file.name : 'ছবি বেছে নিন'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
          <button onClick={upload} disabled={uploading || !title || !file} className="bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white px-5 py-2.5 rounded-xl text-sm bangla">
            {uploading ? 'আপলোড...' : 'যোগ করুন'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <img src={i.image_url} alt={i.title} className="w-full h-36 object-cover" onError={(e:any)=>{e.target.style.display='none'}} />
            <div className="p-3 flex items-center justify-between">
              <div><p className="text-sm font-medium bangla truncate">{i.title}</p><p className="text-xs text-neutral-400 bangla">{i.category}</p></div>
              <button onClick={async () => { await supabase.from('gallery').delete().eq('id', i.id); setItems(x => x.filter(g => g.id !== i.id)) }} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Blog ───────────────────────────────────────────────
function BlogTab() {
  const [posts, setPosts] = useState<any[]>([])
  const [form, setForm] = useState({ title: '', content: '', author: 'প্রধান শিক্ষক', is_published: true })
  const [saving, setSaving] = useState(false)

  useEffect(() => { supabase.from('blogs').select('*').order('created_at', { ascending: false }).then(({ data }) => setPosts(data || [])) }, [])

  const [blogFile, setBlogFile] = (useState as any)(null)
  const blogFileRef = (useRef as any)()

  const save = async () => {
    setSaving(true)
    let imageUrl = null
    if (blogFile) {
      const path = `blogs/${Date.now()}-${blogFile.name}`
      await supabase.storage.from('school-files').upload(path, blogFile)
      const { data: urlData } = supabase.storage.from('school-files').getPublicUrl(path)
      imageUrl = urlData.publicUrl
    }
    const { data } = await supabase.from('blogs').insert([{...form, image_url: imageUrl}]).select().single()
    if (data) { setPosts((p: any[]) => [data, ...p]); setForm({ title: '', content: '', author: 'প্রধান শিক্ষক', is_published: true }); setBlogFile(null) }
    setSaving(false)
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">ব্লগ ব্যবস্থাপনা</h2>
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6 space-y-3">
        <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="শিরোনাম"
          className="w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla" />
        <textarea rows={5} value={form.content} onChange={e => setForm(f => ({...f, content: e.target.value}))} placeholder="বিষয়বস্তু লিখুন..."
          className="w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla" />
        <div className="flex gap-3 items-center">
          <input value={form.author} onChange={e => setForm(f => ({...f, author: e.target.value}))} placeholder="লেখকের নাম"
            className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla w-52" />
          <button type="button" onClick={() => blogFileRef.current?.click()}
            className="flex items-center gap-2 border border-neutral-300 px-3 py-2.5 rounded-lg text-sm bangla text-neutral-600 hover:bg-neutral-50">
            <Image size={15}/>{blogFile ? blogFile.name : 'থাম্বনেইল'}
          </button>
          <input ref={blogFileRef} type="file" accept="image/*" className="hidden" onChange={e => setBlogFile(e.target.files?.[0]||null)}/>
          <label className="flex items-center gap-2 text-sm bangla cursor-pointer">
            <input type="checkbox" checked={form.is_published} onChange={e => setForm(f => ({...f, is_published: e.target.checked}))} />প্রকাশ করুন
          </label>
          <button onClick={save} disabled={saving || !form.title || !form.content} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white px-5 py-2.5 rounded-xl text-sm bangla">
            <Save size={14} />{saving ? 'সংরক্ষণ...' : 'প্রকাশ করুন'}
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-neutral-200 p-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-semibold bangla">{p.title}</p>
              <p className="text-sm text-neutral-500 bangla line-clamp-2 mt-1">{p.content}</p>
              <p className="text-xs text-neutral-400 bangla mt-1">{p.author} · {new Date(p.created_at).toLocaleDateString('bn-BD')}</p>
            </div>
            <button onClick={async () => { await supabase.from('blogs').delete().eq('id', p.id); setPosts(x => x.filter(b => b.id !== p.id)) }} className="text-red-400 hover:text-red-600 p-1 shrink-0"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Teachers ───────────────────────────────────────────
function TeachersTab() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [email, setEmail] = useState(''); const [name, setName] = useState('')
  const [subjects, setSubjects] = useState(''); const [classes, setClasses] = useState('')
  const [password, setPassword] = useState(''); const [saving, setSaving] = useState(false); const [msg, setMsg] = useState('')
  const teacherYears = Array.from({length:8},(_,i)=>String(new Date().getFullYear()-i))

  useEffect(() => { supabase.from('teachers').select('*').then(({ data }) => setTeachers(data || [])) }, [])

  const add = async () => {
    setSaving(true); setMsg('')
    // Create auth user via signUp
    const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password })
    if (authErr) { setMsg('অ্যাকাউন্ট তৈরি ব্যর্থ: ' + authErr.message); setSaving(false); return }
    const subArr = subjects.split(',').map((s:string) => s.trim()).filter(Boolean)
    const clsArr = classes.split(',').map((s:string) => s.trim()).filter(Boolean)
    const userId = authData.user?.id
    const { data, error: dbErr } = await supabase.from('teachers').insert([{ user_id: userId, name, email, subjects: subArr, classes: clsArr }]).select().single()
    if (dbErr) { setMsg('শিক্ষক DB তে যোগ ব্যর্থ: ' + dbErr.message); setSaving(false); return }
    if (data) { setTeachers((t:any[]) => [...t, data]); setEmail(''); setName(''); setSubjects(''); setClasses(''); setPassword(''); setMsg('শিক্ষক যোগ হয়েছে! ইমেইলে কনফার্মেশন পাঠানো হয়েছে।') }
    setSaving(false)
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">শিক্ষক ব্যবস্থাপনা</h2>
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <h3 className="font-semibold mb-4 bangla">নতুন শিক্ষক যোগ করুন</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="পুরো নাম *" className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ইমেইল *" className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="পাসওয়ার্ড *" className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400" />
          <input value={subjects} onChange={e => setSubjects(e.target.value)} placeholder="বিষয়গুলো (কমা দিয়ে) যেমন: বাংলা, গণিত" className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla" />
          <input value={classes} onChange={e => setClasses(e.target.value)} placeholder="শ্রেণিগুলো (কমা দিয়ে)" className="border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla" />
        </div>
        {msg && <p className="text-sm bangla mb-3 text-green-600">{msg}</p>}
        <button onClick={add} disabled={saving || !name || !email || !password} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white px-5 py-2.5 rounded-xl text-sm bangla">
          <Plus size={15} />{saving ? 'যোগ হচ্ছে...' : 'শিক্ষক যোগ করুন'}
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b"><tr>{['নাম','ইমেইল','বিষয়','শ্রেণি'].map(h => <th key={h} className="text-left px-4 py-3 font-medium text-neutral-600 bangla">{h}</th>)}</tr></thead>
          <tbody>{teachers.map(t => (
            <tr key={t.id} className="border-b border-neutral-100">
              <td className="px-4 py-3 font-medium bangla">{t.name}</td>
              <td className="px-4 py-3 text-sm text-neutral-500">{t.email}</td>
              <td className="px-4 py-3 text-sm bangla text-neutral-600">{(t.subjects || []).join(', ')}</td>
              <td className="px-4 py-3 text-sm bangla text-neutral-600">{(t.classes || []).join(', ')}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

// ── Contacts ───────────────────────────────────────────
function ContactsTab() {
  const [contacts, setContacts] = useState<any[]>([])
  useEffect(() => { supabase.from('contacts').select('*').order('created_at', { ascending: false }).then(({ data }) => setContacts(data || [])) }, [])
  const markRead = async (id: string) => {
    await supabase.from('contacts').update({ is_read: true }).eq('id', id)
    setContacts(c => c.map(x => x.id === id ? { ...x, is_read: true } : x))
  }
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">যোগাযোগ বার্তা</h2>
      <div className="space-y-3">
        {contacts.map(c => (
          <div key={c.id} className={`bg-white rounded-xl border p-5 ${!c.is_read ? 'border-primary-300 bg-primary-50/30' : 'border-neutral-200'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold bangla">{c.name} {!c.is_read && <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">নতুন</span>}</p>
                <p className="text-sm text-neutral-500 mt-0.5">{c.phone}{c.email ? ` · ${c.email}` : ''}</p>
                <p className="text-neutral-700 bangla mt-2 text-sm">{c.message}</p>
                <p className="text-xs text-neutral-400 mt-2">{new Date(c.created_at).toLocaleDateString('bn-BD')}</p>
              </div>
              {!c.is_read && <button onClick={() => markRead(c.id)} className="shrink-0 text-xs bg-primary-600 text-white px-3 py-1.5 rounded-lg bangla hover:bg-primary-700">পড়া হয়েছে</button>}
            </div>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-center text-neutral-400 bangla py-10">কোনো বার্তা নেই</p>}
      </div>
    </div>
  )
}

// ── Certificates ───────────────────────────────────────
function CertificatesTab() {
  type CertType = 'pratyayan' | 'prashangsa' | 'transfer'
  const [certType, setCertType] = useState<CertType>('pratyayan')
  const [students, setStudents] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<any>(null)
  const [msg, setMsg] = useState('')

  // Common fields
  const [serial, setSerial] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [village, setVillage] = useState('')
  const [postOffice, setPostOffice] = useState('')
  const [upazila, setUpazila] = useState('কাজিপুর')
  const [district, setDistrict] = useState('সিরাজগঞ্জ')
  const [dob, setDob] = useState('')
  const [purpose, setPurpose] = useState('যে কোনো প্রয়োজনে')

  // প্রশংসাপত্র extra
  const [examName, setExamName] = useState('বার্ষিক পরীক্ষা')
  const [examYear, setExamYear] = useState(String(new Date().getFullYear()))
  const [result, setResult] = useState('কৃতিত্বের সহিত উত্তীর্ণ')
  const [conduct, setConduct] = useState('চরিত্র মেধাবী ও আচরণে বিনয়ী')

  // TC extra
  const [tcNumber, setTcNumber] = useState('')
  const [admissionDate, setAdmissionDate] = useState('')
  const [leavingDate, setLeavingDate] = useState('')
  const [tcReason, setTcReason] = useState('অন্যত্র ভর্তির জন্য')
  const [duesCleared, setDuesCleared] = useState(true)

  useEffect(() => {
    supabase.from('students').select('*').order('class').order('roll')
      .then(({ data }) => setStudents(data || []))
  }, [])

  const filtered = students.filter(s =>
    s.name?.includes(search) || s.roll?.includes(search) || s.class?.includes(search)
  ).slice(0, 30)

  const selectStudent = (s: any) => {
    setSelected(s)
    setSearch(s.name)
    setMsg('')
  }

  const generate = () => {
    if (!selected && (!search)) { setMsg('অনুগ্রহ করে একজন শিক্ষার্থী নির্বাচন করুন বা তথ্য পূরণ করুন।'); return }
    const name = selected?.name || search
    const father = selected?.father_name || ''
    const mother = selected?.mother_name || ''
    const cls = selected?.class || ''

    const common = {
      serial,
      student_name: name,
      father_name: father,
      mother_name: mother,
      village,
      post_office: postOffice,
      upazila,
      district,
      dob,
      class: cls,
      issue_date: issueDate,
    }

    if (certType === 'pratyayan') {
      generatePratyayanPatra({ ...common, purpose })
    } else if (certType === 'prashangsa') {
      generatePrashangsaPatra({ ...common, exam_name: examName, exam_year: examYear, result, conduct })
    } else {
      generateTransferCertificate({
        ...common,
        tc_number: tcNumber,
        last_exam: examName,
        last_exam_year: examYear,
        last_result: result,
        conduct,
        admission_date: admissionDate,
        leaving_date: leavingDate,
        reason: tcReason,
        dues_cleared: duesCleared,
      })
    }
  }

  const inputCls = "w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla"
  const labelCls = "block text-sm font-medium text-neutral-600 mb-1 bangla"

  const certTabs: { id: CertType; label: string; color: string }[] = [
    { id: 'pratyayan', label: '📄 প্রত্যয়নপত্র', color: 'bg-blue-600' },
    { id: 'prashangsa', label: '🏅 প্রশংসাপত্র', color: 'bg-green-600' },
    { id: 'transfer', label: '📋 ট্রান্সফার সার্টিফিকেট', color: 'bg-orange-600' },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-2 bangla">সার্টিফিকেট তৈরি</h2>
      <p className="text-sm text-neutral-500 bangla mb-6">তথ্য পূরণ করুন এবং PDF/প্রিন্ট বের করুন</p>

      {/* Cert type tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {certTabs.map(t => (
          <button key={t.id} onClick={() => setCertType(t.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium bangla transition-all ${certType === t.id ? `${t.color} text-white shadow-md` : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: student search + basic info */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <h3 className="font-semibold text-neutral-800 bangla border-b pb-3">শিক্ষার্থীর তথ্য</h3>

          {/* Search */}
          <div>
            <label className={labelCls}>শিক্ষার্থী খুঁজুন (নাম/রোল)</label>
            <div className="relative">
              <input value={search} onChange={e => { setSearch(e.target.value); setSelected(null) }}
                placeholder="নাম বা রোল লিখুন..." className={inputCls} />
              {search && !selected && filtered.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-20 bg-white border border-neutral-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
                  {filtered.map(s => (
                    <button key={s.id} onClick={() => selectStudent(s)}
                      className="w-full text-left px-4 py-2.5 hover:bg-primary-50 text-sm bangla border-b border-neutral-100 last:border-0">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-neutral-400 ml-2">({s.class} · রোল {s.roll})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selected && (
              <div className="mt-2 p-3 bg-primary-50 rounded-xl text-sm bangla border border-primary-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-primary-800">{selected.name}</span>
                  <span className="text-primary-600 ml-2">· {selected.class}</span>
                  {selected.father_name && <span className="text-primary-500 ml-2">· পিতাঃ {selected.father_name}</span>}
                </div>
                <button onClick={() => { setSelected(null); setSearch('') }} className="text-neutral-400 hover:text-red-500 ml-3">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>স্মারক নং (সিরিয়াল)</label>
              <input value={serial} onChange={e => setSerial(e.target.value)} placeholder="যেমন: ১৫৯" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>তারিখ</label>
              <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>গ্রাম</label>
              <input value={village} onChange={e => setVillage(e.target.value)} placeholder="গ্রামের নাম" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>ডাকঘর</label>
              <input value={postOffice} onChange={e => setPostOffice(e.target.value)} placeholder="ডাকঘর" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>উপজেলা</label>
              <input value={upazila} onChange={e => setUpazila(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>জেলা</label>
              <input value={district} onChange={e => setDistrict(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>জন্ম তারিখ</label>
            <input value={dob} onChange={e => setDob(e.target.value)} placeholder="যেমন: ১৫/১২/২০১৬" className={inputCls} />
          </div>
        </div>

        {/* Right: cert-specific fields */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <h3 className="font-semibold text-neutral-800 bangla border-b pb-3">
            {certType === 'pratyayan' ? 'প্রত্যয়নপত্রের বিবরণ' : certType === 'prashangsa' ? 'প্রশংসাপত্রের বিবরণ' : 'ট্রান্সফার সার্টিফিকেটের বিবরণ'}
          </h3>

          {certType === 'pratyayan' && (
            <div>
              <label className={labelCls}>উদ্দেশ্য</label>
              <input value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="যে কোনো প্রয়োজনে" className={inputCls} />
            </div>
          )}

          {(certType === 'prashangsa' || certType === 'transfer') && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>পরীক্ষার নাম</label>
                  <select value={examName} onChange={e => setExamName(e.target.value)} className={inputCls}>
                    {['প্রথম সাময়িক পরীক্ষা', 'নির্বাচনি পরীক্ষা', 'বার্ষিক পরীক্ষা'].map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>সাল</label>
                  <input value={examYear} onChange={e => setExamYear(e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>ফলাফল</label>
                <input value={result} onChange={e => setResult(e.target.value)} placeholder="কৃতিত্বের সহিত উত্তীর্ণ" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>চরিত্র / আচরণ</label>
                <input value={conduct} onChange={e => setConduct(e.target.value)} placeholder="চরিত্র মেধাবী ও আচরণে বিনয়ী" className={inputCls} />
              </div>
            </>
          )}

          {certType === 'transfer' && (
            <>
              <div>
                <label className={labelCls}>টি.সি. নম্বর</label>
                <input value={tcNumber} onChange={e => setTcNumber(e.target.value)} placeholder="যেমন: TC-২০২৫-০১" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>ভর্তির তারিখ</label>
                  <input value={admissionDate} onChange={e => setAdmissionDate(e.target.value)} placeholder="যেমন: ০১/০১/২০২০" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>বিদ্যালয় ত্যাগের তারিখ</label>
                  <input value={leavingDate} onChange={e => setLeavingDate(e.target.value)} placeholder="যেমন: ৩১/১২/২০২৫" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>ত্যাগের কারণ</label>
                <input value={tcReason} onChange={e => setTcReason(e.target.value)} placeholder="অন্যত্র ভর্তির জন্য" className={inputCls} />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer bangla text-sm">
                  <input type="checkbox" checked={duesCleared} onChange={e => setDuesCleared(e.target.checked)} className="w-4 h-4 accent-primary-600" />
                  সমস্ত পাওনাদি পরিশোধিত
                </label>
              </div>
            </>
          )}

          {msg && <p className="text-red-500 text-sm bangla">{msg}</p>}

          {/* Generate button */}
          <button onClick={generate}
            className="w-full mt-2 bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-xl font-semibold bangla flex items-center justify-center gap-2 text-base transition-colors shadow">
            <FileCheck size={18} />
            {certType === 'pratyayan' ? 'প্রত্যয়নপত্র তৈরি করুন' : certType === 'prashangsa' ? 'প্রশংসাপত্র তৈরি করুন' : 'ট্রান্সফার সার্টিফিকেট তৈরি করুন'}
          </button>
          <p className="text-xs text-neutral-400 bangla text-center">নতুন ট্যাবে খুলবে → প্রিন্ট বা PDF সেভ করুন</p>
        </div>
      </div>

      {/* Quick guide */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h4 className="font-semibold bangla text-amber-800 mb-3 flex items-center gap-2"><Award size={16}/>ব্যবহারের নির্দেশিকা</h4>
        <ul className="text-sm bangla text-amber-700 space-y-1.5 list-disc list-inside">
          <li>শিক্ষার্থীর নাম দিয়ে সার্চ করলে ডেটাবেজ থেকে স্বয়ংক্রিয়ভাবে তথ্য আসবে</li>
          <li>গ্রাম, ডাকঘর, জন্ম তারিখ ম্যানুয়ালি পূরণ করতে হবে (ডেটাবেজে নেই)</li>
          <li>বাটনে ক্লিক করলে নতুন ট্যাবে সার্টিফিকেট খুলবে — সেখান থেকে Ctrl+P দিয়ে প্রিন্ট বা PDF সেভ করুন</li>
          <li>PDF সেভ করতে: Print dialog-এ Destination হিসেবে &quot;Save as PDF&quot; নির্বাচন করুন</li>
        </ul>
      </div>
    </div>
  )
}

// ── Signups ────────────────────────────────────────────
function SignupsTab() {
  const [requests, setRequests] = useState<any[]>([])
  useEffect(() => {
    supabase.from('student_signup_requests').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setRequests(data || []))
  }, [])

  const update = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('student_signup_requests').update({ status }).eq('id', id)
    setRequests(r => r.map(x => x.id === id ? { ...x, status } : x))
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 bangla">শিক্ষার্থী রেজিস্ট্রেশন অনুরোধ</h2>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b">
            <tr>{['নাম','রোল','শ্রেণি','সেশন','ইমেইল','তারিখ','স্ট্যাটাস',''].map(h=>(
              <th key={h} className="text-left px-4 py-3 font-medium text-neutral-600 bangla">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-b border-neutral-100">
                <td className="px-4 py-3 font-medium bangla">{r.name}</td>
                <td className="px-4 py-3 bangla">{r.roll}</td>
                <td className="px-4 py-3 bangla text-sm">{r.class}</td>
                <td className="px-4 py-3 bangla text-sm">{r.session}</td>
                <td className="px-4 py-3 text-sm text-neutral-500">{r.email}</td>
                <td className="px-4 py-3 text-xs text-neutral-400">{new Date(r.created_at).toLocaleDateString('bn-BD')}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium bangla ${r.status==='approved'?'bg-green-100 text-green-700':r.status==='rejected'?'bg-red-100 text-red-700':'bg-gold-100 text-gold-700'}`}>
                    {r.status==='approved'?'অনুমোদিত':r.status==='rejected'?'বাতিল':'অপেক্ষমান'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {r.status==='pending' && (
                    <div className="flex gap-1">
                      <button onClick={() => update(r.id, 'approved')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={15}/></button>
                      <button onClick={() => update(r.id, 'rejected')} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><X size={15}/></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {!requests.length && <tr><td colSpan={8} className="text-center py-10 text-neutral-400 bangla">কোনো অনুরোধ নেই</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
