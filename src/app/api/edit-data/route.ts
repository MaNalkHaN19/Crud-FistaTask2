import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { id, note, date } = await request.json();

        if (!id || !note || !date) {
            return NextResponse.json({ error: "Invalid input: all fields are required" }, { status: 400 });
        }

        await sql`
            UPDATE notes 
            SET note = ${note}, date = ${date} 
            WHERE id = ${id}
        `;
        
        return NextResponse.json({ message: "Note updated successfully" });
    } catch (err) {
        console.error("Error in updating note:", err);
        return NextResponse.json({ error: "Error in updating note" }, { status: 500 });
    }
}
