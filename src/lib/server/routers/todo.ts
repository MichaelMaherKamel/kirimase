import { getTodById, getTods } from '@/lib/api/todo/queries'
import { publicProcedure, router } from '../trpc'
import { todIdSchema, insertTodParams, updateTodParams } from '@/lib/db/schema/todo'
import { createTod, deleteTod, updateTod } from '@/lib/api/todo/mutations'

export const todoRouter = router({
  getTodo: publicProcedure.query(async () => {
    return getTods()
  }),
  getTodById: publicProcedure.input(todIdSchema).query(async ({ input }) => {
    return getTodById(input.id)
  }),
  createTod: publicProcedure.input(insertTodParams).mutation(async ({ input }) => {
    return createTod(input)
  }),
  updateTod: publicProcedure.input(updateTodParams).mutation(async ({ input }) => {
    return updateTod(input.id, input)
  }),
  deleteTod: publicProcedure.input(todIdSchema).mutation(async ({ input }) => {
    return deleteTod(input.id)
  }),
})
