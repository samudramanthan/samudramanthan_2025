import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterSection from "../components/RegisterSection";
import Login from "../components/Login";

export default function Register() {
    return(
        <>
      <div className="container-xxl bg-white p-0">
        <div className="container-xxl position-relative p-0" id="home">
          <Navbar page="register" />
        </div>
        <div className="container-xxl py-5" id="pricing">
            <div className="container py-5 px-lg-5">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="text-primary-gradient fw-medium">Welcome to</h5>
                    <h1 className="mb-5">Samudramanthan'25</h1>
                </div>
                <div className="tab-class text-center pricing wow fadeInUp" data-wow-delay="0.1s">
                    <ul
                        className="nav nav-pills d-inline-flex justify-content-center bg-primary-gradient rounded-pill mb-5">
                        <li className="nav-item">
                            <button className="nav-link active" data-bs-toggle="pill" href="#tab-1">Login</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="pill" href="#tab-2">Register</button>
                        </li>
                    </ul>
                    <div className="tab-content text-start">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            < Login />
                        </div>
                        <div id="tab-2" className="tab-pane fade p-0">
                            <RegisterSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        
      </div>
    </>
    );
}