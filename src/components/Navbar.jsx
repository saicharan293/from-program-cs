import React from 'react'
import './Navbar.css'
const Navbar = ({onMenuClick}) => {
  
  return (
    <header className='site-header'>
        <a href='/' className='brand'>
            From Program.cs<span>.</span>
        </a>
        <p>Always learning. Always questioning.</p>

        <button
          className='mobile-menu-btn'
          onClick={onMenuClick}
          aria-label='Open navigation menu'
        >
          ☰
        </button>
    </header>
  )
}

export default Navbar