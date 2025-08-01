import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { matchPath, useLocation, Link } from 'react-router-dom'

const SearchSection = () => {
    const location = useLocation()
    const isOnPath = matchPath('/cart', location.pathname)
    const [searhTerm, setSearchTerm] = useState('')
    return (
        <div className='max-w-[1200px] m-auto flex items-center justify-between p-4  '>
            <div className="flex items-center gap-2 bg-gray-900 rounded-4xl p-2 px-4">
                <FaSearch size={20} color='#fff' titel="search-icon" />
                <input type="text" value={searhTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search'
                    className='focus:outline-none' />
            </div>
            <div className="">
                {
                    isOnPath ? (
                        <Link to="/" onMouseEnter={(e) => {
                            e.target.style.textShadow = '0 0 35px blue';
                        }}
                            onMouseLeave={(e) => {
                                e.target.style.textShadow = 'none';
                            }} className='text-blue-600 text-sm'>Back To Home
                        </Link>
                    ) : (
                        <Link to="/cart" ><FaCartShopping /></Link>
                    )
                }
            </div>
        </div>
    )
}

export default SearchSection