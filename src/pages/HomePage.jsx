import { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import NewReleases from '../components/NewReleases'
import BestSellers from '../components/BestSellers'
import FreeGames from '../components/FreeGames'
import IndieGames from '../components/IndieGames'
import PopularDevs from '../components/PopularDevs'
import MobileGames from '../components/MobileGames'
import AddToCart from '../components/AddToCart'
import { CartContext } from '../context/CartProvider'

const HomePage = () => {
  const {cart} = useContext(CartContext)
  useEffect(() => {
console.log(cart, 'jhjh')
  },[cart])
  useEffect(() => {
    console.log('HomePage mounted')
  }, [])
  return (
    <div className='max-w-[1200px] m-auto'>
        <Hero />
        <NewReleases />
        <BestSellers />
        <FreeGames />
        <IndieGames />
        <hr />
        <PopularDevs />
        <hr />
        <MobileGames />
    </div>
  )
}

export default HomePage