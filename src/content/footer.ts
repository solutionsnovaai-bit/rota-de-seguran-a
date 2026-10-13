import type { FooterContent } from '@/types/content'

export const footer: FooterContent = {
  brand: 'Rota de Segurança',
  byline: ' · por Sonia Samudio',
  disclaimer: [
    { type: 'text', value: 'Este material é informativo e de apoio. Em emergência, ligue ' },
    { type: 'tel', value: '190' },
    { type: 'text', value: '. Orientação 24h: Ligue ' },
    { type: 'tel', value: '180' },
    { type: 'text', value: '.' },
  ],
}
