import type { User } from '@/types'

const TOKEN_KEY = 'marcazap_token'
const USER_KEY = 'marcazap_user'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getUser(): User | null {
  const userStr = localStorage.getItem(USER_KEY)
  return userStr ? JSON.parse(userStr) : null
}

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

// Mock login (substituir por API real depois)
export async function mockLogin(email: string, _password: string) {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 800))

  // Mock user
  const user: User = {
    id: '1',
    email,
    name: 'Profissional Mock',
  }

  const token = 'mock_jwt_token_' + Date.now()

  setToken(token)
  setUser(user)

  return { token, user }
}
