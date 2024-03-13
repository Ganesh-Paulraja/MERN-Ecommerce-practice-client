import React from 'react'
import './Footer.scss'
import LogIcon from '../Images/header-images/footer-logo.png'
import {Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='footer-wrap'>
      <div className="logo-wrap">
          <Link to='/'>
            <img src={LogIcon} alt='logo' />
          </Link>
         </div>
         <div className="gg-call">
          Call: <a href="tel:123456789">123456789</a>
         </div>
         <div className="gg-mail">
          Mail to: <a href="mailto:g@gmail.com">g@gmail.com</a>
         </div>
    </div>
  )
}
