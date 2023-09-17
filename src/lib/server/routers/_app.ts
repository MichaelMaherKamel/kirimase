import { computersRouter } from './computers'
import { router } from '../trpc'
import { siteRouter } from './site'
import { userRouter } from './users'
import { todoRouter } from './todo'

export const appRouter = router({
  computers: computersRouter,
  site: siteRouter,
  users: userRouter,
  todo: todoRouter,
})

export type AppRouter = typeof appRouter
