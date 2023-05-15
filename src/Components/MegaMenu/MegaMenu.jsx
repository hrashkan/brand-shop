import React from 'react'

import { Link } from 'react-router-dom'

import "./MegaMenu.css"

export default function MegaMenu({ active, megaMenu }) {
    return (
        <ul className={`mega-menu ${active ? 'active' : ''}`}>

            {
                megaMenu.length ? (
                    megaMenu.map(menu => (
                        <div className="mega-menu__list" key={menu.id}>
                            <span className="mega-menu__list-title">
                                {menu.title}
                            </span>

                            {
                                menu.children &&
                                menu.children.map(subMenu => (
                                    <li key={subMenu.id} className="mega-menu__list-item">
                                        <Link to={subMenu.href} className='mega-menu__list-link'>{subMenu.title}</Link>
                                    </li>
                                ))
                            }

                        </div>
                    ))
                ) : (null)
            }

        </ul>
    )
}
