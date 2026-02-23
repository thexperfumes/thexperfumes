import { useEffect, useState } from "react";
import customerApi from "../services/api"; 
import { FiUser, FiPhone, FiCalendar, FiMapPin, FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    gender: "",
    dob: "",
    address: "",
  });

  useEffect(() => {
    customerApi
      .get("profile/")
      .then((res) => {
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          mobile: res.data.mobile || "",
          gender: res.data.gender || "",
          dob: res.data.dob || "",
          address: res.data.address || "",
        });
      })
      .catch((err) => {
        console.error("Profile load error", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!user) return;
    const isChanged = Object.keys(form).some((key) => form[key] !== (user[key] || ""));
    if (!isChanged) {
      toast("No changes detected.", { icon: "⚠️" });
      return;
    }
    try {
      setLoading(true);
      const res = await customerApi.put("profile/", form);
      setUser(res.data);
      setIsEditing(false);
      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("authChanged"));
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error", err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setForm({
      name: user.name || "",
      mobile: user.mobile || "",
      gender: user.gender || "",
      dob: user.dob || "",
      address: user.address || "",
    });
    setIsEditing(false);
  };

  if (!user)
    return (
      <p className="text-white text-center mt-20 text-lg">Loading profile...</p>
    );

  const isSaveDisabled = !Object.keys(form).some(
    (key) => form[key] !== (user[key] || "")
  );

  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gold/20 blur-[100px] rounded-full top-[-80px] left-[-80px]" />
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gold/20 blur-[100px] rounded-full bottom-[-80px] right-[-80px]" />

      <Toaster position="top-right" />

      <div className="relative w-full max-w-4xl backdrop-blur-xl bg-white/5 border border-gold/20 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.15)] p-6 sm:p-8 md:p-12 transition-all duration-500">

        {/* Avatar + Header */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-8 sm:mb-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-2xl sm:text-3xl text-gold font-bold shadow-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-gold tracking-wide">{user.name}</h1>
              <p className="text-gray-400 text-sm sm:text-base">Manage your personal information</p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-gold text-black px-4 sm:px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-md text-sm sm:text-base"
            >
              <FiEdit /> Edit Profile
            </button>
          )}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Field label="Name" icon={<FiUser />}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-sm sm:text-base"
              placeholder="Enter full name"
            />
          </Field>

          <Field label="Mobile" icon={<FiPhone />}>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-sm sm:text-base"
              placeholder="Enter mobile number"
            />
          </Field>

          <Field label="Gender" full>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-sm sm:text-base"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Date of Birth" icon={<FiCalendar />}>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-sm sm:text-base"
            />
          </Field>

          <Field label="Address" icon={<FiMapPin />} full>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-sm sm:text-base"
              placeholder="Enter full address"
            />
          </Field>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-10 justify-center">
            <button
              onClick={handleSave}
              disabled={loading || isSaveDisabled}
              className={`bg-gold text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                loading || isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleCancel}
              className="border border-gray-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, full, icon }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-sm sm:text-base text-gray-400 flex items-center gap-2 mb-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}