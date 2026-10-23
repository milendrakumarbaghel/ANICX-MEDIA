import { useRef } from 'react'
import { Link } from 'react-router'
import { useIntro } from '../animations/useIntro'
import { mainNav } from '../app/navigation'
import { ButtonLink } from '../components/ui/Button'
import { Seo } from '../lib/seo'

export default function NotFoundPage() {
  const ref = useRef<HTMLElement>(null)
  useIntro(ref)

  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." path="/404" noindex />
      <section ref={ref} className="shell flex min-h-[70vh] flex-col justify-center py-20">
        <p className="eyebrow" data-intro>
          Error 404
        </p>
        <h1 className="mt-6 text-display" data-intro>
          <span className="line-mask">
            <span data-line className="block">
              This scene
            </span>
          </span>{' '}
          <span className="line-mask">
            <span data-line className="block text-muted">
              didn’t make the cut.
            </span>
          </span>
        </h1>
        <p className="mt-8 max-w-lg text-lead text-muted" data-intro>
          The page you’re looking for doesn’t exist or has moved. Try one of these instead:
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3" data-intro>
          {mainNav.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="link-underline font-semibold">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12" data-intro>
          <ButtonLink to="/">Back to home</ButtonLink>
        </div>
      </section>
    </>
  )
}
