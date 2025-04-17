import React from 'react'

const MovieCard = ({movie : {title, vote_average, poster_path, release_date, original_language}, }) => {
  return (
    <div className='movie-card'>
         <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: 'no-movie.png'
         } alt={title}/>

         <div className='mt-4'>
         <p className='text-white text-2xl font-semibold'>{title}</p>
            <div className='content'>
                <div className='rating'>
                    <img src="star.svg" alt="star icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    <span>•</span>
                    <p className='lang-white'>{original_language}</p>
                    <span>•</span>
                    <p className='year-white'>{release_date ? release_date.split('-')[0] + '/' + release_date.split('-')[1] : 'N/A'}</p>

                </div>
            </div>
         </div>
    </div>
  )
}

export default MovieCard