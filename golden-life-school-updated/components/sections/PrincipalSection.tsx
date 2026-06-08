import { Quote } from 'lucide-react'
import SchoolLogo from '../ui/SchoolLogo'

export default function PrincipalSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

            {/* Principal info */}
            <div className="text-center md:text-left">
              <div className="w-28 h-28 bg-primary-200 rounded-full mx-auto md:mx-0 flex items-center justify-center mb-4">
                <span className="text-4xl font-display font-bold text-primary-700">আ</span>
              </div>
              <h3 className="font-display text-xl font-bold text-primary-800 bangla">
                ডাঃ মোঃ আমিনুল ইসলাম
              </h3>
              <p className="text-primary-600 text-sm bangla mt-1">প্রধান শিক্ষক</p>
              <p className="text-neutral-500 text-xs bangla mt-1">
                এমবিএস (ব্যবস্থাপনা)<br />
              </p>
              <div className="mt-4 inline-block bg-primary-200 text-primary-800 px-3 py-1 rounded-full text-xs bangla">
                প্রতিষ্ঠাতা পরিচালক
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Quote size={20} className="text-gold-500" />
                <span className="text-sm font-medium text-gold-600 bangla">প্রধান শিক্ষকের বার্তা</span>
              </div>

              <blockquote className="bangla text-neutral-700 leading-relaxed space-y-3">
                <p>
                  প্রিয় অভিভাবক ও শিক্ষার্থীবৃন্দ, গোল্ডেন লাইফ পাবলিক স্কুলে আপনাদের স্বাগত জানাই।
                </p>
                <p>
                  একটি শিশুর মেধা, মনন ও মানবিক বিকাশই আমাদের মূল লক্ষ্য। আমরা বিশ্বাস করি প্রতিটি শিশুর মধ্যে অপার সম্ভাবনা লুকিয়ে আছে — দরকার শুধু সঠিক পরিচর্যা ও অনুপ্রেরণা।
                </p>
                <p>
                  দীর্ঘ শিক্ষকতার অভিজ্ঞতা থেকে উপলব্ধি করেছি, শুধু পাঠ্যবইয়ের জ্ঞান নয়, নৈতিক মূল্যবোধ ও সৃজনশীলতার বিকাশ ঘটালেই একজন শিক্ষার্থী প্রকৃত মানুষ হিসেবে গড়ে উঠতে পারে।
                </p>
                <p className="font-medium text-primary-700">
                  আসুন, একসাথে একটি আলোকিত ভবিষ্যৎ গড়ে তুলি।
                </p>
              </blockquote>

              <div className="mt-6 pt-6 border-t border-primary-200">
                <p className="text-primary-700 font-semibold bangla text-sm">ডাঃ মোঃ আমিনুল ইসলাম</p>
                <p className="text-neutral-500 text-xs bangla">প্রধান শিক্ষক, গোল্ডেন লাইফ পাবলিক স্কুল</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
