import React from "react";

function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-primary text-light footer wow fadeIn"
        data-wow-delay="0.1s"
        id="footer"
      >
        <div className="container py-5 px-lg-5">
          <div className="row g-5">
            <div className="col-md-6 col-lg-8">
              <h4 className="text-white mb-4">Address</h4>
              <p>
                <i className="fa fa-map-marker-alt me-3"></i>Indian Institute of
                Technology Kharagpur Kharagpur, West Bengal 721302 India
              </p>
              <p>
                <i className="fa fa-phone-alt me-3"></i>9451446743 / 8688906547 
              </p>
              <p>
                <i className="fa fa-envelope me-3"></i>
                samudramanthan.iitkgp.2025@gmail.com
              </p>
              <div className="d-flex pt-2">

                <a className="btn btn-outline-light btn-social" href="https://www.facebook.com/samudramanthan.iitkgp/">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-light btn-social" href="https://www.instagram.com/sm.iitkgp/">
                  <i className="fab fa-instagram"></i>
                </a>
                <a className="btn btn-outline-light btn-social" href="https://www.linkedin.com/company/smiitkgp/?originalSubdomain=in" >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <h4 className="text-white mb-4">Quick Link</h4>
              <a className="btn btn-link" href="/">
                Home
              </a>
              <a className="btn btn-link" href="/events">
                Events
              </a>
              <a className="btn btn-link" href="/about">
                About Us
              </a>
              <a className="btn btn-link" href="/gallery">
                Gallery
              </a>
              <a className="btn btn-link" href="team">
                Our Team
              </a>
              {/* <a className="btn btn-link" href="https://rzp.io/l/NmRVDe7">
                Accommodation
              </a> */}
              {/* <a className="btn btn-link" href="/cap">
                CAP
              </a>
              <a className="btn btn-link" href="/schedule">
              Schedule
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
