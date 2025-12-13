import type { Booking } from '@/types'

import { formatDateTime } from '@/lib/date-utils'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface UpcomingBookingsProps {
  bookings: Booking[]
}

export function UpcomingBookings({ bookings }: UpcomingBookingsProps) {
  if (!bookings.length) {
    return <p className="text-gray-500 text-center py-4">Nenhum agendamento próximo</p>
  }

  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <div key={booking.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{booking.clientName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{booking.clientName}</p>
              <p className="text-sm text-gray-500">
                {formatDateTime(booking.dateTime)}
              </p>
            </div>
          </div>
          <Badge>{booking.service?.name}</Badge>
        </div>
      ))}
    </div>
  )
}
