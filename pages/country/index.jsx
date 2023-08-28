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

    equalHeight(false);

    const [redirectUrl, setRedirectUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // State to track the active tab
    const [headingText, setHeadingText] = useState('LUXURY HOLIDAYS IN ' + countrycode.toUpperCase());

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
        }  else if (itemId == 'when-to-go') {
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
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="5" aria-label="Slide 6"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="6" aria-label="Slide 7"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="7" aria-label="Slide 8"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="8" aria-label="Slide 9"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="9" aria-label="Slide 10"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="10" aria-label="Slide 11"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="11" aria-label="Slide 12"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="12" aria-label="Slide 13"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
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
                        </a>
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
                        {/* <p style={{color: `white`}}>{holidaytypes?.attributes?.page_friendly_url}</p> */}
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="destinations.html">Destinations</a></li>
                            <li>Asia</li>
                        </ul>
                    </div>
                    <div className="destination_tab_inr">
                        <h2 className="tab_tilte">{headingText}</h2>
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
                        <div className="container-md">
                            <section className="destination_para">
                                {/* <p>{destination | json}</p> */}
                                {/* {/* <p><pre>{JSON.stringify(destination, null, 2)}</pre></p> */}
                                {/* <p dangerouslySetInnerHTML={{ __html: country }} /> */}
                                <p>Warning: Asia is highly addictive. Whether it’s a rickshaw ride through hectic Hanoi, a fascinating adventure amidst the ancient Angkor temples or diving and snorkelling in some of the warmest, clearest seas on the planet, Asia is jam-packed with culture, adventure - and variety.</p>
                                <p>A truly tantalising continent, Asia promises extraordinary experiences for every traveller. Whether you’re after a luxury honeymoon in South-East Asia, a family adventure holiday in Southern Asia or a cultural holiday to the Far East, you can expect some of the most beautiful beaches and most incredible luxury hotels in the world, fast-paced cities, tranquil village life and mouthwatering food. Asia has it all.</p>
                                <p>Take a journey through temple-laced Cambodia or Malaysia; island-hop across the other-worldly archipelago of Indonesia; and soak up the buzz of floating markets in Vietnam, Laos and Thailand. Delve into emerald jungles and encounter enthralling wildlife in Borneo; or relish the pulsating energy of Asia’s most cosmopolitan cities: Hong Kong, Macau and Singapore. Then there’s beguiling Japan, a cultural odyssey through time, while Bhutan and Myanmar have just begun to unveil their treasures to the world, and we wouldn’t want you to miss it.</p>
                                <p>To design your own bespoke Asian holiday, call and speak to one of our experts on 020 7337 9010 or <a href="#">Enquire Now.</a></p>
                            </section>

                            <section className="favrites_blk_row favrites_blk_small_card_row">
                                <div className="container-md">
                                    <h3 className="title_cls">Popular countries in Asia</h3>
                                    <div className="card_slider_row">
                                        <i id="left">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                                        </i>
                                        <div className="carousel00">
                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img01.jpg" alt="small_card_img01" className="img-fluid" />
                                                    </div>
                                                    <h4>
                                                        China
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img02.jpg" alt="small_card_img02" className="img-fluid" />
                                                    </div>
                                                    <h4>
                                                        Japan
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img03.jpg" alt="small_card_img03" className="img-fluid" />
                                                    </div>
                                                    <h4>Thailand
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img04.jpg" alt="small_card_img04" className="img-fluid" />
                                                    </div>
                                                    <h4>Vietnam
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img05.jpg" alt="small_card_img05" className="img-fluid" />
                                                    </div>
                                                    <h4>
                                                        Indonesia
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img06.jpg" alt="small_card_img06" className="img-fluid" />
                                                    </div>
                                                    <h4>
                                                        Malaysia & Borneo
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img07.jpg" alt="small_card_img07" className="img-fluid" />
                                                    </div>
                                                    <h4>Burma
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img08.jpg" alt="small_card_img08" className="img-fluid" />
                                                    </div>
                                                    <h4>Cambodia
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>

                                            <div className="card_slider_inr card_slider_inr_sml">
                                                <a href="#">
                                                    <div className="card_slider_inr_sml_img">
                                                        <img src="./../../../images/small_card_img09.jpg" alt="small_card_img09" className="img-fluid" />
                                                    </div>
                                                    <h4>Laos
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                    </h4>
                                                </a>
                                            </div>
                                        </div>
                                        <i id="right">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                        </i>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                            <div className="container-md">
                                <h3 className="title_cls">Favourite trip ideas</h3>
                                <div className="card_slider_row">
                                    <div className="carousel00">
                                        <div className="row">
                                            {itineraries?.map((item) => (
                                                <div className="col-sm-6 col-lg-4" key={item.id}>
                                                    <div className="card_slider_inr">
                                                        <div className="card_slider">
                                                            <NavLink href={generateDynamicLink(item)} className="card_slider_img">
                                                                {item?.attributes?.itinerary_images?.data.map((element, index) => (
                                                                    element.attributes.image_type == 'thumbnail' ? (
                                                                        <img key={index} src={`https://d33ys3jnmuivbg.cloudfront.net/ilimages` + element.attributes.image_path} alt="destination card01" className="img-fluid" />
                                                                    ) : (
                                                                        ''
                                                                    )
                                                                ))}
                                                            </NavLink>
                                                            <div className="card_slider_cnt">
                                                                <h4><a href="#">{item?.attributes?.itin_name}</a></h4>
                                                                <ul>
                                                                    <li>{item?.attributes?.header_text}</li>
                                                                    <li>Indonesia</li>
                                                                    <li>{item?.attributes?.itinerary_country_contents?.data[0]?.attributes?.guideline_price_notes_index}</li>
                                                                    <li>Travel to:<span>{item?.attributes?.sub_header_text}</span></li>
                                                                </ul>
                                                            </div>
                                                            <button className="btn card_slider_btn">
                                                                <span>{item?.attributes?.no_of_nites_notes}</span>
                                                                <span className="view_itnry_link" onClick={handleRedirect}>View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="card_blk_row dark_grey">
                            <div className="container-md">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card_blk_inr card_blk_overlay">
                                            <a href="#" target="_blank">
                                                <img src="./../../../images/destination_overview01.jpg" alt="Card image 07" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Itinerary Ideas in Africa</h3>
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
                                                <img src="./../../../images/destination_overview02.jpg" alt="Card image 08" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Places to Stay in Asia</h3>
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
                    </div>}
                    {activeTab === 'regions' && <div className={activeTab === 'regions' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-countries" role="tabpanel" aria-labelledby="pills-countries-tab" tabIndex="0">
                        <CountryRegions />
                    </div>}
                    {activeTab === 'itineraries' && <div className={activeTab === 'itineraries' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-itineraries" role="tabpanel" aria-labelledby="pills-itineraries-tab" tabIndex="0">
                        <CountrytItinararies />
                    </div>}
                    {activeTab === 'places-to-stay' && <div className={activeTab === 'places-to-stay' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-places-to-stay" role="tabpanel" aria-labelledby="pills-places-to-stay-tab" tabIndex="0">
                        <CountryPlacesToStay />
                    </div>}
                    {activeTab === 'when-to-go' && <div className={activeTab === 'when-to-go' ? 'active show tab-pane fade' : 'tab-pane fade'} id="pills-when-to-go" role="tabpanel" aria-labelledby="pills-when-to-go-tab" tabIndex="0">
                        <CountryWhentogo />
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
