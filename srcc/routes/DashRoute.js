import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { Routes, Route } from 'react-router-dom';
import DashboardHeader from '../components/DashHeader'
import Team from '../components/Team';
import Graph from '../components/Graph';


const DashRoute = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <>
      <div className='flex flex-col min-h-screen bg-gray-200'>
        <DashboardHeader />
        <SideBar toggle={handleClick} style="hidden lg:flex"/>
        <Routes>
          <Route path="/team" element={<Team />} />
          <Route path="/dashboard" element={<Graph />} />

        </Routes>
      </div>
    </>

  )
}

export default DashRoute
