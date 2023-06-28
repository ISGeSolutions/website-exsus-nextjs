import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

import * as React from 'react';

import { store, useGlobalState } from 'state-pool';


export { Header };

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    const [value, setValue] = React.useState('fruit');

    const handleChange = (event) => {
        setValue(event.target.value);

        // localStorage.setItem('site_region', event.target.value);
        // store.setState("site_region", event.target.value);

        window.site_region = event.target.value;
    };

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    // if (!user) return null;

    return (

        <header className="header_blk_row header">
            <div className="container-md">
                <div className="header_blk_inr">
                    <section className="header_item_left ">
                        <div className="mobile_trigger_btn d-block d-lg-none" onClick={()=>openLeftNav()}><a href="#"><em className="fa-solid fa-ellipsis"></em></a></div>
                        <div className="side_menu_left" id="sideMenuLeft">
                            <div className="side_menu_hdr">
                                <button className="btn fa-solid fa-xmark" onClick={()=>closeLeftNav()}></button>
                            </div>
                            <div className="dropdown header_drpdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="images/uk-flag-round-circle-icon.svg" alt="united-kingdom-flag-icon" />UK site
                                </a>
                                <ul className="dropdown-menu">

                                    <li><a className="dropdown-item" href="#"><img src="images/usa-flag-round-circle-icon.svg" alt="usa-flag-round-circle-icon" />US site</a></li>
                                    <li><a className="dropdown-item" href="#"><img src="images/thailand-flag-round-circle-icon.svg" alt="thailand-flag-round-circle-icon" /> Asia site</a></li>
                                    <li><a className="dropdown-item" href="#"><img src="images/india-flag-round-circle-icon.svg" alt="india-flag-round-circle-icon" />India site</a></li>
                                </ul>
                            </div>
                            <div className="input-group srch_site_box">
                                <input type="text" className="form-control" placeholder="Search site" aria-label="Search site" aria-describedby="button-addon2" />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2"><span className="material-symbols-outlined">search</span></button>
                            </div>
                        </div>
                    </section>
                    <section className="header_item_center">
                        <h1><a href="homepage.html">Exsus<span>Travel</span></a></h1>
                    </section>
                    <section className="header_item_right d-flex d-lg-inline-block justify-content-end align-items-center">
                        <div className="header_call_icn"><a href="#"><em className="material-symbols-outlined">call</em><span className="d-none d-lg-block">020 7337 9010</span></a></div>
                        <div className="mobile_trigger_btn mobile-menu-trigger d-block d-lg-none"><a href="#"><em className="fa-solid fa-bars"></em></a></div>
                    </section>
                </div>
                <nav>
                    <div className="menu-overlay">
                    </div>
                    <div className="menu">
                        <div className="mobile-menu-head">
                            <div className="go-back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                            </div>
                            <div className="current-menu-title"></div>
                            <button className="btn fa-solid fa-xmark mobile-menu-close"></button>
                        </div>
                        <ul className="menu-main">
                            <li className="menu-item-has-children">
                                <a href="#">Destinations
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </a>
                                <div className="sub-menu mega-menu mega-menu-column-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="header_country_list">
                                                        <ul>
                                                            <li className="header_country_label active">
                                                                <a href="#">Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">South Africa</a></li>
                                                                        <li><a href="#">Tanzania</a></li>
                                                                        <li><a href="#">Kenya</a></li>
                                                                        <li><a href="#">Zimbabwe</a></li>
                                                                        <li><a href="#">Namibia</a></li>
                                                                        <li><a href="#">Malawi</a></li>
                                                                        <li><a href="#">Zambia</a></li>
                                                                        <li><a href="#">Uganda</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Africa
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label"><a href="#">Antartica</a></li>
                                                            <li className="header_country_label">
                                                                <a href="#">Asia
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Indonesia</a></li>
                                                                        <li><a href="#">Japan</a></li>
                                                                        <li><a href="#">Cambodia</a></li>
                                                                        <li><a href="#">Vietnam</a></li>
                                                                        <li><a href="#">China</a></li>
                                                                        <li><a href="#">Thailand</a></li>
                                                                        <li><a href="#">Malaysia & Borneo</a></li>
                                                                        <li><a href="#">Burma</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Asia
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Australasia & South Pacific
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Australia</a></li>
                                                                        <li><a href="#">New Zealand</a></li>
                                                                        <li><a href="#">Cook Islands</a></li>
                                                                        <li><a href="#">Fiji</a></li>
                                                                        <li><a href="#">French Polynesia</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Australasia & South Pacific
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Central America
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Belize</a></li>
                                                                        <li><a href="#">Honduras</a></li>
                                                                        <li><a href="#">Mexico</a></li>
                                                                        <li><a href="#">Panama</a></li>
                                                                        <li><a href="#">Costa Rica</a></li>
                                                                        <li><a href="#">Guatemala</a></li>
                                                                        <li><a href="#">Nicaragua</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Central America
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Europe
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Italy</a></li>
                                                                        <li><a href="#">Greece</a></li>
                                                                        <li><a href="#">Spain</a></li>
                                                                        <li><a href="#">Iceland</a></li>
                                                                        <li><a href="#">Turkey</a></li>
                                                                        <li><a href="#">Norway</a></li>
                                                                        <li><a href="#">Sweden</a></li>
                                                                        <li><a href="#">Croatia</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Europe
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Indian Ocean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Seychelles</a></li>
                                                                        <li><a href="#">Mauritius</a></li>
                                                                        <li><a href="#">Maldives</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Indian Ocean
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Indian Subcontinent
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Bhutan</a></li>
                                                                        <li><a href="#">India</a></li>
                                                                        <li><a href="#">Sri Lanka</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Indian Subcontinent
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Middle East & North Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Egypt</a></li>
                                                                        <li><a href="#">Oman</a></li>
                                                                        <li><a href="#">Israel</a></li>
                                                                        <li><a href="#">Morocco</a></li>
                                                                        <li><a href="#">Jordan</a></li>
                                                                        <li><a href="#">UAE</a></li>
                                                                        <li><a href="#">Qatar</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Middle East & North Africa
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">North America & Caribbean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">USA</a></li>
                                                                        <li><a href="#">Canada</a></li>
                                                                        <li><a href="#">St Lucia</a></li>
                                                                        <li><a href="#">Grenada</a></li>
                                                                        <li><a href="#">Barbados</a></li>
                                                                        <li><a href="#">Antigua</a></li>
                                                                        <li><a href="#">Guadeloupe</a></li>
                                                                        <li><a href="#">Cuba</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all North America & Caribbean
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">South America
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Peru</a></li>
                                                                        <li><a href="#">Ecuador & the Galapagos</a></li>
                                                                        <li><a href="#">Brazil</a></li>
                                                                        <li><a href="#">Argentina</a></li>
                                                                        <li><a href="#">Chile</a></li>
                                                                        <li><a href="#">Colombia</a></li>
                                                                        <li><a href="#">Antarctica</a></li>
                                                                        <li><a href="#">Bolivia</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all South America
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="header_nav_cnt">
                                                        <h4>Socially-Distanced holidays</h4>
                                                        <p>Get away from it all, in Exsus style. We're championing the art of socially-distanced luxury holidays, from private islands and exceptional villas to awesome adventures and unique glamping experiences. Escape, explore and relax in beautiful destinations all over the world. Get away from the crowds and enjoy a memorable off-the-beaten-track holiday like no other.</p>
                                                        <button className="btn header_nav_btn">Discover more
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="header_nav_cnt">
                                                        <h4>Special occasions</h4>
                                                        <p>Discover some of our favourite ways to celebrate a special occasion, whether that's an anniversary, a birthday, a proposal, or just because... From proposing in a secluded spot by Iguazu Falls to enjoying exclusive use of your very own private island in the Maldives, get some inspiration for your own celebration and give yourself something to look forward to!</p>
                                                        <button className="btn header_nav_btn">Discover more
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="#">Holiday types
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </a>
                                <div className="sub-menu mega-menu mega-menu-column-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="header_country_list">
                                                        <ul>
                                                            <li className="header_country_label active">
                                                                <a href="#">Once In A Lifetime Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Ultimate Journeys</a></li>
                                                                        <li><a href="#">Ultimate Adventures</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Once In A Lifetime Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Honeymoons
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Ultimate Honeymoons</a></li>
                                                                        <li><a href="#">Perfect Honeymoons</a></li>
                                                                        <li><a href="#">Beach Honeymoons</a></li>
                                                                        <li><a href="#">Adventure Honeymoons</a></li>
                                                                        <li><a href="#">Mini-Moons</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Honeymoons
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Family Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Half-term Escapes</a></li>
                                                                        <li><a href="#">Easter Family Holidays</a></li>
                                                                        <li><a href="#">Summer Family Holidays</a></li>
                                                                        <li><a href="#">Winter Family Holidays</a></li>
                                                                        <li><a href="#">Family Adventure Holidays</a></li>
                                                                        <li><a href="#">Family Safaris & Wildlife Holidays</a></li>
                                                                        <li><a href="#">Family Road Trips</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Family Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Adventure Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Active Adventures</a></li>
                                                                        <li><a href="#">Magnificent Landscapes</a></li>
                                                                        <li><a href="#">Walking & Trekking Holidays</a></li>
                                                                        <li><a href="#">Ranches, Estancias & Country Retreats</a></li>
                                                                        <li><a href="#">4x4 Adventures</a></li>
                                                                        <li><a href="#">Guatemala</a></li>
                                                                        <li><a href="#">Nicaragua</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Adventure Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Luxury Beach Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Beach Holidays For Couples</a></li>
                                                                        <li><a href="#">Family Beach Holidays</a></li>
                                                                        <li><a href="#">Beach Holidays In Europe</a></li>
                                                                        <li><a href="#">Exotic Beach Holidays</a></li>
                                                                        <li><a href="#">Beach & Culture Holidays</a></li>
                                                                        <li><a href="#">Alternative Beach Holidays</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Luxury Beach Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Food & Culture Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Food & Wine Holidays</a></li>
                                                                        <li><a href="#">People & Festivals</a></li>
                                                                        <li><a href="#">History & Heritage</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Food & Culture Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Wildlife & Safari Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">African Safaris</a></li>
                                                                        <li><a href="#">Wildlife Holidays Beyond Africa</a></li>
                                                                        <li><a href="#">Specialist Wildlife Encounters</a></li>
                                                                        <li><a href="#">Wildlife Cruises</a></li>
                                                                        <li><a href="#">Wonders of the Natural World</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Wildlife & Safari Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Special Occasions
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Milestone Birthdays & Anniversaries</a></li>
                                                                        <li><a href="#">Exclusive-Use Hotels</a></li>
                                                                        <li><a href="#">Proposals</a></li>
                                                                        <li><a href="#">Morocco</a></li>
                                                                        <li><a href="#">Jordan</a></li>
                                                                        <li><a href="#">UAE</a></li>
                                                                        <li><a href="#">Qatar</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Special Occasions
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Short Breaks & Escapes
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Adventure Escapes</a></li>
                                                                        <li><a href="#">Cultural Escapes</a></li>
                                                                        <li><a href="#">Food & Wine Escapes</a></li>
                                                                        <li><a href="#">Spa & Wellness Escapes</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Short Breaks & Escapes
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Trains, Planes, Cars & Cruises
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Self-Drive Holidays</a></li>
                                                                        <li><a href="#">Train Journeys</a></li>
                                                                        <li><a href="#">Cruising & Sailing</a></li>
                                                                        <li><a href="#">Private Jets & Flying Adventures</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Trains, Planes, Cars & Cruises
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="#">Classic Journeys
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="#">Immersive Journeys</a></li>
                                                                        <li><a href="#">Essential Journeys</a></li>
                                                                        <li><a href="#">Off-the-beaten-track Journeys</a></li>
                                                                        <li><a href="#">Signature Journeys</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Classic Journeys
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="header_nav_cnt">
                                                        <h4>FOODIE HOLIDAYS</h4>
                                                        <p>A big part of any luxury holiday is enjoying the local food and drink. Make the most of it with a foodie-focused holiday, whether that's sampling the gourmet delights of Italy or tasting world-renowned wines in sun-dappled vineyards in stunning worldwide locations.</p>
                                                        <button className="btn header_nav_btn">Discover more
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="header_nav_cnt">
                                                        <h4>WILDLIFE HOLIDAYS</h4>
                                                        <p>Come face to face with the world's most iconic animals on an epic luxury wildlife holiday. Go on safari with the Big Five in South Africa, explore the wildlife-rich Galapagos, meet orangutans in Borneo, and see polar bears in Canada or penguins in Antarctica. The options are endless...</p>
                                                        <button className="btn header_nav_btn">Discover more
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="menu-item-has-children"><a href="#">Special offers</a></li>
                            <li className="menu-item-has-children"><a href="#">Blog</a></li>
                            <li className="menu-item-has-children">
                                <a href="#">Why us
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </a>
                                <div className="sub-menu mega-menu mega-menu-column-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="header_country_list">
                                                        <ul>
                                                            <li className="header_country_label active"><a href="#">About us</a></li>
                                                            <li className="header_country_label"><a href="#">Request a brochure</a></li>
                                                            <li className="header_country_label"><a href="#">Creating your trip</a></li>
                                                            <li className="header_country_label"><a href="#">Meet the Exsus Team</a></li>
                                                            <li className="header_country_label"><a href="#">Client reviews</a></li>
                                                            <li className="header_country_label"><a href="#">Honeymoon Gift List</a></li>
                                                            <li className="header_country_label"><a href="">Contact Us</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="header_nav_cnt">
                                                        <h4>MEET OUR EXPERTS</h4>
                                                        <p>Our passionate and knowledgeable team of well-travelled experts can tailor-make your perfect luxury holiday, honeymoon or family adventure to over 90 destinations all over the world, from Italy to India.</p>
                                                        <button className="btn header_nav_btn">MEET OUR EXPERTS
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="header_nav_cnt">
                                                        <h4>What clients say about us</h4>
                                                        <p>From honeymooners to families, find out what our recent travellers have to say about their holidays with Exsus and how our experts have ensured their experience goes above and beyond, from start to finish.</p>
                                                        <button className="btn header_nav_btn">Read Our Reviews
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="menu-item-has-children"><a href="#">Brochure</a></li>
                        </ul>
                        <button className="btn prmry_btn make_enqury_btn">Make an enquiry
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}