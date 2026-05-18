import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NoticeTicker from '@/components/ui/NoticeTicker'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AboutSection from '@/components/sections/AboutSection'
import AcademicsSection from '@/components/sections/AcademicsSection'
import NoticeSection from '@/components/sections/NoticeSection'
import GalleryPreview from '@/components/sections/GalleryPreview'
import PrincipalSection from '@/components/sections/PrincipalSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <Header />
      <NoticeTicker />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <PrincipalSection />
        <AcademicsSection />
        <NoticeSection />
        <GalleryPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
