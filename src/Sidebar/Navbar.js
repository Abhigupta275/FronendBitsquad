import React from 'react'
import './sidebar.css'

export default function Navbar(props) {
  return (
    <div>
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top" style={{zIndex:1, height: "9vh"}}>
    <div className="container-fluid ">
   
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="">
              Finance
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              PayRole
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}
