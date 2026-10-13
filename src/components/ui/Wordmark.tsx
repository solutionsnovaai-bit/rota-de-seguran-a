import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import { RouteMark } from './RouteMark'

interface WordmarkProps {
  className?: string
  markClassName?: string
}

export function Wordmark({ className, markClassName }: WordmarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <RouteMark className={cn('size-8', markClassName)} />
      <span className="font-display text-[0.8rem] font-black uppercase tracking-[0.14em]" style={{ fontStretch: '115%' }}>
        {site.name}
      </span>
    </span>
  )
}
