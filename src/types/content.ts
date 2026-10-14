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
  caption: string
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

export interface OfferExtra extends InlineItem {
  /** Símbolo que faz parte do texto (ex.: ⭐, ★), exibido antes do título. */
  glyph?: string
  kind: 'guide' | 'finance' | 'phrases' | 'map' | 'updates'
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
  extrasLabel: string
  extras: readonly OfferExtra[]
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
