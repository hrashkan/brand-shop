import React from 'react'

import { Link } from 'react-router-dom'

import "./CategoriesMenuItem.css"

export default function CategoriesMenuItem({title, href}) {
    return (
        <li className="categories__list-item">
            <Link to={href} className='categories__list-link'>{title}</Link>
        </li>
    )
}
