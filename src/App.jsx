import './App.css'
import { useState } from 'react'
import Home from './Home'
import Time from './Time'
import Domain from './Domain'
import Plan from './Plan'
import Fours from './Fours'
import ash from '/ash.png'

const NAV = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Time Sheets' },
  { id: 5, label: 'Four-Ups' },
  { id: 3, label: 'Domain Model' },
  { id: 4, label: 'Project Plan' },
]

{/*pages are all mounted but still hidden. Trying to prevent the nav bar jumping around*/} 
const COMPONENTS = { 1: Home, 2: Time, 3: Domain, 4: Plan, 5: Fours }

export default function App() {
  const [show, setShow] = useState(1)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">

          {/*ash's face*/} 
          <div className="brand">
            <img src={ash} alt="Phantom Thieves" className="brand-img" />
            <span className="brand-name">The Phantom Thieves</span>
          </div>

          {/*"home", "time sheets", "four-ups", "domain model", "project plan" nav bar*/} 
          <nav className="main-nav">
            {NAV.map(n => (
              <button
                key={n.id}
                className={`nav-btn ${show === n.id ? 'active' : ''}`}
                onClick={() => setShow(n.id)}
              >
                <span className="nav-slash">//</span>{n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {Object.entries(COMPONENTS).map(([id, Comp]) => (
          <div key={id} style={{ display: show === Number(id) ? 'block' : 'none' }}>
            <Comp />
          </div>
        ))}
      </main>
      
      {/*feeeeetttttttt*/} 
      <footer className="site-footer">
        <span className="footer-text">// THE PHANTOM THIEVES // CWA SUPPORT TOOL // {new Date().getFullYear()} //</span>
      </footer>
    </div>
  )
}