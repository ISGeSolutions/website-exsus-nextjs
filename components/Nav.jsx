import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NavLink } from '.';
import { userService, destinationService, holidaytypesService } from 'services';
import Head from 'next/head';
import * as React from 'react';
import { store, useGlobalState } from 'state-pool';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);
    // const [regionWiseUrl, setMyVariable] = useState("");
    const [destinationLandingList, setDestinationLandingList] = useState();
    const [holidaytypesList, setHolidaytypesList] = useState();
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeIndexHoliday, setActiveIndexHoliday] = useState(null);

    const [menu, setmenu] = useState(null);
    const [menuMain, setmmenuMain] = useState(null);
    const [goBack, setgoBack] = useState(null);
    const [menuTrigger, setmenuTrigger] = useState(null);
    const [closeMenu, setcloseMenu] = useState(null);


    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        // setActiveIndex(0);
        // setActiveIndex(null);
    };

    const handleMouseEnterHoliday = (index) => {
        setActiveIndexHoliday(index);
    };

    const handleMouseLeaveHoliday = () => {
        // setActiveIndexHoliday(0);
        // setActiveIndexHoliday(null);
    };

    const router = useRouter();

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            // console.log('window.site_region', window.site_region);
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const dynamicLink = (itemId, id) => {
        // {regionWiseUrl + '/destinations/africa/south-africa'}
        if (itemId && itemId == 'AF') {
            return regionWiseUrl + `/continent?destinationcode=` + id;
        } else if (itemId && itemId == 'AS') {
            return regionWiseUrl + `/continent?destinationcode=` + id;
        } else if (itemId && itemId == 'AU') {
            return regionWiseUrl + `/continent?destinationcode=` + id;
        } else if (itemId && itemId == 'CA') {
            return regionWiseUrl + `/continent?destinationcode=` + id;
        } else if (itemId && itemId == 'EU') {
            return regionWiseUrl + `/continent?destinationcode=` + id;
        } else if (itemId && itemId == 'IO') {
            return regionWiseUrl + `/continent?destinationcode=` + id;
        } else if (itemId && itemId == 'IS') {
            return regionWiseUrl + `/continent?destinationcode=` + id;
        } else {
            return "#";
        }
    };

    const dynamicLinkas = (itemId, id) => {
        // if (itemId && itemId == 'AF') {
        //     return regionWiseUrl + `/destinations/africa/` + id;
        // }
        if (itemId && itemId == 'AF') {
            return regionWiseUrl + `/continent/` + id;
        } else if (itemId && itemId == 'AS') {
            return regionWiseUrl + `/continent/` + id;
        } else if (itemId && itemId == 'AU') {
            return regionWiseUrl + `/continent/` + id;
        } else if (itemId && itemId == 'CA') {
            return regionWiseUrl + `/continent/` + id;
        } else if (itemId && itemId == 'EU') {
            return regionWiseUrl + `/continent/` + id;
        } else if (itemId && itemId == 'IO') {
            return regionWiseUrl + `/continent/` + id;
        } else if (itemId && itemId == 'IS') {
            return regionWiseUrl + `/continent/` + id;
        } else {
            return "#";
        }
    }

    const dynamicLinkCountry = (itemId, itemIdCountry) => {
        if (itemId && itemId == 'AF') {
            if (itemIdCountry == 'TZ') {
                return regionWiseUrl + `/country?countrycode=tanzania`;
            } else if (itemIdCountry == 'ZA') {
                return regionWiseUrl + `/country?countrycode=south-africa`;
            }
        } else if (itemId && itemId == 'AS') {
            if (itemIdCountry == 'ID') {
                return regionWiseUrl + `/country?countrycode=indonesia`;
            } else if (itemIdCountry == 'JP') {
                return regionWiseUrl + `/country?countrycode=japan`;
            }
        } else if (itemId && itemId == 'AU') {
            if (itemIdCountry == 'AU') {
                return regionWiseUrl + `/country?countrycode=australia`;
            } else if (itemIdCountry == 'NZ') {
                return regionWiseUrl + `/country?countrycode=new-zealand`;
            }
        } else if (itemId && itemId == 'IS') {
            if (itemIdCountry == 'BT') {
                return regionWiseUrl + `/country?countrycode=bhutan`;
            } else if (itemIdCountry == 'IN') {
                return regionWiseUrl + `/country?countrycode=india`;
            }
        } else {
            return "#";
        }
    };

    const dynamicLinkHoliday = (itemId, id) => {
        if (itemId && itemId == 'HG6') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=` + id;
        } else if (itemId && itemId == 'HG5') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=` + id;
        } else if (itemId && itemId == 'HG4') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=` + id;
        } else if (itemId && itemId == 'ADHL') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=` + id;
        } else if (itemId && itemId == 'LBHG') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=` + id;
        } else if (itemId && itemId == 'HG3') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=` + id;
        } else {
            return "#";
        }
    };

    const dynamicLinkHolidayas = (itemId, id) => {
        // if (itemId && itemId == 'AF') {
        //     return regionWiseUrl + `/destinations/africa/` + id;
        // }
        if (itemId && itemId == 'HG6') {
            return regionWiseUrl + `/holidaytypeitineraries/id`;
        } else if (itemId && itemId == 'HG5') {
            return regionWiseUrl + `/holidaytypeitineraries/id`;
        } else if (itemId && itemId == 'HG4') {
            return regionWiseUrl + `/holidaytypeitineraries/id`;
        } else if (itemId && itemId == 'ADHL') {
            return regionWiseUrl + `/holidaytypeitineraries/id`;
        } else if (itemId && itemId == 'LBHG') {
            return regionWiseUrl + `/holidaytypeitineraries/id`;
        } else if (itemId && itemId == 'HG3') {
            return regionWiseUrl + `/holidaytypeitineraries/id`;
        } else {
            return "#";
        }
    }

    const dynamicLinkCountryHoliday = (itemId, itemIdCountry, id) => {
        if (itemId && itemId == 'HG6') {
            if (itemIdCountry == 'ULAD') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id;
            }
        } else if (itemId && itemId == 'HG5') {
            if (itemIdCountry == 'ADHN') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id; // Adventure Honeymoons
            } else if (itemIdCountry == 'BEHN') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id; // Beach Honeymoons
            }
        } else if (itemId && itemId == 'HG4') {
            return regionWiseUrl + `/holidaytypeideas?hcode=` + id;
        } else if (itemId && itemId == 'ADHL') {
            if (itemIdCountry == 'ULAD') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id; // Ultimate Adventures
            } else if (itemIdCountry == 'ACBA') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id; // Active Adventures
            } else if (itemIdCountry == 'ADVE') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id; // 4x4 Adventures
            }
        } else if (itemId && itemId == 'LBHG') {
            if (itemIdCountry == 'ABH') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id; // Alternative Beach Holidays
            } else if (itemIdCountry == 'BCH') {
                return regionWiseUrl + `/holidaytypeideas?hcode=` + id; // Beach & Culture Holidays
            }
        } else if (itemId && itemId == 'HG3') {
            return regionWiseUrl + `/holidaytypeideas?hcode=` + id;
        } else {
            return "#";
        }
    };

    useEffect(() => {

        const menu = document.querySelector(".menu"); //Nav tag
        setmenu(menu);

        const menuMain = menu.querySelector(".menu-main"); //ul tag
        setmmenuMain(menuMain);

        const goBack = menu.querySelector(".go-back"); //mobile back
        setmenu(goBack);

        const menuTrigger = document.querySelector(".mobile-menu-trigger"); //header icon
        setmenu(menuTrigger);

        const closeMenu = menu.querySelector(".mobile-menu-close"); // mobile close
        setmenu(closeMenu);

        window.onresize = function () {
        if (this.innerWidth > 991) {
            if (menu.classList.contains("active")) {
                toggleMenu();
            }

        }
    }

    $(".header_country_list > ul .header_country_label").on('mouseenter', function (event) {
        $('.header_country_list > ul .header_country_label').removeClass("active");
        $(this).addClass("active");
    });

    $('.header_country_label').click(function () {
        $('.header_country_label').removeClass("responsive_drpdwn_cls");
        $(this).addClass('responsive_drpdwn_cls');
    });

    document.querySelector(".menu-overlay").addEventListener("click", () => {
        toggleMenu();
    })



        
        const script = document.createElement('script');

        script.src = "https://use.typekit.net/foobar.js";
        script.async = true;

        document.body.appendChild(script);

        destinationService.getDestinationLandingList().then(x => {
            // console.log('x.data', x.data);
            setDestinationLandingList(x.data);
        });

        holidaytypesService.getHolidaytypesLandingList().then(x => {
            // console.log('x.data - holiday types', x.data);
            setHolidaytypesList(x.data);
        });

        setActiveIndex(0);
        setActiveIndexHoliday(0);

        const subscription = userService.user.subscribe(x => setUser(x));
        return () => {
            subscription.unsubscribe();
        }
    }, []);

    const makeAnEnquiry = () => {
        // console.log('makeAnEnquiry');
        // Do something
        router.push('/contact-us');
    }

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




    let subMenu;
    menuMain?.addEventListener("click", (e) => {
        if (!menu.classList.contains("active")) {
            return;
        }
        if (e.target.closest(".menu-item-has-children")) {
            const hasChildren = e.target.closest(".menu-item-has-children");
            showSubMenu(hasChildren);
        }

    });
    goBack?.addEventListener("click", () => {
        hideSubMenu();
    })
    menuTrigger?.addEventListener("click", () => {
        toggleMenu();
    })
    closeMenu?.addEventListener("click", () => {
        toggleMenu();
    })
    

    function toggleMenu() {
        menu.classList.toggle("active");
        document.querySelector(".menu-overlay").classList.toggle("active");
    }

    function showSubMenu(hasChildren) {
        subMenu = hasChildren.querySelector(".sub-menu");
        subMenu.classList.add("active");
        subMenu.style.animation = "slideLeft 0.5s ease forwards";
        const menuTitle = hasChildren.querySelector("svg").parentNode.childNodes[0].textContent;
        menu.querySelector(".current-menu-title").innerHTML = menuTitle;
        menu.querySelector(".mobile-menu-head").classList.add("active");
    }

    function hideSubMenu() {
        subMenu.style.animation = "slideRight 0.5s ease forwards";
        setTimeout(() => {
            subMenu.classList.remove("active");
        }, 300);
        menu.querySelector(".current-menu-title").innerHTML = "";
        menu.querySelector(".mobile-menu-head").classList.remove("active");
    }

    function closeLeftNav() {
        document.getElementById('sideMenuLeft').style.width = "0";
    }

    function openLeftNav() {
        document.getElementById('sideMenuLeft').style.width = "100%";
    }
    


    // only show nav when logged in
    // if (!user) return null;

    return (
        <>
            <nav>
                <Head>
                    {/* <script type="text/javascript" src="/assets/javascripts/navigation.js"></script> */}
                </Head>
                <div className="menu-overlay">
                </div>
                <div className="menu">
                    <div className="mobile-menu-head">
                        <div className="go-back">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                        </div>
                        <div className="current-menu-title"></div>
                        <button className="btn fa-solid fa-xmark mobile-menu-close" onClick={() => {
                            const menuNav = document.querySelector(".menu"); //Nav tag
                            menuNav.classList.toggle("active");
                            document.querySelector(".menu-overlay").classList.toggle("active");
                        }}></button>
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
                                                        {destinationLandingList?.map((destinationItem, i) => (
                                                            <li key={destinationItem?.id}
                                                                className={`header_country_label ${activeIndex === i ? 'active' : ''}`}
                                                                onMouseEnter={() => handleMouseEnter(i)}
                                                                onMouseLeave={handleMouseLeave}>
                                                                <NavLink href={dynamicLink(destinationItem?.attributes?.destination_code, destinationItem?.id)} as={dynamicLinkas(destinationItem?.attributes?.destination_code, destinationItem?.id)}>
                                                                    {destinationItem?.attributes?.destination_name}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </NavLink>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        {destinationItem?.attributes?.countries?.data.map((destinationCountry, i) => (
                                                                            <li key={destinationCountry?.id}>
                                                                                <NavLink href={dynamicLinkCountry(destinationItem?.attributes?.destination_code, destinationCountry?.attributes?.country_code)}>
                                                                                    {destinationCountry?.attributes?.country_name}
                                                                                </NavLink>
                                                                            </li>
                                                                        ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        ))}
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
                                                        {holidaytypesList?.map((holidaystypesItem, i) => (
                                                            <li key={holidaystypesItem?.id}
                                                                className={`header_country_label ${activeIndexHoliday === i ? 'active' : ''}`}
                                                                onMouseEnter={() => handleMouseEnterHoliday(i)}
                                                                onMouseLeave={handleMouseLeaveHoliday}>
                                                                <NavLink href={dynamicLinkHoliday(holidaystypesItem?.attributes?.holiday_type_group_code, holidaystypesItem?.id)} as={dynamicLinkHolidayas(holidaystypesItem?.attributes?.holiday_type_group_code, holidaystypesItem?.id)}>
                                                                    {holidaystypesItem?.attributes?.holiday_type_group_name}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </NavLink>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        {holidaystypesItem?.attributes?.holiday_types?.data.map((holidaytypesCountry, i) => (
                                                                            <li key={holidaytypesCountry?.id}>
                                                                                <NavLink href={dynamicLinkCountryHoliday(holidaystypesItem?.attributes?.holiday_type_group_code, holidaytypesCountry?.attributes?.holiday_type_code, holidaytypesCountry?.id)}>
                                                                                    {holidaytypesCountry?.attributes?.holiday_type_name}
                                                                                </NavLink>
                                                                            </li>
                                                                        ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        ))}

                                                        {/* <li className="header_country_label">
                                                                <NavLink href={regionWiseUrl + '/holiday-types/incredible-journeys'}>Once In A Lifetime Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </NavLink>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><NavLink href={regionWiseUrl + '/holiday-types/incredible/ultimate-journeys'}>Ultimate Journeys</NavLink></li>
                                                                        <li><NavLink href={regionWiseUrl + '/holiday-types/incredible/ultimate-adventure-holidays'}>Ultimate Adventures</NavLink></li>
                                                                    </ul>
                                                                    <button className="btn header_nav_btn">See all Once In A Lifetime Holidays
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li>

                                                            <li className="header_country_label active">
                                                                <NavLink href={regionWiseUrl + '/holiday-types/incredible-journeys'}>Once In A Lifetime Holidays
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                </NavLink>
                                                                <div className="header_country_list_inr">
                                                                    <ul>
                                                                        <li><NavLink href={regionWiseUrl + '/holiday-types/incredible/ultimate-journeys'}>Ultimate Journeys</NavLink></li>
                                                                        <li><NavLink href={regionWiseUrl + '/holiday-types/incredible/ultimate-adventure-holidays'}>Ultimate Adventures</NavLink></li>
                                                                    </ul>
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
                                                                    </ul>
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
                                                                    </ul>
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
                                                                    <button className="btn header_nav_btn">See all Classic Journeys
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </li> */}
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
                    <button className="btn prmry_btn make_enqury_btn" onClick={makeAnEnquiry}>Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                    {/* <button className="btn prmry_btn make_enqury_btn">
                            <NavLink className="text-white no-underline-link" href="/contact-us">Make an enquiry
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </NavLink>
                        </button> */}
                </div>
            </nav>
        </>
    );
}
