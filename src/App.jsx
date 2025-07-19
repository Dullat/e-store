import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import getGames from './data/getGames.js'
import GameCard from './components/GameCard.jsx'

function App() {
  const [games, setGames] = useState([])
  useEffect(() => {
    const fetchGames = async () => {
      const data = await getGames()
      setGames(data.results)
    }

    fetchGames()
  }, [])

  return (
    <main className='min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1c1c1c] to-[#111] text-white'>
      <Header />
      <section className='flex flex-wrap justify-center gap-6 px-4 py-8 pt-7 '>
        {
          games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        }
      </section>
    </main>
  )
}

export default App
