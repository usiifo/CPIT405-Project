import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/HomePage.css";

const apikey = "bf639062"; 

const Home = ({ setSearchTerm, setMovies, setCurrentPage, setTotalResults }) => {
    const [input, setInput] = useState("");
    const [moodVisible, setMoodVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchTerm(input);
        setCurrentPage(1);
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${apikey}&s=${input}&page=1`
            );
            if (response.data?.Search) {
                setMovies(response.data.Search);
                setTotalResults(response.data.totalResults || 0);
                navigate("/searchResults");
            } else {
                alert("No movies found. Try again.");
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            alert("Failed to fetch movies. Please try again.");
        }
    };

    const handleRandomMovie = async () => {
        const randomWords = ["love", "war", "life", "future", "star", "hero"];
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${apikey}&s=${randomWord}`
            );
            const movies = response.data?.Search;
            if (movies && movies.length > 0) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                navigate(`/moviesDetails/${randomMovie.imdbID}`, {
                    state: { movie: randomMovie, searchTerm: randomWord, movies: movies },
                });
            } else {
                alert("No random movie found. Try again.");
            }
        } catch (error) {
            console.error("Error fetching random movie:", error);
            alert("Failed to fetch a random movie. Try again.");
        }
    };

    const handleMoodSelection = () => {
        setMoodVisible(!moodVisible);
    };

    return (
        <div className="home-container">
            <h1>Every movie has a story, and every story finds its home here at Movie Home</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for Movies"
                />
                <button type="submit">Search</button>
            </form>

            <button onClick={handleRandomMovie} className="random-movie-button">
                Random Movie
            </button>

            <button onClick={handleMoodSelection} className="mood-selection-button">
                Select Mood
            </button>

            {moodVisible && (
                <div className="mood-buttons">
                    {["happy", "sad", "angry", "dark", "funny", "scared", "hopeful", "adventurous", "excited", "mind blown"].map((mood) => (
                        <button
                            key={mood}
                            onClick={() => navigate(`/MoodResults/${mood}`)}
                            className="mood-button"
                        >
                            {mood}
                        </button>
                    ))}
                </div>
            )}

            <Link to="/MovieManAI" className="movie-man-button">
                <button className="movie-man-btn">Go to MovieMan</button>
            </Link>
        </div>
    );
};

export default Home;








































/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/HomePage.css";

const apikey = "a4bd042c";  // Keep API keys in environment variables for security
const openAiApiKey = process.env.OPENAI_API_KEY;  // Use environment variables for sensitive data

const Home = ({ setSearchTerm, setMovies, setCurrentPage, setTotalResults }) => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchTerm(input);
        setCurrentPage(1);
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${apikey}&s=${input}&page=1`
            );
            if (response.data?.Search) {
                setMovies(response.data.Search);
                setTotalResults(response.data.totalResults || 0);
                navigate("/searchResults");
            } else {
                alert("No movies found. Try again.");
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            alert("Failed to fetch movies. Please try again.");
        }
    };

    

    const handleRandomMovie = async () => {
        const randomWords = ["love", "war", "life", "future", "star", "hero"];
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${apikey}&s=${randomWord}`
            );
            const movies = response.data?.Search;
            if (movies && movies.length > 0) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                navigate(`/moviesDetails/${randomMovie.imdbID}`, {
                    state: { movie: randomMovie, searchTerm: randomWord, movies: movies },
                });
            } else {
                alert("No random movie found. Try again.");
            }
        } catch (error) {
            console.error("Error fetching random movie:", error);
            alert("Failed to fetch a random movie. Try again.");
        }
    };

    return (
        <div className="home-container">
            <h1>Every movie has a story, and every story finds its home here at Movie Home</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for Movies"
                />
                <button type="submit">Search</button>
            </form>

        

            <button onClick={handleRandomMovie} className="random-movie-button">
                Random Movie
            </button>

            <Link to="/MovieManAI" className="movie-man-button">
                <button className="movie-man-btn">Go to MovieMan</button>
            </Link>
        </div>
    );
};

export default Home;

*/

/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Library to fetch data from APIs
import "../style/HomePage.css";

const apikey = "a4bd042c";
const openAiApiKey = "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";

const Home = ({ setSearchTerm, setMovies, setCurrentPage, setTotalResults }) => {
    const [input, setInput] = useState("");
    const navigate = useNavigate(); // To navigate between pages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchTerm(input);
        setCurrentPage(1);
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${apikey}&s=${input}&page=1`
            );
            setMovies(response.data.Search || []);
            setTotalResults(response.data.totalResults || 0);
            navigate("/searchResults");
        } catch (error) {
            console.error("Error fetching movies:", error);
            alert("Failed to fetch movies. Please try again.");
        }
    };

    const handleChatGPTQuery = async (query) => {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo", // Or "gpt-4" if available
                    messages: [{ role: "user", content: query }],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${openAiApiKey}`,
                    },
                }
            );

            // Log the response for debugging
            console.log("ChatGPT Response:", response.data);

            const chatResponse = response.data.choices?.[0]?.message?.content?.trim();
            if (!chatResponse) {
                throw new Error("No valid response received from ChatGPT.");
            }
            return chatResponse;
        } catch (error) {
            console.error("Error interacting with ChatGPT API:", error);
            alert("Failed to get a response from ChatGPT. Please try again.");
            return "No suggestion available.";
        }
    };

    const handleRandomMovie = async () => {
        const randomWords = ["love", "war", "life", "future", "star", "hero"];
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${apikey}&s=${randomWord}`
            );
            const movies = response.data.Search;
            if (movies && movies.length > 0) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                navigate(`/moviesDetails/${randomMovie.imdbID}`, {
                    state: { movie: randomMovie, searchTerm: randomWord, movies: movies },
                });
            } else {
                alert("No random movie found. Try again.");
            }
        } catch (error) {
            console.error("Error fetching random movie:", error);
            alert("Failed to fetch a random movie. Try again.");
        }
    };

    return (
        <div className="home-container">
            <h1>Every movie has a story, and every story finds its home here at Movie Home</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for Movies"
                />
                
                <button type="submit">Search</button>
            </form>
            <button onClick={handleRandomMovie} className="random-movie-button">
                Random Movie
            </button>
        </div>
    );
};

export default Home;
*/