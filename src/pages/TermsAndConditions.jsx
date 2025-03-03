import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="container-xxl bg-white p-0">
      {/* Navigation */}
      <div className="container-xxl position-relative p-0" id="home">
        <Navbar page="legal" />
      </div>

      {/* Terms and Conditions Section */}
      <div className="container-xxl py-5" id="terms">
        <div className="container py-5 px-lg-5">
          <h2 className="mb-4">Terms and Conditions</h2>
          <div className="legal-section">
            <h5>1. Acceptance of Terms</h5>
            <p>
              By accessing and using this website, you agree to comply with
              and be bound by these Terms and Conditions. If you do not agree to
              these terms, please do not use our website.
            </p>
            <h5>2. User Rights and Responsibilities</h5>
            <p>
              <strong>Usage:</strong> You agree to use the website for lawful
              purposes only and in a manner that does not infringe the rights of,
              restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
            <p>
              <strong>Accountability:</strong> You are responsible for any
              activity that occurs under your account and must maintain the
              confidentiality of your login credentials.
            </p>
            <h5>3. Intellectual Property Rights</h5>
            <p>
              All content on this website—including text, graphics, logos,
              images, and software—is the property of the website owner or its
              licensors. You are not permitted to modify, reproduce,
              distribute, or create derivative works of any content without
              express written permission.
            </p>
            <h5>4. Disclaimers</h5>
            <p>
              The website is provided on an "as is" and "as available" basis
              without warranties of any kind, either express or implied. We do
              not guarantee the accuracy, completeness, or timeliness of the
              information provided and are not responsible for any errors or
              omissions.
            </p>
            <h5>5. Limitation of Liability</h5>
            <p>
              In no event shall the website owner, its affiliates, or agents be
              liable for any direct, indirect, incidental, consequential, or
              punitive damages arising out of your access to, use of, or
              inability to use the website. This limitation applies regardless
              of whether the alleged liability is based on contract, tort,
              negligence, or any other legal theory.
            </p>
            <h5>6. Modifications to Terms</h5>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be posted on this page, and your continued
              use of the website constitutes your acceptance of the new terms.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
