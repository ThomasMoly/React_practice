import React, { use, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import '../CSS/Books.css'
import Search from '../components/search'
import Spinner from '../components/Spinner'
import '../components/BookCard'
import BookCard from '../components/BookCard'
import { updateSearchCount , getTrendingBooks } from '../appwrite/appwrite_Book.js';

const Books = () => {
  const [booksList, setBooksList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
  const [trendingBooks, setTrendingBooks] = useState([])
  


  const API_BASE_URL = 'https://www.googleapis.com/books/v1'

  const API_Key = import.meta.env.VITE_GOOGLE_API_KEY

  const options = {
    method: "GET",
    headers: {
      accept: 'application.json'
    }
  }

  const fetchBooks = async( query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query ? `${API_BASE_URL}/volumes?q=${query}&orderBy=newest&key=${API_Key}` : `${API_BASE_URL}/volumes?q=subject:fiction&orderBy=newest&key=${API_Key}`
      const response = await fetch(endpoint, options)
      
      if(!response.ok){
        throw new Error('There was an error fetching books')
      }

      const data = await response.json();

      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch books')
        setBooksList([])
        return
      }

      setBooksList(data.items || [])

      if (query && data.items.length > 0) {
        await updateSearchCount(query, data.items[0])
      }


      console.log(data)

    } catch (error) {
      console.error(error)
      setErrorMessage('There was an error in getting the books')
    }
    finally{
      setIsLoading(false)
    }
  }

  
      const loadTrendingMovies = async () => {
        try {
          const books = await getTrendingBooks()
          
          setTrendingBooks(books.documents)
        } catch (error) {
          console.error(`Error fetching trending movies: ${error}`)
        }
      }

  useEffect(() =>{
    fetchBooks(debounceSearchTerm)
  }, [debounceSearchTerm])

  useEffect(() => {
        loadTrendingMovies()
      }, [])

  return (
    <main>
      <div className="patterns"/>
      <div className="wrapper">
        <header>
            <img src='../book-img.png' alt='Books'/>
              <h1>Find <span className="text-gradient1">Books</span> You'll Enjoy Without The Hassle</h1>
              <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />  
        </header>

        {trendingBooks.length > 0 && (
                <section className='trending'>
                  <h2>
                    Trending Books
                  </h2>

                  <ul>
                    {trendingBooks.map((books, index) =>(
                     <li key={books.$id}>
                      <p>{index + 1}</p>
                      <img src={books.poster_URL} alt={books.title}/>
                     </li> 
                    ))}
                  </ul>
                </section>
              )}

        <section className='all-movies'>
          <h2>
            All Books
          </h2>

          {isLoading ? (
                <Spinner/>
              ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {booksList.map((book) => (
                    <BookCard key={book.id} book={book}/>
                  ))}
                </ul>
              )}
        </section>
      </div>
      
    </main>
  )
}

export default Books