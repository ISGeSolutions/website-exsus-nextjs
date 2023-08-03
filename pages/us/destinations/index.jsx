import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { destinationService, alertService, userService } from 'services';
import { Inspireme } from 'components';

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// var Carousel = require('react-responsive-carousel').Carousel;

// export const getStaticProps = async () => {

// const res = await destinationService.getAll();
// console.log('res', res);
// const data = await res;
// console.log('data', data);
// return {
//     props: { data }
// };
//     return;
// }

export default Index;

function Index() {
    const [destinations, setDestinations] = useState();

    useEffect(() => {
        destinationService.getAll().then(x => {
            console.log('x', x);
            setDestinations(x)
        });

        const carousel1 = document.querySelector('#carouselExampleInterval');
        new bootstrap.Carousel(carousel1);

        const carousel = document.querySelector('#Testimonials');
        new bootstrap.Carousel(carousel);

    }, []);

    return (
        <Layout>
            {/* <h4 className='mt-2'>This is destination page</h4> */}
            <section className="banner_blk_row">
                {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/./../images//destination_banner.jpg" />
                    </div>
                </Carousel> */}
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls destination_banner"></div>
                        </a>
                    </div>
                </div>
                <Inspireme />

            </section>

            <section className="card_blk_row destinations_blk_row light_grey">
        <div className="container-md">
            <div className="bookmark_row">
                <ul>
                    <li><a href="homepage.html">Home</a></li>
                    <li>Destinations</li>
                </ul>
            </div>
            <div className="row">
                <div className="destinations_cntnt_blk">
                    <h2>Tailor-made Luxury Holidays</h2>
                    <p>If the world is your oyster when choosing where to go, our team of travel experts can help you by providing inspiration and advice on travelling to all seven continents. From perennial favourites to emerging gems, much-loved destinations to places that are truly off the beaten track, we can take you all around the world, and in a style appropriate for a tailor-made luxury holiday, with handpicked places to stay and incredible experiences to enjoy. Whatever the destination and style of trip, we will design a trip like no other, a luxury tailor-made holiday, bespoke honeymoon or family adventure that's exclusive to you.</p>
                </div>
            </div>
        </div>
    </section>

            <section className="card_blk_row destinations_blk_row">
        <div className="container-md">           
            <div className="row">                
                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination01.jpg" alt="destination01" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Asia</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>                                
                            </div>
                        </a>                        
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination02.jpg" alt="destination02" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Europe</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination03.jpg" alt="destination03" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">South America</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>                            
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination04.jpg" alt="destination04" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Indian Subcontinent</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination05.jpg" alt="destination05" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">North America & Caribbean</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination06.jpg" alt="destination06" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Africa</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination07.jpg" alt="destination07" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Central America</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination08.jpg" alt="destination08" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Australasia & South Pacific</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination09.jpg" alt="destination09" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Middle East & North Africa</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card_blk_inr">
                        <a href="destination_overview.html" target="_blank">
                            <img src="./../images/destination10.jpg" alt="destination10" className="img-fluid" />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                                <div className="row align-items-center">
                                    <div className="col-11">
                                        <div className="card_blk_txt">
                                            <h3 className="mb-0">Indian ocean</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>

            <section className="destination_text_overlay_row">
        <div className="container-md">
            <div className="destination_text_overlay_inr">
                <h4>When to go where</h4>
                <h5>Find out the best time to travel</h5>
                <button className="btn prmry_btn make_enqury_btn" onclick="window.open('contact_us.html')">View travel calender
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                </button>
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
                    <button className="btn prmry_btn make_enqury_btn">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </button>
                        </div>
                    </form> */}
                </div>
            </section>
        </Layout>
    );
}
