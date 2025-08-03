import { useEffect, useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import getGames from './data/getGames.js'
import GameCard from './components/GameCard.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import CartPage from './pages/CartPage.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import LoginForm from './components/LoginForm.jsx'
import UserPage from './pages/UserPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={<HomePage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/user' element={<UserPage />} />
    </Route>
  )
)

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
