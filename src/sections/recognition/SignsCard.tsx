import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger'
import { recognition } from '@/content/recognition'

/** Cartão "Você se reconhece em alguma destas?" — os sinais entram um a um. */
export function SignsCard() {
  const { card } = recognition

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 p-7 text-paper shadow-card sm:rounded-[2.5rem] sm:p-10">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(250,61,12,0.35),transparent_65%)]"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-flame/60 to-transparent" />

      <p className="text-balance font-serif text-[2rem] italic leading-[1.05] sm:text-[2.6rem]">{card.title}</p>

      <StaggerGroup as="ul" stagger={0.12} delay={0.2} amount={0.25} className="mt-8 border-t border-white/10">
        {card.signs.map((sign, index) => (
          <StaggerItem
            as="li"
            key={sign}
            className="group flex items-start gap-4 border-b border-white/10 py-4 transition-colors duration-500 last:border-b-0 hover:text-paper sm:py-5"
          >
            <span aria-hidden className="relative mt-[0.55em] grid size-2.5 shrink-0 place-items-center">
              <span
                className="absolute inset-0 animate-pulse-ring rounded-full bg-flame"
                style={{ animationDelay: `${index * 0.35}s` }}
              />
              <span className="relative size-2.5 rounded-full bg-flame" />
            </span>
            <span className="text-base leading-relaxed text-paper/85 transition-colors duration-500 group-hover:text-paper sm:text-lg">
              {sign}
            </span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  )
}
