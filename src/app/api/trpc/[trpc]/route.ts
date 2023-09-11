import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/lib/server/routers/_app'
import { createContext } from '@/lib/trpc/context'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  })

export { handler as GET, handler as POST }

// This is how you can query the data from browser or thunderbird client
// http://localhost:3000/api/trpc/products.getProducts or
// http://localhost:3000/api/trpc/computers.getComputers
