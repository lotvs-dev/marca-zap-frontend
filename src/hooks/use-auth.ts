import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types'

import { api } from '@/lib/api'
import { setToken, setUser, clearAuth, getUser } from '@/lib/auth'

export function useAuth() {
  const navigate = useNavigate()
  const user = getUser()

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials)
      return data
    },
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
      navigate({ to: '/dashboard' })
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (registerData: RegisterData) => {
      const { data } = await api.post<AuthResponse>('/auth/register', registerData)
      return data
    },
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
      navigate({ to: '/dashboard' })
    },
  })

  const logout = () => {
    clearAuth()
    navigate({ to: '/login' })
  }

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  }
}
