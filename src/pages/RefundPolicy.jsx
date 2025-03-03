import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CancellationRefundPolicy() {
  return (
    <div className="container-xxl bg-white p-0">
      {/* Navigation */}
      <div className="container-xxl position-relative p-0" id="home">
        <Navbar page="cancellation-refund" />
      </div>

      {/* Cancellation/Refund Policy Section */}
      <div className="container-xxl py-5" id="cancellation-refund">
        <div className="container py-5 px-lg-5">
          <h2 className="mb-4">Cancellation/Refund Policy</h2>
          <p className="text-muted mb-4">Effective Date: 21st March 2025 to 23rd March 2025</p>
          <div className="legal-section">
            <h5>1. Cancellation Policy</h5>
            <p>
              You may request cancellation of your order prior to the commencement of the fest. Once the fest has begun, or after it has concluded, cancellation requests will no longer be accepted.
            </p>
            <h5>2. Refund Eligibility</h5>
            <p>
              Refunds will be issued only for orders that meet our eligibility criteria as determined by the event organizers. All approved refund requests will be processed after the completion of the fest.
            </p>
            <h5>3. Refund Process and Timelines</h5>
            <p>
              After the fest concludes, we will review refund requests within 7 days. Once approved, refunds will be credited to your original payment method within 7 business days.
            </p>
            <h5>4. Fees and Charges</h5>
            <p>
              Any applicable processing fees or charges will be deducted from the refund amount. Details regarding these charges will be provided during the refund process.
            </p>
            <h5>5. How to Request a Refund</h5>
            <p>
              To request a refund, please contact our support team at <strong>samudramanthan.iitkgp.2025@gmail.com</strong> with your order details and a brief explanation of your cancellation request. We will acknowledge your request and provide further instructions.
            </p>
            <h5>6. Policy Modifications</h5>
            <p>
              We reserve the right to modify this Cancellation/Refund Policy at any time. Any changes will be updated on this page, and your continued participation in our events will be deemed acceptance of any modifications.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
