import type { BonusContent } from '@/types/content'

export const bonus: BonusContent = {
  title: 'Bônus',
  intro: 'Ao adquirir o seu e-book você recebe ainda, totalmente grátis:',
  dash: '–',
  priceLabels: {
    from: 'De',
    to: 'por',
    free: 'GRÁTIS',
  },
  items: [
    {
      kind: 'guide',
      title: 'Rota de Segurança',
      text: 'o guia prático para toda mulher em risco – e para quem não quer ficar com os braços cruzados.',
      from: 'R$ 47,00',
      learn: {
        intro: 'Nesse guia você aprenderá a:',
        items: [
          {
            title: 'Reconhecer o perigo',
            text: 'os 5 tipos de violência e os sinais que a gente aprende a ignorar.',
          },
          {
            title: 'Agir na hora certa',
            text: 'o que fazer agora, para quem ligar, e a medida protetiva explicada de um jeito simples e prático.',
          },
          {
            title: 'Documentar',
            text: 'que provas guardar e como fazer isso, sem se expor.',
          },
          {
            title: 'Criar seu plano de segurança',
            text: 'bolsa de segurança, rota de saída e segurança digital.',
          },
        ],
      },
    },
    {
      kind: 'finance',
      title: 'Recomeço com Autonomia',
      text: 'o guia prático com os primeiros passos da independência financeira: conta própria, primeira renda e reserva financeira.',
      from: 'R$ 29,00',
    },
    {
      kind: 'phrases',
      title: 'Frases que protegem',
      text: 'o código secreto que revela como falar com quem você ama e está em perigo: o que dizer, o que evitar, como ajudar sem ter que se afastar.',
      from: 'R$ 29,00',
    },
    {
      kind: 'map',
      title: 'Mapa da rede de apoio',
      text: 'o manual na palma da mão, que mostra para onde ligar e onde buscar ajuda, em um só lugar, com espaço para anotar os contatos de sua cidade.',
      from: 'R$ 29,00',
    },
    {
      kind: 'updates',
      title: 'Atualizações vitalícias',
      text: 'comprou uma vez recebe todas as versões novas, sem ter que pagar de novo!',
      from: 'R$ 29,00',
    },
  ],
}
