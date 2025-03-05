import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";


function ContactUs() {
  return (
      <div className="container-xxl bg-white p-0">
      {/* Navigation */}
      <div className="container-xxl position-relative p-0" id="home">
        <Navbar page="contact" />
      </div>
    
      {/* Contact Information Section */}
      <div className="container-xxl py-5" id="contact">
        <ContactForm />
      </div>
      
      <Footer />
    </div>
  );
}

export default ContactUs;
