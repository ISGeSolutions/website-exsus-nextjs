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
                    </div>
                    <div class="carousel-inner">
                        <a href="#" target="_blank" class="carousel-item active" data-bs-interval="5000">
                            <div class="banner_commn_cls holiday_types_banner"></div>
                        </a>
                    </div>
                </div>
                <div class="banner_dropdwn_row">
                    <div class="container-md">
                        <div class="banner_dropdwn_inr d-block d-md-flex">
                            <div class="banner_dropdwn_blk">
                                <div class="select_drpdwn">
                                    <select class="form-select" aria-label="Choose a destination">
                                        <option selected>Choose a destination</option>
                                        <option value="Asia">Asia</option>
                                        <option value="Europe">Europe</option>
                                        <option value="South America">South America</option>
                                        <option value="Indian Subcontinent">Indian Subcontinent</option>
                                        <option value="North America & Caribbean">North America & Caribbean</option>
                                        <option value="Africa">Africa</option>
                                        <option value="Central America">Central America</option>
                                        <option value="Australasia & South Pacific">Australasia & South Pacific</option>
                                        <option value="Middle East & North Africa">Middle East & North Africa</option>
                                        <option value="Indian ocean">Indian ocean</option>
                                    </select>
                                </div>
                            </div>
                            <div class="banner_dropdwn_blk ps-0 ps-md-2">
                                <div class="select_drpdwn">
                                    <select class="form-select" aria-label="Choose a reason">
                                        <option selected>Choose a reason</option>
                                        <option value="Adventure Holidays">Adventure Holidays</option>
                                        <option value="Classic Journeys">Classic Journeys</option>
                                        <option value="Trains, Planes, Cars & Cruises">Trains, Planes, Cars & Cruises</option>
                                        <option value="Food & Culture Holidays">Food & Culture Holidays</option>
                                        <option value="Family Holidays">Family Holidays</option>
                                        <option value="Once in a lifetime holidays">Once in a lifetime holidays</option>
                                        <option value="Short breaks & Escapes">Short breaks & Escapes</option>
                                        <option value="Wildlife & Safari Holidays">Wildlife & Safari Holidays</option>
                                        <option value="Luxury Beach holidays">Luxury Beach holidays</option>
                                        <option value="Special occasions">Special occasions</option>
                                    </select>
                                </div>
                            </div>
                            <div class="banner_dropdwn_blk ps-0 ps-md-2">
                                <div class="select_drpdwn">
                                    <select class="form-select" aria-label="Choose a month">
                                        <option selected>Choose a month</option>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="card_blk_row destinations_blk_row light_grey">
                <div class="container-md">
                    <div class="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li>Holiday types</li>
                        </ul>
                    </div>
                    <div class="row">
                        <div class="destinations_cntnt_blk">
                            <h2>CHOOSE YOUR STYLE OF HOLIDAY</h2>
                            <p>Whether you’re after a relaxing break and some barefoot luxury for two, or are planning an epic adventure of a lifetime and looking for luxury experiences, our team of travel specialists can transport you wherever you want to go, in whichever style you’d like to travel. We can set you up on a classic road trip across the USA, arrange a close-up wildlife encounter with the Big Five in South Africa, take you on an expedition-style cruise to the Galapagos or arrange a family adventure in Costa Rica. Essentially, wherever the destination and whatever the style of trip, we can help. The following collections of itinerary ideas are designed to guide and inspire you. They’re not off-the-shelf options though. From the time spent away to the way you travel and where you stay, you can tailor every element to suit your own interests, ensuring that the trip we design for you is bespoke and unlike any other.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="card_blk_row destinations_blk_row">
                <div class="container-md">
                    <div class="row">
                        <div class="col-12 favrites_blk_row pb-0">
                            <h3 class="title_cls pb-0">Our favourite holiday types</h3>
                            <div class="destination_contries_filter d-flex justify-content-around">
                                <ul>
                                    <li><a href="#" class="active">Exsus recommends</a></li>
                                    <li><a href="#">Alphabetical</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type01.jpg" alt="holiday_type01" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Once In A Lifetime Holidays</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type02.jpg" alt="holiday_type02" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Honeymoons</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type03.jpg" alt="holiday_type03" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Family Holidays</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type04.jpg" alt="holiday_type04" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Adventure Holidays</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type05.jpg" alt="holiday_type05" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Food & Culture Holidays</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type06.jpg" alt="holiday_type06" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Luxury Beach Holidays</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type07.jpg" alt="holiday_type07" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Wildlife & Safari Holidays</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type08.jpg" alt="holiday_type08" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Special Occasions</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type09.jpg" alt="holiday_type09" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Short Breaks & Escapes</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type10.jpg" alt="holiday_type10" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Trains, Planes, Cars & Cruises</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="card_blk_inr">
                                <a href="holiday_types.html" target="_blank">
                                    <img src="images/holiday_type11.jpg" alt="holiday_type01" class="img-fluid" />
                                    <div class="card_blk_cntnt card_blk_sml_arw">
                                        <div class="row align-items-center">
                                            <div class="col-11">
                                                <div class="card_blk_txt">
                                                    <h3 class="mb-0">Classic Journeys</h3>
                                                </div>
                                            </div>
                                            <div class="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section class="destination_text_overlay_row">
                <div class="container-md">
                    <div class="destination_text_overlay_inr">
                        <h4>When to go where</h4>
                        <h5>Find out the best time to travel</h5>
                        <button class="btn prmry_btn make_enqury_btn" onclick="window.open('contact_us.html')">View travel calender
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </button>
                    </div>
                </div>
            </section>

            <section aria-label="Client Testimonials" class="testimonials_blk_row">
                <div class="container-md">
                    <div id="Testimonials" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="3" aria-label="Slide 4"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="4" aria-label="Slide 5"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="5" aria-label="Slide 6"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="6" aria-label="Slide 7"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="7" aria-label="Slide 8"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>All the personal details and touches were amazing and much appreciated. Too many highlights to say! So much history, lovely spots to stay, the people, the curries, the fruit...</p>
                                    <span>Suzie & Henry travelled to Sri Lanka, March 2022</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>Charlotte was excellent as always - friendly and approachable, with lots of ideas when discussing itineraries, and the mix of city and sea worked well.</p>
                                    <span>Filippo E travelled to Portugal, February 2022</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>We loved Costa Rica. Ashleigh was great at organising our trip, and when coronavirus changed everything, she comforted us and reassured us that we were able to get home.</p>
                                    <span>Suzie & Henry travelled to Costa Rica, March 2020</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>Katie was a very good communicator and was quick to research our specific requests. We loved everything about our trip, especially seeing penguins and giraffes!</p>
                                    <span>Exsus travellers who travelled to South Africa in December 2019/January 2020</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>Our holiday in Africa was excellent. Mark went out of his way to organise this trip for us. We loved it - OMG it was the most magical place.</p>
                                    <span>Ms J. Tighe travelled to South Africa, Botswana and Zimbabwe, September 2019</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>Ashleigh was amazing. She listened to all our preferences and interests and put together the most perfect itinerary for us.</p>
                                    <span>Exsus travellers who travelled to Peru, September 2019</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>Our holiday was honestly awesome. Gina tailored the trip extremely well to our needs, and everything was brilliant. We had a fantastic time.</p>
                                    <span>The Tonge family travelled to Norway, August 2019</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <div class="carousel-caption">
                                    <p>From beginning to end, our holiday was like a fairytale. We would not change a thing.</p>
                                    <span>Mike & Debbie Edwards travelled to Italy, July/August 2019</span>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

        </Layout>
    );
}
