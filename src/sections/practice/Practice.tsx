import { Footprints, Quote, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger'
import { TiltStage } from '@/components/motion/TiltStage'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { practice } from '@/content/practice'
import { sectionIds } from '@/content/site'
import { cn } from '@/lib/cn'

const ICONS: LucideIcon[] = [Footprints, Quote]

export function Practice() {
  return (
    <Section id={sectionIds.practice} tone="paper" overlap>
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{practice.eyebrow}</Eyebrow>
          <Reveal>
            <Heading text={practice.title} accent={practice.titleAccent} className="mt-6 text-navy-900" />
          </Reveal>
        </div>

        <StaggerGroup stagger={0.14} amount={0.2} className="mt-14 grid gap-5 sm:mt-20 lg:grid-cols-2 lg:gap-6">
          {practice.items.map((item, index) => {
            const Icon = ICONS[index] ?? Footprints
            const dark = index === 1
            return (
              <StaggerItem key={item.title}>
                <TiltStage max={5} className="h-full">
                  <article
                    className={cn(
                      'relative isolate flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2.25rem] p-8 shadow-soft sm:min-h-[26rem] sm:p-12',
                      dark ? 'bg-navy-900 text-paper' : 'border border-navy-900/[0.07] bg-white text-navy-900',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute -right-20 -top-20 -z-10 size-72 rounded-full',
                        dark
                          ? 'bg-[radial-gradient(circle,rgba(250,61,12,0.35),transparent_65%)]'
                          : 'bg-[radial-gradient(circle,rgba(250,61,12,0.14),transparent_65%)]',
                      )}
                    />
                    <div className="flex items-start justify-between gap-6">
                      <span className="grid size-16 place-items-center rounded-2xl bg-flame text-paper shadow-flame">
                        <Icon aria-hidden className="size-7" strokeWidth={1.8} />
                      </span>
                      <span
                        aria-hidden
                        // text-outline-thin fica fora do cn(): o tailwind-merge o confundiria com cor de texto.
                        className={`text-outline-thin ${cn('font-display text-[5rem] font-black leading-none', dark ? 'text-paper/40' : 'text-navy-900/30')}`}
                        style={{ fontStretch: '86%' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <p className={cn('text-pretty mt-12 text-lg leading-relaxed sm:text-xl', dark ? 'text-paper/75' : 'text-navy-900/70')}>
                      <strong
                        className={cn(
                          'mb-3 block font-display text-[2rem] font-extrabold leading-[1.02] tracking-[-0.025em] sm:text-[2.6rem]',
                          dark ? 'text-paper' : 'text-navy-900',
                        )}
                        style={{ fontStretch: '96%' }}
                      >
                        {item.title}
                      </strong>{' '}
                      <span className="text-flame">—</span> {item.text}
                    </p>
                  </article>
                </TiltStage>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
