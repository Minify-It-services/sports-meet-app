import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PhoneRegister from './pages/PhoneRegister/index'
import Login from './pages/Login/index'
import Profile from './pages/Profile/index'

import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TeamRegistration from './pages/TeamRegistration';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/phoneRegister" element={<PhoneRegister />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
