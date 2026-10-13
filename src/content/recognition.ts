import type { RecognitionContent } from '@/types/content'

export const recognition: RecognitionContent = {
  eyebrow: 'Talvez você se reconheça aqui',
  title: 'A dor que ninguém vê',
  titleAccent: 'ninguém vê',
  paragraphs: [
    {
      text: 'Tem dia que o único lugar onde você consegue chorar é no banho, com o chuveiro ligado pra abafar o som. Você já aprendeu a “adivinhar” o humor dele pelo jeito que a chave gira na porta.',
    },
    {
      text: 'Mede cada palavra antes de falar. Pondera cada roupa que vai usar. Qual será a reação dele? E, quando tem vontade de rir, ainda pensa duas vezes: será que eu tô dando motivo pra alguma coisa?',
    },
    {
      text: 'E o pior muitas vezes vem de perto: quando você ouve de amigos, ou até da própria família, que é “tudo exagero da sua cabeça”.',
    },
    {
      text: 'Não é. E, lá no fundo, você sempre soube que não era.',
      pivot: true,
    },
    {
      text: 'Ou talvez quem chora escondido seja você, vendo a sua filha, a sua irmã, a sua amiga se apagar aos poucos. Os sinais ali, na sua frente. E aquele nó de não saber como chegar nela sem empurrá-la mais pra longe.',
    },
  ],
  emphasis:
    'Para essas duas dores, eu criei este guia. Porque ninguém deveria descobrir isso sozinha. E eu, mais do que ninguém, sei que proteger uma mulher quase nunca é trabalho de uma pessoa só.',
  card: {
    title: 'Você se reconhece em alguma destas?',
    signs: [
      'Ele exige ver seu celular, suas mensagens, suas senhas.',
      'Precisa saber onde você está o tempo todo.',
      'Afastou você, aos poucos, das suas amizades.',
      'A “brincadeira” que te humilha na frente dos outros.',
      'Você pisa em ovos pra não criar problema.',
      'Você já duvidou da sua própria memória.',
    ],
  },
  closing:
    'A violência quase nunca começa com um tapa. Começa assim — e reconhecer é o primeiro passo pra se proteger.',
}
