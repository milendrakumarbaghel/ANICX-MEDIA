import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function ProjectsRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/portfolio', { replace: true })
  }, [navigate])

  return (
    <div className="shell flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-lead text-muted">Redirecting to Our Work…</p>
      <meta httpEquiv="refresh" content="0;url=/portfolio" />
      <p className="mt-4 text-sm">
        <a href="/portfolio" className="font-semibold text-ink underline">
          Click here if not redirected automatically
        </a>
      </p>
    </div>
  )
}
