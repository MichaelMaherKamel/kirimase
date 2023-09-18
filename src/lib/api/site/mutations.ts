// import { db } from "@/lib/db";
// import { eq } from "drizzle-orm";
// import {
//   SitId,
//   NewSitParams,
//   UpdateSitParams,
//   updateSitSchema,
//   insertSitSchema,
//   site,
//   sitIdSchema
// } from "@/lib/db/schema/site";

// export const createSit = async (sit: NewSitParams) => {
//   const newSit = insertSitSchema.parse(sit);
//   try {
//     await db.insert(site).values(newSit)
//     return { success: true }
//   } catch (err) {
//     const message = (err as Error).message ?? "Error, please try again";
//     console.error(message);
//     return { error: message };
//   }
// };

// export const updateSit = async (id: SitId, sit: UpdateSitParams) => {
//   const { id: sitId } = sitIdSchema.parse({ id });
//   const newSit = updateSitSchema.parse(sit);
//   try {
//     await db
//      .update(site)
//      .set(newSit)
//      .where(eq(site.id, sitId!))
//     return {success: true}
//   } catch (err) {
//     const message = (err as Error).message ?? "Error, please try again";
//     console.error(message);
//     return { error: message };
//   }
// };

// export const deleteSit = async (id: SitId) => {
//   const { id: sitId } = sitIdSchema.parse({ id });
//   try {
//     await db.delete(site).where(eq(site.id, sitId!))
//     return {success: true}
//   } catch (err) {
//     const message = (err as Error).message ?? "Error, please try again";
//     console.error(message);
//     return { error: message };
//   }
// };
