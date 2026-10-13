import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollWords } from '@/components/motion/ScrollWords'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { recognition } from '@/content/recognition'
import { sectionIds } from '@/content/site'
import { ease } from '@/lib/easings'
import { SignsCard } from './SignsCard'

export function Recognition() {
  return (
    <Section id={sectionIds.recognition} tone="paper" overlap>
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>{recognition.eyebrow}</Eyebrow>

            <div className="mt-10 space-y-8 text-[clamp(1.45rem,2.5vw,2.15rem)] font-medium leading-[1.28] tracking-[-0.022em] text-navy-900 sm:mt-12">
              {recognition.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <ScrollWords text={paragraph} dim={0.14} />
                </p>
              ))}
            </div>

            <Reveal className="mt-12">
              <p className="relative pl-7 text-xl font-bold leading-snug tracking-[-0.015em] text-navy-900 sm:text-2xl">
                <motion.span
                  aria-hidden
                  className="absolute bottom-1 left-0 top-1 w-[3px] origin-top rounded-full bg-flame"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1.2, ease: ease.expo, delay: 0.2 }}
                />
                {recognition.emphasis}
              </p>
            </Reveal>
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
          <p className="text-balance font-serif text-[clamp(2.1rem,4.8vw,4.4rem)] italic leading-[1.06] tracking-[-0.01em] text-navy-900">
            <ScrollWords text={recognition.closing} dim={0.12} offset={['start 0.9', 'end 0.6']} />
          </p>
        </figure>
      </Container>
    </Section>
  )
}
