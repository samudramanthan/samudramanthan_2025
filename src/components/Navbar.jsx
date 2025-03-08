import { event } from "jquery";
import React, { useState } from "react";
import { Events } from "react-scroll";

function Navbar({ page }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const home = page === "home" ? " active" : "";
  const event = page === "event" ? " active" : "";
  const about = page === "about" ? " active" : "";
  const gallery = page === "gallery" ? " active" : "";
  const team = page === "team" ? " active" : "";
  const accommodation = page === "accomodation" ? " active" : "";
  const cap = page === "cap" ? " active" : "";
  const schedule = page === "schedule" ? " active" : "";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar sticky-top shadow-sm navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <a href="/" className="navbar-brand p-0">
          <h1 className="m-0">NAROES</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ml-auto py-0">
            <a href="/" className={"nav-item nav-link" + home}>
              Home
            </a>
            <a href="/events" className={"nav-item nav-link" + event}>
              Events
            </a>
            <a href="/about" className={"nav-item nav-link" + about}>
              About
            </a>
            <a href="/gallery" className={"nav-item nav-link" + gallery}>
              Gallery
            </a>
            <a href="/team" className={"nav-item nav-link" + team}>
              Our Team
            </a>
            <a href="https://rzp.io/l/NmRVDe7" className={"nav-item nav-link" + accommodation}>
              Accommodation
            </a>
            {/* <a href="/cap" className={"nav-item nav-link" + cap}>
              CAP
            </a> */}
            <a href="/schedule" className={"nav-item nav-link" + schedule}>
              Schedule
            </a>
          </div>

          {localStorage.getItem("token") ? (
            <>
              <button
                className="btn btn-primary-gradient rounded-circle p-2.5 mx-3"
                onClick={toggleSidebar}
              >
                <i className="fa fa-user"></i>
              </button>
            </>
          ) : (
            <a
              href="/register"
              className="btn btn-primary-gradient rounded-pill py-2 px-4 navbar-nav"
            >
              Register
            </a>
          )} 
        </div>
      </nav>

      {/* Sidebar for Profile Menu */}
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isSidebarOpen ? "0" : "-300px",
          width: "250px",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: "-2px 0 5px rgba(0,0,0,0.2)",
          transition: "right 0.3s ease-in-out",
          padding: "20px",
          zIndex: 1000,
        }}
      >
        <button
          className="btn-close"
          onClick={toggleSidebar}
          style={{ position: "absolute", right: "10px", top: "10px" }}
        ></button>
        <h5 className="mb-4">Profile</h5>
        <ul className="list-unstyled">
          <li>
            <a href="/profile" className="nav-link">
              View Profile
            </a>
          </li>
          {/* <li>
            <a href="/registered-events" className="nav-link">
              Registered Events
            </a>
          </li>
          <li>
            <a href="/accommodation" className="nav-link">
              Accommodation
            </a>
          </li> */}
          <li>
            <p className="nav-link" style={{cursor: 'pointer'}} onClick={logout}>
              Logout
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
