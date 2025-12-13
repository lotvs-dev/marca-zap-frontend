import { useQuery } from '@tanstack/react-query'
import type { Booking } from '@/types'

import { api } from '@/lib/api'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle } from 'lucide-react'
import { formatDateTime } from '@/lib/date-utils'

interface BookingConfirmationProps {
  bookingId: string
}

export function BookingConfirmation({ bookingId }: BookingConfirmationProps) {
  const { data: booking } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      const { data } = await api.get<Booking>(`/bookings/${bookingId}`)
      return data
    },
  })

  if (!booking) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle size={24} />
          <CardTitle>Agendamento Confirmado!</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            Você receberá uma confirmação no WhatsApp em breve.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-500">Serviço</p>
            <p className="font-medium">{booking.service?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Data e Hora</p>
            <p className="font-medium">{formatDateTime(booking.dateTime)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cliente</p>
            <p className="font-medium">{booking.clientName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
