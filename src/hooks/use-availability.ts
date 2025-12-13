import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Availability, TimeSlot } from '@/types'

import { api } from '@/lib/api'

export function useAvailability() {
  const queryClient = useQueryClient()

  const { data: availability } = useQuery({
    queryKey: ['availability'],
    queryFn: async () => {
      const { data } = await api.get<Availability[]>('/professional/availability')
      return data
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (availabilityData: Partial<Availability>[]) => {
      const { data } = await api.put('/professional/availability', availabilityData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] })
    },
  })

  return {
    availability,
    updateAvailability: updateMutation.mutate,
  }
}

// Hook para disponibilidade pública (link de agendamento)
export function usePublicAvailability(professionalId: string, date: string) {
  return useQuery({
    queryKey: ['public-availability', professionalId, date],
    queryFn: async () => {
      const { data } = await api.get<TimeSlot[]>(
        `/public/availability/${professionalId}/${date}`
      )
      return data
    },
    enabled: !!professionalId && !!date,
  })
}
