import { useEffect } from 'react'
import Hero from '../components/Hero'
import NewReleases from '../components/NewReleases'
import BestSellers from '../components/BestSellers'
import FreeGames from '../components/FreeGames'

const HomePage = () => {
  useEffect(() => {
    console.log('HomePage mounted')
  }, [])
  return (
    <div className='max-w-[1200px] m-auto'>
        <Hero />
        <NewReleases />
        <BestSellers />
        <FreeGames />
    </div>
  )
}

export default HomePage