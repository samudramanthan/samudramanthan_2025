import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Event from './pages/Event';
import EventData from './data/EventData';
import About from './pages/About';
import SmTeam from './pages/SmTeam';
import Gallery from './pages/Gallery';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/TermsAndConditions';
import CancellationRefundPolicy from './pages/RefundPolicy';
import Contact from './pages/contact';
// import Cap from './pages/Cap';
// import Schedule from './pages/Schedule';
import Profile from './pages/profile';
import AllEvent from './pages/AllEvent';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {EventData.map((event) => (
          <Route path={`/event/${event.link}`} element={<Event event={event} />} />
        ))}
        <Route path='/events' element={<AllEvent />} />
        <Route path="/about" element={<About />} />
        <Route path='/team' element={<SmTeam />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/cap' element={<Cap />} /> */}
        {/* <Route path='/schedule' element={<Schedule />} /> */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/refund-policy' element={<CancellationRefundPolicy />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
