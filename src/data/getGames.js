const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const API_OPTIONS = {
    method: 'GET',
    headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json'
    }
}

const getGames = async () => {
    try {
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results[0])
        return data

    } catch (error) {
        console.error('could not fetch')
    }
}

export default getGames