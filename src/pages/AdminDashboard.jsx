import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const events = [
 "Dispustes", "Aquaexposure", "Boatwars", "Wavequest",
    "Quizathon", "Treasurehunt", "PaperPrep"
];

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [fetchedUsers, setFetchedUsers] = useState([]); // Stores original fetched data
    const [selectedEvent, setSelectedEvent] = useState("");
    const [searchSmId, setSearchSmId] = useState("");
    const [viewMode, setViewMode] = useState("all");
    const [loading, setLoading] = useState(false); // Loading state
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

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Start loading
            try {
                console.log("FETCHING THE USERS", viewMode);
                setUsers([]); // Reset users before fetching to avoid duplicates
                let res;

                if (viewMode === "event") {
                    console.log("Selected event is: ", selectedEvent);
                    res = await axios.get(
                        `https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/admin/getEventDetails?event=${selectedEvent}`,
                        {
                            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
                        }
                    );
                    console.log("HERE IN THE EVENTS, with data as ", res.data.data);
                } else {
                    res = await axios.get(
                        "https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/admin/getAllUsers",
                        {
                            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
                        }
                    );
                    // console.log("HERE IN ALL, with data as ", res.data.data);
                }

                if (res.data.status === "success") {
                    setUsers(res.data.data);
                    setFetchedUsers(res.data.data); // Store original data separately
                }
            } catch (err) {
                console.error("Error fetching users", err);
                showToastMessage(err.response?.data?.message || "Unauthorized");

                if (err.response && (err.response.status >= 401 && err.response.status <= 403)) {
                    localStorage.removeItem("adminToken");
                    navigate("/admin");
                }
                setUsers([]);
            }
            setLoading(false); // Stop loading
        };

        fetchUsers();
    }, [viewMode, selectedEvent]);

    const handleSearch = () => {
        if (!searchSmId) {
            setUsers(fetchedUsers); // Reset to original fetched users
            return;
        }

        let filtered = fetchedUsers.filter(user => 
            user.smId === searchSmId || 
            (viewMode === "event" && user.teammembers?.includes(searchSmId))
        );

        setUsers(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchSmId(e.target.value);
        if (!e.target.value) {
            setUsers(fetchedUsers);
        }
    };

    return (
        <>
            <div className="container-xxl bg-white p-0">
                <div className="container mt-4">
                    <h2>Admin Dashboard</h2>
                    <button className="btn btn-primary" onClick={()=>navigate('/admin/stats')}>View Stats</button>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-check form-switch">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="toggleViewMode" 
                                    checked={viewMode === "event"} 
                                    onChange={() => setViewMode(viewMode === "all" ? "event" : "all")} 
                                />
                                <label className="form-check-label" htmlFor="toggleViewMode">
                                    {viewMode === "all" ? "All Users" : "Event-wise"}
                                </label>
                            </div>
                        </div>
                        {viewMode === "event" && (
                            <div className="col-md-6 my-2">
                                <select className="form-select" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
                                    <option value="">Select Event</option>
                                    {events.map(event => (
                                        <option key={event} value={event}>{event}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="col-md-6 d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by SM ID"
                                value={searchSmId}
                                onChange={handleSearchChange}
                            />
                            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center my-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading users...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>{viewMode === "event" ? "Captain Email" : "Email"}</th>
                                        {viewMode !== "event" && <th>Name</th>}
                                        {viewMode !== "event" && <th>College</th>}
                                        <th>{viewMode === "event" ? "Captain Contact" : "Contact"}</th>
                                        <th>SM ID</th>
                                        {viewMode === "event" && <th>Event</th>}
                                        <th>Payment ID</th>
                                        {viewMode === "event" && <th>Team Members</th>}
                                        <th>Registered At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr 
                                            key={user.smId} 
                                            onClick={() => navigate(`/admin/user/${user.smId}`)} 
                                            style={{ cursor: "pointer", transition: "background 0.2s" }}
                                            className="table-row-hover"
                                        >
                                            <td>{index + 1}</td>
                                            <td>{user.email}</td>
                                            {viewMode !== "event" && <td>{user.name}</td>}
                                            {viewMode !== "event" && <td>{user.college}</td>}
                                            <td>{user.contact}</td>
                                            <td>{user.smId}</td>
                                            {viewMode === "event" && <td>{user.event}</td>}
                                            <td>{user.paymentId || "N/A"}</td>
                                            {viewMode === "event" && <td>{user.teammembers?.join(", ") || "N/A"}</td>}
                                            <td>{new Date(user.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}
