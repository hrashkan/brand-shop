import React from 'react'

import "./MainTitle.css"

export default function MainTitle({ title, subtitle }) {
    return (
        <>
            <h2 className="main-title">{title}</h2>
            {
                subtitle ? (
                    <span className="main-title__desc">{subtitle}</span>
                ) : ('')
            }
        </>
    )
}
