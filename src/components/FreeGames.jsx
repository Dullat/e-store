import { useEffect, useState } from "react"
import getGames from "../data/getGames"
import FreeGameCard from "./FreeGameCard"

const freeGamesPrefs = `&dates=2025-07-21,2025-07-28&ordering=-added&tags=free-to-play&page_size=3`
const FreeGames = () => {
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getGames(freeGamesPrefs)
                console.log(data.results)
                setGames(data.results)
            } catch (error) {
                console.log(`Error form Free games: ${error}`)
            }
        }
        getData()
    }, [])

    return (
        <div className='w-full bg-gray-900 p-4 rounded-2xl'>
            <div className="text-2xl font-bold py-4 px-6">
                Free Games
            </div>
            <div className="flex w-full">
                <div className="flex items-center w-full">
                    {
                        games.map(game => (
                            <FreeGameCard key={game.id} game={game} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FreeGames