import { useInView } from '@/hooks/useInView'

interface Step {
  number: number
  title: string
  description: string
  image: string
}

const steps: Step[] = [
  {
    number: 1,
    title: '2 minutos de configuração',
    description: 'Conecta WhatsApp. Define horários. Pronto. Sem complicação. Sem treinamento.',
    image: 'https://illustrations.popsy.co/emerald/man-using-phone.svg',
  },
  {
    number: 2,
    title: 'Cliente agenda sozinho',
    description: 'Ele manda mensagem. Sistema mostra horários. Ele escolhe. Sistema confirma. Você nem vê.',
    image: 'https://illustrations.popsy.co/emerald/chat-bot.svg',
  },
  {
    number: 3,
    title: 'Lembretes automáticos',
    description: 'Sistema manda lembrete 24h antes. E 2h antes. Faltas caem pela metade. Receita sobe.',
    image: 'https://illustrations.popsy.co/emerald/message-sent.svg',
  },
]

export function HowItWorks() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="como-funciona" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto max-w-7xl">
        <div
          ref={titleRef}
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            3 passos. Depois só colher resultado.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Configure uma vez. Funciona para sempre. Automático de verdade.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <StepSection key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepSection({ step, index }: { step: Step; index: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      <div
        className={`transition-all duration-1000 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? 'translateX(0) scale(1)'
            : `translateX(${isEven ? '-50px' : '50px'}) scale(0.9)`,
        }}
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-auto max-w-md mx-auto"
        />
      </div>

      <div
        className={`space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease-out',
          transitionDelay: '200ms',
        }}
      >
        <div className="inline-block">
          <div className="flex items-center gap-4 bg-linear-to-br from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg shadow-emerald-500/30">
            <span className="text-3xl font-bold">{step.number}</span>
            <div className="w-px h-8 bg-white/30" />
            <span className="text-sm font-medium">PASSO {step.number}</span>
          </div>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
          {step.title}
        </h3>

        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  )
}
