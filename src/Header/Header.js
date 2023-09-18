import React, { useState } from 'react'
// images
import LogIcon from '../Images/header-images/logo.svg'
import userIcon from '../Images/header-images/user.svg'
import cartIcon from '../Images/header-images/bi_cart-fill.svg'
import {useSelector} from 'react-redux'
// ----------------------------
import './Header.scss'
import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  const [showMenu, setshowMenu] = useState(false);
  const userData = useSelector(state => state.user.value)
  const handleShowMenu = () => {
    setshowMenu((preve) => !preve);
  }
  return (
    <div>
       <header className="header-wrapp">
         <div className="logo-wrap">
          <Link to='/'>
            <img src={LogIcon} alt='logo' />
          </Link>
         </div>
         <ul>
            <li>
            <NavLink to="/" activeclassname="active">Home</NavLink>
            </li>
            <li>
            <NavLink to="/menu" activeclassname="active">Menu</NavLink>
            </li>
            <li>
            <NavLink to="/about" activeclassname="active">About</NavLink>
            </li>
            <li>
            <NavLink to="/contact" activeclassname="active">Contact</NavLink>
            </li>
            <li>
                <div className='cart-wrap'>
                    <Link to='/cart'><img src={cartIcon} alt="cart" /></Link>
                    <span className='cart-count'>0</span>
                </div>
            </li>
            <li>
                <div className='user-wrap' onClick={handleShowMenu}>
                    <a href="/" className='user-icon' onClick={(e) => e.preventDefault()}><img src={userData.image ? userData.image : userIcon} alt="user" /></a>
                    {showMenu && (
                      <div className='user-opt-wrap'>
                      <ul>
                      <li>
                          <Link to='/signup'>new</Link>
                        </li>
                        <li>
                          {userData.image ? <p>Logout</p> : <Link to='/signup'>Sign Up</Link>}
                        </li>
                      </ul>
                      </div>
                    )}
                </div>
            </li>
         </ul>

       </header>
    </div>
  )
}
