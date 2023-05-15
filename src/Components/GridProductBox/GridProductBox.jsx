import React from 'react'

import { zoomMouseMove, zoomMouseLeave } from "../../Func/Func"

import AddToCartButton from '../AddToCartButton/AddToCartButton'
import { addToCartHandler } from '../../Func/Func'


import { Link } from 'react-router-dom'

import "./GridProductBox.css"

export default function GridProductBox({ name, desc, score, src, id, discount, price }) {
    return (
        <article className="grid-product-box">
            <div className="product__content">
                <Link to={`/product/${id}`} className='product__title'>
                    <h3 className="product__title-text">
                        {name}
                    </h3>
                </Link>
                <div className="product__price">
                    From
                    <span className="product__price-number">USD {price}</span>
                </div>
            </div>
            <Link to={`/product/${id}`} className="product__thumbnail">
                <img src={src} alt="product" className="product__thumbnail-img" onMouseMove={zoomMouseMove} onMouseLeave={zoomMouseLeave} />
            </Link>
            <AddToCartButton
                onAddToCart={(detail) => addToCartHandler(detail)}
                productDetail={{ name, desc, score, src, id, discount, price, count: 1 }}
            />
        </article>
    )
}
