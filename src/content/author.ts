import type { AuthorContent } from '@/types/content'

export const author: AuthorContent = {
  eyebrow: 'Quem escreveu',
  title: 'Da dor mais dura, um guia que salva',
  paragraphs: [
    'Eu sou Sonia Samudio, mãe da Eliza. Em 2010, eu perdi a minha filha — e não por falta de amor, mas porque, quando o perigo apareceu, faltou o que fazer. Faltou a informação certa, na hora certa, nas mãos certas.',
    'Hoje eu transformo essa dor em missão. O Rota de Segurança é, antes de tudo, o guia que eu queria que a minha filha tivesse tido nas mãos.',
  ],
  stats: [
    { value: 124, decimals: 0, suffix: ' mil', label: 'pessoas acompanham' },
    { value: 8.5, decimals: 1, suffix: ' mi', label: 'de views em 30 dias' },
    { label: 'voz reconhecida da causa na imprensa' },
  ],
}
