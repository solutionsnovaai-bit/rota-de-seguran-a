import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/easings'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: readonly AccordionItem[]
  defaultOpen?: number | null
  className?: string
}

export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const baseId = useId()

  return (
    <div className={cn('border-t border-navy-900/15', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.question} className="border-b border-navy-900/15">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left sm:py-8"
              >
                <span
                  className={cn(
                    'font-display text-lg font-bold leading-snug transition-colors duration-500 sm:text-2xl',
                    isOpen ? 'text-flame' : 'text-navy-900 group-hover:text-flame',
                  )}
                  style={{ fontStretch: '100%' }}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-expo',
                    isOpen
                      ? 'rotate-45 border-flame bg-flame text-paper'
                      : 'border-navy-900/20 text-navy-900 group-hover:border-flame group-hover:text-flame',
                  )}
                >
                  <Plus className="size-5" strokeWidth={2} />
                </span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.6, ease: ease.expo }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-8 pr-12 text-base leading-relaxed text-navy-900/75 sm:text-lg">{item.answer}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
