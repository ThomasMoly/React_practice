import React from 'react'
import '../CSS/navbar.css'
import { Link } from 'react-router-dom'

const CustomLink = (href, children, ...props) => {
  return (
    <li>
        <a href={href} {...props}>{children}</a>
    </li>
  )
}


const NavBar = () => {
  return (
    <nav className='Nav'>
     <a href='/' className='site-title'><img src='./logo.png'/><h2 className='name'>MolyBank</h2></a>   
     
    <ul>
        <li><a href='/'>Movies</a></li>
        <li><a href='/Books'>Books</a></li>
        <li><a href='/TVShows'>TV Shows</a></li>
        <li><a href='/Anime'>Anime</a></li>
    </ul>
    </nav>
  )
}

export default NavBar