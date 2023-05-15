import React from 'react'

import { Link } from 'react-router-dom'

import { IoIosArrowDown } from "react-icons/io"

export default function HeaderMenuLinks({ title, href, children }) {


    return (
        <li className="navbar__list-item">
            <Link to={href} className='navbar__list-item-link'>
                {title}

            </Link>

            {
                children &&
                <>
                    <IoIosArrowDown />
                    <ul className="navbar__submenu">
                        {
                            children.map(subMenu => (
                                <li className="navbar__submenu-item" key={subMenu.id}>
                                    <Link to={subMenu.href} className='navbar__submenu-item-link'>
                                        {subMenu.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </>
            }
        </li>
    )
}

