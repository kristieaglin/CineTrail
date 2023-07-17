import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeContextProvider from './context/ThemeContext'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage'


function App() {
    const apiKey = import.meta.env.VITE_API_KEY
    const baseUrl = import.meta.env.VITE_BASE_URL


  return (
    <BrowserRouter>
    <ThemeContextProvider>
    <Header apiKey={apiKey} baseUrl={baseUrl} />
    <Routes>
      <Route path='/' element={<Homepage apiKey={apiKey} baseUrl={baseUrl} />} />
    </Routes>
    </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App
