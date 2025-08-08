import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { matchPath, useLocation, Link } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const SearchSection = () => {
    const location = useLocation()
    const isOnPath = matchPath('/cart', location.pathname)
    const [searhTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const searchRef = useRef(null)

    const searchGames = async (query) => {
        try {
            const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(query)}&key=${API_KEY}`;
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error("Error while searching");
            }
            const data = await res.json()
            setSearchResults(data.results.slice(0, 5))

        } catch (error) {
            console.log(error)
        }
    }

    const handleFocus = () => setIsVisible(true)

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutSide)
        return () => document.removeEventListener('mousedown', handleClickOutSide)
    })

    useEffect(() => {
        if (searhTerm != '') {
            console.log(searhTerm)
            searchGames(searhTerm)
        }
        if (searhTerm === '') {
            setSearchResults([])
        }
    }, [searhTerm])
    return (
        <div className='max-w-[1200px] m-auto flex items-center justify-between p-4 gap-6 '>
            <div className="flex items-center gap-2 bg-gray-900 rounded-4xl p-2 px-4 relative w-full max-w-[400px]" ref={searchRef}>
                <FaSearch size={20} color='#fff' titel="search-icon" />
                <input onFocus={handleFocus} type="text" value={searhTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search'
                    className='focus:outline-none w-full' />

                {
                    searchResults.length > 0 && isVisible && (
                        <div className="w-full max-w-[400px] p-4
                        absolute top-[130%] z-50 flex flex-col gap-2
                        bg-zinc-900 rounded-2xl
                        ">
                            {
                                searchResults.map(item => (
                                    <Link onClick={() => setIsVisible(prev => !prev)} key={item.id} to={`./game/${item.id}`} className='p-2 px-4 hover:bg-zinc-800 rounded text-gray-400 hover:text-gray-50'>
                                        {item.name}
                                    </Link>
                                ))
                            }
                        </div>
                    )
                }
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