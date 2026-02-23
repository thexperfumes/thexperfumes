import { FileDown } from "lucide-react";

export default function ReportDateFilter({ onDownload }) {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-gray-900 border border-gray-700 p-4 rounded-xl">
      {/* FROM DATE */}
      <input
        type="date"
        onChange={(e) => onDownload.setFrom(e.target.value)}
        className="
          bg-black 
          border border-gray-600 
          text-white 
          px-3 py-2 
          rounded-md
          focus:outline-none 
          focus:border-yellow-400 
          focus:ring-1 
          focus:ring-yellow-400
          [color-scheme:dark]
        "
      />

      {/* TO DATE */}
      <input
        type="date"
        onChange={(e) => onDownload.setTo(e.target.value)}
        className="
          bg-black 
          border border-gray-600 
          text-white 
          px-3 py-2 
          rounded-md
          focus:outline-none 
          focus:border-yellow-400 
          focus:ring-1 
          focus:ring-yellow-400
          [color-scheme:dark]
        "
      />

      {/* EXPORT BUTTONS */}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => onDownload.download("pdf")}
          className="
            flex items-center gap-2 
            px-4 py-2 
            rounded-md
            bg-yellow-400 
            text-black 
            font-semibold
            hover:bg-yellow-500 
            transition
          "
        >
          <FileDown size={16} /> PDF
        </button>

        <button
          onClick={() => onDownload.download("excel")}
          className="
            flex items-center gap-2 
            px-4 py-2 
            rounded-md
            bg-green-500 
            text-black 
            font-semibold
            hover:bg-green-600 
            transition
          "
        >
          <FileDown size={16} /> Excel
        </button>

        <button
          onClick={() => onDownload.download("csv")}
          className="
            flex items-center gap-2 
            px-4 py-2 
            rounded-md
            bg-blue-500 
            text-black 
            font-semibold
            hover:bg-blue-600 
            transition
          "
        >
          <FileDown size={16} /> CSV
        </button>
      </div>
    </div>
  );
}
