import React, { use, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import Search from '../components/search'
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { getTrendingMovies, updateSearchCount } from '../appwrite/appwrite.js';
import '../CSS/Movies.css'


const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

 

const App = () => {
    const[searchTerm, setSearchTerm] = useState('') // This is a use state to set the search for the search bar as an empty string
    const [errorMessage, setErrorMessage] = useState('')// UseState for taking any errorMessages in the fetching prosses
    const [movieList, setMovieList] = useState([])//UseState for setting up the array of movies
    const [isLoading, setIsLoading] = useState(false)// UseState for beginning the loading process
    const [debounceSearchTerm] = useDebounce(searchTerm, 500);
    const [trendingMovies, setTrendingMovies] = useState([])

    const fetchMovies = async (query = '') => {
        setIsLoading(true)
        setErrorMessage('')

        try{
          const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
          const response = await fetch(endpoint, options)
          
          if(!response.ok){
            throw new error('Error in the response')
          }

          const data = await response.json()

          if (data.Response === 'False') {
              setErrorMessage(data.Error || 'Error fetching movies.')
              setMovieList([])
              return;
          }

          console.log(data)

          setMovieList(data.results || [])

          if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0])
          }

        }catch(error){
          console.log(`Error fetching ${error}`)
          setErrorMessage('Error fetching movies. Please try again later.')
        } finally{
          setIsLoading(false)
        }
    }

    const loadTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies()
        
        setTrendingMovies(movies.documents)
      } catch (error) {
        console.error(`Error fetching trending movies: ${error}`)
      }
    }


    useEffect(() => {
      fetchMovies(debounceSearchTerm)
    }, [debounceSearchTerm])

    useEffect(() => {
      loadTrendingMovies()
    }, [])
    
  return (
    <main>
        
        
        <div className="pattern"/>
        <div className="wrapper">
            <header>
            <img src='./hero-img.png' alt='hero'/>

                <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle</h1>
                <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />  

            </header>

              {trendingMovies.length > 0 && (
                <section className='trending'>
                  <h2>
                    Trending movies
                  </h2>

                  <ul>
                    {trendingMovies.map((movie, index) =>(
                     <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_URL} alt={movie.title}/>
                     </li> 
                    ))}
                  </ul>
                </section>
              )}

            <section className='all-movies'>
              <h2>
                All Movies
              </h2>
              {isLoading ? (
                <Spinner/>
              ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                   <MovieCard key={movie.id} movie = {movie}/>
                  ))}
                </ul>
              )}

            </section>
        </div>
    </main>
  )
}

export default App