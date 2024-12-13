import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChampionList from './components/champion/ChampionList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ChampionList/>
    </>
  )
}

export default App
