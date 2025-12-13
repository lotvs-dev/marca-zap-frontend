import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Service, CreateServiceData } from '@/types'

import { api } from '@/lib/api'

export function useServices() {
  const queryClient = useQueryClient()

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await api.get<Service[]>('/services')
      return data
    },
  })

  const createMutation = useMutation({
    mutationFn: async (serviceData: CreateServiceData) => {
      const { data } = await api.post<Service>('/services', serviceData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...serviceData }: Partial<Service> & { id: string }) => {
      const { data } = await api.put<Service>(`/services/${id}`, serviceData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/services/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  return {
    services,
    isLoading,
    createService: createMutation.mutate,
    updateService: updateMutation.mutate,
    deleteService: deleteMutation.mutate,
  }
}
