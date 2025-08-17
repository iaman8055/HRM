import { useEffect, useState } from "react";
import logo from "../../assets/images/Logo.svg";
import pic from "../../assets/images/Rectangle 77.svg";
import "./SignUp.css";
import API from "../../util/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
    const navigate = useNavigate();
    const token =localStorage.getItem("token");

  useEffect(()=>{
  if(token){
    navigate('/candidates',{ replace: true })
  }
  },[navigate, token])

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await API.post("auth/signup", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      setSuccess("Registration successful!");
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tokenExpiry", expiryTime);

      navigate("/candidates")
      
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";
      setError(msg);
    }
  };

  return (
    <div className="main">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="main-content-signup">
        <div className="left">
          <div className="left-main">
            <img src={pic} alt="Side Illustration" />
            <div className="left-content">
              <p className="heading">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
              </p>
              <p className="sub">
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <h2>Welcome to Dashboard</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">
                Full name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full name"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">
                Password<span className="required">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye-toggle"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="eye-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.83 21.83 0 0 1 5.06-6.88" />
                    <path d="M1 1l22 22" />
                    <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                    <path d="M12 4a10.94 10.94 0 0 1 9 5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="eye-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>

            <div className="form-group password-group">
              <label htmlFor="confirmPassword">
                Confirm Password<span className="required">*</span>
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="eye-toggle"
              >
                {showConfirm ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="eye-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.83 21.83 0 0 1 5.06-6.88" />
                    <path d="M1 1l22 22" />
                    <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                    <path d="M12 4a10.94 10.94 0 0 1 9 5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="eye-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <div className="login-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
