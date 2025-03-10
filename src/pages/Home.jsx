import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import EventSection from "../components/EventSection";
import Tshirt from "../components/Tshirt";
import DJ_Night from "../components/DJ_Night";
import Sponsars from "../components/Sponsars";
import SpecialRegistration from "../components/SpecialRegistration";

function Home() {
  return (
    <>
      <div className="container-xxl bg-white p-0">
        <div className="container-xxl position-relative p-0" id="home">
          <Navbar page="home" />
          <Hero />
          <SpecialRegistration />
        </div>
        <Sponsars />
        {/* <EventSection /> */}
        <Tshirt />
        <DJ_Night/>
        <Footer />
        
      </div>
    </>
  );
}

export default Home;
