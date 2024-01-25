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
            <div className="container">
                <div className="header_blk_inr">
                    <section className="header_item_left ">
                        <div className="mobile_trigger_btn d-block d-lg-none" onClick={() => openLeftNav()}><a href="javascript:void(0)"><em className="fa-solid fa-ellipsis"></em></a></div>
                        <div className="side_menu_left" id="sideMenuLeft">
                            <div className="side_menu_hdr">
                                <button className="btn fa-solid fa-xmark" onClick={() => closeLeftNav()}></button>
                            </div>
                            <div className="dropdown header_drpdown">
                                <a className="btn btn-secondary dropdown-toggle" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="images/uk-flag-round-circle-icon.svg" alt="united-kingdom-flag-icon" />UK site
                                </a>
                                <ul className="dropdown-menu">

                                    <li><a className="dropdown-item" href="javascript:void(0)"><img src="images/usa-flag-round-circle-icon.svg" alt="usa-flag-round-circle-icon" />US site</a></li>
                                    <li><a className="dropdown-item" href="javascript:void(0)"><img src="images/thailand-flag-round-circle-icon.svg" alt="thailand-flag-round-circle-icon" /> Asia site</a></li>
                                    <li><a className="dropdown-item" href="javascript:void(0)"><img src="images/india-flag-round-circle-icon.svg" alt="india-flag-round-circle-icon" />India site</a></li>
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
                        <div className="header_call_icn"><a href="javascript:void(0)"><em className="material-symbols-outlined">call</em><span className="d-none d-lg-block">020 7337 9010</span></a></div>
                        <div className="mobile_trigger_btn mobile-menu-trigger d-block d-lg-none"><a href="javascript:void(0)"><em className="fa-solid fa-bars"></em></a></div>
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
                                <a href="javascript:void(0)">Destinations
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
                                                                <a href="javascript:void(0)">Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">South Africa</a></li>
                                                                        <li><a href="javascript:void(0)">Tanzania</a></li>
                                                                        <li><a href="javascript:void(0)">Kenya</a></li>
                                                                        <li><a href="javascript:void(0)">Zimbabwe</a></li>
                                                                        <li><a href="javascript:void(0)">Namibia</a></li>
                                                                        <li><a href="javascript:void(0)">Malawi</a></li>
                                                                        <li><a href="javascript:void(0)">Zambia</a></li>
                                                                        <li><a href="javascript:void(0)">Uganda</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Africa
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label"><a href="javascript:void(0)">Antartica</a></li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Asia
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Indonesia</a></li>
                                                                        <li><a href="javascript:void(0)">Japan</a></li>
                                                                        <li><a href="javascript:void(0)">Cambodia</a></li>
                                                                        <li><a href="javascript:void(0)">Vietnam</a></li>
                                                                        <li><a href="javascript:void(0)">China</a></li>
                                                                        <li><a href="javascript:void(0)">Thailand</a></li>
                                                                        <li><a href="javascript:void(0)">Malaysia & Borneo</a></li>
                                                                        <li><a href="javascript:void(0)">Burma</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Asia
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Australasia & South Pacific
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Australia</a></li>
                                                                        <li><a href="javascript:void(0)">New Zealand</a></li>
                                                                        <li><a href="javascript:void(0)">Cook Islands</a></li>
                                                                        <li><a href="javascript:void(0)">Fiji</a></li>
                                                                        <li><a href="javascript:void(0)">French Polynesia</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Australasia & South Pacific
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Central America
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Belize</a></li>
                                                                        <li><a href="javascript:void(0)">Honduras</a></li>
                                                                        <li><a href="javascript:void(0)">Mexico</a></li>
                                                                        <li><a href="javascript:void(0)">Panama</a></li>
                                                                        <li><a href="javascript:void(0)">Costa Rica</a></li>
                                                                        <li><a href="javascript:void(0)">Guatemala</a></li>
                                                                        <li><a href="javascript:void(0)">Nicaragua</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Central America
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Europe
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Italy</a></li>
                                                                        <li><a href="javascript:void(0)">Greece</a></li>
                                                                        <li><a href="javascript:void(0)">Spain</a></li>
                                                                        <li><a href="javascript:void(0)">Iceland</a></li>
                                                                        <li><a href="javascript:void(0)">Turkey</a></li>
                                                                        <li><a href="javascript:void(0)">Norway</a></li>
                                                                        <li><a href="javascript:void(0)">Sweden</a></li>
                                                                        <li><a href="javascript:void(0)">Croatia</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Europe
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Indian Ocean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Seychelles</a></li>
                                                                        <li><a href="javascript:void(0)">Mauritius</a></li>
                                                                        <li><a href="javascript:void(0)">Maldives</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Indian Ocean
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Indian Subcontinent
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Bhutan</a></li>
                                                                        <li><a href="javascript:void(0)">India</a></li>
                                                                        <li><a href="javascript:void(0)">Sri Lanka</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Indian Subcontinent
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Middle East & North Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Egypt</a></li>
                                                                        <li><a href="javascript:void(0)">Oman</a></li>
                                                                        <li><a href="javascript:void(0)">Israel</a></li>
                                                                        <li><a href="javascript:void(0)">Morocco</a></li>
                                                                        <li><a href="javascript:void(0)">Jordan</a></li>
                                                                        <li><a href="javascript:void(0)">UAE</a></li>
                                                                        <li><a href="javascript:void(0)">Qatar</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Middle East & North Africa
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">North America & Caribbean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">USA</a></li>
                                                                        <li><a href="javascript:void(0)">Canada</a></li>
                                                                        <li><a href="javascript:void(0)">St Lucia</a></li>
                                                                        <li><a href="javascript:void(0)">Grenada</a></li>
                                                                        <li><a href="javascript:void(0)">Barbados</a></li>
                                                                        <li><a href="javascript:void(0)">Antigua</a></li>
                                                                        <li><a href="javascript:void(0)">Guadeloupe</a></li>
                                                                        <li><a href="javascript:void(0)">Cuba</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all North America & Caribbean
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">South America
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Peru</a></li>
                                                                        <li><a href="javascript:void(0)">Ecuador & the Galapagos</a></li>
                                                                        <li><a href="javascript:void(0)">Brazil</a></li>
                                                                        <li><a href="javascript:void(0)">Argentina</a></li>
                                                                        <li><a href="javascript:void(0)">Chile</a></li>
                                                                        <li><a href="javascript:void(0)">Colombia</a></li>
                                                                        <li><a href="javascript:void(0)">Antarctica</a></li>
                                                                        <li><a href="javascript:void(0)">Bolivia</a></li>
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
                                <a href="javascript:void(0)">Holiday types
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
                                                                <a href="javascript:void(0)">Once In A Lifetime Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Ultimate Journeys</a></li>
                                                                        <li><a href="javascript:void(0)">Ultimate Adventures</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Once In A Lifetime Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Honeymoons
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Ultimate Honeymoons</a></li>
                                                                        <li><a href="javascript:void(0)">Perfect Honeymoons</a></li>
                                                                        <li><a href="javascript:void(0)">Beach Honeymoons</a></li>
                                                                        <li><a href="javascript:void(0)">Adventure Honeymoons</a></li>
                                                                        <li><a href="javascript:void(0)">Mini-Moons</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Honeymoons
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Family Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Half-term Escapes</a></li>
                                                                        <li><a href="javascript:void(0)">Easter Family Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Summer Family Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Winter Family Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Family Adventure Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Family Safaris & Wildlife Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Family Road Trips</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Family Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Adventure Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Active Adventures</a></li>
                                                                        <li><a href="javascript:void(0)">Magnificent Landscapes</a></li>
                                                                        <li><a href="javascript:void(0)">Walking & Trekking Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Ranches, Estancias & Country Retreats</a></li>
                                                                        <li><a href="javascript:void(0)">4x4 Adventures</a></li>
                                                                        <li><a href="javascript:void(0)">Guatemala</a></li>
                                                                        <li><a href="javascript:void(0)">Nicaragua</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Adventure Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Luxury Beach Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Beach Holidays For Couples</a></li>
                                                                        <li><a href="javascript:void(0)">Family Beach Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Beach Holidays In Europe</a></li>
                                                                        <li><a href="javascript:void(0)">Exotic Beach Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Beach & Culture Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Alternative Beach Holidays</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Luxury Beach Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Food & Culture Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Food & Wine Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">People & Festivals</a></li>
                                                                        <li><a href="javascript:void(0)">History & Heritage</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Food & Culture Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Wildlife & Safari Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">African Safaris</a></li>
                                                                        <li><a href="javascript:void(0)">Wildlife Holidays Beyond Africa</a></li>
                                                                        <li><a href="javascript:void(0)">Specialist Wildlife Encounters</a></li>
                                                                        <li><a href="javascript:void(0)">Wildlife Cruises</a></li>
                                                                        <li><a href="javascript:void(0)">Wonders of the Natural World</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Wildlife & Safari Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Special Occasions
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Milestone Birthdays & Anniversaries</a></li>
                                                                        <li><a href="javascript:void(0)">Exclusive-Use Hotels</a></li>
                                                                        <li><a href="javascript:void(0)">Proposals</a></li>
                                                                        <li><a href="javascript:void(0)">Morocco</a></li>
                                                                        <li><a href="javascript:void(0)">Jordan</a></li>
                                                                        <li><a href="javascript:void(0)">UAE</a></li>
                                                                        <li><a href="javascript:void(0)">Qatar</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Special Occasions
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Short Breaks & Escapes
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Adventure Escapes</a></li>
                                                                        <li><a href="javascript:void(0)">Cultural Escapes</a></li>
                                                                        <li><a href="javascript:void(0)">Food & Wine Escapes</a></li>
                                                                        <li><a href="javascript:void(0)">Spa & Wellness Escapes</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Short Breaks & Escapes
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Trains, Planes, Cars & Cruises
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Self-Drive Holidays</a></li>
                                                                        <li><a href="javascript:void(0)">Train Journeys</a></li>
                                                                        <li><a href="javascript:void(0)">Cruising & Sailing</a></li>
                                                                        <li><a href="javascript:void(0)">Private Jets & Flying Adventures</a></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Trains, Planes, Cars & Cruises
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="header_country_label">
                                                                <a href="javascript:void(0)">Classic Journeys
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </a>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><a href="javascript:void(0)">Immersive Journeys</a></li>
                                                                        <li><a href="javascript:void(0)">Essential Journeys</a></li>
                                                                        <li><a href="javascript:void(0)">Off-the-beaten-track Journeys</a></li>
                                                                        <li><a href="javascript:void(0)">Signature Journeys</a></li>
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
                            <li className="menu-item-has-children"><a href="javascript:void(0)">Special offers</a></li>
                            <li className="menu-item-has-children"><a href="javascript:void(0)">Blog</a></li>
                            <li className="menu-item-has-children">
                                <a href="javascript:void(0)">Why us
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </a>
                                <div className="sub-menu mega-menu mega-menu-column-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="header_country_list">
                                                        <ul>
                                                            <li className="header_country_label active"><a href="javascript:void(0)">About us</a></li>
                                                            <li className="header_country_label"><a href="javascript:void(0)">Request a brochure</a></li>
                                                            <li className="header_country_label"><a href="javascript:void(0)">Creating your trip</a></li>
                                                            <li className="header_country_label"><a href="javascript:void(0)">Meet the Exsus Team</a></li>
                                                            <li className="header_country_label"><a href="javascript:void(0)">Client reviews</a></li>
                                                            <li className="header_country_label"><a href="javascript:void(0)">Honeymoon Gift List</a></li>
                                                            <li className="header_country_label"><a href="javascript:void(0)">Contact Us</a></li>
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
                            <li className="menu-item-has-children"><a href="javascript:void(0)">Brochure</a></li>
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