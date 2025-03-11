import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    const showToastMessage = (message, type) => {
        if (type === "success") {
        toast.success(message);
        } else if (type === "warn") {
        toast.warning(message);
        } else {
        toast.error(message);
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToastMessage("Please fill all the fields", "error");
      return;
    }

    setLoading(true);
    const data = { email, password };

    try {
      const res = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/admin/login", data);
      console.log(res)
      if (res.data.status === "success") {
        localStorage.setItem("adminToken", res.data.token);
        showToastMessage("Login Successfully", "success");
        window.location.href = "/admin/dashboard";
      } else {
        showToastMessage("Login Failed", "error");
      }
    } catch (err) {
      showToastMessage(err?.response?.data?.message || "Login Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 p-5 shadow-lg rounded bg-light">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Username</label>
            <input
              type="email"
              className="form-control"
              id="email"
            //   placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
            //   placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="btn btn-primary-gradient rounded-pill py-3 px-5 w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
