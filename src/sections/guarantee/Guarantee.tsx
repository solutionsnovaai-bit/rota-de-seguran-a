import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { guarantee } from '@/content/guarantee'
import { sectionIds } from '@/content/site'
import { GuaranteeSeal } from './GuaranteeSeal'

export function Guarantee() {
  return (
    <Section id={sectionIds.guarantee} tone="paper" overlap className="pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <Reveal amount={0.2}>
          <div className="grid items-center gap-12 rounded-[2.5rem] border border-navy-900/[0.07] bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16">
            <div className="flex justify-center lg:col-span-4">
              <GuaranteeSeal />
            </div>
            <div className="text-center lg:col-span-8 lg:text-left">
              <Heading text={guarantee.title} accent="7 dias" size="md" className="text-navy-900" />
              <p className="text-pretty mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-900/70 sm:text-xl lg:mx-0">
                {guarantee.text}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
