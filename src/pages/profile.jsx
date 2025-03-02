import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileComponent from "../components/Profile";

function Profile() {

    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl position-relative p-0" id="home">
                <Navbar />
            </div>
            <div className="container-xxl py-5" id="pricing">
            <div className="container py-5 px-lg-5">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="text-primary-gradient fw-medium">Welcome to</h5>
                    <h1 className="mb-5">Samudramanthan'25</h1>
                </div>
                
                <ProfileComponent/> {/* Passing event data as prop */}
            </div>
        </div>
            <Footer />
        </div>
    );
}

export default Profile;
