import { Newspaper } from 'lucide-react'
import { CountUp } from '@/components/motion/CountUp'
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger'
import { author } from '@/content/author'

/** Números da autora — contam do zero quando entram na tela. */
export function AuthorStats() {
  return (
    <StaggerGroup
      stagger={0.12}
      amount={0.4}
      className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 [gap:1px] sm:grid-cols-3"
    >
      {author.stats.map((stat) => (
        <StaggerItem key={stat.label} className="flex flex-col justify-between gap-4 bg-navy-950 p-6 sm:p-7">
          {stat.value !== undefined ? (
            <p className="whitespace-nowrap font-display text-[2.75rem] font-black leading-none tracking-[-0.03em] text-paper sm:text-[3rem]">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                suffixClassName="text-[0.62em] text-flame"
              />
            </p>
          ) : (
            <span className="grid size-[3.1rem] place-items-center rounded-full bg-flame/15 text-flame">
              <Newspaper className="size-6" strokeWidth={1.8} />
            </span>
          )}
          <p className="text-[0.95rem] leading-snug text-paper/65">{stat.label}</p>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
