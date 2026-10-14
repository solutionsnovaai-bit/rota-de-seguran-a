import type { OfferContent } from '@/types/content'

export const offer: OfferContent = {
  eyebrow: 'O que você leva',
  title: 'Tudo o que acompanha o seu guia',
  titleAccent: 'o seu guia',
  product: {
    icon: '📘',
    title: 'Você Sempre Valeu Muito — o guia completo',
    text: 'Os 5 passos, com as histórias reais, os gestos práticos e a carta de abertura da Sonia para Eliza.',
  },
  extrasLabel:
    'Material extra que acompanha — porque se valorizar é também saber se cuidar e se proteger:',
  extras: [
    {
      kind: 'guide',
      glyph: '⭐',
      title: 'Rota de Segurança',
      text: 'o guia prático de proteção da mulher, completo. Inclui o capítulo em que Sonia conta a história de Eliza.',
    },
    {
      kind: 'finance',
      title: 'Recomeço com Autonomia',
      text: 'os primeiros passos da independência financeira: conta própria, reserva e a primeira renda.',
    },
    {
      kind: 'phrases',
      title: 'Frases que Protegem',
      text: 'como falar com quem você ama e está em perigo: o que dizer, o que evitar, como ajudar sem afastar.',
    },
    {
      kind: 'map',
      title: 'Mapa da Rede de Apoio',
      text: 'para onde ligar e onde buscar ajuda, em um só lugar, com espaço pra anotar os contatos da sua cidade.',
    },
    {
      kind: 'updates',
      glyph: '★',
      title: 'Atualizações vitalícias',
      text: 'comprou uma vez, recebe todas as versões novas. Sem pagar de novo.',
    },
  ],
}
