import React, { useState, useEffect } from 'react'
// import dotenv from 'dotenv';
// dotenv.config();
// images
import LogIcon from '../Images/header-images/logo.svg'
import userIcon from '../Images/header-images/user.svg'
import cartIcon from '../Images/header-images/bi_cart-fill.svg'
import menuIcon from '../Images/header-images/menu.png'
import closeIcon from '../Images/header-images/close.png'
import {useDispatch, useSelector} from 'react-redux'
import {  logoutRedux } from '../Redux/userSlice'
// require('dotenv').config();

// ----------------------------
import './Header.scss'
import { NavLink, Link } from 'react-router-dom'
import toast from 'react-hot-toast'


export function Header() {
  const [showMenu, setshowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [togglemob, setTogglemob] = useState(false);
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.value)
  const handleShowMenu = () => {
    setshowMenu((preve) => !preve);
  }
  const handleLogout = () => {
    dispatch(logoutRedux())
    toast('Logout Successfully')
  }
  const clickMenu = () => {
    setTogglemob(true);
  }
  const closeMenu = () => {
    setTogglemob(false);
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <div>
       <header className="header-wrapp">
         <div className='gg-menu'>
          <img src={menuIcon} alt="menu" onClick={clickMenu}/>
         </div>
         <div className="logo-wrap">
          <Link to='/'>
            <img src={LogIcon} alt='logo' />
          </Link>
         </div>
         <ul>
            <li className='gg-desk'>
            <NavLink to="/" activeclassname="active">Home</NavLink>
            </li>
        
            <li className='gg-desk'>
            <NavLink to="/about" activeclassname="active">About</NavLink>
            </li>
            <li className='gg-desk'>
            <NavLink to="/contact" activeclassname="active">Contact</NavLink>
            </li>
            <li>
                <div className='cart-wrap'>
                    <Link to='/cart'><img src={cartIcon} alt="cart" /></Link>
                    <span className='cart-count'>{cartItemNumber.length}</span>
                </div>
            </li>
            <li>
                <div className='user-wrap' onClick={handleShowMenu}>
                    <a href="/" className='user-icon' onClick={(e) => e.preventDefault()}><img src={userData.image ? userData.image : userIcon} alt="user" /></a>
                    {showMenu && (
                      <div className='user-opt-wrap'>
                      <ul>
                      {userData.email === process.env.REACT_APP_ADMIN_EMAI && <li><Link to='/NewProduct'>new</Link></li>}
                        <li>
                          {userData.image ? <p onClick={handleLogout}>Logout </p> : <Link to='/signup'>Sign Up</Link>}
                        </li>
                      </ul>
                      </div>
                    )}
                </div>
            </li>
         </ul>

       </header>
       {isMobile && (
  <div className= {togglemob ? 'mbile-nav-wrap gg-active' : 'mbile-nav-wrap'}>
    <div className="mob-overlay" onClick={closeMenu}></div>
    <div className="mob-wrap">
      <img src={closeIcon} alt="close" className='gg-close' onClick={closeMenu}/>
      <ul>
        <li className='gg-desk'>
          <NavLink to="/" activeclassname="active">Home</NavLink>
        </li>
        <li className='gg-desk'>
          <NavLink to="/about" activeclassname="active">About</NavLink>
        </li>
        <li className='gg-desk'>
          <NavLink to="/contact" activeclassname="active">Contact</NavLink>
        </li>
      </ul>
    </div>
  </div>
)}
    </div>
  )
}
