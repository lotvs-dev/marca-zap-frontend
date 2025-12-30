import { Clock, MessageSquareX, PhoneOff } from 'lucide-react'

import { useInView } from '@/hooks/useInView'

interface Problem {
  icon: React.ElementType
  title: string
  description: string
}

const problems: Array<Problem> = [
  {
    icon: Clock,
    title: 'Horas perdidas todo dia',
    description: 'Você passa 2-4 horas por dia só respondendo "que horas você tem?" no WhatsApp.',
  },
  {
    icon: PhoneOff,
    title: '3 em cada 10 faltam',
    description: 'Clientes esquecem. Você perde dinheiro. Tempo de agenda desperdiçado.',
  },
  {
    icon: MessageSquareX,
    title: 'Sempre no celular',
    description: 'Cliente manda mensagem. Você para tudo. Atende. Agenda. Repete. 50 vezes por dia.',
  },
]

export function ProblemSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const [imageRef, imageInView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div
            ref={imageRef}
            className="order-2 lg:order-1 transition-all duration-1000"
            style={{
              opacity: imageInView ? 1 : 0,
              transform: imageInView ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.9)',
            }}
          >
            <img
              src="src\assets\svg\undraw\undraw_text-messages_978a.svg"
              alt="Profissional estressado com mensagens"
              className="w-full h-auto max-w-md mx-auto lg:max-w-full"
            />
          </div>

          <div ref={titleRef} className="order-1 lg:order-2 space-y-6 lg:space-y-8">
            <div
              className="transition-all duration-700"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-3 md:mb-4">
                Você reconhece isso?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
                Todo profissional que agenda pelo WhatsApp enfrenta os mesmos 3 problemas.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {problems.map((problem, index) => (
                <ProblemCard key={problem.title} problem={problem} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemCard({ problem, delay }: { problem: Problem; delay: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const Icon = problem.icon

  return (
    <div
      ref={ref}
      className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 transition-all duration-700"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateX(0)' : 'translateX(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-1">
          {problem.title}
        </h3>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          {problem.description}
        </p>
      </div>
    </div>
  )
}
