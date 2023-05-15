import React from 'react'

import { AiFillStar, AiOutlineStar } from "react-icons/ai"

import "./ProductReview.css"

export default function ProductReview({ name, role, score, text }) {


    return (
        <div className='user__review'>
            <div className="review__head">
                <div className="review__user">
                    <span className="review__user-badge">{role}</span>
                    <span className="review__user-name">{name}</span>
                </div>
                <span className="review__star">

                    {
                        Array.from({ length: score }).fill(0).map((start, index) => (
                            <AiFillStar key={index + 1} />
                        ))
                    }
                    {
                        Array.from({ length: 5 - score }).fill(0).map((start, index) => (
                            <AiOutlineStar key={index + 1} />
                        ))
                    }
                </span>
            </div>
            <p className="review__text">
                {text}
            </p>
        </div>
    )
}
