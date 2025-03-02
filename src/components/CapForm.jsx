import React from "react";
import axios from "axios";

function CapSection() {
  const [data, setData] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(null); // null = loading, true = registered, false = not registered
  const [yos, setYos] = React.useState(0);
  const [major, setMajor] = React.useState("");
  const [sm, setSm] = React.useState("");
  const [idea, setIdea] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [whysm, setWhysm] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsSubmitted(false);
      return;
    }

    axios
      .get("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/user", { headers: { token } })
      .then((res) => setData(res.data.data))
      .catch((err) => console.error("Error fetching user:", err));

    axios
      .post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/cap/isregistered", { token })
      .then((res) => {
        if (res.data.status === "success") {
          setIsSubmitted(true);
        } else {
          setIsSubmitted(false);
        }
      })
      .catch((err) => {
        console.error("Error checking CAP registration:", err);
        setIsSubmitted(false);
      });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const Capdata = {
        sm_id: data.sm_id || "",
        name: data.name,
        email: data.email,
        college: data.college,
        contact: data.contact,
        major,
        yos,
        sm,
        idea,
        experience,
        whysm,
      };

      const res = await axios.post("https://naroes-due5fwbuc0hdh3e4.centralindia-01.azurewebsites.net/cap", Capdata);

      if (res.data.status === "success") {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return (
    <div className="container-xxl" id="contact">
      <div className="container px-lg-5">
        {!localStorage.getItem("token") ? (
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="text-primary-gradient fw-medium">
              SM'24 Campus Ambassador
            </h5>
            <h1 className="mb-5">Please login to register as a CAP.</h1>
          </div>
        ) : isSubmitted === null ? (
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="text-primary-gradient fw-medium">
              SM'24 Campus Ambassador
            </h5>
            <h1 className="mb-5">Loading...</h1>
          </div>
        ) : isSubmitted ? (
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h5 className="text-primary-gradient fw-medium">
                SM'24 Campus Ambassador
              </h5>
              <h1 className="mb-3">Thank you for registering for Cap.</h1>
              <p className="mb-5">Our team will contact you soon with further details.</p>
            </div>
        ) : (
          <>
            <div className="text-center fadeInUp" data-wow-delay="0.1s">
              <h5 className="text-primary-gradient fw-medium">
                SM'24 Campus Ambassador
              </h5>
              <h1 className="mb-5">Fill out the below form</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="fadeInUp" data-wow-delay="0.3s">
                  <p className="text-center mb-4">Name: {data.name}</p>
                  <p className="text-center mb-4">Email: {data.email}</p>
                  {data.sm_id && (
                    <p className="text-center mb-4">SmId: {data.sm_id}</p>
                  )}
                  <p className="text-center mb-4">College: {data.college}</p>
                  <p className="text-center mb-4">Contact: {data.contact}</p>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Major/Area of Study"
                            onChange={(e) => setMajor(e.target.value)}
                            required
                          />
                          <label htmlFor="name">Major/Area of Study</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            placeholder="Current Year of Study"
                            onChange={(e) => setYos(e.target.value)}
                            required
                          />
                          <label htmlFor="number">Current Year of Study</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="(yes/no)"
                            onChange={(e) => setSm(e.target.value)}
                            required
                          />
                          <label htmlFor="subject">
                            Have you attended SM? (Yes / No)
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            style={{ height: "150px" }}
                            onChange={(e) => setWhysm(e.target.value)}
                            required
                          ></textarea>
                          <label htmlFor="message">
                            Why do you want to be a SM CAP? (100 words)
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Propose an idea to promote SM"
                            style={{ height: "150px" }}
                            onChange={(e) => setIdea(e.target.value)}
                            required
                          ></textarea>
                          <label htmlFor="message">
                            Propose an idea to promote SM (50 words)
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Experience with leadership roles"
                            style={{ height: "150px" }}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                          ></textarea>
                          <label htmlFor="message">
                            Experience with leadership roles? (50 words)
                          </label>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <button
                          className="btn btn-primary-gradient rounded-pill py-3 px-5"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CapSection;
