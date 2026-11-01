import { AcademySection } from '../components/home/AcademySection'
import { Hero } from '../components/home/Hero'
import { HowWeWorkSection } from '../components/home/HowWeWorkSection'
import { OriginalsSection } from '../components/home/OriginalsSection'
import { SelectedWork } from '../components/home/SelectedWork'
import { ServicesSection } from '../components/home/ServicesSection'
import { Showreel } from '../components/home/Showreel'
import { ContactCta } from '../components/ui/ContactCta'
import { siteConfig } from '../data/siteConfig'
import { organizationJsonLd } from '../lib/head'
import { Seo } from '../lib/seo'

/**
 * Homepage following required Developer Brief section order:
 * 1. Hero: "Stories in Motion. Businesses Online."
 * 2. Showreel: actual ANICX work, strong poster image, click-to-play video.
 * 3. Three service cards: Animation Studio, Websites & Content, ANICX Academy.
 * 4. Selected Client Work: hotel website and representative animation contributions + client channels grid.
 * 5. Original Series: Panga Toonz and Raaz Wali Raat (with appropriate content labels).
 * 6. How We Work: Discuss → Plan & Quote → Create → Review → Deliver.
 * 7. Academy preview: confirmed programmes / upcoming-batch interest form.
 * 8. Final contact section: “Have a project in mind? Let’s discuss it.” with WhatsApp and location actions.
 */
export default function HomePage() {
  return (
    <>
      <Seo
        title="Animation Studio & Creative Academy"
        description={`${siteConfig.name} creates 2D and 3D animation, business websites and engaging video content. Based in Seoni, collaborating with clients online.`}
        path="/"
        jsonLd={[organizationJsonLd()]}
      />
      <Hero />
      <Showreel />
      <ServicesSection />
      <SelectedWork />
      <OriginalsSection />
      <HowWeWorkSection />
      <AcademySection />
      <ContactCta
        title={['Have a Project in Mind?', 'Let’s Discuss It.']}
        subtitle="ANICX Media creates 2D and 3D animation, business websites and video content. Contact us directly on WhatsApp or call our Seoni studio."
      />
    </>
  )
}
