import React, { useContext, useRef, useState } from 'react'
import { CartContext } from '../context/CartProvider';
import { Link } from 'react-router-dom';

const CartItem = ({ game }) => {
    const {removeFromCart} = useContext(CartContext)
    const [removeBtnText, setRemoveBtnText] = useState('Remove')
    const removeBtnRef = useRef(null)
    const addedDate = new Date(game.added_at);
    const year = addedDate.getFullYear();
    const month = String(addedDate.getMonth() + 1).padStart(2, '0');
    const day = String(addedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const handleRemoveFromCart = async () => {
        setRemoveBtnText('Removing..')
        removeBtnRef.current.disabled = true
        await removeFromCart(game.game_id)
    }

    return (
        <div className='p-4 flex items-center gap-6 hover:bg-gray-700 rounded transition hover:scale-101 group'>
            <div className="h-20 aspect-square rounded overflow-hidden bg-cover bg-center" style={{backgroundImage : `url('${game.game_bg}')`}}>
                {/* <img src={game.game_bg} alt={game.game_name}
                    className='
                        h-full w-full bg-cover
                        '/> */}
            </div>
            <div className="opacity-50 group-hover:opacity-100 flex flex-col gap-1 sm:gap-2 w-full">
                <div className="font-bold sm:text-xl">{game.game_name.length > 12 ? game.game_name.slice(0,11) : game.game_name}</div>
                <div className="flex flex-col gap-2 md:flex justify-between">
                    <div className="opacity-50 w-fit text-center text-sm leading-none flex items-center">{`Added at : ${formattedDate}`}</div>
                    <div className="flex gap-4">
                        <Link to={`/game/${game.game_id}`} className='cursor-pointer py-1 px-4 bg-blue-700 rounded w-fit'>Visit</Link>
                        <button ref={removeBtnRef} onClick={handleRemoveFromCart} className='cursor-pointer py-1 px-4 bg-red-700 rounded w-fit'>{removeBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem