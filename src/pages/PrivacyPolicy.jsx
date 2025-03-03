import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Legal() {
  return (
    <div className="container-xxl bg-white p-0">
      {/* Navigation */}
      <div className="container-xxl position-relative p-0" id="home">
        <Navbar page="legal" />
      </div>

      {/* Privacy Policy Section */}
      <div className="container-xxl py-5" id="privacy">
        <div className="container py-5 px-lg-5">
          <h2 className="mb-4">Privacy Policy</h2>
          <div className="legal-section">
            <h5>1. Introduction</h5>
            <p>
              This Privacy Policy explains how we collect, use, store, and
              protect your personal data when you use our website. By using our
              website, you consent to the practices described herein.
            </p>
            <h5>2. Information Collection</h5>
            <p>
              <strong>Personal Data:</strong> We may collect personal
              information such as your name, email address, phone number, and any
              other details you provide when registering or contacting us.
            </p>
            <p>
              <strong>Usage Data:</strong> Information regarding your
              interactions with our website (e.g., IP address, browser type, and
              pages visited) may be collected automatically.
            </p>
            <h5>3. Purpose of Data Collection</h5>
            <p>We use the collected data to:</p>
            <ul>
              <li>Provide, maintain, and improve our services.</li>
              <li>Process transactions and send related information.</li>
              <li>
                Communicate updates, promotional materials, and customer
                support messages.
              </li>
              <li>Analyze website usage to enhance user experience.</li>
            </ul>
            <h5>4. Data Sharing and Disclosure</h5>
            <p>
              <strong>Third-Party Service Providers:</strong> We may share your
              data with trusted third-party providers who assist in operating our
              website, subject to confidentiality agreements.
            </p>
            <p>
              <strong>Legal Requirements:</strong> Your information may be
              disclosed if required by law or in response to valid requests by
              public authorities.
            </p>
            <h5>5. Data Storage and Security</h5>
            <p>
              We implement reasonable security measures to protect your personal
              information from unauthorized access, disclosure, alteration, or
              destruction. Despite our best efforts, no method of transmission
              over the Internet is entirely secure, and we cannot guarantee
              absolute security.
            </p>
            <h5>6. User Rights</h5>
            <p>
              <strong>Access and Correction:</strong> You have the right to
              access, correct, or update your personal information.
            </p>
            <p>
              <strong>Opt-Out:</strong> You may opt out of receiving
              promotional communications by following the unsubscribe
              instructions provided in those messages.
            </p>
            <h5>7. Cookies and Tracking Technologies</h5>
            <p>
              We use cookies and similar technologies to collect usage data and
              improve your browsing experience. You can control cookie
              preferences through your browser settings.
            </p>
            <h5>8. Changes to This Privacy Policy</h5>
            <p>
              We may update this policy from time to time. Any changes will be
              posted on this page with an updated effective date.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
