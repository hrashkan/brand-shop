import React, { useState, useEffect } from 'react'

import FooterNewsletter from '../FooterSubscribe/FooterNewsletter'
import SocialIcon from '../SocialIcon/SocialIcon'
import FooterMenu from '../FooterMenu/FooterMenu'
import FooterTitle from '../FooterTitle/FooterTitle'
import FooterCopyRight from '../FooterCopyRight/FooterCopyRight'

import apiRequest from '../../services/axios/config'

import { Link } from 'react-router-dom'

import "./Footer.css"

export default function Footer() {

    const [aboutMenus, setAboutMenus] = useState([]);
    const [informationMenus, setInformationMenus] = useState([]);
    const [partnershipMenus, setPartnershipMenus] = useState([]);

    useEffect(() => {
        getMenus();
    }, []);

    const getMenus = async () => {
        try {
            const res = await apiRequest.get("/menus.json");
            const menusArray = Object.values(res.data)
            const data = menusArray[1];
            setAboutMenus(data.about)
            setInformationMenus(data.information)
            setPartnershipMenus(data.partnership)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <footer className="footer">
            <FooterNewsletter />
            <div className="footer-main">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <Link to="https://react.dev" className='footer__logo'>
                                <img src="/images/logo.png" alt="logo" className="footer__logo-img" />
                            </Link>
                            <span className="footer__desc">
                                Best information about the company gies here but now lorem ipsum is
                            </span>
                            <div className="footer__social">
                                <SocialIcon />
                            </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-7">
                            <div className="footer__menu">
                                <div className="footer__menu-cat">
                                    {
                                        aboutMenus.length ?
                                            (
                                                <>
                                                    <FooterTitle title="About" />
                                                    <ul className="footer__list">
                                                        {
                                                            aboutMenus.map(menu => (
                                                                <FooterMenu key={menu.id} {...menu} />
                                                            ))
                                                        }
                                                    </ul>

                                                </>
                                            )

                                            : ("")

                                    }
                                </div>
                                <div className="footer__menu-cat">
                                    {
                                        informationMenus.length ?
                                            (
                                                <>
                                                    <FooterTitle title="Information" />
                                                    <ul className="footer__list">
                                                        {
                                                            informationMenus.map(menu => (
                                                                <FooterMenu key={menu.id} {...menu} />
                                                            ))
                                                        }
                                                    </ul>

                                                </>
                                            )

                                            : ("")

                                    }
                                </div>
                                <div className="footer__menu-cat">
                                    {
                                        partnershipMenus.length ?
                                            (
                                                <>
                                                    <FooterTitle title="Partnership" />
                                                    <ul className="footer__list">
                                                        {
                                                            partnershipMenus.map(menu => (
                                                                <FooterMenu key={menu.id} {...menu} />
                                                            ))
                                                        }
                                                    </ul>

                                                </>
                                            )

                                            : ("")

                                    }
                                </div>
                                <div className="footer__menu-cat">
                                    {
                                        aboutMenus.length ?
                                            (
                                                <>
                                                    <FooterTitle title="About" />
                                                    <ul className="footer__list">
                                                        {
                                                            aboutMenus.map(menu => (
                                                                <FooterMenu key={menu.id} {...menu} />
                                                            ))
                                                        }
                                                    </ul>

                                                </>
                                            )

                                            : ("")

                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-2">
                            <div className="footer-app">
                                <FooterTitle title="Get app" />
                                <Link to="https://react.dev" className='footer__market'>
                                    <img src="/images/googleplay.png" alt="market" className="footer__market-img" />
                                </Link>
                                <Link to="https://react.dev" className='footer__market'>
                                    <img src="/images/appstore.png" alt="market" className="footer__market-img" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCopyRight />
        </footer>
    )
}
