import React, { useEffect, useState, useContext } from 'react'

import SearchBox from '../SearchBox/SearchBox'
import HeaderIcon from '../HeaderIcon/HeaderIcon'
import Nav from '../Nav/Nav'

import apiRequest from '../../services/axios/config'

import { Link } from 'react-router-dom'

import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa"
import { MdMessage } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io"

import "./Header.css"
import shopContext from '../../Context/contex'

export default function Header() {



    const [units, setUnits] = useState([])
    const [filterUnits, setFilterUnits] = useState([]);
    const [activeUnits, setActiveUnits] = useState(false);
    const [mainUnits, setMainUnits] = useState("U.S Dollar");
    const [searchUnitsValue, setSearchUnitsValue] = useState("");
    const [responsiveToggle, setResponsiveToggle] = useState(false);
    const { userCartList, userSavesList } = useContext(shopContext);


    //get request
    useEffect(() => {
        getUnitsHandler();
        // getUserProducts();
    }, [])


    //responsive menu toggle
    const responsiveToggleHandler = () => setResponsiveToggle(prev => !prev)


    //get units
    const getUnitsHandler = async () => {
        try {
            const res = await apiRequest.get("/lists/units.json");
            const arrayData = Object.values(res.data);
            const unitsObj = arrayData[0]
            setFilterUnits(unitsObj.units);
            setUnits(unitsObj.units)
        } catch (error) {
            console.log(error)
        }

    }

    // toggle units list
    const toggleCountriesList = () => setActiveUnits(prev => !prev)
    const closeCountriesList = () => setActiveUnits(false)
    //select units
    const selectCountryHandler = e => {
        setMainUnits(e.target.textContent)
        setActiveUnits(false)
    }
    //search units
    const searchCountriesHandler = e => {
        setSearchUnitsValue(e.target.value);
        if (e.target.value.length > 0) {
            const filterItem = [...units].filter(item => item.unit.toLocaleLowerCase().includes(searchUnitsValue.toLocaleLowerCase()))
            setFilterUnits(filterItem)
        } else {
            setFilterUnits(units)
        }
    }






    return (
        <header className="header">
            <div className="header__top">
                <div className="container d-flex justify-between align-center pad-top-1 pad-bottom-1">
                    <span className="hamburger-menu" onClick={responsiveToggleHandler}></span>
                    <Link to="/" className="header__logo">
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                    <SearchBox />
                    <div className="header__icons">
                        <HeaderIcon icon={<FaUser />} title="Profile" />
                        <HeaderIcon icon={<MdMessage />} title="Message" />
                        <HeaderIcon icon={<FaHeart />} title="Orders" href='/cart' userSavesList={userSavesList} />
                        <HeaderIcon icon={<FaShoppingCart />} title="Cart" href='/cart' userCartList={userCartList} />
                    </div>
                </div>
            </div>
            <div className="header__nav">
                <div className="container d-flex justify-between align-center">
                    <Nav responsiveToggle={responsiveToggle} setResponsiveToggle={setResponsiveToggle} />
                    <div className="header__ship">
                        <div className="ship-country" onMouseLeave={closeCountriesList} >
                            <div className="countries-btn" onClick={toggleCountriesList}>
                                <span className="countries__title">
                                    {mainUnits}
                                    <IoIosArrowDown />
                                </span>
                            </div>
                            <div className={`countries__content ${activeUnits && 'active'}`}>
                                <div className="countries__search">
                                    <input
                                        type="text"
                                        className="countries__search-box"
                                        placeholder='search'
                                        value={searchUnitsValue}
                                        onChange={searchCountriesHandler}
                                    />
                                    <FaSearch />
                                </div>
                                <ul className="countries__list">
                                    {
                                        filterUnits.map(country => (
                                            <li key={country.id} className='countries__option' onClick={selectCountryHandler}>{country.unit}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </header >
    )
}
