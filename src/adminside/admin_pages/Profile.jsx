import Navbar from "../admin_components/AdminNavbar";

export default function Profile() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Profile</h2>
        <p>Name: {admin?.name}</p>
        <p>Email: {admin?.email}</p>
      </div>
    </>
  );
}
