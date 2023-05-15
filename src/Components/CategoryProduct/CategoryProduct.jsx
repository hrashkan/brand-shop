import React from 'react'

import { AiOutlineStar, AiFillStar, AiOutlineHeart } from "react-icons/ai"
import { Link } from 'react-router-dom'

import { zoomMouseMove, zoomMouseLeave } from "../../Func/Func"

import "./CategoryProduct.css"

export default function CategoryProduct() {
    return (
        <div className='col-12'>
            <article className="product">
                <div className="row">
                    <div className="col-3">
                        <div className="product__cover">
                            <img src="/images/product/home/1/1.jpg" alt="product" className="product__cover-img" onMouseMove={zoomMouseMove} onMouseLeave={zoomMouseLeave} />
                        </div>
                    </div>
                    <div className="col-9">
                        <h3 className="product_title">
                            GoPro HERO6 4K Action Camera - Black
                        </h3>
                        <div className="product-detail__price">
                            <span className="product-detail__price-number">
                                $99.50
                            </span>
                            <div className="product-detail__score">
                                <AiFillStar className='product-detail__score-fill' />
                                <AiFillStar className='product-detail__score-fill' />
                                <AiFillStar className='product-detail__score-fill' />
                                <AiFillStar className='product-detail__score-fill' />
                                <AiOutlineStar className='product-detail__score-outline' />
                            </div>
                        </div>

                        <p className="product-desc">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt porro voluptas aut?
                        </p>

                        <div className="product-detail__save product-save__col">
                            <AiOutlineHeart />
                        </div>

                        <div className="product-col__buttons">
                            <Link to="/" className='product__button-details'>
                                Show Details
                            </Link>
                            <Link to="/" className='product__button-add'>
                                Add To Cart
                            </Link>
                        </div>
                    </div>
                </div>



            </article>
        </div>
    )
}
