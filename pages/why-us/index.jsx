import { useState, useEffect } from 'react';
import { Signup } from 'components';
import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { whyusService } from 'services';
import { NavLink } from 'components';

var React = require('react');

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
    const [whyusDetails, setWhyusDetails] = useState(null);

    useEffect(() => {
        const carousel = document.querySelector('#carouselExampleInterval');
        new bootstrap.Carousel(carousel);

        whyusService.getWhyusPage().then(x => {
            // console.log('x1', x);
            setWhyusDetails(x.data[0].attributes);
        });
    }, []);

    return (
        <Layout>
            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button> */}
                        {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button> */}
                        {whyusDetails?.custom_page_images?.data?.map((element, index) => (
                            element?.attributes?.image_type == 'banner' && (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#carouselExampleInterval"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                    aria-current={index === 0 ? 'true' : 'false'}
                                    aria-label={`Slide ${index + 1}`}
                                ></button>
                            )
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {
                            whyusDetails?.custom_page_images?.data?.map((element, index) => (
                                element?.attributes?.image_type == 'banner' && (
                                    <NavLink href="#" className="carousel-item active" data-bs-interval="5000" key={index}>
                                        <div className="banner_commn_cls" style={{ backgroundImage: `url(${`https://d33ys3jnmuivbg.cloudfront.net/ilimages` + element?.attributes?.image_path})` }}></div>
                                    </NavLink>
                                )
                            ))}
                        {/* <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner01"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner02"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner03"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner04"></div>
                        </a> */}
                    </div>
                </div>
            </section>

            <section className="trvl_info_row">
                <div className="container-md">
                    <div className="bookmark_row">
                        <p style={{ color: `white` }} dangerouslySetInnerHTML={{ __html: whyusDetails?.page_friendly_url }} />
                        {/* <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li>Why us</li>
                        </ul> */}
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">{whyusDetails?.page_header_text}</h2>
                        <p dangerouslySetInnerHTML={{ __html: whyusDetails?.page_content_1 }} />
                        {/* <p className="mb-4">With over 20 years of experience putting together incredible journeys all around the world, we know the ingredients that go into the perfect luxury holiday. With each itinerary tailor-made from scratch from beginning to end, our well-travelled experts will draw on their first-hand experience to make sure that your next trip, whatever the destination, goes above and beyond.</p>
                        <p>In 1998 we launched our first incredible journeys to South America to debut a new way of travelling. Today, we tailor-make luxury bespoke holidays, honeymoons, family adventures and unique holidays to celebrate special occasions in over 80 countries on all seven continents.</p> */}
                    </div>
                    {/* <div className="trvl_info_cntnt">
                        <h2>Escape the obvious</h2>
                        <p>We want you to escape the obvious and experience the extraordinary. We are committed to pushing the boundaries and finding new, exciting and original holiday experiences. Enjoy a luxury holiday with a difference: from unique, distinctive hotels to exceptional off-the-beaten-track experiences, it is the memorable discoveries and personal touches that make an Exsus luxury holiday truly compelling.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>What our clients say</h2>
                        <p className="mb-4">We're delighted to have won the 2020 Feefo Gold Trusted Service Award, an independent seal of excellence that recognised Exsus Travel for delivering exceptional customer service for two years in a row, as rated by those who travelled with us. You can read our <a href="#">full reviews here.</a></p>
                        <a href="https://www.feefo.com/en-GB/reviews/exsus-travel?withMedia=false&timeFrame=ALL&displayFeedbackType=SERVICE"><img className="img-fluid" src="images/feefo_platinum_service.png" alt="feefo_platinum_service" /></a>
                    </div> */}
                    {/* <div className="video_blk">
                        <iframe height="500" src="https://www.youtube.com/embed/LwrI76c_tPI?rel=0" allowFullScreen=""></iframe>
                    </div> */}
                </div>
            </section>

            <section className="card_blk_row dark_grey py-5">
                <div className="container-md">
                    <div className="book_wth_confdnce">
                        <h2>{whyusDetails?.page_content_2}</h2>
                        <div className="row">
                            <div className="col-lg-4">
                                <p dangerouslySetInnerHTML={{ __html: whyusDetails?.sub_content_1 }} />
                                {/* <h3>Specialist Expertise</h3>
                                <p>With over 20 years’ experience of creating incredible journeys and tailor-made luxury honeymoons, all around the world, our destination experts have first-hand experience of their dedicated areas and frequently travel to them to stay on top of what’s best, what’s new and what not to miss, so can advise you personally.</p> */}
                            </div>
                            <div className="col-lg-4">
                                <p dangerouslySetInnerHTML={{ __html: whyusDetails?.sub_content_2 }} />
                                {/* <h3>Tailor-made trips</h3>
                                <p>All trips put together through us are designed to suit individual needs and interests. Personalise an itinerary by adding more time in your favourite place, including an incredible experience you’d like to have or adding something out of the ordinary, so your holiday turns into a trip of a lifetime.</p> */}
                            </div>
                            <div className="col-lg-4">
                                <p dangerouslySetInnerHTML={{ __html: whyusDetails?.sub_content_3 }} />
                                {/* <h3>Fully protected</h3>
                                <p>From the moment you start planning your trip, you will have a dedicated expert looking after you. While away, we’ll provide 24/7 support and emergency contact to ensure that everything runs smoothly. We are members of ABTA, ATOL and AITO so you can rest assured your holiday is fully protected. </p> */}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card_blk_inr">
                                <a href="#" target="_blank">
                                    <img src="images/about_us_card01.jpg" alt="Card image 07" className="img-fluid" />
                                    <div className="card_blk_cntnt card_blk_cntnt_top">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Explore our destinations</h3>
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

                        <div className="col-sm-6">
                            <div className="card_blk_inr">
                                <a href="#">
                                    <img src="images/about_us_card02.jpg" alt="Card image 08" className="img-fluid" />
                                    <div className="card_blk_cntnt card_blk_cntnt_top">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Explore our Holiday types</h3>
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

            <section className="make_enqury_row">
                <div className="container-md">
                    <h3>{whyusDetails?.page_content_3}</h3>
                    <p>{whyusDetails?.page_content_4}</p>
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
                </div>
            </section>
        </Layout>
    );
}
