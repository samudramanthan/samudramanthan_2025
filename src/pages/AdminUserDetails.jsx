import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDetails() {
  const { smId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const showToastMessage = (message, type) => {
    toast[type](message);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/getUser/${smId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        if (res.data.status === "success") {
            console.log(res.data.data)
          setUser(res.data.data);
        } else {
          showToastMessage("User not found", "error");
          navigate("/admin/dashboard");
        }
      } catch (err) {
        if(err.response && err.response.status>=401 && err.response.status<=403){
          showToastMessage(err.response.data.message || "Unauthorized", "error");
          navigate("/admin");
        } else{
          showToastMessage(`Error fetching user details`, "error");
          navigate("/admin/dashboard");
        }
      }
    };

    fetchUserDetails();
  }, [smId, navigate]);

  return (
    <div className="container-xxl bg-light min-vh-100 py-5">
      <div className="container">
        <button className="btn btn-secondary mb-4" onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</button>
        {user ? (
          <div className="card shadow-lg p-4">
            <h3 className="mb-3 text-center">User Details</h3>
            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>College:</strong> {user.college}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
                <p><strong>SM ID:</strong> {user.smId}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Size:</strong> {user.size}</p>
                <p><strong>Order ID:</strong> {user.orderId || "N/A"}</p>
                <p><strong>Payment ID:</strong> {user.paymentId || "N/A"}</p>
                <p><strong>Referral:</strong> {user.referral || "N/A"}</p>
              </div>
            </div>
            <h4 className="mt-4">Registered Events</h4>
            {user.events.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Event Name</th>
                      {/* <th>Captain Name</th> */}
                      <th>Captain Email</th>
                      <th>Captain Contact</th>
                      <th>Team Members</th>
                      {/* <th>Paid</th> */}
                      <th>Payment ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.events.map((event, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{event.event}</td>
                        <td>{event.email}</td>
                        <td>{event.contact}</td>
                        <td>{event.teammembers!==null? event.teammembers.join(','):"N/A"}</td>
                        {/* <td>{event.paid ? "Yes" : "No"}</td> */}
                        <td>{event.paymentId || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted">No events registered.</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading user details...</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
