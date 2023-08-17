import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService, holidaytypesService } from 'services';
import { Inspireme } from 'components';
import generateDynamicLink from 'components/utils/generateLink';
import { NavLink } from 'components';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [holidaytypes, setHolidayTypes] = useState();
    // const [destinationLandingDetails, setDestinationLandingDetails] = useState();
    const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [backgroundImgWhentogo, setBackgroundImgWhentogo] = useState('');
    const [bannerImageArr, setBannerImageArr] = useState([]);
    const [thumbnailImageArr, setThumbnailImageArr] = useState([]);

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            // console.log('window.site_region', window.site_region);
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const dynamicImage = (itemId) => {
        return `https://d33ys3jnmuivbg.cloudfront.net/ilimages` + itemId;
    }

    const dynamicLink = (itemId) => {
        if (itemId && itemId == '01') {
            return regionWiseUrl + `/holiday-types/incredible-journeys`;
        } else if (itemId && itemId == '02') {
            return regionWiseUrl + `/holiday-types/luxury-honeymoons`;
        } else if (itemId && itemId == '03') {
            return regionWiseUrl + `/holiday-types/family-holidays`;
        } else if (itemId && itemId == '04') {
            return regionWiseUrl + `/holiday-types/adventure-holidays`;
        } else if (itemId && itemId == '05') {
            return regionWiseUrl + `/holiday-types/luxury-beach-holidays`;
        } else if (itemId && itemId == '06') {
            return regionWiseUrl + `/holiday-types/culture-holidays`;
        } else if (itemId && itemId == '07') {
            return regionWiseUrl + `/holiday-types/wildlife-holidays`;
        } else if (itemId && itemId == '08') {
            return regionWiseUrl + `/holiday-types/classic-journeyst`;
        } else if (itemId && itemId == '09') {
            return regionWiseUrl + `/holiday-types/spcial-occasions`;
        }
    }

    const dynamicBannerImage = (item) => {
        console.log('data', `https://d33ys3jnmuivbg.cloudfront.net/ilimages` + item);
        return `https://d33ys3jnmuivbg.cloudfront.net/ilimages/` + item;
    }

    const dynamicThumbnailImage = (item) => {
        console.log('data32', `https://d33ys3jnmuivbg.cloudfront.net/ilimages` + item);
        return `https://d33ys3jnmuivbg.cloudfront.net/ilimages/` + item;
    }

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));

        holidaytypesService.getHolidaytypesLandingPage().then(x => {
            console.log('getHolidaytypesLandingPage', x);

            setHolidayTypes(x.data[0]);
            // setDestinationLandingDetails(x)
            console.log('aa', "https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data[0].attributes.custom_page_images.data[0].attributes.image_path);

            const imageCheck = x.data[0].attributes.custom_page_images.data;
            imageCheck.forEach(element => {
                if (element.attributes.image_type == 'center') {
                    setBackgroundImgWhentogo("https://d33ys3jnmuivbg.cloudfront.net/ilimages" + x.data[0].attributes.custom_page_images.data[1].attributes.image_path);
                } else if (element.attributes.image_type == 'banner') {
                    setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data[0].attributes.custom_page_images.data[0].attributes.image_path);
                }
            });
        });

        holidaytypesService.getHolidaytypesLandingList().then(x => {
            const imageCheckType = x.data;
            imageCheckType.forEach(elementMain => {
                if (elementMain.attributes.holiday_type_images.data) {
                    const dataInner = elementMain.attributes.holiday_type_images.data;
                    dataInner.forEach(element => {
                        if (element.attributes.image_type == 'banner') {
                            bannerImageArr.push(element.attributes.image_path);
                        } else if (element.attributes.image_type == 'thumbnail') {
                            const objThumbnail = {
                                "holiday_type_code": elementMain.attributes.holiday_type_code,
                                "holiday_type_name": elementMain.attributes.holiday_type_name,
                                "image_path": element.attributes.image_path
                            }
                            thumbnailImageArr.push(objThumbnail);
                        }
                    });
                }
            });

            console.log('thumbnailImageArr', thumbnailImageArr);

            setBannerImageArr(bannerImageArr);
            setThumbnailImageArr(thumbnailImageArr);
            setHolidaytypesLandingList(x.data);
            // setDestinationLandingDetails(x)
        });

    }, []);

    return (
        <>
            <section className="banner_blk_row">
                <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    {bannerImageArr?.map((bannerImage, i) => (
                        <div key={i}>
                            <img src={dynamicBannerImage(bannerImage)} alt="holiday_types_detls" className="img-fluid" />
                        </div>
                    ))}
                    {/* <img src={backgroundImage} alt="holiday_types_detls" className="img-fluid" /> */}
                    {/* /static/media/holiday_types_banner.1e97daba.jpg */}
                </Carousel>

                <Inspireme />
            </section>

            <section className="card_blk_row destinations_blk_row light_grey">
                <div className="container-md">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li>Holiday types</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="destinations_cntnt_blk">
                            <h2>
                                {holidaytypes?.attributes?.page_header_text}
                            </h2>
                            <p>
                                {holidaytypes?.attributes?.page_content_1}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card_blk_row destinations_blk_row">
                <div className="container-md">
                    <div className="row">
                        <div className="col-12 favrites_blk_row pb-0">
                            <h3 className="title_cls pb-0">
                                {holidaytypes?.attributes?.page_content_2}
                            </h3>
                            <div className="destination_contries_filter d-flex justify-content-around">
                                <ul>
                                    <li><a href="#" className="active">Exsus recommends</a></li>
                                    <li><a href="#">Alphabetical</a></li>
                                </ul>
                            </div>
                        </div>
                        {thumbnailImageArr?.map((holidaytypesItem, i) => (
                            <div className="col-sm-4" key={holidaytypesItem?.id}>
                                <div className="card_blk_inr">
                                    {/* <NavLink href={dynamicLink(holidaytypesItem?.holiday_type_code)}> */}
                                        {/* <img src={dynamicImage(destinationItem?.attributes?.holiday_type_images?.data[0].attributes.image_path)} alt="destination01" className="img-fluid" /> */}
                                        <img src={dynamicThumbnailImage(holidaytypesItem.image_path)} alt="holiday_type01" className="img-fluid" />
                                        <div className="card_blk_cntnt card_blk_sml_arw">
                                            <div className="row align-items-center">
                                                <div className="col-11">
                                                    <div className="card_blk_txt">
                                                        <h3 className="mb-0">{holidaytypesItem?.holiday_type_name}</h3>
                                                    </div>
                                                </div>
                                                <div className="col-1 ps-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    {/* </NavLink> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="destination_text_overlay_row" style={{ backgroundImage: `url(${backgroundImgWhentogo})` }}>
                <div className="container-md">
                    <div className="destination_text_overlay_inr">
                        <h4>When to go where</h4>
                        <h5>Find out the best time to travel</h5>
                        <button className="btn prmry_btn make_enqury_btn">View travel calender
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
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
                    <h3>
                        {holidaytypes?.attributes?.page_content_3}
                    </h3>
                    <p>
                        {holidaytypes?.attributes?.page_content_4}
                    </p>
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
        </>
    );
}
