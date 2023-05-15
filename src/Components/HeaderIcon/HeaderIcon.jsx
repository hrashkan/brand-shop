import React from 'react'
import { Link } from 'react-router-dom'

import "./HeaderIcon.css"

export default function HeaderIcon({ icon, title, href, userSavesList, userCartList }) {




    return (
        <Link to={href ? href : "https://react.dev"} className={`header__icon-elm ${title.toLowerCase()}`}>
            {icon}
            <span className="header__icon-title">{title}</span>

            {
                userCartList ?
                    (
                        <span className={`header__icon-badge`}>{userCartList.length}</span>
                    )

                    : userSavesList ?
                        (
                            <span className={`header__icon-badge`}>{userSavesList.length}</span>
                        )
                        : ('')

            }

        </Link>
    )
}
