import React from 'react'

import { AiOutlineCheck } from "react-icons/ai"

import "./ProductFeatures.css"

export default function ProductFeatures({ feature }) {
    return (
        <li className="product__features-item">
            <AiOutlineCheck className='product__features-icon' />
            <p className='product__features-text'>{feature}</p>
        </li>
    )
}
