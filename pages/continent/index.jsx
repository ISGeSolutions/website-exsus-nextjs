import { useState, useEffect } from 'react';
import { destinationService } from 'services';
import Iframe from 'react-iframe';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import Country from '../country/index'; // Adjust the path accordingly
import ContinentCountry from '../continentcountries/index'; // Adjust the path accordingly
import ContinentItinararies from '../continentitineraries/index'; // Adjust the path accordingly
import ContinentPlacesToStay from '../continentplacetostay/index'; // Adjust the path accordingly
import ContinentOverview from '../continentoverview/index'; // Adjust the path accordingly

export default Index;

function Index() {
    const [destinationDetails, setDestinationDetails] = useState();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [headingText, setHeadingText] = useState('LUXURY SAFARI HOLIDAYS IN AFRICA');
    const [mapVariable, setMapVariable] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // State to track the active tab
    const router = useRouter();
    const { destinationcode } = router.query;

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const toggleTab = (itemId) => {
        var text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        if (itemId == 'overview') {
            const redirectUrl = regionWiseUrl + '/continent?destinationcode=' + destinationcode;
            window.history.pushState(null, null, redirectUrl);
            text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        } else if (itemId == 'countries') {
            const redirectUrl = regionWiseUrl + '/continentcountries?destinationcode=' + destinationcode;
            window.history.pushState(null, null, redirectUrl);
            text = "COUNTRIES IN AFRICA"; // action="/countryregions?countrycode=south-africa"
        } else if (itemId == 'itineraries') {
            const redirectUrl = regionWiseUrl + '/continentitineraries?destinationcode=' + destinationcode;
            window.history.pushState(null, null, redirectUrl);
            text = "TAILOR-MADE AFRICA HOLIDAY ITINERARIES"; // action="/countryitineraries?countrycode=south-africa"
        } else if (itemId == 'places-to-stay') {
            const redirectUrl = regionWiseUrl + '/continentplacetostay?destinationcode=' + destinationcode;
            window.history.pushState(null, null, redirectUrl);
            text = "PLACES TO STAY IN AFRICA"; // action="/countryplacetostay?countrycode=south-africa"
        } else {
            text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        }
        setHeadingText(text);
        if (activeTab !== itemId) {
            setActiveTab(itemId);
            // window.history.pushState(null, null, redirectUrl); // Update the URL
        }
    };

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

    useEffect(() => {
        // destinationService.getAllItineraries().then(x => {
        //     setItineraries(x.data);
        // });

        // let id = 1;
        destinationService.getDestinationDetails(destinationcode).then(x => {
            setDestinationDetails(x.data.attributes);

            const map_latitude = x.data.attributes?.map_latitude;
            const map_longitude = x.data.attributes?.map_longitude;
            // const map_latitude = "40.7128";
            // const map_longitude = "-74.0060";

            const test = `https://www.google.com/maps/embed/v1/place?q=` + map_latitude + `,` + map_longitude + `&key=AIzaSyDIZK8Xr6agksui1bV6WjpyRtgtxK-YQzE`;
            setMapVariable(test);

            // const lines = x.data.attributes?.overview_text.split('\n');
            // const oldText = x.data.attributes?.overview_text;
            // var newValueWithBr = oldText?.replace(/\\n/g, "");
            // setnewValueWithBr(newValueWithBr);
            const imageCheck = x.data.attributes.destination_images.data;
            imageCheck.forEach(element => {
                if (element.attributes.image_type == 'main') {
                    setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages" + element.attributes.image_path);
                } else if (element.attributes.image_type == 'thumbnail') {
                }
            });
            // setDestinationLandingDetails(x)
        });

        $('.banner_map_tab').click(function () {
            $('.banner_map_blk').addClass('banner_map_active')
        });
        $('.banner_img_tab').click(function () {
            $('.banner_map_blk').removeClass('banner_map_active')
        });

        $('.banner_tab_blk button').click(function () {
            $('.banner_tab_blk button').removeClass("banner_tab_active");
            $(this).addClass('banner_tab_active');
        });

        $(document).ready(function () {
            $('.destination_contries_filter li a').click(function () {
                $('.destination_contries_filter li a').removeClass('active');
                $(this).addClass('active');
            });
        });

        window.addEventListener('resize', equalHeight(true));

    }, []);

    return (
        <>
            <Head>
                <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script>
                <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script>
            </Head>
            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                        </a>
                    </div>
                </div>
                <div className="banner_tab_blk">

                    <button className="btn banner_map_tab">Map</button>
                    <button className="btn banner_img_tab banner_tab_active">Images</button>
                </div>
                <div className="banner_map_blk">
                    <Iframe width="640px"
                        height="320px"
                        id=""
                        className=""
                        display="block"
                        src={mapVariable}
                        position="relative" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" */}
                </div>
                {/* <p>{mapVariable}</p> */}
            </section>

            <section className="destination_tab_row light_grey pb-0">
                <div className="container-md">
                    <div className="bookmark_row">
                        <p style={{ color: `white` }}>{destinationDetails?.attributes?.page_friendly_url}</p>
                        {/* <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="destinations.html">Destinations</a></li>
                            <li>Asia</li>
                        </ul> */}
                    </div>
                    <div className="destination_tab_inr">
                        <h2 className="tab_tilte">
                            {/* {destinationDetails?.header_text} */}
                            {headingText}
                        </h2>
                        <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'overview' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('overview')} id="pills-overview-tab" data-bs-toggle="pill" data-bs-target="#pills-overview" type="button" role="tab" aria-controls="pills-overview" aria-selected="true">Ovierview</button>
                                {/* <button onClick={handleUrlChange}>Change URL</button> */}
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'countries' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('countries')} id="pills-countries-tab" data-bs-toggle="pill" data-bs-target="#pills-countries" type="button" role="tab" aria-controls="pills-countries" aria-selected="false">Countries</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'itineraries' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('itineraries')} id="pills-itineraries-tab" data-bs-toggle="pill" data-bs-target="#pills-itineraries" type="button" role="tab" aria-controls="pills-itineraries" aria-selected="false">Itineraries</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'places-to-stay' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('places-to-stay')} id="pills-places-to-stay-tab" data-bs-toggle="pill" data-bs-target="#pills-places-to-stay" type="button" role="tab" aria-controls="pills-places-to-stay" aria-selected="false">Places to stay</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="tab-content" id="pills-tabContent">
                    {/* {activeTab === 'home' && <div>Home Content</div>}
                {activeTab === 'about' && <div>About Content</div>}
                {activeTab === 'contact' && <div>Contact Content</div>} */}
                    {activeTab === 'overview' && <div className={activeTab === 'overview' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab" tabIndex="0">
                        <ContinentOverview />
                    </div>}
                    {activeTab === 'countries' && <div className={activeTab === 'countries' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-countries" role="tabpanel" aria-labelledby="pills-countries-tab" tabIndex="0">
                        <ContinentCountry />
                    </div>}
                    {activeTab === 'itineraries' && <div className={activeTab === 'itineraries' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-itineraries" role="tabpanel" aria-labelledby="pills-itineraries-tab" tabIndex="0">
                        <ContinentItinararies />
                    </div>}
                    {activeTab === 'places-to-stay' && <div className={activeTab === 'places-to-stay' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-places-to-stay" role="tabpanel" aria-labelledby="pills-places-to-stay-tab" tabIndex="0">
                        <ContinentPlacesToStay />
                    </div>}
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
                    <form className="newslettr_form d-block d-sm-flex">
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
                    </form>
                </div>
            </section>
        </>
    );
}