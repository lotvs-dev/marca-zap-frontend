import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-20 px-4 bg-linear-to-br from-emerald-500 to-emerald-600 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Comece a agendar no automático hoje
        </h2>

        <p className="text-xl md:text-2xl text-emerald-100 mb-8">
          Sem cartão de crédito. 14 dias grátis.
        </p>

        <Link to="/cadastro">
          <Button
            size="lg"
            className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all"
          >
            Criar Minha Conta
          </Button>
        </Link>

        <div className="mt-6 flex items-center justify-center gap-2 text-emerald-100">
          <Shield className="w-4 h-4" />
          <p className="text-sm">
            Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  )
}
