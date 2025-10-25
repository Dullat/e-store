import React, { useEffect, useState } from "react";
import getGames from "../data/getGames";
import getGenres from "../data/getGenres";
import getPlatforms from "../data/getPlatforms";
import GameCard from "../components/GameCard";

const DiscoverPage = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [openPlatformsSection, setOpenPlatformsSeciton] = useState(false);
  const [openGenresSection, setOpenGenresSection] = useState(false);

  const [searchGenresTerm, setSearchGenresTerm] = useState([]);
  const [searchPlatformsTerm, setSearchPlatformsTerm] = useState([]);

  const fetchGames = async () => {
    const platformsSlug = searchPlatformsTerm.map((item) => item.id).join(",");
    const genresSlug = searchGenresTerm.map((item) => item.id).join(",");
    let searchTerm = `&page_size=20`;

    if (platformsSlug) {
      searchTerm += `&platforms=${platformsSlug}`;
    }
    if (genresSlug) {
      searchTerm += `&genres=${genresSlug}`;
    }

    try {
      const res = await getGames(searchTerm);
      setGames(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getGenres();
        setGenres(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    fetchGames();
  }, []);

  // useEffect(() => {
  //   console.log(searchGenresTerm, searchPlatformsTerm);
  //   fetchGames();
  // }, [searchPlatformsTerm, searchGenresTerm]);

  const handlePlatformClick = ({ id, slug }) => {
    if (searchPlatformsTerm.some((item) => item.id === id)) {
      setSearchPlatformsTerm((prev) => prev.filter((item) => item.id !== id));
    } else {
      setSearchPlatformsTerm((prev) => [...prev, { id, slug }]);
    }
  };

  const handleGenreClick = ({ id, slug }) => {
    if (searchGenresTerm.some((item) => item.id === id)) {
      setSearchGenresTerm((prev) => prev.filter((item) => item.id !== id));
    } else {
      setSearchGenresTerm((prev) => [...prev, { id, slug }]);
    }
  };

  return (
    <div
      className={`flex flex-col gap-1 max-w-[1200px] m-auto sm:flex-row relative`}
    >
      <div className="xl:w-[200px] md:w-[200px] sm:w-[170px] flex-shrink-0 flex flex-col gap-1 p-1 mx-3 sm:mx-0 sticky top-0 z-999 backdrop-blur bg-[rgba(0,0,0,.3)]">
        <button
          className={`w-full py-2 bg-blue-600 rounded cursor-pointer`}
          onClick={fetchGames}
        >
          Apply Changes
        </button>
        <div className="px-2 py-1 text-blue-600 bg-gray-800 cursor-pointer">
          According to you
        </div>
        <div onClick={() => setOpenPlatformsSeciton(!openPlatformsSection)}>
          <p className="px-2 py-1 text-blue-600 bg-gray-800 cursor-pointer">
            Platforms
          </p>
          <ul
            className={`flex flex-col gap-1 px-2 py-1 ${openPlatformsSection ? "h-[200px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300" : "h-0 hidden"}`}
          >
            {platforms.length > 0 ? (
              platforms.map((platform) => (
                <CustomLi
                  key={platform.id}
                  item={platform}
                  list={searchPlatformsTerm}
                  handleClick={handlePlatformClick}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>

        <div onClick={() => setOpenGenresSection(!openGenresSection)}>
          <p className="px-2 py-1 text-blue-600 bg-gray-800 cursor-pointer">
            Genres
          </p>
          <ul
            className={`flex flex-col gap-1 px-2 py-1 ${openGenresSection ? "h-[200px] overflow-y-auto" : "h-0 hidden"}`}
          >
            {genres.length > 0 ? (
              genres.map((genre) => (
                <CustomLi
                  item={genre}
                  key={genre.id}
                  list={searchGenresTerm}
                  handleClick={handleGenreClick}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
      </div>
      <div>
        <div className={`flex flex-wrap`}>
          {games && games.length > 0 ? (
            games.map((game) => (
              <div
                key={game.id}
                className={`flex flex-shrink-0 p-2 m-auto
                  w-[calc(100%/4)] 
                  md:w-[calc((100%)/3)]
                  sm:w-[calc((100%)/2)]
                  min-[100px]:w-[88.6667%]
                `}
              >
                <GameCard game={game} key={game.id} />
              </div>
            ))
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>
    </div>
  );
};

const CustomLi = ({ item, genre, handleClick, list }) => (
  <li
    className={`px-2 py-1 rounded hover:bg-gray-600 cursor-pointer ${list.some((i) => i.id === item.id) ? "bg-gray-600" : ""}`}
    onClick={(e) => {
      e.stopPropagation();
      handleClick({ id: item.id, slug: item.slug });
    }}
  >
    {item.name}
  </li>
);

export default DiscoverPage;

