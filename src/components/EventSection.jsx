import React from "react";
import Events from "../data/EventShort";

function EventSection() {

    return(
        <div className="container-xxl py-5" id="feature">
            <div className="container py-5 px-lg-5">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="text-primary-gradient fw-medium">For Samudramanthan 2025</h5>
                    <h1 className="mb-5">Events</h1>
                </div>
                <div className="row g-4 d-flex flex-wrap align-items-start justify-content-start">
                    {Events.map((event, index) => (
                        <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <a href={"/event" + event.link}>
                                <div className="feature-item bg-light rounded p-4">
                                    <img src={event.poster} alt="High Resolution Icon" className="event-poster bg-primary-gradient rounded"/>
                                    <h5 className="mb-3">{event.name}</h5>
                                    <p style={{color:"#919294"}} className="m-0">{event.description}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default EventSection;