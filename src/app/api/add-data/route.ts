import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { note, date } = await request.json();

    const result = await sql`
      INSERT INTO notes (note, date)
      VALUES (${note}, ${date})
    `;

    return NextResponse.json(
      { message: "Note added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding note:", error);
    return NextResponse.json(
      {
        message: "Error adding note",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
