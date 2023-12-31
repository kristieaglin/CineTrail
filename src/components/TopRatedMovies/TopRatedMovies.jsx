import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../MovieCard/MovieCard'

function TopRatedMovies() {
    const [topRatedMovies, setTopRatedMovies] = useState([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}top_rated?api_key=${import.meta.env.VITE_APP_API_KEY}`)
        .then(res =>{
          console.log(res.data.results)
          setTopRatedMovies(res.data.results.slice(0,10))
        })
        .catch(err =>console.log(err))
      },[])

  return (
    <div className='top-rated-container'>
        <h3>TopRatedMovies</h3>
        <div className='top-rated-cards-wrapper'>
            {
                topRatedMovies.map(movie=>(
                    <MovieCard
                        key={movie?.id}
                        movie={movie}
                        width='200px'
                        height='100px'
                        radius='8px'
                        imgSrc={movie?.backdrop_path}
                        id={movie?.id}
                        cardStyle='top-rated-card'
                    />
                ))
            }
        </div>
    </div>
  )
}

export default TopRatedMovies