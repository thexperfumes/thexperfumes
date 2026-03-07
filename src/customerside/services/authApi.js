import axios from "axios";

const API =  baseAxios.create();

/* Send OTP */
export const sendOtp = async (email) => {
  const res = await API.post("/auth/send-otp/", { email });
  return res.data;
};

/* Verify OTP */
export const verifyOtp = async (email, otp) => {
  const res = await API.post("/auth/verify-otp/", { email, otp });
  return res.data;
};

/* Register User */
export const registerUser = async (data) => {
  const res = await API.post("/auth/register/", data);
  return res.data;
};
