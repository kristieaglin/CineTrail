import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ThemeContextProvider from './contexts/ThemeContext'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage'
import Footer from './components/Footer/Footer'
import MovieDetails from './pages/MovieDetails'


function App() {

  return (
    <> 
      <BrowserRouter>
        <ThemeContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path={'/movieDetails/:movieId'} element={<MovieDetails />} />
          <Route path={'*'} element={<Homepage />} />
        </Routes>
        <Footer />
        </ThemeContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
