import React from 'react'

import { Link } from 'react-router-dom'

import "./OfferProduct.css"

export default function OfferProduct({ img, link, title, price }) {
    return (
        <Link to={`/product/${link}`} className='offer__product'>
            <div className="offer__product-cover">
                <img src={img} alt="offer-product" className="offer__product-thumbnail" />
            </div>
            <div className="offer__product-content">
                <h4 className="offer__product-title">{title}</h4>
                <span className="offer__product-price">${price}</span>
            </div>
        </Link>
    )
}
