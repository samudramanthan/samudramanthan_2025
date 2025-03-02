import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventDetail from "../components/EventDetail";
import EventData from "../data/EventData";
import EventSection from "../components/EventSection";
function Event({event}) {
    // const { link } = useParams(); // Extracting 'link' from URL
    // const event = EventData.find(event => event.link === link); // Finding event by link

    // if (!event) {
    //     return <h2 className="text-center mt-5">Event not found</h2>;
    // }

    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl position-relative p-0" id="home">
                <Navbar />
            </div>
            <EventDetail event={event}/> {/* Passing event data as prop */}
            <Footer />
        </div>
    );
}

export default Event;
