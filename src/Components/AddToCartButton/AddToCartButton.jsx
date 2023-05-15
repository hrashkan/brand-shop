import React, { useContext } from 'react'

import shopContext from '../../Context/contex'

import "./AddToCartButton.css"

export default function AddToCartButton({ onAddToCart, productDetail, animationBtn }) {

    const { userCartList, setUserCartList, setToastShow, setToastTitle, setToastMessage } = useContext(shopContext);




    const addToCartBtnHandler = () => {


        const findProduct = userCartList.some(product => product.id === productDetail.id)
        if (findProduct) {
            setToastTitle('Notification')
            setToastMessage('You have already added this product to your cart');
            setToastShow(prev => [...prev, 0]);
            setTimeout(() => {
                setToastShow(prev => prev.slice(1));
            }, 2500);
        } else {
            setToastTitle('Success')
            setToastMessage('Product add to your cart successfully');
            onAddToCart(productDetail);
            setUserCartList(prev => [...prev, productDetail]);
            setToastShow(prev => [...prev, 0]);
            setTimeout(() => {
                setToastShow(prev => prev.slice(1));
            }, 2500);
        }


    }

    return (
        <button onClick={addToCartBtnHandler} className={`add-to-cart ${animationBtn && 'main-btn__animation'}`}>
            Add To Cart
        </button>

    )
}
