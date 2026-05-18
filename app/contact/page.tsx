'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SCHOOL } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import emailjs from 'emailjs-com'
import { useEffect } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      if (key) emailjs.init(key)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Save to Supabase
      await supabase.from('contacts').insert([{ ...form, is_read: false }])

      // Send email via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_phone: form.phone,
          from_email: form.email,
          message: form.message,
          to_email: SCHOOL.contact.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSent(true)
    } catch (e) {
      alert('পাঠানো যায়নি। পরে চেষ্টা করুন।')
    }
    setLoading(false)
  }

  const field = "w-full border border-neutral-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 bangla"

  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen">
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-display text-3xl font-bold mb-2 bangla">যোগাযোগ করুন</h1>
            <p className="text-primary-200 bangla">আমরা আপনার সেবায় সর্বদা প্রস্তুত</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact info */}
            <div className="space-y-5">
              {[
                { icon: Phone, title: 'ফোন', lines: SCHOOL.contact.phone, href: `tel:${SCHOOL.contact.phone[0]}` },
                { icon: Mail, title: 'ইমেইল', lines: [SCHOOL.contact.email], href: `mailto:${SCHOOL.contact.email}` },
                { icon: MapPin, title: 'ঠিকানা', lines: [SCHOOL.contact.address], href: '#' },
              ].map(({ icon: Icon, title, lines, href }) => (
                <a key={title} href={href} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-700 bangla text-sm mb-1">{title}</p>
                    {lines.map(l => <p key={l} className="text-neutral-600 text-sm bangla">{l}</p>)}
                  </div>
                </a>
              ))}

              {/* Map placeholder */}
              <div className="bg-primary-100 rounded-xl h-48 flex items-center justify-center border border-primary-200">
                <div className="text-center text-primary-500">
                  <MapPin size={28} className="mx-auto mb-2" />
                  <p className="text-sm bangla">পাইকরতলী, কাজিপুর</p>
                  <p className="text-xs bangla">সিরাজগঞ্জ</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-neutral-800 mb-2 bangla">বার্তা পাঠানো হয়েছে!</h3>
                  <p className="text-neutral-600 bangla">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-8 space-y-5">
                  <h2 className="font-display text-xl font-bold text-neutral-800 bangla">বার্তা পাঠান</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1 bangla">নাম *</label>
                      <input required className={field} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1 bangla">ফোন *</label>
                      <input required type="tel" className={field} value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1 bangla">ইমেইল (ঐচ্ছিক)</label>
                    <input type="email" className={field} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1 bangla">বার্তা *</label>
                    <textarea required rows={5} className={field} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="আপনার বার্তা এখানে লিখুন..." />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-semibold bangla transition-colors"
                  >
                    {loading ? 'পাঠানো হচ্ছে...' : (<><Send size={16} /> বার্তা পাঠান</>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
