import React, { useEffect, useState } from 'react'
import getGames from '../data/getGames'
import CarouselSlide from '../utils/CarouselSlide'

const prefs = `&platforms=21,3&ordering=-rating&page_size=12`

const MobileGames = () => {
    const [games, setGames] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getGames(prefs)
                setGames(data.results)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                console.log(`Error from "MobileGames" : ${error}`)
            }
        }

        getData()
    },[])
    
    if(isLoading) return `Loading............`
    if(isError) return `Error occured............`
    return (
        <CarouselSlide games={games} isError={isError} isLoading={isLoading} sectionTitle={'Mobile Games'} />
    )
}

export default MobileGames