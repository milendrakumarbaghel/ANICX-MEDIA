import { useRef, useState } from 'react'
import { HONEYPOT_FIELD, submitNetlifyForm, toFormValues } from '../../lib/forms'

export type SubmitStatus = 'idle' | 'success' | 'error'

/**
 * Shared submit logic for the enquiry forms: honeypot check, URL-encoded
 * Netlify submission, and success / failure state.
 */
export function useNetlifySubmit(formName: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const honeypotRef = useRef<HTMLInputElement>(null)

  const submit = async (values: Record<string, unknown>): Promise<boolean> => {
    setStatus('idle')
    // Bots fill hidden fields. Pretend it worked and send nothing.
    if (honeypotRef.current?.value) {
      setStatus('success')
      return true
    }
    try {
      await submitNetlifyForm(formName, { ...toFormValues(values), [HONEYPOT_FIELD]: '' })
      setStatus('success')
      return true
    } catch (error) {
      console.error(error)
      setStatus('error')
      return false
    }
  }

  return { status, setStatus, submit, honeypotRef }
}
