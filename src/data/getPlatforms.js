const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    Authorization: API_KEY,
    "Content-Type": "application/json",
  },
};

const getPlatforms = async (prefs) => {
  try {
    const url = `https://api.rawg.io/api/platforms?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could Not Fetch data From API : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default getPlatforms;
