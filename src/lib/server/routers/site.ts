import { getSite } from '@/lib/api/site/queries'
import { publicProcedure, router } from '../trpc'

export const siteRouter = router({
  getSite: publicProcedure.query(async () => {
    return getSite()
  }),
})
