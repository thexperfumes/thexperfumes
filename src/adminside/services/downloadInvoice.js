import adminApi from "../services/axios";

export const downloadInvoice = async ({ orderId }) => {
  try {
    const res = await adminApi.get(
      `orders/invoice/${orderId}/`,
      { responseType: "blob" }
    );

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice_${orderId}.pdf`;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Invoice download failed");
  }
};