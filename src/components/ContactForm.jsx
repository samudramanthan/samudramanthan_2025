import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        // Backend API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="text-black animated slideInDown">
        Have Any Query? Let us know
      </h2>
      <div className="contact-info animated slideInRight">
        <p>
          <i className="fas fa-map-marker-alt"></i> Department of Ocean
          Engineering and Naval Architecture, IIT Kharagpur - 721302
        </p>
        <p>
          <i className="fas fa-phone"></i> +91 8688906547
        </p>
        <p>
          <i className="fas fa-phone"></i> +91 9451446743
        </p>

        <p>
          <i className="fas fa-envelope"></i>{" "}
          <a href="mailto:samudramanthan.iitkgp.2025@gmail.com">
            samudramanthan.iitkgp.2025@gmail.com
          </a>
        </p>

        <div className="social-links">
          <p>Get connected with us:</p>
          <a
            href="https://www.facebook.com/samudramanthan.iitkgp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/sm.iitkgp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/smiitkgp/?originalSubdomain=in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          {/* <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a> */}
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone No"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Share your queries here..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Submit</button>

        {status === "success" && (
          <p className="success-message">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="error-message">
            Failed to send message. Please try again.
          </p>
        )}
      </form> */}
    </div>
  );
};

export default ContactForm;
