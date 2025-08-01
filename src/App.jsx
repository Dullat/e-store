import { useEffect, useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import getGames from './data/getGames.js'
import GameCard from './components/GameCard.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import { CartProvider } from './context/CartProvider.jsx'

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
      const data = await getGames(`&ordering=-rating&page_size=5&dates=2023-01-01,2024-12-31`)
      setGames(data.results)
    }

    fetchGames()
  }, [])

  return (
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  )
}

export default App
