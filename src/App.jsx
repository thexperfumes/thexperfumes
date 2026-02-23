import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin
import AdminApp from "./adminside/AdminApp";
// Customer
import CustomerApp from "./customerside/CustomerApp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </Router>
  );
}
