import { GraduationCap, Users, BookOpen, Trophy } from 'lucide-react'

const stats = [
  { icon: GraduationCap, value: '১২+', label: 'বছরের অভিজ্ঞতা', color: 'bg-primary-50 text-primary-700' },
  { icon: Users, value: '৫০০+', label: 'শিক্ষার্থী', color: 'bg-gold-50 text-gold-700' },
  { icon: BookOpen, value: '১২টি', label: 'শ্রেণি', color: 'bg-green-50 text-green-700' },
  { icon: Trophy, value: '১০০%', label: 'পাসের হার লক্ষ্য', color: 'bg-purple-50 text-purple-700' },
]

export default function StatsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className={`rounded-2xl p-6 text-center ${stat.color.split(' ')[0]} border border-neutral-100`}>
              <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-display font-bold text-neutral-800 mb-1 bangla">{stat.value}</div>
              <div className="text-sm text-neutral-500 bangla">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
