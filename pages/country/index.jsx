import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService, countriesService, destinationService, itinerariesService, hotelService } from 'services';
import Iframe from 'react-iframe'
import { NavLink } from 'components';
import { useRouter } from 'next/router';
import Select from 'react-select';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

import CountryRegions from '../countryregions/index'; // Adjust the path accordingly
import CountrytItinararies from '../countryitineraries/index'; // Adjust the path accordingly
import CountryPlacesToStay from '../countryplacetostay/index'; // Adjust the path accordingly
import CountryWhentogo from '../countrywhentogo/index'; // Adjust the path accordingly
import CountryOverview from '../countryoverview/index'; // Adjust the path accordingly

import Head from 'next/head';

export default Country;

function Country() {

    const router = useRouter();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const { countrycode } = router.query;
    const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
    const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
    const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
    const [countryData, setCountryData] = useState(null);

    const countryOptions = [
        { value: "", label: "Filter by country" },
        { value: "Asia", label: "Asia" },
        { value: "Hong Kong & Macau", label: "Hong Kong & Macau" },
        { value: "Malaysia & Borneo", label: "Malaysia & Borneo" },
        { value: "Singapore", label: "Singapore" },
        { value: "Indonesia", label: "Indonesia" },
        { value: "Japan", label: "Japan" },
        { value: "Cambodia", label: "Cambodia" },
        { value: "Vietnam", label: "Vietnam" },
        { value: "China", label: "China" },
        { value: "Thailand", label: "Thailand" },
        { value: "Burma", label: "Burma" },
        { value: "Laos", label: "Laos" }
    ];

    const regionOptions = [
        { value: "", label: "Filter by region" },
        { value: "Everything", label: "Everything" },
        { value: "Barefoot", label: "Barefoot" },
        { value: "Beach", label: "Beach" },
        { value: "Boutique hotel", label: "Boutique hotel" },
        { value: "Chic design", label: "Chic design" },
        { value: "Cultural Immersion", label: "Cultural Immersion" },
        { value: "Eco tourism", label: "Eco tourism" },
        { value: "Family-Friendly", label: "Family-Friendly" },
        { value: "Food & Wine", label: "Food & Wine" },
        { value: "Guiding", label: "Guiding" },
        { value: "Hideaway", label: "Hideaway" },
        { value: "Honeymoon", label: "Honeymoon" },
        { value: "Lodge", label: "Lodge" },
        { value: "Luxury hotel", label: "Luxury Hotel" },
        { value: "Off the beaten track", label: "Off the beaten track" },
        { value: "Owner run", label: "Owner run" },
        { value: "Peace & quiet", label: "Peace & quiet" },
        { value: "Private groups", label: "Private groups" },
        { value: "Romantic", label: "Romantic" },
        { value: "Rustic", label: "Rustic" },
        { value: "Seriously special", label: "Seriously special" },
        { value: "Service & Hospitality", label: "Service & Hospitality" },
        { value: "Setting & Views", label: "Setting & Views" },
        { value: "Snorkelling & Driving", label: "Snorkelling & Driving" },
        { value: "Spa & Wellness", label: "Spa & Wellness" },
        { value: "Unusal", label: "Unusal" },
        { value: "Village life", label: "Village life" },
        { value: "Walking & trekking", label: "Walking & trekking" },
        { value: "Water activities", label: "Water activities" },
        { value: "Wildlife & Nature", label: "Wildlife & Nature" },
        { value: "Adventure", label: "Adventure" },
        { value: "Couples", label: "Couples" },
        { value: "Educational", label: "Educational" },
        { value: "Multi-activity", label: "Multi-activity" },
        { value: "Teenagers", label: "Teenagers" },
        { value: "Landscapes & Scenery", label: "Landscapes & Scenery" },
        { value: "City hotel", label: "City hotel" }
    ];

    const monthOptions = [
        { value: "", label: "Filter by month" },
        { value: "All months", label: "All months" },
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" }
    ];

    const [users, setUsers] = useState(null);
    // const [destinationDropdown, setDestinationDropdown] = useState(null);
    // const [destination, setDestination] = useState(null);
    const [country, setCountry] = useState(null);
    const [itinerary, setItinerary] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [itineraries, setItineraries] = useState(null);

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const handleOptionCountryChange = (selectedOption) => {
        selectedOption = selectedOption.filter((i) => i.value !== '' && typeof i.value !== 'undefined');
        setSelectedOptionCountry(selectedOption);
        // this.setState({ selectedOption }, () =>
        // );
    };

    const handleOptionRegionChange = (selectedOption) => {
        selectedOption = selectedOption.filter((i) => i.value !== '' && typeof i.value !== 'undefined');
        setSelectedOptionRegion(selectedOption);
    };

    const handleOptionMonthChange = (selectedOption) => {
        selectedOption = selectedOption.filter((i) => i.value !== '' && typeof i.value !== 'undefined');
        setSelectedOptionMonth(selectedOption);
    };

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`;
    };

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`);
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

    const [redirectUrl, setRedirectUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // State to track the active tab
    const [headingText, setHeadingText] = useState('LUXURY HOLIDAYS IN ' + countrycode?.toUpperCase());

    const toggleTab = (itemId) => {
        var text = "LUXURY SAFARI HOLIDAYS IN " + countrycode.toUpperCase();
        if (itemId == 'overview') {
            const redirectUrl = regionWiseUrl + '/country?countrycode=' + countrycode;
            window.history.pushState(null, null, redirectUrl);
            text = "LUXURY HOLIDAYS IN " + countrycode.toUpperCase();
        } else if (itemId == 'regions') {
            const redirectUrl = regionWiseUrl + '/countryregions?countrycode=' + countrycode;
            window.history.pushState(null, null, redirectUrl);
            text = "REGIONS IN " + countrycode.toUpperCase(); // action="/countryregions?countrycode=south-africa"
        } else if (itemId == 'itineraries') {
            const redirectUrl = regionWiseUrl + '/countryitineraries?countrycode=' + countrycode;
            window.history.pushState(null, null, redirectUrl);
            text = countrycode.toUpperCase() + " ITINERARIES"; // action="/countryitineraries?countrycode=south-africa"
        } else if (itemId == 'places-to-stay') {
            const redirectUrl = regionWiseUrl + '/countryplacetostay?countrycode=' + countrycode;
            window.history.pushState(null, null, redirectUrl);
            text = "LUXURY HOTELS, CAMPS & LODGES IN " + countrycode.toUpperCase(); // action="/countryplacetostay?countrycode=south-africa"
        } else if (itemId == 'when-to-go') {
            const redirectUrl = regionWiseUrl + '/countrywhentogo?countrycode=' + countrycode;
            window.history.pushState(null, null, redirectUrl);
            text = "WHEN TO GO TO " + countrycode.toUpperCase(); // action="/countryplacetostay?countrycode=south-africa"
        } else {
            text = "LUXURY SAFARI HOLIDAYS IN " + countrycode.toUpperCase();
        }
        setHeadingText(text);
        if (activeTab !== itemId) {
            setActiveTab(itemId);
            // window.history.pushState(null, null, redirectUrl); // Update the URL
        }
    };

    useEffect(() => {
        setSelectedOptionCountry(countryOptions[0]);
        setSelectedOptionRegion(regionOptions[0]);
        setSelectedOptionMonth(monthOptions[0]);

        // countriesService.getAll().then(x => {
        //     // console.log('destinationService', x);
        //     const desiredKey = 1; // The desired key to access
        //     const desiredCountry = x.find(item => item.id == desiredKey);
        //     // console.log('desiredCountry2', desiredCountry.country_translations[0].country_overview_text);
        //     var oldText = desiredCountry.country_translations[0].country_overview_text;
        //     var newValueWithBr = oldText?.replace(/\\n/g, "");
        //     setCountry(newValueWithBr);
        // });

        // itinerariesService.getAll().then(desiredItinerary => {
        //     // const desiredKey = 1; // The desired key to access
        //     // const desiredItinerary = x.find(item => item.id == desiredKey);
        //     // console.log('desiredItinerary', desiredItinerary);
        //     setItinerary(desiredItinerary);
        // });

        destinationService.getAllItineraries().then(x => {
            setItineraries(x.data);
        });

        // hotelService.getAll().then(desiredHotel => {
        //     // const desiredKey = 1; // The desired key to access
        //     // const desiredHotel = x.find(item => item.id == desiredKey);
        //     // console.log('desiredHotel', desiredHotel);
        //     setHotel(desiredHotel);
        // });

        // userService.getAll().then(x => setUsers(x));
        const carousel = document.querySelector('#carouselExampleInterval');
        new bootstrap.Carousel(carousel);

        console.log('countrycode', countrycode);
        if (countrycode) {
            countriesService.getCountryDetails(countrycode).then(x => {
                setCountryData(x.data);
            });
        }
        window.addEventListener('resize', equalHeight(true));

    }, [countrycode]);

    return (
        <>
            <Head>
                <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script>
                <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script>
            </Head>
            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {countryData?.attributes?.country_images?.data?.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleInterval"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {
                            countryData?.attributes?.country_images?.data?.map((element, index) => (
                                element?.attributes?.image_type == 'banner' && (
                                    <NavLink href="#" className="carousel-item active" data-bs-interval="5000" key={index}>
                                        <div className="banner_commn_cls" style={{ backgroundImage: `url(${`https://d33ys3jnmuivbg.cloudfront.net/ilimages/` + element?.attributes?.image_path})` }}></div>
                                    </NavLink>
                                )
                            ))}
                        {/* <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls destination_overvw_banner01"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner02 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner03 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner04 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner05 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner06 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner07 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner08 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner09 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner10 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner11 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner12 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="destination_overvw_banner13 banner_commn_cls"></div>
                        </a> */}
                    </div>
                </div>
                <div className="banner_tab_blk">
                    <button className="btn banner_map_tab">Map</button>
                    <button className="btn banner_img_tab banner_tab_active">Images</button>
                </div>
                <div className="banner_map_blk">
                    <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin"
                        width="640px"
                        height="320px"
                        id=""
                        className=""
                        display="block"
                        position="relative" />
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                </div>
            </section>

            <section className="destination_tab_row light_grey pb-0">
                <div className="container-md">
                    <div className="bookmark_row">
                        <p style={{ color: `white` }}>{countryData?.attributes?.friendly_url}</p>
                        {/* <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="destinations.html">Destinations</a></li>
                            <li>Asia</li>
                        </ul> */}
                    </div>
                    <div className="destination_tab_inr">
                        <h2 className="tab_tilte">{countryData?.attributes?.header_text}</h2>
                        <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'overview' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('overview')} id="pills-overview-tab" data-bs-toggle="pill" data-bs-target="#pills-overview" type="button" role="tab" aria-controls="pills-overview" aria-selected="true">Ovierview</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'regions' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('regions')} id="pills-countries-tab" data-bs-toggle="pill" data-bs-target="#pills-countries" type="button" role="tab" aria-controls="pills-countries" aria-selected="false">Countries</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'itineraries' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('itineraries')} id="pills-itineraries-tab" data-bs-toggle="pill" data-bs-target="#pills-itineraries" type="button" role="tab" aria-controls="pills-itineraries" aria-selected="false">Itineraries</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'places-to-stay' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('places-to-stay')} id="pills-places-to-stay-tab" data-bs-toggle="pill" data-bs-target="#pills-places-to-stay" type="button" role="tab" aria-controls="pills-places-to-stay" aria-selected="false">Places to stay</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={activeTab === 'when-to-go' ? 'active nav-link' : 'nav-link'}
                                    onClick={() => toggleTab('when-to-go')} id="pills-when-to-go-tab" data-bs-toggle="pill" data-bs-target="#pills-when-to-go" type="button" role="tab" aria-controls="pills-when-to-go" aria-selected="false">When to go</button>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="tab-content" id="pills-tabContent">
                    {activeTab === 'overview' && <div className={activeTab === 'overview' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab" tabIndex="0">
                        <CountryOverview data={countryData?.attributes} />
                    </div>}
                    {activeTab === 'regions' && <div className={activeTab === 'regions' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-countries" role="tabpanel" aria-labelledby="pills-countries-tab" tabIndex="0">
                        <CountryRegions data={countryData?.attributes} />
                    </div>}
                    {activeTab === 'itineraries' && <div className={activeTab === 'itineraries' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-itineraries" role="tabpanel" aria-labelledby="pills-itineraries-tab" tabIndex="0">
                        <CountrytItinararies data={countryData?.attributes} />
                    </div>}
                    {activeTab === 'places-to-stay' && <div className={activeTab === 'places-to-stay' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-places-to-stay" role="tabpanel" aria-labelledby="pills-places-to-stay-tab" tabIndex="0">
                        <CountryPlacesToStay data={countryData?.attributes} />
                    </div>}
                    {activeTab === 'when-to-go' && <div className={activeTab === 'when-to-go' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-when-to-go" role="tabpanel" aria-labelledby="pills-when-to-go-tab" tabIndex="0">
                        <CountryWhentogo data={countryData?.attributes} />
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
