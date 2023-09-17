import { varchar, int, serial, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { computers } from "./computers"
import { getTods } from "@/lib/api/todo/queries";

export const todo = mysqlTable('todo', {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  computerId: int("computer_id").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});


// Schema for todo - used to validate API requests
export const insertTodSchema = createInsertSchema(todo);

export const insertTodParams = createSelectSchema(todo, {
  computerId: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateTodSchema = createSelectSchema(todo);

export const updateTodParams = createSelectSchema(todo,{
  computerId: z.coerce.number()
}).omit({ 
  userId: true
});

export const todIdSchema = updateTodSchema.pick({ id: true });

// Types for todo - used to type API request params and within Components
export type Tod = z.infer<typeof updateTodSchema>;
export type NewTod = z.infer<typeof insertTodSchema>;
export type NewTodParams = z.infer<typeof insertTodParams>;
export type UpdateTodParams = z.infer<typeof updateTodParams>;
export type TodId = z.infer<typeof todIdSchema>["id"];
    
// this type infers the return from getTodo() - meaning it will include any joins
export type CompleteTod = Awaited<ReturnType<typeof getTods>>["todo"][number];

