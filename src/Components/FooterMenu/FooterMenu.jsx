import React from 'react'

import { Link } from 'react-router-dom'

import "./FooterMenu.css"

export default function FooterMenu({ title, href }) {


  return (

    <li className="footer__list-item">
      <Link className='footer__list-link' to={href}>
        {title}
      </Link>
    </li>

  )
}
