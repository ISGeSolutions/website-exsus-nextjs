import { useState, useEffect } from 'react';
import { Signup } from 'components';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Head from 'next/head';
import { holidaytypesService, destinationService } from 'services';
import { NavLink } from 'components';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { whyusService } from '../services';
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {

    const [thumbnailImage, setThumbnailImageArr] = useState([]);
    const [itineraries, setItineraries] = useState(null);
    const [testimonials, setTestimonials] = useState([]);

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
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`;
    };

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`);
    };

    const dynamicThumbnailImage = (itemId) => {
        return itemId;
    }

    const [destinationLandingList, setDestinationLandingList] = useState();
    const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();


    // form validation rules 
    const validationSchema = Yup.object().shape({
        destination: Yup.string(),
        reason: Yup.string(),
        month: Yup.string()
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

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

    const dynamicLink = (itemId, id) => {
        if (itemId && itemId == 'HG6') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=incredible-journeys&id=` + id;
        } else if (itemId && itemId == 'HG5') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=luxury-honeymoons&id=` + id;
        } else if (itemId && itemId == 'HG4') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=family-holidays&id=` + id;
        } else if (itemId && itemId == 'ADHL') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=adventure-holidays&id=` + id;
        } else if (itemId && itemId == 'LBHG') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=luxury-beach-holidays&id=` + id;
        } else if (itemId && itemId == 'HG3') {
            return regionWiseUrl + `/holidaytypeitineraries?hcode=culture-holidays&id=` + id;
        } else {
            return "#";
        }
    }

    const dynamicLinkHolidayas = (itemId, id) => {
        // if (itemId && itemId == 'AF') {
        //     return regionWiseUrl + `/destinations/africa/` + id;
        // }
        if (itemId && itemId == 'HG6') {
            return regionWiseUrl + `/holidaytypeitineraries/incredible-journeys/id`;
        } else if (itemId && itemId == 'HG5') {
            return regionWiseUrl + `/holidaytypeitineraries/luxury-honeymoons/id`;
        } else if (itemId && itemId == 'HG4') {
            return regionWiseUrl + `/holidaytypeitineraries/family-holidays/id`;
        } else if (itemId && itemId == 'ADHL') {
            return regionWiseUrl + `/holidaytypeitineraries/adventure-holidays/id`;
        } else if (itemId && itemId == 'LBHG') {
            return regionWiseUrl + `/holidaytypeitineraries/luxury-beach-holidays/id`;
        } else if (itemId && itemId == 'HG3') {
            return regionWiseUrl + `/holidaytypeitineraries/culture-holidays/id`;
        } else {
            return "#";
        }
    }

    function onSubmit(data) {
        // console.log('data', data);
        if (!data.destination && !data.reason && !data.month) {
            alertService.success('Sorry, we could not filter your request. Please select atleast one option', { keepAfterRouteChange: true });
        } else {
            router.push(`advance-search?where=` + data?.destination + `&what=` + data?.reason + `&when=` + data?.month);
        }

    }

    useEffect(() => {
        const thumbnailImageArr = [];
        holidaytypesService.getHolidaytypesLandingList().then(x => {
            // debugger;
            const imageCheckType = x.data;
            imageCheckType.forEach(elementMain => {
                if (elementMain.attributes.holiday_type_group_images.data) {
                    const dataInner = elementMain.attributes.holiday_type_group_images.data;
                    dataInner.forEach(element => {
                        if (element.attributes.image_type == 'thumbnail') {
                            const objThumbnail = {
                                "id": elementMain?.id,
                                "holiday_type_code": elementMain?.attributes?.holiday_type_group_code,
                                "holiday_type_name": elementMain?.attributes?.holiday_type_group_name,
                                "image_path": element.attributes.image_path
                            }
                            thumbnailImageArr.push(objThumbnail);
                        }
                    });
                }
            });
            // console.log('thumbnailImageArr', thumbnailImageArr);
            setThumbnailImageArr(thumbnailImageArr);
        });

        destinationService.getDestinationLandingList().then(x => {
            // console.log('getDestinationLandingList', x);
            setDestinationLandingList(x.data);
            // setDestinationLandingDetails(x)
        });

        holidaytypesService.getHolidaytypesLandingList().then(x => {
            setHolidaytypesLandingList(x.data);
        });

        destinationService.getAllItinerariesHomePage().then(x => {
            setItineraries(x.data);
        });

        whyusService.getAllTravelReviews().then(x => {
            setTestimonials(x.data);
            // console.log(x.data);
        })

        // console.log('region', window.site_region);
        var site_region = localStorage.getItem('site_region');

        const carouselMain = document.querySelector('#carouselExampleIntervalMain');
        new bootstrap.Carousel(carouselMain);

        const carousel = document.querySelector('#Testimonials');
        new bootstrap.Carousel(carousel);

        window.addEventListener('resize', equalHeight(true));
    }, []);

    const router = useRouter();

    return (
        <>
            <Head>
                <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script>
                <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script>
            </Head>

            <section className="banner_blk_row">
                {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/images/banner01.png" />
                    </div>
                    <div>
                        <img src="/assets/images/banner02.png" />
                    </div>
                    <div>
                        <img src="/assets/images/banner03.png" />
                    </div>
                </Carousel> */}
                <div id="carouselExampleIntervalMain" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIntervalMain" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIntervalMain" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIntervalMain" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_img_custom01 banner_commn_cls"></div>
                            <div className="carousel-caption">
                                <img src="images/banner-logo.png" alt="banner-logo" className="img-fluid" />
                                <h2>Discover the Seychelles</h2>
                            </div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_img_custom02 banner_commn_cls"></div>
                            <div className="carousel-caption">
                                <img src="images/banner-logo.png" alt="banner-logo" className="img-fluid" />
                                <h2>Perfect for romance</h2>
                            </div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_img_custom03 banner_commn_cls"></div>
                            <div className="carousel-caption">
                                <img src="images/banner-logo.png" alt="banner-logo" className="img-fluid" />
                                <h2>Explore new adventure</h2>
                            </div>
                        </a>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="banner_dropdwn_row">
                        <div className="container">
                            <div className="banner_dropdwn_inr d-block d-md-flex">
                                <div className="banner_dropdwn_blk">
                                    <div className="select_drpdwn">
                                        <select aria-label="Choose a destination" name="destination" {...register('destination')} className={`form-select ${errors.destination ? 'is-invalid' : ''}`}>
                                            <option value="">Choose a destination</option>
                                            {destinationLandingList?.map((element, i) => (
                                                <option key={element?.id} value={element?.attributes?.destination_code}>{element?.attributes?.destination_name}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback mb-1">{errors.destination?.message}</div>
                                    </div>
                                </div>
                                <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                    <div className="select_drpdwn">
                                        <select aria-label="Choose a reason" name="reason" {...register('reason')} className={`form-select ${errors.reason ? 'is-invalid' : ''}`}>
                                            <option value="">Choose a reason</option>
                                            {holidaytypesLandingList?.map((element, i) => (
                                                <option key={element?.id} value={element?.attributes?.holiday_type_group_code}>{element?.attributes?.holiday_type_group_name}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback mb-1">{errors.reason?.message}</div>
                                    </div>
                                </div>
                                <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                    <div className="select_drpdwn">
                                        <select aria-label="Choose a month" name="month" {...register('month')} className={`form-select ${errors.month ? 'is-invalid' : ''}`}>
                                            <option value="">Choose a month</option>
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
                                        <div className="invalid-feedback mb-1">{errors.month?.message}</div>
                                    </div>
                                </div>
                                <div className="banner_inspire_btn ps-0 ps-md-2">
                                    <button type="submit" className="btn btn-primary prmry_btn">Inspire me
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {/* <Inspireme /> */}
            </section>

            <section className="card_blk_row">
                <div className="container">
                    <div className="row">
                        {thumbnailImage?.slice(0, 6).map((holidaytypesItem, i) => (
                            <div className="col-sm-6 col-md-6 col-lg-4" key={i}>
                                <div className="card_blk_inr">
                                    <NavLink target="_blank" href={dynamicLink(holidaytypesItem?.holiday_type_code, holidaytypesItem?.id)} as={dynamicLinkHolidayas(holidaytypesItem?.attributes?.holiday_type_group_code, holidaytypesItem?.id)}>
                                        <img src={dynamicThumbnailImage(holidaytypesItem.image_path)} alt="Card image 01" className="img-fluid" />
                                        <div className="card_blk_cntnt">
                                            <div className="row align-items-center">
                                                <div className="col-11">
                                                    <div className="card_blk_txt">
                                                        <h3>{holidaytypesItem?.holiday_type_name}</h3>
                                                        {/* <p>The ultimate romantic escapes</p> */}
                                                    </div>
                                                </div>
                                                <div className="col-1 ps-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="favrites_blk_row">
                <div className="container">
                    <h3 className="title_cls">Favourite trip ideas</h3>
                    <div className="card_slider_row">
                        <i id="left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                        </i>
                        <div className="carousel00">
                            {itineraries?.map((item) => (
                                <div className="card_slider_inr" key={item.id}>
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
                            )
                            )}
                        </div>
                        <i id="right">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </i>
                    </div>
                </div>
            </section>


            <section aria-label="Client Testimonials" className="testimonials_blk_row">
                <div className="container">
                    <div id="Testimonials" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#Testimonials"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                    aria-current={index === 0 ? 'true' : 'false'}
                                    aria-label={`Slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {testimonials.map((text, index) => (
                                <div key={index} target="_blank" className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="5000">
                                    <div className="carousel-caption">
                                        <p>{text?.attributes.review_short_text}</p>
                                        <span>{text?.attributes.client_name}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>

            <section className="card_blk_row">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card_blk_inr">
                                <a href="#" target="_blank">
                                    <img src="images/card_img07.jpg" alt="Card image 07" className="img-fluid" />
                                    <div className="card_blk_cntnt">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Luxury Family Safaris in Africa - Favourite</h3>
                                                    <p>July 04 2022</p>
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

                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card_blk_inr">
                                <a href="#">
                                    <img src="images/card_img08.jpg" alt="Card image 08" className="img-fluid" />
                                    <div className="card_blk_cntnt">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Luxury Family Holidays in the Galapagos</h3>
                                                    <p>July 04 2022</p>
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

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <Signup />
                </div>
            </section>
        </>
    );
}
