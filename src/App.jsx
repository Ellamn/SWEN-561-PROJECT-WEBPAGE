import ash from '/ash.png'
import './App.css'
import { useState } from 'react'
import { Home } from './Home'
import { Time } from './Time'

const HOME = 1
const TIME = 2

function App() {
  const [show, setShow] = useState(HOME)

  return (
    <div className='all'>
      <h1 className='teamName'>The Phantom Thieves</h1>
      <div className='navbar'>
        <div className='navbarElement navbarElementFirst' onClick={() => setShow(1)}>Home</div>
        <div className='navbarElement' onClick={() => setShow(2)}>Time Sheets</div>
      </div>
      <br/>
      {show === HOME ?
        <Home/>
        :
        null
      }
      {show === TIME ?
        <Time/>
        :
        null
      }
      <img src={ash} alt="ash.png" className='ash'/>
    </div>
  )
}

export default App
