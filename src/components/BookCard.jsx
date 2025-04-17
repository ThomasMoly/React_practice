import React from 'react'

const BookCard = ({ book }) => {
    const {
      volumeInfo: {
        title,
        publishedDate,
        language,
        ratingsCount,
        imageLinks,
        authors,
      } = {},
      saleInfo: {
        retailPrice,
      } = {},
    } = book || {}; // fallback if book is somehow undefined
  
    const thumbnail = imageLinks?.thumbnail;
    const amount = retailPrice?.amount;
  
  return (
    <div className='movie-card'>
        <img src={thumbnail ? `${thumbnail}`: 'no-movie.png'
         } alt={title}/>

         <div className='mt-4'>
         <li className='text-white text-2xl font-semibold'>{title}</li>
         <div className='content'>
                <div className='rating'>
                    <p>cost: {amount ? `$${amount}` : 'N/A'}</p>
                    <span>•</span>
                    <p className='lang-white'>{language}</p>
                    <span>•</span>
                    <p className='year-white'>{publishedDate ? publishedDate : 'N/A'}</p>

                </div>
            </div>
        </div>
    </div>
  )
}

export default BookCard