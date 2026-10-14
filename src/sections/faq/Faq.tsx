import { Reveal } from '@/components/motion/Reveal'
import { Accordion } from '@/components/ui/Accordion'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { faq } from '@/content/faq'
import { sectionIds } from '@/content/site'

export function Faq() {
  return (
    <Section id={sectionIds.faq} tone="paper" className="pt-12 sm:pt-16 lg:pt-20">
      <Container className="max-w-4xl">
        <div className="text-center">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
        </div>
        <Reveal className="mt-10 sm:mt-12" amount={0.15}>
          <Accordion items={faq.items} defaultOpen={0} />
        </Reveal>
      </Container>
    </Section>
  )
}
