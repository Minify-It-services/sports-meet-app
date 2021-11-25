import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages:guest
import { SportPage, HomePage, SoloRegistration, TeamRegistration, DuoRegistration,PhoneRegister, ProfilePage, Login } from './pages';

// pages:admin
import Dashboard from './admin/pages/dashboard';
import Sports from './admin/pages/sports';
import Teams from './admin/pages/teams';
import Fixtures from './admin/pages/fixtures';
import Notice from './admin/pages/notice';

import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/phone-register" element={<PhoneRegister />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/teamRegister/*" element={<Team />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

const Team = () => {
  return (
    <Routes>
      <Route path="sportSelect" element={<SportPage />} />
      <Route path="team-registration" element={<TeamRegistration />} />
      <Route path="duo-registration" element={<DuoRegistration />} />
      <Route path="solo-registration" element={<SoloRegistration />} />
    </Routes>
  )
}

const Admin = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="sports" element={<Sports />} />
      <Route path="teams" element={<Teams />} />
      <Route path="fixtures" element={<Fixtures />} />
      <Route path="notice" element={<Notice />} />
    </Routes>
  )
}

export default App;
