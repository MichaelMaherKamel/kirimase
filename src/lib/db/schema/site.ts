import { varchar, mysqlTable } from 'drizzle-orm/mysql-core'

import { serverClient } from '@/lib/trpc/server'

export const site = mysqlTable('site', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  sitename: varchar('sitename', { length: 256 }).notNull(),
  sitedescription: varchar('sitedescription', { length: 256 }).notNull(),
  sitegoal: varchar('sitegoal', { length: 256 }).notNull(),
})

// this type infers the return from getSite() - meaning it will include any joins
export type Site = Awaited<ReturnType<(typeof serverClient)['site']['getSite']>>
