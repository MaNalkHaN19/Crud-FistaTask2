import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            throw new Error("Missing ID");
        }

        const result = await sql`
            DELETE FROM notes WHERE id = ${id};
        `
       ;
       
        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, id }, { status: 200 });
      }
    
    catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

