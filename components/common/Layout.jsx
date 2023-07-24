import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { userService } from 'services';
import { NavLink } from './../NavLink';
import { Nav, Alert } from 'components';
import { Analytics } from '@vercel/analytics/react';
import React from "react";

export { Layout };

function Layout({ children }) {

    const router = useRouter();
    const currentUrl = router.asPath;
    // const regionWiseUrl = '/uk';
    const [regionWiseUrl, setMyVariable] = useState('/uk');
    const [selectedRegion, setVariable] = useState('');

    const handleRegion = (regionWiseUrl) => {
        // Do something

        console.log('This is a test', regionWiseUrl);

        localStorage.setItem('site_region', regionWiseUrl);
        window.site_region = regionWiseUrl;

        setMyVariable(regionWiseUrl);

        const pathRouter = router.asPath;
        const myArray = pathRouter.split("/");

        // console.log('myArray2', myArray);

        var newPath = '';
        myArray.forEach((element, index) => {
            if (index == 0) {
                newPath = element;
            } else if (index == 1) {
                if (myArray.length > 2) {
                    if (element) {
                        newPath = newPath + '/' + regionWiseUrl;
                    }
                }
            } else if (index > 1) {
                newPath = newPath + '/' + element;
            }
        });
        router.push(newPath);
    }

    useEffect(() => {

        function custom_template(obj) {
            var data = $(obj.element).data();
            var text = $(obj.element).text();
            if (data && data['img_src']) {
                var img_src = data['img_src'];
                var template = $("<div><img src=\"" + img_src + "\"/><p>" + text + "</p></div>");
                return template;
            }
        }

        var aScript = document.createElement('script');
        aScript.type = 'text/javascript';
        aScript.src = "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.js";

        document.head.appendChild(aScript);
        aScript.onload = () => {


            var options = {
                'templateSelection': custom_template,
                'templateResult': custom_template,
            }
            $('#id_select2_example').select2(options);
            $('.select2-container--default .select2-selection--single').css({ 'height': '220px' });

        };


        // redirect to home if already logged in
        // if (userService.userValue) {
        //     router.push('/');
        // }

        // const pathRouter = router.asPath;
        // const myArray = pathRouter.split("/");

        // console.log('myArray2', myArray);

        // myArray.forEach((element, index) => {
        //     if (index == 1) {
        //         if (element) {
        // console.log('element', element);
        // localStorage.setItem('site_region', element);
        // window.site_region = element;
        // setVariable(element);
        // setMyVariable(element);
        //         }
        //     }
        // });

        // if (typeof localStorage !== 'undefined') {
        //     if (localStorage.getItem("site_region") != null) {
        //         const selectedRegion = localStorage.getItem("site_region");
        //         console.log('selectedRegion22', selectedRegion);
        //         setVariable(selectedRegion);
        //         // setMyVariable(selectedRegion);
        //     }
        // }

        // const currentUrl1 = router.asPath;

        // $('li').click(function () {
        //your code
        // console.log('this is second test');
        // console.log($(this).text());

        // main-role
        // console.log('test1', $('.main-role').text());
        // console.log('test2', $('.main-role-image').attr('src'));

        // const selected_country = $(this).text();

        // let image_path;
        // let handle_region_value;
        // if (selected_country == 'UK site') {
        //     image_path = "./../../../../images/uk-flag-round-circle-icon.svg";
        //     handle_region_value = 'uk';
        //     $('.main-role-image').attr('src', image_path);
        //     $('.main-role').text($(this).text());
        // } else if (selected_country == 'US site') {
        //     image_path = "./../../../../images/usa-flag-round-circle-icon.svg";
        //     handle_region_value = 'us';
        //     $('.main-role-image').attr('src', image_path);
        //     $('.main-role').text($(this).text());
        // } else if (selected_country == 'Asia site') {
        //     image_path = "./../.././../../images/thailand-flag-round-circle-icon.svg";
        //     handle_region_value = 'asia';
        //     $('.main-role-image').attr('src', image_path);
        //     $('.main-role').text($(this).text());
        // } else if (selected_country == 'India site') {
        //     image_path = "./../../../../images/india-flag-round-circle-icon.svg";
        //     handle_region_value = 'in';
        //     $('.main-role-image').attr('src', image_path);
        //     $('.main-role').text($(this).text());
        // }

        // this.handleRegion('handle_region_value');

        // console.log('handle_region_value', handle_region_value);
        // console.log('currentUrl', currentUrl);

        // if (handle_region_value) {
        //     // regionWiseUrl = handle_region_value;
        //     localStorage.setItem('site_region', handle_region_value);
        //     window.site_region = handle_region_value;
        //     setMyVariable(handle_region_value);
        //     const pathRouter = router.asPath;
        //     const myArray = pathRouter.split("/");
        //     // console.log('myArray2', myArray);
        //     var newPath = '';
        //     myArray.forEach((element, index) => {
        //         if (index == 0) {
        //             newPath = element;
        //         } else if (index == 1) {
        //             if (myArray.length > 2) {
        //                 if (element) {
        //                     newPath = newPath + '/' + handle_region_value;
        //                 }
        //             }
        //         } else if (index > 1) {
        //             newPath = newPath + '/' + element;
        //         }
        //     });
        //     // console.log('newPath', newPath);
        //     router.push(newPath);      

        //     router.events.on("routeChangeError", (err, url, { shallow }) => {
        //         console.log("Navigating to: " + "url: " + url, {cancelled: err.cancelled} )
        //     });

        // }

        // var oldSrc = 'http://example.com/smith.gif';
        // var newSrc = 'http://example.com/johnson.gif';
        // $('img[src="' + oldSrc + '"]').attr('src', newSrc);
        // $('li').value($(this).text());
        // return false;
        // });
    },
        [, [router.asPath]]);

    return (
        <div className="">
            <header className="header_blk_row header">
                <div className="container">
                    <div className="header_blk_inr">
                        <section className="header_item_left ">
                            <div className="mobile_trigger_btn d-block d-lg-none"><NavLink href="#"><em className="fa-solid fa-ellipsis"></em></NavLink></div>
                            <div className="side_menu_left" id="sideMenuLeft">
                                <div className="side_menu_hdr">
                                    <button className="btn fa-solid fa-xmark"></button>
                                </div>
                                <div className="dropdown header_drpdown">
                                    <select className="btn btn-secondary dropdown-toggle" onChange={e => handleRegion(e.target.value)}>
                                        <option className="dropdown-item" value="uk">UK</option>
                                        <option className="dropdown-item" value="us">US</option>
                                        <option className="dropdown-item" value="asia">Asia</option>
                                        <option className="dropdown-item" value="in">India</option>
                                    </select>
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
                            <div className="header_call_icn"><NavLink href="#"><em className="material-symbols-outlined">call</em><span className="d-none d-lg-block">020 7337 9010</span></NavLink></div>
                            <div className="mobile_trigger_btn mobile-menu-trigger d-block d-lg-none"><NavLink href="#"><em className="fa-solid fa-bars"></em></NavLink></div>
                        </section>
                    </div>
                    <Nav />
                    <Alert />
                </div>
            </header>
            {/* <header className="header_blk_row header">
                <div className="container-md">
                    <div className="header_blk_inr">
                        <section className="header_item_left ">
                            <div className="mobile_trigger_btn d-block d-lg-none" onClick={() => openLeftNav()}><NavLink href="#"><em className="fa-solid fa-ellipsis"></em></NavLink></div>
                            <div className="side_menu_left" id="sideMenuLeft">
                                <div className="side_menu_hdr">
                                    <button className="btn fa-solid fa-xmark" onClick={() => closeLeftNav()}></button>
                                </div>
                                <div className="dropdown header_drpdown">
                                    <NavLink className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="./../../images/uk-flag-round-circle-icon.svg" alt="united-kingdom-flag-icon" />UK site
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" href="#"><img src="./../../images/usa-flag-round-circle-icon.svg" alt="usa-flag-round-circle-icon" />US site</NavLink></li>
                                        <li><NavLink className="dropdown-item" href="#"><img src="./../.././../../images/thailand-flag-round-circle-icon.svg" alt="thailand-flag-round-circle-icon" /> Asia site</NavLink></li>
                                        <li><NavLink className="dropdown-item" href="#"><img src="./../../images/india-flag-round-circle-icon.svg" alt="india-flag-round-circle-icon" />India site</NavLink></li>
                                    </ul>
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
                            <div className="header_call_icn"><NavLink href="#"><em className="material-symbols-outlined">call</em><span className="d-none d-lg-block">020 7337 9010</span></NavLink></div>
                            <div className="mobile_trigger_btn mobile-menu-trigger d-block d-lg-none"><NavLink href="#"><em className="fa-solid fa-bars"></em></NavLink></div>
                        </section>
                    </div>
                    <Nav />
                    <Alert />
                </div>
            </header> */}
            {children}
            <Analytics />
            <footer>
                <div className="container-md">
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
                                        <li><NavLink href="/blogs">Blog</NavLink></li>
                                        <li><NavLink href="/when-to-go">When to go</NavLink></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-3 col-lg-3">
                                <div className="quick_links_parnt" aria-label="Exsus Sites">
                                    <h6>Exsus Sites</h6>
                                    <ul>
                                        <li><NavLink href="/country_details">UK</NavLink></li>
                                        <li><NavLink href="/country_details">Asia</NavLink></li>
                                        <li><NavLink href="/country_details">India</NavLink></li>
                                        <li><NavLink href="/country_details">USA</NavLink></li>
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