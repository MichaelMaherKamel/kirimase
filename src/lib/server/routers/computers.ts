import { type } from 'os'
import { publicProcedure, router } from '../trpc'
import { getComputers } from '@/lib/api/computers/queries'

export const computersRouter = router({
  getComputers: publicProcedure.query(async () => {
    return getComputers()
  }),
})

// export type AppRouter = typeof computersRouter
