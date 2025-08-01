import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = async (gameId, gameName, gameBg) => {
    const { data, error } = await supabase
      .from('cart_items')
      .insert([
        {
          game_id: gameId,
          cart_id: 12,
          game_name: gameName,
          game_bg: gameBg
        }
      ]).select()
    if (error) {
      console.log(`supabase insertion error : ${error}`)
    }

    if(data){
      console.log(data)
      return {success: 'inserted'}
    }
  }

  const getData = async () => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', 12)

    if (error) {
      console.log('Supabase Error:', error)
      return
    }

    console.log('Fetched Cart Items:', data)
    setCart(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
