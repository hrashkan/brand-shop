import React from 'react'

import "./SearchBox.css"

export default function SearchBox() {
    return (
        <div className="header__search">
            <div className="header__search-box">
                <input type="text" name="" id="search-box" className='header__search-form' placeholder='search' />
                <button className='header__search-button' type="submit">search</button>
            </div>
        </div>
    )
}
