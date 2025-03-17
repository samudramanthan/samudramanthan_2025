import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AdminStats() {
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        eventWiseRegistrations: [],
        tshirtOnlyBuyers: [],
        collegeWiseParticipants: []
    });
    const [loading, setLoading] = useState(true);
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
        const fetchStats = async () => {
            try {
                const res = await axios.get("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/admin/getStats", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                });
                if (res.data.status === "success") {
                    setStats(res.data.data);
                } else {
                    showToastMessage(res.data.message, "warn");
                    toast.error("Failed to fetch stats", { position: "top-right", autoClose: 3000 });
                }
            } catch (err) {
                console.error(err);
                showToastMessage(err.response?.data?.message || "Error fetching data", "error");
                if (err.response && (err.response.status >= 401 && err.response.status <= 403)) {
                    localStorage.removeItem("adminToken");
                    navigate("/admin");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Helper function to count total registrations
    // const getTotalRegistrations = () => {
    //     return stats.eventWiseRegistrations.reduce((sum, event) => {
    //         return sum + event.registrations.length;
    //     }, 0);
    // };

    // Helper function to flatten team members for CSV
    const flattenTeamMembers = (registration) => {
        const result = {
            Event: registration.event,
            CaptainSmId: registration.captainSmId,
            CaptainEmail: registration.email,
            CaptainContact: registration.contact,
            PaymentId: registration.paymentId || "N/A",
            RegisteredAt: new Date(registration.createdAt).toLocaleString()
        };
        
        if (registration.teammembers && registration.teammembers.length > 0) {
            registration.teammembers.forEach((member, index) => {
                result[`Member${index+1}SmId`] = member.smId;
                result[`Member${index+1}Email`] = member.email;
                result[`Member${index+1}Contact`] = member.contact;
            });
        }
        
        return result;
    };

    // Download CSV for event registrations
    const downloadEventCSV = (eventName, registrations) => {
        if (!registrations || registrations.length === 0) {
            toast.error("No data to download", { position: "top-right", autoClose: 3000 });
            return;
        }

        // Add event name to each registration
        const dataWithEvent = registrations.map(reg => ({...reg, event: eventName}));
        
        // Flatten data for CSV
        const flattenedData = dataWithEvent.map(reg => flattenTeamMembers(reg));
        
        // Get all possible headers
        const allKeys = flattenedData.reduce((keys, item) => {
            Object.keys(item).forEach(key => {
                if (!keys.includes(key)) keys.push(key);
            });
            return keys;
        }, []);
        
        // Create CSV content
        const csvRows = [];
        csvRows.push(allKeys.join(','));
        
        flattenedData.forEach(item => {
            const values = allKeys.map(key => {
                const value = item[key] || '';
                return `"${value}"`;
            });
            csvRows.push(values.join(','));
        });
        
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${eventName}_registrations.csv`);
        toast.success("CSV downloaded successfully", { position: "top-right", autoClose: 3000 });
    };

    // Download CSV for t-shirt only buyers
    const downloadTshirtBuyersCSV = () => {
        if (!stats.tshirtOnlyBuyers || stats.tshirtOnlyBuyers.length === 0) {
            toast.error("No data to download", { position: "top-right", autoClose: 3000 });
            return;
        }
        
        const headers = ["SmId", "Name", "Email", "Contact", "College"];
        const csvContent = [
            headers.join(","),
            ...stats.tshirtOnlyBuyers.map(buyer => [
                buyer.smId,
                `"${buyer.name}"`,
                buyer.email,
                buyer.contact,
                `"${buyer.college}"`
            ].join(","))
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "tshirt_only_buyers.csv");
        toast.success("CSV downloaded successfully", { position: "top-right", autoClose: 3000 });
    };

    return (
        <>
            <div className="container-xxl bg-white p-0">
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Admin Statistics</h2>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => navigate("/admin/dashboard")}
                        >
                            Back to Dashboard
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center my-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading statistics...</p>
                        </div>
                    ) : (
                        <>
                            <div className="row mb-4">
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Total Registrations</h5>
                                            <h2 className="card-text fw-bold text-primary mt-3 mb-3">
                                                {stats.totalRegistrations}
                                            </h2>
                                            <p className="text-muted small">Cumulative registrations across all events</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">T-shirt Only Buyers</h5>
                                            <h2 className="card-text fw-bold text-success mt-3 mb-3">
                                                {stats.tshirtOnlyBuyers?.length || 0}
                                            </h2>
                                            <button
                                                onClick={downloadTshirtBuyersCSV}
                                                className="btn btn-primary mt-2"
                                                disabled={!stats.tshirtOnlyBuyers?.length}
                                            >
                                                Download List
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Total Events</h5>
                                            <h2 className="card-text fw-bold text-info mt-3 mb-3">
                                                {stats.eventWiseRegistrations?.length || 0}
                                            </h2>
                                            <p className="text-muted small">Events with active registrations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Event-wise Registrations</h5>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover mb-0">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Event</th>
                                                    <th>Teams Registered</th>
                                                    {/* <th>Total Participants</th> */}
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stats.eventWiseRegistrations?.length > 0 ? (
                                                    stats.eventWiseRegistrations.map((event, index) => {
                                                        // Calculate total participants (captain + team members)
                                                        
                                                        
                                                        return (
                                                            <tr key={index} className="table-row-hover">
                                                                <td>{index + 1}</td>
                                                                <td>{event.event}</td>
                                                                <td>{event.registrations.length}</td>
                                                                {/* <td>{totalParticipants}</td> */}
                                                                <td>
                                                                    <button
                                                                        onClick={() => downloadEventCSV(event.event, event.registrations)}
                                                                        className="btn btn-success btn-sm"
                                                                        disabled={!event.registrations.length}
                                                                    >
                                                                        Download
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center p-4">No event registrations available</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* New College-wise Participants Section */}
                            {/* <div className="card mb-4">
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover mb-0">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>College</th>
                                                    <th>Number of Participants</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stats.collegeWiseParticipants?.length > 0 ? (
                                                    stats.collegeWiseParticipants.map((college, index) => (
                                                        <tr key={index} className="table-row-hover">
                                                            <td>{index + 1}</td>
                                                            <td>{college.college}</td>
                                                            <td>{college.count}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="text-center p-4">No college data available</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div> */}

                            <div className="card mb-4">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">T-shirt Only Buyers</h5>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover mb-0">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>SM ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Contact</th>
                                                    <th>College</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stats.tshirtOnlyBuyers?.length > 0 ? (
                                                    stats.tshirtOnlyBuyers.map((buyer, index) => (
                                                        <tr key={index} className="table-row-hover">
                                                            <td>{index + 1}</td>
                                                            <td>{buyer.smId}</td>
                                                            <td>{buyer.name}</td>
                                                            <td>{buyer.email}</td>
                                                            <td>{buyer.contact}</td>
                                                            <td>{buyer.college}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center p-4">No t-shirt only buyers available</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}