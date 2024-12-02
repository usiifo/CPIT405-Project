import React, { useState, useEffect } from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";  //useParams: object of value pairs of the dynamic params from the current URL.
import axios from "axios";
import '../style/App.css';
import '../style/MovieDetails.css';
const apikey = "a4bd042c";


const MovieDetails = () => {
    const {id} = useParams();   //get movie id
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovies] = useState(null);

    useEffect(() => {
        if(!movie){
            const fetchMovie = async () => {
            try{
                  const response = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`);
                  console.log(response);
                  setMovies(response.data);
                
            }catch(error){
                console.log("Error fetching movie details:", error);
            }
        };
        fetchMovie();
     }
    }, [id, movie]);  // fetching the data based on id

    if(!movie){
        return <span className="loader"></span>;
    }

    return(
        <div className="movie-details-container">
            <img src={movie.Poster} alt={movie.Title}/>

            <div className="details">
                <h1>{movie.Title}</h1>

                <p><strong>Rating:</strong> {movie.imdbRating}</p>
                <p><strong>Runtime:</strong> {movie.Runtime}</p>
                <p><strong>Released:</strong> {movie.Released}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Cast:</strong> {movie.Actors}</p>
                <p><strong>Language:</strong> {movie.Language}</p>
                <p><strong>Awards:</strong> {movie.Awards}</p>
                <p><strong>Country:</strong> {movie.Country}</p>
                <p><strong>BoxOffice:</strong> {movie.BoxOffice}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>

                <button
                    onClick={() => navigate('/searchResults', {state: {searchTerm: location.state?.searchTerm || "" , movies: location.state?.movies || [] , currentPage: location.state?.currentPage || 1, }})}>
                        Previous Page
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;