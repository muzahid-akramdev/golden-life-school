import Link from 'next/link'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'

export default function GalleryPreview() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i + 1)
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4 bangla">ফটো গ্যালারি</div>
            <h2 className="font-display text-3xl font-bold text-neutral-800 bangla">স্মরণীয় মুহূর্তগুলো</h2>
          </div>
          <Link href="/gallery" className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium bangla text-sm">
            সব দেখুন <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((i) => (
            <div key={i} className={`rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center ${
              i === 1 ? 'row-span-2 min-h-[280px]' : 'min-h-[130px]'
            }`}>
              <div className="text-center text-primary-400">
                <ImageIcon size={28} className="mx-auto mb-2" />
                <p className="text-xs bangla">ছবি শীঘ্রই আসছে</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
