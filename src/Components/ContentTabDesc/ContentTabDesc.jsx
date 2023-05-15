import React from 'react'

import ProductFeatures from '../ProductFeatures/ProductFeatures'
import ProductReview from '../ProductReview/ProductReview'

import { FaTruck } from "react-icons/fa"


import "./ContentTabDesc.css"

export default function ContentTabDesc({ activeTab }) {


    return (
        <>
            <div className={`product__description ${activeTab === 'description' && 'active'}`}>
                <p className="product__description-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <ul className="product__features">
                    <ProductFeatures feature="Some great feature name here" />
                    <ProductFeatures feature="Lorem ipsum dolor sit amet, consectetur " />
                    <ProductFeatures feature="Duis aute irure dolor in reprehenderit" />
                    <ProductFeatures feature="Some great feature name here" />
                    <ProductFeatures feature="Some great feature name here" />
                    <ProductFeatures feature="Some great feature name here" />
                </ul>
            </div>
            <div className={`product__comment ${activeTab === 'reviews' && 'active'}`}>
                <ProductReview
                    name="ashkan"
                    role="user"
                    score={2}
                    text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egest"

                />
                <ProductReview
                    name="changiz"
                    role="user"
                    score={3}
                    text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi"

                />
                <ProductReview
                    name="john"
                    role="user"
                    score={4}
                    text=" Lorem ipsum dolor sit amet, consectetur adipiscing "

                />
                <ProductReview
                    name="alice"
                    role="user"
                    score={5}
                    text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan"

                />
            </div>
            <div className={`product__shipping ${activeTab === 'shipping' && 'active'}`}>
                <div className="shipping__policy">
                    <p className="shipping__header">
                        <FaTruck className="shipping__header-icon" />
                        <span className="shipping__header-title">Shipping</span>
                    </p>
                    <p className="shipping__body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.
                    </p>
                </div>
            </div>
            <div className={`product__about ${activeTab === 'about company' && 'active'}`}>
                <h3 className='about__header'>Lorem ipsum dolor sit amet,</h3>
                <p className="about__desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque In egestas erat imperdiet sed euismod nisi porta lorem mollis Morbi tristique senectus et netus Mattis pellentesque id nibh tortor id aliquet lectus proin Sapien faucibus et molestie ac feugiat sed lectus vestibulum Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget Dictum varius duis at consectetur lorem Nisi vitae suscipit tellus mauris a diam maecenas sed enim Velit ut tortor pretium viverra suspendisse potenti nullam Et molestie ac feugiat sed lectus Non nisi est sit amet facilisis magna Dignissim diam quis enim lobortis scelerisque fermentum Odio ut enim blandit volutpat maecenas volutpat Ornare lectus sit amet est placerat in egestas erat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus
                </p>
            </div>
        </>
    )
}
