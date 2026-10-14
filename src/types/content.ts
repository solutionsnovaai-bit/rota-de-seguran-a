/** Item com destaque em negrito seguido de travessão e complemento. */
export interface InlineItem {
  title: string
  text: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  titleLines: readonly [string, string]
  /** Palavra da segunda linha destacada em laranja, como na capa. */
  titleAccent: string
  subtitle: string
  support: string
  cta: string
  /** Linha fina abaixo do botão, separada por pontos. */
  fineLine: readonly string[]
}

export interface RecognitionContent {
  eyebrow: string
  paragraphs: readonly string[]
  card: {
    title: string
    signs: readonly string[]
  }
  closing: string
  /** Quantas palavras iniciais do fechamento ficam em laranja. */
  closingAccentWords: number
}

export interface AuthorContent {
  eyebrow: string
  title: string
  titleAccent: string
  paragraphs: readonly string[]
}

export interface MethodContent {
  eyebrow: string
  title: string
  titleAccent: string
  intro: string
  items: readonly InlineItem[]
}

export interface StoryItem {
  name: string
  text: string
}

export interface StoriesContent {
  eyebrow: string
  title: string
  titleAccent: string
  intro: string
  items: readonly StoryItem[]
  outro: string
}

export interface PracticeContent {
  eyebrow: string
  title: string
  titleAccent: string
  items: readonly InlineItem[]
}

export interface BonusItem extends InlineItem {
  kind: 'guide' | 'finance' | 'phrases' | 'map' | 'updates'
  /** Valor cheio riscado ("R$ 47,00"). */
  from: string
  /** Lista "Nesse guia você aprenderá a:" (só no bônus principal). */
  learn?: {
    intro: string
    items: readonly InlineItem[]
  }
}

export interface BonusContent {
  title: string
  intro: string
  /** Separador entre o nome do bônus e a descrição, como veio na copy. */
  dash: string
  priceLabels: {
    from: string
    to: string
    free: string
  }
  items: readonly BonusItem[]
}

export interface OfferContent {
  eyebrow: string
  title: string
  titleAccent: string
  product: {
    icon: string
    title: string
    text: string
  }
}

export interface PricingContent {
  from: string
  price: string
  fromValue: number
  priceValue: number
  note: string
  cta: string
  secure: string
}

export interface GuaranteeContent {
  seal: string
  sealValue: number
  sealUnit: string
  title: string
  text: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqContent {
  eyebrow: string
  items: readonly FaqItem[]
}

export interface ClosingContent {
  title: string
  titleAccent: string
  text: string
  quote: string
  author: string
  cta: string
}

export type FooterSegment = { type: 'text'; value: string } | { type: 'tel'; value: string }

export interface FooterContent {
  disclaimer: readonly FooterSegment[]
}
