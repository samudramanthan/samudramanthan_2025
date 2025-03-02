import React from "react";
import TeamData from "../data/TeamData";

export default function Team() {

    return(
        <div className="container-xxl py-5" id="pricing">
            <div className="container py-5 px-lg-5">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="text-primary-gradient fw-medium">Samudramanthan 2025</h5>
                    <h1 className="mb-5">Team</h1>
                </div>
                <div className="tab-class text-center pricing wow fadeInUp" data-wow-delay="0.1s">
                    <div className="tab-content text-start">
                        <div className="tab-pane fade show mb-4 active">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                {TeamData.map((member) => (
                                    <div className="col">
                                    <div className="card h-100 text-center">
                                        <img className="img-fluid bg-white rounded flex-shrink-0 p-1 mb-2 team-image"
                                            src={member.image}/>
                                        <div className="ms-4">
                                            <h5 className="mb-2">{member.name}</h5>
                                            <p className="mb-2">{member.position}</p>
                                            <div className="mb-4">
                                                <a className="btn btn-outline-light btn-social btn-secondary-gradient m-2" href={member.facebook}><i
                                                        className="fab fa-facebook-f"></i></a>
                                                <a className="btn btn-outline-light btn-social btn-secondary-gradient m-2" href={member.instagram}><i
                                                        className="fab fa-instagram"></i></a>
                                                <a className="btn btn-outline-light btn-social btn-secondary-gradient m-2" href={member.linkedin}><i
                                                        className="fab fa-linkedin-in"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}