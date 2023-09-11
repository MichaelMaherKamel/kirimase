import { getSiteById, getSite } from '@/lib/api/site/queries'
import { publicProcedure, router } from '../trpc'
import { sitIdSchema, insertSitParams, updateSitParams } from '@/lib/db/schema/site'
import { createSit, deleteSit, updateSit } from '@/lib/api/site/mutations'

export const siteRouter = router({
  getSite: publicProcedure.query(async () => {
    return getSite()
  }),
  getSitById: publicProcedure.input(sitIdSchema).query(async ({ input }) => {
    return getSiteById(input.id)
  }),
  createSit: publicProcedure.input(insertSitParams).mutation(async ({ input }) => {
    return createSit(input)
  }),
  updateSit: publicProcedure.input(updateSitParams).mutation(async ({ input }) => {
    return updateSit(input.id, input)
  }),
  deleteSit: publicProcedure.input(sitIdSchema).mutation(async ({ input }) => {
    return deleteSit(input.id)
  }),
})
