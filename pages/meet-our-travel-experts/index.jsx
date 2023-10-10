import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import Head from 'next/head';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { whyusService } from '../../services';
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [allExecutives, setAllExecutives] = useState([]);

    const equalHeight = (resize) => {
        var elements = document.getElementsByClassName("card_slider_cnt"),
            allHeights = [],
            i = 0;
        if (resize === true) {
            for (i = 0; i < elements.length; i++) {
                elements[i].style.height = 'auto';
            }
        }
        for (i = 0; i < elements.length; i++) {
            var elementHeight = elements[i].clientHeight;
            allHeights.push(elementHeight);
        }
        for (i = 0; i < elements.length; i++) {
            elements[i].style.height = Math.max.apply(Math, allHeights) + 'px';
            if (resize === false) {
                elements[i].className = elements[i].className + " show";
            }
        }
    }

    const ExpertDetail = ({ data }) => {
        const router = useRouter();
        const handleButtonClick = () => {
            router.push(`/travel-expert-detail`); // Navigate to the /travel-expert-detail page
        };

        return (
            // JSX for your component
            <button className="btn prmry_btn make_enqury_btn" onClick={handleButtonClick}>Read more
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
            </button>);
    };

    equalHeight(true);

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));

        whyusService.getAllExecutives().then(x => {
            setAllExecutives(x.data);
            console.log(x.data);
        })

        const carousel = document.querySelector('#carouselExampleInterval');
        new bootstrap.Carousel(carousel);

        const carousel1 = document.querySelector('#Testimonials');
        new bootstrap.Carousel(carousel1);

        window.addEventListener('resize', equalHeight(true));
    }, []);

    return (
        <Layout>
            <Head>
                <script src="assets/javascripts/experts-equal-height.js"></script>
            </Head>
            <section className="banner_blk_row">
                {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/images/our_experts_banner01.jpg" />
                    </div>
                </Carousel> */}
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls our_experts_banner01"></div>
                        </a>
                    </div>
                </div>
                <div className="banner_dropdwn_row">
                    <div className="container">
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our_exprts_row">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li><a >Home</a></li>
                            <li><a >Why us</a></li>
                            <li>Our people</li>
                        </ul>
                    </div>
                    <div className="row">
                        {allExecutives?.map(res => (
                            <div className="col-sm-6 col-lg-4 col-xxl-3" key={res.id}>
                                <div className="our_exprts_inr">
                                    <img src={res?.attributes?.executive_image_path} alt="expert01" className="img-fluid" />
                                    <div className="expert_info">
                                        <h2>{res?.attributes?.executive_name}</h2>
                                        <h3>{res?.attributes?.executive_role}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: res?.attributes?.intro_text }} />
                                    </div>
                                    <ExpertDetail dataProp={res.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section aria-label="Client Testimonials" className="testimonials_blk_row">
                <div className="container">
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
                <div className="container">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
                    <button className="btn prmry_btn make_enqury_btn" onClick="window.open('contact_us.html')">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container">
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
