import { useEffect, useState } from "react"
import CarouselSlide from "../utils/CarouselSlide"
import getGames from "../data/getGames"

const IndieGames = () => {
    const [games, setGames] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const prefs = `&genres=indie&ordering=-rating&page_size=12&dates=2020-01-01,2025-12-31&metacritic=70,100`

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
            <CarouselSlide games={games} isLoading={isLoading} isError={isError} sectionTitle={'Indie Games'} />
            <p className="py-2 opacity-50 text-sm text-center">Support indie devs and small studios</p>
        </>
    )
}

export default IndieGames