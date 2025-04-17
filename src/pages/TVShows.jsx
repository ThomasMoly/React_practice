import React, { useState } from 'react'
import '../CSS/TVShows.css'
import Search from '../components/search'

const TVShows = () => {
  const [searchTerm, setSearchTerm] = useState('')


  return (
    <main>
      <div className="patternG"/>
      <div className="wrapper">
        <header>
          <img src='../TV-img.png' alt='hero'/>

            <h1>Find <span className="text-gradient2">TVshows</span> You'll Enjoy Without The Hassle</h1>
            <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />  

        </header>
      </div>
    </main>
  )
}

export default TVShows