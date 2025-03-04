import React from "react";  
import { Link } from "react-scroll";  

function Hero() {

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("smid");
        window.location.href = "/";
    }

    return (
        <>
            <div className="container-xxl bg-primary hero-header">
                <div className="container px-lg-5">
                    <div className="row g-5">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h1 className="text-white mb-4 animated slideInDown">Welcome to Samudramanthan</h1>
                            <p className="text-white pb-3 animated slideInDown">Dive deep into the mythical waters of Samudramanthan, where gods and demons join forces to stir the ocean's depths and reveal its timeless wonders.</p>
                            {/* <p className="text-white pb-3 animated slideInDown">Our website is currently in test mode. Please follow our social media for updates. Some event details may be incorrect, but we will update them within the next two days. </p> */}
                            <p className="text-white pb-3 animated slideInDown"><b>17th Samudramanthan scheduled from 21st March 2025 to 23rd March 2025 </b></p>
                            {localStorage.getItem("token") ? (
                                
                                <a onClick={logout} className="btn btn-primary-gradient py-sm-3 px-4 px-sm-5 rounded-pill me-3 animated slideInLeft">Logout</a>
                            ) : (
                                <a href="/register" className="btn btn-primary-gradient py-sm-3 px-4 px-sm-5 rounded-pill me-3 animated slideInLeft">Register</a>
                            )}
                            {/* <a href="https://rzp.io/l/NmRVDe7" className="btn btn-primary-gradient py-sm-3 px-4 px-sm-5 rounded-pill me-3 animated slideInLeft">Register</a> */}
                           <a href="/contactus" className="btn btn-secondary-gradient py-sm-3 px-4 px-sm-5 rounded-pill animated slideInRight"
                            >Contact Us</a>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-center justify-content-lg-end wow fadeInUp mt-0" data-wow-delay="0.3s">
                            <img className="img-fluid" src="img/logo.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;