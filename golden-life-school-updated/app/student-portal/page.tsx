'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { LogOut, User, Award, Users, Send, ThumbsUp, MessageCircle, Trash2, ChevronDown, ChevronUp, UserPlus, LogIn, CheckCircle } from 'lucide-react'
import { SCHOOL } from '@/lib/data'
import { calcResult, CLASS_GROUPS, EXAM_TYPES } from '@/lib/grades'

const currentYear = new Date().getFullYear()
const sessions = Array.from({length:6},(_,i)=>String(currentYear-2+i))

type Student = { id:string; name:string; roll:string; class:string; section:string|null; father_name:string }
type Post = { id:string; content:string; student_name:string; student_id:string; created_at:string; reactions?:any[]; comments?:any[] }

export default function StudentPortal() {
  const [mode, setMode] = useState<'login'|'signup'>('login')

  // Login state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [student, setStudent] = useState<Student|null>(null)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Signup state
  const [signupForm, setSignupForm] = useState({ name:'', roll:'', class:'', session:String(currentYear), email:'', password:'' })
  const [signupMsg, setSignupMsg] = useState('')
  const [signupDone, setSignupDone] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)

  // Portal state
  const [tab, setTab] = useState<'profile'|'result'|'community'>('profile')
  const [resultExam, setResultExam] = useState(EXAM_TYPES[1])
  const [resultYear, setResultYear] = useState(String(currentYear))
  const [resultLoading, setResultLoading] = useState(false)
  const [resultData, setResultData] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [expandedPost, setExpandedPost] = useState<string|null>(null)
  const [commentText, setCommentText] = useState<Record<string,string>>({})

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginLoading(true); setLoginError('')
    // Check approved signup
    const { data: req } = await supabase.from('student_signup_requests')
      .select('*').eq('email', email).eq('status', 'approved').single()
    if (!req) { setLoginError('অনুমোদিত অ্যাকাউন্ট পাওয়া যায়নি।'); setLoginLoading(false); return }
    // Simple password check (stored as plain for now - in production use proper auth)
    if (req.password_hash !== password) { setLoginError('পাসওয়ার্ড ভুল।'); setLoginLoading(false); return }
    // Find student record
    const { data: stu } = await supabase.from('students').select('*')
      .ilike('roll', req.roll).eq('session', req.session).single()
    if (stu) setStudent(stu as Student)
    else {
      // Create minimal student object from signup
      setStudent({ id: req.id, name: req.name, roll: req.roll, class: req.class, section: null, father_name: '' })
    }
    setLoginLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); setSignupLoading(true); setSignupMsg('')
    if (!signupForm.name || !signupForm.roll || !signupForm.class || !signupForm.email || !signupForm.password) {
      setSignupMsg('সব তথ্য পূরণ করুন।'); setSignupLoading(false); return
    }
    const { error } = await supabase.from('student_signup_requests').insert([{
      name: signupForm.name, roll: signupForm.roll, class: signupForm.class,
      session: signupForm.session, email: signupForm.email, password_hash: signupForm.password,
      status: 'pending'
    }])
    if (error) { setSignupMsg(error.code === '23505' ? 'এই ইমেইল আগেই রেজিস্ট্রেশন করা হয়েছে।' : 'সমস্যা হয়েছে। আবার চেষ্টা করুন।'); setSignupLoading(false); return }
    setSignupDone(true); setSignupLoading(false)
  }

  useEffect(() => { if (student) loadPosts() }, [student])

  const loadPosts = async () => {
    const { data } = await supabase.from('community_posts').select('*').order('created_at', { ascending: false }).limit(30)
    if (!data) return
    const withMeta = await Promise.all((data as Post[]).map(async p => {
      const { data: r } = await supabase.from('community_reactions').select('*').eq('post_id', p.id)
      const { data: cm } = await supabase.from('community_comments').select('*').eq('post_id', p.id).order('created_at')
      return { ...p, reactions: r||[], comments: cm||[] }
    }))
    setPosts(withMeta)
  }

  const submitPost = async () => {
    if (!newPost.trim() || !student) return
    const { data } = await supabase.from('community_posts').insert([{ content: newPost, student_name: student.name, student_id: student.id }]).select().single()
    if (data) setPosts(p => [{ ...data, reactions:[], comments:[] }, ...p])
    setNewPost('')
  }

  const toggleReaction = async (postId: string) => {
    if (!student) return
    const post = posts.find(p => p.id === postId)
    const existing = post?.reactions?.find((r:any) => r.student_id === student.id)
    if (existing) await supabase.from('community_reactions').delete().eq('id', existing.id)
    else await supabase.from('community_reactions').insert([{ post_id: postId, student_id: student.id, reaction: '👍' }])
    loadPosts()
  }

  const submitComment = async (postId: string) => {
    const text = commentText[postId]?.trim()
    if (!text || !student) return
    await supabase.from('community_comments').insert([{ post_id: postId, student_name: student.name, student_id: student.id, content: text }])
    setCommentText(c => ({ ...c, [postId]: '' }))
    loadPosts()
  }

  const deletePost = async (postId: string, ownerId: string) => {
    if (!student || student.id !== ownerId) return
    await supabase.from('community_posts').delete().eq('id', postId)
    setPosts(p => p.filter(x => x.id !== postId))
  }

  const loadResult = async () => {
    if (!student) return
    setResultLoading(true); setResultData(null)
    const { data } = await supabase.from('gl_students').select('*')
      .ilike('roll', student.roll).eq('exam_type', resultExam).eq('exam_year', resultYear).single()
    if (data) setResultData(calcResult(data))
    setResultLoading(false)
  }

  const sel = "w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla"

  // ── Login Screen ──────────────────────────────
  if (!student) return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 w-full max-w-sm shadow-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={26} className="text-primary-600"/>
            </div>
            <h1 className="font-display text-xl font-bold text-neutral-800 bangla">শিক্ষার্থী পোর্টাল</h1>
          </div>

          {/* Tab */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-xl text-sm font-medium bangla transition-colors ${mode==='login'?'bg-primary-600 text-white':'bg-neutral-100 text-neutral-600'}`}>
              <LogIn size={14} className="inline mr-1"/> লগইন
            </button>
            <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-xl text-sm font-medium bangla transition-colors ${mode==='signup'?'bg-primary-600 text-white':'bg-neutral-100 text-neutral-600'}`}>
              <UserPlus size={14} className="inline mr-1"/> রেজিস্ট্রেশন
            </button>
          </div>

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div><label className="block text-sm font-medium text-neutral-700 mb-1 bangla">ইমেইল</label>
                <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className={sel}/></div>
              <div><label className="block text-sm font-medium text-neutral-700 mb-1 bangla">পাসওয়ার্ড</label>
                <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className={sel}/></div>
              {loginError && <p className="text-red-500 text-sm bangla">{loginError}</p>}
              <button type="submit" disabled={loginLoading} className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium bangla">
                {loginLoading ? 'যাচাই হচ্ছে...' : 'লগইন'}
              </button>
              <p className="text-xs text-neutral-400 bangla text-center">অ্যাকাউন্ট না থাকলে রেজিস্ট্রেশন করুন। Admin অনুমোদনের পর লগইন করতে পারবেন।</p>
            </form>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            signupDone ? (
              <div className="text-center py-4">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3"/>
                <h3 className="font-semibold text-neutral-800 bangla mb-2">আবেদন জমা হয়েছে!</h3>
                <p className="text-sm text-neutral-500 bangla">Admin অনুমোদন করলে আপনি লগইন করতে পারবেন।</p>
                <button onClick={() => { setSignupDone(false); setMode('login') }} className="mt-4 text-primary-600 text-sm bangla hover:underline">লগইন করুন</button>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-3">
                <div><label className="block text-xs font-medium text-neutral-700 mb-1 bangla">পুরো নাম *</label>
                  <input required value={signupForm.name} onChange={e=>setSignupForm(f=>({...f,name:e.target.value}))} className={sel} placeholder="আপনার নাম"/></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className="block text-xs font-medium text-neutral-700 mb-1 bangla">রোল *</label>
                    <input required value={signupForm.roll} onChange={e=>setSignupForm(f=>({...f,roll:e.target.value}))} className={sel} placeholder="রোল"/></div>
                  <div><label className="block text-xs font-medium text-neutral-700 mb-1 bangla">শ্রেণি *</label>
                    <select required value={signupForm.class} onChange={e=>setSignupForm(f=>({...f,class:e.target.value}))} className={sel}>
                      <option value="">বেছে নিন</option>
                      {Object.entries(CLASS_GROUPS as any).map(([k,v]:any) => <option key={k} value={k}>{v.label}</option>)}
                    </select></div>
                </div>
                <div><label className="block text-xs font-medium text-neutral-700 mb-1 bangla">সেশন *</label>
                  <select required value={signupForm.session} onChange={e=>setSignupForm(f=>({...f,session:e.target.value}))} className={sel}>
                    {sessions.map(s=><option key={s} value={s}>{s}</option>)}
                  </select></div>
                <div><label className="block text-xs font-medium text-neutral-700 mb-1 bangla">ইমেইল *</label>
                  <input required type="email" value={signupForm.email} onChange={e=>setSignupForm(f=>({...f,email:e.target.value}))} className={sel}/></div>
                <div><label className="block text-xs font-medium text-neutral-700 mb-1 bangla">পাসওয়ার্ড *</label>
                  <input required type="password" value={signupForm.password} onChange={e=>setSignupForm(f=>({...f,password:e.target.value}))} className={sel} placeholder="কমপক্ষে ৬ অক্ষর"/></div>
                {signupMsg && <p className="text-red-500 text-xs bangla">{signupMsg}</p>}
                <button type="submit" disabled={signupLoading} className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium bangla text-sm">
                  {signupLoading ? 'জমা হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
                </button>
              </form>
            )
          )}
        </div>
      </div>
      <Footer/>
    </>
  )

  // ── Portal Dashboard ──────────────────────────
  const tabs = [
    {id:'profile',label:'প্রোফাইল',icon:User},
    {id:'result',label:'ফলাফল',icon:Award},
    {id:'community',label:'কমিউনিটি',icon:Users},
  ]

  return (
    <>
      <Header/>
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-primary-800 text-white py-4">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <div className="bangla"><p className="font-semibold">{student.name}</p>
              <p className="text-primary-300 text-xs">{student.class} | রোল: {student.roll}</p>
            </div>
            <button onClick={() => setStudent(null)} className="flex items-center gap-1.5 text-primary-300 hover:text-white text-sm bangla">
              <LogOut size={15}/> লগআউট
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex gap-2 mb-6">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bangla transition-colors ${tab===t.id?'bg-primary-600 text-white':'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300'}`}>
                <t.icon size={15}/>{t.label}
              </button>
            ))}
          </div>

          {tab==='profile' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-display text-xl font-bold text-neutral-800 mb-5 bangla">ব্যক্তিগত তথ্য</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[['নাম',student.name],['রোল',student.roll],['শ্রেণি',student.class],['বিভাগ',student.section||'প্রযোজ্য নয়'],['পিতার নাম',student.father_name||'—']].map(([k,v])=>(
                  <div key={String(k)} className="bg-neutral-50 rounded-xl p-4">
                    <dt className="text-xs text-neutral-500 bangla mb-1">{k}</dt>
                    <dd className="font-semibold text-neutral-800 bangla">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {tab==='result' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-display text-xl font-bold text-neutral-800 mb-4 bangla">আমার ফলাফল</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {EXAM_TYPES.map((e:string) => (
                  <button key={e} onClick={() => setResultExam(e)}
                    className={`bangla text-sm px-3 py-1.5 rounded-lg ${resultExam===e?'bg-primary-600 text-white':'bg-neutral-100 text-neutral-600'}`}>{e}</button>
                ))}
              </div>
              <div className="flex gap-2 mb-4">
                {sessions.map(s => (
                  <button key={s} onClick={() => setResultYear(s)}
                    className={`text-sm px-3 py-1.5 rounded-lg ${resultYear===s?'bg-primary-600 text-white':'bg-neutral-100 text-neutral-600'}`}>{s}</button>
                ))}
              </div>
              <button onClick={loadResult} disabled={resultLoading}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm bangla mb-5">
                {resultLoading?'লোড হচ্ছে...':'ফলাফল দেখুন'}
              </button>
              {resultData && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm mb-4">
                    <thead className="bg-neutral-50 border-b">
                      <tr>{['বিষয়','পূর্ণমান','নৈবত্তিক','লিখিত','মোট','গ্রেড'].map(h=><th key={h} className="text-left px-3 py-2 text-neutral-600 font-medium bangla">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {resultData.subjects.map((s:any,i:number)=>(
                        <tr key={s.key} className={`border-b border-neutral-100 ${i%2===0?'bg-white':'bg-neutral-50'}`}>
                          <td className="px-3 py-2 bangla font-medium">{s.label}</td>
                          <td className="px-3 py-2 text-center">{s.max}</td>
                          <td className="px-3 py-2 text-center">{s.naib>0?s.naib:'—'}</td>
                          <td className="px-3 py-2 text-center">{s.written>0?s.written:'—'}</td>
                          <td className="px-3 py-2 text-center font-bold">{s.total}</td>
                          <td className="px-3 py-2 text-center"><span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs font-bold">{s.grade}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex gap-4 flex-wrap">
                    {[{l:'ফলাফল',v:resultData.passed?'উত্তীর্ণ':'অনুত্তীর্ণ'},{l:'CGPA',v:resultData.cgpa.toFixed(2)},{l:'গ্রেড',v:resultData.cgpaGrade}].map(x=>(
                      <div key={x.l} className="border-2 border-primary-200 rounded-xl px-5 py-2 text-center">
                        <div className="font-bold text-xl text-primary-700">{x.v}</div>
                        <div className="text-xs text-neutral-500 bangla">{x.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {resultData===null && !resultLoading && <p className="text-neutral-400 bangla text-center py-6">ফলাফল পাওয়া যায়নি</p>}
            </div>
          )}

          {tab==='community' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-200 p-5">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <span className="text-primary-600 font-bold text-sm">{student.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <textarea value={newPost} onChange={e=>setNewPost(e.target.value)} rows={3} placeholder="কিছু লিখুন..."
                      className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla resize-none"/>
                    <button onClick={submitPost} className="mt-2 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm bangla">
                      <Send size={14}/> পোস্ট করুন
                    </button>
                  </div>
                </div>
              </div>

              {posts.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-xs">{p.student_name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm bangla text-primary-700">{p.student_name}</p>
                        <p className="text-xs text-neutral-400">{new Date(p.created_at).toLocaleDateString('bn-BD')}</p>
                      </div>
                    </div>
                    {student.id===p.student_id && (
                      <button onClick={() => deletePost(p.id, p.student_id)} className="text-neutral-300 hover:text-red-400 p-1 rounded-lg">
                        <Trash2 size={14}/>
                      </button>
                    )}
                  </div>
                  <p className="text-neutral-700 bangla text-sm mb-3">{p.content}</p>
                  <div className="flex items-center gap-4 pt-3 border-t border-neutral-100">
                    <button onClick={() => toggleReaction(p.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${p.reactions?.some((r:any)=>r.student_id===student.id)?'text-primary-600':'text-neutral-400 hover:text-primary-500'}`}>
                      <ThumbsUp size={15}/><span className="bangla">{p.reactions?.length||0} লাইক</span>
                    </button>
                    <button onClick={() => setExpandedPost(expandedPost===p.id?null:p.id)}
                      className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-primary-500">
                      <MessageCircle size={15}/><span className="bangla">{p.comments?.length||0} মন্তব্য</span>
                      {expandedPost===p.id?<ChevronUp size={12}/>:<ChevronDown size={12}/>}
                    </button>
                  </div>
                  {expandedPost===p.id && (
                    <div className="mt-3 space-y-2">
                      {p.comments?.map((cm:any) => (
                        <div key={cm.id} className="bg-neutral-50 rounded-xl px-3 py-2 flex gap-2">
                          <span className="font-semibold text-xs text-primary-600 bangla shrink-0">{cm.student_name}:</span>
                          <span className="text-sm text-neutral-700 bangla">{cm.content}</span>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-2">
                        <input value={commentText[p.id]||''} onChange={e=>setCommentText(c=>({...c,[p.id]:e.target.value}))}
                          placeholder="মন্তব্য করুন..." className="flex-1 border border-neutral-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-400 bangla"/>
                        <button onClick={() => submitComment(p.id)} className="bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700">
                          <Send size={13}/>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer/>
    </>
  )
}
