import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { whatsappHref } from '../../data/siteConfig'
import { WhatsAppIcon } from '../ui/BrandIcons'

const FORM_FIELDS = 'input, textarea, select'

/**
 * Floating WhatsApp shortcut on all public pages.
 *
 * Requirements:
 * - Base destination: https://wa.me/918770338294 with encoded text query
 * - Accessible label: "Chat with ANICX Media on WhatsApp"
 * - Does not overlap mobile navigation, consent controls, forms, or footer content.
 */
export function WhatsAppButton() {
  const href = whatsappHref()
  const { pathname } = useLocation()
  const [formFocused, setFormFocused] = useState(false)

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => setFormFocused((event.target as Element).matches?.(FORM_FIELDS) ?? false)
    const onFocusOut = () => setFormFocused(false)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  // Hidden on contact page (which has prominent inline buttons) and when a form field is actively focused on mobile
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
          aria-label="Chat with ANICX Media on WhatsApp"
        >
          <WhatsAppIcon size={26} />
        </m.a>
      )}
    </AnimatePresence>
  )
}
