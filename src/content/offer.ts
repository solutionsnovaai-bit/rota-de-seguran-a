import type { OfferContent } from '@/types/content'

export const offer: OfferContent = {
  eyebrow: 'O que você leva',
  title: 'O Kit de Proteção completo',
  intro:
    'Não é só um e-book. É tudo o que você precisa para se proteger — e para proteger quem você ama — reunido num só lugar.',
  product: {
    icon: '📘',
    title: 'Rota de Segurança — o guia completo',
    text: 'O passo a passo, do primeiro sinal à medida protetiva e ao plano de segurança. Inclui o capítulo em que Sonia conta a história de Eliza.',
  },
  extrasLabel: 'Material extra que acompanha o guia:',
  extras: [
    {
      title: 'Recomeço com Autonomia',
      text: 'Os primeiros passos da independência financeira: conta própria, reserva de partida e a primeira renda — para recomeçar com liberdade.',
    },
    {
      title: 'Frases que Protegem',
      text: 'Como falar com quem você ama e está em perigo: o que dizer, o que evitar e como ajudar sem afastar.',
    },
    {
      title: 'Mapa da Rede de Apoio',
      text: 'Para onde ligar e onde buscar ajuda, em um só lugar — com um espaço para você anotar os contatos da sua cidade.',
    },
  ],
  lifetime: {
    icon: '★',
    title: 'Atualizações vitalícias',
    text: 'Comprou uma vez, recebe todas as versões atualizadas do guia. Sem pagar de novo.',
  },
}
