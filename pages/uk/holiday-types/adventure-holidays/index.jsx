import { useState, useEffect } from 'react';
import Iframe from 'react-iframe'
import { Layout } from 'components/users';
import { userService, holidaytypesService } from 'services';
import Head from 'next/head';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    const [holidaytypesDetails, setHolidaytypesDetails] = useState();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [valueWithBr, setnewValueWithBr] = useState('');
    const [headingText, setHeadingText] = useState('LUXURY SAFARI HOLIDAYS IN AFRICA');

    const selectedSec = (itemId) => {
        // console.log('itemId', itemId);
        var text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        if (itemId == 'overview') {
            text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        } else if (itemId == 'countries') {
            text = "COUNTRIES IN AFRICA";
        } else if (itemId == 'itineraries') {
            text = "TAILOR-MADE AFRICA HOLIDAY ITINERARIES";
        } else if (itemId == 'places_to_stay') {
            text = "PLACES TO STAY IN AFRICA";
        } else {
            text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        }
        setHeadingText(text)
        // LUXURY SAFARI HOLIDAYS IN AFRICA
        // COUNTRIES IN AFRICA
        // TAILOR-MADE AFRICA HOLIDAY ITINERARIES
        // PLACES TO STAY IN AFRICA
        // EXPERIENCES IN AFRICA
    };

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
        holidaytypesService.getHolidaytypeDetails().then(x => {
            console.log('getHolidaytypesDetails', x);
            setHolidaytypesDetails(x.data.attributes);
            // const lines = x.data.attributes?.overview_text.split('\n');
            // console.log('lines', lines);
            const oldText = x.data.attributes?.overview_text;
            var newValueWithBr = oldText?.replace(/\n/g, "<br />");
            setnewValueWithBr(newValueWithBr);
            console.log('x.data.attributes.holiday_type_images.data[0].attributes.image_path2', 'https://d33ys3jnmuivbg.cloudfront.net/ilimages/' + x.data.attributes.holiday_type_images.data[0].attributes.image_path);
            setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data.attributes.holiday_type_images.data[0].attributes.image_path);
            // setDestinationLandingDetails(x)
        });
    }, []);

    return (
        <>
            <Head>
                <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script>
            </Head>
            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            {/* {backgroundImage} */}                            
                            <div className="banner_commn_cls"> {/*  holiday_types_detls_banner */}
                            <img src={backgroundImage} alt="holiday_types_detls_card02" className="img-fluid" />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="banner_map_blk">
                    {/* <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin"
                        width="640px"
                        height="320px"
                        id=""
                        className=""
                        display="block"
                        position="relative" /> */}

                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                </div>
            </section>

            <section className="destination_tab_row light_grey">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="holiday_types_landing.html">Holiday Types</a></li>
                            <li>{headingText}</li>
                        </ul>
                    </div>

                    <div className="destination_tab_inr">
                        <h2 className="tab_tilte">ONCE IN A LIFETIME HOLIDAYS</h2>
                        <div className="destinations_cntnt_blk destination_para pt-0">
                            <div dangerouslySetInnerHTML={{ __html: valueWithBr }} />
                            {/* <p>Everyone’s definition of a dream trip is different.</p>
                            <p>Whether you are after the big one, the holiday that you have always dreamed of but never went on, or want an adventure that leaves nothing out, we are ready to help - how about dinner with a geisha in Japan, an oceanfront lodge only reached by boat in Costa Rica, a helicopter ride over New Zealand’s stunning scenery or a luxurious cross country train journey with unparalleled views of South Africa.</p>
                            <p>Whatever a 'once-in-a-lifetime' holiday or honeymoon means to you, our experts can create a totally tailor-made luxury experience that perfectly satisfies your wishlist.</p>
                            <p>All our itineraries are designed as inspiration. Tell us what you're after on your trip and we'll help you select the best hotels and experiences.</p> */}
                        </div>
                    </div>

                    <section className="favrites_blk_row favrites_blk_small_card_row">
                        <div className="container">
                            <h3 className="title_cls">DISCOVER YOUR ONCE IN A LIFETIME HOLIDAY</h3>
                            <div className="row">
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="holiday_types_card">
                                        <a href="#">
                                            <div className="holiday_types_card_img">
                                                <img src="./../../images/holiday_types_detls_card01.jpg" alt="holiday_types_detls_card01" className="img-fluid" />
                                            </div>
                                            <h4>
                                                Ultimate Journeys
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="holiday_types_card">
                                        <a href="#">
                                            <div className="holiday_types_card_img">
                                                <img src="./../../images/holiday_types_detls_card02.jpg" alt="holiday_types_detls_card02" className="img-fluid" />
                                            </div>
                                            <h4>
                                                Ultimate Adventures
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="holiday_types_card">
                                        <a href="#">
                                            <div className="holiday_types_card_img">
                                                <img src="./../../images/holiday_types_detls_card03.jpg" alt="holiday_types_detls_card03" className="img-fluid" />
                                            </div>
                                            <h4>See all
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section className="favrites_blk_row">
                <div className="container">
                    <h3 className="title_cls">ONCE IN A LIFETIME HOLIDAY IDEAS</h3>
                    <div className="card_slider_row">
                        <i id="left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                        </i>
                        <div className="carousel00">
                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="./../../images/holiday_types_slider01.jpg" alt="holiday_types_slider01" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt">
                                        <h4>Take Flight To Antarctica</h4>
                                        <ul>
                                            <li>Antarctica By Plane And Boat</li>
                                            <li>Chile, Antarctica</li>
                                            <li>10 nights</li>
                                            <li>Best for:<span>Wildlife & Nature, Adventure, Educational, Off the Beaten Track</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end">
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="./../../images/holiday_types_slider02.jpg" alt="holiday_types_slider02" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>Epic Iceland</h4>
                                        <ul>
                                            <li>The Ultimate Luxury Holiday To Iceland</li>
                                            <li>Iceland</li>
                                            <li>9 nights</li>
                                            <li>From £19,850 per person</li>
                                            <li>Best for:<span>Seriously special, Multi-activity, Landscapes & Scenery, Luxury Hotel</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end">
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="./../../images/holiday_types_slider03.jpg" alt="holiday_types_slider03" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>From the Rockies to the Last Frontier</h4>
                                        <ul>
                                            <li>Canada & Alaska by Rail and Sea</li>
                                            <li>Canada</li>
                                            <li>18 nights</li>
                                            <li>From £9,250 per person</li>
                                            <li>Best for:<span>Cruise, Landscapes & Scenery, Train Journey, Wildlife & Nature</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end">
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="./../../images/holiday_types_slider04.jpg" alt="holiday_types_slider04" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>Andalucia Past & Present</h4>
                                        <ul>
                                            <li>Cultural Journey to Seville, Cordoba and Granada</li>
                                            <li>Spain</li>
                                            <li>6 nights</li>
                                            <li>From £1,950 per person</li>
                                            <li>Best for:<span>History & Heritage, First-timers, Cultural Immersion, Educational</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end">
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <i id="right">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </i>
                    </div>
                    <div className="mt-5">
                        <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase">More itineraries in Once In A Lifetime Holidays<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="full_loader_parnt_blk loader_parnt_blk" style={{ display: 'none' }}><div className="loader-circle-2"></div></div>
            </section>

            <section className="make_enqury_row">
                <div className="container">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
                    <button className="btn prmry_btn make_enqury_btn">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <form className="newslettr_form d-block d-sm-flex">
                        <div className="newlettr_inpt">
                            <input type="text" className="form-control" placeholder="Full name and title" />
                        </div>
                        <div className="newlettr_inpt ps-0 ps-sm-2">
                            <input type="email" className="form-control" placeholder="Your email address" />
                        </div>
                        <div className="newlettr_btn ps-0 ps-sm-2">
                            <button type="submit" className="btn btn-primary prmry_btn">Sign up
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

        </>
    );
}
