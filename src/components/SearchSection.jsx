import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'

const SearchSection = () => {
    const [searhTerm, setSearchTerm] = useState('')
    return (
        <div className='max-w-[1200px] m-auto flex items-center justify-between p-4  '>
            <div className="flex items-center gap-2 bg-gray-900 rounded-4xl p-2 px-4">
                <FaSearch size={20} color='#fff' titel="search-icon" />
                <input type="text" value={searhTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search'
                    className='focus:outline-none' />
            </div>
            <div className="">
                <FaCartShopping />
            </div>
        </div>
    )
}

export default SearchSection