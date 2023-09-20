import { useState, useEffect } from 'react';
import { Link, Spinner, Signup } from 'components';
import { destinationService, alertService, userService } from 'services';
import { Inspireme } from 'components';
import Head from 'next/head';
import { NavLink } from 'components';
import { useRouter } from 'next/router';
import generateDynamicLink from 'components/utils/generateLink';
import Image from "next/image";

export default ContinentCountry;

function ContinentCountry() {
    const router = useRouter();
    const { destinationcode } = router.query;
    const [allCountries, setAllCountries] = useState([]);
    const [destinationName, setdestinationName] = useState("");
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

    useEffect(() => {
        destinationService.getDestinationDetails(destinationcode).then(x => {
            // const lines = x.data.attributes?.overview_text.split('\n');
            // const oldText = x.data.attributes?.overview_text;
            // var newValueWithBr = oldText?.replace(/\\n/g, "");
            // setnewValueWithBr(newValueWithBr);
            setdestinationName(x.data.attributes.destination_name);
            setAllCountries(x.data?.attributes?.countries?.data);
            // setDestinationLandingDetails(x)
        });

    }, []);

    return (
        <>
            <div className="container">
                <section className="destination_para">
                    <p>Whether it’s a rickshaw ride through hectic Hanoi in Vietnam, a fascinating adventure amidst the ancient Angkor temples in Cambodia, or diving and snorkelling in some of the warmest, clearest seas on the planet, Asia is jam-packed with culture, adventure - and variety.</p>
                </section>
            </div>

            <section className="card_blk_row destinations_blk_row light_dark_grey">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="destination_contries_filter d-block d-md-flex">
                                <ul>
                                    <li><a href="#" className="active">Exsus recommends</a></li>
                                    <li><a href="#">Alphabetical</a></li>
                                </ul>
                            </div>
                        </div>
                        {allCountries?.map((countries, i) => (
                            <div className="col-sm-6 col-lg-4 col-xxl-3" key={countries?.id}>
                                <div className="card_blk_inr">
                                    <a onClick={() => handleCountryClick(countries?.id)} target="_blank">
                                        <img src="./../../images/destination_countries01.jpg" alt="destination countries01" className="img-fluid" />
                                        <div className="card_blk_cntnt card_blk_sml_arw">
                                            <div className="row align-items-center">
                                                <div className="col-11">
                                                    <div className="card_blk_txt">
                                                        <h3 className="mb-0">{countries?.attributes?.country_name}</h3>
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
                        ))}
                    </div>
                </div>
            </section>

            <section className="card_blk_row dark_grey">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card_blk_inr card_blk_overlay">
                                <a href="#" target="_blank">
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
                                <a href="#">
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
