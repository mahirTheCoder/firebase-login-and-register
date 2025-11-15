import { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState(null);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() && !newNote.content.trim()) return;

    const note = {
      id: Date.now(),
      ...newNote,
    };

    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "" });
  };

  const handleDeleteNote = (id) => {
    const deleted = notes.find((note) => note.id === id);

    // Store to Bin Page
    const binNotes = JSON.parse(localStorage.getItem("binNotes")) || [];
    localStorage.setItem("binNotes", JSON.stringify([...binNotes, deleted]));

    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setNewNote({ title: note.title, content: note.content });
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    setNotes(
      notes.map((n) =>
        n.id === editNote.id ? { ...n, ...newNote } : n
      )
    );
    setEditNote(null);
    setNewNote({ title: "", content: "" });
  };

  return (
    <div className="min-h-screen  from-blue-50 via-white to-indigo-50 p-8">
      
      {/* ---------------- Navbar ---------------- */}
      <header className="flex justify-between items-center mb-10 animate-fade-in">
        <h1 className="text-4xl font-bold text-blue-500 bg-clip-text ">
          My Notes
        </h1>

        <div className="space-x-3">
          <button
            onClick={() => navigate("/bin")}
            className="px-5 py-2.5 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-all hover:scale-105"
          >
            🗑️ Bin
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all hover:scale-105"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ---------------- Form: Create / Edit ---------------- */}
      <form
        onSubmit={editNote ? handleUpdateNote : handleAddNote}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-10 animate-slide-up transition-all hover:shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {editNote ? "✏️ Edit Your Note" : "📝 Create a New Note"}
        </h2>

        <input
          type="text"
          placeholder="Enter note title..."
          value={newNote.title}
          onChange={(e) =>
            setNewNote({ ...newNote, title: e.target.value })
          }
          className="w-full p-3 mb-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
        />

        <textarea
          value={newNote.content}
          onChange={(e) =>
            setNewNote({ ...newNote, content: e.target.value })
          }
          rows="4"
          placeholder="Write your note..."
          className="w-full p-3 mb-4 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
        ></textarea>

        <div className="flex gap-4">
          <button
            className="px-6 py-2.5 rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 font-semibold transition-all"
            type="submit"
          >
            {editNote ? "💾 Save Changes" : "➕ Add Note"}
          </button>

          {editNote && (
            <button
              type="button"
              onClick={() => {
                setEditNote(null);
                setNewNote({ title: "", content: "" });
              }}
              className="px-6 py-2.5 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 font-semibold transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ---------------- Notes Grid ---------------- */}
      {notes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg animate-fade-in">
          📭 No notes found. Create your first note above!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, i) => (
            <div
              key={note.id}
              className="bg-white p-5 rounded-xl border shadow-md hover:shadow-xl transition-all hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h2 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                {note.title}
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {note.content}
              </p>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  onClick={() => handleEditNote(note)}
                  className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-all hover:scale-110"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="px-3 py-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-all hover:scale-110"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
