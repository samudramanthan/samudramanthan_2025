import React, { useState, useEffect } from "react";
import EventData from "../data/EventData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from "./DetailsModel";
import { Toast } from "react-bootstrap";

  // const event = EventData.find(event => event.link === 'capturethewater');

function EventDetail({ event }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [user, setUser] = React.useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });  
  const [userEventData, setUserEventData] = React.useState({});
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && event) {
      const checkRegistration = async () => {
        try {
          const response = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/event/isregistered", {
            token: localStorage.getItem("token"),
            link: event.link,
          });
          if (response.data.status === "success" && response.data.isRegistered === true) {
            setIsRegistered(response.data.isRegistered);
            setUserEventData(response.data.data);
          }
        } catch (error) {
          console.error("Error checking registration:", error);
          setIsRegistered(false);
        }
      };

      checkRegistration();
    }
  }, [event]);

  const handleNavigate = () => {
    navigate("/"); // Redirect to home page with hash
    setTimeout(() => {
      const tshirtSection = document.getElementById("tshirt");
      if (tshirtSection) {
        tshirtSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500); // Delay to ensure the page has loaded
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  async function details() {
    showToastMessage("You clicked to view or register for the event!");
    setModalShow(true);
  }

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container py-5 px-lg-5">
          <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="text-primary-gradient fw-medium">Event Details</h5>
            <h1 className="mb-2">{event.name}</h1>
          </div>

          <div className="row">
            <div className="col-lg-8 mb-3">
              <img src={event.poster} className="img-fluid" alt="event-image" />
              {/* <p className="mt-4 text-center">{event.description}</p> */}
            </div>
            <div className="col-lg-4">
              <div className="course-info d-flex justify-content-between align-items-center mb-2">
                <h5>Team Size</h5>
                <p>{event.teamSize}</p>
              </div>

              <div className="course-info d-flex justify-content-between align-items-center mb-2">
                <h5>Event Fee</h5>
                <p>{event.fee}</p>
              </div>

              <div className="course-info d-flex justify-content-between align-items-center mb-2">
                <h5>Prize Money</h5>
                <p>{event.prize}</p>
              </div>

              <div className="course-info d-flex justify-content-between align-items-center mb-2">
                <h5>Schedule</h5>
                <p>{event.date}</p>
              </div>

              <div className="course-info d-flex justify-content-between align-items-center mb-2">
                <h5>Schedule</h5>
                <p>
                  <a
                    href={event.brochure}
                    className="btn btn-secondary-gradient rounded-pill py-2 px-4"
                  >
                    Info Brochure
                  </a>
                </p>
              </div>

              {event.submission!==undefined ? (
                <div className="course-info d-flex justify-content-between align-items-center mb-2">
                <h5>Submission</h5>
                <p>
                  <a
                    className="btn btn-secondary-gradient rounded-pill py-2 px-4"
                    href={event.submission}
                  >
                    Form
                  </a>
                </p>
              </div>
              ): 
              (
              <>
              </>
              )}
              

              {localStorage.getItem("token") ? (
                <div className="course-info d-flex justify-content-between align-items-center mb-2">
                  <h5>Register Event</h5>
                  {user.smId ? ( // Check if smId exists inside user
                    isRegistered ? (
                      <p>
                        <a
                          className="btn btn-green-gredient rounded-pill py-2 px-4"
                          onClick={details}
                        >
                          View details
                        </a>
                      </p>
                    ) : (
                      <p>
                        <a
                          className="btn btn-secondary-gradient rounded-pill py-2 px-4"
                          onClick={details}
                        >
                          Register Now
                        </a>
                      </p>
                    )
                  ) : (

                    <p>
                        <a
                          className="btn btn-secondary-gradient rounded-pill py-2 px-4"
                          onClick={handleNavigate}
                        >
                          Generate SM ID
                        </a>
                    </p>
                    
                  )}
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    user={user}
                    isRegistered={isRegistered}
                    userEventData={isRegistered ? userEventData : null}
                    event={event}
                  />
                </div>
              ) : (
                <div className="course-info d-flex justify-content-between align-items-center mb-2">
                  <h5>Register Event</h5>
                  <p>
                    <a
                      href="/register"
                      className="btn btn-primary-gradient rounded-pill py-2 px-4 navbar-nav"
                    >
                      Login
                    </a>
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="container text-center" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-3">
              <ul className="nav nav-tabs flex-column">
                {event.rulestab.map((tab) => (
                  <li className="nav-item" key={tab.tabId}>
                    <a
                      className="nav-link rounded"
                      data-bs-toggle="tab"
                      href={"#tab-" + tab.tabId}
                    >
                      <h5>{tab.heading}</h5>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="tab-content">
                {event.rulestab.map((tab) => (
                  <div className="tab-pane" id={"tab-" + tab.tabId} key={tab.tabId}>
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1 alight-left">
                        <h3>{tab.heading}</h3>
                        {tab.data.map((data, index) => (
                          <p key={index}>{data}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast for notifications */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default EventDetail;
