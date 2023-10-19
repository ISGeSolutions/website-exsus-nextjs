import { useState, useEffect } from 'react';

import { Link, Spinner, Signup, FriendlyUrl } from 'components';
import { Layout } from 'components/users';
import { userService, specialoffersService } from 'services';
import { NavLink } from 'components';
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [allOffers, setAllOffers] = useState([]);
    const [destinations, setDestinations] = useState();
    const [isLoading, setIsLoading] = useState(true);
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

    equalHeight(true);

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            // console.log('window.site_region', window.site_region);
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/hotel-detail`;
    };

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));

        specialoffersService.getAllOffers().then(x => {
            setAllOffers(x.data);
            setIsLoading(false);
        }).catch((error) => {
            // Handle any errors here
            // console.error(error);
            setIsLoading(false);
        });

        const carousel = document.querySelector('#carouselExampleInterval');
        if (carousel) {
            new bootstrap.Carousel(carousel);
        }

        window.addEventListener('resize', equalHeight(true));
    }, []);

    return (
        <>
            <Head>
                <title>Special Offers | Luxury Hotel and Holiday Offers</title>
            </Head>
            {isLoading ? (
                // <MyLoader />
                <div
                    className="full_loader_parnt_blk loader_parnt_blk"
                    style={{ display: `block !important` }}
                >
                    <div className="loader-circle-2"></div>
                </div>
            ) : (<div>
                <section className="banner_blk_row">
                    {/* <Carousel showArrows={false} autoPlay={true} infiniteLoop={true} showIndicators={false} showThumbs={false}>
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
                </Carousel> */}

                    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">

                        <div className="carousel-indicators">
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
                        </div>
                    </div>
                </section>

                <section className="card_blk_row destinations_blk_row light_grey">
                    <div className="container">
                        <div className="bookmark_row">
                            {/* {/ <p style={{ color: `white` }}>{destinations?.attributes?.page_friendly_url}</p > /} */}
                            < FriendlyUrl
                            // data={destinations?.attributes?.page_friendly_url}
                            ></FriendlyUrl>
                        </div>
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
                </section >

                <section className="card_blk_row destinations_blk_row pb-0">
                    <div className="container">
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
                    <div className="container">
                        <div className="card_slider_row">
                            <div className="carousel00 width_100">
                                <div className="row">
                                    {allOffers?.map(res => (
                                        <NavLink
                                            href={generateDynamicLink(res.id)}
                                        >
                                            <div className="col-sm-6 col-lg-4 col-xxl-3" key={res.id}>
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src={res.attributes.thumbnail_image_path} alt="offer_card01" className="img-fluid" />
                                                            <span className="img_specl_offer">Special offer</span>
                                                        </a>
                                                        <div className="card_slider_cnt">
                                                            <h4><a>{res.attributes.offer_text}</a></h4>
                                                            <ul>
                                                                <li>Location: {res.attributes.subtitle_text}</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li className="pink_text">Special offer: {res.attributes.title_text}</li>
                                                                <li>Best for:<span>Luxury Hotel, Setting & Views, Beach, Family-friendly</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </NavLink>

                                    ))}


                                </div>
                            </div>

                        </div>
                    </div>
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
            </div>)}
        </>
    );
}
