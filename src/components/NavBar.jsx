import React from 'react'
import '../CSS/navbar.css'
import { Link } from 'react-router-dom'

const CustomLink = ({to, children, ...props}) => {
  
  return (
    <li>
        <Link to={to} {...props}>{children}</Link>
    </li>
  )
}


const NavBar = () => {
  return (
    <nav className='Nav'>
     <Link to='/' className='site-title'><img src='./logo.png'/><h2 className='name'>MolyBank</h2></Link>   
     
    <ul>
        <CustomLink to='/'>Movies</CustomLink>
        <CustomLink to='/Books'>Books</CustomLink>
        <CustomLink to='/TVShows'>TV Shows</CustomLink>
        <CustomLink to='/Anime'>Anime</CustomLink>
    </ul>
    </nav>
  )
}

export default NavBar