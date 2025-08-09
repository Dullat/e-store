***

# 🎮 e-Store

A fully responsive, dark-themed, RAWG/Epic/Steam inspired game storefront.
Browse games, add to cart, authenticate, manage your profile, and enjoy delightful UI/UX—built with React, TailwindCSS, and public APIs. 

Visit here : https://e-store-silk-kappa.vercel.app/

***

## 🚀 Features

- **Beautiful, mobile-first design:**  
  - Smooth gradients, glassy overlays, and subtle glowing effects throughout.
  - Clean dark/light contrast for easy readability.
- **Horizontal scrollable game carousels:**  
  - Auto-snap, consistent card heights, fun platform and rating badges.
- **Game details page:**  
  - Slideshow with animated transitions, genre chips, ratings, metacritic scores, and more.
  - Animated shimmer skeleton loaders for fast/light loading.
- **Responsive sidebar navigation:**  
  - Hamburger menu slides open on mobile; account details and nav links in a beautiful sidebar.
  - Sidebar closes automatically when you click navigation links or buttons inside.
- **Authentication and profile:**  
  - Secure sign up/login, avatar and username management powered by Supabase/Appwrite.
  - Context-based profile access with clean per-page logic.
- **Cart functionality:**  
  - Add games to cart with visual feedback and real-time updates.
  - Prevents adding to cart if user is not logged in (shows toast notification).
- **Toast notifications:**  
  - Top-right, fully themed, with animation.
  - Supports multiple toasts at once (stacking).
- **GitHub Pages and Vercel-ready deployment:**  
  - SPA routing with auto scroll-to-top on route change for mobile UX.
- **404 Page:**  
  - Custom dark-themed 404 page.
- **Instant search and browse:**  
  - Discover games, filter by platforms/genres, and view news.

***

## 🔗 Powered By

- [Supabase](https://supabase.com/) – authentication, database and user management
- [Appwrite](https://appwrite.io/) – API integration and back-end
- [RAWG.io Games Database](https://rawg.io/apidocs) – game data, images, ratings, trailers
- [React](https://react.dev/) – frontend SPA
- [TailwindCSS](https://tailwindcss.com/) – utility-first styling
- [Vercel](https://vercel.com/) / [GitHub Pages](https://pages.github.com/) – hosting & deploy

***

## 📲 How To Run Locally

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/dullat-gamestore.git
   cd dullat-gamestore
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up `.env.local` (never push secrets!)**
   ```
   VITE_RAWG_API_KEY=your_rawg_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   APPWRITE_ENDPOINT=your_appwrite_endpoint
   APPWRITE_PROJECT=your_appwrite_project
   ```
see official docs.

4. **Start the App**
   ```bash
   npm run dev    # for Vite
   ```


***

## 💎 Specialities

- **Modern, snappy animations**: shimmer, fading, sliding, progress bars
- **Carefully managed API keys/secrets, never committed**
- **Industry best practices**: scroll-to-top on navigation, instant feedback, skeleton loading
- **Easy to extend:** add new pages, APIs, gamification, and more!

***

## ✨ Credits

- Inspired by RAWG, Epic Games Store, Steam, and PlayStation Store UI paradigms.
- Data by RAWG.io, authentication via Supabase/Appwrite.
- Icons by React Icons & Lucide.

***

## 🛠️ Contributing

- PRs, issues, and feedback are welcome!

***
