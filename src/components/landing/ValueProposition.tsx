import { CheckCircle2, Clock, Smartphone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useInView } from '@/hooks/useInView'

interface ValuePillar {
  icon: React.ElementType
  title: string
  description: string
  metric: string
}

const pillars: Array<ValuePillar> = [
  {
    icon: CheckCircle2,
    title: 'Simplesmente funciona',
    description: 'Seu cliente não baixa app. Não clica em link. Só manda mensagem. O sistema agenda. Confirma. Lembra. Tudo sozinho.',
    metric: 'Automático de verdade',
  },
  {
    icon: Clock,
    title: 'Menos faltas, mais receita',
    description: 'No Brasil, 3 em cada 10 pacientes faltam sem avisar. Nossos lembretes automáticos cortam isso pela metade.',
    metric: '40-70% menos no-shows',
  },
  {
    icon: Smartphone,
    title: 'WhatsApp. Só isso.',
    description: '97% dos brasileiros abrem o WhatsApp todo dia. É onde seu cliente está. É onde seu negócio deveria estar.',
    metric: '147 milhões de usuários',
  },
]

export function ValueProposition() {
  return (
    <section id="recursos" className="py-12 sm:py-16 md:py-20 px-4 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3 md:mb-4">
            Você trabalha. Nós agendamos.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Pare de responder a mesma pergunta 50 vezes por dia. Deixe a tecnologia fazer isso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <ValueCard key={pillar.title} pillar={pillar} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({ pillar, delay }: { pillar: ValuePillar; delay: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const Icon = pillar.icon

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <Card className="h-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
        <CardHeader>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-xl">{pillar.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {pillar.description}
          </CardDescription>
          <Badge className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm">
            {pillar.metric}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
