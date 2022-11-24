import React from 'react'
import Login from '../components/Login'
import SignIn from '../components/SignIn'
import TestUpload from '../components/TestUpload'
import FileUpload from '../Upload/Upload'
// import NavBar from '../components/NavBar'

const Home = () => {
  return (
    <div className='bg-white'>
      <div className="unslate_co--site-inner overflow-x-hidden">
        {/* <NavBar /> */}
        {/* <Login /> */}
        <SignIn />
        {/* <TestUpload/> */}
        {/* <FileUpload/> */}
      </div>
    </div>
  )
}

export default Home
