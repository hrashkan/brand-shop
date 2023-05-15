import React from 'react'

import MainTitle from '../MainTitle/MainTitle';
import { Link } from 'react-router-dom';

import "./DiscountBanner.css"

export default function DiscountBanner() {
    return (
        <section className="discount">
            <div className="discount__wrapper">
                <div className="discount-body">
                    <MainTitle title="Super discount on more than 100 USD" subtitle="Have you ever finally just write dummy info" />
                </div>
                <div className="discount-link">
                    <Link to="https://react.dev" className="discount-link__button" >Shop now</Link>
                </div>
            </div>
        </section>
    )
}
