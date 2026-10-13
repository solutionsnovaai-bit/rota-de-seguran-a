/** Item com destaque em negrito seguido de travessão e complemento. */
export interface InlineItem {
  title: string
  text: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  titleLines: readonly [string, string]
  subtitle: string
  support: string
  cta: string
}

export interface StoryParagraph {
  text: string
  /** Frase curta de virada, exibida maior e em itálico. */
  pivot?: boolean
}

export interface RecognitionContent {
  eyebrow: string
  title: string
  /** Trecho do título destacado em laranja. */
  titleAccent: string
  paragraphs: readonly StoryParagraph[]
  emphasis: string
  card: {
    title: string
    signs: readonly string[]
  }
  closing: string
}

export interface AuthorStat {
  /** Parte numérica animada (ex.: 124). Ausente quando o destaque é só texto. */
  value?: number
  decimals?: number
  suffix?: string
  label: string
}

export interface AuthorContent {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
  stats: readonly AuthorStat[]
}

export interface ContentsContent {
  eyebrow: string
  title: string
  items: readonly InlineItem[]
}

export interface OfferContent {
  eyebrow: string
  title: string
  intro: string
  product: {
    icon: string
    title: string
    text: string
  }
  extrasLabel: string
  extras: readonly InlineItem[]
  lifetime: InlineItem & { icon: string }
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
  title: string
  items: readonly FaqItem[]
}

export interface ClosingContent {
  quote: string
  author: string
  cta: string
}

export type FooterSegment = { type: 'text'; value: string } | { type: 'tel'; value: string }

export interface FooterContent {
  brand: string
  byline: string
  disclaimer: readonly FooterSegment[]
}
