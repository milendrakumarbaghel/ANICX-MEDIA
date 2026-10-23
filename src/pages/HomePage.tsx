import { AboutPreview } from '../components/home/AboutPreview'
import { AcademySection } from '../components/home/AcademySection'
import { DisciplinesMarquee } from '../components/home/DisciplinesMarquee'
import { Hero } from '../components/home/Hero'
import { OriginalsSection } from '../components/home/OriginalsSection'
import { SelectedWork } from '../components/home/SelectedWork'
import { ServicesSection } from '../components/home/ServicesSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { ContactCta } from '../components/ui/ContactCta'
import { siteConfig } from '../data/siteConfig'
import { organizationJsonLd } from '../lib/head'
import { Seo } from '../lib/seo'

export default function HomePage() {
  return (
    <>
      <Seo
        description={`${siteConfig.name} is an animation studio and creative academy in Seoni, Madhya Pradesh: 2D and 3D animation, product animation, video editing, branding and online animation training.`}
        path="/"
        jsonLd={[organizationJsonLd()]}
      />
      <Hero />
      <DisciplinesMarquee />
      <SelectedWork />
      <ServicesSection />
      <AcademySection />
      <OriginalsSection />
      <AboutPreview />
      <TestimonialsSection />
      <ContactCta />
    </>
  )
}
