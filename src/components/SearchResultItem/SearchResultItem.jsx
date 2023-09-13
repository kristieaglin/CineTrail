import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import noImage from '../../assets/no-image.jpeg'

export default function SearchResultItem({movie, setQuery}) {

  const [imageError, setImageError] = useState(false)

  return (
    <Link className='search-results-item' to={`/movieDetails/${movie?.id}`} onClick={()=>setQuery('')}>
      <img
        src={ imageError ? noImage : `${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie?.backdrop_path}`}
        alt={movie?.title}
        onError={()=>setImageError(true)}
      />
      <p>{movie?.title}</p>
    </Link>
  )
}
