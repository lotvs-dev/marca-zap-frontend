import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SplitText } from '@/components/ui/react-bits/split-text'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-white to-emerald-50/30 dark:from-zinc-950 dark:to-emerald-950/20 py-20 px-4 md:py-28">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <Badge className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100">
              Novo: IA que entende português
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
              <SplitText
                text="Pare de perder clientes no WhatsApp"
                delay={30}
                duration={500}
              />
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Sistema de agendamento automático via WhatsApp. Sem links externos, sem complicação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cadastro">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 w-full sm:w-auto">
                  Começar Grátis
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <a href="#como-funciona">
                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 w-full sm:w-auto">
                  Ver demonstração
                </Button>
              </a>
            </div>
          </div>

          {/* Visual Placeholder */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl bg-linear-to-br from-emerald-100 to-emerald-50 dark:from-emerald-950/50 dark:to-emerald-900/30 border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/20 flex items-center justify-center overflow-hidden">
              {/* Screenshot placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Screenshot WhatsApp aqui
                  </p>
                </div>
              </div>

              {/* Decorative blur circles */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
