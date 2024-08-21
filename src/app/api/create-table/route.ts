import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
  CREATE TABLE IF NOT EXISTS notes (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    note TEXT NOT NULL,
    date DATE NOT NULL
);`;

    return NextResponse.json(
      { message: "Table created or already exists", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json(
      {
        message: "Error creating table",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
