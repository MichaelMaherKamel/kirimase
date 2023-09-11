import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSit,
  deleteSit,
  updateSit,
} from "@/lib/api/site/mutations";
import { 
  sitIdSchema,
  insertSitParams,
  updateSitParams 
} from "@/lib/db/schema/site";

export async function POST(req: Request) {
  try {
    const validatedData = insertSitParams.parse(await req.json());
    const { success, error } = await createSit(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/site"); // optional - assumes you will have named route same as entity
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

    const validatedData = updateSitParams.parse(await req.json());
    const validatedParams = sitIdSchema.parse({ id });

    const { success, error } = await updateSit(validatedParams.id, validatedData);

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

    const validatedParams = sitIdSchema.parse({ id });
    const { success, error } = await deleteSit(validatedParams.id);
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
