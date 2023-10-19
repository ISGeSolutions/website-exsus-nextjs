import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { userService } from 'services';
import { NavLink } from './../NavLink';
import { Nav, Alert } from 'components';
import { Analytics } from '@vercel/analytics/react';
import React from "react";
import Select from "react-select";
import Head from 'next/head';
// import plusSlides from "public/assets/javascripts/navigation.js";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export { Layout };

function Layout({ children }) {

    const router = useRouter();
    const currentUrl = router.asPath;
    // const regionWiseUrl = '/uk';
    const [regionWiseUrl, setMyVariable] = useState('uk');
    const [selectedRegion, setVariable] = useState('');
    const { ver } = router.query;
    const countries = [
        { value: 'uk', label: 'UK SITE', image: './../../images/uk-flag-round-circle-icon.svg' },
        { value: 'us', label: 'US SITE', image: '/../../images/usa-flag-round-circle-icon.svg' },
        { value: 'asia', label: 'ASIA SITE', image: './../../images/thailand-flag-round-circle-icon.svg' },
        { value: 'in', label: 'INDIA SITE', image: '/../../images/india-flag-round-circle-icon.svg' }
    ];
    const [selected, setSelected] = useState();
    // const { i18n } = useTranslation();

    const isObjectEmpty = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    let region = 'uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            region = window.site_region;
        }
    }

    const handleChange = (selectedOption) => {

        // Do something
        setMyVariable(selectedOption.value);
        setSelected(selectedOption);
        i18n.changeLanguage(selectedOption.value);

        localStorage.setItem('site_region', selectedOption.value);
        window.site_region = selectedOption.value;

        const pathRouter = router.asPath;
        const myArray = pathRouter.split("/");

        var newPath = '';
        myArray.forEach((element, index) => {
            if (index == 0) {
                newPath = element;
            } else if (index == 1) {
                if (myArray.length > 2) {
                    if (element) {
                        newPath = newPath + '/' + selectedOption.value;
                    }
                }
            } else if (index > 1) {
                newPath = newPath + '/' + element;
            }
        });
        router.push(newPath);
        // router.replace('/uk/continent?destinationcode=africa&id=1');
    }

    const handleChange1 = (selectedOption) => {
        this.plusSlides.openLeftNav();
    };

    useEffect(() => {

        $(".header_country_list > ul .header_country_label").on('mouseenter', function (event) {
            $('.header_country_list > ul .header_country_label').removeClass("active");
            $(this).addClass("active");
        });

        $('.header_country_label').click(function () {
            $('.header_country_label').removeClass("responsive_drpdwn_cls");
            $(this).addClass('responsive_drpdwn_cls');
        });
        // setSelected(countries[0]);
        if (ver) {
            const foundPerson = countries.find(person => person.value === ver);
            // console.log('foundPerson', foundPerson);
            const foundPersonBoolean = isObjectEmpty(foundPerson);
            // console.log('foundPersonBoolean', foundPersonBoolean);

            if (!foundPersonBoolean) {
                // handleChange(foundPerson);
                setSelected(foundPerson);
                setMyVariable(foundPerson.value);
                localStorage.setItem('site_region', foundPerson.value);
                window.site_region = foundPerson.value;
            }
        }

        i18n.changeLanguage(region);

    }, [ver, region]);

    return (
        <div>
            <header className="header_blk_row header">
                <Head>
                    {/* <script type="text/javascript" src="/assets/javascripts/navigation.js"></script> */}
                </Head>
                <div className="container">
                    <div className="header_blk_inr">
                        <section className="header_item_left ">
                            <div className="mobile_trigger_btn d-block d-lg-none">
                                <a className="btn-link" href="#" onClick={() => {
                                    document.getElementById('sideMenuLeft').style.width = "100%";
                                }}>
                                    <em className="fa-solid fa-ellipsis">
                                    </em>
                                </a>
                            </div>
                            <div className="side_menu_left" id="sideMenuLeft">
                                <div className="side_menu_hdr">
                                    <button className="btn fa-solid fa-xmark"
                                        onClick={() => {
                                            document.getElementById('sideMenuLeft').style.width = "0";
                                        }}>
                                    </button>
                                </div>
                                <div className="dropdown header_drpdown">
                                    {/* <Select id="long-value-select" 
                                        instanceId="long-value-select"
                                        options={countries}
                                        value={selected}
                                        onChange={handleChange} autoFocus={true}
                                        formatOptionLabel={country => (
                                            <div className="country-option">
                                                <img src={country.image} alt="country-image" />
                                                <span>{country.label}</span>
                                            </div>
                                        )}
                                    /> */}

                                    <Select id="long-value-select" className='react-select-container' style={{ boxShadow: `none !important` }} classNamePrefix="react-select"
                                        instanceId="long-value-select"
                                        options={countries}
                                        value={selected}
                                        defaultValue={countries[0]}
                                        onChange={handleChange} autoFocus={false}
                                        formatOptionLabel={country => (
                                            <div className="country-option">
                                                <img src={country.image} alt="country-image" />
                                                <span>{country.label}</span>
                                            </div>
                                        )}
                                    />

                                    {/* <select className="btn btn-secondary dropdown-toggle" onChange={e => handleRegion(e.target.value)}>
                                        <option className="dropdown-item" value="uk">UK</option>
                                        <option className="dropdown-item" value="us">US</option>
                                        <option className="dropdown-item" value="asia">Asia</option>
                                        <option className="dropdown-item" value="in">India</option>
                                    </select> */}
                                    {/* <select id="id_select2_example" onChange={e => handleRegion(e.target.value)}>
                                        <option data-img_src="images/uk-flag-round-circle-icon.svg">UK site</option>
                                        <option data-img_src="images/usa-flag-round-circle-icon.svg">US site</option>
                                        <option data-img_src="images/thailand-flag-round-circle-icon.svg">Asia site</option>
                                        <option data-img_src="images/india-flag-round-circle-icon.svg">India site</option>
                                    </select> */}
                                    {/* <NavLink className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="main-role-image" src="./../../images/uk-flag-round-circle-icon.svg" alt="united-kingdom-flag-icon" /><span className=' main-role'>
                                            UK site
                                        </span>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink className="dropdown-item" value="uk-uk-flag-round-circle-icon.svg" href="#">
                                                <img src="./../../images/uk-flag-round-circle-icon.svg" alt="usa-flag-round-circle-icon" />
                                                UK site
                                            </NavLink></li>
                                        <li>
                                            <NavLink className="dropdown-item" value="us-usa-flag-round-circle-icon.svg" href="#">
                                                <img src="./../../images/usa-flag-round-circle-icon.svg" alt="usa-flag-round-circle-icon" />
                                                US site
                                            </NavLink></li>
                                        <li><NavLink className="dropdown-item" value="asia" href="#"><img src="./../.././../../images/thailand-flag-round-circle-icon.svg" alt="thailand-flag-round-circle-icon" />Asia site</NavLink></li>
                                        <li><NavLink className="dropdown-item" value="in" href="#"><img src="./../../images/india-flag-round-circle-icon.svg" alt="india-flag-round-circle-icon" />India site</NavLink></li>
                                    </ul> */}
                                </div>
                                <div className="input-group srch_site_box">
                                    <input type="text" className="form-control" placeholder="Search site" aria-label="Search site" aria-describedby="button-addon2" />
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"><span className="material-symbols-outlined">search</span></button>
                                </div>
                            </div>
                        </section>
                        <section className="header_item_center">
                            <h1><NavLink href="/">Exsus<span>Travel</span></NavLink></h1>
                        </section>
                        <section className="header_item_right d-flex d-lg-inline-block justify-content-end align-items-center">
                            <div className="header_call_icn">
                                <NavLink href="tel:020 7337 9010"><em className="material-symbols-outlined">call</em><span className="d-none d-lg-block">020 7337 9010</span></NavLink></div>
                            <div className="mobile_trigger_btn mobile-menu-trigger d-block d-lg-none">
                                <a href="#" onClick={() => {
                                    const menuLayout = document.querySelector(".menu"); //Nav tag
                                    menuLayout.classList.toggle("active");
                                    document.querySelector(".menu-overlay").classList.toggle("active");
                                }}><em className="fa-solid fa-bars"></em></a></div>
                        </section>
                    </div>
                    <Nav />
                    <Alert />
                </div>
            </header>
            <main id="root">{children}</main>
            <Analytics />
            <footer>
                <div className="container">
                    <section className="footer_img_row d-block d-sm-flex">
                        <div className="atol_logo_blk">
                            <img src="/images/abta_new_logo.png" alt="Abta logo" className="img-fluid" />
                            <img src="/images/atol-new-logo.png" alt="Atol logo" className="img-fluid" />
                            <img src="/images/AITO.png" alt="Aito logo" className="img-fluid" />
                            <img src="/images/iata-accredagent.png" alt="Iata logo" className="img-fluid" />
                        </div>
                        <div className="social_icons_blk">
                            <ul>
                                <li>
                                    <NavLink target="_blank" href="https://www.facebook.com/ExsusTravel"><em className="fa-brands fa-facebook-f"></em></NavLink>
                                </li>
                                <li>
                                    <NavLink target="_blank" href="https://twitter.com/Exsustravel/"><em className="fa-brands fa-twitter"></em></NavLink>
                                </li>
                                <li>
                                    <NavLink target="_blank" href="https://www.instagram.com/exsustravel/"><em className="fa-brands fa-instagram"></em>  </NavLink>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="quick_links_row">
                        <div className="row">
                            <div className="col-sm-6 col-md-3 col-lg-3">
                                <div className="quick_links_parnt" aria-label="Services">
                                    <h6>Services</h6>
                                    <ul>
                                        <li><NavLink href="/">Home</NavLink></li>
                                        <li><NavLink href="/contact-us">Contact us</NavLink></li>
                                        <li><NavLink href="/online-enquiry">Online Enquiry</NavLink></li>
                                        <li><NavLink href="/travel_information">Travel Information</NavLink></li>
                                        <li><NavLink href="/coronavirus_information">Coronavirus Information</NavLink></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-3 col-lg-3">
                                <div className="quick_links_parnt" aria-label="More Exsus">
                                    <h6>More Exsus</h6>
                                    <ul>
                                        <li><NavLink href={regionWiseUrl + '/destinations'}>Destinations</NavLink></li>
                                        <li><NavLink href="/holiday-types">Holiday Types</NavLink></li>
                                        <li><NavLink href="/offers">Offers</NavLink></li>
                                        <li><NavLink href="/blog">Blog</NavLink></li>
                                        <li><NavLink href="/when-to-go">When to go</NavLink></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-3 col-lg-3">
                                <div className="quick_links_parnt" aria-label="Exsus Sites">
                                    <h6>Exsus Sites</h6>
                                    <ul>
                                        <li><NavLink href="/?ver=uk" target="_blank">UK</NavLink></li>
                                        <li><NavLink href="/?ver=asia" target="_blank">Asia</NavLink></li>
                                        <li><NavLink href="/?ver=in" target="_blank">India</NavLink></li>
                                        <li><NavLink href="/?ver=us" target="_blank">USA</NavLink></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-3 col-lg-3">
                                <div className="quick_links_parnt" aria-label="About Exsus">
                                    <h6>About Exsus</h6>
                                    <ul>
                                        <li><NavLink href="/about-us">About us</NavLink></li>
                                        <li><NavLink href="/meet-our-travel-experts">Meet our travel experts</NavLink></li>
                                        <li><NavLink href="/career-at-exsus">Careers at Exsus</NavLink></li>
                                        <li><NavLink href="/exsus-referral-scheme">Exsus referral scheme</NavLink></li>
                                        <li><NavLink href="/travel-agent-brochures">Travel agent brochures</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="copyright_info_row d-block d-lg-flex">
                        <p className="copyright_text">&copy; 2022 Exsus Travel. Experts in luxury tailor-made holidays.</p>
                        <div className="prvcy_polcy_list">
                            <ul>
                                <li><NavLink href="/privacy-policy-and-cookies">Privacy policy & cookies</NavLink></li>
                                <li><NavLink href="/website-terms-of-use">Website terms of use</NavLink></li>
                                <li><NavLink href="/booking-terms-and-conditions">Booking terms & conditions</NavLink></li>
                            </ul>
                        </div>
                    </section>

                    <section className="address_blk_row">
                        Exsus Travel Limited t/a Exsus Travel. Registered in England and Wales at this address: 1 Burwood Place, London, W2 2UT. Company No. 3385363. VAT No. 719-221840.
                    </section>

                    <section className="book_with_confidnce_row">
                        <h6>Book with confidence</h6>
                        <p><strong>ATOL</strong>All the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme. When you pay you will be supplied with an ATOL Certificate. Please ask for it and check to ensure that everything you booked (flights, hotels and other services) is listed on it. Please see our booking conditions for further information or for more information about financial protection and the ATOL Certificate go to: <NavLink href="http://www.caa.co.uk" target="_blank">www.caa.co.uk</NavLink></p>
                        <p><strong>ABTA</strong>We are a member of ABTA (ABTA No. Y6561) which means you have the benefit of ABTA’s assistance and Code of Conduct. We provide full financial protection for your money.</p>
                        <p>
                            <strong>International Passenger Protection (IPP)</strong>In accordance with the Passenger protection policy for insolvency cover in respect of the Package Travel & Linked Travel Regulations 2018, all passengers booking with Exsus Travel are fully protected for the initial deposit and subsequently the balance of all monies paid to us, including repatriation costs, arising from cancellation or curtailment of your travel arrangements due to the insolvency of Exsus Travel. There is no requirement for financial protection of day trips, and none is provided. Your booking is insured by IPP Ltd and its panel of insurers. This insurance is only valid for passengers who book and pay directly with Exsus Travel. If you have booked and/or paid direct to a Travel Agent for a holiday with Exsus Travel please request proof of how the booking is secured as this will not be covered by IPP Ltd in this instance.
                            <span className="d-block pt-3"></span>
                            This insurance has been arranged by International Passenger Protection Limited and underwritten by Liberty Mutual Insurance Europe SE. For further information please go to <NavLink href="#">www.ipplondon.co.uk</NavLink>
                            <span className="d-block pt-3"></span>
                            Claims procedure: you must notify IPP as soon as practically possible giving full details of what has happened quoting the name of your Travel Operator to: IPP Claims at Cunningham Lindsey, Oakleigh House, 14-15 Park Place, Cardiff,  CF10 3DQ, United Kingdom. Tel: +44 (0)345 266 1872.
                            <span className="d-block pt-3"></span>
                            Email: <NavLink href="mailto:Insolvency-claims@ipplondon.co.uk">Insolvency-claims@ipplondon.co.uk</NavLink> or online at <NavLink href="http://www.ipplondon.co.uk/claims.as">http://www.ipplondon.co.uk/claims.asp</NavLink>
                        </p>

                    </section>
                </div>

            </footer>
        </div>
    );
}