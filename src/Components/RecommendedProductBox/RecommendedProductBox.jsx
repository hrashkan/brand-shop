import React from 'react'

import { zoomMouseMove, zoomMouseLeave } from "../../Func/Func"

import AddToCartButton from '../AddToCartButton/AddToCartButton'
import { addToCartHandler } from '../../Func/Func'

import { Link } from 'react-router-dom'

import "./RecommendedProductBox.css"

export default function RecommendedProductBox({ name, desc, score, src, id, discount, price }) {
    return (
        <article className="recommended-product">
            <Link to={`/product/${id}`} className='recommended-product__cover'>
                <img src={src} alt="product" className="recommended-product__cover-img" onMouseMove={zoomMouseMove} onMouseLeave={zoomMouseLeave} />
            </Link>
            <span className="recommended-product__price">${price}</span>
            <Link to={`/product/${id}`} className="recommended-product__desc">
                {desc}
            </Link>
            <AddToCartButton
                onAddToCart={(detail) => addToCartHandler(detail)}
                productDetail={{ name, desc, score, src, id, discount, price, count: 1 }}
            />
        </article>
    )
}
