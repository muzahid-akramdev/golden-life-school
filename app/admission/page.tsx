'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { CheckCircle, Send, Download } from 'lucide-react'
import { generateAdmissionPDF } from '@/lib/admissionPDF'
import { SCHOOL } from '@/lib/data'

const classes = ['প্লে', 'নার্সারি', 'প্রথম শ্রেণি', 'দ্বিতীয় শ্রেণি', 'তৃতীয় শ্রেণি', 'চতুর্থ শ্রেণি', 'পঞ্চম শ্রেণি', 'ষষ্ঠ শ্রেণি', 'সপ্তম শ্রেণি', 'অষ্টম শ্রেণি', 'নবম শ্রেণি', 'দশম শ্রেণি']

export default function AdmissionPage() {
  const [form, setForm] = useState({
    student_name_bn: '', student_name_en: '',
    father_name_bn: '', father_name_en: '', father_id: '',
    mother_name_bn: '', mother_name_en: '', mother_id: '',
    class_applying: '',
    roll_number: '',
    address_permanent: '', address_current: '',
    dob: '', religion: '', nationality: 'বাংলাদেশী',
    father_occupation: '', mother_occupation: '',
    annual_income: '', land_area: '',
    transport: 'হেঁটে',
    previous_school: '',
    phone_father: '', phone_mother: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('admissions').insert([{
        ...form,
        status: 'pending',
      }])
      if (err) throw err
      setSubmitted(true)
    } catch (err: any) {
      setError('সমস্যা হয়েছে। পরে চেষ্টা করুন অথবা সরাসরি স্কুলে যোগাযোগ করুন।')
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const field = "w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla"
  const label = "block text-sm font-medium text-neutral-700 mb-1 bangla"

  if (submitted) return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-md">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-neutral-800 mb-3 bangla">আবেদন সম্পন্ন!</h2>
          <p className="text-neutral-600 bangla leading-relaxed mb-6">
            আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </p>
          <button
            onClick={() => generateAdmissionPDF(form as any)}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium bangla mx-auto transition-colors mb-4"
          >
            <Download size={16} /> আবেদন ফর্ম ডাউনলোড করুন
          </button>
          <p className="text-sm text-neutral-500 bangla">
            যোগাযোগ: {SCHOOL.contact.phone[0]}
          </p>
        </div>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        {/* Page header */}
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-display text-3xl font-bold mb-2 bangla">ভর্তির আবেদন ফর্ম</h1>
            <p className="text-primary-200 bangla">গোল্ডেন লাইফ পাবলিক স্কুল — ২০২৫</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-8 space-y-8">

                {/* Student info */}
                <fieldset>
                  <legend className="font-display text-lg font-bold text-primary-800 mb-4 pb-2 border-b border-neutral-200 w-full bangla">
                    ১. ছাত্র/ছাত্রীর তথ্য
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>নাম (বাংলায়) *</label>
                      <input required className={field} value={form.student_name_bn} onChange={e => set('student_name_bn', e.target.value)} placeholder="বাংলায় পুরো নাম" />
                    </div>
                    <div>
                      <label className={label}>নাম (ইংরেজিতে) *</label>
                      <input required className={field} value={form.student_name_en} onChange={e => set('student_name_en', e.target.value)} placeholder="Full name in English" />
                    </div>
                    <div>
                      <label className={label}>জন্ম তারিখ *</label>
                      <input required type="date" className={field} value={form.dob} onChange={e => set('dob', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>ধর্ম *</label>
                      <select required className={field} value={form.religion} onChange={e => set('religion', e.target.value)}>
                        <option value="">নির্বাচন করুন</option>
                        {['ইসলাম','হিন্দু','খ্রিস্টান','বৌদ্ধ','অন্যান্য'].map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={label}>জাতীয়তা *</label>
                      <input required className={field} value={form.nationality} onChange={e => set('nationality', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>যে শ্রেণিতে ভর্তিচ্ছু *</label>
                      <select required className={field} value={form.class_applying} onChange={e => set('class_applying', e.target.value)}>
                        <option value="">শ্রেণি নির্বাচন করুন</option>
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Father */}
                <fieldset>
                  <legend className="font-display text-lg font-bold text-primary-800 mb-4 pb-2 border-b border-neutral-200 w-full bangla">
                    ২. পিতার তথ্য
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>পিতার নাম (বাংলায়) *</label>
                      <input required className={field} value={form.father_name_bn} onChange={e => set('father_name_bn', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>পিতার নাম (ইংরেজিতে)</label>
                      <input className={field} value={form.father_name_en} onChange={e => set('father_name_en', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>জাতীয় পরিচয়পত্র নম্বর</label>
                      <input className={field} value={form.father_id} onChange={e => set('father_id', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>পেশা</label>
                      <input className={field} value={form.father_occupation} onChange={e => set('father_occupation', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>মোবাইল নম্বর *</label>
                      <input required type="tel" className={field} value={form.phone_father} onChange={e => set('phone_father', e.target.value)} />
                    </div>
                  </div>
                </fieldset>

                {/* Mother */}
                <fieldset>
                  <legend className="font-display text-lg font-bold text-primary-800 mb-4 pb-2 border-b border-neutral-200 w-full bangla">
                    ৩. মাতার তথ্য
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>মাতার নাম (বাংলায়) *</label>
                      <input required className={field} value={form.mother_name_bn} onChange={e => set('mother_name_bn', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>মাতার নাম (ইংরেজিতে)</label>
                      <input className={field} value={form.mother_name_en} onChange={e => set('mother_name_en', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>জাতীয় পরিচয়পত্র নম্বর</label>
                      <input className={field} value={form.mother_id} onChange={e => set('mother_id', e.target.value)} />
                    </div>
                    <div>
                      <label className={label}>মোবাইল নম্বর *</label>
                      <input required type="tel" className={field} value={form.phone_mother} onChange={e => set('phone_mother', e.target.value)} />
                    </div>
                  </div>
                </fieldset>

                {/* Address */}
                <fieldset>
                  <legend className="font-display text-lg font-bold text-primary-800 mb-4 pb-2 border-b border-neutral-200 w-full bangla">
                    ৪. ঠিকানা
                  </legend>
                  <div className="space-y-4">
                    <div>
                      <label className={label}>স্থায়ী ঠিকানা *</label>
                      <input required className={field} value={form.address_permanent} onChange={e => set('address_permanent', e.target.value)} placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" />
                    </div>
                    <div>
                      <label className={label}>বর্তমান ঠিকানা</label>
                      <input className={field} value={form.address_current} onChange={e => set('address_current', e.target.value)} placeholder="স্থায়ীর মতো হলে একই লিখুন" />
                    </div>
                  </div>
                </fieldset>

                {/* Other */}
                <fieldset>
                  <legend className="font-display text-lg font-bold text-primary-800 mb-4 pb-2 border-b border-neutral-200 w-full bangla">
                    ৫. অন্যান্য তথ্য
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>যাতায়াতের মাধ্যম</label>
                      <select className={field} value={form.transport} onChange={e => set('transport', e.target.value)}>
                        <option>হেঁটে</option>
                        <option>গাড়িতে</option>
                        <option>রিকশায়</option>
                        <option>অন্যান্য</option>
                      </select>
                    </div>
                    <div>
                      <label className={label}>পূর্বের বিদ্যালয়ের নাম</label>
                      <input className={field} value={form.previous_school} onChange={e => set('previous_school', e.target.value)} placeholder="না থাকলে খালি রাখুন" />
                    </div>
                  </div>
                </fieldset>

                {error && <p className="text-red-500 text-sm bangla bg-red-50 rounded-lg px-4 py-3">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3.5 rounded-xl font-semibold transition-colors bangla"
                >
                  {loading ? 'জমা হচ্ছে...' : (<><Send size={18} /> আবেদন জমা দিন</>)}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
                <h3 className="font-bold text-primary-800 mb-3 bangla">প্রয়োজনীয় কাগজপত্র</h3>
                <ul className="space-y-2 text-sm text-neutral-700 bangla">
                  {['পাসপোর্ট সাইজ ছবি ৩ কপি','জন্ম নিবন্ধন সনদপত্র ১ কপি','প্রশংসা পত্র / প্রত্যয়ন পত্র ১ কপি','পিতামাতার আইডি কার্ডের ফটোকপি ১ কপি'].map(d => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="text-primary-600 mt-0.5">•</span>{d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                <h3 className="font-bold text-neutral-800 mb-3 bangla">যোগাযোগ</h3>
                <p className="text-sm text-neutral-600 bangla">যেকোনো তথ্যের জন্য সরাসরি স্কুলে যোগাযোগ করুন।</p>
                <div className="mt-3 space-y-1">
                  {SCHOOL.contact.phone.map(p => (
                    <a key={p} href={`tel:${p}`} className="block text-primary-600 font-medium text-sm">{p}</a>
                  ))}
                  <a href={`mailto:${SCHOOL.contact.email}`} className="block text-primary-600 text-sm break-all">{SCHOOL.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
