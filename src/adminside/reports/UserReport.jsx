import { useEffect, useState } from "react";
import adminApi from "../services/axios";
import { FileDown, Users } from "lucide-react";
import { downloadReport } from "../utils/downloadReport";

export default function UserReport() {
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("users/", {
        params: {
          start_date: from || undefined,
          end_date: to || undefined,
        },
      });
      setSummary(res.data.summary);
      setUsers(res.data.users);
    } catch (err) {
      console.error("User report error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ✅ EXCEL ONLY */
  const downloadExcel = () => {
    downloadReport({
      adminApi,
      endpoint: "users/reports/",
      from,
      to,
      filename: `user_report_${from || "all"}_to_${to || "all"}.xlsx`,
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-950 text-gray-100">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-2">
          <Users size={28} /> User Report
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Customer value & engagement overview
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="bg-black text-white border border-gray-700 px-3 py-2 rounded-md [color-scheme:dark]"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="bg-black text-white border border-gray-700 px-3 py-2 rounded-md [color-scheme:dark]"
        />

        <button
          onClick={fetchUsers}
          className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold"
        >
          Apply
        </button>

        <div className="ml-auto">
          <DownloadBtn
            label="Download Excel"
            color="bg-green-500"
            onClick={downloadExcel}
          />
        </div>
      </div>

      {/* KPI SUMMARY */}
      {summary && (
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <KPI title="Total Users" value={summary.total_users} />
          <KPI title="Total Revenue" value={`₹${summary.total_revenue}`} />
          <KPI title="Repeat Customers" value={summary.repeat_customers} />
          <KPI title="Top Customer" value={summary.top_customer || "-"} />
        </div>
      )}

      {/* TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto max-h-[500px]">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-black text-yellow-400">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Spent</th>
                <th className="px-4 py-3">AOV</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-400">
                    Loading…
                  </td>
                </tr>
              ) : users.length ? (
                users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-800 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.total_orders}</td>
                    <td className="px-4 py-3 text-green-400">
                      ₹{u.total_spent}
                    </td>
                    <td className="px-4 py-3">
                      ₹{u.average_order_value}
                    </td>
                    <td className="px-4 py-3">{u.customer_type}</td>
                    <td className="px-4 py-3">
                      {u.last_order
                        ? new Date(u.last_order).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-400">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

const KPI = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-2xl font-bold text-yellow-400 mt-1">{value}</p>
  </div>
);

const DownloadBtn = ({ label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 ${color} text-black px-4 py-2 rounded-md font-semibold`}
  >
    <FileDown size={16} /> {label}
  </button>
);
