import React, { useState } from 'react'

import AddToCartButton from '../AddToCartButton/AddToCartButton'
import { addToCartHandler } from '../../Func/Func'

import { Link } from 'react-router-dom'

import "./OfferProductBox.css"


export default function OfferProductBox({ name, desc, score, src, id, discount, price }) {


    return (
        <article className="offer-product-box">
            <Link to={`/product/${id}`} className="offer-product__cover">
                <img src={src} alt={name} className="offer-product__cover-img" />
            </Link>
            <Link to={`/product/${id}`} >
                <h3 className="offer-product__title">
                    {name}
                </h3>
            </Link>
            <div className="offer-product__price">
                <span className="offer-product__price-main">${price}</span>
                <span className="offer-product__price-discount">${price - (price * discount) / 100}</span>
            </div>
            <div className="offer-product__badge">
                %{discount}
            </div>

            <AddToCartButton
                onAddToCart={(detail) => addToCartHandler(detail)}
                productDetail={{ name, desc, score, src, id, discount, price, count: 1 }}
            />

        </article>
    )
}
