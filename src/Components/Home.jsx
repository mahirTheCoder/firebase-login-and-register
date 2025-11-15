import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FiTrash2, FiEdit, FiTrash, FiPlusCircle } from "react-icons/fi";
import { LuSun, LuMoon } from "react-icons/lu";

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState(null);

  // ------------------- Dark/Light Mode -------------------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() && !newNote.content.trim()) return;
    const note = { id: Date.now(), ...newNote };
    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "" });
  };

  const handleDeleteNote = (id) => {
    const deleted = notes.find((note) => note.id === id);
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
      notes.map((n) => (n.id === editNote.id ? { ...n, ...newNote } : n))
    );
    setEditNote(null);
    setNewNote({ title: "", content: "" });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#e0f2fe] 
      dark:from-[#0f0f0f] dark:to-[#1a1a1a] p-8 flex justify-center text-gray-900 
      dark:text-gray-100 transition-colors duration-300"
    >
      <div className="w-full max-w-[800px]">

        {/* ---------------- Navbar ---------------- */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 
            dark:from-indigo-300 dark:to-blue-300 text-transparent bg-clip-text italic">
            My Notes
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/bin")}
              className="flex items-center gap-2 px-5 py-2 rounded-lg 
              bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition 
              dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
            >
              <FiTrash className="text-lg" />
              Bin
            </button>

            {/* ---------------- Dark/Light Toggle Button ---------------- */}
            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
              className="p-3 rounded-lg bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
            >
              {theme === "light" ? (
                <LuMoon className="text-xl" />
              ) : (
                <LuSun className="text-xl" />
              )}
            </button>
          </div>
        </header>

        {/* ---------------- Form: Create / Edit ---------------- */}
        <form
          onSubmit={editNote ? handleUpdateNote : handleAddNote}
          className="bg-white dark:bg-[#121212] p-6 rounded-xl shadow-lg border 
          border-gray-300 dark:border-gray-600 mb-10 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {editNote ? "Edit Note" : "Create Note"}
          </h2>

          <input
            type="text"
            placeholder="Enter note title..."
            value={newNote.title}
            onChange={(e) =>
              setNewNote({ ...newNote, title: e.target.value })
            }
            className="w-full p-3 mb-3 border rounded-lg border-gray-300 
            dark:border-gray-600 dark:bg-[#1b1b1b] dark:text-white 
            focus:ring-2 focus:ring-indigo-400 outline-none transition-colors"
          />

          <textarea
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            rows="3"
            placeholder="Write your note..."
            className="w-full p-3 mb-4 border rounded-lg border-gray-300 
            dark:border-gray-600 dark:bg-[#1b1b1b] dark:text-white 
            focus:ring-2 focus:ring-indigo-400 outline-none transition-colors"
          ></textarea>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-white 
              bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-105 transition"
            >
              <FiPlusCircle /> {editNote ? "Save" : "Add Note"}
            </button>

            {editNote && (
              <button
                type="button"
                onClick={() => {
                  setEditNote(null);
                  setNewNote({ title: "", content: "" });
                }}
                className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 
                dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-400 
                dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ---------------- Notes Grid ---------------- */}
        {notes.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300 font-bold text-xl py-10">
            🚫 No Notes Found
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-[#1a1a1a] p-4 rounded-xl border 
                border-gray-300 dark:border-gray-600 shadow-md 
                hover:shadow-xl transition hover:-translate-y-1"
              >
                <h2 className="font-bold text-lg mb-1 text-gray-800 dark:text-gray-100 line-clamp-1">
                  {note.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-2">
                  {note.content}
                </p>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => handleEditNote(note)}
                    className="flex items-center gap-1 px-3 py-1.5 
                    bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 
                    dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition"
                  >
                    <FiEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="flex items-center gap-1 px-3 py-1.5 
                    bg-red-100 text-red-600 rounded-md hover:bg-red-200 
                    dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
