import React, { useState, useEffect, useContext } from 'react'

import CategoriesMenuItem from '../../Components/CategoriesMenuItem/CategoriesMenuItem'
import MainTitle from '../../Components/MainTitle/MainTitle'
import Timer from '../../Components/Timer/Timer'
import OfferProductBox from '../../Components/OfferProductBox/OfferProductBox'
import GridProductBox from '../../Components/GridProductBox/GridProductBox'
import RecommendedProductBox from '../../Components/RecommendedProductBox/RecommendedProductBox'
import ServicesBox from '../../Components/ServicesBox/ServicesBox'
import Toast from '../../Components/Toast/Toast'

import apiRequest from '../../services/axios/config'

import shopContext from '../../Context/contex'

import { Link } from 'react-router-dom'

import { FaUser } from "react-icons/fa"

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./Index.css"


export default function Index() {

    const [categories, setCategories] = useState([]);
    const [offerProduct, setOfferProduct] = useState([]);
    const [homeProduct, setHomeProduct] = useState([]);
    const [outdoorProduct, setOutdoorProduct] = useState([]);
    const [gadgetsProduct, setGadgetsProduct] = useState([]);
    const [electronicProduct, setElectronicProduct] = useState([]);
    const [recommendedProduct, setRecommendedProduct] = useState([]);
    const [services, setServices] = useState([]);
    const [isShowFormMessage, setIsShowFormMessage] = useState(false);

    const { setIsDataError, setLoading } = useContext(shopContext)

    useEffect(() => {
        getCategoriesHandler();
        getProduct();
        getServices();
    }, [])


    //get category list
    const getCategoriesHandler = async () => {
        try {
            const res = await apiRequest("/categories.json");
            res.status !== 200 && console.log('categories list get error');
            const arrayData = Object.values(res.data);
            const categories = arrayData[0];
            setCategories(categories);
        } catch (error) {
            console.log(error)
        }
    }

    //get product
    const getProduct = async () => {
        try {
            const res = await apiRequest.get("/product-list.json");
            const productListArray = Object.values(res.data);
            setOfferProduct(productListArray[0].offers);
            setHomeProduct(productListArray[0].home);
            setOutdoorProduct(productListArray[0].outdoor);
            setGadgetsProduct(productListArray[0].gadgets);
            setElectronicProduct(productListArray[0].electronic);
            setRecommendedProduct(productListArray[0].recommended);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setIsDataError(true);
            setLoading(false);
        }
    }

    //get services
    const getServices = async () => {
       try {
        const res = await apiRequest.get("/services.json")
        const servicesArray = Object.values(res.data)[0]
        setServices(servicesArray);
       } catch (error) {
        console.log(error)
       }
    }

    //submit from handler
    const submitSupplierFrom = e => {
        e.preventDefault();
        setIsShowFormMessage(true);
        setTimeout(() => {
            setIsShowFormMessage(false);
        }, 2000);
    }

    return (

        <main className="main">
            <div className="container">
                <section className="categories">
                    <div className="row">
                        <div className="col-md-4 col-lg-3 overflow-auto">
                            <ul className="categories__list">
                                {
                                    categories.length ?
                                        (
                                            categories.map(category => (
                                                <CategoriesMenuItem key={category.id} {...category} />
                                            ))
                                        )
                                        : ('')
                                }
                            </ul>
                        </div>
                        <div className="col-md-8 col-lg-6">
                            <Link to="https://react.dev" className='categories-link'>
                                <img src="/images/index/banner.png" alt="banner" className="categories__banner" />
                            </Link>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="boxes">
                                <div className="user-box">
                                    <div className="user-box__header">
                                        <FaUser />
                                        <span className="user-box__header-text">
                                            Hi, user let’s get stated
                                        </span>
                                    </div>
                                    <Link className='user-box__button user-box__join main-btn__animation'>
                                        Join now
                                    </Link>
                                    <Link className='user-box__button user-box__login secondary-btn__animation'>
                                        Log in
                                    </Link>
                                </div>
                                <div className="discount-box">
                                    <p className="discount-box__desc">
                                        Get US $10 off with a new supplier
                                    </p>
                                </div>
                                <div className="prices-box">
                                    <p className="prices-box__desc">
                                        Send quotes with supplier preferences
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="offers">
                    <div className="row no-pad">
                        <div className="col-12 col-lg-3">
                            <div className="offer__clock">
                                <div className="offer__time">
                                    <div className="offer-time__title">
                                        <MainTitle title="Deals and offers" subtitle="Hygiene equipments" />
                                    </div>
                                    <Timer targetDate="2023-08-01T00:00:00Z" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9">
                            <div className="offer-product">
                                <Swiper
                                    slidesPerView={1.5}
                                    spaceBetween={0}
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0
                                        },
                                        640: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        768: {
                                            slidesPerView: 3.5,
                                            spaceBetween: 0

                                        },
                                        1024: {
                                            slidesPerView: 4.5,
                                            spaceBetween: 0

                                        },
                                        1200: {
                                            slidesPerView: 5,
                                            spaceBetween: 0

                                        },
                                    }}
                                    className="mySwiper"
                                >


                                    {
                                        offerProduct.length ?
                                            (
                                                offerProduct.map(product => (
                                                    <SwiperSlide key={product.id}>
                                                        <OfferProductBox {...product} />
                                                    </SwiperSlide>
                                                ))
                                            )
                                            : ("")
                                    }

                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-product">
                    <div className="row no-pad">
                        <div className="col-12 col-md-3">
                            <div className="home-cover">
                                <MainTitle title="Home and Outdoor" />
                                <img src="images/home&outdoor.png" alt="" className="home-cover__img" />
                            </div>
                        </div>
                        <div className="col-12 col-md-9">
                            <div className="home-outdoor__product">
                                <Swiper
                                    slidesPerView={1.5}
                                    spaceBetween={0}
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0
                                        },
                                        640: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        768: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 0

                                        },
                                    }}
                                    className="mySwiper"
                                >

                                    {
                                        homeProduct.length ?
                                            (
                                                homeProduct.map(product => (
                                                    <SwiperSlide key={product.id}>
                                                        <GridProductBox {...product} />
                                                    </SwiperSlide>
                                                ))
                                            )
                                            : ("")
                                    }
                                </Swiper>
                                <Swiper
                                    slidesPerView={1.5}
                                    spaceBetween={0}
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0
                                        },
                                        640: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        768: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 0

                                        },
                                    }}
                                    className="mySwiper"
                                >

                                    {
                                        outdoorProduct.length ?
                                            (
                                                outdoorProduct.map(product => (
                                                    <SwiperSlide key={product.id}>
                                                        <GridProductBox {...product} />
                                                    </SwiperSlide>
                                                ))
                                            )
                                            : ("")
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="electronics-product">
                    <div className="row no-pad">
                        <div className="col-12 col-md-3">
                            <div className="electronics-cover">
                                <MainTitle title="Consumer electronics and gadgets" />
                                <img src="images/electronics.png" alt="" className="electronics-cover__img" />
                            </div>
                        </div>
                        <div className="col-12 col-md-9">
                            <div className="electronics-outdoor__product">
                                <Swiper
                                    slidesPerView={1.5}
                                    spaceBetween={0}
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0
                                        },
                                        640: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        768: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 0

                                        },
                                    }}
                                    className="mySwiper"
                                >
                                    {
                                        gadgetsProduct.length ?
                                            (
                                                gadgetsProduct.map(product => (
                                                    <SwiperSlide key={product.id}>
                                                        <GridProductBox {...product} />
                                                    </SwiperSlide>
                                                ))
                                            )
                                            : ("")
                                    }
                                </Swiper>
                                <Swiper
                                    slidesPerView={1.5}
                                    spaceBetween={0}
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0
                                        },
                                        640: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        768: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 0

                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 0

                                        },
                                    }}
                                    className="mySwiper"
                                >
                                    {
                                        electronicProduct.length ?
                                            (
                                                electronicProduct.map(product => (
                                                    <SwiperSlide key={product.id}>
                                                        <GridProductBox {...product} />
                                                    </SwiperSlide>
                                                ))
                                            )
                                            : ("")
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-form">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h2 className="home-form__title">
                                An easy way to send requests to all suppliers
                            </h2>
                            <p className="home-form__desc">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 relative">

                            <form className={`suppliers-form ${isShowFormMessage && 'hide'}`} onSubmit={submitSupplierFrom}>
                                <p className="suppliers-form__title">
                                    Send quote to suppliers
                                </p>
                                <span className="suppliers-form__subtitle">
                                    What item you need?
                                </span>
                                <textarea className='suppliers-form__message' cols="30" rows="10"></textarea>
                                <div className="suppliers-form__number">
                                    <span className="suppliers-form__number-title">Quantity</span>
                                    <input type="number" className="suppliers-form__number-quantities" min="0" max="99" placeholder="max 99" />
                                </div>
                                <button type="submit" className="suppliers-form__submit main-btn__animation">Send inquiry</button>
                            </form>

                            <div className={`supplier-form__message ${isShowFormMessage && 'active'}`}>
                                <p className="supplier-form__message-text">
                                    thank you for your quote
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="recommended">
                    <MainTitle title="Recommended items" />
                    <div className="recommended__product-list">

                        {
                            recommendedProduct.length ?
                                (
                                    recommendedProduct.map(product => (
                                        <RecommendedProductBox key={product.id} {...product} />
                                    ))
                                )
                                : ("")
                        }

                    </div>
                </section>

                <section className="services">
                    <MainTitle title="Our extra services" />
                    <div className="row">

                        {
                            services.length ?
                                (
                                    services.map(service => (
                                        <ServicesBox key={service.id} {...service} />
                                    ))
                                )
                                : ("")
                        }
                    </div>
                </section>

                <section className="region">
                    <MainTitle title="Suppliers by region" />
                    <div className="region__countries">
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_438_569" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_438_569" width="56" height="40" xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>



                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >Argentina</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_438_569" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_438_569" width="56" height="40" xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>



                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >Australia</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_533" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_533" width="56" height="40" xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >United States</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_545" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_545" width="56" height="40" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAAHcVwkTAAAABGdBTUEAALGPC/xhBQAAAVJJREFUaAXtWMENwjAMTNq8KrZAjMCLAViEMZBYgG14sAEjMABSf3zbV6FQxBNf22swEXKecc8+n20lqa+qqnXCCt1+URQfzX62PorI7CPkvenL1VJEekTIt88luf4mIUkEiUu3DzVAQJgIBCJhEZCniqqFIsJKIiBNlQbS5aAj0kA4WYmp2nUOM1YoDWSjRUVOkU09IN2oKAtkU89QPWDYzi8uz3KkQlQbPcEsC3VJ1QPCGwUrG8LRZxtyKtnquuZvGpLTvn31GlrAvpKMtttpMVqyPoB1aZ9Co+1htyhHg1jA7X5zdgCz6ok4GwtRGtbwutNovp5YogzuJ1cahugUjPpQTCHLYC1BRrWUMH9fwbDZn10Ir9/cKQkfhUvTNC4cTtcozlJ18vctagmm2npDeVkFhyqV6nfqT0JtIaxFtRWPHc8qGFtRbX9WQW3FY8d7AFtoV4PnbTrcAAAAAElFTkSuQmCC" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >Iran</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_575" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_575" width="56" height="40" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAAHcVwkTAAAABGdBTUEAALGPC/xhBQAAAX9JREFUaAXtWTuSwjAMTXYYilR7it2ag0DNEam5CDWn2G2SggYQwzO7ShRN5KAwQW7kyPo+ybED5c/X+lxcx/KwK06rLU3T+MCsqipMH7Su67M0Spj9PO6L3+/NQ+s6S2b/ce8PSXNwQCUF02WSeMmsPSCYJgs0eFpYB+1NE0JdtCRkOyHvkv7DS0mC9/xQUWd4pKrR4K2EddAFJqDI9wSGQM2omhV7+0qI8sa2e+SoPr2O5lDNiq1e5UgiZ/C17QY5iZojlQxq/Pk7NL+oNOikdXdIo0ulUpj5r1dDnFlISTu7ICfR1tnGBXHWga+deZCTqDuk4VAqhZk/f0jN9ygLpk3T9H9nWIxqOm9QQ34z5ZDErY0joj3Pv2kiQ60HBq+r91LNIt+nXD73a4vbG/rs3jNDA8yVjwRzEZxaPyo4dQVy/UcFcxGcWt/9FyjPhCf5hvFMkHzFHvRGfGx/cRcdG1Fve7EHvREf219UcGxEve3NvoLqvyIa4nQdeuVxAZEhipXIf6XpAAAAAElFTkSuQmCC" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title">Denmark</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_537" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_537" width="56" height="40" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAAHcVwkTAAAABGdBTUEAALGPC/xhBQAAAYRJREFUaAXtWb1qwzAQVoonT4UOeYRMGbt0yhDo0qGBzH2WLO1S6NQlUx+kS+mQIe/RuVMMAYEbCZ+Q7Et9iY6DmNNyv7o7fZ8TK2R0fftZm2b9fN15rV48eVlAwMmyLL25a5xXjUTF+cERDATDuPqdgWAYF5QayPWC9budgxrk7n4ZdKf8i0GS2TIuaGNgC47wMLsx69UETC+BvdiZPFouUBRFeMQgEZgF28kLAkdHjYlr6Z0npxX35uN8bD5eplgo8bU/ekmwMc5mAytG8WlDCkon5SikJ8FFSR4+pKRvmvi2cQy2+vXdmM32WDj4O++2EImU+AYTuRN1f3gn2sSDG8PnUE+IM5/hVUgzwMO3KqQ4LhlehTQDPHyrQorjkuEVh5R0p6EciPoLi1Jr//xm7PeGktqbI45o70TMCXpAZkDFyymD4pAzN1QGmQEVL6cMikPO3FAZZAZUvJwyKA45c0NlkBlQ8XLKoDjkzA0HzyDpXxEKqNZaU1UVJbU3pz7U4lp/5Pc6m0JKJ8YAAAAASUVORK5CYII=" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >France</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_541" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_541" width="56" height="40" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAAHcVwkTAAAABGdBTUEAALGPC/xhBQAAAWtJREFUaAXtWUsOgkAMBeMNPARx6wFMPIExXsed9/AcHMDDuHFnSFgY1EUJzFDblFImpGw6v7Zv3iszGPNmt2+y77M5vX+m96x6vaCzhv7zcodma3meRVG0HtDIkwUECIeYgrmu/ctBd2HYbpmFiSGGYa5rI8chgrsO0BZDbdWCSJOTI4YqdoxY5cohzih2jKBOXgBiqFHlQAWB5VYSrKesGCkVGJs3TxipHyLjFm7oh/XNd2iekKS0LEuMHdE4+VoUr4coMOZkTql5QpJSP2mw4sDGzTX0hJgU4nHyaNO8LaqqylxDsVaY4/IpJatU8wKu6zojbwu/gLFqxMaXX6XmOySrFNMCxrW/eSCuljVnVAs4N45vkMtUqutcwVSV4eIiPy6oQLfzlVoy2/zvY2b0Bo/bw2wboBLP8puCAqU974eMNqPW8VxBa8a1840+Rbn/wmgD58bzEuUyleo6VzBVZbi4XEEuU6mu+wCxDkWlMps/NgAAAABJRU5ErkJggg==" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >Arabic Emirates</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_530" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_530" width="56" height="40" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAAHcVwkTAAAABGdBTUEAALGPC/xhBQAABFRJREFUaAXtWU2IHEUU/rq7Zrp7pmeIWbO7ZFlDko0QSPwhMf4ED94ET6JeEhA0UcxBzEEJ0ZMH8SKIEaJEDxLBk+BZQTwpHhQVBQ/RVcGQNT+andmdmd3p6fZVz3Znaruru2amtwlh6zDd9d773nv16lVXvRpt8dCsD0nTJfSAHDFrH83F5LSR1WYjK6dnYvY4IXDI2GUGTPPJCUEoW60gPtCRIq3jk+h8eHlAVHyNgM7bO6BPlQNu48gFUSqhFwETeKmkaEpSpRKYIwPzdbX+yZ4E50SS4GrpkXrAVYkqC/WEVthdVbTfuQRjXwW9X1ohO/YULHIuB/FWfTU5EQMm/eQbHHbACRVLnzFXuaT7/ZIUEDISgSEz7TkycOTgpHmTxpN6qjkiy5izUH1rR5ouJZ6gVZ8uQZ8pQ7+jjNq53ah9PAd9lvpE8673sPzyX4CpgSenNhHlqpKhUEgw6C104V1chfXsZMDXDA2MMp3T/KvdPmbFB186/jU31DHUUzAYIMmI+0MrUMoVG/srgkJjr43KazPQ6oZAV+2oJ03VQP2DXWie/BP+5bXRqloZkFM3OAAa5zUe0nG0KWBvfYM38RzScsmjKc+h+cTW/qdtTMNSg/Yr24UB+Ys9+M0e0JMeMgV5WUdqsHRvVcCsfn4drdf/DmjsgewdUwAPdG58gZkGfVsJoC8WO9hXaNxpw295tLV64N9Z3px3d0K7jaH57YUBNeqvQpbqOy04b8zG0I1jv9PxgwxT4yfclU+vxWRUCYLBEBSejXhf5VAV4lSesTlk9/fD2f2m2ceXxeVgn5oJ9kMV5UkyN+ZwjWs9M4nGUZofSsbO+SvB3th5/58Iq5ED4+RpYkgj7ete2OEa3K/XRr6Op9qNjVAGdN6j7HQMNIsyuPrFIlY/+1fmjzJ9qJAqa00RjGVpimwurE2DuYRxUMmtH9LCl8VgeIt435ApZAerMI9uK8L/TBsjDZBXkbLGayv7xWmYj20Jqsv1tZcMt1H0oVOUX+bwanXpxDz8pf4hJ8k5Xq+z+xx0v2oksQujDTVArWbAOUubMK+Qf26h9ebFTEfZ3RWww3U6fjIYuy00n/4tE5OngHSA5Ue3wDxyOzQ6G6s2j6rw1plL8OZXBIh1Ygrlh+vwux7dVC2jfWZB4G9kRzrAyGhFh31sCqUHkysJ7nTn/FV0v1yMIDfTS/ZHhqqY9rmFIPpJjrs/tTMHZz41EVxr8eurUa+ukmyr0JQOwPbxKWglHe6vbbTP0mDpuouvLeuFaZRoS+hSWed+J7kkpQxnhxyYj28N/Gk8TxVYgS0zRYMtwTbg/dGRusUeolIjLLKkUvQPCl1I+v+5qV/fFPhIrMwBDquV3VMFO1CllDRhbC+h+dz8sCpylc9eg0Oac39cpv8WKC33WDRlGuyXpofUkK947jOYr3vja8t9Bsd3KV8NmwPMN57Fa9ucweJjnq/FzRnMN57Fa/sfhCUdA9q3qTIAAAAASUVORK5CYII=" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >China</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_553" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_553" width="56" height="40" xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >Great Britain</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="region__country">
                            <div className="country__box">
                                <div className="country__box-flag">
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="28" height="20" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_427_537" transform="scale(0.0178571 0.025)" />
                                            </pattern>
                                            <image id="image0_427_537" width="56" height="40" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAAHcVwkTAAAABGdBTUEAALGPC/xhBQAAAYRJREFUaAXtWb1qwzAQVoonT4UOeYRMGbt0yhDo0qGBzH2WLO1S6NQlUx+kS+mQIe/RuVMMAYEbCZ+Q7Et9iY6DmNNyv7o7fZ8TK2R0fftZm2b9fN15rV48eVlAwMmyLL25a5xXjUTF+cERDATDuPqdgWAYF5QayPWC9budgxrk7n4ZdKf8i0GS2TIuaGNgC47wMLsx69UETC+BvdiZPFouUBRFeMQgEZgF28kLAkdHjYlr6Z0npxX35uN8bD5eplgo8bU/ekmwMc5mAytG8WlDCkon5SikJ8FFSR4+pKRvmvi2cQy2+vXdmM32WDj4O++2EImU+AYTuRN1f3gn2sSDG8PnUE+IM5/hVUgzwMO3KqQ4LhlehTQDPHyrQorjkuEVh5R0p6EciPoLi1Jr//xm7PeGktqbI45o70TMCXpAZkDFyymD4pAzN1QGmQEVL6cMikPO3FAZZAZUvJwyKA45c0NlkBlQ8XLKoDjkzA0HzyDpXxEKqNZaU1UVJbU3pz7U4lp/5Pc6m0JKJ8YAAAAASUVORK5CYII=" />
                                        </defs>
                                    </svg>


                                </div>
                                <div className="country__box__content">
                                    <p className="country__box-title" >Argentina</p>
                                    <span className="country__box-subtitle">shopname.ae</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Toast
                    title='Success'
                    message='Product add to cart successfully'
                />

            </div >
        </main >

    )
}
