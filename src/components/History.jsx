import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function History() {
  return (
    <div className="container-xxl py-5" id="pricing">
      <div className="container py-5 px-lg-5">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="text-primary-gradient fw-medium">History</h5>
          <h1 className="mb-5">Honoring our Heritage
          </h1>
        </div>
        <div className="tab-class text-center pricing wow fadeInUp" data-wow-delay="0.1s">
          <p className="md-4">
            Started in 2008, Samudramanthan has come a long way. Seen exponential
            growth in the last 10 years and accounting for the total
            participation of more than 2000 participants across both online and
            offline.
          </p>
          <OwlCarousel
            className="owl-theme"
            loop
            margin={10}
            nav
            autoplay
            autoplayTimeout={3000}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 },
            }}
          >
            <div className="col">
              <div className="card h-100">
                <img src="/img/history/pic0_0.jpg" className="card-img-top" alt="Samudramanthan 2024" />
                <div className="card-body">
                  <h4>Samudramanthan 2024</h4>
                  <p>
                    The 16th edition of Samudramanthan set new benchmarks of
                    creativity and engagement with 8 dynamic events.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/img/history/pic1_1.jpg" className="card-img-top" alt="Samudramanthan 2023" />
                <div className="card-body">
                  <h4>Samudramanthan 2023</h4>
                  <p>
                    Despite being conducted online, we saw record-breaking
                    participation. In total, 9 events were conducted.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/img/history/pic2_2.jpg" className="card-img-top" alt="Samudramanthan 2022" />
                <div className="card-body">
                  <h4>Samudramanthan 2022</h4>
                  <p>
                    Continuing its legacy, Samudramanthan saw high participation
                    from students all over India. In total, 9 events were
                    conducted.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/img/history/pic4_4.jpg" className="card-img-top" alt="Samudramanthan 2021" />
                <div className="card-body">
                  <h4>Samudramanthan 2021</h4>
                  <p>
                    13th Edition of Samudramanthan. A total of 9 events were
                    conducted. High participation of the students made this
                    edition one of the best so far.
                  </p>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}
