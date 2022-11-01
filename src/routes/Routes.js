import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';

function MainRoutes() {
  return (
    <div className="">
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;