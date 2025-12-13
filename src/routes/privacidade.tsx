import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacidade')({
  component: PrivacidadePage,
})

function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Conteúdo da política de privacidade...</p>
        </div>
      </div>
    </div>
  )
}
