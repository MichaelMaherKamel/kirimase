import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTod,
  deleteTod,
  updateTod,
} from "@/lib/api/todo/mutations";
import { 
  todIdSchema,
  insertTodParams,
  updateTodParams 
} from "@/lib/db/schema/todo";

export async function POST(req: Request) {
  try {
    const validatedData = insertTodParams.parse(await req.json());
    const { success, error } = await createTod(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/todo"); // optional - assumes you will have named route same as entity
    return NextResponse.json(success, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateTodParams.parse(await req.json());
    const validatedParams = todIdSchema.parse({ id });

    const { success, error } = await updateTod(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = todIdSchema.parse({ id });
    const { success, error } = await deleteTod(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
