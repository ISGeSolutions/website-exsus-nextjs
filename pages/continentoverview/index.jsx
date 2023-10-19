import { useState, useEffect } from 'react';
import { Link, Spinner, Signup } from 'components';
import { destinationService, alertService, userService } from 'services';
import { Inspireme } from 'components';
import Head from 'next/head';
import { NavLink } from 'components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default ContinentOverview;

function ContinentOverview({ sendDataToParent }) {

    const router = useRouter();
    const [itineraries, setItineraries] = useState(null);
    const [valueWithBr, setnewValueWithBr] = useState('');
    const { destinationcode } = router.query;
    const itemsPerPage = 9; // Number of items to load per page
    const [visibleItems, setVisibleItems] = useState(itemsPerPage)
    const [allCountries, setAllCountries] = useState([]);
    const [destinationName, setdestinationName] = useState("");

    const { t } = useTranslation();
    const [holidayTitle, setHolidayTitle] = useState(t('holidayTitle'));

    const handleLoadMore = () => {
        // console.log('handleLoadMore')
        setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
    };



    const handleClick = (e) => {
        // Call the callback function to send data to the parent
        sendDataToParent(e);
    }

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const handleCountryClick = (id) => {
        if (id) {
            router.push(regionWiseUrl + `/country?countrycode=` + id);
        }
    }

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`);
    };

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`;
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

        destinationService.getDestinationDetails(destinationcode).then(x => {

            // const lines = x.data.attributes?.overview_text.split('\n');
            setdestinationName(x.data.attributes.destination_name);

            const oldText = x.data.attributes?.overview_text;
            var valueWithBr = oldText?.replace(/\\n/g, "");
            const replacement = holidayTitle;

            // Use JavaScript string interpolation to replace the variable
            const newValueWithBr = valueWithBr.replace(/\${holiday}/g, replacement);
            setnewValueWithBr(newValueWithBr);

            // Define a regular expression pattern to match words starting with special characters
            // const pattern = /[\W\d]+[\w]+/g;
            // const pattern = "/[$][\w]+/g";

            // Use the match() method to find matches in the text
            // const matches = valueWithBr.match(pattern);
            // console.log('matches22', matches);



            setAllCountries(x.data?.attributes?.countries?.data);
            // setDestinationLandingDetails(x)
        });

        destinationService.getAllItineraries().then(x => {
            setItineraries(x.data);
        });

        // destinationService.getAllCountries().then(x => {
        //     setAllCountries(x.data);
        // })

        window.addEventListener('resize', equalHeight(true));

        // Using window.onload to detect full page load
        window.onload = () => {
            setTimeout(() => {
                const redirectUrl = regionWiseUrl + '/continent?destinationcode=' + destinationcode;
                // debugger;
                if (redirectUrl) {
                    router.push(redirectUrl);
                }
            }, 0);
        };

    }, [destinationcode, router, holidayTitle]);

    return (
        <>
            <div className="container">
                <section className="destination_para">
                    <div dangerouslySetInnerHTML={{ __html: valueWithBr }} />
                </section>

                <section className="favrites_blk_row favrites_blk_small_card_row">
                    <div className="container">
                        <h3 className="title_cls">Popular countries in {destinationName}</h3>
                        <div className="card_slider_row">
                            <i id="left">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                            </i>
                            <div className="carousel00">
                                {allCountries?.map((countries, i) => (
                                    <div className="card_slider_inr card_slider_inr_sml" key={countries?.id}>
                                        <a onClick={() => handleCountryClick(countries?.id)}>
                                            <div className="card_slider_inr_sml_img">
                                                <img src={countries?.attributes?.country_images?.data.filter(res => res.attributes.image_type == "thumbnail")[0]?.attributes?.image_path} alt={countries?.attributes?.country_images?.data.filter(res => res.attributes?.image_type == "thumbnail")[0]?.attributes?.image_alt_text} className="img-fluid" />
                                            </div>
                                            <h4>
                                                {countries.attributes.country_name}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                            </h4>
                                        </a>
                                    </div>))}
                            </div>
                            <i id="right">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </i>
                        </div>
                    </div>
                </section>
            </div>

            <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                <div className="container">
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
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card_blk_inr card_blk_overlay">
                                <a target="_blank" onClick={() => handleClick("itineraries")}>
                                    <img src="./../../images/destination_overview01.jpg" alt="Card image 07" className="img-fluid" />
                                    <div className="card_blk_cntnt card_blk_cntnt_top">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>See all Itinerary Ideas in {destinationName}</h3>
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
                                <a onClick={() => handleClick("places-to-stay")}>
                                    <img src="./../../images/destination_overview02.jpg" alt="Card image 08" className="img-fluid" />
                                    <div className="card_blk_cntnt card_blk_cntnt_top">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>See all Places to Stay in {destinationName}</h3>
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
        </>
    );
}
