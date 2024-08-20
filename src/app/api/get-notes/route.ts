import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  try {
    // Query to get all notes from the database
    const result = await sql`
            SELECT * FROM notes;
        `;

    // Return the result as a JSON response
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}
