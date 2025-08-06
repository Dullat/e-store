import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartProvider'
import { Plus } from 'lucide-react'

const AddToCart = ({ gameId, gameName, gameBg, type = '' }) => {
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
            isAdded === true ? setBtnText('in Cart') : ''
        }
        checkStatus()
    }, [isAdded])
    if (type === 'from-hero') return (
        <button
            disabled={isAdded} onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-6 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm ${isAdded ? 'cursor-not-allowed opacity-70 bg-gray-400' : 'cursor-pointer bg-[rgba(51,134,243,0.5)] hover:bg-[rgba(51,134,243,0.97)]'}`}>
            <Plus size={20} />
            {btnText}
        </button>
    )
    return (
        <button disabled={isAdded} onClick={handleAddToCart} className={`absolute bottom-0 left-[50%] transform-gpu translate-x-[-50%] z-50 hidden group-hover:block mb-2 cursor-pointer px-2 py-1 text-xs rounded ${isAdded ? 'cursor-not-allowed opacity-70 bg-gray-400' : 'cursor-pointer bg-[rgba(51,134,243,0.5)] hover:bg-[rgba(51,134,243,0.97)]'}`}>{btnText}</button>
    )
}


export default AddToCart