import { motion, type Variants } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { InlineItem } from '@/types/content'
import { ease } from '@/lib/easings'

interface RouteStopProps {
  item: InlineItem
  icon: LucideIcon
}

const pin: Variants = {
  idle: { backgroundColor: '#F3F6FC', color: '#0B1F42', borderColor: 'rgba(11,31,66,0.16)', scale: 0.92 },
  active: {
    backgroundColor: '#FA3D0C',
    color: '#F3F6FC',
    borderColor: '#FA3D0C',
    scale: 1,
    transition: { duration: 0.7, ease: ease.expo },
  },
}

const card: Variants = {
  idle: { opacity: 0.35, x: 18, filter: 'blur(4px)' },
  active: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: ease.expo } },
}

/** Uma parada da rota: o pino acende e o conteúdo entra quando a leitura chega nele. */
export function RouteStop({ item, icon: Icon }: RouteStopProps) {
  return (
    <motion.li
      className="relative flex gap-5 sm:gap-7"
      initial="idle"
      whileInView="active"
      viewport={{ once: true, amount: 0.7 }}
    >
      <motion.span
        variants={pin}
        className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 shadow-[0_0_0_8px_#F3F6FC] sm:size-16"
      >
        <Icon className="size-6 sm:size-7" strokeWidth={1.8} />
      </motion.span>

      <motion.div
        variants={card}
        className="flex-1 rounded-[1.5rem] border border-navy-900/[0.06] bg-white p-6 shadow-soft sm:rounded-[1.75rem] sm:p-8"
      >
        <p className="text-pretty text-[1.05rem] leading-relaxed text-navy-900/70 sm:text-lg">
          <strong
            className="font-display text-[1.3rem] font-extrabold tracking-[-0.015em] text-navy-900 sm:text-2xl"
            style={{ fontStretch: '96%' }}
          >
            {item.title}
          </strong>{' '}
          <span className="text-flame">—</span> {item.text}
        </p>
      </motion.div>
    </motion.li>
  )
}
