import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { type SitId, sitIdSchema, site } from '@/lib/db/schema/site'

export const getSite = async () => {
  const s = await db.select().from(site)
  return { site: s }
}

export const getSiteById = async (id: SitId) => {
  const { id: sitId } = sitIdSchema.parse({ id })
  const [s] = await db.select().from(site).where(eq(site.id, sitId))
  return { sit: s }
}
