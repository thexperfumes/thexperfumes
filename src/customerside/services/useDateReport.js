import { useState } from "react";

export default function useDateReport(apiPath) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const download = (type) => {
    if (!from || !to) {
      alert("Select From and To dates");
      return;
    }

    window.open(
      `https://backend-sxms.onrender.com/api/${apiPath}/${type}/?from=${from}&to=${to}`,
      "_blank"
    );
  };

  return { setFrom, setTo, download };
}
