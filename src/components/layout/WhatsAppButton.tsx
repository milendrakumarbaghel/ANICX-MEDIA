import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { whatsappHref } from '../../data/siteConfig'
import { WhatsAppIcon } from '../ui/BrandIcons'

const FORM_FIELDS = 'input, textarea, select'

/**
 * Floating WhatsApp shortcut. Renders nothing until a real business number is
 * set in siteConfig.contact.whatsapp. Hidden on the contact page (which links
 * WhatsApp inline) and while a form field has focus, so it never covers inputs.
 */
export function WhatsAppButton() {
  const href = whatsappHref()
  const { pathname } = useLocation()
  const [formFocused, setFormFocused] = useState(false)

  useEffect(() => {
    if (!href) return
    const onFocusIn = (event: FocusEvent) => setFormFocused((event.target as Element).matches?.(FORM_FIELDS) ?? false)
    const onFocusOut = () => setFormFocused(false)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [href])

  if (!href) return null
  const visible = pathname !== '/contact' && !formFocused

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          key="whatsapp"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f7a4d] text-paper shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5 sm:right-8"
          aria-label="Chat with ANICX MEDIA on WhatsApp (opens in a new tab)"
        >
          <WhatsAppIcon size={26} />
        </m.a>
      )}
    </AnimatePresence>
  )
}
