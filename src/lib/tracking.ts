/**
 * Pixel da Meta. O código oficial do pixel fica no <head> do index.html
 * (init + PageView). Aqui só entram os eventos da página — e, como reserva,
 * a carga do pixel por VITE_META_PIXEL_ID caso o código do <head> seja removido.
 */
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim()

let initialized = false

export function initTracking(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  // Pixel já carregado pelo <head>: não inicia de novo nem repete o PageView.
  if (window.fbq || !PIXEL_ID) return

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
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'InitiateCheckout', {
    content_name: 'Você Sempre Valeu Muito',
    content_category: placement,
    value: 47,
    currency: 'BRL',
  })
}
