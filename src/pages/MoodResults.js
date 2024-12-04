import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const apikey = "bf639062"; // OMDB API key
const openAiApiKey = "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";//OpenAIAPIKey

const MoodResults = () => {
    const { mood } = useParams();
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            
                const moodRecommendations = await getMoodBasedRecommendationsFromChatGPT(mood);

                const movieDetails = await fetchMovieDetails(moodRecommendations);
                setMovies(movieDetails);
            
        };

        fetchMovies();
    }, [mood]);

    const getMoodBasedRecommendationsFromChatGPT = async (mood) => {
        try {
            const userInput = `Provide me with one list of only 10 movies that are good for a ${mood} mood. Only include the names, do not include any other character or number, just the names with one space between them.`;

            const result = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'You are a movie recommendation assistant.' },
                        { role: 'user', content: userInput },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${openAiApiKey}`,
                    },
                }
            );

            // Get a string of movie names
            const recommendationsString = result.data.choices[0].message.content;

            const recommendations = recommendationsString
            .split(' ')
    .map((item) => item.trim()) // Trim whitespace
    .filter((item) => /^[a-zA-Z\s]+$/.test(item)) // Remove empty or invalid entries


            console.log("Cleaned movie recommendations:", recommendations);
            return recommendations;
        } catch (error) {
            console.error('Error getting mood-based recommendations from ChatGPT:', error);
            throw error;
        }
    };

    // Clean movie title 
    const cleanMovieTitle = (title) => {
        return title.replace(/[^a-zA-Z0-9\s]/g, "").trim();
    };

    const fetchMovieDetails = async (movies) => {
        if (!Array.isArray(movies)) {
            console.error("Movies is not an array:", movies);
            return [];
        }

        const movieDetailsPromises = movies.map(async (movie) => {
            try {
                const response = await axios.get(
                    `http://www.omdbapi.com/?apikey=${apikey}&t=${encodeURIComponent(cleanMovieTitle(movie))}`
                );
                console.log("API Response:", response.data);

                return response.data?.Title ? response.data : null;
            } catch (error) {
                console.error(`Error fetching details for movie: ${movie}`, error);
                return null;
            }
        });

        const movieDetails = await Promise.all(movieDetailsPromises);
        return movieDetails.filter((movie) => movie !== null);
    };

    // Ensure unique movie list by imdbID
    const uniqueMovies = Array.from(new Set(movies.map((m) => m.imdbID))).map((id) =>
        movies.find((m) => m.imdbID === id)
    );

    return (
        <div className="mood-results-container">
            <h2>Movies with mood: {mood}</h2>
            <div className="movies-list">
                {uniqueMovies.map((movie) => (
                    <div
                        key={movie.imdbID}
                        className="movie-card"
                        onClick={() => navigate(`/moviesDetails/${movie.imdbID}`)}
                    >
                        <img src={movie.Poster} alt={movie.Title} />
                        <h3>{movie.Title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodResults;
