import React, { use, useEffect, useState } from 'react'
import NavBar from './components/NavBar.jsx';
import {Route, Routes} from "react-router-dom"
import TVShows from './pages/TVShows.jsx';
import Anime from './pages/Anime.jsx';
import Books from './pages/Books.jsx';
import Movies from './pages/Movies.jsx';



const App = () => {
    
    let component
    switch (window.location.pathname) {
      case '/':
        component = <Movies/>
        break;
      case '/TVShows':
        component = <TVShows/>
        break;
      case 'Anime':
        component = <Anime/>
        break;
      case 'Books':
        component = <Books/>
        break;
      default:
        break;
    }
  return (
    <main>

        <NavBar/>
        {component}
        
        
    </main>
  )
}

export default App