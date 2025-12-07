import { Plug, Calendar, Zap } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

interface Step {
  number: number
  icon: React.ElementType
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: Plug,
    title: 'Conecta seu WhatsApp',
    description: 'Escaneie QR Code uma vez e pronto. Seu número fica conectado de forma segura.',
  },
  {
    number: 2,
    icon: Calendar,
    title: 'Define horários disponíveis',
    description: 'Configure dias da semana, horários e duração dos serviços. Simples e rápido.',
  },
  {
    number: 3,
    icon: Zap,
    title: 'Clientes agendam sozinhos',
    description: 'Compartilhe seu link. Clientes agendam direto no WhatsApp sem precisar de você.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Como funciona na prática
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Três passos simples para automatizar seus agendamentos completamente.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-emerald-500/30" />

          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} delay={index * 150} />
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <StepCardMobile key={step.number} step={step} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, delay }: { step: Step; delay: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const Icon = step.icon

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center text-center transition-all duration-700"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Number circle */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/30 mb-6">
        {step.number}
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
        {step.title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400">
        {step.description}
      </p>
    </div>
  )
}

function StepCardMobile({ step, delay }: { step: Step; delay: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const Icon = step.icon

  return (
    <div
      ref={ref}
      className="flex gap-4 transition-all duration-700"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateX(0)' : 'translateX(-32px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Left: Number circle */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/30">
          {step.number}
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 space-y-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {step.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          {step.description}
        </p>
      </div>
    </div>
  )
}
