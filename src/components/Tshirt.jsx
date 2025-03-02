import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Tshirt() {
  const [sm_id, setSm_id] = useState(null);
  const [showSizeForm, setShowSizeForm] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [referral, setReferral] = useState(""); // New referral state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showToastMessage = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "warn") {
      toast.warning(message);
    } else {
      toast.error(message);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    async function checkTshirtStatus() {
      const token = localStorage.getItem("token");

      if (!token) {
        setSm_id("Buy Now");
        return;
      }

      try {
        const response = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/tshirt/isregistered", { token });
        const { smId, status, register } = response.data;

        if (status === "success") {
          if (register) {
            const user = JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user", JSON.stringify({ ...user, smId: smId }));
            setSm_id(smId);
          } else {
            setSm_id("Buy Now");
          }
        } else {
          setSm_id("Buy Now");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/register");
        } else {
          setSm_id("Buy Now");
        }
      }
    }

    checkTshirtStatus();
  }, [navigate]);

  const handleSizeSubmit = async () => {
    if (!selectedSize) {
      showToastMessage("Please select a T-shirt size.", "warn");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showToastMessage("Please log in to proceed.", "warn");
      navigate("/register");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/orders", {
        token,
        size: selectedSize,
        type: "tshirt",
        referral: referral || null, // Include referral if provided
      });

      if (data.status === "error") {
        showToastMessage("Failed to fetch order details. Please try again.", "error");
        return;
      }

      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!scriptLoaded) {
        showToastMessage("Failed to load Razorpay SDK. Please check your internet connection.", "error");
        return;
      }

      const options = {
        key: "rzp_test_ZMk8JNDw4oEY2K",
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Samudramanthan Registration",
        description: `T-shirt Purchase (Size: ${selectedSize})`,
        image: "/img/logo.png",
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/verify-payment/tshirt", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              referral: referral || null, // Include referral in verification
            });

            const result = verifyResponse.data;
            console.log(result);
            if (result.success === "success") {
              showToastMessage("Payment successful!", "success");
              window.location.reload();
            } else {
              showToastMessage(
                "Payment verification failed! Please contact web team if the amount is deducted from your account.",
                "error"
              );
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            showToastMessage("An error occurred while verifying payment.", "error");
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.contact,
        },
        notes: {
          size: selectedSize,
          referral: referral || "None", // Add referral to notes
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating order or initiating payment:", error);
      showToastMessage("Failed to proceed with the purchase. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl py-5" id="tshirt">
      <div className="container py-5 px-lg-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <img
              className="img-fluid wow fadeInUp"
              data-wow-delay="0.1s"
              src="img/merch.png"
              alt="T-shirt"
            />
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h5 className="text-primary-gradient fw-medium">Buy now</h5>
            <h1 className="mb-4">Get ready for Samudramanthan</h1>
            <p className="mb-4">
            For participation in Samudramanthan 2025, you must purchase a T-shirt to generate your SM ID.
            </p>
            <p className="mb-4">
            <b>If you participate in more than 3 events, you will receive a 20% refund as a discount.</b>
            </p>
            <div className="row g-4">
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                {localStorage.getItem("token") ? (
                  sm_id === "Buy Now" ? (
                    !showSizeForm ? (
                      <button
                        onClick={() => setShowSizeForm(true)}
                        className="d-flex btn bg-primary-gradient rounded py-3 px-4"
                      >
                        <div className="ms-3">
                          <p className="text-white mb-0">T-shirt</p>
                          <h5 className="text-white mb-0">Buy Now</h5>
                        </div>
                      </button>
                    ) : (
                      <form onSubmit={(e) => e.preventDefault()}>
                        <h5>Please Confirm Your Details</h5>
                        <label htmlFor="size" className="form-label">
                          Select T-shirt Size:
                        </label>
                        <select
                          id="size"
                          className="form-select mb-3"
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          disabled={loading}
                        >
                          <option value="">Choose Size</option>
                          <option value="S">Small</option>
                          <option value="M">Medium</option>
                          <option value="L">Large</option>
                          <option value="XL">Extra Large</option>
                          <option value="XXL">XXL</option>
                        </select>
                        
                        <label htmlFor="referral" className="form-label">
                          Referral Code (Optional):
                        </label>
                        <input
                          id="referral"
                          type="text"
                          className="form-control mb-3"
                          placeholder="Enter referral code if you have one"
                          value={referral}
                          onChange={(e) => setReferral(e.target.value)}
                          disabled={loading}
                        />
                        
                        <button
                          onClick={handleSizeSubmit}
                          className="btn btn-success"
                          disabled={loading}
                        >
                          {loading ? "Processing..." : "Proceed to Pay"}
                        </button>
                      </form>
                    )
                  ) : (
                    <button disabled className="d-flex btn btn-green-gredient rounded py-3 px-4">
                      <div>
                        <p className="text-white mb-0">SM ID</p>
                        <h5 className="text-white mb-0">{sm_id || "Not purchased yet"}</h5>
                      </div>
                    </button>
                  )
                ) : (
                  <a href="/register" className="d-flex bg-primary-gradient rounded py-3 px-4">
                    <div className="ms-3">
                      <p className="text-white mb-0">Login</p>
                      <h5 className="text-white mb-0">To Continue</h5>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Tshirt;