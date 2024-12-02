import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; // library that fetch the data from the api
import '../style/HomePage.css';
const apikey = "a4bd042c";


const Home = ({ setSearchTerm, setMovies, setCurrentPage, setTotalResults}) => {

    const [input, setInput] = useState('');

    const navigate = useNavigate(); //to nav from one page to another page

    const handleSubmit =async (e) => {
        e.preventDefault();
        setSearchTerm(input);
        setCurrentPage(1);
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${input}&page=1`);  //It will take user input and look it up in the api using the apikey.
        setMovies(response.data.Search || []);
        setTotalResults(response.data.totalResults);                         //Update data (movie, total results) according to user input
        navigate('/searchResults');                                          // Go to searchResults page 
    };

    const handleRandomMovie = async () => {
        const randomWords =["love", "war", "life", "future", "star", "hero"];
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        try{
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${randomWord}`);

            const movies = response.data.Search;
            if(movies && movies.length > 0){
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                navigate(`/moviesDetails/${randomMovie.imdbID}` , {state: {movie: randomMovie, searchTerm: randomWord, movies: movies} , });
            }else{
                alert("No random movie found. Try again")
            }
       }catch(error){
          console.error("Error fetching random movie:", error);
         alert("Failed to fetch a random movie, Try again");
    }
    }

    // Home page layout
    return(
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
            <button onClick={handleRandomMovie}
            className="random-movie-button"
            >
                Random Movie
            </button>
        </div>
    );

};

export default Home;



