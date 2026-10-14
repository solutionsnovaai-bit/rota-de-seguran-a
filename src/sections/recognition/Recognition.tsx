import { ScrollWords } from '@/components/motion/ScrollWords'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { recognition } from '@/content/recognition'
import { sectionIds } from '@/content/site'
import { SignsCard } from './SignsCard'

export function Recognition() {
  return (
    <Section id={sectionIds.recognition} tone="paper" overlap>
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>{recognition.eyebrow}</Eyebrow>

            <div className="mt-10 space-y-8 text-[clamp(1.45rem,2.5vw,2.15rem)] font-medium leading-[1.28] tracking-[-0.022em] text-navy-900 sm:mt-12">
              {recognition.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <ScrollWords text={paragraph} dim={0.14} />
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <Reveal amount={0.15}>
                <SignsCard />
              </Reveal>
            </div>
          </div>
        </div>

        <figure className="mx-auto mt-24 max-w-5xl text-center sm:mt-32 lg:mt-40">
          <span aria-hidden className="mx-auto mb-10 block h-16 w-px bg-gradient-to-b from-transparent to-flame" />
          <p
            className="text-balance font-display text-[clamp(1.9rem,4.3vw,3.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-navy-900"
            style={{ fontStretch: '98%' }}
          >
            <ScrollWords
              text={recognition.closing}
              accentWords={recognition.closingAccentWords}
              dim={0.12}
              offset={['start 0.9', 'end 0.6']}
            />
          </p>
        </figure>
      </Container>
    </Section>
  )
}
