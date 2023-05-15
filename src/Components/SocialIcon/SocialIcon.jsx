import React from 'react'


import { BsFacebook } from "react-icons/bs"
import { FaTwitterSquare, FaInstagramSquare } from "react-icons/fa"
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai"


import "./SocialIcon.css"

export default function SocialIcon() {
    return (
        <>
            <div className="social__icon">
                <BsFacebook />
            </div>
            <div className="social__icon">
                <FaTwitterSquare />
            </div>
            <div className="social__icon">
                <AiFillLinkedin />
            </div>
            <div className="social__icon">
                <FaInstagramSquare />
            </div>
            <div className="social__icon">
                <AiFillYoutube />
            </div>
        </>
    )
}
