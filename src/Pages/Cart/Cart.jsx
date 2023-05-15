import React, { useContext, useEffect, useState } from 'react'

import CartProduct from '../../Components/CartProduct/CartProduct'
import CategoryProductBox from '../../Components/CategoryProductBox/CategoryProductBox'
import DiscountBanner from '../../Components/DiscountBanner/DiscountBanner'
import BackToShopButton from '../../Components/BackToShopButton/BackToShopButton'

import shopContext from '../../Context/contex'

import { addToCartHandler, addToSaveListHandler, saveCookie } from '../../Func/Func'

import { AiOutlineArrowLeft, AiOutlineShoppingCart, AiOutlineCheck } from "react-icons/ai"
import { BiLock } from "react-icons/bi"
import { MdMessage } from "react-icons/md"
import { FaTruckMoving } from "react-icons/fa"
import { Link } from 'react-router-dom'


import "./Cart.css"

export default function Cart() {

    const { userCartList, setUserCartList, userSavesList, setUserSavesList, setLoading } = useContext(shopContext)


    const [totalPrice, setTotalPrice] = useState(0);
    const [productTax, setProductTax] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [isCouponValid, setIsCouponValid] = useState(false)
    const [discount, setDiscount] = useState(0);
    const [cartCoupon, setCartCoupon] = useState('');
    const [isCountUpdate, setIsCountUpdate] = useState(false);
    const [isCheckoutActive, setIsCheckoutActive] = useState(false);
    const [isUserCheckout, setIsUseCheckout] = useState(false)


    useEffect(() => {
        calcTotalCart();
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [userCartList, discount, isCountUpdate, isCouponValid])


    //remove product from cart
    const removeProductHandler = id => {
        const updateUserCart = userCartList.filter(product => product.id !== id)
        setUserCartList(updateUserCart);
        saveCookie('userCartProducts', updateUserCart, 30);
    }

    //move cart product to save
    const moveProductToSaveHandler = (name, desc, price, src, score, id) => {

        //move to save list
        const checkProduct = userSavesList.some(product => product.id === id);
        if (!checkProduct) {
            setUserSavesList(prev => [...prev, { name, desc, price, src, score, id }]);
            addToSaveListHandler(name, desc, price, src, score, id);
        }
        //remove from cart
        const updateCartProduct = userCartList.filter(product => product.id !== id);
        setUserCartList(updateCartProduct)
        saveCookie('userCartProducts', updateCartProduct, 30)
    }


    //move product from save list to cart
    const moveToCartHandler = (name, desc, price, src, score, id) => {

        // setIsBasketUpdate(prev => !prev);

        const saveProductDetail = { name, desc, price, src, score, id, count: 1 }

        //move to cart
        const checkUserCart = userCartList.some(product => product.id === saveProductDetail.id);
        if (!checkUserCart) {
            addToCartHandler(saveProductDetail);
            setUserCartList(prev => [...prev, saveProductDetail]);
        }

        //remove from save list
        const moveProduct = userSavesList.filter(product => product.id !== id);
        setUserSavesList(moveProduct);
        saveCookie('userSaveList', moveProduct, 30)

    }

    //remove product from save list
    const removeSaveProduct = id => {
        const moveProduct = userSavesList.filter(product => product.id !== id);
        setUserSavesList(moveProduct);
        saveCookie('userSaveList', moveProduct, 30);
    }

    //empty user cart handler
    const emptyUserCartHandler = () => {
        setUserCartList([])
        saveCookie('userCartProducts', [], 30)
    }

    //calc user cart
    const calcTotalCart = () => {
        let sum = 0;
        userCartList.map(product => (
            sum += product.price * Number(product.count)
        ))
        setTotalPrice(sum)
        setProductTax((sum * 10) / 100);
        isCouponValid ? setDiscount((sum * 20) / 100) : setDiscount(0)
        setFinalPrice((sum + productTax) - discount)
    }

    //update state for update product count in cartProduct component
    const productCountUpdated = () => setIsCountUpdate(prev => !prev);

    //checkout button handler
    const checkoutHandler = () => {
        setIsCheckoutActive(prev => !prev);
        setIsUseCheckout(prev => !prev);
        setUserCartList([]);
    }


    //submit coupon
    const submitCouponHandler = e => {
        e.preventDefault()
        if (cartCoupon === 'Ashkan') {
            console.log('validCoupon')
            setIsCouponValid(true);
        } else {
            console.log('invalid coupon')
        }
    }

    return (
        <main className="main">
            <section className="user-cart">
                <div className="container">
                    <h1 className="cart__title">My Cart ({setUserCartList.length})</h1>
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="cart-product-container">
                                {
                                    userCartList.length ?
                                        (
                                            userCartList.map(product => (
                                                <CartProduct
                                                    key={product.id}
                                                    {...product}
                                                    onRemove={removeProductHandler}
                                                    onMoveToSaves={moveProductToSaveHandler}
                                                    onCountUpdated={productCountUpdated}
                                                />
                                            ))
                                        )
                                        : (


                                            isUserCheckout ?
                                                (
                                                    <div className="empty-cart">
                                                        <p className="checkout-cart__title">
                                                            Thank you for your purchase
                                                        </p>
                                                        <BackToShopButton />
                                                    </div>
                                                )
                                                : (
                                                    <div className="empty-cart">
                                                        <p className="empty-cart__title">
                                                            You have not added any products to your cart yet
                                                        </p>
                                                        <span className="empty-cart__text">
                                                            Go to the store and add some products to your cart
                                                        </span>
                                                        <BackToShopButton />
                                                    </div>
                                                )



                                        )
                                }

                                {
                                    userCartList.length ?
                                        (
                                            <div className="cart-product__buttons">
                                                <BackToShopButton />
                                                <button className='cart-product__remove' onClick={emptyUserCartHandler}>
                                                    Remove all
                                                </button>
                                            </div>
                                        )
                                        : ('')
                                }


                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="user-cart__detail">
                                <div className="cart-coupon">
                                    <span className="cart-coupon__title">
                                        Have a coupon?
                                    </span>
                                    <form className="coupon" onSubmit={submitCouponHandler}>
                                        <input type="text" className="coupon-user" value={cartCoupon} onChange={e => setCartCoupon(e.target.value)} />
                                        <button type="submit" className="coupon-apply">apply</button>
                                    </form>
                                </div>
                                <div className="cart-buy">
                                    <div className="cart-buy__detail">
                                        <p className="cart-buy__detail-title">Subtotal:</p>
                                        <span className="cart-buy__detail-text cart-buy__detail-text--subtotal">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="cart-buy__detail">
                                        <p className="cart-buy__detail-title">Discount:</p>
                                        <span className="cart-buy__detail-text cart-buy__detail-text--discount">- ${(discount).toFixed(2)}</span>
                                    </div>
                                    <div className="cart-buy__detail cart-buy__detail--last">
                                        <p className="cart-buy__detail-title">Tax:</p>
                                        <span className="cart-buy__detail-text cart-buy__detail-text--Tax">+ ${productTax.toFixed(2)}</span>
                                    </div>
                                    <div className="cart-buy__total">
                                        <span className="cart-buy__total-text">Total</span>
                                        <span className="cart-buy__total-number">${(totalPrice + productTax - discount).toFixed(2)}</span>
                                    </div>
                                    <div className="checkout__button">
                                        <button
                                            className={`cart-buy__button ${isCheckoutActive && 'active'}`}
                                            onClick={checkoutHandler}
                                        >
                                            <AiOutlineShoppingCart className='cart-buy__button-icon' />
                                            <AiOutlineCheck className='cart-buy__button-icon--done' />
                                            <span className="cart-buy__button-text">Checkout</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services">
                <div className="container">
                    <div className="row">
                        <div className="col -12 col-sm-6 col-lg-3">
                            <div className="icon-box">
                                <div className="icon-box__wrapper">
                                    <BiLock />
                                </div>
                                <div className="icon-box__-text">
                                    <p className="icon-box__title">
                                        Secure payment
                                    </p>
                                    <span className="icon-box__desc">
                                        Have you ever finally just
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col -12 col-sm-6 col-lg-3">
                            <div className="icon-box">
                                <div className="icon-box__wrapper">
                                    <MdMessage />
                                </div>
                                <div className="icon-box__-text">
                                    <p className="icon-box__title">
                                        Customer support
                                    </p>
                                    <span className="icon-box__desc">
                                        Have you ever finally just
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col -12 col-sm-6 col-lg-3">
                            <div className="icon-box">
                                <div className="icon-box__wrapper">
                                    <FaTruckMoving />
                                </div>
                                <div className="icon-box__-text">
                                    <p className="icon-box__title">
                                        Free delivery
                                    </p>
                                    <span className="icon-box__desc">
                                        Have you ever finally just
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col -12 col-sm-6 col-lg-3">
                            <div className="icon-box">
                                <div className="icon-box__wrapper">
                                    <FaTruckMoving />
                                </div>
                                <div className="icon-box__-text">
                                    <p className="icon-box__title">
                                        Free delivery
                                    </p>
                                    <span className="icon-box__desc">
                                        Have you ever finally just
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="saves">
                <div className="container">
                    <h2 className="saves__title">
                        Save for later
                    </h2>
                    <div className="row">


                        {
                            userSavesList.length ?
                                (
                                    userSavesList.map(product => (
                                        <CategoryProductBox
                                            key={product.id}
                                            {...product}
                                            showType='grid-full'
                                            onMoveToCart={moveToCartHandler}
                                            onRemove={removeSaveProduct}
                                        />
                                    ))
                                )
                                : (
                                    <div className="empty-saves">
                                        <p className="empty-saves__title">
                                            You have not added a product to your list yet
                                        </p>
                                        <span className="empty-saves__guid">
                                            Any product that you touch the heart will be added to the list so that you can add it to your cart whenever you want
                                        </span>
                                        <span className="empty-saves__desc">
                                            Go to the store and add some products to your saves
                                        </span>
                                        <BackToShopButton />
                                    </div>
                                )
                        }

                    </div>
                </div>
            </section>
            <div className="container">
                <DiscountBanner />
            </div>
        </main>
    )
}
