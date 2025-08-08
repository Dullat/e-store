import { useState, useEffect } from "react"
import { fetchDeveloperGames } from "../data/getPopularDevs"

const PopularDevCard = ({ dev }) => {
    const [games, setGames] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchDeveloperGames(dev.id)
                setGames(data.results)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
                console.log(`At PopularDevs Rel : ${error}`)
            }
        }

        getData()
    }, [])

    return (
        <div className='flex flex-col w-full rounded-2xl overflow-hidden pb-4'>
            <div className="w-[100%] h-[200px] [@media(min-width:880px)]:aspect-video">
                <img src={dev.image_background} alt="bg-image" className='h-full w-full object-cover' />
            </div>
            <div className="flex justify-between items-center w-full p-2 py-6">
                <p className="text-2xl font-bold">{dev.name}</p>
                <p className="bg-green-700 px-2 rounded text-xs font-bold py-1">{dev.games_count}</p>
            </div>
            <div className="flex flex-col gap-4 w-full justify-between h-full content-center">
                {
                    games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))
                }
            </div>

        </div>
    )
}

const GameCard = ({ game }) => {
    return (
        <>
            <div className="grid grid-cols-[1fr_4fr] gap-2 rounded overflow-hidden hover:bg-gray-800 p-2 cursor-pointer group">
                <div className="flex w-full md:aspect-[4/2] [@media(min-width:880px)]:aspect-square h-full bg-cover bg-center rounded overflow-hidden m-auto"
                style={{backgroundImage: `url('${game.background_image}')`}}
                >
                    {/* <img src={game.background_image} alt="bg image" className='w-full h-full object-cover' /> */}
                </div>
                <div className="flex flex-col p-2 opacity-70 group-hover:opacity-100 transition">
                    <p className="text-sm" title={game.name}>{game.name.length > 12? `${game.name.slice(0,12)}...`: game.name}</p>
                    <div className="flex gap-2 p-2">
                        {
                            game.genres.slice(0,2).map(gen => (
                                <span key={gen.id} className="bg-gray-500 px-2 rounded text-xs">{gen.name}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopularDevCard