import type { LucideIcon } from 'lucide-react'
import { StaggerItem } from '@/components/motion/Stagger'
import { cn } from '@/lib/cn'
import type { InlineItem } from '@/types/content'

interface BonusItemProps {
  item: InlineItem
  icon: LucideIcon
  /** Símbolo que faz parte do texto (ex.: ★), exibido antes do título. */
  glyph?: string
  highlight?: boolean
}

export function BonusItem({ item, icon: Icon, glyph, highlight = false }: BonusItemProps) {
  return (
    <StaggerItem
      as="li"
      className={cn(
        'group relative isolate flex flex-col gap-5 overflow-hidden rounded-[1.6rem] border p-6 transition-colors duration-500 sm:p-7',
        highlight
          ? 'border-flame/50 bg-gradient-to-br from-flame/[0.16] to-transparent'
          : 'border-white/10 bg-white/[0.035] hover:border-flame/40',
      )}
    >
      <span
        aria-hidden
        className="absolute -right-16 -top-16 -z-10 size-40 rounded-full bg-flame/0 blur-2xl transition-colors duration-700 group-hover:bg-flame/25"
      />
      <span
        aria-hidden
        className={cn(
          'grid size-12 place-items-center rounded-2xl transition-transform duration-700 ease-expo group-hover:-rotate-6 group-hover:scale-110',
          highlight ? 'bg-flame text-paper' : 'bg-flame/15 text-flame',
        )}
      >
        <Icon className="size-6" strokeWidth={1.8} />
      </span>
      <p className="text-pretty leading-relaxed text-paper/70">
        {glyph ? <span className="text-flame">{glyph} </span> : null}
        <strong className="font-display text-lg font-extrabold text-paper" style={{ fontStretch: '98%' }}>
          {item.title}
        </strong>{' '}
        — {item.text}
      </p>
    </StaggerItem>
  )
}
