import React from 'react'

import MainTitle from '../MainTitle/MainTitle'

import { AiOutlineMail } from "react-icons/ai"

import "./FooterNewsletter.css"

export default function FooterNewsletter() {
  return (
    <div className="newsletter">
      <MainTitle title="Subscribe on our newsletter" subtitle="Get daily news on upcoming offers from many suppliers all over the world" />
      <form className="footer-newsletter">
        <div className="newsletter__email">
          <AiOutlineMail />
          <input type="email" className="newsletter__email-input" placeholder='Email' />
        </div>
        <button type="submit" className="newsletter__submit main-btn__animation">Subscribe</button>
      </form>
    </div>
  )
}
