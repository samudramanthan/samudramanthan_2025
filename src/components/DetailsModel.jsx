import React, { useState } from "react";
import { Button, Modal, Form, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function MyVerticallyCenteredModal(props) {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToastMessage = (message, type) => {
    if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else {
      toast.success(message);
    }
  };

  const handleTeamMemberChange = (index, value) => {
    setTeamMembers((prevMembers) => {
      const newMembers = [...prevMembers];
      newMembers[index] = value;
      return newMembers;
    });
  };

  const addTeamMember = () => {
    if (teamMembers.length < props.event.maxTeamSize - 1) {
      setTeamMembers((prevMembers) => [...prevMembers, ""]);
    }
  };

  async function registerToEvent() {
    try {
      const filteredTeamMembers = teamMembers.filter((teamMember) => teamMember.trim() !== "");

      if (filteredTeamMembers.length + 1 > props.event.maxTeamSize) {
        showToastMessage(`Maximum team size is ${props.event.maxTeamSize}. Please remove some team members.`, "warning");
        return null;
      }

      console.log(filteredTeamMembers)

      const body = {
        type: "event",
        token: localStorage.getItem("token"),
        event: props.event.link,
        teammembers: filteredTeamMembers,
      };

      const response = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/orders", body);

      if (response.data.status === "success") {
        return response.data;
      } else {
        showToastMessage(response.data.message || "Registration failed. Please try again.", "error");
        return null;
      }
    } catch (error) {
      console.error("Registration error:", error);
      showToastMessage(error.response?.data?.error || "Failed to register. Please try again later.", "error");
      return null;
    }
  }

  async function displayRazorpay(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerToEvent();
      if (!data) {
        setLoading(false);
        return;
      }

      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        showToastMessage("Razorpay SDK failed to load. Are you online?", "error");
        setLoading(false);
        return;
      }

      setLoading(false); // Disable loading before opening Razorpay

      const options = {
        key: "rzp_test_ZMk8JNDw4oEY2K",
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: `${props.event.name} Registration`,
        description: "Test Transaction",
        image: "/img/logo.png",
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/verify-payment/event", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const result = verifyResponse.data;
            if (result.success === "success") {
              showToastMessage("Registered for the event successfully", "success");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              showToastMessage(
                "Payment verification failed! Please contact web team if the amount is deducted from your account",
                "error"
              );
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            showToastMessage("An error occurred while verifying payment", "error");
          }
        },
        prefill: { name: data.name, email: data.email, contact: data.contact },
        notes: { event: `${props.event.name} Registration` },
        theme: { color: "#3399cc" },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      console.error("displayRazorpay error:", error);
      showToastMessage("An unexpected error occurred. Please try again.", "error");
      setLoading(false);
    }
  }

  return (
    <Modal size="lg" centered {...props}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            color: "white",
            fontSize: "20px",
          }}
        >
          Loading...
        </div>
      )}
      <Modal.Header closeButton className="bg-secondary-gradient">
        <Modal.Title className="text-white">
          {props.isRegistered ? "Your Event Details" : "Please Confirm Your Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container py-5 px-lg-5">
        {props.isRegistered ? (
          <div>
            <h4 className="mb-3">Event Registration Details</h4>
            <Row>
              <Col sm={12} md={6}>
                <p>
                  <strong>Captain:</strong> {props.userEventData.smId}
                </p>
                <p>
                  <strong>Captain Email:</strong> {props.userEventData.email}
                </p>
              </Col>
              <Col sm={12} md={6}>
                <p>
                  <strong>Team Members:</strong> {props.userEventData.teammembers?.join(", ") || "N/A"}
                </p>
                <p>
                  <strong>Payment Status:</strong> {props.userEventData.paid ? "Paid" : "Pending"}
                </p>
              </Col>
            </Row>
          </div>
        ) : (
          <Form>
            <div className="mb-3">
              <Form.Label className="h5 font-weight-bold mb-3">Your Information</Form.Label>
              <div>
                <strong>Name:</strong> {props.user.name}
              </div>
              <div>
                <strong>Email:</strong> {props.user.email}
              </div>
              <div>
                <strong>SM Id:</strong> {props.user.smId}
              </div>
            </div>

            {props.event.maxTeamSize > 1 && (
              <>
                <p className="text-danger text-center mb-4">
                  Please enter the SM ID of your teammates correctly. Max team size can be {props.event.maxTeamSize}
                </p>
                {teamMembers.map((member, index) => (
                  <Form.Group className="mb-3" key={index}>
                    <Form.Label>Teammate {index + 1}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="SM ID"
                      value={member}
                      onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                    />
                  </Form.Group>
                ))}
                {teamMembers.length < props.event.maxTeamSize - 1 && (
                  <Button variant="secondary" onClick={addTeamMember} className="mb-3">
                    Add Team Member
                  </Button>
                )}
              </>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        {!props.isRegistered && (
          <Button variant="primary" onClick={displayRazorpay} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </Button>
        )}
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
      <ToastContainer />
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
