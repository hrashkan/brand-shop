import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import "./NotFound.css"

export default function NotFound() {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (counter < 404) setCounter(prevNumber => prevNumber + 1)
        }, 5);

        return () => clearInterval(interval);

    }, [counter])


    return (
        <main className="main notfound">
            <h1 className={`notfound__title ${counter === 404 && 'red'}`}>
                {counter}
            </h1>
            <p className="notfound__desc">
                Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
            </p>
            <p className="notfound__return">
                Let's go <Link to="/">home</Link> and try from there.
            </p>
        </main>
    )
}
