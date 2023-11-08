import { useState, useEffect } from 'react';
import { Signup } from 'components';
import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { aboutusService, creatintripsService } from 'services';
import { NavLink } from 'components';
import { FriendlyUrl } from '../../../components';
import Head from "next/head";
import { EnquiryButton } from '../../../components/common/EnquiryBtn';

var React = require('react');

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
    const [whyusDetails, setWhyusDetails] = useState(null);
    const [friendlyUrl, setFriendlyUrl] = useState('');
    const [creatingTripsData, setCreatingTripsData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [headingTag, setHeadingTag] = useState(null);
    const [title, setTitle] = useState(null);
    const [metaDescription, setMetaDescription] = useState(null);
    const [longText, setLongText] = useState(null);
    const [rightHeader, setRightHeader] = useState(null);
    const [rightCorner, setRightContent] = useState(null);

    useEffect(() => {
        const carousel = document.querySelector('#carouselExampleInterval');
        new bootstrap.Carousel(carousel);
        setFriendlyUrl(`Home/About us/Creating your Trip`)
        aboutusService.getAboutusPage().then(x => {
            setWhyusDetails(x.data.attributes);
        });

        creatintripsService
            .getCreatingTripPage()
            .then((x) => {
                setCreatingTripsData(x.data[0]);
                const data = x.data[0]?.attributes?.custom_page_contents?.data;
                if (data) {
                    data.forEach((element, index) => {
                        if (element?.attributes?.content_name == 'HeadingTag') {
                            setHeadingTag(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Title') {
                            setTitle(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'MetaDescription') {
                            setMetaDescription(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Long_Text') {
                            setLongText(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Right_Header') {
                            setRightHeader(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Right_Corner') {
                            setRightCorner(element?.attributes?.content_value);
                        }
                    });
                }
                setIsLoading(false);
            })
            .catch((error) => {
                // Handle any errors here
                setIsLoading(false);
            });

    }, []);

    return (
        <Layout>
            <Head>
                <title>{title}</title>
                <meta name="description" content={metaDescription}></meta>
            </Head>
            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls creating_your_trip_banner"></div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="trvl_info_row">
                <div className="container">
                    <div className="bookmark_row">
                        <FriendlyUrl
                            data={'Home / ' + creatingTripsData?.attributes?.page_friendly_url}
                        ></FriendlyUrl>
                    </div>

                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">{headingTag}</h2>
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: longText }} />
                        {/* <p className="mb-4">Everyone’s idea of a perfect trip is as individual as you are, which is why we tailor-make our luxury holidays, bespoke honeymoons and family adventure holidays to fit your own personal requirements.</p>
                        <p>The aim is to plan your holiday perfectly and to organise it flawlessly. Your dedicated travel expert will look after your trip from the very first call to the moment you return and is always on hand to provide advice and support. Here’s a five step guide to how it works:</p> */}
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="text-capitalize">1. Speak to a travel expert about your tailor-made holiday</h2>
                        <p>Get inspired by the trip ideas on our website. Then, call our team of travel experts to talk to a specialist first-hand about the destination in which you’re interested. Our travel experts will listen carefully to understand exactly what it is you’re looking for (and also what you want to avoid) while delivering unrivalled personal service and absolute attention to detail.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="text-capitalize">2. Plan & refine your itinerary</h2>
                        <p className="mb-4">Your dedicated travel expert will take into consideration what you’ve talked about and then apply personal experience to create a bespoke itinerary for you. Working with your expert you'll then develop the itinerary together. All our experts will help you explore options, choose accommodation to suit your style and budget and add exceptional experiences as well. Between you, you'll have the opportunity to polish the itinerary until you are perfectly satisfied that this personalised suggestion meets your travel wishlist and are ready to book.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="text-capitalize">3. Pre-trip support</h2>
                        <p className="mb-4">Once you're happy you have the perfect itinerary, your dedicated travel expert will book every element. Your expert will remain in contact right up until the point of departure in case you have any questions about your holiday or want to make any changes to the itinerary that you’ve agreed. Want to tweak something or add on a couple more days? No problem.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="text-capitalize">4. While you’re away</h2>
                        <p className="mb-4">Our service continues throughout the time that you’re away. You’ll be issued with the Exsus travel app, loaded with all of your trip details and extra information relevant to your holiday. The app is free and can be downloaded from both the Apple and Google Play stores prior to your holiday. Your travel expert will send you the log-in information two weeks prior to your departure. You’ll then be looked after by our handpicked partners on the ground but you will also have 24 hour access to us on a special number for any unforeseen eventualities that need to be dealt with.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="text-capitalize">5. On your return</h2>
                        <p className="mb-4">Once you’re back from your trip we like to stay in touch to ensure that you had the experience that you were expecting and that the service you enjoyed was as it should have been. And, if you like, because we’ve got to know you a little better and like to talk about travel, we’ll make some suggestions relevant to you for your next escape!</p>
                        <p className="mb-4">Start planning your luxury tailor-made holiday today by <a href="contact_us.html">contacting one of our travel experts</a></p>
                        <p className="mb-4">Alternatively, explore the tailor-made holiday options on our site <a href="destinations.html"> by destination</a> or <a href="holiday_types_landing.html">by style of holiday</a></p>
                        <p>You can read <a href="exsus_reviews.html">reviews of Exsus</a> from recent clients here.</p>
                    </div>
                </div>
            </section>

            <section className="card_blk_row dark_grey pt-5 pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card_blk_inr card_blk_overlay">
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
                            <div className="card_blk_inr card_blk_overlay">
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
                <div className="container">
                    <EnquiryButton />
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <Signup />
                </div>
            </section>
        </Layout>
    );
}
