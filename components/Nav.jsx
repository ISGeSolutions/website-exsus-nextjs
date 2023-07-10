import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

import * as React from 'react';

import { store, useGlobalState } from 'state-pool';


export { Nav };

function Nav() {
    const [user, setUser] = useState(null);
    // const [regionWiseUrl, setMyVariable] = useState("");

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            console.log('window.site_region', window.site_region);
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    // const [value, setValue] = React.useState('fruit');

    // const handleChange = (event) => {
    //     setValue(event.target.value);

    // localStorage.setItem('site_region', event.target.value);
    // store.setState("site_region", event.target.value);

    //     window.site_region = event.target.value;
    // };

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    // if (!user) return null;

    return (

        <>
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
                            <NavLink href={regionWiseUrl + '/destinations'} className="nav-item nav-link">
                                Destinations
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </NavLink>
                            {/* <NavLink href="#">Destinations
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </NavLink> */}
                            <div className="sub-menu mega-menu mega-menu-column-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="header_country_list">
                                                    <ul>
                                                        <li className="header_country_label active">
                                                            <NavLink href="/destinations/destination_detail">Africa
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">South Africa</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Tanzania</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Kenya</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Zimbabwe</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Namibia</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Malawi</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Zambia</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Uganda</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label"><NavLink href="/destinations/destination_detail">Antartica</NavLink></li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">Asia
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Indonesia</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Japan</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Cambodia</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Vietnam</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">China</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Thailand</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Malaysia & Borneo</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Burma</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Asia
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">Australasia & South Pacific
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Australia</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">New Zealand</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Cook Islands</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Fiji</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">French Polynesia</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Australasia & South Pacific
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">Central America
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Belize</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Honduras</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Mexico</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Panama</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Costa Rica</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Guatemala</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Nicaragua</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Central America
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">Europe
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Italy</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Greece</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Spain</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Iceland</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Turkey</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Norway</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Sweden</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Croatia</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Europe
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">Indian Ocean
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Seychelles</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Mauritius</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Maldives</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Indian Ocean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">Indian Subcontinent
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Bhutan</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">India</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Sri Lanka</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Indian Subcontinent
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">Middle East & North Africa
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Egypt</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Oman</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Israel</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Morocco</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Jordan</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">UAE</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Qatar</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Middle East & North Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">North America & Caribbean
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">USA</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Canada</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">St Lucia</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Grenada</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Barbados</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Antigua</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Guadeloupe</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Cuba</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all North America & Caribbean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="/destinations/destination_detail">South America
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="/destinations/destination_detail">Peru</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Ecuador & the Galapagos</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Brazil</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Argentina</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Chile</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Colombia</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Antarctica</NavLink></li>
                                                                    <li><NavLink href="/destinations/destination_detail">Bolivia</NavLink></li>
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
                            <NavLink href={regionWiseUrl + '/holiday-types'}>Holiday types
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </NavLink>
                            <div className="sub-menu mega-menu mega-menu-column-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="header_country_list">
                                                    <ul>
                                                        <li className="header_country_label active">
                                                            <NavLink href="#">Once In A Lifetime Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Ultimate Journeys</NavLink></li>
                                                                    <li><NavLink href="#">Ultimate Adventures</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Once In A Lifetime Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Honeymoons
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Ultimate Honeymoons</NavLink></li>
                                                                    <li><NavLink href="#">Perfect Honeymoons</NavLink></li>
                                                                    <li><NavLink href="#">Beach Honeymoons</NavLink></li>
                                                                    <li><NavLink href="#">Adventure Honeymoons</NavLink></li>
                                                                    <li><NavLink href="#">Mini-Moons</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Honeymoons
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Family Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Half-term Escapes</NavLink></li>
                                                                    <li><NavLink href="#">Easter Family Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Summer Family Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Winter Family Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Family Adventure Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Family Safaris & Wildlife Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Family Road Trips</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Family Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Adventure Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Active Adventures</NavLink></li>
                                                                    <li><NavLink href="#">Magnificent Landscapes</NavLink></li>
                                                                    <li><NavLink href="#">Walking & Trekking Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Ranches, Estancias & Country Retreats</NavLink></li>
                                                                    <li><NavLink href="#">4x4 Adventures</NavLink></li>
                                                                    <li><NavLink href="#">Guatemala</NavLink></li>
                                                                    <li><NavLink href="#">Nicaragua</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Adventure Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Luxury Beach Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Beach Holidays For Couples</NavLink></li>
                                                                    <li><NavLink href="#">Family Beach Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Beach Holidays In Europe</NavLink></li>
                                                                    <li><NavLink href="#">Exotic Beach Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Beach & Culture Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Alternative Beach Holidays</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Luxury Beach Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Food & Culture Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Food & Wine Holidays</NavLink></li>
                                                                    <li><NavLink href="#">People & Festivals</NavLink></li>
                                                                    <li><NavLink href="#">History & Heritage</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Food & Culture Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Wildlife & Safari Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">African Safaris</NavLink></li>
                                                                    <li><NavLink href="#">Wildlife Holidays Beyond Africa</NavLink></li>
                                                                    <li><NavLink href="#">Specialist Wildlife Encounters</NavLink></li>
                                                                    <li><NavLink href="#">Wildlife Cruises</NavLink></li>
                                                                    <li><NavLink href="#">Wonders of the Natural World</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Wildlife & Safari Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Special Occasions
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Milestone Birthdays & Anniversaries</NavLink></li>
                                                                    <li><NavLink href="#">Exclusive-Use Hotels</NavLink></li>
                                                                    <li><NavLink href="#">Proposals</NavLink></li>
                                                                    <li><NavLink href="#">Morocco</NavLink></li>
                                                                    <li><NavLink href="#">Jordan</NavLink></li>
                                                                    <li><NavLink href="#">UAE</NavLink></li>
                                                                    <li><NavLink href="#">Qatar</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Special Occasions
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Short Breaks & Escapes
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Adventure Escapes</NavLink></li>
                                                                    <li><NavLink href="#">Cultural Escapes</NavLink></li>
                                                                    <li><NavLink href="#">Food & Wine Escapes</NavLink></li>
                                                                    <li><NavLink href="#">Spa & Wellness Escapes</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Short Breaks & Escapes
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Trains, Planes, Cars & Cruises
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Self-Drive Holidays</NavLink></li>
                                                                    <li><NavLink href="#">Train Journeys</NavLink></li>
                                                                    <li><NavLink href="#">Cruising & Sailing</NavLink></li>
                                                                    <li><NavLink href="#">Private Jets & Flying Adventures</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Trains, Planes, Cars & Cruises
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href="#">Classic Journeys
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href="#">Immersive Journeys</NavLink></li>
                                                                    <li><NavLink href="#">Essential Journeys</NavLink></li>
                                                                    <li><NavLink href="#">Off-the-beaten-track Journeys</NavLink></li>
                                                                    <li><NavLink href="#">Signature Journeys</NavLink></li>
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
                        <li className="menu-item-has-children"><NavLink href={regionWiseUrl + '/special-offers'}>Special offers</NavLink></li>
                        <li className="menu-item-has-children"><NavLink href="/blogs">Blog</NavLink></li>
                        <li className="menu-item-has-children">
                            <NavLink href="/why-us">Why us
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </NavLink>
                            <div className="sub-menu mega-menu mega-menu-column-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="header_country_list">
                                                    <ul>
                                                        <li className="header_country_label active"><NavLink href="/about-us">About us</NavLink></li>
                                                        <li className="header_country_label"><NavLink href="/request-a-brochure">Request a brochure</NavLink></li>
                                                        <li className="header_country_label"><NavLink href="/creating-your-trip">Creating your trip</NavLink></li>
                                                        <li className="header_country_label"><NavLink href="/meet-the-exsus-team">Meet the Exsus Team</NavLink></li>
                                                        <li className="header_country_label"><NavLink href="/client-reviews">Client reviews</NavLink></li>
                                                        <li className="header_country_label"><NavLink href="/honeymoon-gift-list">Honeymoon Gift List</NavLink></li>
                                                        <li className="header_country_label"><NavLink href="/contact-us">Contact Us</NavLink></li>
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
                        <li className="menu-item-has-children"><NavLink href="/brochure">Brochure</NavLink></li>
                    </ul>
                    <button className="btn prmry_btn make_enqury_btn">
                        <NavLink className="text-white no-underline-link" href="/contact-us">Make an enquiry
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </NavLink>
                    </button>
                </div>
            </nav>
        </>
    );
}