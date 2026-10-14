import type { LucideIcon } from 'lucide-react'
import { StaggerItem } from '@/components/motion/Stagger'
import { cn } from '@/lib/cn'
import type { OfferExtra } from '@/types/content'

interface BonusItemProps {
  item: OfferExtra
  icon: LucideIcon
  highlight?: boolean
  /** Capa exibida ao lado do texto (bônus principal). */
  image?: { src: string; alt: string }
  className?: string
}

export function BonusItem({ item, icon: Icon, highlight = false, image, className }: BonusItemProps) {
  return (
    <StaggerItem
      as="li"
      className={cn(
        'group relative isolate flex gap-5 overflow-hidden rounded-[1.6rem] border p-6 transition-colors duration-500 sm:p-7',
        image ? 'flex-col sm:flex-row sm:items-center sm:gap-7' : 'flex-col',
        highlight
          ? 'border-flame/50 bg-gradient-to-br from-flame/[0.16] to-transparent'
          : 'border-white/10 bg-white/[0.035] hover:border-flame/40',
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -right-16 -top-16 -z-10 size-40 rounded-full bg-flame/0 blur-2xl transition-colors duration-700 group-hover:bg-flame/25"
      />

      {image ? (
        <span className="relative w-24 shrink-0 [perspective:800px] sm:w-28">
          <img
            src={image.src}
            alt={image.alt}
            width={560}
            height={816}
            loading="lazy"
            decoding="async"
            className="w-full -rotate-3 rounded-[4px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-expo group-hover:-rotate-6 group-hover:scale-105"
          />
        </span>
      ) : (
        <span
          aria-hidden
          className={cn(
            'grid size-12 place-items-center rounded-2xl transition-transform duration-700 ease-expo group-hover:-rotate-6 group-hover:scale-110',
            highlight ? 'bg-flame text-paper' : 'bg-flame/15 text-flame',
          )}
        >
          <Icon className="size-6" strokeWidth={1.8} />
        </span>
      )}

      <p className={cn('text-pretty leading-relaxed text-paper/70', image && 'sm:text-lg')}>
        {item.glyph ? <span className="text-flame">{item.glyph} </span> : null}
        <strong
          className={cn('font-display font-extrabold text-paper', image ? 'text-xl sm:text-2xl' : 'text-lg')}
          style={{ fontStretch: '98%' }}
        >
          {item.title}
        </strong>{' '}
        — {item.text}
      </p>
    </StaggerItem>
  )
}
