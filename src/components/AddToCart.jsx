import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartProvider'

const AddToCart = ({ gameId, gameName, gameBg }) => {
    const [btnText, setBtnText] = useState('Add to Cart')
    const [isAdded, setIsAdded] = useState(false)
    const { cart, addToCart } = useContext(CartContext)

    const handleAddToCart = async () => {
        setBtnText("adding...")
        const res = await addToCart(gameId, gameName, gameBg)
        if (res.success) {
            setIsAdded(true)
        } else {
            console.log("error");
        }
    }

    useEffect(() => {
        if (cart) {
            const boolData = cart.some(item => item.game_id === gameId)
            setIsAdded(boolData)
        }
    }, [])

    useEffect(() => {
        const checkStatus = () => {
            isAdded === true ? setBtnText('Already in Cart') : ''
        }
        checkStatus()
    }, [isAdded])
    return (
        <button disabled={isAdded} onClick={handleAddToCart} className={`absolute bottom-0 left-[50%] transform-gpu translate-x-[-50%] z-50 hidden group-hover:block mb-2 cursor-pointer px-2 py-1 text-xs rounded ${isAdded ? 'cursor-not-allowed opacity-70 bg-gray-400' : 'cursor-pointer bg-[rgba(51,134,243,0.5)] hover:bg-[rgba(51,134,243,0.97)]'}`}>{btnText}</button>
    )
}


export default AddToCart