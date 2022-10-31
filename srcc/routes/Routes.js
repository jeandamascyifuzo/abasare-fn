import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';

function MainRoutes() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;