import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages:guest
import { TeamRegister, HomePage, SoloRegistration, TeamRegistration, DuoRegistration,PhoneRegister, ProfilePage, Login, Register } from './pages';

// pages:admin
import Dashboard from './admin/pages/dashboard';
import Sports from './admin/pages/sports';
import Teams from './admin/pages/teams';
import Fixtures from './admin/pages/fixtures';
import Notice from './admin/pages/notice';
import MatchFixture from './admin/pages/fixtures/MatchFixture';

// fonts:
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// css:
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
      <Route path="/" element={<TeamRegister />} />
      <Route path="team-registration/:sportName" element={<TeamRegistration />} />
      <Route path="duo-registration/:sportName" element={<DuoRegistration />} />
      <Route path="solo-registration/:sportName" element={<SoloRegistration />} />
    </Routes>
  )
}

const Admin = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="sport" element={<Sports />} />
      <Route path="team" element={<Teams />} />
      <Route path="fixture/*" element={<Matches />} />
      <Route path="notice" element={<Notice />} />
    </Routes>
  )
}
const Matches = () => {
  return (
    <Routes>
      <Route path="/" element={<Fixtures />} />
      <Route path="game" element={<MatchFixture />} />
    </Routes>
  )
}

export default App;
