import React from "react";

export default function DJ_Night(){

    return (
<div>
<div className="text-center pb-4 animated slideInDown"   data-wow-delay="0.1s"    >
          <h5 className="text-primary-gradient fw-medium">Samudramanthan 2025 </h5>
          <p className="mb-0"><i>presents</i></p>
          <h1 className="">DJ NIGHT</h1>
          <p className="mb-0">
          Experience the churning energy of Samudramanthan at our electrifying DJ night!
          </p>
        </div>

<div className="container my-2 text-center d-flex justify-content-center flex-column align-items-center">
          <div className="row row-cols-1 row-cols-md-1 g-4 my-2 animated slideInRight">
              <div className="card">
                {/* <img src="..\img\event\dj_night.png" className="card-img-top" alt="" /> */}
                <img 
              src="..\img\event\dj_night.png" 
              alt="DJ Night" 
              style={{ 
                maxWidth: "100%", 
                maxHeight: "700px", 
                height: "auto", 
                display: "block", 
                border: "none",
                padding: "0",
                margin: "0",
                background: "transparent",
              }} 
            />
              </div>
            </div>
          </div>
          </div>

    );
}