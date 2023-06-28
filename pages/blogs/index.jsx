import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <Layout>
            <section class="banner_blk_row">
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <a href="#" target="_blank" class="carousel-item active" data-bs-interval="5000">
                    <div class="banner_commn_cls blog_banner01"></div>
                </a>
                <a href="#" target="_blank" class="carousel-item" data-bs-interval="5000">
                    <div class="blog_banner02 banner_commn_cls"></div>
                </a>
                <a href="#" target="_blank" class="carousel-item" data-bs-interval="5000">
                    <div class="blog_banner03 banner_commn_cls"></div>
                </a>           
            </div>
        </div> 
    </section>

    <section class="card_blk_row destinations_blk_row light_grey">
        <div class="container-md">
            <div class="bookmark_row">
                <ul>
                    <li><a href="homepage.html">Home</a></li>
                    <li>Blog</li>
                </ul>
            </div>
            <div class="destinations_cntnt_blk">
                <h2>OUR TRAVEL BLOG</h2>
                <p>Be inspired by our blog posts, written by our travel experts from all around the world and drawing on their discoveries and first-hand experiences, from Africa to Antarctica. Escape the obvious with Exsus Travel.</p>
            </div>
            <div class="row">
                <div class="col-sm-8 col-lg-6 m-auto mt-3">
                    <div class="country_highlight_row mb-0">
                        <div class="country_highlight_inr text-center">
                            <p>SIGN UP TO RECEIVE OUR NEWSLETTER</p>
                            <button class="btn prmry_btn blog_sign_up_btn" onclick="window.open('contact_us.html')">Sign up
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
        <div class="container-md">
            <h3 class="title_cls">Search our blog</h3>
            <div class="card_slider_row">
                <div class="carousel00">
                    <div class="row">                                    
                        <div class="col-12">
                            <div class="destination_dropdwn_row d-block d-md-flex">
                                <div class="banner_dropdwn_blk">
                                    <div class="select_drpdwn">
                                        <select class="selectpicker" multiple aria-label="Filter by country" data-live-search="true">
                                            <option selected="">Filter by country</option>
                                            <option value="Asia">Asia</option>
                                            <option value="Hong Kong & Macau">Hong Kong & Macau</option>
                                            <option value="Malaysia & Borneo">Malaysia & Borneo</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Cambodia">Cambodia</option>
                                            <option value="Vietnam">Vietnam</option>
                                            <option value="China">China</option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="Burma">Burma</option>
                                            <option value="Laos">Laos</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="banner_dropdwn_blk ps-0 ps-md-2">
                                    <div class="select_drpdwn">
                                        <select class="selectpicker" multiple aria-label="Filter by property type" data-live-search="true">
                                            <option selected="">Filter by property type</option>
                                            <option value="Everything">Everything</option>
                                            <option value="Barefoot">Barefoot</option>
                                            <option value="Beach">Beach</option>
                                            <option value="Boutique hotel">Boutique hotel</option>
                                            <option value="Chic design">Chic design</option>
                                            <option value="Cultural Immersion">Cultural Immersion</option>
                                            <option value="Eco tourism">Eco tourism</option>
                                            <option value="Family-Friendly">Family-Friendly</option>
                                            <option value="Food & Wine">Food & Wine</option>
                                            <option value="Guiding">Guiding</option>
                                            <option value="Hideaway">Hideaway</option>
                                            <option value="Honeymoon">Honeymoon</option>
                                            <option value="Lodge">Lodge</option>
                                            <option value="Luxury hotel">Luxury Hotel</option>
                                            <option value="Off the beaten track">Off the beaten track</option>
                                            <option value="Owner run">Owner run</option>
                                            <option value="Peace & quiet">Peace & quiet</option>
                                            <option value="Private groups">Private groups</option>
                                            <option value="Romantic">Romantic</option>
                                            <option value="Rustic">Rustic</option>
                                            <option value="Seriously special">Seriously special</option>
                                            <option value="Service & Hospitality">Service & Hospitality</option>
                                            <option value="Setting & Views">Setting & Views</option>
                                            <option value="Snorkelling & Driving">Snorkelling & Driving</option>
                                            <option value="Spa & Wellness">Spa & Wellness</option>
                                            <option value="Unusal">Unusal</option>
                                            <option value="Village life">Village life</option>
                                            <option value="Walking & trekking">Walking & trekking</option>
                                            <option value="Water activities">Water activities</option>
                                            <option value="Wildlife & Nature">Wildlife & Nature</option>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Couples">Couples</option>
                                            <option value="Educational">Educational</option>
                                            <option value="Multi-activity">Multi-activity</option>
                                            <option value="Teenagers">Teenagers</option>
                                            <option value="Landscapes & Scenery">Landscapes & Scenery</option>
                                            <option value="City hotel">City hotel</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="banner_dropdwn_blk ps-0 ps-md-2">
                                    <div class="select_drpdwn">
                                        <select class="selectpicker" multiple aria-label="Filter by month" data-live-search="true">
                                            <option selected="">Filter by month</option>
                                            <option value="All months">All months</option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="banner_inspire_btn ps-0 ps-md-2">
                                    <button type="button" class="btn btn-primary prmry_btn">Inspire me
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="destination_filter_result d-block d-lg-flex">
                                <p>We've found 77 holiday ideas in Asia for you</p>
                                <div class="destination_contries_filter d-inline-block d-lg-flex">
                                    <label class="pt-2 pt-lg-0">Arrange by:</label>
                                    <ul class="d-inline-block d-lg-flex pt-2 pt-lg-0">
                                        <li><a href="#" class="active">Recommended</a></li>
                                        <li><a href="#">By date</a></li>
                                    </ul>
                                </div>                                    
                            </div>
                        </div>

                        <div class="col-sm-6 col-lg-4">
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog01.jpg" alt="blog01" class="img-fluid" />
                                    <h4>Luxury Family Safaris in Africa - Favourite</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog02.jpg" alt="blog02" class="img-fluid" />
                                    <h4>Luxury Land-based Holidays in the Galapagos</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog03.jpg" alt="blog03" class="img-fluid" />
                                    <h4>Top Ten Wildlife in the Galapagos</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog04.jpg" alt="blog04" class="img-fluid" />
                                    <h4>Our Favourite Peru Honeymoon Destinations</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6 col-lg-4">
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog05.jpg" alt="blog05" class="img-fluid" />
                                    <h4>Luxury Family Holidays in the Galapagos</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <h4>Luxury Caribbean Beach Holidays</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <h4>Top Ten Wildlife in the Galapagos</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <h4>Our Favourite Peru Honeymoon Destinations</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6 col-lg-4">
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <h4>Bespoke Luxury Holidays</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog06.jpg" alt="blog06" class="img-fluid" />
                                    <h4>Luxury Safari Holidays</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog07.jpg" alt="blog07" class="img-fluid" />
                                    <h4>Luxury Spa Holidays</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                            <div class="blog_cnt_inr">
                                <a href="#">
                                    <img src="images/blog04.jpg" alt="blog08" class="img-fluid" />
                                    <h4>Boutique Europe Hotels</h4>
                                    <span class="btn-primary prmry_btn">Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div class="col-12">
                            <button class="btn prmry_btn make_enqury_btn mx-auto text-uppercase">Load more
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 266.77"><path fill-rule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"></path></svg>
                            </button>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </section>

    <section class="make_enqury_row">
        <div class="container-md">
            <h3>YOUR JOURNEY STARTS HERE</h3>
            <p>call us on 020 7337 9010 to start planning your perfect trip</p>
            <button class="btn prmry_btn make_enqury_btn" onclick="window.open('contact_us.html')">Make an enquiry
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
            </button>
        </div>
    </section>

    <section aria-label="Sign up for newsletter" class="newslettr_row">
        <div class="container-md">
            <h4>Sign up for our newsletter</h4>
            <h5>Receive our latest news and special offers</h5>
            <form class="newslettr_form d-block d-sm-flex">
                <div class="newlettr_inpt">
                    <input type="text" class="form-control" placeholder="Full name and title" />
                </div>
                <div class="newlettr_inpt ps-0 ps-sm-2">
                    <input type="email" class="form-control" placeholder="Your email address" />
                </div>
                <div class="newlettr_btn ps-0 ps-sm-2">
                    <button type="submit" class="btn btn-primary prmry_btn">Sign up
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                    </button>
                </div>
                </form>
        </div>
    </section>
        </Layout>
    );
}








