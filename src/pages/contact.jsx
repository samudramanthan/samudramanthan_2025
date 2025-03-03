import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactInfo() {
  return (
    <div className="container-xxl bg-white p-0">
      {/* Navigation */}
      <div className="container-xxl position-relative p-0" id="home">
        <Navbar page="contact" />
      </div>

      {/* Contact Information Section */}
      <div className="container-xxl py-5" id="contact">
        <div className="container py-5 px-lg-5">
          <h2 className="mb-4">Contact Us</h2>
          <p className="text-muted mb-4">We'd love to hear from you!</p>
          
          {/* Contact Details */}
          <div className="contact-info mb-5">
            <h5>Email</h5>
            <p>samudramanthan.iitkgp.2025@gmail.com</p>
            <h5>Phone</h5>
            <p>8688906547</p>
            <h5>Address</h5>
            <p>Indian Institute of Technology Kharagpur, Kharagpur, West Bengal 721302 India</p>
          </div>
          
          {/* Contact Form */}
          {/* <div className="contact-form">
            <h5>Send us a message</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary-gradient py-sm-3 px-4 px-sm-5 rounded-pill mt-3"
              >
                Submit
              </button>
            </form>
          </div> */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
