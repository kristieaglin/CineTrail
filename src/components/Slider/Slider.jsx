import React, {useEffect, useState} from 'react'
import './Slider.css'
import axios from 'axios'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import Ratings from '../Ratings/Ratings'
import Genres from '../Genres/Genres'

function Slider({apiKey, baseUrl}) {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [index, setIndex] = useState(0)
    const [movieRating, setMovieRating] = useState([])
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

    useEffect(()=>{
        axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
        .then(res=>{
            console.log(res.data.results)
            setUpcomingMovies(res.data.results)
            const ratings = res.data.results.map(movie => movie.vote_average/2)
            setMovieRating(ratings)
        })
        .catch(err=>console.log(err))
    },[])

    const sliderStyle ={
        backgroundImage:`url('${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '60vh',
        position: 'relative'
    }

    const handleRight = () =>{
        setIndex(index+1)
        if(index === upcomingMovies.length-1){
            setIndex(0)
        }
    }

    const handleLeft = () =>{
        setIndex(index-1)
        if(index === 0){
            setIndex(upcomingMovies.length-1)
        }
    }

  return (
    <div style={sliderStyle}>
        <div className='slider-overlay'></div>
        <MdKeyboardArrowRight onClick={handleRight} className='right-arrow' />
        <MdKeyboardArrowLeft onClick={handleLeft} className='left-arrow' />
        <div className='slider-info'>
            <h1>{upcomingMovies[index]?.title}</h1>
            <p className='slider-discription'>{upcomingMovies[index]?.overview.slice(0,130)}...</p>
            <Genres movieGenres={upcomingMovies[index]?.genre_ids} baseUrl={baseUrl} apiKey={apiKey} />
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <Ratings movieRating={movieRating[index]} />
        </div>
    </div>
  )
}

export default Slider