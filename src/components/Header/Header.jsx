import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Link } from 'react-router-dom'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import SearchResultItem from '../SearchResultItem/SearchResultItem'

import './Header.css'

function Header() {
  //https://api.themoviedb.org/3/search/movie

  const {darkMode, setDarkMode} = useContext(ThemeContext)

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${query}`)
    .then(res=>{
      setSearchResults(res.data.results)
    })
    .catch(err=>console.log(err))
  },[query])

  const toggleMode = () =>{
    setDarkMode(prevState=>!prevState)
  }

  const getUserQuery = (e) =>{
    setQuery(e.target.value)
  }

  return (
    <div className={`header-container ${!darkMode ? 'header-light' : ''}`}>
      <Link to='/' className='logo'>CineTrail</Link>
      <div className='search-container'>
        <input
          type='text'
          className='search-input'
          placeholder='Search movies...' 
          onChange={getUserQuery}
        />
        {
          query.trim() !== '' &&
          <div className='search-results-container'>
            {
              searchResults.map(result=><SearchResultItem key={result.id} movie={result} setQuery={setQuery} />)
            }
          </div>
        }
      </div>
      <div className='header-buttons-container'>
        <div className='theme-buttons'>
        <MdOutlineLightMode className={`theme-icon ${!darkMode ? 'theme-icon-active' : ''}`} onClick={darkMode ? toggleMode : undefined} />
        <MdOutlineDarkMode className={`theme-icon ${darkMode ? 'theme-icon-active' : ''}`} onClick={!darkMode ? toggleMode : undefined} /> 
        </div>
      </div>
      <button className='create-account-btn'>Create an Account</button>
    </div>
  )
}

export default Header