import type { RecognitionContent } from '@/types/content'

export const recognition: RecognitionContent = {
  eyebrow: 'Talvez você se reconheça aqui',
  paragraphs: [
    'Em algum momento, sem perceber, você foi ficando em último lugar. Começou a se encolher pra não incomodar, a engolir o que pensa, a aceitar menos do que merece — e a achar que era assim mesmo.',
    'Você até cuida de todo mundo. Mas quando foi a última vez que alguém cuidou de você? Quando foi a última vez que você cuidou de você?',
  ],
  card: {
    title: 'Você se reconhece?',
    signs: [
      'Você esqueceu do que gosta, do que sonhava, de quem você era.',
      'Pede desculpa até quando a culpa não é sua.',
      'Acha que precisa merecer pra ser amada.',
      'Se diminui antes que alguém diminua.',
      'Olha no espelho e sente que se perdeu de si mesma em algum lugar do caminho.',
    ],
  },
  closing:
    'A boa notícia: a mulher de valor que você procura não foi embora. Ela só foi sendo encoberta. E dá pra tirar essa poeira.',
  closingAccentWords: 3,
}
