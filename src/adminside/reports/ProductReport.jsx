import { useEffect, useState } from "react";
import adminApi from "../services/axios";
import { FileDown } from "lucide-react";
import { downloadReport } from "../utils/downloadReport";

export default function ProductReport() {
  const [summary, setSummary] = useState(null);
  const [products, setProducts] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("products/", {
        params: {
          start_date: from || undefined,
          end_date: to || undefined,
        },
      });
      setSummary(res.data.summary);
      setProducts(res.data.products);
    } catch (err) {
      console.error("Product report error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  /* ✅ EXCEL ONLY */
  const downloadExcel = () => {
    downloadReport({
      adminApi,
      endpoint: "products/reports/",
      from,
      to,
      filename: `products_report_${from || "all"}_to_${to || "all"}.xlsx`,
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-950 text-gray-100">
      <h1 className="text-3xl font-bold text-yellow-400 mb-1">
        Product Report
      </h1>
      <p className="text-gray-400 mb-6">
        Product-wise business performance
      </p>

      {/* FILTERS */}
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex gap-3 mb-6">
        <input
          type="date"
          onChange={(e) => setFrom(e.target.value)}
          className="bg-black border border-gray-700 px-3 py-2 rounded-md [color-scheme:dark]"
        />
        <input
          type="date"
          onChange={(e) => setTo(e.target.value)}
          className="bg-black border border-gray-700 px-3 py-2 rounded-md [color-scheme:dark]"
        />

        <button
          onClick={fetchReport}
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

      {/* KPI */}
      {summary && (
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <KPI title="Revenue" value={`₹${summary.total_revenue}`} />
          <KPI title="Units Sold" value={summary.total_units} />
          <KPI title="Profit" value={`₹${summary.total_profit}`} />
          <KPI title="Top Product" value={summary.top_product} />
        </div>
      )}

      {/* TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-yellow-400">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Sold</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Profit</th>
              <th className="px-4 py-3">Margin %</th>
              <th className="px-4 py-3">Stock</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              products.map((p, i) => (
                <tr
                  key={p.product_id}
                  className="border-b border-gray-800 hover:bg-gray-800"
                >
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{p.product}</td>
                  <td className="px-4 py-3">{p.sold_qty}</td>
                  <td className="px-4 py-3 text-green-400">
                    ₹{p.revenue}
                  </td>
                  <td className="px-4 py-3 text-green-400">
                    ₹{p.profit}
                  </td>
                  <td className="px-4 py-3">{p.margin}%</td>
                  <td
                    className={`px-4 py-3 ${
                      p.stock < 10 ? "text-red-400" : ""
                    }`}
                  >
                    {p.stock}
                  </td>
                </tr>
              ))}

            {!loading && products.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* COMPONENTS */

const KPI = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-2xl font-bold text-yellow-400">{value}</p>
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
