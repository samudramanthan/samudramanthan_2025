import React from "react";
import Testimonial from "../components/Testimonial";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";
import History from "../components/History";

export default function About() {
    return(
        <>
        <div className="container-xxl bg-white p-0">
        <div className="container-xxl position-relative p-0" id="home">
          <Navbar page="about"/>
        </div>
        <AboutSection />
        <History />
        <Testimonial />
        <Footer />
      </div>
        </>
    );
}