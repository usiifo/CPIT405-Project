import React, {useEffect} from "react";
import {Link, useLocation} from 'react-router-dom';  // useLocation: it allows to access the current location and pass the state to that location, for example when i go to the details page and then go back to the previous page. 
import '../style/SearchResults.css';
import axios from 'axios';
const apikey = "a4bd042c";


const SearchResults =({movies, searchTerm, setMovies, currentPage, setCurrentPage, totalResults, favorites, setFavorites}) => {

    const totalPages = Math.ceil(totalResults/10);  //rounded up to the nearest integer

    const location = useLocation();
    
    // handle any location state changes
    useEffect(() => {
        if(location.state){
            setCurrentPage(location.state.currentPage);
            setMovies(location.state.movies || []);
        }
    }, [location.state, setMovies, setCurrentPage]);   //Dependencies(useEffect)

    const handlePageChange = async (page) =>{
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}&page=${page}`);
        console.log(response);
        setMovies(response.data.Search || []);
        setCurrentPage(page);

    };

    const handleFavorite =(movie) => {
        if(favorites.some((fav) => fav.imdbID === movie.imdbID)){
            setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
        }else{
            setFavorites([...favorites, movie]);
        }
    }

    return(
        <div className="search-results-container">
            <h2>Search results for "{searchTerm}"</h2>

            <div className="search-results-grid">
            {movies.map((movie) =>(
                <div key={movie.imdbID} className="movie-card">
                    <Link to={`/moviesDetails/${movie.imdbID}`} state={{searchTerm, movies, currentPage}}>
                    <img src={movie.Poster} alt={movie.Title}/>
                    <div className="p-4">
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year}</p>   
                    </div>
                    </Link>
                    <button 
                    className="favorite-button"
                    onClick={() => handleFavorite(movie)}
                    >
                        {favorites.some((fav) => fav.imdbID === movie.imdbID)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}</button>
                    </div>
            ))}
        </div>

        <div className="pagination">
            <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            Previous
            </button>
            
            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
        </div>);
};

export default SearchResults;