import React from 'react'
import './Ratings.css'
import StarRatings from 'react-star-ratings'

function Ratings({movieRating}) {
  return (
    <div className='rating'>
      <StarRatings
          rating={movieRating}
          numberOfStars={5}
          name='rating'
          starDimensions='15px'
          starSpacing='1px'
          starRatedColor='red'
          starEmpty='grey'
        />
    </div>
  )
}

export default Ratings