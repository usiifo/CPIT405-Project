import React, {useState} from 'react'; //a React Hook that lets you add a state variable to your component.
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import './style/App.css';


const App = () => {   //app components
  //State to hold the list of movies
  const [movies, setMovies] = useState([]);
  //State to hold the search Term
  const [searchTerm, setSearchTerm] = useState('');
  //State to hold the current page number
  const [currentPage, setCurrentPage] = useState(1);
  //State to hold the total number of results
  const [totalResults, setTotalResults] = useState(0);
  //State to hold the list of favorite movies
  const [favorites, setFavorites] = useState([]);


  return(
    <Router>
      <div className='page'>

        <Navbar/>

        <Routes>

          <Route
            path="/"
            element={
              <Home     //HomePage components
              setSearchTerm={setSearchTerm}
              setMovies={setMovies}
              setCurrentPage={setCurrentPage}
              setTotalResults={setTotalResults}
              />
            }
          />

          <Route 
            path="/searchResults"
            element={
              <SearchResults        //passing the props
              movies={movies}
              searchTerm={searchTerm}                                            //Route to search results page
              setMovies={setMovies}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalResults={totalResults}
              favorites={favorites}       
              setFavorites={setFavorites}
              />
            }
          />

        <Route 
            path="/moviesDetails/:id"
            element={               //passing the props
              <MovieDetails                                                        //Route to movie details page
                favorites={favorites}       
                setFavorites={setFavorites}
              />                                                       
            }
          />

          <Route
            path="/favorites"
            element={              
              <Favorites favorites={favorites} />}     //passing  the favorites state                            
          />
          
              </Routes>
            </div>
          </Router>
      ) 
    }


export default App;
