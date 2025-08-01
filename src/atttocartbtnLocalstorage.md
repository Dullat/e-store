import React, { useEffect, useState } from 'react'

const AddToCart = ({gameId}) => {
    const [btnText, setBtnText] = useState('Add to Cart')
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        setBtnText("adding...")
        addToLocalStorage()
        setIsAdded(true)
    }
    
    useEffect(() => {
        const cartData = loadFromStorage()
        if(cartData){
            cartData.some(item => item.id === gameId)
            setIsAdded(true)
        }
    },[])

    useEffect(() => {
        const checkStatus = () => {
            isAdded && setBtnText('Added')
        }
        checkStatus()
    }, [isAdded])
    return (
        <div className='relative'>
            <button onClick={handleAddToCart} className={`absolute bottom-0 left-[50%] transform-gpu translate-x-[-50%] z-50 mb-2 px-2 py-1 text-xs rounded ${isAdded ? 'cursor-not-allowed opacity-70 bg-gray-400' : 'cursor-pointer bg-[rgba(51,134,243,0.5)] hover:bg-[rgba(51,134,243,0.97)]'}`}>{btnText}</button>
        </div>
    )
}

const loadFromStorage = () => {
    const localStore = localStorage.getItem('gamesCart')
    let cart;
    if (localStore) {
        cart = JSON.parse(localStore)
        console.log(cart)
        return cart
    }
    return null
}

const addToLocalStorage = () => {
    const cart = loadFromStorage()
    if (cart) {
        const newCart = [...cart, { id: 1, name: 'idk' }]
        localStorage.setItem('gamesCart', JSON.stringify(newCart))
    } else {
        localStorage.setItem('gamesCart', JSON.stringify([{ id: 1, name: 'idk' }]))
    }

}

export default AddToCart