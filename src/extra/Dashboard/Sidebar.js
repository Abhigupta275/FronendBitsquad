import React from 'react'
import './dashboard.css'
function Sidebar({sidebar}) {
  return (
    <div className={sidebar?"sidebar sidebar--open":"sidebar"}>
        <li><i class="bi bi-house-door"></i>Dashboard</li>
        <li>Dashboard</li>
        <li>Dashboard</li>
        <li>Dashboard</li>
    </div>
  )
}

export default Sidebar
