import React, { useState, useEffect } from "react";

export default function ProfileComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">User Profile</h3>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm p-4 rounded-4">
            {user ? (
              <form>
                {/* SM ID Section */}
                <div className="row g-3 mb-3">
                  <div className="col-12 text-center">
                    {user.smId ? (
                      <h5 className="fw-bold text-primary-gradient">SM ID: {user.smId}</h5>
                    ) : (
                      <p className="text-danger fw-bold">
                        You need to purchase a T-shirt to generate an SM ID.
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="name" value={user.name} disabled />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="email" className="form-control" id="email" value={user.email} disabled />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="contact" value={user.contact} disabled />
                      <label htmlFor="contact">Contact</label>
                    </div>
                  </div>
                </div>

                {/* Separate Row for College */}
                <div className="row g-3 mt-2">
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="college" value={user.college} disabled />
                      <label htmlFor="college">College</label>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <p className="text-center fw-bold text-danger">No user data found. Please log in.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
