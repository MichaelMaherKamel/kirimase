import { varchar, serial, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getSite } from "@/lib/api/site/queries";

export const site = mysqlTable('site', {
  id: serial("id").primaryKey(),
  sitename: varchar("sitename", { length: 256 }).notNull(),
  sitedescription: varchar("sitedescription", { length: 256 }).notNull()
});
 

// Schema for site - used to validate API requests
export const insertSitSchema = createInsertSchema(site);
export const insertSitParams = createSelectSchema(site, {
  
}).omit({ 
  id: true
});
export const updateSitSchema = createSelectSchema(site);
export const updateSitParams = createSelectSchema(site, {
  
})
export const sitIdSchema = updateSitSchema.pick({ id: true });

// Types for site - used to type API request params and within Components
export type Sit = z.infer<typeof updateSitSchema>;
export type NewSit = z.infer<typeof insertSitSchema>;
export type NewSitParams = z.infer<typeof insertSitParams>;
export type UpdateSitParams = z.infer<typeof updateSitParams>;
export type SitId = z.infer<typeof sitIdSchema>["id"];
    
// this type infers the return from getSite() - meaning it will include any joins
export type CompleteSit = Awaited<ReturnType<typeof getSite>>["site"][number];
