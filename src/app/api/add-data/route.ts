import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function POST(request: Request) {
  try {
    const { note, date } = await request.json();

    const result = await sql`
      INSERT INTO notes (note, date, created_at)
      VALUES (${note}, ${date}, CURRENT_TIMESTAMP)
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

export async function GET(request: Request) {
  try {
    // Query to get all notes from the database
    const result = await sql`
      SELECT * FROM notes;
    `;

    // Format the date fields
    const formattedResult = result.rows.map((note) => ({
      ...note,
      date: format(new Date(note.date), "yyyy-MM-dd"),
      created_at: format(new Date(note.created_at), "yyyy-MM-dd HH:mm:ss"),
    }));

    // Return the formatted result as a JSON response
    return NextResponse.json(formattedResult, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}
