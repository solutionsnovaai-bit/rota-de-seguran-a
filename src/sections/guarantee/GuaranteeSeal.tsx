import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { CountUp } from '@/components/motion/CountUp'
import { guarantee } from '@/content/guarantee'
import { ease } from '@/lib/easings'

/** Selo de garantia: anel girando, traço se fechando e o número contando. */
export function GuaranteeSeal() {
  return (
    <div className="relative size-[15rem] sm:size-[17rem]">
      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow text-navy-900/25">
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2
          return (
            <circle
              key={index}
              cx={100 + Math.cos(angle) * 96}
              cy={100 + Math.sin(angle) * 96}
              r={index % 3 === 0 ? 2.6 : 1.4}
              fill={index % 3 === 0 ? '#FA3D0C' : 'currentColor'}
            />
          )
        })}
      </svg>

      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
        <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(11,31,66,0.08)" strokeWidth="3" />
        <motion.circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="#FA3D0C"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 2, ease: ease.inOut, delay: 0.2 }}
        />
      </svg>

      <motion.div
        className="absolute inset-[2.4rem] grid place-items-center rounded-full bg-navy-900 text-paper shadow-card sm:inset-[2.75rem]"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: ease.expo }}
      >
        <div className="text-center">
          <ShieldCheck aria-hidden className="mx-auto size-6 text-flame" strokeWidth={2} />
          <p className="mt-1 font-display text-[4.2rem] font-black leading-[0.9] tracking-[-0.04em] sm:text-[4.8rem]">
            <CountUp value={guarantee.sealValue} duration={1.6} />
          </p>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-paper/70">{guarantee.sealUnit}</p>
        </div>
      </motion.div>
    </div>
  )
}
