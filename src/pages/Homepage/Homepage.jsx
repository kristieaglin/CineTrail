import React from 'react'
import './Homepage.css'
import Slider from '../../components/Slider/Slider'


function Homepage({apiKey, baseUrl}) {
  return (
    <div className='home-container'>
      <Slider apiKey={apiKey} baseUrl={baseUrl} />
    </div>
  )
}

export default Homepage