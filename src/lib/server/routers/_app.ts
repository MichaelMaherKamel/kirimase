import { computersRouter } from './computers'
import { router } from '../trpc'
import { siteRouter } from './site'
import { userRouter } from './users'

export const appRouter = router({
  computers: computersRouter,
  site: siteRouter,
  users: userRouter,
})

export type AppRouter = typeof appRouter
