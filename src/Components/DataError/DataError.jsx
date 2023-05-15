import React from 'react'

import "./DataError.css"

export default function DataError() {

    const reloadPageHandler = () => location.reload();

    return (
        <div className="data-error">
            <div className="data-error__container">
                <h2 className="data-error__title">Error</h2>
                <p className="data-error__desc">
                    This site uses Firebase realtime database for database, turn on your vpn to see the site and try again
                </p>
                <button className="data-error__button main-btn__animation" onClick={reloadPageHandler}>
                    reload
                </button>
            </div>
        </div>
    )
}
