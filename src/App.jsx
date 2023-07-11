import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeContextProvider from './context/ThemeContext'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage'


function App() {
 

  return (
    <BrowserRouter>
    <ThemeContextProvider>
    <Header />
    <Routes>
      <Route path='/' element={<Homepage />} />
    </Routes>
    </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App
