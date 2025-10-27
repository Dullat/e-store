import { useEffect, useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Header from "./components/Header";
import getGames from "./data/getGames.js";
import GameCard from "./components/GameCard.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import CartPage from "./pages/CartPage.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import LoginForm from "./features/profile/LoginForm.jsx";
import UserPage from "./pages/UserPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ToastProvider from "./context/ToastProvider.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import store from "./app/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/game/:id" element={<GamePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <RouterProvider router={router}></RouterProvider>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
