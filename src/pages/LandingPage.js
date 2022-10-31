import React from 'react'
import HomePage from '../components/Home'
import NavBar from '../components/NavBar'

const Home = () => {
  return (
    <div className='bg-black'>
      <div className="unslate_co--site-inner overflow-x-hidden">
        <NavBar />
        <HomePage />
      </div>
    </div>
  )
}

export default Home
