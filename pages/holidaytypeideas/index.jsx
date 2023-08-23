import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService, holidaytypesService } from 'services';
import { Inspireme } from 'components';
import { useRouter } from 'next/router';
import Select from 'react-select';

export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [holidayTypes, setholidayTypes] = useState(null);
    const [holidaytypesDetails, setHolidaytypesDetails] = useState();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [valueWithBr, setnewValueWithBr] = useState('');
    const [headingText, setHeadingText] = useState('LUXURY SAFARI HOLIDAYS IN AFRICA');

    const optionsData = [
        { value: "", label: "Filter by destination" },
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
    ]

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [selectedOptionMonth, selectedOptionData] = useState(null);

    const handleOptionChange = (selectedOption) => {
        // selectedOption1 = selectedOption.filter((i) => i.value !== '' && typeof i.value !== 'undefined');
        selectedOptionData(selectedOption);
    };

    const selectedSec = (itemId) => {
        // console.log('itemId', itemId);
        var text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        if (itemId == 'overview') {
            text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        } else if (itemId == 'countries') {
            text = "COUNTRIES IN AFRICA";
        } else if (itemId == 'itineraries') {
            text = "TAILOR-MADE AFRICA HOLIDAY ITINERARIES";
        } else if (itemId == 'places_to_stay') {
            text = "PLACES TO STAY IN AFRICA";
        } else {
            text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
        }
        setHeadingText(text);
        // LUXURY SAFARI HOLIDAYS IN AFRICA
        // COUNTRIES IN AFRICA
        // TAILOR-MADE AFRICA HOLIDAY ITINERARIES
        // PLACES TO STAY IN AFRICA
        // EXPERIENCES IN AFRICA
    };

    const router = useRouter();
    const { id } = router.query;
    const { hcode } = router.query;


    useEffect(() => {
        selectedOptionData(optionsData[0]);
        // holidaytypesService.getAll().then(x => {
        // console.log('destinationService', x);
        //     const desiredKey = 1; // The desired key to access
        //     const desiredHolidayTypes = x.find(item => item.id == desiredKey);
        //     setholidayTypes(desiredHolidayTypes.holiday_type_translations[0].holiday_type_overview_text);
        // });

        // let id = 1;
        holidaytypesService.getHolidaytypeDetailsById(id).then(x => {
            // console.log('getHolidaytypesDetails', x);
            setHolidaytypesDetails(x.data.attributes);
            // const lines = x.data.attributes?.overview_text.split('\n');
            // console.log('lines', lines);
            const oldText = x.data.attributes?.overview_text;
            var newValueWithBr = oldText?.replace(/\n/g, "<br />");
            setnewValueWithBr(newValueWithBr);
            // console.log('x.data.attributes.holiday_type_images.data[0].attributes.image_path2', 'https://d33ys3jnmuivbg.cloudfront.net/ilimages/' + x.data.attributes.holiday_type_images.data[0].attributes.image_path);

            const imageCheck = x.data.attributes.holiday_type_images.data;
            // console.log('imageCheck', imageCheck);
            imageCheck.forEach(element => {
                if (element.attributes.image_type == 'banner') {
                    // console.log('x.data.attributes.holiday_type_images.data[0].attributes.image_path', x.data.attributes.holiday_type_images.data[0].attributes.image_path);
                    setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data.attributes.holiday_type_images.data[0].attributes.image_path);
                } else if (element.attributes.image_type == 'thumbnail') {
                    // setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data.attributes.holiday_type_images.data[0].attributes.image_path);
                }
            });
        });

        // console.log('background image', backgroundImage);

        
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <>
            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                        <div className="banner_commn_cls"> {/*  holiday_types_detls_banner */}
                                <img src={backgroundImage} alt="holiday_types_detls_card02" className="img-fluid" />
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="destination_tab_row light_grey pb-0">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="holiday_types_landing.html">Holiday Types</a></li>
                            <li><a href="holiday_types_type.html">Once In A Lifetime Holidays</a></li>
                            {/* <li>Ultimate Journeys</li> */}
                            <li>{headingText}</li>
                        </ul>
                    </div>

                    <div className="destination_tab_inr">
                        <h2 className="tab_tilte">ULTIMATE JOURNEYS & INSPIRATION</h2>
                        <div className="destinations_cntnt_blk destination_para pt-0">
                            <p dangerouslySetInnerHTML={{ __html: valueWithBr }} />
                            {/* <p>This is the big one, the holiday that you’ve been dreaming of. If you’ve been building up to taking the ultimate journey, we can help. If you want your tailor-made holiday to be the most remarkable, experience-filled time away that you can have than talk to our travel specialists about their ideas for no-holds-barred adventure, escapism and exploration.</p>
                            <p>Maybe your idea of the ultimate holiday is unadulterated luxury and the chance to enjoy some of the most incredible places to stay anywhere in the world. Perhaps it’s an extra-special experience or exclusive opportunity to do something truly once-in-a-lifetime. Maybe it’s about being away longer, travelling further, going deeper into a destination or even ticking off more than one country in the course of the same trip.</p>
                            <p>Whatever your definition of the ultimate journey we’re experienced at delivering the most exceptional holidays in the most extraordinary destinations, whether it’s a chance to explore <a href="#">America’s Southwest in incomparable style, undertake a grand tour of Indochina</a> or roam through some of the great wilderness and wildlife areas of the world on our <a href="#">tour of Legendary Southern Africa.</a> For more inspiration contact our team of creative, well-travelled specialists.</p> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                <div className="container">
                    <h3 className="title_cls">TOP DESTINATIONS FOR ULTIMATE JOURNEYS</h3>
                    <div className="card_slider_row">
                        <div className="carousel00 region_carousel00">
                            <div className="row">
                                <div className="col-12">
                                    <div className="destination_dropdwn_row d-block d-md-flex">
                                        <div className="banner_dropdwn_blk">
                                            <div className="select_drpdwn">
                                            <Select
                                                placeholder="Filter by month"
                                                className="basic-single"
                                                classNamePrefix="select"
                                                isDisabled={isDisabled}
                                                isLoading={isLoading}
                                                isClearable={isClearable}
                                                isRtl={isRtl}
                                                isSearchable={isSearchable}
                                                name="color"
                                                options={optionsData}
                                                isMulti
                                                onChange={handleOptionChange}
                                                value={selectedOptionMonth}
                                            />                                                
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
                                        <p>We've found 25 destinations for Ultimate journeys</p>
                                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                                            <label className="pt-2 pt-lg-0">Arrange by:</label>
                                            <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                                                <li><a href="#" className="active">Recommended</a></li>
                                                <li><a href="#">Alphabetical</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types01.jpg" alt="holiday_types01" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">BIG GAME & GRAPEVINES</a></h4>
                                                <ul>
                                                    <li>South Africa in Serious Style</li>
                                                    <li>South Africa</li>
                                                    <li>From £5,185 per person</li>
                                                    <li>Travel to:<span>Cape Town & Around, Greater Kruger & Panorama Region, Winelands</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>9 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types02.jpg" alt="holiday_types02" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">A FASHION HOLIDAY IN ITALY</a></h4>
                                                <ul>
                                                    <li>Milan, Florence and Rome in Style</li>
                                                    <li>Italy</li>
                                                    <li>From £8,250 per person</li>
                                                    <li>Travel to:<span>Florence and Tuscany, Milan, Italian Lakes & Northern Italy, Rome, Umbria & Central Italy</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>9 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types03.jpg" alt="holiday_types03" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">TASTING SOUTH AMERICAg</a></h4>
                                                <ul>
                                                    <li>Seriously Stylish Gourmet Adventure To Peru, Chile & Argentina</li>
                                                    <li>Argentina, Peru, Chile</li>
                                                    <li>From £9,950 per person</li>
                                                    <li>Travel to:<span>Buenos Aires & the Pampas, Cordoba, Mendoza & Winelands, Lima & The Desert Coast, Santiago & Central Chile</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>12 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types04.jpg" alt="holiday_types04" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">THE PEARLS OF SERENDIP</a></h4>
                                                <ul>
                                                    <li>Sri Lanka in Ultimate Style</li>
                                                    <li>Sri Lanka</li>
                                                    <li>From £7,850 per person</li>
                                                    <li>Travel to:<span>Colombo & Western Sri Lanka, Southern & Southwest Coast, Sri Lanka's Hill Country</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>12 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types05.jpg" alt="holiday_types05" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">BUSH TALES & CAMPFIRES</a></h4>
                                                <ul>
                                                    <li>Ultimate Southern Africa Adventure</li>
                                                    <li>South Africa, Namibia, Botswana, Zambia & Malawi</li>
                                                    <li>From £37,685 per person</li>
                                                    <li>Travel to:<span>Cape Town & Around, Lake Malawi & Likoma Island, Livingstone & Victoria Falls, Luangwa Valley</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>28 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types06.jpg" alt="holiday_types06" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">MARVELLOUS MEERKATS & FABULOUS FYNBOS</a></h4>
                                                <ul>
                                                    <li>Ultimate Family Adventure to South Africa</li>
                                                    <li>South Africa</li>
                                                    <li>From £9,825 per person</li>
                                                    <li>Travel to:<span>Cape Town & Around, Garden Route & Little Karoo, Madikwe & Northwest, Western & Northern Cape</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>12 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types07.jpg" alt="holiday_types07" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">UNDER THE VOLCANO</a></h4>
                                                <ul>
                                                    <li>Mexico In Ultimate Style</li>
                                                    <li>Mexico</li>
                                                    <li>From £8,150 per person</li>
                                                    <li>Travel to:<span>Colonial Mexico & the North, Mexico City & Around, Mexico's Pacific Coast, Southern Mexico</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>12 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types08.jpg" alt="holiday_types08" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">YOU ABSOLUTE BEAUTY!</a></h4>
                                                <ul>
                                                    <li>Australia in Ultimate Style</li>
                                                    <li>Australia</li>
                                                    <li>From £31,050 per person</li>
                                                    <li>Travel to:<span>New South Wales, Northern Australia, Queensland, South Australia</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>22 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-4 col-xxl-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../images/holiday_types09.jpg" alt="holiday_types09" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4><a href="#">THE ROYAL ROAD TO ANGKOR</a></h4>
                                                <ul>
                                                    <li>Thailand & Cambodia in Ultimate Style</li>
                                                    <li>Thailand & Cambodia</li>
                                                    <li>From £13,900 per person</li>
                                                    <li>Travel to:<span>Bangkok & Central Thailand, Koh Kood & Koh Chang, Phnom Penh, Saigon & Mekong Delta</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>13 nights</span>
                                                <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase" fdprocessedid="r5vpm6s">Show 9 more holiday ideas
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"></path></svg>
                                    </button>
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
                    <button className="btn prmry_btn make_enqury_btn">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container">
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
