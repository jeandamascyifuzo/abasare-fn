import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import ResetPassword from '../components/ForgetPassword';

function MainRoutes() {
  return (
    <div className="">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/reset" exact element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;