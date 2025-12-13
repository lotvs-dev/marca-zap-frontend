import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import type { ProfessionalPublic } from '@/types'
import { useState } from 'react'

import { api } from '@/lib/api'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ServiceSelector } from '@/components/booking/ServiceSelector'
import { AvailabilityCalendar } from '@/components/booking/AvailabilityCalendar'
import { ClientForm } from '@/components/booking/ClientForm'
import { BookingConfirmation } from '@/components/booking/BookingConfirmation'

export const Route = createFileRoute('/agendar/$slug')({
  component: BookingPage,
})

function BookingPage() {
  const { slug } = Route.useParams()
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)

  const { data: professional, isLoading } = useQuery({
    queryKey: ['professional', slug],
    queryFn: async () => {
      const { data } = await api.get<ProfessionalPublic>(`/public/professional/${slug}`)
      return data
    },
  })

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  if (!professional) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="pt-6">
            <p>Profissional não encontrado</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Professional Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={professional.avatar} />
                <AvatarFallback>{professional.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{professional.name}</CardTitle>
                <p className="text-sm text-gray-500">Agende seu horário</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Booking Steps */}
        {step === 1 && (
          <ServiceSelector
            services={professional.services}
            onSelect={(serviceId) => {
              setSelectedService(serviceId)
              setStep(2)
            }}
          />
        )}

        {step === 2 && selectedService && (
          <AvailabilityCalendar
            professionalId={professional.id}
            serviceId={selectedService}
            onSelect={(dateTime) => {
              setSelectedDateTime(dateTime)
              setStep(3)
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && selectedService && selectedDateTime && (
          <ClientForm
            professionalId={professional.id}
            serviceId={selectedService}
            dateTime={selectedDateTime}
            onSuccess={(id) => {
              setBookingId(id)
              setStep(4)
            }}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && bookingId && (
          <BookingConfirmation bookingId={bookingId} />
        )}
      </div>
    </div>
  )
}
