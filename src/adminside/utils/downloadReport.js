export const downloadReport = async ({
  adminApi,
  endpoint,
  from,
  to,
  filename,
}) => {
  if (!from || !to) {
    alert("Please select date range");
    return;
  }

  try {
    const res = await adminApi.get(endpoint, {
      params: { from, to },
      responseType: "blob", // 🔑 IMPORTANT
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Download failed. Please check permissions or server.");
  }
};
