import React from 'react'

import { Link } from 'react-router-dom'

import { IoIosArrowForward } from "react-icons/io"

import "./Breadcrumb.css"

export default function Breadcrumb({ links }) {



    return (
        <section className="breadcrumb">
            <ul className="breadcrumb__list">

                {
                    links.length ?
                        (
                            links.map((link, index) => (
                                <li key={link.id} className="breadcrumb__item">
                                    <Link to="https://react.dev" className='breadcrumb__link'>
                                        {link.name}
                                    </Link>
                                    <IoIosArrowForward className={`${index + 1 === links.length ? 'breadcrumb__icon-none' : 'breadcrumb__icon'}`} />
                                </li>
                            ))
                        )
                        : ("")
                }

            </ul>
        </section>
    )
}
