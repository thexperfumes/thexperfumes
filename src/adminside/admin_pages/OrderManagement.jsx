// import { useEffect, useState } from "react";
// import adminApi from "../services/axios";
// import { downloadInvoice } from "../services/downloadInvoice";

// export default function OrderManagement() {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [search, setSearch] = useState("");

//   /* ================= Fetch Orders ================= */
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (fromDate) params.start_date = fromDate;
//       if (toDate) params.end_date = toDate;

//       const res = await adminApi.get("orders/admin/", { params });
//       setOrders(res.data || []);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch orders");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [fromDate, toDate]);

//   /* ================= Search & Filter ================= */
//   useEffect(() => {
//     let data = [...orders];
//     if (search) {
//       data = data.filter(
//         (o) =>
//           o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
//           String(o.order_id).includes(search) ||
//           o.customer_email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     setFilteredOrders(data);
//   }, [orders, search]);

//   /* ================= Download Invoices ================= */
//   const downloadPDF = (id) =>
//     downloadInvoice({ orderId: id, type: "pdf", role: "admin" });
//   const downloadExcel = (id) =>
//     downloadInvoice({ orderId: id, type: "excel", role: "admin" });
//   const downloadCSV = (id) =>
//     downloadInvoice({ orderId: id, type: "csv", role: "admin" });

//   /* ================= Status Colors ================= */
//   const statusColors = {
//     PENDING: "bg-yellow-600 text-black",
//     CONFIRMED: "bg-green-600 text-white",
//     SHIPPED: "bg-blue-600 text-white",
//     CANCELLED: "bg-red-600 text-white",
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen p-6 bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6 text-yellow-400">
//         Order Management
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           className="p-2 bg-gray-800 border border-gray-600 rounded"
//         />
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           className="p-2 bg-gray-800 border border-gray-600 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Search by customer/email/order ID"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded"
//         />
//       </div>

//       {loading && <p className="text-center text-gray-400">Loading…</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && filteredOrders.length > 0 && (
//         <div className="overflow-x-auto rounded border border-gray-700">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-800 text-yellow-400">
//               <tr>
//                 {[
//                   "Order ID",
//                   "Customer",
//                   "Email",
//                   "Total",
//                   "Status",
//                   "Date",
//                   "Invoice",
//                 ].map((h) => (
//                   <th key={h} className="p-3 text-left">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((o) => (
//                 <tr key={o.id} className="border-b border-gray-700 hover:bg-gray-800">
//                   <td className="p-3">#{o.order_id}</td>
//                   <td className="p-3">{o.customer_name}</td>
//                   <td className="p-3">{o.customer_email || "-"}</td>
//                   <td className="p-3">₹ {o.total_amount}</td>
//                   <td className="p-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-semibold ${
//                         statusColors[o.status] || "bg-gray-600"
//                       }`}
//                     >
//                       {o.status}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                     {new Date(o.created_at).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 flex gap-2">
//                     <button
//                       onClick={() => downloadPDF(o.id)}
//                       className="bg-red-600 px-2 py-1 rounded text-xs"
//                     >
//                       PDF
//                     </button>
//                     <button
//                       onClick={() => downloadExcel(o.id)}
//                       className="bg-green-600 px-2 py-1 rounded text-xs"
//                     >
//                       Excel
//                     </button>
//                     <button
//                       onClick={() => downloadCSV(o.id)}
//                       className="bg-blue-600 px-2 py-1 rounded text-xs"
//                     >
//                       CSV
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {!loading && filteredOrders.length === 0 && (
//         <p className="text-center text-gray-400">No orders found</p>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import adminApi from "../services/axios";
import { downloadInvoice } from "../services/downloadInvoice";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  /* ================= Fetch Orders ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {};
      if (fromDate) params.start_date = fromDate;
      if (toDate) params.end_date = toDate;

      const res = await adminApi.get("orders/admin/", { params });
      setOrders(res.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fromDate, toDate]);

  /* ================= Search Filter ================= */
  useEffect(() => {
    let data = [...orders];

    if (search) {
      data = data.filter(
        (o) =>
          o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
          String(o.order_id).includes(search) ||
          o.customer_email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredOrders(data);
  }, [orders, search]);

  /* ================= Download PDF Only ================= */
  const downloadPDF = (id) => {
    downloadInvoice({ orderId: id });
  };

  /* ================= Status Colors ================= */
  const statusColors = {
    PENDING: "bg-yellow-600 text-black",
    CONFIRMED: "bg-green-600 text-white",
    SHIPPED: "bg-blue-600 text-white",
    CANCELLED: "bg-red-600 text-white",
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        Order Management
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <input
          type="text"
          placeholder="Search by customer/email/order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded"
        />
      </div>

      {loading && <p className="text-center text-gray-400">Loading…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && filteredOrders.length > 0 && (
        <div className="overflow-x-auto rounded border border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800 text-yellow-400">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Email",
                  "Total",
                  "Status",
                  "Date",
                  "Invoice",
                ].map((h) => (
                  <th key={h} className="p-3 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">#{o.order_id}</td>
                  <td className="p-3">{o.customer_name}</td>
                  <td className="p-3">{o.customer_email || "-"}</td>
                  <td className="p-3">₹ {o.total_amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        statusColors[o.status] || "bg-gray-600"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => downloadPDF(o.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-semibold"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredOrders.length === 0 && (
        <p className="text-center text-gray-400">No orders found</p>
      )}
    </div>
  );
}