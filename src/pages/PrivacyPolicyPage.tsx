import { Link } from 'react-router'
import { PageHero } from '../components/ui/PageHero'
import { locationLabel, siteConfig } from '../data/siteConfig'
import { Seo } from '../lib/seo'

/**
 * Plain-language privacy policy describing what this website actually does.
 * Have it reviewed by the client (and a legal adviser if needed) before launch,
 * and update it if analytics, cookies or new services are added.
 */
const LAST_UPDATED = '23 October 2026'

export default function PrivacyPolicyPage() {
  const { name, contact } = siteConfig
  const contactLine = contact.email ? (
    <a href={`mailto:${contact.email}`} className="underline">
      {contact.email}
    </a>
  ) : (
    <Link to="/contact" className="underline">
      our contact page
    </Link>
  )

  return (
    <>
      <Seo title="Privacy Policy" description={`How ${name} collects and uses information submitted through this website.`} path="/privacy-policy" />
      <PageHero eyebrow="Legal" title={['Privacy Policy']} intro={`Last updated: ${LAST_UPDATED}`} />

      <article className="shell pb-24 md:pb-32">
        <div className="max-w-3xl space-y-10 text-[1.0625rem] leading-relaxed text-ink/85 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <section>
            <h2>Who we are</h2>
            <p>
              This website is operated by {name}, an animation studio and creative academy based in {locationLabel}. In this policy,
              “we” and “us” refer to {name}.
            </p>
          </section>

          <section>
            <h2>Information you send us</h2>
            <p>When you submit a project or course enquiry form, we receive the details you enter:</p>
            <ul>
              <li>your name, email address and phone number;</li>
              <li>the service or course you are interested in;</li>
              <li>for project enquiries, your budget range, timeline and project description;</li>
              <li>any message you choose to include.</li>
            </ul>
            <p className="mt-4">
              We use this information only to reply to your enquiry and to discuss the project or training you asked about. We do not
              sell your information.
            </p>
          </section>

          <section>
            <h2>How forms are processed</h2>
            <p>
              Form submissions are processed and stored by our hosting provider, Netlify, Inc., which acts on our behalf. Netlify may
              apply automated spam filtering to submissions.
            </p>
          </section>

          <section>
            <h2>Videos</h2>
            <p>
              Videos on this site are hosted on YouTube. A video player is only loaded when you choose to play a video, using
              YouTube’s privacy-enhanced mode (youtube-nocookie.com). Once you play a video, YouTube’s own privacy policy applies.
              Video thumbnails may be loaded from YouTube’s image servers.
            </p>
          </section>

          <section>
            <h2>Cookies and analytics</h2>
            <p>
              This website does not use advertising cookies or analytics tracking. If that changes, this policy will be updated
              first.
            </p>
          </section>

          <section>
            <h2>External links</h2>
            <p>
              Links to Instagram, YouTube, WhatsApp and other sites take you to services with their own privacy policies, which we
              do not control.
            </p>
          </section>

          <section>
            <h2>Keeping and deleting your information</h2>
            <p>
              We keep enquiry details only for as long as needed to respond and follow up. You can ask us to access, correct or
              delete the information you sent at any time by contacting us through {contactLine}.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
          </section>
        </div>
      </article>
    </>
  )
}
