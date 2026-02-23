// import { useEffect, useState } from "react";
// import adminApi from "../services/axios";

// /* Helper */
// const toDatetimeLocal = (value) => (value ? value.replace("Z", "").slice(0, 16) : "");

// export default function PopupManagement() {
//   const [popups, setPopups] = useState([]);
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     id: null,
//     title: "",
//     description: "",
//     coupon: "",
//     start_date: "",
//     end_date: "",
//     is_active: true,
//     is_popup: true,
//     image: null,
//   });

//   /* ================= FETCH ================= */
//   const loadPopups = async () => {
//     try {
//       setLoading(true);
//       const res = await adminApi.get("admin/promotions/");
//       setPopups(res.data);
//       setError("");
//     } catch {
//       setError("Failed to load popups");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCoupons = async () => {
//     try {
//       const res = await adminApi.get("coupons/");
//       setCoupons(res.data);
//     } catch {
//       console.error("Failed to load coupons");
//     }
//   };

//   useEffect(() => {
//     loadPopups();
//     loadCoupons();
//   }, []);

//   /* ================= FORM ================= */
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
//     });
//   };

//   const resetForm = () => {
//     setForm({
//       id: null,
//       title: "",
//       description: "",
//       coupon: "",
//       start_date: "",
//       end_date: "",
//       is_active: true,
//       is_popup: true,
//       image: null,
//     });
//     setShowForm(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (value !== null && value !== "") data.append(key, value);
//     });

//     try {
//       if (form.id) {
//         await adminApi.put(`admin/promotions/${form.id}/`, data);
//       } else {
//         await adminApi.post("admin/promotions/", data);
//       }
//       resetForm();
//       loadPopups();
//     } catch {
//       alert("Popup save failed");
//     }
//   };

//   const editPopup = (p) => {
//     setForm({
//       id: p.id,
//       title: p.title,
//       description: p.description,
//       coupon: p.coupon,
//       start_date: toDatetimeLocal(p.start_date),
//       end_date: toDatetimeLocal(p.end_date),
//       is_active: p.is_active,
//       is_popup: p.is_popup,
//       image: null,
//     });
//     setShowForm(true);
//   };

//   const toggleActive = async (id) => {
//     try {
//       await adminApi.post(`admin/promotions/toggle/${id}/`);
//       loadPopups();
//     } catch {
//       alert("Toggle failed");
//     }
//   };

//   const filteredPopups = popups.filter(
//     (p) =>
//       p.title.toLowerCase().includes(search.toLowerCase()) ||
//       (p.coupon_code?.toLowerCase() || "").includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gray-900 relative text-white">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-yellow-400">Popup Management</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2 rounded-md font-semibold"
//         >
//           Add Popup
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by title or coupon..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/3 p-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-yellow-400 focus:ring-2"
//         />
//       </div>

//       {/* Table */}
//       {loading ? (
//         <p className="text-gray-400">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : filteredPopups.length === 0 ? (
//         <p className="text-gray-400 text-center py-6">No popups found</p>
//       ) : (
//         <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
//           <table className="min-w-full border-collapse text-white">
//             <thead className="bg-gray-700 text-yellow-400">
//               <tr>
//                 <th className="px-4 py-2">Image</th>
//                 <th className="px-4 py-2">Title</th>
//                 <th className="px-4 py-2">Coupon</th>
//                 <th className="px-4 py-2">Start</th>
//                 <th className="px-4 py-2">End</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPopups.map((p) => (
//                 <tr key={p.id} className="hover:bg-gray-700 transition">
//                   <td className="px-2 py-2">
//                     {p.image ? <img src={p.image} className="w-16 h-16 rounded-md object-cover" /> : "—"}
//                   </td>
//                   <td className="px-4 py-2">{p.title}</td>
//                   <td className="px-4 py-2">{p.coupon_code || "—"}</td>
//                   <td className="px-4 py-2">{p.start_date?.slice(0, 16).replace("T", " ") || "—"}</td>
//                   <td className="px-4 py-2">{p.end_date?.slice(0, 16).replace("T", " ") || "—"}</td>
//                   <td className="px-4 py-2">
//                     <span className={`px-2 py-1 rounded-full text-sm font-semibold ${p.is_active ? "bg-yellow-400 text-gray-900" : "bg-red-500 text-white"}`}>
//                       {p.is_active ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <button onClick={() => editPopup(p)} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-md text-sm font-semibold">
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => toggleActive(p.id)}
//                       className={`px-3 py-1 rounded-md text-sm font-semibold ${p.is_active ? "bg-red-500 hover:bg-red-400 text-white" : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"}`}
//                     >
//                       {p.is_active ? "Deactivate" : "Activate"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Slide-in Form Panel */}
//       {showForm && (
//         <>
//           <div
//             className="fixed inset-0 bg-black bg-opacity-60 z-40"
//             onClick={resetForm}
//           ></div>
//           <div className="fixed right-0 top-0 w-full md:w-96 h-full bg-gray-900 shadow-2xl p-6 z-50 overflow-y-auto transition-transform animate-slide-in">
//             <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{form.id ? "Edit Popup" : "Add Popup"}</h2>
//             <form onSubmit={handleSubmit} className="space-y-4 text-white">
//               <div>
//                 <label className="block mb-1 text-yellow-400">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={form.title}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-yellow-400 focus:ring-2"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-yellow-400">Coupon</label>
//                 <select
//                   name="coupon"
//                   value={form.coupon}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-yellow-400 focus:ring-2"
//                 >
//                   <option value="">Select Coupon</option>
//                   {coupons.map((c) => (
//                     <option key={c.id} value={c.id}>{c.code}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block mb-1 text-yellow-400">Description</label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-yellow-400 focus:ring-2"
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 text-yellow-400">Start Date</label>
//                   <input
//                     type="datetime-local"
//                     name="start_date"
//                     value={form.start_date}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-yellow-400 focus:ring-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-yellow-400">End Date</label>
//                   <input
//                     type="datetime-local"
//                     name="end_date"
//                     value={form.end_date}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-yellow-400 focus:ring-2"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-1 text-yellow-400">Image</label>
//                 <input type="file" name="image" onChange={handleChange} />
//                 {form.image && (
//                   <img
//                     src={URL.createObjectURL(form.image)}
//                     alt="preview"
//                     className="w-24 h-24 mt-2 rounded-md object-cover"
//                   />
//                 )}
//               </div>

//               <div className="flex gap-6 items-center">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" name="is_popup" checked={form.is_popup} onChange={handleChange} />
//                   Popup
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
//                   Active
//                 </label>
//               </div>

//               <div className="flex gap-3 mt-2">
//                 <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2 rounded-md font-semibold">
//                   {form.id ? "Update" : "Add"}
//                 </button>
//                 <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-md font-semibold">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       )}

//       {/* Slide-in animation */}
//       <style>{`
//         @keyframes slide-in {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(0); }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease forwards;
//         }
//       `}</style>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import adminApi from "../services/axios";

/* Helper */
const toDatetimeLocal = (value) =>
  value ? value.replace("Z", "").slice(0, 16) : "";

export default function PopupManagement() {
  const [popups, setPopups] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    coupon: "",
    start_date: "",
    end_date: "",
    is_active: true,
    is_popup: true,
    image: null,
  });

  /* ================= FETCH ================= */
  const loadPopups = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("admin/promotions/");
      setPopups(res.data);
      setError("");
    } catch {
      setError("Failed to load popups");
    } finally {
      setLoading(false);
    }
  };

  const loadCoupons = async () => {
    try {
      const res = await adminApi.get("coupons/");
      setCoupons(res.data);
    } catch {
      console.error("Failed to load coupons");
    }
  };

  useEffect(() => {
    loadPopups();
    loadCoupons();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      coupon: "",
      start_date: "",
      end_date: "",
      is_active: true,
      is_popup: true,
      image: null,
    });
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") data.append(key, value);
    });

    try {
      if (form.id) {
        await adminApi.put(`admin/promotions/${form.id}/`, data);
      } else {
        await adminApi.post("admin/promotions/", data);
      }
      resetForm();
      loadPopups();
    } catch {
      alert("Popup save failed");
    }
  };

  const editPopup = (p) => {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description,
      coupon: p.coupon,
      start_date: toDatetimeLocal(p.start_date),
      end_date: toDatetimeLocal(p.end_date),
      is_active: p.is_active,
      is_popup: p.is_popup,
      image: null,
    });
    setShowForm(true);
  };

  const toggleActive = async (id) => {
    try {
      await adminApi.post(`admin/promotions/toggle/${id}/`);
      loadPopups();
    } catch {
      alert("Toggle failed");
    }
  };

  const filteredPopups = popups.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.coupon_code?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-900 relative text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-yellow-400">Popup Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2 rounded-md font-semibold transition"
        >
          Add Popup
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or coupon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-yellow-400 focus:ring-2"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredPopups.length === 0 ? (
        <p className="text-gray-400 text-center py-6">No popups found</p>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
          <table className="min-w-full border-collapse text-white">
            <thead className="bg-gray-700 text-yellow-400">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Coupon</th>
                <th className="px-4 py-2">Start</th>
                <th className="px-4 py-2">End</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPopups.map((p) => (
                <tr key={p.id} className="hover:bg-gray-700 transition">
                  <td className="px-2 py-2">
                    {p.image ? (
                      <img
                        src={p.image}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">{p.coupon_code || "—"}</td>
                  <td className="px-4 py-2">
                    {p.start_date?.slice(0, 16).replace("T", " ") || "—"}
                  </td>
                  <td className="px-4 py-2">
                    {p.end_date?.slice(0, 16).replace("T", " ") || "—"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        p.is_active
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => editPopup(p)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-md text-sm font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(p.id)}
                      className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                        p.is_active
                          ? "bg-red-500 hover:bg-red-400 text-white"
                          : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                      }`}
                    >
                      {p.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-in Form Panel */}
      {showForm && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={resetForm}
          ></div>

          {/* Panel */}
          <div className="fixed right-0 top-0 w-full md:w-96 h-full z-50 overflow-y-auto">
            <div className="bg-gray-800 h-full p-6 flex flex-col shadow-2xl rounded-l-2xl animate-slide-in">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {form.id ? "Edit Popup" : "Add Popup"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-yellow-400 text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
                {/* Title */}
                <div className="flex flex-col">
                  <label className="text-yellow-400 font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter popup title"
                    required
                    className="p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-yellow-400 focus:ring-1"
                  />
                </div>

                {/* Coupon */}
                <div className="flex flex-col">
                  <label className="text-yellow-400 font-medium mb-1">Coupon</label>
                  <select
                    name="coupon"
                    value={form.coupon}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-yellow-400 focus:ring-1"
                  >
                    <option value="">Select Coupon</option>
                    {coupons.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label className="text-yellow-400 font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Add popup description..."
                    className="p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-yellow-400 focus:ring-1"
                  />
                </div>

                {/* Start & End Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-yellow-400 font-medium mb-1">Start Date</label>
                    <input
                      type="datetime-local"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      className="p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-yellow-400 focus:ring-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-yellow-400 font-medium mb-1">End Date</label>
                    <input
                      type="datetime-local"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      className="p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-yellow-400 focus:ring-1"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                  <label className="text-yellow-400 font-medium mb-1">Image</label>
                  <input type="file" name="image" onChange={handleChange} />
                  {form.image && (
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="preview"
                      className="w-28 h-28 mt-2 rounded-lg object-cover border border-gray-600"
                    />
                  )}
                </div>

                {/* Toggles */}
                <div className="flex gap-6 items-center mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="is_popup" checked={form.is_popup} onChange={handleChange} className="accent-yellow-400" />
                    Popup
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="accent-yellow-400" />
                    Active
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg font-semibold transition"
                  >
                    {form.id ? "Update" : "Add"} Popup
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 py-2 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}