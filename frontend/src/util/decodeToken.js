// utils/decodeToken.js
import { jwtDecode } from "jwt-decode";
const decodeToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};

export default decodeToken;
