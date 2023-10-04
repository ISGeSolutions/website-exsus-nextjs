import { useState, useEffect } from 'react';
import Iframe from 'react-iframe'
import { Layout } from 'components/users';
import { userService, holidaytypesService, destinationService } from 'services';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NavLink } from 'components';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;
import CustomMultiValue from "./CustomMultiValue";
import Select, { components } from 'react-select';



export default Index;

function Index() {
    // console.log('Component re-rendered');
    const [users, setUsers] = useState(null);
    const [holidaytypesDetails, setHolidaytypesDetails] = useState();
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [valueWithBr, setnewValueWithBr] = useState('');
    const [headingText, setHeadingText] = useState('LUXURY SAFARI HOLIDAYS IN AFRICA');
    const [itineraries, setItineraries] = useState([]);
    const [page, setPage] = useState(0); // Current page
    const itemsPerPage = 9; // Number of items to load per page
    const [metaData, setMetaData] = useState([]);
    // const [visibleItems, setVisibleItems] = useState(itemsPerPage)

    const width = '250px'
    const styles = {
        control: (provided) => ({
            ...provided,
            width
        }),
        menu: (provided) => ({
            ...provided,
            width
        }),
        valueContainer: (provided, state) => ({
            whiteSpace: "nowrap",
            // textOverflow: "ellipsis",
            overflow: "hidden",
            flex: "1 1 0%",
            position: "relative"
        }),
        input: (provided, state) => ({
            ...provided,
            display: "inline"
        })
    };


    const InputOption = ({
        getStyles,
        Icon,
        isDisabled,
        isFocused,
        isSelected,
        children,
        innerProps,
        ...rest
    }) => {
        const [isActive, setIsActive] = useState(false);
        const onMouseDown = () => setIsActive(true);
        const onMouseUp = () => setIsActive(false);
        const onMouseLeave = () => setIsActive(false);

        // styles
        let bg = "transparent";
        if (isFocused) bg = "#eee";
        if (isActive) bg = "#B2D4FF";

        const style = {
            alignItems: "center",
            backgroundColor: bg,
            color: "inherit",
            display: "flex "
        };

        // prop assignment
        const props = {
            ...innerProps,
            onMouseDown,
            onMouseUp,
            onMouseLeave,
            style
        };

        return (
            <components.Option
                {...rest}
                isDisabled={isDisabled}
                isFocused={isFocused}
                isSelected={isSelected}
                getStyles={getStyles}
                innerProps={props}
            >
                <input type="checkbox" checked={isSelected} readOnly />
                {children}
            </components.Option>
        );
    };

    const EnquiryButton = () => {
        const router = useRouter();

        const handleEnquiryClick = () => {
            router.push(regionWiseUrl + '/contact-us'); // Navigate to the /enquiry page
        };

        return (
            <button className="btn prmry_btn make_enqury_btn" onClick={handleEnquiryClick}> Make an enquiry
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
            </button>
        );
    };

    // const LoadMorePagination = ({ data }) => {
    //     const [visibleItems, setVisibleItems] = useState(itemsPerPage);
    // }

    // const handleLoadMore = () => {
        // console.log('handleLoadMore')
    //     setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    // };

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

    const handleOptionChange = (selectedOption) => {
        // selectedOption1 = selectedOption.filter((i) => i.value !== '' && typeof i.value !== 'undefined');
        selectedOptionData(selectedOption);
    };

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=${region}`;
    };

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=${region}`);
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
        selectedOptionData(optionsData[0]);
        holidaytypesService.getHolidaytypeDetails(hcode).then(x => {
            // console.log(x);
            setHolidaytypesDetails(x.data.attributes);
            const oldText = x.data.attributes?.overview_text;
            var newValueWithBr = oldText?.replace(/\\n/g, "");
            setnewValueWithBr(newValueWithBr);

            const imageCheck = x.data.attributes.holiday_type_group_images.data;
            const newBackgroundImages = [];
            imageCheck.forEach(element => {
                if (element.attributes.image_type == 'banner') {
                    newBackgroundImages.push(element.attributes.image_path);
                } else if (element.attributes.image_type == 'thumbnail') {
                }
            });
            setBackgroundImage(newBackgroundImages);
        });

        // destinationService.getAllItineraries().then(x => {
        //     setItineraries(x.data);
        //     setIsLoading(false);
        // });

        loadMoreData();

        window.addEventListener('resize', equalHeight(true));

    }, []);




    return (
        <>
            <Head>
                {/* <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script> */}
            </Head>
            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
                        {backgroundImage.map((_, index) => (
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
                        {/* <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls"> */}
                        {backgroundImage.map((imagePath, index) => (
                            // <img src={imagePath} alt="holiday_types_detls_card02" className="img-fluid" />
                            <NavLink href="#" className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="5000">
                                <div className="banner_commn_cls" style={{ backgroundImage: `url(${imagePath})` }}></div>
                            </NavLink>
                        ))}
                        {/* </div>
                        </a> */}
                    </div>
                </div>
                <div className="banner_map_blk">
                    {/* <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin"
                        width="640px"
                        height="320px"
                        id=""
                        className=""
                        display="block"
                        position="relative" /> */}

                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                </div>
            </section>

            <section className="destination_tab_row light_grey">
                <div className="container">
                    <div className="bookmark_row">
                        <p style={{ color: `white` }}>{holidaytypesDetails?.friendly_url}</p>
                        {/* <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="holiday_types_landing.html">Holiday Types</a></li>
                            <li>{headingText}</li>
                        </ul> */}
                    </div>

                    <div className="destination_tab_inr">
                        <h2 className="tab_tilte">{holidaytypesDetails?.header_text}</h2>
                        <div className="destinations_cntnt_blk destination_para pt-0">
                            <div dangerouslySetInnerHTML={{ __html: valueWithBr }} />
                            {/* <p>Everyone’s definition of a dream trip is different.</p>
                            <p>Whether you are after the big one, the holiday that you have always dreamed of but never went on, or want an adventure that leaves nothing out, we are ready to help - how about dinner with a geisha in Japan, an oceanfront lodge only reached by boat in Costa Rica, a helicopter ride over New Zealand’s stunning scenery or a luxurious cross country train journey with unparalleled views of South Africa.</p>
                            <p>Whatever a 'once-in-a-lifetime' holiday or honeymoon means to you, our experts can create a totally tailor-made luxury experience that perfectly satisfies your wishlist.</p>
                            <p>All our itineraries are designed as inspiration. Tell us what you're after on your trip and we'll help you select the best hotels and experiences.</p> */}
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
                                        {/* <div className="text-center"> */}
                                        <div className="banner_dropdwn_blk">
                                            <div className="select_drpdwn">
                                                <Select
                                                    placeholder="Filter by destinations"
                                                    className='select_container_country'
                                                    classNamePrefix="select_country"
                                                    isDisabled={isDisabled}
                                                    isLoading={isLoading}
                                                    isClearable={isClearable}
                                                    isRtl={isRtl}
                                                    styles={styles}
                                                    isSearchable={isSearchable}
                                                    name="color"
                                                    options={optionsData}
                                                    isMulti
                                                    hideSelectedOptions={false}
                                                    onChange={handleOptionChange}
                                                    value={selectedOptionMonth}
                                                    components={{
                                                        Option: InputOption, MultiValue: CustomMultiValue
                                                    }}
                                                />
                                            </div>
                                            {/* </div> */}
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
                                        <p>We've found {metaData?.total} destinations for Ultimate journeys</p>
                                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                                            <label className="pt-2 pt-lg-0">Arrange by:</label>
                                            <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                                                <li><a href="#" className="active">Recommended</a></li>
                                                <li><a href="#">Alphabetical</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {itineraries?.slice(0, itineraries.length).map((item, index) => (
                                    <div className="col-sm-6 col-lg-4 col-xxl-3" key={index}>
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
                                                </NavLink>
                                                <div className="card_slider_cnt">
                                                    <h4><a href="#">{item?.attributes?.itin_name}</a></h4>
                                                    <ul>
                                                        <li>{item?.attributes?.header_text}</li>
                                                        {/* <li>Indonesia</li> */}
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
                                ))}

                                <div className="col-12">
                                    {metaData.total > page * itemsPerPage && (
                                        <button onClick={loadMoreData} className="btn prmry_btn make_enqury_btn mx-auto text-uppercase" fdprocessedid="r5vpm6s">Show {(metaData.total - page * itemsPerPage) > 9 ? 9 : (metaData.total - page * itemsPerPage) > 9} more items
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"></path></svg>
                                        </button>
                                    )}
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
                    <EnquiryButton />
                    {/* <button className="btn prmry_btn make_enqury_btn" >Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button> */}
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
