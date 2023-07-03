import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

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
                <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/images/our_experts_banner01.jpg" />
                    </div>
                </Carousel>
                {/* <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls our_experts_banner01"></div>
                        </a>
                    </div>
                </div> */}
                <div className="banner_dropdwn_row">
                    <div className="container-md">
                        <div className="banner_dropdwn_inr d-block d-md-flex">
                            <div className="banner_dropdwn_blk">
                                <div className="select_drpdwn">
                                    <select className="form-select" aria-label="Choose a destination">
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
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                <div className="select_drpdwn">
                                    <select className="form-select" aria-label="Choose a reason">
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
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                <div className="select_drpdwn">
                                    <select className="form-select" aria-label="Choose a month">
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
                            <div className="banner_inspire_btn ps-0 ps-md-2">
                                <button type="button" className="btn btn-primary prmry_btn">Inspire me
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our_exprts_row">
                <div className="container-md">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="about_us.html">Why us</a></li>
                            <li>Our people</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert01.jpg" alt="expert01" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Tom Cloherty</h2>
                                    <h3>Senior Account Manager - Worldwide</h3>
                                    <p>Tom has been indulging his love of travel from a young age, since family holidays first fuelled his wanderlust - which...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert02.jpg" alt="expert02" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Danielle Walker</h2>
                                    <h3>Senior Account Manager - Worldwide</h3>
                                    <p>Danielle has worked in travel for over 20 years, 15 of them with leading luxury tour operators, and brings a wealth of...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert03.jpg" alt="expert03" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Sabastian Gittany</h2>
                                    <h3>Senior Account Manager - Worldwide</h3>
                                    <p>Having worked in travel for almost 20 years, between airlines, airports and tour operators, Sabastian has an extensive...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert04.jpg" alt="expert04" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Neil Sutton</h2>
                                    <h3>Senior Account Manager - Europe</h3>
                                    <p>Neil has always taken every opportunity to travel, from studying in Spain and living and working in travel in New York...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert05.jpg" alt="expert05" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Ricardo Beeny</h2>
                                    <h3>Senior Account Manager</h3>
                                    <p>Ricardo has worked in travel for almost 20 years and has a passion for Latin America, having travelled extensively arou...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert06.jpg" alt="expert06" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Steve Johnson</h2>
                                    <h3>Worldwide Travel Expert</h3>
                                    <p>Steve has a wealth of experience at leading tour operators, and has travelled extensively worldwide, with a particular...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert07.jpg" alt="expert07" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>David Sutcliffe</h2>
                                    <h3>Worldwide Travel Expert</h3>
                                    <p>David has 20 years of experience in luxury travel, and has travelled across the globe, including living and working abr...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert08.jpg" alt="expert08" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Spencer Thomas</h2>
                                    <h3>Worldwide Travel Expert</h3>
                                    <p>Spencer has worked in travel for nearly 20 years, and his love of exploring the world and sharing his passion continues...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert09.jpg" alt="expert09" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Laura Robertson</h2>
                                    <h3>Worldwide Travel Expert</h3>
                                    <p>Laura has worked in travel for more than 16 years, nearly 10 of them in luxury travel. She has travelled all over the w...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="our_exprts_inr">
                                <img src="images/expert10.jpg" alt="expert10" className="img-fluid" />
                                <div className="expert_info">
                                    <h2>Satyan Bhalla</h2>
                                    <h3>Indian Subcontinent Travel Expert</h3>
                                    <p>Satyan caught the travel bug as a child, thanks to a father who thought nothing of travelling hundreds of miles in sear...</p>
                                </div>
                                <button className="btn prmry_btn make_enqury_btn">Read more
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label="Client Testimonials" className="testimonials_blk_row">
                <div className="container-md">
                    <div id="Testimonials" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="3" aria-label="Slide 4"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="4" aria-label="Slide 5"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="5" aria-label="Slide 6"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="6" aria-label="Slide 7"></button>
                            <button type="button" data-bs-target="#Testimonials" data-bs-slide-to="7" aria-label="Slide 8"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>All the personal details and touches were amazing and much appreciated. Too many highlights to say! So much history, lovely spots to stay, the people, the curries, the fruit...</p>
                                    <span>Suzie & Henry travelled to Sri Lanka, March 2022</span>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>Charlotte was excellent as always - friendly and approachable, with lots of ideas when discussing itineraries, and the mix of city and sea worked well.</p>
                                    <span>Filippo E travelled to Portugal, February 2022</span>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>We loved Costa Rica. Ashleigh was great at organising our trip, and when coronavirus changed everything, she comforted us and reassured us that we were able to get home.</p>
                                    <span>Suzie & Henry travelled to Costa Rica, March 2020</span>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>Katie was a very good communicator and was quick to research our specific requests. We loved everything about our trip, especially seeing penguins and giraffes!</p>
                                    <span>Exsus travellers who travelled to South Africa in December 2019/January 2020</span>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>Our holiday in Africa was excellent. Mark went out of his way to organise this trip for us. We loved it - OMG it was the most magical place.</p>
                                    <span>Ms J. Tighe travelled to South Africa, Botswana and Zimbabwe, September 2019</span>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>Ashleigh was amazing. She listened to all our preferences and interests and put together the most perfect itinerary for us.</p>
                                    <span>Exsus travellers who travelled to Peru, September 2019</span>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>Our holiday was honestly awesome. Gina tailored the trip extremely well to our needs, and everything was brilliant. We had a fantastic time.</p>
                                    <span>The Tonge family travelled to Norway, August 2019</span>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="5000">
                                <div className="carousel-caption">
                                    <p>From beginning to end, our holiday was like a fairytale. We would not change a thing.</p>
                                    <span>Mike & Debbie Edwards travelled to Italy, July/August 2019</span>
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
                    <button className="btn prmry_btn make_enqury_btn" onClick="window.open('contact_us.html')">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container-md">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <Signup />
                    {/* <form className="newslettr_form d-block d-sm-flex">
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
                    </form> */}
                </div>
            </section>
        </Layout>
    );
}
