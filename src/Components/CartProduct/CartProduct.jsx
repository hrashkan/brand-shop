import React, { useState, useContext } from 'react'

import shopContext from '../../Context/contex'

import { saveCookie } from '../../Func/Func'

import { Link } from 'react-router-dom'

import "./CartProduct.css"

export default function CartProduct({ name, desc, price, src, score, id, count, onRemove, onMoveToSaves, onCountUpdated }) {

  const { userCartList, setUserCartList } = useContext(shopContext)

  const [productCount, setProductCount] = useState(count);

  //change count product
  const changeProductCountHandler = e => {


    // setUserCartProducts(userCartList)

    let productIndex = userCartList.findIndex(product => product.id === id);

    let updateProductCount = userCartList[productIndex]

    updateProductCount ? updateProductCount.count = e.target.value : updateProductCount.count = 0

    userCartList[productIndex] = updateProductCount;

    setUserCartList(userCartList)

    saveCookie('userCartProducts', userCartList, 30)
    // change value of input
    setProductCount(e.target.value < 0 ? 0 : e.target.value);
    onCountUpdated()

  }





  return (
    <div className="cart-product">
      <Link to={`/product/${id}`} className="cart-product__cover">
        <img src={src} alt={name} className="cart-product__cover-img" />
      </Link>
      <div className="cart-product__detail">
        <Link to={`/product/${id}`} className="cart-product__cover">
          <h3 className="cart-product__title">
            {name}
          </h3>
        </Link>
        <span className="cart-product__desc">
          price: {price}
        </span>
        <span className="cart-product__desc">
          {desc}
        </span>
        <div className="cart-product__button">
          <button className="remove-button" onClick={() => onRemove(id)}>Remove</button>
          <button className="save-button" onClick={() => onMoveToSaves(name, desc, price, src, score, id)}>Save For Later</button>
        </div>
      </div>
      <div className="cart-product__price">
        <bdi className="cart-product__price-number">${price * productCount}</bdi>
        <form className="cart-product-price__from">
          <label className="cart-product__price-desc">count</label>
          <input type="number" className="cart-product__number" value={productCount} onChange={changeProductCountHandler} />
        </form>
      </div>
    </div>
  )
}
