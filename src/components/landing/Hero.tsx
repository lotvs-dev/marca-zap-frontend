import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { ChatSimulation } from './ChatSimulation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SplitText } from '@/components/ui/react-bits/split-text'
import DotGrid from '@/components/reactbits/DotGrid'

export function Hero() {
  return (
    <section className="relative z-0 overflow-hidden bg-linear-to-br from-white to-emerald-50/30 dark:from-zinc-950 dark:to-emerald-950/20 min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex items-center px-4 py-12 lg:py-0">
      <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-10">
        <DotGrid
          dotSize={2}
          gap={24}
          baseColor="#10b981"
          activeColor="#10b981"
          proximity={120}
          shockRadius={200}
          shockStrength={4}
          resistance={800}
          returnDuration={1.2}
        />
      </div>
      <div className="container mx-auto max-w-7xl relative w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8">
            <Badge className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 text-xs sm:text-sm">
              Novo: IA que entende áudio e texto
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
              <SplitText
                text="Sua agenda cheia, sem você tocar no celular"
                delay={30}
                duration={500}
              />
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              147 milhões de brasileiros já usam WhatsApp todos os dias. Chegou a hora de usá-lo a seu favor. Agendamentos automáticos. Lembretes inteligentes. Zero trabalho manual.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/cadastro" className="w-full sm:w-auto">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 w-full h-12 text-sm sm:text-base shadow-lg shadow-emerald-600/20">
                  Começar Grátis Agora
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>

              <a href="#como-funciona" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 w-full h-12 text-sm sm:text-base">
                  Ver como funciona
                </Button>
              </a>
            </div>
          </div>

          {/* Visual Simulation */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative aspect-4/3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-emerald-500/10 flex items-center justify-center overflow-hidden">
              <ChatSimulation />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 lg:-top-12 lg:-right-12 w-48 h-48 lg:w-64 lg:h-64 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 w-48 h-48 lg:w-64 lg:h-64 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
