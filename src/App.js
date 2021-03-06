import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OneSignal from 'react-onesignal'

// pages:guest
import { TeamRegister, HomePage, SoloRegistration, TeamRegistration, DuoRegistration,PhoneRegister, ProfilePage, Login, Register, Fixture, MatchDetails} from './pages';

// pages:admin
import Dashboard from './admin/pages/dashboard';
import Sports from './admin/pages/sports';
import Teams from './admin/pages/teams';
import Fixtures from './admin/pages/fixtures';
import Notice from './admin/pages/notice';
import Matches from './admin/pages/fixtures/MatchFixture';
import UserDetail from './admin/pages/users';
import TeamDetail from './admin/pages/teams/TeamDetail';

// css:
import './App.css';
import TieSheet from './pages/TieSheet';
import League from './pages/League';

const App = () => {
  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-register" element={<PhoneRegister />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/fixture" element={<Fixture />} />
        <Route path="/fixture/details/:sport/:sportType" element={<MatchDetails />} />
        <Route path="/tie-sheet" element={<TieSheet />} />
        <Route path="/league" element={<League />} />
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
      <Route path="team/details/:teamId" element={<TeamDetail />} />
      <Route path="fixture/*" element={<AdminFixture />} />
      <Route path="notice" element={<Notice />} />
      <Route path="userDetail" element={<UserDetail />} />
    </Routes>
  )
}
const AdminFixture = () => {
  return (
    <Routes>
      <Route path="/" element={<Fixtures />} />
      <Route path="matches/:type" element={<Matches />} />
    </Routes>
  )
}

export default App;
