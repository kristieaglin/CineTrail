import { useState, createContext, useEffect } from "react"

export const ThemeContext = createContext()

export default function ThemeContextProvider(props){
    const [ darkMode, setDarkmode ] = useState(true)

    useEffect(()=>{
        const theme = localStorage.getItem('darkmode')
        if(theme){
            setDarkmode(JSON.parse(theme))
        }
    }, [])

    return(
        <ThemeContext.Provider value={{darkMode, setDarkmode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}