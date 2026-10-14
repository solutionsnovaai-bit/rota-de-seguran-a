import type { BonusContent } from '@/types/content'

/**
 * Bônus: o guia Rota de Segurança. Os textos são os da página original do
 * guia, sem alteração.
 */
export const bonus: BonusContent = {
  badge: 'Bônus',
  title: 'Rota de Segurança',
  titleLines: ['Rota de', 'Segurança'],
  subtitle: 'O guia prático para toda mulher em risco — e para quem não quer ficar de braços cruzados.',
  support:
    'Do primeiro sinal à medida protetiva e ao plano de segurança: o passo a passo que falta na hora que mais importa.',
  contentsEyebrow: 'O que você vai ter em mãos',
  contentsTitle: 'Do primeiro sinal à proteção real',
  items: [
    {
      title: 'Reconhecer o perigo',
      text: 'os cinco tipos de violência e os sinais que a gente aprende a ignorar.',
    },
    {
      title: 'Agir na hora certa',
      text: 'o que fazer agora, para quem ligar, e a medida protetiva explicada de um jeito simples.',
    },
    {
      title: 'Documentar',
      text: 'que provas guardar e como, sem se expor.',
    },
    {
      title: 'Seu plano de segurança',
      text: 'bolsa de emergência, rota de saída, código e segurança digital.',
    },
    {
      title: 'A rede de apoio',
      text: 'quem acionar quando você não dá conta sozinha.',
    },
    {
      title: 'Recomeçar',
      text: 'os primeiros passos depois que o perigo passa.',
    },
  ],
}
