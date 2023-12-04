import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { NavLink } from 'components';


export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <Layout>

            <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="5" aria-label="Slide 6"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls when_to_go_banner01"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls when_to_go_banner02"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls when_to_go_banner03"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls when_to_go_banner04"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls when_to_go_banner05"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls when_to_go_banner06"></div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="trvl_info_row">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="when_to_go.html">When to go</a></li>
                            <li>January</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">WHERE TO GO ON A LUXURY HOLIDAY IN MARCH</h2>
                        <p className="when_to_go_para">Find our travel expert recommendations below</p>
                        <p className="mb-4">With the festive season well and truly over and detoxes in full swing, what better way to beat the January blues than with a luxury holiday? January is a fantastic time to travel, seeing huge slashes in flight and accommodation prices and superb deals to be found worldwide. Europe’s ski season is in full swing, while further afield, the tropics are enjoying their glorious long sunny, dry months. So, whether it’s a cosy winter getaway you seek, or some much-needed winter sun, our experts are here to advise and inspire you with their recommendations for where to holiday in January.</p>
                    </div>

                    <section className="month_wise_row">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Colombia</h4>
                                    <a href="#"><img src="images/jan_month_detail01.jpg" alt="jan_month_detail01" className="img-fluid" /></a>
                                    <p>Have an all-in-one action-packed holiday during <a href="#">Colombia’s</a> peak season. Now a UNESCO World Heritage Site, the walled port city of Cartagena is definitely worth a look for its historic, colourful buildings and pretty squares with buzzing bars and restaurants, while the Caribbean islands nearby offer some extraordinary diving opportunities. Visit the Coffee Triangle (Zona Cafetera) to sample some of the world’s best coffee in one of the gorgeous haciendas that sit in the lush tropical landscapes.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Sweden</h4>
                                    <a href="#"><img src="images/jan_month_detail02.jpg" alt="jan_month_detail02" className="img-fluid" /></a>
                                    <p>Following the Christmas season, <a href="#">Sweden’s</a> crowds largely disappear, making it the perfect time to for a snowy getaway. This is THE place for a wow-factor family adventure to keep your spirits up after the hum of Christmas. Go dog-sledding with the children or visit the unique <a href="#">ICEHOTEL</a> - with suites carved entirely of ice, it is the first of its kind.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Antigua</h4>
                                    <a href="#"><img src="images/jan_month_detail03.jpg" alt="jan_month_detail03" className="img-fluid" /></a>
                                    <p><a href="#">Antigua</a> is undoubtedly one of our favourite Caribbean islands, with its 365 beaches meaning you could visit a different one every day of the year if you wanted to. That said, we suggest sticking to the driest months of the year when the beaches are at their very best. Plus, what better way to start the year than with a week or so in the sun on a luxury beach holiday, leaving you feeling relaxed and refreshed ready for the year ahead.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Thailand</h4>
                                    <a href="#"><img src="images/jan_month_detail04.jpg" alt="jan_month_detail04" className="img-fluid" /></a>
                                    <p>A luxury wellness holiday to <a href="#">Thailand</a> might be just the ticket for a healthy start to the New Year. Thanks to its location in the tropics, most of Thailand experiences perfect weather at this time of year: its deep in the midst of its long, dry season and gloriously sunny for days on end. Luxury retreats such as <a href="#">Kata Rocks</a> in Phuket have excellent wellness programmes, where you can detox and de-stress amidst the azure waters, white-sand beaches and swaying palms.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>New Zealand</h4>
                                    <a href="#"><img src="images/jan_month_detail05.jpg" alt="jan_month_detail05" className="img-fluid" /></a>
                                    <p>A world away, down in the Southern Hemisphere, summer is in full swing. January is <a href="#">New Zealand’s</a> warmest month and a perfect time of year for exploring its world-className great outdoors. Long, bright days make it fantastic for hiking and mountain biking holidays in the South Island or adventure activities in adrenaline-fuelled Queenstown, while coastal hotspots such as the Bay of Islands are perfect for catching the sun and enjoying coastal walks on gorgeous beaches. Post-Christmas festivities continue into the New Year and you’ll encounter plenty of festivals, concerts and events up and down the country for all the family to enjoy. </p>
                                </div>
                            </div>
                        </div>
                        <p>For more suggestions on where to go in January, <a href="contact_us.html">make an enquiry online</a> today or give our specialists a call on 020 7337 9010.</p>
                    </section>
                </div>
            </section>

            <section className="favrites_blk_row dark_grey py-5">
                <div className="container">
                    <div className="month_clickable_links">
                        <p>For where to go in other months, see our Holiday calendar</p>
                        <ul>
                            <li><a href="#">January</a></li>
                            <li><a href="#">February</a></li>
                            <li><a href="#">March</a></li>
                            <li><a href="#">April</a></li>
                            <li><a href="#">May</a></li>
                            <li><a href="#">June</a></li>
                            <li><a href="#">July</a></li>
                            <li><a href="#">August</a></li>
                            <li><a href="#">September</a></li>
                            <li><a href="#">October</a></li>
                            <li><a href="#">November</a></li>
                            <li><a href="#">December</a></li>
                        </ul>
                    </div>
                    <h3 className="title_cls">OUR TOP HOLIDAY IDEAS FOR TRAVEL IN JANUARY</h3>
                    <div className="card_slider_row01">
                        <i id="leftt">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                        </i>
                        <div className="carousel01">
                            <div className="card_slider_inr01">
                                <div className="card_slider">
                                    <a href="#" className="card_slider_img">
                                        <img src="images/month_slider01.jpg" alt="month-slider01" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a href="#">JOURNEY INTO MIDDLE EARTH</a></h4>
                                        <ul>
                                            <li>Family Road Trip to New Zealand</li>
                                            <li>New Zealand</li>
                                            <li>From £9,850 per person</li>
                                            <li>Travel to:<span>Auckland, Bay of Islands & Northland, Coromandel & Waikato, Hawkes Bay</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn light_grey_btn_bg">
                                        <span>14 nights</span>
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr01">
                                <div className="card_slider">
                                    <a href="#" className="card_slider_img">
                                        <img src="images/month_slider02.jpg" alt="month-slider02" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a href="#">FLAGSHIP NORWAY</a></h4>
                                        <ul>
                                            <li>Norway in Exsus Signature Style</li>
                                            <li>Norway</li>
                                            <li>From £5,550 per person</li>
                                            <li>Travel to:<span>Bergen & the Western Fjords</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn light_grey_btn_bg">
                                        <span>7 nights</span>
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr01">
                                <div className="card_slider">
                                    <a href="#" className="card_slider_img">
                                        <img src="images/month_slider03.jpg" alt="month_slider03" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a href="#">THE KING & I</a></h4>
                                        <ul>
                                            <li>Seriously Stylish Island Hopping in Thailand</li>
                                            <li>Thailand</li>
                                            <li>From £5,500 per person</li>
                                            <li>Travel to:<span>Bangkok & Central Thailand, Phuket & Western Thailand</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn light_grey_btn_bg">
                                        <span>12 nights</span>
                                        <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr01">
                                <div className="card_slider">
                                    <a href="#" className="card_slider_img">
                                        <img src="images/month_slider04.jpg" alt="month_slider04" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a href="#">Culture, Action and Relaxation</a></h4>
                                        <ul>
                                            <li>The Ultimate Colombia Adventure Holiday</li>
                                            <li>Colombia</li>
                                            <li>From £6,250 per person</li>
                                            <li>Travel to:<span>Bogota, Cartagena, Caribbean Coast and Islands, Tayrona National Park, The Coffee Triangle (Zona Cafetera)</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn light_grey_btn_bg">
                                        <span>23 nights</span>
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr01">
                                <div className="card_slider">
                                    <a href="#" className="card_slider_img">
                                        <img src="images/month_slider05.jpg" alt="month_slider05" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a href="#">Ultimate Family Adventure to Swedish Lapland</a></h4>
                                        <ul>
                                            <li>Reindeer, Santa & the Northern Lights</li>
                                            <li>Sweden</li>
                                            <li>From £3,350 per person</li>
                                            <li>Travel to:<span>Swedish Lapland</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn light_grey_btn_bg">
                                        <span>5 nights</span>
                                        <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <i id="rightt">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </i>
                    </div>
                </div>
            </section>

            <section className="make_enqury_row">
                <div className="container">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
                    <button className="btn prmry_btn make_enqury_btn" onclick="window.open('contact_us.html')">Make an enquiry
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

        </Layout>
    );
}
