'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'
import { NAV_LINKS, SCHOOL } from '@/lib/data'
import SchoolLogo from '@/components/ui/SchoolLogo'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-900 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6 bangla">
            <span className="flex items-center gap-1.5 text-primary-200">
              <Phone size={13} />
              {SCHOOL.contact.phone[0]}
            </span>
            <span className="flex items-center gap-1.5 text-primary-200">
              <Mail size={13} />
              {SCHOOL.contact.email}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admission" className="text-gold-400 hover:text-gold-300 font-medium bangla transition-colors">
              ভর্তি চলছে ২০২৫ →
            </Link>
            <Link href="/result" className="text-primary-200 hover:text-white bangla transition-colors">
              ফলাফল দেখুন
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white border-b border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <SchoolLogo size={56} />
              <div className="hidden sm:block">
                <h1 className="font-display text-primary-800 font-bold text-lg leading-tight bangla">
                  {SCHOOL.name}
                </h1>
                <p className="text-neutral-500 text-xs bangla">{SCHOOL.location}</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium bangla transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/student-portal"
                className="hidden md:flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors bangla"
              >
                শিক্ষার্থী পোর্টাল
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-lg text-sm font-medium bangla border-b border-neutral-100 last:border-0 ${
                  pathname === link.href
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/student-portal"
              className="mt-3 w-full flex justify-center bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium bangla"
            >
              শিক্ষার্থী পোর্টাল
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
