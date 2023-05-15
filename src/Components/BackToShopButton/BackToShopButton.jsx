import React from 'react'

import { Link } from 'react-router-dom'

import { AiOutlineArrowLeft } from "react-icons/ai"

import "./BackToShopButton.css"

export default function BackToShopButton() {
    return (
        <Link to='/category/1' className='cart-product__back main-btn__animation'>
            <AiOutlineArrowLeft />
            Back to shop
        </Link>
    )
}
