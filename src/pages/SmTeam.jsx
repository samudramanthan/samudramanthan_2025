import React from "react";
import Team from "../components/Team";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SmTeam() {
  return (
    <>
      <div className="container-xxl bg-white p-0">
        <div className="container-xxl position-relative p-0" id="home">
          <Navbar page="team"/>
        </div>
        <Team />
        <Footer />
      </div>
    </>
  );
}

export default SmTeam;
