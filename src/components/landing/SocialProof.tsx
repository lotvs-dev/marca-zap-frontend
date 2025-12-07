import { NumberTicker } from '@/components/ui/react-bits/number-ticker'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  {
    value: 500,
    suffix: '+',
    label: 'Profissionais usando',
  },
  {
    value: 12000,
    suffix: '+',
    label: 'Agendamentos processados',
  },
  {
    value: 67,
    suffix: '%',
    label: 'Redução de faltas',
  },
]

export function SocialProof() {
  return (
    <section className="py-16 px-4 bg-emerald-50 dark:bg-emerald-950/20 border-y border-emerald-500/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Números que falam por si
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Profissionais de todo Brasil já automatizam com MarcaZap
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                <NumberTicker value={stat.value} duration={2500} suffix={stat.suffix} />
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
