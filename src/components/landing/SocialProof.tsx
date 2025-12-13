import { NumberTicker } from '@/components/ui/react-bits/number-ticker'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  {
    value: 147,
    suffix: ' milhões',
    label: 'de brasileiros no WhatsApp',
  },
  {
    value: 97,
    suffix: '%',
    label: 'abrem o app todo dia',
  },
  {
    value: 68,
    suffix: '%',
    label: 'preferem notificações via WhatsApp',
  },
]

export function SocialProof() {
  return (
    <section className="py-16 px-4 bg-emerald-50 dark:bg-emerald-950/20 border-y border-emerald-500/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            O Brasil já decidiu
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            WhatsApp não é o futuro. É o presente. Dados reais de 2025.
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
