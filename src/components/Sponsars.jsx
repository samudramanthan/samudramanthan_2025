import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Sponsors() {
  const options = {
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 500,
    loop: true,
    dots: true,
    nav: true,

    items: 1,
  };

  return (
    <div className="container-xxl py-5">
      <div className="container py-5 px-lg-5">
        <div
          className="text-center pb-4 animated slideInDown"
          data-wow-delay="0.1s"
        >
          <h5 className="text-primary-gradient fw-medium">Samudramanthan's 17th edition</h5>
          <h1 className="">Our Sponsors</h1>
          <p className="mb-0">
            We extend our heartfelt gratitude to our sponsors for their invaluable support in making Samudramanthan a remarkable success.
          </p>
          <p className="mb-0">Together, we create waves of change.</p>
        </div>

        <div className="container my-2 text-center d-flex justify-content-center flex-column align-items-center">
          <div className="row row-cols-1 row-cols-md-1 g-4 my-2 animated slideInRight">
            <div className="col">
              <div className="card h-100">
                <img src="img\Spons\Vedam.png" className="card-img-top" alt="" />
              </div>
            </div>
            <h5 className="spons_txt my-4">Major Sponsor</h5>
          </div>

          <div className="row row-cols-1 row-cols-md-1 g-4 my-2 animated slideInRight center">
            <div className="col width-120">
              <div className="card h-100">
                <img src="img\Spons\boyancy.jpg" className="card-img-top" alt="" />
              </div>
            </div>
            <h5 className="spons_txt my-4">Event Sponsor</h5>
          </div>


          {/* <div className="row row-cols-1 row-cols-md-1 g-4 my-2 animated slideInLeft">
            <div className="spons_width2 col">
              <div className="card h-100">
                <img src="img\Spons\shoft-2.png" className="card-img-top" alt="" />
              </div>
            </div>
            <h5 className="spons_txt my-4">Event Sponsor</h5>
          </div> */}
          {/* col */}
          <div className="row row-cols-1 row-cols-md-3 g-4 my-2 new animated slideInRight">
            <div className="spons_width3 col">
              <div className="card spons-img">
                <img src="img\Spons\grse(2).png" className="card-img-top" alt="" />
              </div>
              <h5 className="spons_txt my-4">Event Sponsor</h5>
            </div>

            <div className="spons_width3 col">
              <div className="card spons-img">
                <img src="img\Spons\irclass.png" className="card-img-top" alt="" />
              </div>
              <h5 className="spons_txt my-4">Event Sponsor</h5>
            </div>
            
            <div className="spons_width3 col">
              <div className="card spons-img">
                <img src="img\Spons\Invent-Ocean.jpg" className="card-img-top resize" alt="" />
              </div>
              <h5 className="spons_txt my-4">Event Sponsor</h5>
            </div>

            <div className="spons_width3 col">
              <div className="card spons-img">
                <img src="img\Spons\cbc.png" className="card-img-top" alt="" />
              </div>
              <h5 className="spons_txt my-4">Event Sponsor</h5>
            </div>

            <div className="spons_width3 col">
              <div className="card spons-img">
                <img src="img\Spons\sah.png" className="card-img-top resize" alt="" />
              </div>
              <h5 className="spons_txt my-4">Event Sponsor</h5>
            </div>

            <div className="spons_width3 col">
              <div className="card spons-img">
                <img src="img\Spons\campus-times-square.png" className="card-img-top" alt="" />
              </div>
              <h5 className="spons_txt my-4">Online Media Partner</h5>
            </div>
          
          </div>


        </div>
      </div>
    </div>
  );
}

export default Sponsors;
