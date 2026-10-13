import { site } from '@/content/site'

/**
 * Parâmetros de campanha repassados ao checkout, para que a origem da venda
 * apareça no painel da Kiwify (utm_*, src e sck) e nas plataformas de anúncio.
 */
const PASSTHROUGH_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'src',
  'sck',
  'fbclid',
  'gclid',
] as const

export function buildCheckoutUrl(search?: string): string {
  const url = new URL(site.checkoutUrl)
  const query = search ?? (typeof window !== 'undefined' ? window.location.search : '')
  const params = new URLSearchParams(query)

  for (const key of PASSTHROUGH_KEYS) {
    const value = params.get(key)
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value)
  }

  return url.toString()
}
