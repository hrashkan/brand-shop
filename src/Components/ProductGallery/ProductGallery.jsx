import React from 'react'

import "./ProductGallery.css"

export default function ProductGallery({ src, onChoose }) {

    const clickImgHandler = () => {
        onChoose(src)
    }

    return (
        <li className="product__gallery-item" onClick={clickImgHandler}>
            <img src={src} alt="product" className="product__gallery-img" />
        </li>
    )
}
