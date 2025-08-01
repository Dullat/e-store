import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartProvider'
import CartItem from '../components/CartItem'

const CartPage = () => {
    const [filteredCart, setFilteredCart] = useState([])
    const { cart } = useContext(CartContext)

    useEffect(() => {
        setFilteredCart(cart)
    }, [cart])
    return (
        <div className='w-full p-4 max-w-[900px] m-auto'>
            <p className='text-2xl font-bold my-4'>Your Cart</p>
            <div className="flex flex-col gap-4 w-full">
                {
                    filteredCart.map(item => (
                        <CartItem key={item.game_id} game={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default CartPage