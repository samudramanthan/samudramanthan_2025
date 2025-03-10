import React, { useEffect, useState } from "react";

function SpecialRegistration() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!document.getElementById("razorpay-script")) {
            const script = document.createElement("script");
            script.id = "razorpay-script"; // Assign an ID to prevent duplicates
            script.src = "https://checkout.razorpay.com/v1/payment-button.js";
            script.setAttribute("data-payment_button_id", "pl_Q4nb5PWnkZJGkJ");
            script.async = true;
            script.onload = () => setLoading(false);
            document.getElementById("razorpay-form").appendChild(script);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="container-xxl bg-warning text-dark special-registration py-5">
            <div className="container text-center">
                <h2 className="mb-4 fw-bold animated fadeInUp">Limited Time Exclusive Offer!</h2>
                <p className="lead animated fadeInUp">
                    Pay just <b>₹750</b> once and participate in <b>any event</b> of your choice!
                </p>
                <form id="razorpay-form" className="d-flex justify-content-center mt-4 animated fadeInUp">
                    {loading ? <p>Loading payment button...</p> : null}
                </form>
            </div>
        </div>
    );
}

export default SpecialRegistration;