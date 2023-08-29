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

export default ContinentPlacesToStay;

function ContinentPlacesToStay() {

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
    const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
    const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
    const [itineraries, setItineraries] = useState(null);

    const router = useRouter();

    const countryOptions = [
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

    const freshProds = [
        {
            id: "1",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "2",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "3",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "4",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "5",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "6",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "7",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "8",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "9",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
        {
            id: "10",
            src: "./../../images/destination_card09.jpg",
            title: "ORANGUTANS & DRAGONS",
            list: [
                "Wildlife Adventure to Indonesia",
                "Indonesia",
                "From £4,650 per person",
                "Travel to:<span>Bali, Eastern Indonesia, Java, Kalimantan</span>"
            ],
            nights: "13 nights",
            itinerariesLink: ""
        },
    ];

    let length = freshProds.length;
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
        if ((visible + 3) >= (length)) {
            setVisiblePagination(false);
        }
    };

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
        setSelectedOptionCountry(countryOptions[0]);
        setSelectedOptionRegion(regionOptions[0]);
        setSelectedOptionMonth(monthOptions[0]);

        destinationService.getAllItineraries().then(x => {
            setItineraries(x.data);
        });

    }, []);


    return (
        <>
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

                                <div className="col-sm-6 col-lg-4">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../images/destination_hotel01.jpg" alt="destination_hotel01" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel02.jpg" alt="destination_hotel02" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel03.jpg" alt="destination_hotel03" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel04.jpg" alt="destination_hotel04" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel05.jpg" alt="destination_hotel05" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel06.jpg" alt="destination_hotel06" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel07.jpg" alt="destination_hotel07" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel08.jpg" alt="destination_hotel08" className="img-fluid" />
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
                                                <img src="./../../images/destination_hotel09.jpg" alt="destination_hotel09" className="img-fluid" />
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
        </>
    );
}
