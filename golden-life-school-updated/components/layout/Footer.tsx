import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { SCHOOL, NAV_LINKS } from '@/lib/data'
import SchoolLogo from '../ui/SchoolLogo'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <SchoolLogo size={52} />
              <div>
                <h3 className="font-display font-bold text-lg leading-tight bangla">{SCHOOL.name}</h3>
                <p className="text-primary-300 text-xs bangla">বিদ্যালয় কোড: {SCHOOL.code}</p>
              </div>
            </div>
            <p className="text-primary-200 text-sm bangla leading-relaxed">
              {SCHOOL.tagline}
            </p>
            <p className="text-primary-300 text-xs mt-3 bangla">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 bangla text-base">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 6).map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-primary-200 hover:text-white text-sm bangla transition-colors">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 bangla text-base">পোর্টাল</h4>
            <ul className="space-y-2">
              <li><Link href="/student-portal" className="text-primary-200 hover:text-white text-sm bangla transition-colors">→ শিক্ষার্থী পোর্টাল</Link></li>
              <li><Link href="/teacher-portal" className="text-primary-200 hover:text-white text-sm bangla transition-colors">→ শিক্ষক পোর্টাল</Link></li>
              <li><Link href="/admin" className="text-primary-200 hover:text-white text-sm bangla transition-colors">→ অ্যাডমিন প্যানেল</Link></li>
              <li><Link href="/result" className="text-primary-200 hover:text-white text-sm bangla transition-colors">→ ফলাফল দেখুন</Link></li>
              <li>
                <a href="https://nctb.gov.bd" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white text-sm bangla transition-colors">
                  → বই ডাউনলোড (NCTB)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 bangla text-base">যোগাযোগ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-primary-200 text-sm bangla">
                <MapPin size={15} className="mt-1 shrink-0 text-gold-400" />
                {SCHOOL.contact.address}
              </li>
              {SCHOOL.contact.phone.map(p => (
                <li key={p} className="flex items-center gap-2 text-primary-200 text-sm">
                  <Phone size={14} className="text-gold-400" />
                  {p}
                </li>
              ))}
              <li className="flex items-center gap-2 text-primary-200 text-sm break-all">
                <Mail size={14} className="text-gold-400 shrink-0" />
                {SCHOOL.contact.email}
              </li>
              <li>
                <a href={SCHOOL.socials.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-200 hover:text-white text-sm transition-colors">
                  <Facebook size={15} className="text-gold-400" />
                  Facebook পেজ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-primary-700 flex flex-col md:flex-row justify-between items-center gap-3 text-primary-400 text-xs bangla">
          <p>© {new Date().getFullYear()} গোল্ডেন লাইফ পাবলিক স্কুল। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>স্থাপিত {SCHOOL.established} | কাজিপুর, সিরাজগঞ্জ</p>
        </div>
      </div>
    </footer>
  )
}
