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
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Africa
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>South Africa</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Tanzania</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Kenya</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Zimbabwe</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Namibia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Malawi</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Zambia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Uganda</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label"><NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Antartica</NavLink></li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Asia
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Indonesia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Japan</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Cambodia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Vietnam</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>China</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Thailand</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Malaysia & Borneo</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Burma</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Asia
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Australasia & South Pacific
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Australia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>New Zealand</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Cook Islands</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Fiji</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>French Polynesia</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Australasia & South Pacific
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Central America
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Belize</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Honduras</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Mexico</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Panama</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Costa Rica</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Guatemala</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Nicaragua</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Central America
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Europe
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Italy</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Greece</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Spain</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Iceland</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Turkey</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Norway</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Sweden</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Croatia</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Europe
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Indian Ocean
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Seychelles</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Mauritius</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Maldives</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Indian Ocean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Indian Subcontinent
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Bhutan</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>India</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Sri Lanka</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Indian Subcontinent
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Middle East & North Africa
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Egypt</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Oman</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Israel</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Morocco</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Jordan</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>UAE</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Qatar</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Middle East & North Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>North America & Caribbean
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>USA</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Canada</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>St Lucia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Grenada</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Barbados</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Antigua</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Guadeloupe</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Cuba</NavLink></li>
                                                                </ul> 
                                                                <button className="btn header_nav_btn">See all North America & Caribbean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/destination_detail'}>South America
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Peru</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Ecuador & the Galapagos</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Brazil</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Argentina</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Chile</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Colombia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Antarctica</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/destination_detail/country-detail'}>Bolivia</NavLink></li>
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
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Once In A Lifetime Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Ultimate Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Ultimate Adventures</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Once In A Lifetime Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Honeymoons
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Ultimate Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Perfect Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Beach Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Adventure Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Mini-Moons</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Honeymoons
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Family Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Half-term Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Easter Family Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Summer Family Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Winter Family Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Family Adventure Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Family Safaris & Wildlife Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Family Road Trips</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Family Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Adventure Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Active Adventures</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Magnificent Landscapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Walking & Trekking Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Ranches, Estancias & Country Retreats</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>4x4 Adventures</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Guatemala</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Nicaragua</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Adventure Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Luxury Beach Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Beach Holidays For Couples</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Family Beach Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Beach Holidays In Europe</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Exotic Beach Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Beach & Culture Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Alternative Beach Holidays</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Luxury Beach Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Food & Culture Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Food & Wine Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>People & Festivals</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>History & Heritage</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Food & Culture Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Wildlife & Safari Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>African Safaris</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Wildlife Holidays Beyond Africa</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Specialist Wildlife Encounters</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Wildlife Cruises</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Wonders of the Natural World</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Wildlife & Safari Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Special Occasions
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Milestone Birthdays & Anniversaries</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Exclusive-Use Hotels</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Proposals</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Morocco</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Jordan</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>UAE</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Qatar</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Special Occasions
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Short Breaks & Escapes
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Adventure Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Cultural Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Food & Wine Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Spa & Wellness Escapes</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Short Breaks & Escapes
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Trains, Planes, Cars & Cruises
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Self-Drive Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Train Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Cruising & Sailing</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Private Jets & Flying Adventures</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Trains, Planes, Cars & Cruises
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type'}>Classic Journeys
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Immersive Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Essential Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Off-the-beaten-track Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/holiday-types-type/holiday_types_detail'}>Signature Journeys</NavLink></li>
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
                        <li className="menu-item-has-children"><NavLink href="/blog">Blog</NavLink></li>
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