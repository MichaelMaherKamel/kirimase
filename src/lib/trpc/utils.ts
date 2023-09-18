import { env } from '@/lib/env.mjs'
import { eventNames } from 'process'
function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  // if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return 'http://${env.NEXT_PUBLIC_APP_URL}'
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc'
}
