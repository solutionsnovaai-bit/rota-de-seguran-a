import { useMemo } from 'react'
import { buildCheckoutUrl } from '@/lib/checkout'

/** Link do checkout com os parâmetros de campanha da visita atual. */
export function useCheckoutHref(): string {
  return useMemo(() => buildCheckoutUrl(), [])
}
