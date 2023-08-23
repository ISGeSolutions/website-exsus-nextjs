import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inspireme, Signup } from 'components';
import Head from 'next/head';
import { holidaytypesService } from 'services';
import { NavLink } from 'components';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {

    const [thumbnailImage, setThumbnailImageArr] = useState([]);

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            // console.log('window.site_region', window.site_region);
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const dynamicThumbnailImage = (itemId) => {
        return `https://d33ys3jnmuivbg.cloudfront.net/ilimages/` + itemId;
    }

    const dynamicLink = (itemId, id) => {
        if (itemId && itemId == 'HG6') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=incredible-journeys&id=` + id;
        } else if (itemId && itemId == 'HG5') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=luxury-honeymoons&id=` + id;
        } else if (itemId && itemId == 'HG4') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=family-holidays&id=` + id;
        } else if (itemId && itemId == 'ADHL') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=adventure-holidays&id=` + id;
        } else if (itemId && itemId == 'LBHG') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=luxury-beach-holidays&id=` + id;
        } else if (itemId && itemId == 'HG3') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=culture-holidays&id=` + id;
        } else {
            return "#";
        }
    }

    const dynamicLinkHolidayas = (itemId, id) => {
        // if (itemId && itemId == 'AF') {
        //     return regionWiseUrl + `/destinations/africa/` + id;
        // }
        if (itemId && itemId == 'HG6') {
            return regionWiseUrl + `/holidaytypeitineraries/incredible-journeys/id`;
        } else if (itemId && itemId == 'HG5') {
            return regionWiseUrl + `/holidaytypeitineraries/luxury-honeymoons/id`;
        } else if (itemId && itemId == 'HG4') {
            return regionWiseUrl + `/holidaytypeitineraries/family-holidays/id`;
        } else if (itemId && itemId == 'ADHL') {
            return regionWiseUrl + `/holidaytypeitineraries/adventure-holidays/id`;
        } else if (itemId && itemId == 'LBHG') {
            return regionWiseUrl + `/holidaytypeitineraries/luxury-beach-holidays/id`;
        } else if (itemId && itemId == 'HG3') {
            return regionWiseUrl + `/holidaytypeitineraries/culture-holidays/id`;
        } else {
            return "#";
        }
    }

    useEffect(() => {
        const thumbnailImageArr = [];
        holidaytypesService.getHolidaytypesLandingList().then(x => {
            const imageCheckType = x.data;
            imageCheckType.forEach(elementMain => {
                if (elementMain.attributes.holiday_type_group_images.data) {
                    const dataInner = elementMain.attributes.holiday_type_group_images.data;
                    dataInner.forEach(element => {
                        if (element.attributes.image_type == 'thumbnail') {
                            const objThumbnail = {
                                "id": elementMain?.id,
                                "holiday_type_code": elementMain?.attributes?.holiday_type_group_code,
                                "holiday_type_name": elementMain?.attributes?.holiday_type_group_name,
                                "image_path": element.attributes.image_path
                            }
                            thumbnailImageArr.push(objThumbnail);
                        }
                    });
                }
            });
            // console.log('thumbnailImageArr', thumbnailImageArr);
            setThumbnailImageArr(thumbnailImageArr);
        });

        // console.log('region', window.site_region);
        var site_region = localStorage.getItem('site_region');

        const carousel1 = document.querySelector('#carouselExampleInterval');
        new bootstrap.Carousel(carousel1);

        const carousel = document.querySelector('#Testimonials');
        new bootstrap.Carousel(carousel);
    }, []);

    const router = useRouter();

    return (
        <>
            <Head>
                <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script>
                <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script>
            </Head>

            <section className="banner_blk_row">
                {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/images/banner01.png" />
                    </div>
                    <div>
                        <img src="/assets/images/banner02.png" />
                    </div>
                    <div>
                        <img src="/assets/images/banner03.png" />
                    </div>
                </Carousel> */}
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_img_custom01 banner_commn_cls"></div>
                            <div className="carousel-caption">
                                <img src="images/banner-logo.png" alt="banner-logo" className="img-fluid" />
                                <h2>Discover the Seychelles</h2>
                            </div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_img_custom02 banner_commn_cls"></div>
                            <div className="carousel-caption">
                                <img src="images/banner-logo.png" alt="banner-logo" className="img-fluid" />
                                <h2>Perfect for romance</h2>
                            </div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_img_custom03 banner_commn_cls"></div>
                            <div className="carousel-caption">
                                <img src="images/banner-logo.png" alt="banner-logo" className="img-fluid" />
                                <h2>Explore new adventure</h2>
                            </div>
                        </a>
                    </div>
                </div>
                <Inspireme />
            </section>

            <section className="card_blk_row">
                <div className="container-md">
                    <div className="row">
                        {/* <pre>{JSON.stringify(thumbnailImageArr, null, 2) } </pre> */}
                        {thumbnailImage?.map((holidaytypesItem, i) => (
                            <div className="col-sm-6 col-md-6 col-lg-4" key={i}>
                                <div className="card_blk_inr">
                                    <NavLink href={dynamicLink(holidaytypesItem?.holiday_type_code, holidaytypesItem?.id)} as={dynamicLinkHolidayas(holidaytypesItem?.attributes?.holiday_type_group_code, holidaytypesItem?.id)}>
                                        <img src={dynamicThumbnailImage(holidaytypesItem.image_path)} alt="holiday_type01" className="img-fluid" />
                                        <div className="card_blk_cntnt">
                                            <div className="row align-items-center">
                                                <div className="col-11">
                                                    <div className="card_blk_txt">
                                                        <h3>{holidaytypesItem?.holiday_type_name}</h3>
                                                        <p></p>
                                                    </div>
                                                </div>
                                                <div className="col-1 ps-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="favrites_blk_row">
                <div className="container-md">
                    <h3 className="title_cls">Favourite trip ideas</h3>
                    <div className="card_slider_row">
                        <i id="left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                        </i>
                        <div className="carousel00">
                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="images/card_slider01.jpg" alt="slider image 01" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt">
                                        <h4>Luxury Holidays to Egypt</h4>
                                        <ul>
                                            <li>Egypt</li>
                                            <li>From £3,690 per person</li>
                                            <li>Travel to:<span>Alexandria, Aswan, Cairo</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn">
                                        <span>9 nights</span>
                                        <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="images/card_slider02.jpg" alt="slider image 02" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>Luxury India train journey: Delhi to Mumbai</h4>
                                        <ul>
                                            <li>India</li>
                                            <li>From £5,595 per person</li>
                                            <li>Travel to:<span>Delhi & Around, Mumbai & Western India</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn">
                                        <span>9 nights</span>
                                        <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="images/card_slider03.jpg" alt="slider image 03" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>Magical Maldives holiday</h4>
                                        <ul>
                                            <li>Maldives</li>
                                            <li>From £3,200 per person</li>
                                            <li>Travel to:<span>Maldives</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn">
                                        <span>7 nights</span>
                                        <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="images/card_slider04.jpg" alt="slider image 04" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>Masai Mara Migration</h4>
                                        <ul>
                                            <li>Kenya</li>
                                            <li>From £7,265 per person</li>
                                            <li>Travel to:<span>Kenya coast, Laikipia, Meru & Central Kenya, Masai Mara</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn">
                                        <span>9 nights</span>
                                        <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="images/card_slider05.jpg" alt="slider image 05" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>A luxury british isles cruise</h4>
                                        <ul>
                                            <li>UK</li>
                                            <li>From £5,190 per person</li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn">
                                        <span>12 nights</span>
                                        <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <div className="card_slider_img">
                                        <img src="images/card_slider06.jpg" alt="slider image 06" className="img-fluid" />
                                    </div>
                                    <div className="card_slider_cnt">
                                        <h4>Big game & grapevines</h4>
                                        <ul>
                                            <li>South Africa</li>
                                            <li>From £5,185 per person</li>
                                            <li>Travel to: <span>Cape town & around, greater kruger & panorama region, Winelands</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn">
                                        <span>9 nights</span>
                                        <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <i id="right">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </i>
                    </div>
                </div>
            </section>


            <section aria-label="Client Testimonials" className="testimonials_blk_row">
                {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false}>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>All the personal details and touches were amazing and much appreciated. Too many highlights to say! So much history, lovely spots to stay, the people, the curries, the fruit...</p>
                                <span>Suzie & Henry travelled to Sri Lanka, March 2022</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>Charlotte was excellent as always - friendly and approachable, with lots of ideas when discussing itineraries, and the mix of city and sea worked well.</p>
                                <span>Filippo E travelled to Portugal, February 2022</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>We loved Costa Rica. Ashleigh was great at organising our trip, and when coronavirus changed everything, she comforted us and reassured us that we were able to get home.</p>
                                <span>Suzie & Henry travelled to Costa Rica, March 2020</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>Katie was a very good communicator and was quick to research our specific requests. We loved everything about our trip, especially seeing penguins and giraffes!</p>
                                <span>Exsus travellers who travelled to South Africa in December 2019/January 2020</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>Our holiday in Africa was excellent. Mark went out of his way to organise this trip for us. We loved it - OMG it was the most magical place.</p>
                                <span>Ms J. Tighe travelled to South Africa, Botswana and Zimbabwe, September 2019</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>Ashleigh was amazing. She listened to all our preferences and interests and put together the most perfect itinerary for us.</p>
                                <span>Exsus travellers who travelled to Peru, September 2019</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>Our holiday was honestly awesome. Gina tailored the trip extremely well to our needs, and everything was brilliant. We had a fantastic time.</p>
                                <span>The Tonge family travelled to Norway, August 2019</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <div className="carousel-caption">
                                <p>From beginning to end, our holiday was like a fairytale. We would not change a thing.</p>
                                <span>Mike & Debbie Edwards travelled to Italy, July/August 2019</span>
                            </div>
                        </div>
                    </div>
                </Carousel> */}
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

            <section className="card_blk_row">
                <div className="container-md">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card_blk_inr">
                                <a href="#" target="_blank">
                                    <img src="images/card_img07.jpg" alt="Card image 07" className="img-fluid" />
                                    <div className="card_blk_cntnt">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Luxury Family Safaris in Africa - Favourite</h3>
                                                    <p>July 04 2022</p>
                                                </div>
                                            </div>
                                            <div className="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card_blk_inr">
                                <a href="#">
                                    <img src="images/card_img08.jpg" alt="Card image 08" className="img-fluid" />
                                    <div className="card_blk_cntnt">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Luxury Family Holidays in the Galapagos</h3>
                                                    <p>July 04 2022</p>
                                                </div>
                                            </div>
                                            <div className="col-1 ps-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container-md">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <Signup />
                </div>
            </section>
        </>
    );
}
