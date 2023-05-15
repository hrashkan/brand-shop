import React, { useState, useEffect, useContext } from 'react'

import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import CategoryProductBox from '../../Components/CategoryProductBox/CategoryProductBox'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Pagination from '../../Components/Pagination/Pagination'
import Toast from '../../Components/Toast/Toast'
import apiRequest from '../../services/axios/config'

import { addToSaveListHandler } from '../../Func/Func'
import shopContext from '../../Context/contex'

import { useNavigate } from 'react-router-dom'

import { BsList } from "react-icons/bs"
import { MdViewModule } from "react-icons/md"
import { AiFillSetting } from "react-icons/ai"

import "./Category.css"

export default function Category() {

    const [allProducts, setAllProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [paginationProducts, setPaginationProduct] = useState([]);
    const [showType, setShowType] = useState("grid");
    const [isShowResponsiveSidebar, setIsShowResponsiveSidebar] = useState(false);
    const [rateCheckedBoxes, setRateCheckedBoxes] = useState([]);
    const [filterBaseSell, setFilterBaseSell] = useState('default');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);

    const { userSavesList, setUserSavesList, setToastShow, toastTitle, setToastTitle, toastMessage, setToastMessage, setIsDataError, setLoading } = useContext(shopContext)

    const navigate = useNavigate();


    useEffect(() => {
        getData();
    }, [])

    //filter 
    useEffect(() => {

        filterProductsHandler();
        navigate('/category/1');
        setLoading(false)

    }, [rateCheckedBoxes, filterBaseSell, minPrice, maxPrice, rateCheckedBoxes])


    //get product data
    const getData = async () => {
        try {
            const res = await apiRequest.get("/product-list.json");
            const productsArray = Object.values(res.data)
            const allData = Object.entries(productsArray[0]).map(item => item[1]).flat()
            setAllProducts(allData)
            setFilteredProduct(allData)
            const prices = allData.map(product => product.price);
            const lowestPrice = Math.min(...prices);
            const highestPrice = Math.max(...prices);
            setMinPrice(lowestPrice);
            setMaxPrice(highestPrice);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setIsDataError(true)
        }
    }

    //filtering

    //filter base on sell
    const sellFilterHandler = value => setFilterBaseSell(value);

    //filter in rate
    const rateFilterHandler = e => {
        const { value } = e.target
        if (rateCheckedBoxes.includes(Number(value))) {
            const newRateArray = [...rateCheckedBoxes].filter(item => item !== Number(value));
            setRateCheckedBoxes(newRateArray)
        } else {
            setRateCheckedBoxes([...rateCheckedBoxes, Number(value)])
        }
    }

    // filtering function 
    const filterProductsHandler = () => {
        let filterProductsArray = filterBaseSell === 'default' && allProducts || [...allProducts].sort((a, b) => b.soldNumber - a.soldNumber)

        filterProductsArray = rateCheckedBoxes.length ? [...filterProductsArray].filter(product => [...rateCheckedBoxes].includes(product.score)) : [...filterProductsArray]

        filterProductsArray = [...filterProductsArray].filter(product => product.price >= minPrice && product.price <= maxPrice)

       

        setFilteredProduct(filterProductsArray);
    }

    //filter on price
    const priceFilterHandler = value => {
        // console.log(value)
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    }

    //toggle responsive sidebar
    const toggleResponsiveSidebar = () => setIsShowResponsiveSidebar(prev => !prev);
    //close responsive sidebar button
    const closeResponsiveSidebar = () => setIsShowResponsiveSidebar(false)

    //add product to saveList
    const addProductToSaveList = (name, desc, price, src, score, id) => {
        const findProduct = userSavesList.some(product => product.id === id);

        if (!findProduct) {
            const newProduct = { name, desc, price, src, score, id }
            setUserSavesList(prev => [...prev, newProduct]);
            addToSaveListHandler(name, desc, price, src, score, id);
            setToastTitle('Success');
            setToastMessage('Product Successfully add to your save list');
            setToastShow(prev => [...prev, 0]);

        } else {
            setToastTitle('Notification');
            setToastMessage('You have already added this product to your save list');
            setToastShow(prev => [...prev, 0]);
        }

        setTimeout(() => {
            setToastShow(prev => prev.slice(1));
        }, 2500);
    }
    //remove product from save list
    const removeProductFromSaveList = id => {
        const updateUserSaveList = userSavesList.filter(product => product.id !== id);
        setUserSavesList(updateUserSaveList);

        let date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = 'userSaveList=' + JSON.stringify(updateUserSaveList) + '; expires=' + date.toUTCString() + '; path=/';
    }


    return (
        <main className="main">
            <div className="container">
                <Breadcrumb links={[
                    { id: 1, name: "Home" },
                    { id: 2, name: "shop" },
                ]}
                />
                <div className="row relative">
                    <div className={`col-12 col-md-3 responsive-sidebar ${isShowResponsiveSidebar && 'active'}`}>
                        <Sidebar
                            onClose={closeResponsiveSidebar}
                            onSellFilter={sellFilterHandler}
                            onRateFilter={rateFilterHandler}
                            onPriceFilter={priceFilterHandler}
                            maxPrice={maxPrice}
                            minPrice={minPrice}
                        />
                    </div>
                    <div className="col-12 col-md-9">
                        <section className="category">
                            <div className="detail-box">
                                <span className="detail-box__count">
                                    <b>{filteredProduct.length}</b> items in shop for you
                                </span>
                                <span className="detail-box__icons">
                                    <BsList className='detail-box__show-type' onClick={() => setShowType('list')} />
                                    <MdViewModule className='detail-box__show-type' onClick={() => setShowType('grid')} />
                                    <AiFillSetting
                                        className='responsive-sidebar__icon'
                                        onClick={toggleResponsiveSidebar}
                                    />
                                </span>
                            </div>
                            <div className="category-list">
                                <div className="row">

                                    {
                                        paginationProducts.length ?
                                            (
                                                paginationProducts.map(product => (
                                                    <CategoryProductBox
                                                        key={product.id}
                                                        {...product}
                                                        showType={showType}
                                                        onAddToSaveList={addProductToSaveList}
                                                        onRemoveFromSaveList={removeProductFromSaveList}
                                                    />
                                                ))
                                            )
                                            : (
                                                <span className='category-load-product__title'>wait for load product...</span>
                                            )
                                    }

                                </div>
                            </div>
                            <div className="category-pagination">
                                <Pagination
                                    item={filteredProduct}
                                    itemCount={9}
                                    pathname={`/category/`}
                                    setPaginationProduct={setPaginationProduct}
                                />
                            </div>
                        </section>
                    </div>
                </div>
                <Toast
                    title={toastTitle}
                    message={toastMessage}
                />
            </div>
        </main>
    )
}
