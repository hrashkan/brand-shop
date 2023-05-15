import React, { useContext, useEffect, useState } from 'react'

import AddToCartButton from '../AddToCartButton/AddToCartButton'
import { zoomMouseMove, zoomMouseLeave, addToCartHandler } from "../../Func/Func"

import shopContext from '../../Context/contex'

import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai"


import { Link } from 'react-router-dom'

import "./CategoryProductBox.css"

export default function CategoryProductBox({ name, price, src, desc, score, id, discount, showType, onMoveToCart, onRemove, onAddToSaveList, onRemoveFromSaveList }) {

    const { userSavesList } = useContext(shopContext);
    const [productSaveList, setProductSaveList] = useState([]);

    useEffect(() => {
        setProductSaveList(userSavesList)
    }, [userSavesList])




    return (
        <>
            {

                showType === 'grid-full' ?
                    (
                        <div className="col-6 col-lg-3">
                            <article className="product">
                                <Link to={`/product/${id}`} className="product__cover">
                                    <img src={src} alt={name} className="product__cover-img" onMouseMove={zoomMouseMove} onMouseLeave={zoomMouseLeave} />
                                </Link>
                                <div className="product-box-detail">
                                    <div className="product-detail__price">
                                        <span className="product-detail__price-number">
                                            ${price}
                                        </span>
                                        <div className="product-detail__score">
                                            {
                                                Array(score).fill(0).map((item, index) => (
                                                    <AiFillStar key={index} className='product-detail__score-fill' />
                                                ))
                                            }
                                            {
                                                Array(5 - score).fill(0).map((item, index) => (
                                                    <AiOutlineStar key={index} className='product-detail__score-outline' />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="product-detail__save">
                                        <AiFillHeart onClick={() => onRemove(id)} />
                                    </div>

                                </div>
                                <Link to={`/product/${id}`}>
                                    <h3 className="product_title">
                                        {name}
                                    </h3>
                                </Link>
                                <button to="/" className='product__button' onClick={() => { onMoveToCart(name, desc, price, src, score, id) }}>
                                    Add To Cart
                                </button>
                            </article>
                        </div>)

                    : showType === 'grid' ?
                        (
                            <div className="col-6 col-lg-4">
                                <article className="product product-box">
                                    <Link to={`/product/${id}`} className="product__cover">
                                        <img src={src} alt={name} className="product__cover-img" onMouseMove={zoomMouseMove} onMouseLeave={zoomMouseLeave} />
                                    </Link>
                                    <div className="product-box-detail">
                                        <div className="product-detail__price">
                                            <div className="product-detail__price--box">
                                                <span className={`product-detail__price-number ${discount && 'main-price'}`}>
                                                    ${price}
                                                </span>

                                                {
                                                    discount ?
                                                        (<span className="product-detail__price-number discount-price">
                                                            ${price - (price * discount) / 100}
                                                        </span>)
                                                        : ('')
                                                }
                                            </div>

                                            <div className="product-detail__score">
                                                {
                                                    Array(score).fill(0).map((item, index) => (
                                                        <AiFillStar key={index} className='product-detail__score-fill' />
                                                    ))
                                                }
                                                {
                                                    Array(5 - score).fill(0).map((item, index) => (
                                                        <AiOutlineStar key={index} className='product-detail__score-outline' />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="product-detail__save">

                                            {
                                                productSaveList.some(product => product.id === id) ?
                                                    (
                                                        <AiFillHeart
                                                            onClick={() => onRemoveFromSaveList(id)}
                                                        />
                                                    )
                                                    : (
                                                        <AiOutlineHeart
                                                            onClick={() => onAddToSaveList(name, desc, price, src, score, id)}
                                                        />
                                                    )
                                            }

                                        </div>

                                    </div>
                                    <Link to={`/product/${id}`}>
                                        <h3 className="product_title">
                                            {name}
                                        </h3>
                                    </Link>
                                    <AddToCartButton
                                        onAddToCart={(detail) => addToCartHandler(detail)}
                                        productDetail={{ name, desc, score, src, id, discount, price, count: 1 }}
                                    />
                                </article>
                            </div>)
                        : (
                            <div className='col-12'>
                                <article className="product product-full">
                                    <div className="row">
                                        <div className="col-3">
                                            <Link to={`/product/${id}`} className="product__cover">
                                                <img src={src} alt={name} className="product__cover-img" onMouseMove={zoomMouseMove} onMouseLeave={zoomMouseLeave} />
                                            </Link>
                                        </div>
                                        <div className="col-9">
                                            <h3 className="product_title">
                                                {name}
                                            </h3>
                                            <div className="product-detail__price">
                                                <span className="product-detail__price-number">
                                                    ${price}
                                                </span>
                                                <div className="product-detail__score">
                                                    {
                                                        Array(score).fill(0).map((item, index) => (
                                                            <AiFillStar key={index} className='product-detail__score-fill' />
                                                        ))
                                                    }
                                                    {
                                                        Array(5 - score).fill(0).map((item, index) => (
                                                            <AiOutlineStar key={index} className='product-detail__score-outline' />
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                            <p className="product-desc">
                                                {desc}
                                            </p>

                                            <div className="product-detail__save product-save__col">
                                            {
                                                productSaveList.some(product => product.id === id) ?
                                                    (
                                                        <AiFillHeart
                                                            onClick={() => onRemoveFromSaveList(id)}
                                                        />
                                                    )
                                                    : (
                                                        <AiOutlineHeart
                                                            onClick={() => onAddToSaveList(name, desc, price, src, score, id)}
                                                        />
                                                    )
                                            }
                                            </div>

                                            <div className="product-col__buttons">
                                                <Link to={`/product/${id}`} className='product__button-details'>
                                                    Show Details
                                                </Link>
                                                <AddToCartButton
                                                    onAddToCart={(detail) => addToCartHandler(detail)}
                                                    productDetail={{ name, desc, score, src, id, discount, price, count: 1 }}
                                                    animationBtn={true}
                                                />
                                            </div>
                                        </div>
                                    </div>



                                </article>
                            </div>
                        )
            }

        </>

    )
}
