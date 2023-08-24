import { useState, useEffect } from 'react';
import { Link, Spinner, Signup } from 'components';
import { destinationService, alertService, userService } from 'services';
import { Inspireme } from 'components';
import Head from 'next/head';
import { NavLink } from 'components';
import { useRouter } from 'next/router';
import generateDynamicLink from 'components/utils/generateLink';
import Image from "next/image";

export default Index;

function Index() {

    const router = useRouter();

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const [itineraries, setItineraries] = useState(null);

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`;
    };

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/destinations/africa/africa-itineraries/vietnam-in-classic-style`);
    };

    useEffect(() => {
        destinationService.getAllItineraries().then(x => {
            setItineraries(x.data);
        });
        // return homeService.inspireMe(data)
        //     .then(() => {
        //         alertService.success('Make an enquiry successful', { keepAfterRouteChange: true });
        //         router.push('home');
        //     })
        //     .catch(alertService.error);
    }, []);

    return (
        <>
            <Head>
                <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script>
                <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script>
            </Head>
            <section class="favrites_blk_row favrites_blk_no_slider_row light_dark_grey pt-5">
                <div class="container-md">
                    <h2 class="search_result_title">Your search result</h2>
                    <h3 class="title_cls search_result_title_green">Find and plan your perfect tailor-made holiday worldwide</h3>
                    <div class="card_slider_row">
                        <div class="carousel00">
                            <div class="row">
                                <div class="col-12">
                                    <div class="destination_dropdwn_row d-block d-md-flex">
                                        <Inspireme />
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="destination_filter_result d-block d-lg-flex">
                                        <p>We've found 80 holiday ideas that are right for you.</p>
                                        <div class="destination_contries_filter d-inline-block d-lg-flex">
                                            <label class="pt-2 pt-lg-0">Arrange by:</label>
                                            <ul class="d-inline-block d-lg-flex pt-2 pt-lg-0">
                                                <li><a href="#">Low - High</a></li>
                                                <li><a href="#" class="active">High - Low</a></li>
                                                <li><a href="#">By duration</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

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

                                {/* <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <a class="card_slider_img">
                                                <img src="images/advance_search01.jpg" alt="advance card01" class="img-fluid" />
                                            </a>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">GOOD MORNING, VIETNAM!</a></h4>
                                                <ul>
                                                    <li>Vietnam in Classic Style</li>
                                                    <li>Vietnam</li>
                                                    <li>From £2,050 per person</li>
                                                    <li>Travel to:<span>Central Vietnam, Saigon & Mekong Delta, Southern Beaches & Islands</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>12 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search02.jpg" alt="advance card05" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">SPA & WELLNESS ESCAPE TO THAILAND</a></h4>
                                                <ul>
                                                    <li>Surrender to Siam</li>
                                                    <li>Thailand</li>
                                                    <li>From £2,050 per person</li>
                                                    <li>Travel to:<span>Bangkok & Central Thailand, Koh Samui & Gulf of Thailand</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>7 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search03.jpg" alt="advance card03" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">KUALA LUMPUR & TIOMAN ISLAND</a></h4>
                                                <ul>
                                                    <li>Luxury Malaysia Escape</li>
                                                    <li>Malaysia</li>
                                                    <li>From £2,250 per person</li>
                                                    <li>Travel to:<span>Malaysian Islands, Peninsular Malaysia</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>8 nights</span>
                                                <span class="view_itnry_link">View itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search04.jpg" alt="advance card02" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">SAFFRON ROBES & BEACH SANDALS</a></h4>
                                                <ul>
                                                    <li>Thailand's Culture & Beaches</li>
                                                    <li>Thailand</li>
                                                    <li>From £2,350 per person</li>
                                                    <li>Travel to:<span>Bangkok & Central Thailand</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>10 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search05.jpg" alt="advance card06" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">TEMPLE BELLS & INCENSE</a></h4>
                                                <ul>
                                                    <li>Thailand in Classic Style</li>
                                                    <li>Thailand</li>
                                                    <li>From £2,350 per person</li>
                                                    <li>Travel to: <span>Bangkok & Central Thailand, Koh Samui & Gulf of Thailand, Northern Thailand</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>12 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search06.jpg" alt="advance card04" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">ISLAND OF THE GODS</a></h4>
                                                <ul>
                                                    <li>Bali in Classic Style</li>
                                                    <li>Indonesia</li>
                                                    <li>From £2,400 per person</li>
                                                    <li>Travel to:<span>Bali</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>10 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search07.jpg" alt="advance card07" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">IN THE SHADE OF THE BANYAN TREE</a></h4>
                                                <ul>
                                                    <li>Thailand off the Beaten Path</li>
                                                    <li>Thailand</li>
                                                    <li>From £2,450 per person</li>
                                                    <li>Travel to:<span>Bangkok & Central Thailand, Koh Kood & Koh Chang, Northern Thailand</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>13 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search08.jpg" alt="advance card08" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">RICE FIELDS & LOTUS PONDS</a></h4>
                                                <ul>
                                                    <li>Bali in Serene Style</li>
                                                    <li>Indonesia</li>
                                                    <li>From £2,500 per person</li>
                                                    <li>Travel to:<span>Bali</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>10 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4">
                                    <div class="card_slider_inr">
                                        <div class="card_slider">
                                            <div class="card_slider_img">
                                                <img src="images/advance_search09.jpg" alt="advance card09" class="img-fluid" />
                                            </div>
                                            <div class="card_slider_cnt">
                                                <h4><a href="#">HILL TRIBES, HIGHLANDS & HALONG BAY</a></h4>
                                                <ul>
                                                    <li>Northern Vietnam in Depth</li>
                                                    <li>Vietnam</li>
                                                    <li>From £2,650 per person</li>
                                                    <li>Travel to:<span>Hanoi, Halong Bay & Northern Vietnam</span></li>
                                                </ul>
                                            </div>
                                            <button class="btn card_slider_btn">
                                                <span>10 nights</span>
                                                <span class="view_itnry_link">View this itinerary<em class="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div class="col-12">
                                    <button class="btn prmry_btn make_enqury_btn mx-auto text-uppercase">Show 9 more holiday ideas
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 266.77"><path fill-rule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                    </button>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </section>



            {/* <section className="banner_blk_row" style={{ height: `200px` }}>
                
            </section> */}

            <section class="make_enqury_row">
                <div class="container-md">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
                    <button class="btn prmry_btn make_enqury_btn" onclick="window.open('contact_us.html')">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" class="newslettr_row">
                <div class="container-md">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <form class="newslettr_form d-block d-sm-flex">
                        <div class="newlettr_inpt">
                            <input type="text" class="form-control" placeholder="Full name and title" />
                        </div>
                        <div class="newlettr_inpt ps-0 ps-sm-2">
                            <input type="email" class="form-control" placeholder="Your email address" />
                        </div>
                        <div class="newlettr_btn ps-0 ps-sm-2">
                            <button type="submit" class="btn btn-primary prmry_btn">Sign up
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
