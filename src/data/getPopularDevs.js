const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const fetchDevelopers = async () => {
    try {
        const response = await fetch(
            `https://api.rawg.io/api/developers?key=${API_KEY}&ordering=-games_count&page_size=3`
        );

        if (!response.ok) {
            throw new Error(`Error fetching Devs : ${response.status}`);
        }

        const data = await response.json()

        console.log(data)
        return data
    } catch (error) {

    }
};

const fetchDeveloperGames = async (developerId) => {
    try {
        const response = await fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}&developers=${developerId}&ordering=-rating&page_size=3`
        );

        if (!response.ok) {
            throw new Error(`Error fetching Devs : ${response.status}`);
        }

        const data = await response.json()

        console.log(data)
        return data
    } catch (error) {

    }
};

export { fetchDevelopers, fetchDeveloperGames }