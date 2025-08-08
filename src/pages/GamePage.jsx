import React, { useEffect, useState } from 'react'
import GameHero from '../components/GameHero'
import { Link, useParams } from 'react-router-dom'
import AddToCart from '../components/AddToCart'
import GamePageSkeleton from '../components/GamePageLoadingSkel'
import ScrollToTop from '../components/ScrollToTop'
const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const GamePage = () => {
    const [game, setGame] = useState({})
    const [screenshots, setScreenShots] = useState([])
    const [trailers, setTrailers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showFull, setShowFull] = useState(false)
    const [gameDes, setGameDes] = useState('')

    const { id } = useParams()
    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const [gameRes, screenRes, trailersRes] = await Promise.all([
                    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`),
                    fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`),
                    fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
                ])

                const gameData = await gameRes.json()
                console.log(gameData);

                const screenshotsData = await screenRes.json()
                const trailersData = await trailersRes.json()

                setGame(gameData)
                setScreenShots(() => {
                    return screenshotsData.results.length > 2 ? (
                        screenshotsData.results.slice(0, 4)
                    ) :
                        (
                            screenshotsData.results
                        )
                })

                setTrailers(() =>
                    trailersData.results.length > 5 ?
                        trailersData.results.slice(0, 1) :
                        trailersData.results
                )
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }


        fetchMedia()
    }, [id])

    const handleDes = () => {
        setShowFull(prev => !prev)
    }

    useEffect(() => {
        if (game?.description) {
            if (showFull) {
                setGameDes(game.description);
            } else {
                if(game.description.length < 250){
                    setGameDes(game.description)
                    return
                }
                const clean = game.description.slice(0, 250).trim();
                const noPartialTags = clean.replace(/<[^>]*$/, '');
                setGameDes(`${noPartialTags}...`)
            }
        }
    }, [showFull, game.description, loading]);

    if (loading) return <GamePageSkeleton />
    return (
        <div className='max-w-[1200px] m-auto p-4 flex flex-col'>
            <ScrollToTop />
            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-white my-4'>{game.name}</h1>
            <div className="grid lg:grid-cols-[5fr_2fr] gap-4">
                <GameHero game={game} screenshots={screenshots} trailers={trailers} />
                <div className="flex flex-col gap-4">
                    <div className="w-full aspect-video rounded overflow-hidden relative hidden lg:block">
                        <img src={game.background_image} alt={game.name} className='h-full w-full object-cover' />
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-around">
                            <p className='md:font-bold'>{game.name}</p>
                        </div>
                    </div>
                    <ul className='flex flex-col gap-4'>
                        <button className='py-2 max-w-full bg-white text-black rounded'>Purchase</button>
                        <AddToCart gameId={game.id} gameName={game.name} gameBg={game.background_image} type='from-game' />
                        <hr />
                        <div className="flex justify-between">
                            <p>Release Date</p>
                            <p>{
                                new Date(game.released).toLocaleDateString('en-us', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                            }</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Last Updated</p>
                            <p>{
                                new Date(game.updated).toLocaleDateString('en-us', {
                                    year: 'numeric',
                                    day: 'numeric',
                                    month: 'short',
                                })
                            }</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Publisher</p>
                            <p>{game.publishers[0]?.name}</p>
                        </div>

                    </ul>
                </div>
            </div>
            <div
                className="text-white text-sm leading-relaxed my-6"
                dangerouslySetInnerHTML={{ __html: gameDes }}
            >

            </div>
            <button onClick={handleDes} className={`text-blue-700 text-sm ml-auto cursor-pointer ${game.description.length < 250 ? 'hidden' : ''}`}>{showFull ? 'Show Less' : 'Show Full'}</button>

            <hr className='my-4' />
            <div className="w-full">
                <h1 className='text-white font-bold text-2xl mb-4'>Genres</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    {
                        game.genres.map(item => {
                            return (<div key={item.id} className="relative flex-1 min-w-[100px] max-w-[250px] basis-[200px]
                            rounded-[.5rem] overflow-hidden">
                                <div className="">
                                    <img src={item.image_background} alt="" />
                                </div>
                                <div className="absolute inset-0 
                                bg-[radial-gradient(circle,rgba(0,0,0,.3)_30%,rgba(0,0,0,0.8)_100%)]
                                pointer-events-none
                                flex items-center justify-center"
                                >
                                    {item.name}
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
            <hr className='my-4 mt-6' />
            <div className="">
                <p className='text-white font-bold text-2xl mb-6'>Avalable on</p>
                <div className="flex flex-wrap justify-center gap-8">
                    {
                        game?.stores.length > 0 ?(
                            (
                            game.stores.map(item => {
                            return (
                                <a href={`https://${item.store.domain}`} target='_blank' key={item.id}>
                                    <div className="flex flex-1 min-w-[70px] max-w-[150px] basis-[100px] rounded-full overflow-hidden aspect-square relative">
                                        <div className="h-full w-full ">
                                            <img className='h-full w-full object-cover' src={item.store.image_background} alt="" />
                                        </div>
                                        <div className="absolute inset-0 
                                        bg-[radial-gradient(circle,rgba(0,0,0,.3)_30%,rgba(0,0,0,0.8)_100%)]
                                        pointer-events-none
                                        flex items-center justify-center
                                        text-xl font-bold"
                                        >
                                            {item.store.name.length > 12 ? item.store.name.slice(0,12) : item.store.name}
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                        )
                        ) : (
                            <p className='my-10'>No data...</p>
                        )
                    }
                </div>
            </div>
            {/* <p>{game.description}</p> */}
        </div>
    )
}

export default GamePage