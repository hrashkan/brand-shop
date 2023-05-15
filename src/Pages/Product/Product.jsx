import React, { useEffect, useState, useContext } from 'react'

import apiRequest from '../../services/axios/config'

import AddToCartButton from '../../Components/AddToCartButton/AddToCartButton'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import ProductGallery from '../../Components/ProductGallery/ProductGallery'
import ProductShortDetail from '../../Components/ProductShortDetail/ProductShortDetail'
import ContentTabTitle from '../../Components/ContentTabTitle/ContentTabTitle'
import ContentTabDesc from '../../Components/ContentTabDesc/ContentTabDesc'
import OfferProduct from '../../Components/OfferProduct/OfferProduct'
import MainTitle from '../../Components/MainTitle/MainTitle'
import RelatedProduct from '../../Components/RelatedProduct/RelatedProduct'
import DiscountBanner from '../../Components/DiscountBanner/DiscountBanner'
import Toast from '../../Components/Toast/Toast'

import shopContext from '../../Context/contex'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { zoomMouseMove, zoomMouseLeave, addToSaveListHandler, addToCartHandler, saveCookie } from "../../Func/Func"

import { AiOutlineCheck, AiFillStar, AiOutlineStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BsFillFlagFill } from "react-icons/bs"
import { MdOutlineVerifiedUser, MdOutlineShoppingBasket, MdError } from "react-icons/md"
import { TbWorld } from "react-icons/tb"
import { BiCommentDetail } from "react-icons/bi"

import { Swiper, SwiperSlide } from 'swiper/react'


import "swiper/css"
import "./Product.css"

export default function Product() {

    //todo 
    const tabTitle = [
        { id: 1, title: "Description" },
        { id: 2, title: "Reviews" },
        { id: 3, title: "Shipping" },
        { id: 4, title: "About company" }
    ]

    const { userSavesList, setUserSavesList, toastTitle, toastMessage, setLoading, setIsDataError } = useContext(shopContext);

    const [productInfo, setProductInfo] = useState({});
    const [productImgGallery, setProductImgGallery] = useState([]);
    const [offersProducts, setOffersProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [productShortDesc, setProductShortDesc] = useState([]);
    const [mainImgSrc, setMainImgSrc] = useState(null);
    const [contentTable, setContentTable] = useState("description");
    const [isTabExpand, setIsTabExpand] = useState(false);

    const [productSaveList, setProductSaveList] = useState([]);



    const { productID } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        setProductSaveList(userSavesList);
        getData();

    }, [productID, userSavesList])



    const getData = async () => {

        try {
            const res = await apiRequest.get("/product-list.json");
            const productsArray = Object.values(res.data)
            const allProducts = Object.entries(productsArray[0]).map(item => item[1]).flat();
            const mainProduct = allProducts.find(product => product.id === Number(productID));
            if (mainProduct) {
                setProductInfo(mainProduct);
                setMainImgSrc(mainProduct.src)
                setProductImgGallery(mainProduct.gallery);
                setOffersProducts(mainProduct.offer);
                setRelatedProducts(mainProduct.related);
                setProductShortDesc(mainProduct.shortDesc);
            } else {
                navigate('/404')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setIsDataError(true)
        }



    }


    //change image gallery
    const changeImageHandler = newSrc => setMainImgSrc(newSrc)

    //change tab contentTab
    const changeActiveTab = title => setContentTable(title.toLowerCase())

    //show more && less content on tabs
    const showToggleContent = () => setIsTabExpand(prev => !prev)

    //add to save list
    const addToSaveLis = (name, desc, price, src, score, id) => {
        addToSaveListHandler(name, desc, price, src, score, id);
        setUserSavesList(prev => [...prev, { name, desc, price, src, score, id }]);
    }

    //remove product from save list
    const removeFromSaveList = (productID) => {
        const updateUserSaveList = userSavesList.filter(product => product.id !== Number(productID));
        setUserSavesList(updateUserSaveList);

       
        saveCookie('userSaveList', updateUserSaveList, 30);
    }


    return (
        <>

            <main className="main">
                <div className="container">
                    <Breadcrumb links={[
                        { id: 1, name: "Home" },
                        { id: 2, name: "shop" },
                        { id: 3, name: `${productInfo.name ? productInfo.name : ''}` }
                    ]}

                        sec
                    />

                    <section className="product">
                        <div className="row">
                            <div className="col-12 col-lg-5 order-md-1">
                                <div className="product-images">
                                    <div className="product-images__main">
                                        <img
                                            src={mainImgSrc ? mainImgSrc : '/images/product/load.png'}
                                            alt="product"
                                            className="product-images__main-cover"
                                            onMouseMove={zoomMouseMove}
                                            onMouseLeave={zoomMouseLeave}
                                        />
                                    </div>
                                    <div className="product-images__gallery">
                                        <ul className="product__gallery">

                                            {
                                                productImgGallery.map(img => (
                                                    <ProductGallery key={img.id} {...img} onChoose={changeImageHandler} />
                                                ))
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 order-md-3">
                                <div className="product-detail">
                                    <div className="product__stock">
                                        {
                                            productInfo.inStock ?
                                                (
                                                    <>
                                                        <AiOutlineCheck className='product-score__success' />
                                                        <span className="product__stock-text">In stock</span>
                                                    </>
                                                )
                                                : productInfo.inStock === false ? (
                                                    <>
                                                        <MdError className='product-score__error' />
                                                        <span className="product__stock-text product__stock-text-error">out of stock</span>
                                                    </>
                                                )
                                                    : ('')
                                        }


                                    </div>
                                    <h1 className="product__title">
                                        {productInfo.name}
                                    </h1>
                                    <div className="product__review">
                                        <div className="product__review-score">
                                            {
                                                Array.from({ length: productInfo.score }).fill(0).map((star, index) => (
                                                    <AiFillStar key={index} />
                                                ))
                                            }
                                            {
                                                Array.from({ length: 5 - productInfo.score }).fill(0).map((star, index) => (
                                                    <AiOutlineStar key={index} />
                                                ))
                                            }

                                        </div>
                                        <div className="product__review-review">
                                            <BiCommentDetail />
                                            <span className="product__review-title">{productInfo.reviewNumber} reviews</span>
                                        </div>
                                        <div className="product__review-sold">
                                            <MdOutlineShoppingBasket />
                                            <span className="product__review-title">{productInfo.soldNumber} sold</span>
                                        </div>
                                    </div>
                                    <div className="product-price">
                                        <div className="product-price-1">
                                            <span className="product-price-title">${productInfo.price}</span>
                                            <span className="product-price-pcs">1 - 3 pcs</span>
                                        </div>
                                        <div className="product__price-2">
                                            <span className="product-price-title">${productInfo.price}</span>
                                            <span className="product-price-pcs">1 - 3 pcs</span>
                                        </div>
                                        <div className="product__price-3">
                                            <span className="product-price-title">${productInfo.price}</span>
                                            <span className="product-price-pcs">1 - 3 pcs</span>
                                        </div>
                                    </div>
                                    {
                                        productShortDesc.length ?
                                            (
                                                productShortDesc.map(item => (
                                                    <ProductShortDetail key={item.id} {...item} />
                                                ))
                                            )
                                            : ('')
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 order-md-2">
                                <div className="product-cart">
                                    <div className="cart-container__head">
                                        <div className="cart__supplier-icon">
                                            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.00852269 21V0.636363H7.64489C9.20928 0.636363 10.5218 0.908143 11.5824 1.4517C12.6496 1.99526 13.455 2.75757 13.9986 3.73864C14.5488 4.71307 14.8239 5.84991 14.8239 7.14915C14.8239 8.45502 14.5455 9.58854 13.9886 10.5497C13.4384 11.5043 12.6264 12.2434 11.5526 12.767C10.4787 13.2841 9.15956 13.5426 7.59517 13.5426H2.15625V10.4801H7.09801C8.01278 10.4801 8.76184 10.3542 9.34517 10.1023C9.9285 9.84375 10.3594 9.46922 10.6378 8.97869C10.9228 8.48153 11.0653 7.87168 11.0653 7.14915C11.0653 6.42661 10.9228 5.81013 10.6378 5.29972C10.3527 4.78267 9.91856 4.39157 9.33523 4.12642C8.75189 3.85464 7.99953 3.71875 7.07812 3.71875H3.69744V21H0.00852269ZM10.5284 11.7727L15.5696 21H11.4531L6.50142 11.7727H10.5284Z" fill="#4CA7A7" fillOpacity="0.6" />
                                            </svg>

                                        </div>
                                        <div className="cart__supplier-title">
                                            <span className="cart__supplier-title-txt">Supplier</span>
                                            Guanjoi Trading LLC
                                        </div>
                                    </div>
                                    <div className="cart-container__body">
                                        <div className="cart__info">
                                            <div className="cart__info-icon">
                                                <BsFillFlagFill />
                                            </div>
                                            <span className="cart__info-title">{productInfo.supplierCountry}</span>
                                        </div>
                                        <div className="cart__info">
                                            <div className="cart__info-icon">
                                                <MdOutlineVerifiedUser />
                                            </div>
                                            <span className="cart__info-title">
                                                Verified Seller
                                            </span>
                                        </div>
                                        <div className="cart__info">
                                            <div className="cart__info-icon">
                                                <TbWorld />
                                            </div>
                                            <span className="cart__info-title">
                                                Worldwide shipping
                                            </span>
                                        </div>


                                        <AddToCartButton
                                            onAddToCart={(detail) => addToCartHandler(detail)}
                                            productDetail={{
                                                name: productInfo.name,
                                                desc: productInfo.desc,
                                                score: productInfo.score,
                                                src: productInfo.src,
                                                id: productInfo.id,
                                                discount: productInfo.discount,
                                                price: productInfo.price,
                                                count: 1
                                            }}
                                            animationBtn={true}
                                        />

                                        <div className="seller-profile">
                                            <Link to="https://reac.dev" className='seller-profile__button cart__button'>Seller`s profile</Link>
                                        </div>
                                    </div>
                                </div>

                                {
                                    productSaveList.some(product => product.id === Number(productID)) ?
                                        (
                                            <div className="add-wishlist remove">
                                                <AiFillHeart
                                                />
                                                <span
                                                    className="add-wishlist__text"
                                                    onClick={() => removeFromSaveList(productID)}
                                                >Remove from saves</span>

                                            </div>
                                        )
                                        : (
                                            <div className="add-wishlist add">
                                                <AiOutlineHeart
                                                />
                                                <span
                                                    className="add-wishlist__text add"
                                                    onClick={() => addToSaveLis(productInfo.name, productInfo.desc, productInfo.price, productInfo.src, productInfo.score, productInfo.id)}

                                                >Add To saves</span>
                                            </div>
                                        )
                                }


                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="row">
                            <div className="col-12 col-lg-9">
                                <div className={`content__tabs ${isTabExpand ? 'show-more' : ''}`}>
                                    <div className="content-tab__title">
                                        {
                                            tabTitle.map(title => (

                                                <ContentTabTitle key={title.id} {...title} onChangeTab={changeActiveTab} contentTable={contentTable} />
                                            ))
                                        }
                                    </div>
                                    <div className="content-tab__desc">
                                        <ContentTabDesc activeTab={contentTable} />
                                    </div>
                                    <div className={`show__button ${isTabExpand ? 'more' : ''}`}>
                                        <button className="show-more-less" onClick={showToggleContent}>
                                            {
                                                isTabExpand ? 'show less' : 'show more'
                                            }
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-lg-3">
                                <aside className='offer'>
                                    <h3 className="offer__title">You may like</h3>
                                    <div className="offer__products">
                                        {
                                            offersProducts.length ?
                                                (
                                                    offersProducts.map(product => (
                                                        <OfferProduct key={product.id} {...product} />
                                                    ))
                                                )
                                                : ('')
                                        }
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </section>

                    <section className="related">
                        <MainTitle title="Related products" />
                        <div className="related__product">
                            <Swiper
                                slidesPerView={1.5}
                                spaceBetween={40}
                                breakpoints={{
                                    480: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 0
                                    },
                                    640: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 20

                                    },
                                    768: {
                                        slidesPerView: 4.5,
                                        spaceBetween: 20

                                    },
                                    1024: {
                                        slidesPerView: 6,
                                        spaceBetween: 20

                                    },
                                }}
                                className="mySwiper"
                            >

                                {
                                    relatedProducts.length ?
                                        (
                                            relatedProducts.map(product => (
                                                <SwiperSlide key={product.id}>
                                                    <RelatedProduct {...product} />
                                                </SwiperSlide>
                                            ))
                                        )
                                        : ('')
                                }
                            </Swiper>
                        </div>
                    </section>

                    <DiscountBanner />

                </div>
                <Toast
                    title={toastTitle}
                    message={toastMessage}
                />
            </main>
        </>
    )
}
