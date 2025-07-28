import { useEffect, useState } from "react"
import CarouselSlide from "../utils/CarouselSlide"
import getGames from "../data/getGames"

const BestSellers = () => {
    const [games, setGames] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const prefs = `&platforms=4&dates=2023-01-01,2025-12-31&ordering=-added&page_size=12`


    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getGames(prefs)
                setGames(data.results)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                console.log(`At New Rel : ${error}`)
            }
        }

        getData()
    }, [])

    return (
        <>
        <CarouselSlide games={games} isLoading={isLoading} isError={isError} sectionTitle={'Best Sellers'}/>
        </>
    )
}

export default BestSellers