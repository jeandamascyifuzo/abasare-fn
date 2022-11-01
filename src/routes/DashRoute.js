import React from 'react'
import SideBar from '../components/SideBar'
import { Routes, Route } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader'
import Team from '../dashboardComponents/Team';

const DashRoute = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-black'>
        <DashboardHeader />
        <SideBar style="hidden lg:flex" />
        <Routes>
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </>

  )
}

export default DashRoute

