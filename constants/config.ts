// Centralized configuration for backend API and auth
// Reads from Expo public env (EXPO_PUBLIC_API_BASE_URL, EXPO_PUBLIC_AUTH_TOKEN)
// Keep these public-only; for secrets prefer a login flow and SecureStore.

export const API_BASE_URL: string | undefined = process.env.EXPO_PUBLIC_API_BASE_URL || undefined
export const AUTH_TOKEN: string | undefined = process.env.EXPO_PUBLIC_AUTH_TOKEN || undefined

export const buildAuthHeaders = () => (
  AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}
)
