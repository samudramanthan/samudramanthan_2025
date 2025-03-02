import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Screenshot() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      name === "" ||
      email === "" ||
      college === "" ||
      password === "" ||
      confirm_password === "" ||
      contact === ""
    ) {
      showToastMessage("Please fill all the fields", "error");
      return;
    } else if (!emailRegex.test(email)) {
      showToastMessage("Please enter a valid email address", "error");
      return;
    } else if (password !== confirm_password) {
      showToastMessage("Password does not match", "warn");
      return;
    } else {
      const data = {
        name,
        email,
        college,
        password,
        contact,
      };

      setLoading(true);
      axios
        .post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/register", data)
        .then((res) => {
          if (res.status === 201) {
            showToastMessage("Registration Successful", "success");
            // Redirect to the login page after a short delay
            setTimeout(() => {
              window.location.href = "/register";
            }, 1000);
          }
        })
        .catch((err) => {
          if (err.response) {
            const { status, data } = err.response;
            if (status === 400) {
              showToastMessage(data.message || "Registration failed", "error");
            } else if (status === 409) {
              showToastMessage(data.message || "User already registered", "warn");
            } else {
              showToastMessage(data.message || "Registration Failed. Please try again.", "error");
            }
          } else if (err.request) {
            showToastMessage("No response from server. Please check your connection.", "error");
          } else {
            showToastMessage("An error occurred. Please try again.", "error");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="wow fadeInUp" data-wow-delay="0.3s">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label>Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label>Your Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Subject"
                      name="college"
                      onChange={(e) => setCollege(e.target.value)}
                      required
                    />
                    <label>Your Institute name</label>
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
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label>Password</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      name="confirm_password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label>Confirm Password</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className="form-control"
                      id="contact"
                      placeholder="Your Contact"
                      name="contact"
                      pattern="[0-9]{10}"
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                    <label>Contact number</label>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button
                    className="btn btn-primary-gradient rounded-pill py-3 px-5 mt-0 ml-0"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
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
