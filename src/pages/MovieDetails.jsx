import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import StarRatings from 'react-star-ratings'
import Genres from '../components/Genres/Genres'

function MovieDetails() {

  const {movieId} = useParams()

  const [movie, setMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState('')
  const [reviews, setReviews] = useState([])
  const [totalNumReviews, setTotalNumReviews] = useState(0)
  const [numReviewsToDisplay, setNumReviewsToDisplay] = useState(3)

  useEffect(()=>{
    axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}?api_key=${import.meta.env.VITE_APP_API_KEY}`)
    .then(res=>{
      // console.log(res.data)
      setMovie(res.data)
    })
    .catch(err=>console.log(err))

    axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}/videos?api_key=${import.meta.env.VITE_APP_API_KEY}`)
    .then(res=>{
      // console.log(res.data.results)
      const trailers = res.data.results.filter(video=>video.site === 'YouTube' && video.type.includes('Trailer'))
      setTrailerKey(trailers[0].key)
    })
    .catch(err=>console.log(err))

    axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}/reviews?api_key=${import.meta.env.VITE_APP_API_KEY}`)
    .then(res=>{
      console.log(res.data.results)
      setReviews(res.data.results)
      setTotalNumReviews(res.data.results.length)
    })
    .catch(err=>console.log(err))

  },[])


  return (
    <div className='movie-details-container'>
      <div className='trailer-container'>
        <ReactPlayer
          className='trailer-player'
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width='100%'
          height='100%'
          config={{
            youtube:{
              playerVars:{
                showInfo:1,
                origin: 'https:localhost:5173'
              }
            }
          }}
        />
      </div>
      <div className='details-container'>
        <div className='title-container'>
          <h1>{movie?.title}</h1>
        </div>
        <div className='rating'>
          {movie && (
              <StarRatings
                rating={movie?.vote_average/2}
                starRatedColor="red"
                numberOfStars={5}
                name='rating'
                starDimension='15px'
                starSpacing='1px'
              />
          )}
        </div>
        <div className='info-container'>
          {
            movie &&
            <img src={`${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie?.poster_path}`} alt={movie?.title} className='details-poster' />
          }
          <div className='movie-info'>
            <h2>{movie?.tagline}</h2>
            <h4>{movie?.overview}</h4>
            <h4>Status: {movie?.status}</h4>
            <h4>Runtime: {movie?.runtime} min</h4>
            <h4>Budget: {movie?.budget}</h4>
            <Genres genreIds={movie?.genres ? movie?.genres : []} component='details' />
          </div>
        </div>
        <div className='review-container'>
          <p className='reviews-title'>Reviews</p>
          {
            reviews.slice(0,numReviewsToDisplay).map(review=><p>{review.content}</p>)
          }
          {
            numReviewsToDisplay < totalNumReviews 
            ? <p onClick={()=>setNumReviewsToDisplay(prevState=>prevState+2)}>Read More Reviews</p>
            : <p onClick={()=>setNumReviewsToDisplay(3)}>End of Reviews. Collapse.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default MovieDetails