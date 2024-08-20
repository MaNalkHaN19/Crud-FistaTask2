import { sql } from "@vercel/postgres";
import { get } from "http";
import { url } from "inspector";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const note = searchParams.get("note");
    const date = searchParams.get("date");

    try {
        if (!note || !date) throw new Error("Insert Data");

        const result = await sql`
            INSERT INTO notes (note, date) 
            VALUES (${note}, ${date})
            RETURNING id;
        `;

        const [{ id }] = result.rows;

        return NextResponse.json({ success: true, id }, { status: 200 });
    } catch (error) {
        // Assert the type of error to Error
        const errorMessage = (error as Error).message;
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

