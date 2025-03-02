import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import testimonialData from "../data/TestimonialData";

function Testimonial() {
  const options = {
    autoplay: true,
    smartSpeed: 500,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i className="bi bi-chevron-left"></i>',
      '<i className="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };
  return (
    <>
      <div className="container-xxl py-5" id="review">
        <div className="container py-5 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="text-primary-gradient fw-medium">Testimonial</h5>
            <h1 className="mb-5">Tales from the Samudramanthan</h1>
          </div>
          {/* <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s"> */}
          <OwlCarousel
            className="owl-carousel testimonial-carousel wow fadeInUp"
            {...options}
          >
            {testimonialData.map((data) => {
              return (
                <div className="testimonial-item rounded p-4">
                  <div className="d-flex align-items-center mb-4">
                    <img
                      className="img-fluid bg-white rounded flex-shrink-0 p-1"
                      src={data.imglink}
                      style={{ width: "85px", height: "85px" }}
                    />
                    <div className="ms-4">
                      <h5 className="mb-1">{data.name}</h5>
                      <p className="mb-1">{data.profession}</p>
                      <div>
                        <small className="fa fa-star text-warning"></small>
                        <small className="fa fa-star text-warning"></small>
                        <small className="fa fa-star text-warning"></small>
                        <small className="fa fa-star text-warning"></small>
                        <small className="fa fa-star text-warning"></small>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0">{data.testimonial}</p>
                </div>
              );
            })}
          </OwlCarousel>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Testimonial;
