import React from 'react'
import NavBar from './components/NavBar.jsx';
import {Route, Routes} from "react-router-dom"
import TVShows from './pages/TVShows.jsx';
import Anime from './pages/Anime.jsx';
import Books from './pages/Books.jsx';
import Movies from './pages/Movies.jsx';



const App = () => {
   
  return (
    <main>

        <NavBar/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Movies/>}/>
            <Route path='/Books' element={<Books/>}/>
            <Route path='/TVShows' element={<TVShows/>}/>
            <Route path='/Anime' element={<Anime/>}/>
          </Routes>
        </div>
        
        
    </main>
  )
}

export default App