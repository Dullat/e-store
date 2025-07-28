import { useEffect, useState } from "react"
import CarouselSlide from "../utils/CarouselSlide"
import getGames from "../data/getGames"

const NewReleases = () => {
    const [games, setGames] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const prefs = `&platforms=4&dates=2025-01-01,2025-12-31&ordering=-released&page_size=12`

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getGames(prefs)
                setGames(data.results)
                setIsLoading(false)
                console.log(data.results)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                console.log(`At New Rel : ${error}`)
            }
        }

        getData()
    }, [])

    return (
        <CarouselSlide games={games} isLoading={isLoading} isError={isError} />
    )
}

export default NewReleases