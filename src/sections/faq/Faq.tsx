import { Reveal } from '@/components/motion/Reveal'
import { Accordion } from '@/components/ui/Accordion'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { faq } from '@/content/faq'
import { sectionIds } from '@/content/site'

export function Faq() {
  return (
    <Section id={sectionIds.faq} tone="paper" className="pt-12 sm:pt-16 lg:pt-20">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <Reveal>
              <Heading text={faq.title} accent="decidir" className="mt-6 text-navy-900" />
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-8" amount={0.15}>
          <Accordion items={faq.items} defaultOpen={0} />
        </Reveal>
      </Container>
    </Section>
  )
}
