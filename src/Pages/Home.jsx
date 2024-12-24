import React from 'react'
import Navbar from '../Components/Home/navbar'
import HeroSection from '../Components/Home/HeroSection'
import MainSection from '../Components/Home/MainSection'
import Footer from '../Components/Home/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <MainSection/>
      <Footer/>
    </div>
  )
}

export default Home
