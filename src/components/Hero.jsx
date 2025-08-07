import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Star } from 'lucide-react';
import getGames from '../data/getGames';
import AddToCart from './AddToCart';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [games, setGames] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWide, setIsWide] = useState(window.innerWidth >= 900)

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        setLoading(true);
        const data = await getGames(
          `&ordering=-rating&page_size=5&dates=2023-01-01,2024-12-31`
        );
        setGames(data.results);
      } catch (err) {
        setError('Failed to load games');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGames();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (games.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % games.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [games.length]);

  // Thumbnail conditional rendering
  useEffect(() => {
    const handleResize = () => {
      const winSize = window.innerWidth
      setIsWide(winSize > 900)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + games.length) % games.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) return <HeroSkeleton />;
  if (error) return (
    <div className="h-96 bg-gray-900 flex items-center justify-center text-red-400">
      {error}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden p-4">
      {/* Main Carousel */}
      <div className="relative w-full h-4/5 overflow-hidden rounded-2xl">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {games.map((game, index) => (
            <CarouselSlide
              key={game.id}
              game={game}
              isActive={index === currentSlide}
              isWide={isWide}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {/* <button
          className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          onClick={prevSlide}
        >
          <ChevronLeft size={15} />
        </button>
        <button
          className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          onClick={nextSlide}
        >
          <ChevronRight size={15} />
        </button> */}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {games.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-blue-500 scale-125'
                : 'bg-white/40 hover:bg-white/60'
                }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {
        isWide && (
          <div className="flex justify-center gap-4 p-4 backdrop-blur-md h-1/5 items-center overflow-x-auto">
            {games.map((game, index) => (
              <ThumbnailItem
                key={game.id}
                game={game}
                index={index}
                isActive={index === currentSlide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Hero;


const CarouselSlide = ({ game, isActive, isWide }) => {
  const backgroundImage = game.background_image || game.short_screenshots?.[0]?.image;

  return (
    <div
      className="flex-shrink-0 w-full bg-cover bg-center flex items-center relative rounded-2xl"
      style={{
        aspectRatio: isWide ? '5/2' : '',
        paddingTop: isWide ? '' : '2rem',
        paddingBottom: isWide ? '' : '4rem',
        backgroundImage: `linear-gradient(
          45deg, 
          rgba(0, 0, 0, 0.8) 0%, 
          rgba(0, 0, 0, 0.4) 50%, 
          rgba(0, 0, 0, 0.8) 100%
        ), url(${backgroundImage})`
      }}
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl text-white">
          {/* Status Badge */}
          <div className="mb-4">
            <span className="inline-block bg-emerald-400 text-gray-900 px-4 py-2 rounded font-semibold text-xs">
              {game.released > new Date().toISOString().split('T')[0] ? 'COMING SOON' : 'OUT NOW'}
            </span>
          </div>

          {/* Game Title */}
          <h1 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            {game.name}
          </h1>

          {/* Game Meta */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-300">Released: {game.released}</span>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="font-medium text-xs">{game.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-md leading-relaxed mb-8 text-gray-100">
            {game.description_raw || 'Experience the ultimate gaming adventure. Play Now'}...
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link to={`/game/${game.id}`} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl">
              <Play size={20} />
              {game.price ? `$${game.price}` : 'Play Free'}
            </Link>
            <AddToCart gameId={game.id} gameName={game.name} gameBg={game.background_image || game.short_screenshots?.[0]?.image} type={'from-hero'} />
            {/* <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-6 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              <Plus size={20} />
              Add to Wishlist
            </button> */}
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {game.genres?.slice(0, 3).map(genre => (
              <span
                key={genre.id}
                className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const ThumbnailItem = ({ game, index, isActive, onClick }) => {
  return (
    <div
      className={`block max-w-52 min-w-40 p-3 rounded-lg cursor-pointer transition-all duration-300 ${isActive
        ? 'bg-blue-600/20 border-2 border-blue-500'
        : 'bg-white/5 hover:bg-white/10'
        }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-md overflow-hidden group">
          <img
            src={game.background_image || game.short_screenshots?.[0]?.image}
            alt={game.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play size={16} className="text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm truncate">
            {game.name}
          </h4>
          <p className="text-gray-400 text-xs">
            {game.genres?.[0]?.name || 'Game'}
          </p>
        </div>
      </div>
    </div>
  );
};


const HeroSkeleton = () => {
  return (
    <div className="w-full h-[70vh] min-h-[600px]">
      {/* Main Skeleton */}
      <div className="h-4/5 relative flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-8 w-full z-10">
          <div className="max-w-2xl space-y-4">
            {/* Status Badge Skeleton */}
            <div className="w-24 h-8 bg-gray-700 rounded animate-pulse"></div>

            {/* Title Skeleton */}
            <div className="space-y-3">
              <div className="w-96 h-12 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-80 h-12 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Meta Skeleton */}
            <div className="flex gap-4">
              <div className="w-32 h-6 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-4">
              <div className="w-32 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-40 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2">
              <div className="w-16 h-6 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-14 h-6 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Skeleton */}
      <div className="flex gap-4 p-4 bg-black/30 h-1/5 items-center">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex-shrink-0 w-52 p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-2/3 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

