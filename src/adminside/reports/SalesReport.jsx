import { useEffect, useState } from "react";
import adminApi from "../services/axios";
import { FileDown } from "lucide-react";
import { downloadReport } from "../utils/downloadReport";

/* ================== HELPERS ================== */
const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

/* ================== MAIN COMPONENT ================== */
export default function SalesReport() {
  const [summary, setSummary] = useState(null);
  const [dailySales, setDailySales] = useState([]);
  const [paymentSplit, setPaymentSplit] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const hasData = dailySales.length > 0;

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("sales/", {
        params: {
          start_date: from || undefined,
          end_date: to || undefined,
        },
      });

      setSummary(res.data.summary);
      setDailySales(res.data.daily_sales);
      setPaymentSplit(res.data.payment_split);
    } catch (err) {
      console.error("Failed to load sales report", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  /* ✅ EXCEL DOWNLOAD ONLY */
  const downloadExcel = () => {
    downloadReport({
      adminApi,
      endpoint: "sales/reports/", // Django endpoint
      from,
      to,
      filename: `sales_report_${from || "all"}_to_${to || "all"}.xlsx`,
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-950 text-gray-100">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">Sales Report</h1>
        <p className="text-gray-400 text-sm mt-1">
          Business performance overview
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
          onClick={fetchSales}
          className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold"
        >
          Apply
        </button>

        <div className="ml-auto">
          <DownloadBtn
            label="Download Excel"
            color="bg-green-500"
            disabled={!hasData}
            onClick={downloadExcel}
          />
        </div>
      </div>

      {/* KPI SUMMARY */}
      {summary && (
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <KPI title="Revenue" value={formatMoney(summary.total_revenue)} />
          <KPI title="Total Orders" value={summary.total_orders} />
          <KPI title="Completed" value={summary.completed_orders} />
          <KPI title="Cancelled" value={summary.cancelled_orders} />
          <KPI
            title="AOV"
            value={formatMoney(summary.average_order_value)}
          />
        </div>
      )}

      {/* DAILY SALES */}
      <Section title="Daily Sales">
        <Table
          headers={["Date", "Orders", "Revenue"]}
          rows={dailySales.map((d) => [
            d.date,
            d.total_orders,
            formatMoney(d.total_amount),
          ])}
          emptyText={
            from || to
              ? "No sales found for selected date range"
              : "No sales data available"
          }
          loading={loading}
        />
      </Section>

      {/* PAYMENT SPLIT */}
      <Section title="Payment Mode Breakdown">
        <Table
          headers={["Payment Mode", "Orders", "Revenue"]}
          rows={paymentSplit.map((p) => [
            p.payment_mode,
            p.total_orders,
            formatMoney(p.total_amount),
          ])}
          emptyText="No payment data available"
        />
      </Section>
    </div>
  );
}

/* ================== REUSABLE COMPONENTS ================== */

const KPI = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-2xl font-bold text-yellow-400 mt-1">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-yellow-400 mb-3">{title}</h2>
    {children}
  </div>
);

const Table = ({ headers, rows, emptyText, loading }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-black text-yellow-400">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={headers.length} className="text-center py-6">
                Loading...
              </td>
            </tr>
          )}

          {!loading && rows.length === 0 && (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-6 text-gray-500"
              >
                {emptyText}
              </td>
            </tr>
          )}

          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-800 hover:bg-gray-800"
            >
              {row.map((cell, idx) => (
                <td key={idx} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DownloadBtn = ({ label, color, onClick, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center gap-2 ${color} text-black px-4 py-2 rounded-md font-semibold
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <FileDown size={16} /> {label}
  </button>
);
