import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { 
  TodId, 
  NewTodParams,
  UpdateTodParams, 
  updateTodSchema,
  insertTodSchema, 
  todo,
  todIdSchema 
} from "@/lib/db/schema/todo";
import { getUserAuth } from "@/lib/auth/utils";

export const createTod = async (tod: NewTodParams) => {
  const { session } = await getUserAuth();
  const newTod = insertTodSchema.parse({ ...tod, userId: session?.user.id! });
  try {
    await db.insert(todo).values(newTod)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateTod = async (id: TodId, tod: UpdateTodParams) => {
  const { session } = await getUserAuth();
  const { id: todId } = todIdSchema.parse({ id });
  const newTod = updateTodSchema.parse({ ...tod, userId: session?.user.id! });
  try {
    await db
     .update(todo)
     .set(newTod)
     .where(and(eq(todo.id, todId!), eq(todo.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteTod = async (id: TodId) => {
  const { session } = await getUserAuth();
  const { id: todId } = todIdSchema.parse({ id });
  try {
    await db.delete(todo).where(and(eq(todo.id, todId!), eq(todo.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

