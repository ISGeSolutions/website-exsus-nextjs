import { useState, useEffect } from 'react';
import { Link, Spinner, Signup } from 'components';
import { destinationService, alertService, userService } from 'services';
import { Inspireme } from 'components';
import Head from 'next/head';
import { NavLink } from 'components';
import { useRouter } from 'next/router';
import generateDynamicLink from 'components/utils/generateLink';
import Image from "next/image";
import Select from 'react-select';

export default CountryItinararies;

function CountryItinararies() {

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
    const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
    const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
    const [itineraries, setItineraries] = useState([]);
    const [page, setPage] = useState(0); // Current page
    const [metaData, setMetaData] = useState([]);

    const router = useRouter();

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

    const itemsPerPage = 9; // Number of items to load per page
    const [visibleItems, setVisibleItems] = useState(itemsPerPage)

    // const handleLoadMore = () => {
    //     // console.log('handleLoadMore')
    //     setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    // };

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

    let regionWiseUrl = '/uk';
    let region = 'uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            regionWiseUrl = '/' + window.site_region;
            region = window.site_region;

            // setMyVariable(window.site_region);
        }
    }

    const loadMoreData = () => {
        destinationService.getAllItineraries(page + 1).then((response) => {
            setMetaData(response.meta.pagination);
            const newItineraries = response.data;
            if (newItineraries.length > 0) {
                setItineraries((prevItineraries) => [...prevItineraries, ...newItineraries].reduce((accumulator, current) => accumulator.some(item => item.id === current.id) ? accumulator : [...accumulator, current], []));
                setPage(page + 1);
            }
        });
    };

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=${region}`;
    };

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=${region}`);
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
        setSelectedOptionCountry(countryOptions[0]);
        setSelectedOptionRegion(regionOptions[0]);
        setSelectedOptionMonth(monthOptions[0]);

        loadMoreData();

        window.addEventListener('resize', equalHeight(true));
    }, []);

    return (
        <>
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
                                        <div className="dropdown_grp_blk">
                                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                <Select
                                                    placeholder="Filter by country"
                                                    // defaultValue={countryOptions[0]}
                                                    isDisabled={isDisabled}
                                                    isLoading={isLoading}
                                                    isClearable={isClearable}
                                                    isRtl={isRtl}
                                                    isSearchable={isSearchable}
                                                    name="color"
                                                    options={countryOptions}
                                                    isMulti
                                                    // value={selectedOptionCountry}
                                                    onChange={handleOptionCountryChange}
                                                />
                                            </div>
                                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                <Select
                                                    placeholder="Filter by region"
                                                    // defaultValue={regionOptions[0]}
                                                    isDisabled={isDisabled}
                                                    isLoading={isLoading}
                                                    isClearable={isClearable}
                                                    isRtl={isRtl}
                                                    isSearchable={isSearchable}
                                                    name="color"
                                                    options={regionOptions}
                                                    isMulti
                                                    // value={selectedOptionRegion}
                                                    onChange={handleOptionRegionChange}
                                                />
                                            </div>
                                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                <Select
                                                    placeholder="Filter by month"
                                                    // defaultValue={monthOptions[0]}
                                                    isDisabled={isDisabled}
                                                    isLoading={isLoading}
                                                    isClearable={isClearable}
                                                    isRtl={isRtl}
                                                    isSearchable={isSearchable}
                                                    name="color"
                                                    options={monthOptions}
                                                    isMulti
                                                    // value={selectedOptionMonth}
                                                    onChange={handleOptionMonthChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="banner_inspire_btn ps-0 ps-md-2">
                                            <button type="button" className="btn btn-primary prmry_btn">Inspire me
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                    {/* <div className="destination_dropdwn_row d-block d-md-flex">
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
                                                </div> */}
                                </div>
                                <div className="col-12">
                                    <div className="destination_filter_result d-block d-lg-flex">
                                        <p>We've found {metaData?.total} holiday ideas in Asia for you</p>
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

                                {itineraries?.slice(0, itineraries.length).map((item) => (
                                    <div className="col-sm-6 col-lg-4" key={item.id}>
                                        <div className="card_slider_inr">
                                            <div className="card_slider">
                                                <NavLink href={generateDynamicLink(item)} className="card_slider_img">
                                                    {item?.attributes?.itinerary_images?.data.map((element, index) => (
                                                        element.attributes.image_type == 'thumbnail' ? (
                                                            <img key={index} src={element.attributes.image_path} alt="destination card01" className="img-fluid" />
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

                                <div className="col-12">
                                    {metaData.total > page * itemsPerPage && (
                                        <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase" onClick={loadMoreData}>Show {(metaData.total - page * itemsPerPage) > 9 ? 9 : (metaData.total - page * itemsPerPage) > 9} more holiday
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
