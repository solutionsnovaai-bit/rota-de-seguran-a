import type { FooterContent } from '@/types/content'

export const footer: FooterContent = {
  disclaimer: [
    { type: 'text', value: 'Se você ou alguém que você ama está em perigo, ligue ' },
    { type: 'tel', value: '180' },
    { type: 'text', value: ' (orientação, 24h) ou ' },
    { type: 'tel', value: '190' },
    { type: 'text', value: ' (emergência). Buscar ajuda não depende de comprar nada.' },
  ],
}
