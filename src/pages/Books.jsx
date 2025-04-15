import React, { use, useEffect, useState } from 'react'
import '../CSS/Books.css'
import Search from '../components/search'
import Spinner from '../components/Spinner'

const Books = () => {
  const [booksList, setBooksList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const API_BASE_URL = 'https://www.googleapis.com/books/v1'

  const API_Key = import.meta.env.VITE_GOOGLE_API_KEY

  const options = {
    method: "GET",
    headers: {
      accept: 'application.json'
    }
  }

  const fetchBooks = async() => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = `${API_BASE_URL}/volumes?q=subject:fiction&key=${API_Key}`
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

      setBooksList(data.items)

      console.log(data)

    } catch (error) {
      console.error(error)
      setErrorMessage('There was an error in getting the books')
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    fetchBooks()
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
                    <li className='white' key={book.id}>{book.volumeInfo.title}</li>
                  ))}
                </ul>
              )}
        </section>
      </div>
      
    </main>
  )
}

export default Books