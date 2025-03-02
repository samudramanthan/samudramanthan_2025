import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [smid, setSmid] = useState("");
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

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!smid || !password) {
      showToastMessage("Please fill all the fields", "error");
      return;
    }
    if (!emailRegex.test(smid)) {
      showToastMessage("Please enter a valid email address", "error");
      return;
    }

    setLoading(true);
    const data = { email: smid, password: password };

    try {
      const res = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/login", data);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        showToastMessage("Login Successfully", "success");
        window.location.href = "/"; // Redirect after successful login
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
    <>
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="wow fadeInUp" data-wow-delay="0.3s">
            <form >
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your email"
                      name="email"
                      value={smid}
                      onChange={(e) => setSmid(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Your Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary-gradient rounded-pill py-3 px-5"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
