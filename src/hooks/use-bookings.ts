import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Booking, CreateBookingData, BookingStatus } from '@/types'

import { api } from '@/lib/api'

export function useBookings() {
  const queryClient = useQueryClient()

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data } = await api.get<Booking[]>('/bookings')
      return data
    },
  })

  const createMutation = useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      const { data } = await api.post<Booking>('/bookings', bookingData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const { data } = await api.patch<Booking>(`/bookings/${id}/status`, { status })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  return {
    bookings,
    isLoading,
    createBooking: createMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
  }
}
