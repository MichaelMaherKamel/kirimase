import { computersRouter } from './computers'
import { router } from '../trpc'
import { siteRouter } from './site'

export const appRouter = router({
  computers: computersRouter,
  site: siteRouter,
})

export type AppRouter = typeof appRouter

// This is how you can query the data from browser or thunderbird client
// http://localhost:3000/api/trpc/site.getSite or
// http://localhost:3000/api/trpc/computers.getComputers
