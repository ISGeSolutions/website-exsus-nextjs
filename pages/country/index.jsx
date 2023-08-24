import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService, countriesService, destinationService, itinerariesService, hotelService } from 'services';
import Iframe from 'react-iframe'
import { NavLink } from 'components';
import { useRouter } from 'next/router';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {

    const router = useRouter();
    const { destinationcode } = router.query;

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

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`;
    };

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`);
    };

    useEffect(() => {

        countriesService.getAll().then(x => {
            // console.log('destinationService', x);
            const desiredKey = 1; // The desired key to access
            const desiredCountry = x.find(item => item.id == desiredKey);
            // console.log('desiredCountry2', desiredCountry.country_translations[0].country_overview_text);
            var oldText = desiredCountry.country_translations[0].country_overview_text;
            var newValueWithBr = oldText?.replace(/\\n/g, "");
            setCountry(newValueWithBr);
        });

        itinerariesService.getAll().then(desiredItinerary => {
            // const desiredKey = 1; // The desired key to access
            // const desiredItinerary = x.find(item => item.id == desiredKey);
            // console.log('desiredItinerary', desiredItinerary);
            setItinerary(desiredItinerary);
        });

        destinationService.getAllItineraries().then(x => {
            setItineraries(x.data);
        });

        hotelService.getAll().then(desiredHotel => {
            // const desiredKey = 1; // The desired key to access
            // const desiredHotel = x.find(item => item.id == desiredKey);
            // console.log('desiredHotel', desiredHotel);
            setHotel(desiredHotel);
        });

        userService.getAll().then(x => setUsers(x));
        const carousel = document.querySelector('#carouselExampleInterval');
        new bootstrap.Carousel(carousel);
    }, []);

    return (
        <>
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
                        <h2 className="tab_tilte">LUXURY HOLIDAYS IN ASIA</h2>
                        <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-overview-tab" data-bs-toggle="pill" data-bs-target="#pills-overview" type="button" role="tab" aria-controls="pills-overview" aria-selected="true">Ovierview</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-countries-tab" data-bs-toggle="pill" data-bs-target="#pills-countries" type="button" role="tab" aria-controls="pills-countries" aria-selected="false">Countries</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-itineraries-tab" data-bs-toggle="pill" data-bs-target="#pills-itineraries" type="button" role="tab" aria-controls="pills-itineraries" aria-selected="false">Itineraries</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-places-to-stay-tab" data-bs-toggle="pill" data-bs-target="#pills-places-to-stay" type="button" role="tab" aria-controls="pills-places-to-stay" aria-selected="false">Places to stay</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab" tabIndex="0">
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
                                                                {/* <img src={backgroundThumbnailImg(item?.attributes?.itinerary_images?.data)} alt="destination card01" className="img-fluid" /> */}
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

                    </div>
                    <div className="tab-pane fade" id="pills-countries" role="tabpanel" aria-labelledby="pills-countries-tab" tabIndex="0">
                        <div className="container-md">
                            <section className="destination_para">
                                {/* <p dangerouslySetInnerHTML={{ __html: country }} /> */}
                                <p>Whether it’s a rickshaw ride through hectic Hanoi in Vietnam, a fascinating adventure amidst the ancient Angkor temples in Cambodia, or diving and snorkelling in some of the warmest, clearest seas on the planet, Asia is jam-packed with culture, adventure - and variety.</p>
                            </section>
                        </div>

                        <section className="card_blk_row destinations_blk_row light_dark_grey">
                            <div className="container-md">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="destination_contries_filter d-block d-md-flex">
                                            <ul>
                                                <li><a href="#" className="active">Exsus recommends</a></li>
                                                <li><a href="#">Alphabetical</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries01.jpg" alt="destination countries01" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Singapore</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries02.jpg" alt="destination countries02" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Malaysia & Borneo</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries03.jpg" alt="destination countries03" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Hong Kong & Macau</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries04.jpg" alt="destination countries04" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Indonesia</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries05.jpg" alt="destination countries05" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Japan</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries06.jpg" alt="destination countries06" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Cambodia</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries07.jpg" alt="destination countries07" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Vietnam</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries08.jpg" alt="destination countries08" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">China</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries09.jpg" alt="destination countries09" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Thailand</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries10.jpg" alt="destination countries10" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Burma</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries11.jpg" alt="destination countries11" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Laos</h3>
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

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr">
                                            <a href="destination_overview.html" target="_blank">
                                                <img src="./../../../images/destination_countries12.jpg" alt="destination countries12" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Philippines</h3>
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
                                                                <h3>See all Itinerary Ideas in Asia</h3>
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
                    </div>
                    <div className="tab-pane fade" id="pills-itineraries" role="tabpanel" aria-labelledby="pills-itineraries-tab" tabIndex="0">
                        <div className="container-md">
                            <section className="destination_para">
                                <p>Tailor-made luxury holidays in Asia are highly addictive.  Jam-packed with culture, adventure, wildlife and some of the most beautiful beaches in the world, Asia offers countless options for creating bespoke holidays. If you’re looking for a luxury honeymoon or family adventure holiday, travelling as a couple, group or solo, Asia has limitless opportunities for an unforgettable trip.</p>
                                <p>From the gems of South-East Asia, to the exotic Far East and exquisite Southern Asia, we've put together the following Asia holiday itineraries below to inspire you. Call 020 7337 9010 and speak to one of our experts to create your perfect bespoke Asia holiday.</p>
                            </section>
                        </div>

                        <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                            <div className="container-md">
                                <h3 className="title_cls">All Luxury Holiday Ideas in Asia</h3>
                                <div className="card_slider_row">
                                    <div className="carousel00">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="destination_dropdwn_row d-block d-md-flex">
                                                    <div className="banner_dropdwn_blk">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by country" data-live-search="true">
                                                                <option value="">Filter by country</option>
                                                                <option value="Asia">Asia</option>
                                                                <option value="Hong Kong & Macau">Hong Kong & Macau</option>
                                                                <option value="Malaysia & Borneo">Malaysia & Borneo</option>
                                                                <option value="Singapore">Singapore</option>
                                                                <option value="Indonesia">Indonesia</option>
                                                                <option value="Japan">Japan</option>
                                                                <option value="Cambodia">Cambodia</option>
                                                                <option value="Vietnam">Vietnam</option>
                                                                <option value="China">China</option>
                                                                <option value="Thailand">Thailand</option>
                                                                <option value="Burma">Burma</option>
                                                                <option value="Laos">Laos</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by property type" data-live-search="true">
                                                                <option value="">Filter by property type</option>
                                                                <option value="Everything">Everything</option>
                                                                <option value="Barefoot">Barefoot</option>
                                                                <option value="Beach">Beach</option>
                                                                <option value="Boutique hotel">Boutique hotel</option>
                                                                <option value="Chic design">Chic design</option>
                                                                <option value="Cultural Immersion">Cultural Immersion</option>
                                                                <option value="Eco tourism">Eco tourism</option>
                                                                <option value="Family-Friendly">Family-Friendly</option>
                                                                <option value="Food & Wine">Food & Wine</option>
                                                                <option value="Guiding">Guiding</option>
                                                                <option value="Hideaway">Hideaway</option>
                                                                <option value="Honeymoon">Honeymoon</option>
                                                                <option value="Lodge">Lodge</option>
                                                                <option value="Luxury hotel">Luxury Hotel</option>
                                                                <option value="Off the beaten track">Off the beaten track</option>
                                                                <option value="Owner run">Owner run</option>
                                                                <option value="Peace & quiet">Peace & quiet</option>
                                                                <option value="Private groups">Private groups</option>
                                                                <option value="Romantic">Romantic</option>
                                                                <option value="Rustic">Rustic</option>
                                                                <option value="Seriously special">Seriously special</option>
                                                                <option value="Service & Hospitality">Service & Hospitality</option>
                                                                <option value="Setting & Views">Setting & Views</option>
                                                                <option value="Snorkelling & Driving">Snorkelling & Driving</option>
                                                                <option value="Spa & Wellness">Spa & Wellness</option>
                                                                <option value="Unusal">Unusal</option>
                                                                <option value="Village life">Village life</option>
                                                                <option value="Walking & trekking">Walking & trekking</option>
                                                                <option value="Water activities">Water activities</option>
                                                                <option value="Wildlife & Nature">Wildlife & Nature</option>
                                                                <option value="Adventure">Adventure</option>
                                                                <option value="Couples">Couples</option>
                                                                <option value="Educational">Educational</option>
                                                                <option value="Multi-activity">Multi-activity</option>
                                                                <option value="Teenagers">Teenagers</option>
                                                                <option value="Landscapes & Scenery">Landscapes & Scenery</option>
                                                                <option value="City hotel">City hotel</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by month" data-live-search="true">
                                                                <option value="">Filter by month</option>
                                                                <option value="All months">All months</option>
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="destination_filter_result d-block d-lg-flex">
                                                    <p>We've found 77 holiday ideas in Asia for you</p>
                                                    <div className="destination_contries_filter d-inline-block d-lg-flex">
                                                        <label className="pt-2 pt-lg-0">Arrange by:</label>
                                                        <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                                                            <li><a href="#">By price</a></li>
                                                            <li><a href="#" className="active">Recommended</a></li>
                                                            <li><a href="#">Alphabetical</a></li>
                                                            <li><a href="#">By duration</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>



                                            {/* {itinerary?.map((itineraryDetail, i) => (
                                                <div className="col-sm-6 col-lg-4" key={itineraryDetail?.id}>
                                                    <div className="card_slider_inr">
                                                        <div className="card_slider">
                                                            <a className="card_slider_img">
                                                                <img src="./../../../images/destination_card01.jpg" alt="destination card01" className="img-fluid" />
                                                            </a>
                                                            <div className="card_slider_cnt">
                                                                <h4>
                                                                    <a href="#">
                                                                        {itineraryDetail['itinerary_translations'][0]?.itin_name}
                                                                    </a>
                                                                </h4>
                                                                <ul>
                                                                    <li>Indonesia in Idyllic Style</li>
                                                                    <li>Indonesia</li>
                                                                    <li>From £3,950 per person</li>
                                                                    <li>Travel to:<span>Bali, Java, Kalimantan, Lombok</span></li>
                                                                </ul>
                                                            </div>
                                                            <button className="btn card_slider_btn">
                                                                <span>14 nights</span>
                                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))} */}

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
                                                                {/* <img src={backgroundThumbnailImg(item?.attributes?.itinerary_images?.data)} alt="destination card01" className="img-fluid" /> */}
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

                                            {/* <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_card01.jpg" alt="destination card01" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">THE SCENT OF CLOVES</a></h4>
                                                            <ul>
                                                                <li>Indonesia in Idyllic Style</li>
                                                                <li>Indonesia</li>
                                                                <li>From £3,950 per person</li>
                                                                <li>Travel to:<span>Bali, Java, Kalimantan, Lombok</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>14 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card05.jpg" alt="destination card05" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">CALL OF THE GIBBON</a></h4>
                                                            <ul>
                                                                <li>Wildlife Adventure to Thailand</li>
                                                                <li>Thailand</li>
                                                                <li>From £5,350 per person</li>
                                                                <li>Travel to:<span>Bangkok & Central Thailand, Koh Samui & Gulf of Thailand, Northern Thailand, Phuket & Western Thailand</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>11 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card03.jpg" alt="destination card03" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Ultimate Grand Tour of Indochina</a></h4>
                                                            <ul>
                                                                <li>Spirit of the Water Dragon</li>
                                                                <li>Vietnam, Cambodia, Laos & Thailand</li>
                                                                <li>From £8,7500 per person</li>
                                                                <li>Travel to:<span>Hanoi, Halong Bay & Northern Vietnam, Koh Kood & Koh Chang, Luang Prabang, Saigon & Mekong Delta</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>18 nights</span>
                                                            <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card02.jpg" alt="destination card02" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">LAND OF THE RISING SUN</a></h4>
                                                            <ul>
                                                                <li>Japan in Classic Style</li>
                                                                <li>Japan</li>
                                                                <li>From £4,600 per person</li>
                                                                <li>Travel to:<span>Japanese Alps & Northern Honshu, Kyoto, Southern Honshu & Kyushu, Tokyo & Around</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>10 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card06.jpg" alt="destination card06" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Stupas, Sanctuaries & the Andaman Sea</a></h4>
                                                            <ul>
                                                                <li>Perfect Honeymoon to Burma</li>
                                                                <li>Burma (Myanmar), Thailand</li>
                                                                <li>From £3,150 per person</li>
                                                                <li>Travel to: <span>Bagan, Phuket & Western Thailand, The Irrawaddy, Yangon</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>12 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card04.jpg" alt="destination card04" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">FROGS' LEGS & PHO</a></h4>
                                                            <ul>
                                                                <li>Vietnam Culinary Adventure</li>
                                                                <li>Vietnam</li>
                                                                <li>From £3,950 per person</li>
                                                                <li>Travel to:<span>Central Vietnam, Hanoi, Halong Bay & Northern Vietnam, Saigon & Mekong Delta</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>11 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card07.jpg" alt="destination card07" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">FLAGSHIP JAPAN</a></h4>
                                                            <ul>
                                                                <li>Japan in Exsus Signature Style</li>
                                                                <li>Japan</li>
                                                                <li>From £12,200 per person</li>
                                                                <li>Travel to:<span>Japanese Alps & Northern Honshu, Kyoto, Southern Honshu & Kyushu, Tokyo & Around</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>13 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card08.jpg" alt="destination card08" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Headhunters & Beyond</a></h4>
                                                            <ul>
                                                                <li>Borneo Holiday in Sabah & Sarawak</li>
                                                                <li>Borneo</li>
                                                                <li>From £3,450 per person</li>
                                                                <li>Travel to:<span>Borneo, Gunung Mulu National Park, Kota Kinabalu & Surrounds, Kuching & Surrounds</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>16 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="./../../../images/destination_card09.jpg" alt="destination card09" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">ORANGUTANS & DRAGONS</a></h4>
                                                            <ul>
                                                                <li>Wildlife Adventure to Indonesia</li>
                                                                <li>Indonesia</li>
                                                                <li>From £4,650 per person</li>
                                                                <li>Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>13 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-12">
                                                <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase">Show 9 more holiday ideas
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="tab-pane fade" id="pills-places-to-stay" role="tabpanel" aria-labelledby="pills-places-to-stay-tab" tabIndex="0">
                        <div className="container-md">
                            <section className="destination_para">
                                <p>Whether you’re after a luxury honeymoon in South-East Asia, a family adventure holiday in Southern Asia or a cultural holiday to the Far East, you can expect some of the most beautiful beaches and most incredible luxury hotels in the world, fast-paced cities, tranquil village life and mouthwatering food. Asia has it all.</p>
                            </section>
                        </div>
                        <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                            <div className="container-md">
                                <h3 className="title_cls">All recommended hotels in Asia</h3>
                                <div className="card_slider_row">
                                    <div className="carousel00">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="destination_dropdwn_row d-block d-md-flex">
                                                    <div className="banner_dropdwn_blk">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by country" data-live-search="true">
                                                                <option value="">Filter by country</option>
                                                                <option value="Asia">Asia</option>
                                                                <option value="Hong Kong & Macau">Hong Kong & Macau</option>
                                                                <option value="Malaysia & Borneo">Malaysia & Borneo</option>
                                                                <option value="Singapore">Singapore</option>
                                                                <option value="Indonesia">Indonesia</option>
                                                                <option value="Japan">Japan</option>
                                                                <option value="Cambodia">Cambodia</option>
                                                                <option value="Vietnam">Vietnam</option>
                                                                <option value="China">China</option>
                                                                <option value="Thailand">Thailand</option>
                                                                <option value="Burma">Burma</option>
                                                                <option value="Laos">Laos</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by property type" data-live-search="true">
                                                                <option value="">Filter by property type</option>
                                                                <option value="Everything">Everything</option>
                                                                <option value="Barefoot">Barefoot</option>
                                                                <option value="Beach">Beach</option>
                                                                <option value="Boutique hotel">Boutique hotel</option>
                                                                <option value="Chic design">Chic design</option>
                                                                <option value="Cultural Immersion">Cultural Immersion</option>
                                                                <option value="Eco tourism">Eco tourism</option>
                                                                <option value="Family-Friendly">Family-Friendly</option>
                                                                <option value="Food & Wine">Food & Wine</option>
                                                                <option value="Guiding">Guiding</option>
                                                                <option value="Hideaway">Hideaway</option>
                                                                <option value="Honeymoon">Honeymoon</option>
                                                                <option value="Lodge">Lodge</option>
                                                                <option value="Luxury hotel">Luxury Hotel</option>
                                                                <option value="Off the beaten track">Off the beaten track</option>
                                                                <option value="Owner run">Owner run</option>
                                                                <option value="Peace & quiet">Peace & quiet</option>
                                                                <option value="Private groups">Private groups</option>
                                                                <option value="Romantic">Romantic</option>
                                                                <option value="Rustic">Rustic</option>
                                                                <option value="Seriously special">Seriously special</option>
                                                                <option value="Service & Hospitality">Service & Hospitality</option>
                                                                <option value="Setting & Views">Setting & Views</option>
                                                                <option value="Snorkelling & Driving">Snorkelling & Driving</option>
                                                                <option value="Spa & Wellness">Spa & Wellness</option>
                                                                <option value="Unusal">Unusal</option>
                                                                <option value="Village life">Village life</option>
                                                                <option value="Walking & trekking">Walking & trekking</option>
                                                                <option value="Water activities">Water activities</option>
                                                                <option value="Wildlife & Nature">Wildlife & Nature</option>
                                                                <option value="Adventure">Adventure</option>
                                                                <option value="Couples">Couples</option>
                                                                <option value="Educational">Educational</option>
                                                                <option value="Multi-activity">Multi-activity</option>
                                                                <option value="Teenagers">Teenagers</option>
                                                                <option value="Landscapes & Scenery">Landscapes & Scenery</option>
                                                                <option value="City hotel">City hotel</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by month" data-live-search="true">
                                                                <option value="">Filter by month</option>
                                                                <option value="All months">All months</option>
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="destination_filter_result d-block d-lg-flex">
                                                    <p>We've found 358 hotels in Asia for you
                                                        <button type="button" className="btn btn-primary modal_link_btn" data-bs-toggle="modal" data-bs-target="#placesToStayModal">See all accomodations on Map</button>
                                                    </p>
                                                    <div className="destination_contries_filter d-inline-block d-lg-flex">
                                                        <label className="pt-2 pt-lg-0">Arrange by:</label>
                                                        <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                                                            <li><a href="#" className="active">Recommended</a></li>
                                                            <li><a href="#">Alphabetical</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {hotel?.map((hotelDetail, i) => (
                                                <div className="col-sm-6 col-lg-4" key={hotelDetail?.id}>
                                                    <div className="card_slider_inr">
                                                        <div className="card_slider">
                                                            <a className="card_slider_img">
                                                                <img src="./../../../images/destination_hotel01.jpg" alt="destination_hotel01" className="img-fluid" />
                                                            </a>
                                                            <div className="card_slider_cnt places_to_stay_cnt">
                                                                <h4>
                                                                    <a href="#">{hotelDetail['hotel_translations'][0]?.hotel_name}
                                                                    </a>
                                                                </h4>
                                                                <ul>
                                                                    <li>Location: {hotelDetail['hotel_translations'][0]?.hotel_location} | {hotelDetail['country']['country_translations'][0]?.country_name}</li>
                                                                    <li>Price guide:
                                                                        {hotelDetail['hotel_translations'][0]?.hotel_price_text}
                                                                        {/* <span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span> */}
                                                                    </li>
                                                                    <li>
                                                                        {/* <p dangerouslySetInnerHTML={{ __html: hotelDetail['hotel_translations'][0]?.hotel_overview_text }} /> */}
                                                                        {hotelDetail['hotel_translations'][0]?.hotel_in_the_know_text}
                                                                    </li>
                                                                    {/* <li>Located in the heart of the Keliki rainforest in Bali, 1 is the perfect hotel for getting back to nature and disconnecting from the outside world. Designed by renowned architect Bill Bensley, as well as adding a touch of luxury and signature Bensley style, not a single tree was destroyed in its construction, guaranteeing an unspoilt experience of the lush green forests it sits in.</li> */}
                                                                    <li>Best for:<span>Setting & Views, Eco-tourism, Wildlife & Nature, Peace & Quiet</span></li>
                                                                </ul>
                                                                <span dangerouslySetInnerHTML={{ __html: hotelDetail['hotel_translations'][0]?.hotel_recommended_text }} />
                                                            </div>
                                                            <button className="btn card_slider_btn justify-content-end">
                                                                <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}


                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel01.jpg" alt="destination_hotel01" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">CAPELLA UBUD</a></h4>
                                                            <ul>
                                                                <li>Location: Bali | Indonesia</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Located in the heart of the Keliki rainforest in Bali, Capella Ubud is the perfect hotel for getting back to nature and disconnecting from the outside world. Designed by renowned architect Bill Bensley, as well as adding a touch of luxury and signature Bensley style, not a single tree was destroyed in its construction, guaranteeing an unspoilt experience of the lush green forests it sits in.</li>
                                                                <li>Best for:<span>Setting & Views, Eco-tourism, Wildlife & Nature, Peace & Quiet</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel02.jpg" alt="destination_hotel02" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Four Seasons Hong Kong</a></h4>
                                                            <ul>
                                                                <li>Location: Hong Kong & Macau</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Four Seasons Hong Kong offers an enticing destination within a destination. As part of the prestigious International Finance Centre, it offers unrivalled links to Hong Kong Station, with the famed Star Ferry steps away.</li>
                                                                <li>Best for:<span>City Hotel, Owner-run, Spa & Wellness, Cultural Immersion</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel03.jpg" alt="destination_hotel03" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">JW Marriott Phu Quoc, Vietnam</a></h4>
                                                            <ul>
                                                                <li>Location: Southern Beaches & Islands | Vietnam</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Set on a private beach on a sweeping bay, the luxurious JW Marriott Phu Quoc Emerald Bay Resort & Spa has a stunning setting, and thanks to being designed by inimitable architect Bill Bensley, this hotel is unique and quirky to say the least. Taking inspiration from its former alleged incarnation as a university, on arrival you will be greeted by the university mascots before entering a fantastical and brightly-coloured world.</li>
                                                                <li>Best for:<span>Chic Design, Luxury Hotel, Beach, Unusual</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel04.jpg" alt="destination_hotel04" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Kanamean Nishitomiya</a></h4>
                                                            <ul>
                                                                <li>Location: Kyoto, Southern Honshu & Kyushu | Japan</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Kanamean Nishitomiya is a traditional Japanese ryokan inn with a history dating back to the 19th century. With its tatami floors, sliding screens, slippers and kimonos, it offers a quintessential ryokan experience - alongside a Michelin-starred restaurant serving up magnificent multi-course kaiseki cuisine.</li>
                                                                <li>Best for:<span>History & Heritage, Cultural Immersion, Setting & Views, Food & Wine</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel05.jpg" alt="destination_hotel05" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Kata Rocks</a></h4>
                                                            <ul>
                                                                <li>Location: Phuket & Western Thailand | Thailand</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Set on a headland between the beaches of Kata and Kata Noi on Phuket’s vibrant southwest coast, Kata Rocks is a cool and contemporary all-villa resort offering signature Thai hospitality, gorgeous infinity pools, five-star facilities and dazzling views of the Andaman Sea.</li>
                                                                <li>Best for:<span>Private Villa, Chic Design, Honeymoon, Family-friendly</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel06.jpg" alt="destination_hotel06" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">L'Alyana Ninh Van Bay</a></h4>
                                                            <ul>
                                                                <li>Location: Southern Beaches & Islands | Vietnam</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>If you're looking for a luxury hideaway but don't want to miss out on an immersive Vietnamese experience, L'Alyana Ninh Van Bay is the perfect place. This tropical paradise, overlooking the bay and the South Vietnam highlands beyond, practices three core values to ensure that guests have an unforgettable stay: space and privacy, quality service, and expertise.</li>
                                                                <li>Best for:<span>Luxury Hotel, Setting & Views, Beach, Multi-activity</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel07.jpg" alt="destination_hotel07" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Plataran Menjangan</a></h4>
                                                            <ul>
                                                                <li><p>Location: Bali | Indonesia</p></li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Plataran Menjangan is a luxurious haven in West Bali National Park. This nature reserve is home to countless endemic species who live across mangroves, jungles and coast, and the hotel’s luxurious villas are dotted across similarly diverse environments, providing stunning views over the untouched wilderness.</li>
                                                                <li>Best for:<span>Wildlife & Nature, Beach, Multi-activity, Setting & Views</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel08.jpg" alt="destination_hotel08" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Raya Heritage</a></h4>
                                                            <ul>
                                                                <li><p>Location: Northern Thailand | Thailand</p></li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>The elegant Raya Heritage has a serene setting in lush gardens on the banks of the Ping River. This beautiful hotel takes inspiration from Lanna culture, and combines a sleek, contemporary style with traditional Thai design, alongside local touches from authentic gourmet cuisine to gorgeous suites showcasing the expert work of local craftspeople, such as handwoven baskets and pots.</li>
                                                                <li>Best for:<span>History & Heritage, Cultural Immersion, Chic Design, Luxury Hotel</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="./../../../images/destination_hotel09.jpg" alt="destination_hotel09" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">The Bale Phnom Penh</a></h4>
                                                            <ul>
                                                                <li><p>Location: Phnom Penh | Cambodia</p></li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>The Balé Phnom Penh stands regally on the banks of the majestic Mekong River, set around tropical gardens of frangipani trees, black-bottomed infinity ponds and serene Buddhas. It is a tranquil haven, set away from the bustle of the city centre. Designed for complete relaxation, the Balé showcases modern Asian architecture, giving an attractive Zen-like feel to this luxury hotel.</li>
                                                                <li>Best for:<span>Luxury Hotel, Setting & Views, Service & Hospitality, Chic Design</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end">
                                                            <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase">Show 9 more places to stay
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
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
