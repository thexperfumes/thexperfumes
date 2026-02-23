import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}
