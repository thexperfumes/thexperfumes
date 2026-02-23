// import { useEffect, useState } from "react";
// import adminApi from "../services/axios";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [count, setCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await adminApi.get("customers/", {
//         params: { search, page },
//       });

//       setUsers(res.data.results);
//       setCount(res.data.count);
//     } catch (err) {
//       console.error("Failed to load users", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, [page, search]);

//   const toggleUser = async (id) => {
//     if (!window.confirm("Are you sure you want to change user status?")) return;
//     await adminApi.post(`customers/${id}/toggle-status/`);
//     loadUsers();
//   };

//   const totalPages = Math.ceil(count / 20);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-white">
//         Loading customers...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-2xl font-bold mb-4 text-yellow-400">
//         Customer Management
//       </h1>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search name / email / mobile"
//         value={search}
//         onChange={(e) => {
//           setPage(1);
//           setSearch(e.target.value);
//         }}
//         className="mb-4 w-full max-w-md px-4 py-2 rounded bg-gray-800 border border-gray-700"
//       />

//       {/* TABLE */}
//       <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-950 text-yellow-400">
//             <tr>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Mobile</th>
//               <th className="px-4 py-3 text-center">Orders</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-8 text-gray-400">
//                   No customers found
//                 </td>
//               </tr>
//             ) : (
//               users.map((u) => (
//                 <tr key={u.id} className="border-t border-gray-700">
//                   <td className="px-4 py-3">{u.name || "-"}</td>
//                   <td className="px-4 py-3">{u.email}</td>
//                   <td className="px-4 py-3">{u.mobile || "-"}</td>
//                   <td className="px-4 py-3 text-center">
//                     {u.total_orders}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${
//                         u.is_active
//                           ? "bg-green-900 text-green-400"
//                           : "bg-red-900 text-red-400"
//                       }`}
//                     >
//                       {u.is_active ? "Active" : "Blocked"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => toggleUser(u.id)}
//                       className={`px-3 py-1 rounded text-sm ${
//                         u.is_active
//                           ? "bg-red-600"
//                           : "bg-green-600"
//                       }`}
//                     >
//                       {u.is_active ? "Block" : "Unblock"}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-4 mt-6">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="text-gray-400">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import adminApi from "../services/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // debounce search (wait 500ms after typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("customers/", {
        params: { search: debouncedSearch, page },
      });

      setUsers(res.data.results);
      setCount(res.data.count);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, debouncedSearch]);

  const toggleUser = async (id) => {
    if (!window.confirm("Are you sure you want to change user status?")) return;
    await adminApi.post(`customers/${id}/toggle-status/`);
    loadUsers();
  };

  const totalPages = Math.ceil(count / 20);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">
        Customer Management
      </h1>

      <input
        type="text"
        placeholder="Search name / email / mobile"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="mb-4 w-full max-w-md px-4 py-2 rounded bg-gray-800 border border-gray-700"
      />

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-950 text-yellow-400">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3 text-center">Orders</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No customers found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-gray-700">
                    <td className="px-4 py-3">{u.name || "-"}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.mobile || "-"}</td>
                    <td className="px-4 py-3 text-center">
                      {u.total_orders}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          u.is_active
                            ? "bg-green-900 text-green-400"
                            : "bg-red-900 text-red-400"
                        }`}
                      >
                        {u.is_active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleUser(u.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          u.is_active
                            ? "bg-red-600"
                            : "bg-green-600"
                        }`}
                      >
                        {u.is_active ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-gray-400">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}