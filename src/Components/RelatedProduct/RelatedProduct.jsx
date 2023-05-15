import React from 'react'

import { zoomMouseMove, zoomMouseLeave } from "../../Func/Func"

import { Link } from 'react-router-dom'

import "./RelatedProduct.css"

export default function RelatedProduct({ img, link, title, price }) {
    return (
        <Link to={`/product/${link}`} className="related__product">
            <div className="related-product__cover">
                <img src={img} alt="related product" className="related__product-thumbnail" onMouseMove={zoomMouseMove} onMouseLeave={zoomMouseLeave} />

            </div>
            <h4 className="related__product-title">{title}</h4>
            <span className="related__product-price">${price}</span>
            <button className='related__product-button'>See Detail</button>
        </Link>
    )
}
