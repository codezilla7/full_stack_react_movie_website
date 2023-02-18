import React from 'react'
import Categories from './Categories'
import Footer from './Footer'
import Movies from './Movies'
import Navbar from './Navbar'
import SliderHome from './SliderHome'

export default function Home() {
  return (
    <>
    <div className='homepage'>
      <Navbar />
      <SliderHome />
      <div className='homepage-div'>
      <Movies></Movies>
      <Categories></Categories>
      </div>
      <Footer />
    </div>
    </>
  )
}
