import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'গোল্ডেন লাইফ পাবলিক স্কুল | Kazipur, Sirajganj',
  description: 'গোল্ডেন লাইফ পাবলিক স্কুল — পাইকরতলী, কাজিপুর, সিরাজগঞ্জ। প্লে থেকে দশম শ্রেণি পর্যন্ত মানসম্মত শিক্ষা।',
  keywords: ['school', 'kazipur', 'sirajganj', 'golden life', 'বিদ্যালয়'],
  openGraph: {
    title: 'গোল্ডেন লাইফ পাবলিক স্কুল',
    description: 'কাজিপুরের ব্যতিক্রমধর্মী শিক্ষাপ্রতিষ্ঠান',
    locale: 'bn_BD',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
