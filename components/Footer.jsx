import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

import * as React from 'react';

import { store, useGlobalState } from 'state-pool';


export { Footer };

function Footer() {
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

        <footer>
            <div className="container">
                <section className="footer_img_row d-block d-sm-flex">
                    <div className="atol_logo_blk">
                        <img src="images/abta_new_logo.png" alt="Abta logo" className="img-fluid" />
                        <img src="images/atol-new-logo.png" alt="Atol logo" className="img-fluid" />
                        <img src="images/AITO.png" alt="Aito logo" className="img-fluid" />
                        <img src="images/iata-accredagent.png" alt="Iata logo" className="img-fluid" />
                    </div>
                    <div className="social_icons_blk">
                        <ul>
                            <li>
                                <a target="_blank" href="https://www.facebook.com/ExsusTravel"><em className="fa-brands fa-facebook-f"></em></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://twitter.com/Exsustravel/"><em className="fa-brands fa-twitter"></em></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.instagram.com/exsustravel/"><em className="fa-brands fa-instagram"></em>  </a>
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
                                    <li><a href="homepage.html">Home</a></li>
                                    <li><a href="#">Contact us</a></li>
                                    <li><a href="#">Online Enquiry</a></li>
                                    <li><a href="travel_information.html">Travel Information</a></li>
                                    <li><a href="coronavirus_information.html">Coronavirus Information</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="quick_links_parnt" aria-label="More Exsus">
                                <h6>More Exsus</h6>
                                <ul>
                                    <li><a href="#">Destinations</a></li>
                                    <li><a href="#">Holiday Types</a></li>
                                    <li><a href="#">Offers</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">When to go</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="quick_links_parnt" aria-label="Exsus Sites">
                                <h6>Exsus Sites</h6>
                                <ul>
                                    <li><a href="#">UK</a></li>
                                    <li><a href="#">Asia</a></li>
                                    <li><a href="#">India</a></li>
                                    <li><a href="#">USA</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="quick_links_parnt" aria-label="About Exsus">
                                <h6>About Exsus</h6>
                                <ul>
                                    <li><a href="about_us.html">About us</a></li>
                                    <li><a href="#">Meet our travel experts</a></li>
                                    <li><a href="#">Careers at Exsus</a></li>
                                    <li><a href="#">Exsus referral scheme</a></li>
                                    <li><a href="#">Travel agent brochures</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="copyright_info_row d-block d-lg-flex">
                    <p className="copyright_text">&copy; 2022 Exsus Travel. Experts in luxury tailor-made holidays.</p>
                    <div className="prvcy_polcy_list">
                        <ul>
                            <li><a href="#">Privacy policy & cookies</a></li>
                            <li><a href="#">Website terms of use</a></li>
                            <li><a href="#">Booking terms & conditions</a></li>
                        </ul>
                    </div>
                </section>

                <section className="address_blk_row">
                    Exsus Travel Limited t/a Exsus Travel. Registered in England and Wales at this address: 1 Burwood Place, London, W2 2UT. Company No. 3385363. VAT No. 719-221840.
                </section>

                <section className="book_with_confidnce_row">
                    <h6>Book with confidence</h6>
                    <p><strong>ATOL</strong>All the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme. When you pay you will be supplied with an ATOL Certificate. Please ask for it and check to ensure that everything you booked (flights, hotels and other services) is listed on it. Please see our booking conditions for further information or for more information about financial protection and the ATOL Certificate go to: <a href="http://www.caa.co.uk" target="_blank">www.caa.co.uk</a></p>

                    <p><strong>ABTA</strong>We are a member of ABTA (ABTA No. Y6561) which means you have the benefit of ABTA’s assistance and Code of Conduct. We provide full financial protection for your money.</p>

                    <p>
                        <strong>International Passenger Protection (IPP)</strong>In accordance with the Passenger protection policy for insolvency cover in respect of the Package Travel & Linked Travel Regulations 2018, all passengers booking with Exsus Travel are fully protected for the initial deposit and subsequently the balance of all monies paid to us, including repatriation costs, arising from cancellation or curtailment of your travel arrangements due to the insolvency of Exsus Travel. There is no requirement for financial protection of day trips, and none is provided. Your booking is insured by IPP Ltd and its panel of insurers. This insurance is only valid for passengers who book and pay directly with Exsus Travel. If you have booked and/or paid direct to a Travel Agent for a holiday with Exsus Travel please request proof of how the booking is secured as this will not be covered by IPP Ltd in this instance.
                        <span className="d-block pt-3"></span>
                        This insurance has been arranged by International Passenger Protection Limited and underwritten by Liberty Mutual Insurance Europe SE. For further information please go to <a href="#">www.ipplondon.co.uk</a>
                        <span className="d-block pt-3"></span>
                        Claims procedure: you must notify IPP as soon as practically possible giving full details of what has happened quoting the name of your Travel Operator to: IPP Claims at Cunningham Lindsey, Oakleigh House, 14-15 Park Place, Cardiff,  CF10 3DQ, United Kingdom. Tel: +44 (0)345 266 1872.
                        <span className="d-block pt-3"></span>
                        Email: <a href="mailto:Insolvency-claims@ipplondon.co.uk">Insolvency-claims@ipplondon.co.uk</a> or online at <a href="http://www.ipplondon.co.uk/claims.as">http://www.ipplondon.co.uk/claims.asp</a>
                    </p>

                </section>

            </div>
        </footer>
    );
}