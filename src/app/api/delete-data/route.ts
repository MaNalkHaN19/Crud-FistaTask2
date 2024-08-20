import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes = await sql`SELECT * FROM notes;`;
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (!id) throw new Error("Missing ID for deletion");
    await sql`DELETE FROM notes WHERE id=${id};`;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ id }, { status: 500 });
  }
}
