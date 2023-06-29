import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

var React = require('react');
var ReactDOM = require('react-dom');
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <Layout>
            <section className="banner_blk_row">
            <Carousel showArrows={false} autoPlay={true} infiniteLoop={true} showIndicators={false} showThumbs={false}>
                        <div>
                            <img src="/assets/images/offer_banner01.jpg" />
                        </div>
                        <div>
                            <img src="/assets/images/offer_banner02.jpg" />
                        </div>
                        <div>
                            <img src="/assets/images/offer_banner03.jpg" />
                        </div>
                        <div>
                            <img src="/assets/images/offer_banner04.jpg" />
                        </div>
                        <div>
                            <img src="/assets/images/offer_banner05.jpeg" />
                        </div>
                        <div>
                            <img src="/assets/images/offer_banner06.jpg" />
                        </div>
                        <div>
                            <img src="/assets/images/offer_banner07.jpg" />
                        </div>
                    </Carousel>

                    {/* <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel"> */}

                    {/* <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="4" aria-label="Slide 5"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="5" aria-label="Slide 6"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="6" aria-label="Slide 7"></button>
            </div>
            <div className="carousel-inner">
                <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                    <div className="banner_commn_cls offer_banner01"></div>
                </a>
                <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                    <div className="offer_banner02 banner_commn_cls"></div>
                </a>
                <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                    <div className="offer_banner03 banner_commn_cls"></div>
                </a>           
                <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                    <div className="offer_banner04 banner_commn_cls"></div>
                </a>           
                <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                    <div className="offer_banner05 banner_commn_cls"></div>
                </a>           
                <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                    <div className="offer_banner06 banner_commn_cls"></div>
                </a>           
                <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                    <div className="offer_banner07 banner_commn_cls"></div>
                </a>           
            </div> */}
                {/* </div> */}
            </section>

            <section className="card_blk_row destinations_blk_row light_grey">
                <div className="container-md">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li>Special offers</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="destinations_cntnt_blk">
                            <h2>LUXURY HOLIDAY OFFERS</h2>
                            <p>These are just a few of our favourite offers, all over the world, including luxury short breaks, perfect beach holidays, exceptional wildlife and safari holidays and memorable family adventures. Contact us to find out more. </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card_blk_row destinations_blk_row pb-0">
                <div className="container-md">
                    <div className="row">
                        <div className="col-12 favrites_blk_row pb-0">
                            <h3 className="title_cls pb-0">Our favourite special offers on luxury holidays</h3>
                            <div className="destination_contries_filter d-flex justify-content-around">
                                <ul>
                                    <li><a href="#" className="active">Exsus recommends</a></li>
                                    <li><a href="#">Alphabetical</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                <div className="container-md">
                    <div className="card_slider_row">
                        <div className="carousel00 width_100">
                            <div className="row">
                                <div className="col-sm-6 col-lg-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="images/offer_card01.png" alt="offer_card01" className="img-fluid" />
                                                <span className="img_specl_offer">Special offer</span>
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">ROSEWOOD MAYAKOBA</a></h4>
                                                <ul>
                                                    <li>Location: Riviera Maya | Mexico</li>
                                                    <li>Price guide:<span tabindex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                    <li className="pink_text">Special offer: Stay 7 nights for the price of 6 plus enjoy a complimentary room upgrade.</li>
                                                    <li>Best for:<span>Luxury Hotel, Setting & Views, Beach, Family-friendly</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn justify-content-end">
                                                <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="images/offer_card02.jpg" alt="offer_card02" className="img-fluid" />
                                                <span className="img_specl_offer">Special offer</span>
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">SUGAR BEACH, A VICEROY RESORT</a></h4>
                                                <ul>
                                                    <li>Location: St Lucia</li>
                                                    <li>Price guide:<span tabindex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                    <li className="pink_text">Special offer: Save up to 25% on rooms and more!</li>
                                                    <li>Best for:<span>Beach, Setting & Views, Snorkelling & Diving, Family-friendly</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn justify-content-end">
                                                <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="images/offer_card03.jpg" alt="offer_card03" className="img-fluid" />
                                                <span className="img_specl_offer">Special offer</span>
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">CALABASH</a></h4>
                                                <ul>
                                                    <li>Location: Grenada</li>
                                                    <li>Price guide:<span tabindex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                    <li className="pink_text">Special offer: Enjoy a complimentary half-board upgrade</li>
                                                    <li>Best for:<span>Beach, Eco-tourism, Service & Hospitality, Snorkelling & Diving</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn justify-content-end">
                                                <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="images/offer_card04.jpg" alt="offer_card04" className="img-fluid" />
                                                <span className="img_specl_offer">Special offer</span>
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">RAFFLES SEYCHELLES</a></h4>
                                                <ul>
                                                    <li>Location: Seychelles</li>
                                                    <li>Price guide:<span tabindex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                    <li className="pink_text">Special offer: Enjoy complimentary half-board.</li>
                                                    <li>Best for:<span>Beach, Family-friendly, Food & Wine, Honeymoon</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn justify-content-end">
                                                <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="images/offer_card05.jpg" alt="offer_card05" className="img-fluid" />
                                                <span className="img_specl_offer">Special offer</span>
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">AMILLA MALDIVES RESORT & RESIDENCES</a></h4>
                                                <ul>
                                                    <li>Location: Maldives</li>
                                                    <li>Price guide:<span tabindex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                    <li className="pink_text">Special offer: Save up to 30% on rooms plus complimentary half-board and discounted transfers!</li>
                                                    <li>Best for:<span> Beach, Chic Design, Family-friendly, Food & Wine</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn justify-content-end">
                                                <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="make_enqury_row">
                <div className="container-md">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
                    <button className="btn prmry_btn make_enqury_btn">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container-md">
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
