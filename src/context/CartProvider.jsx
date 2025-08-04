import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AuthContext } from './AuthProvider'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartStatus, setCartStatus] = useState(false)
  const { userProfile } = useContext(AuthContext)
  const [cartId, setCartId] = useState(null)

  const addToCart = async (gameId, gameName, gameBg) => {
    if (cartId !== null) {
      const { data, error } = await supabase
        .from('cart_items')
        .insert([
          {
            game_id: gameId,
            cart_id: cartId,
            game_name: gameName,
            game_bg: gameBg
          }
        ]).select()
      if (error) {
        console.log(`supabase insertion error : ${error}`)
      }

      if (data) {
        await getData()   // we should await here for correct order of return and log
        // console.log(data)
        return { success: 'inserted' }
      }
    } else {
      console.warn('No cart_id')
    }
  }

  const removeFromCart = async (gameID) => {
    if (!cartId) return
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('game_id', gameID)
      .select() // this select is filling data and error
    if (error) {
      console.log('Supabase Error Deleting:', error)
      return { error: 'cant delete data' }
    }

    if (data) {
      console.log(data)
      await getData()
    }
  }

  const getData = async () => {
    if (!cartId) return
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cartId)

    if (error) {
      console.log('Supabase Error:', error)
      return
    }

    console.log('Fetched Cart Items:', data)
    setCart(data)
  }

  const checkCartStatus = async () => {
    if (userProfile?.id) {
      const { data: isCart, error } = await supabase.from('carts').select('*').eq('user_id', userProfile.id).single()

      if (isCart !== null) {
        console.log(isCart.id, 'cart id');
        setCartId(isCart.id)
        setCartStatus(true)
      }

      if (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    checkCartStatus()
  }, [userProfile?.id])

  useEffect(() => {
    getData()
  }, [cartId])

  useEffect(() => {
    if (!userProfile?.id) {
      setCartId(null)
      setCart(null)
    }
  }, [userProfile])

  return (
    <CartContext.Provider value={{ cart, cartStatus, getData, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
