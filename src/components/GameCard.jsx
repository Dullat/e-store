import React, { useState, useEffect } from "react";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Platform icons
  const getPlatformIcon = (platformName) => {
    const name = platformName.toLowerCase();
    if (name.includes("pc") || name.includes("windows")) return "🖥️";
    if (name.includes("playstation") || name.includes("ps")) return "🎮";
    if (name.includes("xbox")) return "🎮";
    if (name.includes("nintendo") || name.includes("switch")) return "🎮";
    if (
      name.includes("ios") ||
      name.includes("android") ||
      name.includes("mobile")
    )
      return "📱";
    return "🎮";
  };

  // Auto slide
  useEffect(() => {
    let interval;
    if (
      isHovered &&
      game.short_screenshots &&
      game.short_screenshots.length > 1
    ) {
      interval = setInterval(() => {
        setCurrentScreenshot(
          (prev) => (prev + 1) % game.short_screenshots.length,
        );
      }, 1000);
    } else {
      setCurrentScreenshot(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, game.short_screenshots]);

  const getCurrentImage = () => {
    if (game.short_screenshots && game.short_screenshots.length > 0) {
      return (
        game.short_screenshots[currentScreenshot]?.image ||
        game.background_image
      );
    }
    return game.background_image;
  };

  return (
    <Link to={`/game/${game.id}`} className="h-full w-full">
      <div
        className="relative group rounded-lg overflow-hidden bg-[#1a1a1a] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer w-full h-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* BG and slideshow */}
        <div className="relative aspect-[16/9] overflow-hidden w-full">
          <AddToCart
            gameId={game.id}
            gameName={game.name}
            gameBg={game.background_image}
          />
          <img
            src={getCurrentImage()}
            alt={game.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            style={{
              transition: isHovered
                ? "transform 0.5s ease, opacity 0.3s ease"
                : "transform 0.5s ease",
            }}
          />

          {/* Gradient overlay*/}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

          {/* Platforms */}
          <div className="absolute top-3 right-3 flex gap-1">
            {game.parent_platforms?.slice(0, 4).map((platform, index) => (
              <div
                key={platform.platform.id}
                className="w-7 h-7 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                title={platform.platform.name}
              >
                {getPlatformIcon(platform.platform.name)}
              </div>
            ))}
          </div>

          {/* Rating */}
          {game.rating && (
            <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-md opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-bold text-white">
                ★ {game.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3
            className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors duration-300"
            title={game.name}
          >
            {game.name.length > 15
              ? `${game.name.slice(0, 15).trim()}...`
              : game.name}
          </h3>

          {/* Genres */}
          <div className="flex flex-wrap gap-1.5">
            {game.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="text-xs px-2 py-1 bg-gray-700/60 text-gray-300 rounded-md hover:bg-purple-600/60 hover:text-white transition-colors duration-200"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {game.released ? new Date(game.released).getFullYear() : "TBA"}
            </span>

            {game.metacritic && (
              <div
                className={`px-2 py-1 rounded-md text-xs font-bold ${
                  game.metacritic >= 75
                    ? "bg-green-600/80 text-white"
                    : game.metacritic >= 50
                      ? "bg-yellow-600/80 text-white"
                      : "bg-red-600/80 text-white"
                }`}
              >
                {game.metacritic}
              </div>
            )}
          </div>

          {/* Additional info row */}
          {/* <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{game.added?.toLocaleString()} added</span>
          {game.playtime > 0 && (
            <span>{game.playtime}h avg playtime</span>
          )}
        </div> */}

          {/* Hover action btns */}
          {/* <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 pt-2">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-3 rounded-md font-medium transition-colors duration-200">
            View Details
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded-md transition-colors duration-200">
            ♡
          </button>
        </div> */}
        </div>

        {/* BG glow */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-purple-500/30 transition-colors duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default GameCard;

