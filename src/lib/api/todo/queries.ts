import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type TodId, todIdSchema, todo } from "@/lib/db/schema/todo";
import { computers } from "@/lib/db/schema/computers";

export const getTods = async () => {
  const { session } = await getUserAuth();
  const t = await db.select({ tod: todo, computer: computers }).from(todo).leftJoin(computers, eq(todo.computerId, computers.id)).where(eq(todo.userId, session?.user.id!));
  return { todo: t };
};

export const getTodById = async (id: TodId) => {
  const { session } = await getUserAuth();
  const { id: todId } = todIdSchema.parse({ id });
  const [t] = await db.select().from(todo).where(and(eq(todo.id, todId), eq(todo.userId, session?.user.id!))).leftJoin(computers, eq(todo.computerId, computers.id));
  return { tod: t };
};

