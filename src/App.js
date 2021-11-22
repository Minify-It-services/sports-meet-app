import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PhoneRegister from './pages/PhoneRegister/index'
import Login from './pages/Login/index'
import Profile from './pages/Profile/index'

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
