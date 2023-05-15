import React from 'react'

import "./ProductShortDetail.css"

export default function ProductShortDetail({ title, text }) {
    return (
        <div className='product-detail__table'>
            <span className="product__detail-title">{title ? title : ''}:</span>
            <span className="product__detail-text">{text ? text : ''}</span>
        </div>
    )
}
