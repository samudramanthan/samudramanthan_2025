import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import Testimonial from "../components/Testimonial";

function ContactUs() {
  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl position-relative p-0" id="home">
        <Navbar />
      </div>
      <div className="container-xxl bg-primary contactus-header">
        <ContactForm />
      </div>
      <div className="container-xxl bg-white p-0">
        <Testimonial />
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
