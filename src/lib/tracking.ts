/**
 * Pixel da Meta opcional. Só carrega quando VITE_META_PIXEL_ID está definido;
 * sem ele, nenhum script externo entra na página.
 */
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim()

let initialized = false

export function initTracking(): void {
  if (!PIXEL_ID || initialized || typeof window === 'undefined') return
  initialized = true

  const queue: unknown[] = []
  const fbq = ((...args: unknown[]) => {
    const callable = fbq as unknown as { callMethod?: (...a: unknown[]) => void }
    if (callable.callMethod) callable.callMethod(...args)
    else queue.push(args)
  }) as NonNullable<Window['fbq']>

  fbq.queue = queue
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.push = fbq
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

export function trackCheckoutIntent(placement: string): void {
  if (!PIXEL_ID || typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'InitiateCheckout', {
    content_name: 'Você Sempre Valeu Muito',
    content_category: placement,
    value: 47,
    currency: 'BRL',
  })
}
