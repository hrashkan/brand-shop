import React from 'react'

import "./FooterCopyRight.css"

export default function FooterCopyRight() {
    return (
        <div className="footer__copy-right">
        <div className="container">
                <span className="footer__copy-right-text">
                    © 2023 Ecommerce. By <mark className='text-mark'>Hr Ashkan</mark>
                </span>
            </div>
        </div>
    )
}
