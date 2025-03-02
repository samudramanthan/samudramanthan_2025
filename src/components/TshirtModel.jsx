import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const sizeOptions = ["Small", "Medium", "Large", "XL", "XXL"];

function loadscript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function TshirtModal(props) {
  const [referral, setReferral] = useState(""); // New referral state
  
  console.log(props.user);
  function registerToTshirt() {
    const data = {
      token: localStorage.getItem("token"),
      orderId: props.user.id,
      size: props.user.size,
      referral: referral || null, // Add referral code to the request
    };
    axios
      .post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/tshirt", data)
      .then((res) => {
        console.log("response: ");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  async function displayRazorpay(data) {
    registerToTshirt();
    const res = await loadscript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_ZMk8JNDw4oEY2K", // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      name: "Capature the water Registeration", //your business name
      description: "Test Transaction",
      image: "img/logo.png",
      callback_url: "https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/success/tshirt",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: data.name,
        email: data.email,
        contact: data.contact,
      },
      notes: {
        address: "Razorpay Corporate Office",
        referral: referral || "None", // Add referral to notes
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Tshirt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h5 className="text-primary-gradient fw-medium">Samudramanthan</h5>
          <h1 className="mb-5">Please Confirm Your Details</h1>
          <p>Name: {props.user.name}</p>
          <p>Email: {props.user.email}</p>
          <p>Contact number: {props.user.contact}</p>
          <p>SM id: {props.user.sm_id}</p>
          <p>Order id: {props.user.id}</p>
          <p>Fees: {props.user.amount / 100}</p>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formSizeSelect">
            <Form.Label>Size</Form.Label>
            <Form.Control
              as="select"
              placeholder="Enter Size"
              onChange={(e) => {
                props.setUser({
                  ...props.user,
                  size: e.target.value,
                });
              }}
            >
              {sizeOptions.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formReferral">
            <Form.Label>Referral Code (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter referral code if you have one"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            displayRazorpay(props.user);
          }}
        >
          Pay
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TshirtModal;