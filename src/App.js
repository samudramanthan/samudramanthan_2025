import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Event from './pages/Event';
import EventData from './data/EventData';
import About from './pages/About';
import SmTeam from './pages/SmTeam';
import Gallery from './pages/Gallery';
import Register from './pages/Register';
import Profile from './pages/profile';
import AllEvent from './pages/AllEvent';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
// import AdminUsers from './pages/AdminUsers';
import AdminUserDetails from './pages/AdminUserDetails';
// import AdminEventDetails from './pages/AdminEventDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {EventData.map((event) => (
          <Route path={`/event/${event.link}`} element={<Event event={event} />} key={event.link} />
        ))}
        <Route path='/events' element={<AllEvent />} />
        <Route path="/about" element={<About />} />
        <Route path='/team' element={<SmTeam />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
        <Route path="/admin/user/:smId" element={<AdminUserDetails />} />
        {/* <Route path="/admin/event/:event" element={<AdminEventDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
