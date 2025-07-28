import React from 'react'
import Hero from '../components/Hero'
import CarouselSlide from '../utils/CarouselSlide'
import NewReleases from '../components/NewReleases'

const HomePage = () => {
  return (
    <div className='max-w-[1200px] m-auto'>
        <Hero />
        <NewReleases />
    </div>
  )
}

export default HomePage