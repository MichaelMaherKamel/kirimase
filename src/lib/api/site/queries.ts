import { db } from '@/lib/db'
import { site, type Site } from '@/lib/db/schema/site'

export const getSite = async () => {
  const s = await db.select().from(site)
  return { site: s }
}
