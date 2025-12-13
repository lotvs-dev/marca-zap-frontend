import { Link } from '@tanstack/react-router'
import { Shield, UserPlus } from 'lucide-react'

import { AnimatedBackground } from './AnimatedBackground'

import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="py-24 px-4 bg-emerald-50 dark:bg-emerald-900 relative z-0 overflow-hidden transition-colors duration-300">
      <AnimatedBackground className="opacity-30 dark:opacity-20" />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/40 dark:bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-300/30 dark:bg-emerald-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white leading-tight">
          E se você nunca mais precisasse agendar manualmente?
        </h2>

        <p className="text-xl md:text-2xl text-zinc-600 dark:text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Não é magia. É automação bem feita. Comece grátis. Veja acontecer.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link to="/cadastro">
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-white dark:text-emerald-900 dark:hover:bg-emerald-50 text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <UserPlus className="w-6 h-6 mr-2" />
              Criar Conta Grátis
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 text-zinc-500 dark:text-emerald-200/80 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0" />
              <span className="text-center sm:text-left">Teste grátis por 14 dias</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="text-center sm:text-left">Sem fidelidade</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-center sm:text-left">Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </section>
  )
}
