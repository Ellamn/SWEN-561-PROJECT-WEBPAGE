import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ash from '/ash.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>The Phanton Thieves?</h1>
      <img src={ash} alt="ash.png"/>
    </>
  )
}

export default App
