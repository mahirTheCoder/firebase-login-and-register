// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { FiRotateCcw, FiTrash2, FiArrowLeft } from "react-icons/fi";
// import { FaTrashAlt } from "react-icons/fa";

// export default function Bin() {
//   const navigate = useNavigate();
//   const [binNotes, setBinNotes] = useState([]);

//   // Load bin notes on mount
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("binNotes")) || [];
//     setBinNotes(stored);
//   }, []);

//   // Restore Note
//   const handleRestore = (id) => {
//     const note = binNotes.find((n) => n.id === id);
//     const currentNotes = JSON.parse(localStorage.getItem("notes")) || [];

//     localStorage.setItem("notes", JSON.stringify([...currentNotes, note]));

//     const updated = binNotes.filter((n) => n.id !== id);
//     setBinNotes(updated);
//     localStorage.setItem("binNotes", JSON.stringify(updated));
//   };

//   // Permanent Delete
//   const handlePermanentDelete = (id) => {
//     if (!window.confirm("Are you sure? This action is permanent.")) return;

//     const updated = binNotes.filter((n) => n.id !== id);
//     setBinNotes(updated);
//     localStorage.setItem("binNotes", JSON.stringify(updated));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">

//       {/* Header */}
//       <div className="mb-10 flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-extrabold flex gap-2 items-center text-red-600">
//            <FaTrashAlt />
//  Bin
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Deleted notes appear here. Restore or permanently delete them.
//           </p>
//         </div>

//         <button
//           onClick={() => navigate("/home")}
//           className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg 
//           hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
//         >
//           <FiArrowLeft size={18} /> Back
//         </button>
//       </div>

//       {/* Empty State */}
//       {binNotes.length === 0 ? (
//         <div className="text-center mt-20 animate-fade-in">
//           <p className="text-gray-500 text-xl">✨ Your bin is empty!</p>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {binNotes.map((note, index) => (
//             <div
//               key={note.id}
//               className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-md border border-gray-200 
//               hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-[scale_0.3s_ease-out]"
//               style={{ animationDelay: `${index * 70}ms` }}
//             >
//               <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
//                 {note.title}
//               </h2>

//               <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
//                 {note.content}
//               </p>

//               {/* Actions */}
//               <div className="flex justify-between items-center pt-3 border-t border-gray-200">
//                 <button
//                   onClick={() => handleRestore(note.id)}
//                   className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1.5 rounded-md
//                   hover:bg-green-200 transition-all duration-200 hover:scale-105"
//                 >
//                   <FiRotateCcw size={16} /> Restore
//                 </button>

//                 <button
//                   onClick={() => handlePermanentDelete(note.id)}
//                   className="flex items-center gap-1 text-red-600 bg-red-100 px-3 py-1.5 rounded-md
//                   hover:bg-red-200 transition-all duration-200 hover:scale-105"
//                 >
//                   <FiTrash2 size={16} /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
