import React from 'react'

import { FaSearch } from "react-icons/fa"

import { Link } from 'react-router-dom'


import "./ServicesBox.css"

export default function ServicesBox({ href, src, title, icon }) {
    return (
        <div className="col-12 col-md-6 col-lg-3">
            <div className="services-box">
                <div className="services-box__img">
                    <img src={src} alt={title} className="services-box__cover" />
                    <FaSearch />
                </div>
                <Link className='services-box__title' to={href}>
                    <h3 className="services-box__title-text">{title}</h3>
                </Link>
            </div>
        </div>
    )
}
