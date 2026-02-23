import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiSmartphone, FiCheck, FiX } from "react-icons/fi";
import { sendOtp, verifyOtp, registerUser } from "../services/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", otp: "", mobile: "", password: "", confirmPassword: "" });
  const [step, setStep] = useState(1); // OTP flow
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const passwordRules = {
    length: form.password.length >= 8,
    capital: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
  };
  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  /* ---------------- OTP ---------------- */
  const handleSendOtp = async () => {
    if (!form.email) return alert("Enter your email");
    try { setLoading(true); await sendOtp(form.email); setStep(2); } 
    catch (err) { alert(err.response?.data?.error || "Failed to send OTP"); } 
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    if (!form.otp) return alert("Enter OTP");
    try { setLoading(true); await verifyOtp(form.email, form.otp); setStep(3); } 
    catch (err) { alert(err.response?.data?.error || "Invalid OTP"); } 
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) return alert("Password does not meet requirements");
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");

    try { setLoading(true); await registerUser({ name: form.name, email: form.email, mobile: form.mobile, password: form.password }); navigate("/login"); } 
    catch (err) { alert(err.response?.data?.error || "Registration failed"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6">
      <form className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-gray-900/90 backdrop-blur-lg border border-yellow-500/20 shadow-2xl flex flex-col gap-5 transition-all duration-300"
            onSubmit={handleSubmit}>
        
        <h2 className="text-2xl sm:text-2xl text-yellow-400 text-center tracking-widest font-semibold mb-6">
          CREATE ACCOUNT
        </h2>

        {/* STEP 1 & 2 */}
        {step <= 2 && (
          <>
            <Input icon={<FiMail />} name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} disabled={step > 1} required />
            {step === 1 && <Button loading={loading} onClick={handleSendOtp}>Send OTP</Button>}
            {step === 2 && (
              <>
                <Input name="otp" placeholder="Enter OTP" value={form.otp} onChange={handleChange} required />
                <Button loading={loading} onClick={handleVerifyOtp}>Verify OTP</Button>
              </>
            )}
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <Input icon={<FiUser />} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <Input icon={<FiSmartphone />} name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />

            <Input icon={<FiLock />} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <div className="text-sm space-y-1 mt-2">
              <Rule label="Minimum 8 characters" valid={passwordRules.length} />
              <Rule label="One uppercase letter" valid={passwordRules.capital} />
              <Rule label="One number" valid={passwordRules.number} />
              <Rule label="One special character" valid={passwordRules.special} />
            </div>

            <Input icon={<FiLock />} name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

            <button type="submit" disabled={loading || !isPasswordValid}
              className={`py-3 rounded-xl font-semibold transition-all duration-300 text-lg ${
                loading || !isPasswordValid ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-400 text-black hover:scale-105 hover:shadow-lg"
              }`}>
              {loading ? "Registering..." : "Register"}
            </button>
          </>
        )}

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Input = ({ icon, ...props }) => (
  <div className="relative">
    {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
    <input {...props} className="w-full bg-gray-800/70 text-white px-10 py-3 rounded-xl border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all duration-300 text-sm sm:text-base" />
  </div>
);

const Button = ({ children, loading, onClick }) => (
  <button type="button" disabled={loading} onClick={onClick} className="bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-md transition-all duration-300 w-full text-center">
    {loading ? "Processing..." : children}
  </button>
);

const Rule = ({ label, valid }) => (
  <div className={`flex items-center gap-2 ${valid ? "text-green-400" : "text-gray-400"} transition-colors duration-300`}>
    {valid ? <FiCheck /> : <FiX />}
    <span>{label}</span>
  </div>
);