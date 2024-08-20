import Link from "next/link";
import { redirect } from "next/navigation";

// Helper function to fetch data from the API
// Helper function to fetch data from the API
async function fetchFromAPI(endpoint: string, options?: RequestInit) {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;
  
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
  

export default async function Home() {
  //CREATE
 async function createNote(data: FormData) {
    "use server";
    const note = data.get("note");
    const date = data.get("date");

    try {
      await fetchFromAPI("/api/add-data", {
        method: "POST",
        body: JSON.stringify({ note, date }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
    redirect("/");
  }

  // Fetch notes to display
  let result = [];
  try {
    result = await fetchFromAPI("/api/get-notes");
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
  

  //DELETE
  async function deleteNote(data: FormData) {
    "use server";
    const id = data.get("id");

    try {
      await fetchFromAPI(`/api/delete-data?id=${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    redirect("/");
  }

return (
  <main className="m-10">
    <div className="m-5">
      <h1 className="text-center m-5">Add note</h1>
      <form action={createNote} className="space-y-5">
        <input
          type="text"
          name="note"
          id="note"
          placeholder="Add note"
          className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
        />
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Add date"
          className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]"
        />
        <button
          type="submit"
          className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md shadow-lg shadow-orange-400 hover:shadow-red-400"
        >
          SUBMIT
        </button>
      </form>
    </div>

    {result.length > 0 ? (
      result.map((element: any) => (
        <ul className="flex my-2" key={element.id}> {/* Added key prop */}
          <li className="text-center w-[50%]">{element.note}</li>
          <li className="text-center w-[30%]">{element.date}</li>
          <li className="flex text-center w-[20%]">
            <Link href={"/edit/" + element.id}>
              <button className="bg-cyan-600 font-bold text-white p-2 mx-2 rounded-md shadow-lg shadow-cyan-400">
                EDIT
              </button>
            </Link>
            <form action={deleteNote}>
              <input type="hidden" name="id" value={element.id} />
              <button
                className="bg-red-600 font-bold text-white p-2 rounded-md shadow-lg shadow-red-400"
                type="submit"
              >
                DELETE
              </button>
            </form>
          </li>
        </ul>
      ))
    ) : (
      <p>No notes found.</p>
    )}
  </main>
);

}
