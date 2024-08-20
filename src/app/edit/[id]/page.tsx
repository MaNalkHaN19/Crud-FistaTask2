import dbConnect, { pool } from "@/util/dbconnect";
import { redirect } from "next/navigation";

export default async function edit({ params }: { params: any }) {
    dbConnect();
    const id = params.id;
    const data = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
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

    async function updateNote(data: any) {
        "use server";
        let note = data.get("note").valueOf();
        let date = data.get("date").valueOf();

        try {
            const updatedNote = await pool.query(
                `UPDATE notes SET note = $1, date = $2 WHERE id = $3`,
                [note, date, id]
            );
            console.log("note update", updatedNote);
        } catch (err) {
            console.error("error in updation", err);
        }
        redirect("/");
    }

    return (
        <main className="m-10">
            <div className="m-5">
                <h1 className="text-center m-5">Edit note</h1>
                <form action={updateNote} className="space-y-5">
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
}
