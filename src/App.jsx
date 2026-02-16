import ash from '/ash.png'
import './App.css'
import { useState } from 'react'
import Home from './Home'
import Time from './Time'
import Domain from './Domain'
import Plan from './Plan'
import Fours from './Fours'

const HOME = 1
const TIME = 2
const DOMAIN = 3
const PLAN = 4
const FOUR = 5

function App() {
  const [show, setShow] = useState(HOME)

  return (
    <div className='all'>
      <h1 className='teamName'>The Phantom Thieves</h1>
      <div className='navbar'>
        <div className='navbarElement navbarElementFirst' onClick={() => setShow(1)}>Home</div>
        <div className='navbarElement' onClick={() => setShow(2)}>Time Sheets</div>
        <div className='navbarElement' onClick={() => setShow(5)}>Four Ups</div>
        <div className='navbarElement' onClick={() => setShow(3)}>Domain Model</div>
        <div className='navbarElement' onClick={() => setShow(4)}>Project Plan</div>
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
      {show === DOMAIN ?
        <Domain/>
        :
        null
      }
      {show === PLAN ?
        <Plan/>
        :
        null
      }
      {show === FOUR ?
        <Fours/>
        :
        null
      }
      <img src={ash} alt="ash.png" className='ash'/>
    </div>
  )
}

export default App
