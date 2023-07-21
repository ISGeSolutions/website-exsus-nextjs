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
            // console.log('window.site_region', window.site_region);
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
                                                            <NavLink href={regionWiseUrl + '/destinations/africa'}>Africa
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/south-africa'}>South Africa</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/tanzania'}>Tanzania</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/kenya'}>Kenya</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/zimbabwe'}>Zimbabwe</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/namibia'}>Namibia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/malawi'}>Malawi</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/zambia'}>Zambia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/africa/uganda'}>Uganda</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label"><NavLink href={regionWiseUrl + '/destinations/destination_detail'}>Antartica</NavLink></li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/asia'}>Asia
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/indonesia'}>Indonesia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/japan'}>Japan</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/cambodia'}>Cambodia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/vietnam'}>Vietnam</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/china'}>China</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/thailand'}>Thailand</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/malaysia-and-borneo'}>Malaysia & Borneo</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/asia/burma'}>Burma</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Asia
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/australasia-and-south-pacific'}>Australasia & South Pacific
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/australasia-and-south-pacific/australia'}>Australia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/australasia-and-south-pacific/new-zealand'}>New Zealand</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/australasia-and-south-pacific/cook-islands'}>Cook Islands</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/australasia-and-south-pacific/fiji'}>Fiji</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/australasia-and-south-pacific/french-polynesia'}>French Polynesia</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Australasia & South Pacific
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/central-america'}>Central America
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/central-america/belize'}>Belize</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/central-america/honduras'}>Honduras</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/central-america/mexico'}>Mexico</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/central-america/panama'}>Panama</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/central-america/costa-rica'}>Costa Rica</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/central-america/guatemala'}>Guatemala</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/central-america/nicaragua'}>Nicaragua</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Central America
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/europe'}>Europe
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/italy'}>Italy</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/greece'}>Greece</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/spain'}>Spain</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/iceland'}>Iceland</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/turkey'}>Turkey</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/norway'}>Norway</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/sweden'}>Sweden</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/europe/croatia'}>Croatia</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Europe
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/indian-ocean'}>Indian Ocean
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/indian-ocean/seychelles'}>Seychelles</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/indian-ocean/mauritius'}>Mauritius</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/indian-ocean/maldives'}>Maldives</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Indian Ocean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/indian-subcontinent'}>Indian Subcontinent
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/indian-subcontinent/bhutan'}>Bhutan</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/indian-subcontinent/india'}>India</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/indian-subcontinent/sri-lanka'}>Sri Lanka</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Indian Subcontinent
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa'}>Middle East & North Africa
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa/egypt'}>Egypt</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa/oman'}>Oman</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa/israel'}>Israel</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa/morocco'}>Morocco</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa/jordan'}>Jordan</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa/uae'}>UAE</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/middle-east-and-north-africa/qatar'}>Qatar</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all Middle East & North Africa
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean'}>North America & Caribbean
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/usa'}>USA</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/canada'}>Canada</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/st-lucia'}>St Lucia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/grenada'}>Grenada</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/barbados'}>Barbados</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/antigua'}>Antigua</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/guadeloupe'}>Guadeloupe</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/north-america-and-caribbean/cuba'}>Cuba</NavLink></li>
                                                                </ul>
                                                                <button className="btn header_nav_btn">See all North America & Caribbean
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/destinations/south-america'}>South America
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/peru'}>Peru</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/ecuador-and-the-galapagos'}>Ecuador & the Galapagos</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/brazil'}>Brazil</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/argentina'}>Argentina</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/chile'}>Chile</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/colombia'}>Colombia</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/antarctica'}>Antarctica</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/destinations/south-america/bolivia'}>Bolivia</NavLink></li>
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
                                                            <NavLink href={regionWiseUrl + '/holiday-types/incredible-journeys'}>Once In A Lifetime Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/incredible/ultimate-journeys'}>Ultimate Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/incredible/ultimate-adventure-holidays'}>Ultimate Adventures</NavLink></li>
                                                                </ul>
                                                                {/* incredible-journeys-itineraries */}
                                                                <button className="btn header_nav_btn">See all Once In A Lifetime Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/luxury-honeymoons'}>Honeymoons
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-honeymoons/ultimate-honeymoons'}>Ultimate Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-honeymoons/perfect-honeymoons'}>Perfect Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-honeymoons/beach-honeymoons'}>Beach Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-honeymoons/Adventure-honeymoons'}>Adventure Honeymoons</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-honeymoons/mini-moons'}>Mini-Moons</NavLink></li>
                                                                </ul>
                                                                {/* luxury-honeymoons-itineraries */}
                                                                <button className="btn header_nav_btn">See all Honeymoons
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/family-holidays'}>Family Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/family-holidays/half-term-escapes'}>Half-term Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/family-holidays/easter-family-holidays'}>Easter Family Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/family-holidays/summer-family-holidays'}>Summer Family Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/family-holidays/winter-family-holidays'}>Winter Family Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/family-holidays/family-adventure-holidays'}>Family Adventure Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/family-holidays/family-safari-and-wildlife-holidays'}>Family Safaris & Wildlife Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/family-holidays/family-road-trips'}>Family Road Trips</NavLink></li>
                                                                </ul>
                                                                {/* family-holidays-itineraries */}
                                                                <button className="btn header_nav_btn">See all Family Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays'}>Adventure Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays/active-adventures'}>Active Adventures</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays/magnificent-landscapes'}>Magnificent Landscapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays/walking-trekking-holidays'}>Walking & Trekking Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays/ranches-estancies-country-retreats'}>Ranches, Estancias & Country Retreats</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays/4-by-4-adventures'}>4x4 Adventures</NavLink></li>
                                                                    {/* <li><NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays/guatemala'}>Guatemala</NavLink></li> */}
                                                                    {/* <li><NavLink href={regionWiseUrl + '/holiday-types/adventure-holidays/nicaragua'}>Nicaragua</NavLink></li> */}
                                                                </ul>
                                                                {/* adventure-holidays-itineraries */}
                                                                <button className="btn header_nav_btn">See all Adventure Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/luxury-beach-holidays'}>Luxury Beach Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-beach-holidays/couples-beach-holidays'}>Beach Holidays For Couples</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-beach-holidays/family-beach-holidays'}>Family Beach Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-beach-holidays/beach-holidays-europe'}>Beach Holidays In Europe</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-beach-holidays/exotic-beach-holidays'}>Exotic Beach Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-beach-holidays/beach-culture-holidays'}>Beach & Culture Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-beach-holidays/alternative-beach-holidays'}>Alternative Beach Holidays</NavLink></li>
                                                                </ul>
                                                                {/* luxury-beach-holidays-itineraries */}
                                                                <button className="btn header_nav_btn">See all Luxury Beach Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/culture-holidays'}>Food & Culture Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/culture-holidays/food-and-wine-holidays'}>Food & Wine Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/culture-holidays/people-and-festivals'}>People & Festivals</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/culture-holidays/history-and-heritage-holidays'}>History & Heritage</NavLink></li>
                                                                </ul>
                                                                {/* culture-holidays-itineraries" */}
                                                                <button className="btn header_nav_btn">See all Food & Culture Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/wildlife-holidays'}>Wildlife & Safari Holidays
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/wildlife-holidays/african-safaris'}>African Safaris</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/wildlife-holidays/wildlife-holidays-beyond-africa'}>Wildlife Holidays Beyond Africa</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/wildlife-holidays/specialist-wildlife-encounters'}>Specialist Wildlife Encounters</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/wildlife-holidays/wildlife-cruises'}>Wildlife Cruises</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/wildlife-holidays/wonders-of-the-natural-world'}>Wonders of the Natural World</NavLink></li>
                                                                </ul>
                                                                {/* wildlife-holidays-itineraries */}
                                                                <button className="btn header_nav_btn">See all Wildlife & Safari Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/special-occasions'}>Special Occasions
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/special-occasions/milestone-birthdays-and-anniversaries'}>Milestone Birthdays & Anniversaries</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/special-occasions/exclusive-use-hotels'}>Exclusive-Use Hotels</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/special-occasions/proposals'}>Proposals</NavLink></li>
                                                                    {/* <li><NavLink href={regionWiseUrl + '/holiday-types/special-occasions/morocco'}>Morocco</NavLink></li> */}
                                                                    {/* <li><NavLink href={regionWiseUrl + '/holiday-types/special-occasions/jordan'}>Jordan</NavLink></li> */}
                                                                    {/* <li><NavLink href={regionWiseUrl + '/holiday-types/special-occasions/uae'}>UAE</NavLink></li> */}
                                                                    {/* <li><NavLink href={regionWiseUrl + '/holiday-types/special-occasions/qatar'}>Qatar</NavLink></li> */}
                                                                </ul>
                                                                {/* special-occasions-itineraries */}
                                                                <button className="btn header_nav_btn">See all Special Occasions
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/luxury-short-breaks'}>Short Breaks & Escapes
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-short-breaks/adventure-escapes'}>Adventure Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-short-breaks/cultural-escapes'}>Cultural Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-short-breaks/food-and-wine-escapes'}>Food & Wine Escapes</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/luxury-short-breaks/wellness-escapes'}>Spa & Wellness Escapes</NavLink></li>
                                                                </ul>
                                                                {/* luxury-short-breaks-itineraries */}
                                                                <button className="btn header_nav_btn">See all Short Breaks & Escapes
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/trains-planes-and-automobiles'}>Trains, Planes, Cars & Cruises
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/trains-planes-and-automobiles/self-drive-holidays'}>Self-Drive Holidays</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/trains-planes-and-automobiles/train-journeys'}>Train Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/trains-planes-and-automobiles/cruising-and-sailing'}>Cruising & Sailing</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/trains-planes-and-automobiles/private-jets-and-flying-adventures'}>Private Jets & Flying Adventures</NavLink></li>
                                                                </ul>
                                                                {/* trains-planes-and-automobiles-itineraries */}
                                                                <button className="btn header_nav_btn">See all Trains, Planes, Cars & Cruises
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li className="header_country_label">
                                                            <NavLink href={regionWiseUrl + '/holiday-types/classic-journeys'}>Classic Journeys
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                            </NavLink>
                                                            <div className="header_country_list_inr">
                                                                <ul>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/classic-journeys/immersive-journeys'}>Immersive Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/classic-journeys/essential-journeys'}>Essential Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/classic-journeys/journeys-off-the-beaten-path'}>Off-the-beaten-track Journeys</NavLink></li>
                                                                    <li><NavLink href={regionWiseUrl + '/holiday-types/classic-journeys/signature-journeys'}>Signature Journeys</NavLink></li>
                                                                </ul>
                                                                {/* classic-journeys-itineraries */}
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
