import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        note VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL
      );
    `;

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
