import { useEffect, useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import getGames from './data/getGames.js'
import GameCard from './components/GameCard.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={<HomePage />} />
    </Route>
  )
)

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
    <RouterProvider router={router}></RouterProvider>


    // <main className='min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1c1c1c] to-[#111] text-white'>
    //   <Header />
    //   <section className='flex flex-wrap justify-center gap-6 px-4 py-8 pt-7 '>
    //     {
    //       games.map((game) => (
    //         <GameCard key={game.id} game={game} />
    //       ))
    //     }
    //   </section>
    // </main>
  )
}

export default App
