import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const events = [
    "AquaMOD", "Dispustes", "Aquaexposure", "Boatwars", "Wavequest",
    "Quizathon", "Treasurehunt", "PaperPrep", "Capturethewater"
];

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [searchSmId, setSearchSmId] = useState(null);
    const [viewMode, setViewMode] = useState("all");
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
            try {
                let res;
                if (viewMode === "event") {
                    console.log(selectedEvent)
                    // if(selectedEvent){
                        res = await axios.get(`https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/admin/getEventDetails?event=${selectedEvent}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
                        });
                    
                    
                } else {
                    res = await axios.get("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/admin/getAllUsers", {
                        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
                    });
                }

                if (res.data.status === "success") {
                    setUsers(res.data.data);
                    setFilteredUsers(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching users", err);
                showToastMessage(err.response?.data?.message || "Unauthorized");

                if (err.response && (err.response.status >= 401 && err.response.status <= 403)) {
                    localStorage.removeItem("adminToken");
                    navigate("/admin");
                }
                setFilteredUsers([]);
                setUsers([]);
            }
        };

        fetchUsers();
    }, [viewMode, selectedEvent]);

    const handleSearch = () => {
        let filtered = users;
        console.log(filtered, selectedEvent, searchSmId)
        if (searchSmId) {
            if (viewMode === "event" && selectedEvent) {
                filtered = filtered.filter(user => user.smId === searchSmId || (user.teammembers !== null && user.teammembers.includes(searchSmId)));
            } else {
                filtered = filtered.filter(user => user.smId=== searchSmId);
            }
        }
        setFilteredUsers(filtered);
    };

    const handleSearchChange = (e) =>{
        setSearchSmId(e.target.value);
        if(e.target.value===null || e.target.value===''){
            setFilteredUsers(users);
        }
    }

    return (
        <>
            <div className="container-xxl bg-white p-0">
                <div className="container mt-4">
                    <h2>Admin Dashboard</h2>
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
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    {
                                        viewMode === "event" ? <th>Captain Email</th> : <th>Email</th>
                                    }
                                    {/* <th>Email</th> */}
                                    
                                    {
                                        viewMode !== "event" && <th>Name</th>
                                    }
                                                                        {
                                        viewMode !== "event" && <th>College</th>
                                    }
                                    {
                                        viewMode === "event" ? <th>Captain Contact</th> : <th>Contact</th>
                                    }
                                    {/* <th>Contact</th> */}
                                    <th>SM ID</th>
                                    {viewMode === "event" && <th>Event</th>}
                                    <th>Payment ID</th>
                                    {viewMode === "event" && <th>Team Members</th>}
                                    <th>Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr 
                                        key={user.smId} 
                                        onClick={() => navigate(`/admin/user/${user.smId}`)} 
                                        style={{ cursor: "pointer", transition: "background 0.2s" }}
                                        className="table-row-hover"
                                    >
                                        <td>{index + 1}</td>

                                        <td>{user.email}</td>
                                        {
                                            viewMode !== "event" && <td>{user.name}</td>
                                        }
                                        {
                                            viewMode !== "event" && <td>{user.college}</td>
                                        }
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
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}
