import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <main className='min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1c1c1c] to-[#111] text-white'>
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}

export default RootLayout