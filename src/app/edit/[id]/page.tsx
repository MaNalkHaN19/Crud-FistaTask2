import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

// Function to handle note update
async function updateNote(data: FormData) {
    "use server";
    const id = data.get("id")?.toString();
    const note = data.get("note")?.toString();
    const date = data.get("date")?.toString();

    if (!id || !note || !date) {
        console.error("Invalid input: all fields are required");
        return;
    }

    try {
        const response = await fetch("/api/edit-data", {
            method: "POST",
            body: JSON.stringify({ id, note, date }),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to update the note");
        }

        console.log("Note updated successfully");
    } catch (err) {
        console.error("Error in updating note:", err);
    }

    redirect("/");
}

export default async function edit({ params }: { params: any }) {
    const id = params.id;

    try {
        // Fetching the note data from the database
        const data = await sql`SELECT * FROM notes WHERE id = ${id}`;
        const result = data.rows[0];

        if (!result) {
            // Handle the case where no note is found for the given ID
            return (
                <main className="m-10">
                    <div className="m-5">
                        <h1 className="text-center m-5">Note not found</h1>
                    </div>
                </main>
            );
        }

        return (
            <main className="m-10">
                <div className="m-5">
                    <h1 className="text-center m-5">Edit note</h1>
                    <form action={updateNote} className="space-y-5">
                        <input
                            type="hidden"
                            name="id"
                            value={id}
                        />
                        <input
                            type="text"
                            name="note"
                            id="note"
                            placeholder="Add note"
                            defaultValue={result.note}
                            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
                        />
                        <input
                            type="date"
                            name="date"
                            id="date"
                            placeholder="Add date"
                            defaultValue={result.date}
                            className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md"
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </main>
        );
    } catch (error) {
        console.error("Error fetching note data:", error);
        return (
            <main className="m-10">
                <div className="m-5">
                    <h1 className="text-center m-5">Error loading note data</h1>
                </div>
            </main>
        );
    }
}
