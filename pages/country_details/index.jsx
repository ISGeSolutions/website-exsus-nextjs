import { Layout } from 'components/users';
import { Signup } from 'components';

export default Index;

function Index() {

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
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="6" aria-label="Slide 7"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="7" aria-label="Slide 8"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="8" aria-label="Slide 9"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="9" aria-label="Slide 10"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="10" aria-label="Slide 11"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="11" aria-label="Slide 12"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls country_overvw_banner01"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner02 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner03 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner04 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner05 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner06 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner07 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner08 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner09 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner10 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner11 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="country_overvw_banner12 banner_commn_cls"></div>
                        </a>
                    </div>
                </div>
            </section>
            <section className="destination_tab_row light_grey pb-0">
                <div className="container-md">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="destinations.html">Destinations</a></li>
                            <li><a href="destination_detail.html">Asia</a></li>
                            <li>China</li>
                        </ul>
                    </div>

                    <div className="destination_tab_inr">
                        <h2 className="tab_tilte">Luxury holidays in China</h2>
                        <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-overview-tab" data-bs-toggle="pill" data-bs-target="#pills-overview" type="button" role="tab" aria-controls="pills-overview">Ovierview</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-region-tab" data-bs-toggle="pill" data-bs-target="#pills-region" type="button" role="tab" aria-controls="pills-region">Regions</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-itineraries-tab" data-bs-toggle="pill" data-bs-target="#pills-itineraries" type="button" role="tab" aria-controls="pills-itineraries">Itineraries</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-places-to-stay-tab" data-bs-toggle="pill" data-bs-target="#pills-places-to-stay" type="button" role="tab" aria-controls="pills-places-to-stay">Places to stay</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-when-to-go-tab" data-bs-toggle="pill" data-bs-target="#pills-when-to-go" type="button" role="tab" aria-controls="pills-when-to-go">When to go</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab" tabIndex="0">
                        <div className="container-md">
                            <section className="destination_para">
                                <p>China is a country on fast-forward. With its sprawling cities developing at an unmatchable speed, few places change faces as fast and as often as it does. Beijing is home to landmarks such as the Summer Palace, while those with an adventurous streak will have a blast tobogganing down the Great Wall - and you can’t leave without trying some scrumptious Peking duck. With a medley of Art Deco buildings and colossal towers, Shanghai is a thriving art scene that is famous for its acrobatics.</p>
                                <p>From incredible architecture to natural gems, be transported to the classic Chinese landscapes of Guilin, with their karst mountains and winding rivers, immortalised by poets and writers over the centuries. Don't miss the chance to visit Avatar’s ‘Hallelujah Mountains’, inspired by Zhangjiajie National Forest Park in the heart of China, or head to the roof of the world – the Tibetan plateau.</p>
                                <p>Meet China's iconic giant pandas in Chengdu, and make a stop in Yunnan to admire the endless ridges of rice paddies and immersive jungles. Go back in time as you head down the winding Silk Road routes to discover the history of trade, ending up in Xi’an, which is home to thousands of life-size terracotta soldiers. While the whole country seems to accelerate at an extraordinary pace, fragments of history untouched by time remain present, from the imperial Forbidden City in Beijing right down to the glutinous rice flour paste from the Qing dynasty which miraculously holds some of the bricks of the Great Wall of China together.</p>
                            </section>
                            <section className="country_highlight_row">
                                <div className="country_highlight_inr">
                                    <h3>HIGHLIGHTS OF China</h3>
                                    <p>Climbing the Great Wall of China – Scale the giant structure and have a whale of a time tobogganing your way down afterwards.</p>
                                    <p>The Forbidden City – Explore China’s largest collection of ancient structures, once home to 24 emperors across the Ming and Qing dynasties.</p>
                                    {/* <div className="country_hightlight_expnded" style="display: none;">
                                        <p>Rice terraces – Meander along the verdant ridges of Yunnan, with soaring mountains and dense jungles which make you feel completely at one with nature.</p>
                                        <p>The Zhangjiajie Mountains – if you’ve stared wistfully at Avatar’s gorgeous craggy landscape, don’t despair – the ‘Hallelujah Mountains’ are inspired by Zhangjiajie.</p>
                                        <p>Terracotta warriors – See thousands of life-size clay soldiers in Xi’an which stand guard by the tomb of China’s first emperor.</p>
                                        <p>The Silk Road – Discover the network used by merchants and traders to trade silk and other goods. This was far more significant than exchanging material goods however, as through this passage, intellectual and cultural exchanges also took place (including scientific, artistic and literary one)</p>
                                        <p>Amazing food – Relish in delicious local food, from Peking duck in Beijing to Dim Sum in Hong Kong.</p>
                                    </div> */}
                                    <button className="btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" className="up_arrow" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                        <span>Read more</span>
                                        <span className="read_less">Read less</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                    </button>
                                </div>
                            </section>
                        </div>

                        <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                            <div className="container-md">
                                <h3 className="title_cls pt-5">Holidays in China Handpicked by Exsus</h3>
                                <div className="card_slider_row">
                                    <div className="carousel00">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="images/country_card01.jpg" alt="country card01" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">China Like an Emperor</a></h4>
                                                            <ul>
                                                                <li>China in Ultimate Style</li>
                                                                <li>China</li>
                                                                <li>From £11,250 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Shanghai, Hangzhou & Eastern China, Yunnan</span></li>
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
                                                            <img src="images/country_card02.jpg" alt="country card02" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">In Search of Pandas</a></h4>
                                                            <ul>
                                                                <li>Family Adventure to China</li>
                                                                <li>China</li>
                                                                <li>From £6,750 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Hong Kong & Macau, Southern China, Xi'an, Sichuan & Central China</span></li>
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
                                                            <img src="images/country_card03.jpg" alt="country card03" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">STYLISH HONEYMOON TO CHINA</a></h4>
                                                            <ul>
                                                                <li>A Chinese Romance</li>
                                                                <li>China</li>
                                                                <li>From £5,450 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Hong Kong & Macau, Southern China</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>12 nights</span>
                                                            <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="favrites_blk_row favrites_blk_no_slider_row light_grey">
                            <div className="container-md">
                                <h3 className="title_cls pt-5">PLACES TO STAY IN CHINA HANDPICKED BY EXSUS</h3>
                                <div className="card_slider_row">
                                    <div className="carousel00">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="images/country_hotel01.jpg" alt="country_hotel01" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Capella Shanghai</a></h4>
                                                            <ul>
                                                                <li>Location: Shanghai, Hangzhou & Eastern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Travel to:<span>Boutique Hotel, History & Heritage, Cultural Immersion, Food & Wine</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                                            <span className="view_itnry_link">View hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="images/country_hotel02.jpg" alt="country_hotel02" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Six Senses Qing Cheng Mountain</a></h4>
                                                            <ul>
                                                                <li>Location: Xi'an, Sichuan & Central China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Travel to:<span>Wildlife & Nature, Walking & Trekking, Setting & Views, Landscapes & Scenery</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                                            <span className="view_itnry_link">View hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4">
                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="images/country_hotel03.jpg" alt="country_hotel03" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Alila Yangshuo</a></h4>
                                                            <ul>
                                                                <li>Location: Southern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Travel to:<span>Couples, First-timers, Landscapes & Scenery, Setting & Views</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                                            <span className="view_itnry_link">View hotel<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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
                                                <img src="images/country_detail01.jpg" alt="Card image 07" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Itinerary Ideas in China</h3>
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
                                                <img src="images/country_detail02.jpg" alt="Card image 08" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Places to Stay in China</h3>
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

                    <div className="tab-pane fade" id="pills-region" role="tabpanel" aria-labelledby="pills-region-tab" tabIndex="0">
                        <div className="container-md">
                            <section className="destination_para">
                                <p>With all of its diversity and vastness, one trip to China will leave you wanting more – from bustling cities of modern skyscrapers and historic temples such as Beijing and Shanghai, to the giant pandas in Chengdu and magical Guilin, where you'll find beautiful landscapes of jagged mountains and winding rivers, China simply has everything.</p>
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
                                        <div className="card_blk_inr flex-column">
                                            <a href="#" target="_blank">
                                                <img src="images/region_countries01.jpg" alt="region_countries01" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Beijing & Northern China</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <p>An intoxicating fusion of old and new, Beijing offers an ideal introduction to China, with famous landmarks such as the Forbidden City and the Temple of Heaven, while around Beijing, the ethereal Summer Palace is simply beautiful, and then (of course), there’s the iconic Great Wall, which can be reached in a day trip from the city and is a must-see. Beyond Beijing and around northern China, see the ancient walled city of Pingyao and the historic city of Datong.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr flex-column">
                                            <a href="#" target="_blank">
                                                <img src="images/region_countries02.jpg" alt="region_countries02" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Shanghai, Hangzhou & Eastern China</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <p>Shanghai is a feast for the senses, from some of the world’s tallest skyscrapers to Buddhist temples and stylish modern museums. Stroll along the historic Bund promenade, shop ‘til you drop, tuck into diverse cuisine and immerse yourself in the city’s vibrant cultural scene. Further afield, visit Hangzhou and be creatively inspired by the West Lake, which is known as ‘Heaven on Earth’, and explore the mountainous Zhangjiajie National Forest Park, which inspired the film Avatar.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr flex-column">
                                            <a href="#" target="_blank">
                                                <img src="images/region_countries03.jpg" alt="region_countries03" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Xi'an, Sichuan & Central China</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <p>Located at one end of the Silk Road and home to the famous terracotta warriors and the country’s most adorable residents - giant pandas - Xi’an, Sichuan and central China have a lot to offer lovers of history, culture and wildlife. See the incredible life-size terracotta warriors in Xi’an and giant pandas in Chengdu, and explore picturesque landscapes of alpine valleys, villages, cliffs with carved Buddhas and clear blue lakes as well as caves of impressive coral and stalactites.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr flex-column">
                                            <a href="#" target="_blank">
                                                <img src="images/region_countries04.jpg" alt="region_countries04" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Southern China</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <p>If you venture to southern China, you’ll be rewarded with traditional villages, lush tropical landscapes, green rice terraces and beautiful coastlines. The quintessentially Chinese scenery of Guilin, with its stunning scenery of dramatic limestone cliffs, has long been a magnet for artists and writers, and it’s easy to see why. The rice terraces of Longji, set on steep slopes dotted with ancient villages, are another potent symbol of China and a must-see.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr flex-column">
                                            <a href="#" target="_blank">
                                                <img src="images/region_countries05.jpg" alt="region_countries05" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Yunnan</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <p>Get off the beaten track in Yunnan, in south-western China, and experience the temples and parks of Kunming as well as the beauty of rural China. Yunnan’s landscapes are a showcase of snow-capped mountains, limestone karsts, dense jungle and glassy lakes. Stay in hilltop lodges with panoramic countryside views, visit villages and remote farming communities where life has barely changed for centuries, go cycling or trekking along mountain trails and around terraced rice fields, and experience some of the region’s diverse indigenous cultures.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr flex-column">
                                            <a href="#" target="_blank">
                                                <img src="images/region_countries06.jpg" alt="region_countries06" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Western China & the Silk Road</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <p>Head west to discover China’s wild and unspoilt regions, with glacial lakes, evergreen forests, mysterious caves and arid deserts like the Taklamakan, which is flanked by imposing mountain ranges. The old Silk Road network was once used by merchants and traders to trade goods like dates, spices and the most sought-after item – silk. It still makes for an incredible journey today, with visitors going down the routes that connect east and south Asia to Mediterranean Europe.</p>
                                        </div>
                                    </div>


                                    <div className="col-sm-6 col-md-4">
                                        <div className="card_blk_inr flex-column">
                                            <a href="#" target="_blank">
                                                <img src="images/region_countries07.jpg" alt="region_countries07" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_sml_arw">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3 className="mb-0">Tibet</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <p>Chanting monks in orange robes, beautiful monasteries and snow-capped mountains - Tibet is not only a spiritual realm but a place of outstanding beauty in China. Known as the ‘roof of the world’ for being the highest plateau on Earth, a retreat to this mountainous region offers show-stopping views of the unfolding valleys and glassy lakes.</p>
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
                                                <img src="images/country_detail01.jpg" alt="Card image 07" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Itinerary Ideas in China</h3>
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
                                                <img src="images/country_detail02.jpg" alt="Card image 08" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Places to Stay in China</h3>
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
                                <p>Whether you’re after a dose of history and culture, natural gems that stop you in your tracks or thrilling adventures that you’ll find nowhere else, these sample itineraries will whet your appetite and provide some inspiration for your trip to China. Can’t find what you want? Give our experts a call for a bespoke, tailor-made itinerary that’s made with your personal interests in mind or make an enquiry.</p>
                            </section>
                        </div>

                        <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                            <div className="container-md">
                                <h3 className="title_cls">All Luxury Holiday Ideas in China</h3>
                                <div className="card_slider_row">
                                    <div className="carousel00">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="destination_dropdwn_row d-block d-md-flex">
                                                    <div className="banner_dropdwn_blk">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by region" data-live-search="true">
                                                                <option value="">Filter by region</option>
                                                                <option value="China">China</option>
                                                                <option value="Beijing & Northern China">Beijing & Northern China</option>
                                                                <option value="Shanghai, Hangzhou & Eastern China">Shanghai, Hangzhou & Eastern China</option>
                                                                <option value="Xi'an, Sichuan & Central China">Xi'an, Sichuan & Central China</option>
                                                                <option value="Southern China">Southern China</option>
                                                                <option value="Yunnan">Yunnan</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="banner_dropdwn_blk ps-0 ps-md-2">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by reason" data-live-search="true">
                                                                <option value="">Filter by reason</option>
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
                                                    <p>We've found 7 holiday ideas in China for you.</p>
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

                                            <div className="col-sm-6 col-lg-4">

                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <a className="card_slider_img">
                                                            <img src="images/country_card04.jpg" alt="country card04" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">A Journey Through Cathay</a></h4>
                                                            <ul>
                                                                <li>China in Classic Style</li>
                                                                <li>China</li>
                                                                <li>From £5,050 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Shanghai, Hangzhou & Eastern China, Xi'an, Sichuan & Central China</span></li>
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
                                                            <img src="images/country_card01.jpg" alt="country card01" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">China Like an Emperor</a></h4>
                                                            <ul>
                                                                <li>China in Ultimate Style</li>
                                                                <li>China</li>
                                                                <li>From £11,250 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Shanghai, Hangzhou & Eastern China, Yunnan</span></li>
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
                                                            <img src="images/country_card02.jpg" alt="country card02" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">In Search of Pandas</a></h4>
                                                            <ul>
                                                                <li>Family Adventure to China</li>
                                                                <li>China</li>
                                                                <li>From £6,750 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Hong Kong & Macau, Southern China, Xi'an, Sichuan & Central China</span></li>
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
                                                            <img src="images/country_card05.jpg" alt="country card05" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Pandas, Temples and Terraces</a></h4>
                                                            <ul>
                                                                <li>Southern China in Classic Style</li>
                                                                <li>China</li>
                                                                <li>From £5,250 per person</li>
                                                                <li>Travel to: <span>Hong Kong & Macau, Southern China, Xi'an, Sichuan & Central China, Yunnan</span></li>
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
                                                            <img src="images/country_card03.jpg" alt="country card03" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">STYLISH HONEYMOON TO CHINA</a></h4>
                                                            <ul>
                                                                <li>A Chinese Romance</li>
                                                                <li>China</li>
                                                                <li>From £5,450 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Hong Kong & Macau, Southern China</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>12 nights</span>
                                                            <span className="view_itnry_link">View itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4">

                                                <div className="card_slider_inr">
                                                    <div className="card_slider">
                                                        <div className="card_slider_img">
                                                            <img src="images/country_card06.jpg" alt="country card06" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Down the Golden River</a></h4>
                                                            <ul>
                                                                <li>China & Yangtze in Serious Style</li>
                                                                <li>CHina</li>
                                                                <li>From £5,850 per person</li>
                                                                <li>Travel to:<span>Beijing & Northern China, Shanghai, Hangzhou & Eastern China, Xi'an, Sichuan & Central China</span></li>
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
                                                            <img src="images/country_card07.jpg" alt="country card07" className="img-fluid" />
                                                        </div>
                                                        <div className="card_slider_cnt">
                                                            <h4><a href="#">Gardens, Water Towns & Misty Peaks</a></h4>
                                                            <ul>
                                                                <li>Cultural Journey Through the Yangtze Delta & Huangshan Mountains</li>
                                                                <li>CHina</li>
                                                                <li>From £6,050 per person</li>
                                                                <li>Travel to:<span>Shanghai, Hangzhou & Eastern China</span></li>
                                                            </ul>
                                                        </div>
                                                        <button className="btn card_slider_btn">
                                                            <span>10 nights</span>
                                                            <span className="view_itnry_link">View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                        </button>
                                                    </div>
                                                </div>
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
                                <p>From the traditional lattice-ridden Jing’s Residence in the ancient town of Pingyao and the Temple Hotel in Chengdu (built inside a real restored temple) to a luxurious retreat in the grounds of the majestic Summer Palace, once used by royal guests, we have a wide range of luxury hotels, lodges and resorts for every type of traveller.</p>
                            </section>
                        </div>

                        <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                            <div className="container-md">
                                <h3 className="title_cls">All recommended hotels in China</h3>
                                <div className="card_slider_row">
                                    <div className="carousel00">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="destination_dropdwn_row d-block d-md-flex">
                                                    <div className="banner_dropdwn_blk">
                                                        <div className="select_drpdwn">
                                                            <select className="selectpicker" multiple aria-label="Filter by region" data-live-search="true">
                                                                <option value="">Filter by region</option>
                                                                <option value="China">China</option>
                                                                <option value="Beijing & Northern China">Beijing & Northern China</option>
                                                                <option value="Shanghai, Hangzhou & Eastern China">Shanghai, Hangzhou & Eastern China</option>
                                                                <option value="Xi'an, Sichuan & Central China">Xi'an, Sichuan & Central China</option>
                                                                <option value="Southern China">Southern China</option>
                                                                <option value="Yunnan">Yunnan</option>
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
                                                    <p>We've found 25 hotels in China for you
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
                                                            <img src="images/country_hotel04.jpg" alt="country_hotel04" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Jing's Residence</a></h4>
                                                            <ul>
                                                                <li>Location: Beijing & Northern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Jing’s Residence is a boutique hotel in the heart of historic Pingyao, surrounded by curio shops and restaurants. A stay here offers the perfect opportunity to take in the character, tradition and history of this ancient city in style and comfort.</li>
                                                                <li>Best for:<span>History & Heritage, Cultural Immersion, Peace & Quiet, Couples</span></li>
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
                                                            <img src="images/country_hotel05.jpg" alt="country_hotel05" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">The Peninsula Shanghai</a></h4>
                                                            <ul>
                                                                <li>Location: Shanghai, Hangzhou & Eastern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Breathe in this beautiful 1920s inspired Art Deco gem and embrace the bygone era, when Shanghai was known as the ‘Paris of the East’. With a lobby bedazzled with soaring pillars topped by glittering chandeliers, hallways lined by black marble and such intricately patterned carpets that you might experience vertigo for a second, this hotel oozes decadence and grandeur.</li>
                                                                <li>Best for:<span>Chic Design, History & Heritage, Food & Wine, City Hotel</span></li>
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
                                                            <img src="images/country_hotel06.jpg" alt="country_hotel06" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Aman Summer Palace</a></h4>
                                                            <ul>
                                                                <li>Location: Beijing & Northern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>A beautiful luxury hotel side-by-side with Beijing’s iconic Summer Palace, this is truly a property fit for royalty. Its collection of traditional pavilion-style accommodations, set in bamboo-shaded gardens, combine modern luxury with a stately history.</li>
                                                                <li>Best for:<span>Luxury Hotel, City Hotel, Chic Design, Setting & Views</span></li>
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
                                                            <img src="images/country_hotel07.jpg" alt="country_hotel07" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Alila Yangshuo</a></h4>
                                                            <ul>
                                                                <li>Location: Southern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Alila Yangshuo is a luxury hotel which combines comfort, style, and a fantastic location surrounded by the beautiful countryside of Yangshuo. Housed in a historic former sugar mill, it has combined its heritage features with modern design touches.</li>
                                                                <li>Best for:<span>Couples, First-timers, Landscapes & Scenery, Setting & Views</span></li>
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
                                                            <img src="images/country_hotel08.jpg" alt="country_hotel08" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">LUX* Tea Horse Road</a></h4>
                                                            <ul>
                                                                <li>Location: Yunnan | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Taking its name from the ancient tea route between Burma and Tibet, LUX* Tea Horse Road distils the ancient history and natural beauty of Yunnan Province while providing all the comfort of a modern luxury hotel.</li>
                                                                <li>Best for:<span>Landscapes & Scenery, History & Heritage, Cultural Immersion, Walking & Trekking</span></li>
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
                                                            <img src="images/country_hotel09.jpg" alt="country_hotel09" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Rosewood Beijing</a></h4>
                                                            <ul>
                                                                <li>Location: Beijing & Northern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>The Rosewood is a sanctuary of peace and comfort in the heart of one of the world’s most exciting cities: Beijing. Sitting in the glitzy neighbourhood of Chaoyang, famed for its shops and bars, the hotel combines a fantastic location with a world-className hotel experience.</li>
                                                                <li>Best for:<span>City Hotel, Luxury Hotel, Chic Design, Spa & Wellness</span></li>
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
                                                            <img src="images/country_hotel10.jpg" alt="country_hotel10" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Amandayan</a></h4>
                                                            <ul>
                                                                <li>Location: Yunnan | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Amandayan is a luxury hotel in Lijiang in China’s southwestern Yunnan Province. This region is famous for its natural beauty and for its traditional Nakhi culture, which blends Chinese, Tibetan and Himalayan elements.</li>
                                                                <li>Best for:<span>Luxury Hotel, Romantic, Seriously special, Service & Hospitality</span></li>
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
                                                            <img src="images/country_hotel11.jpg" alt="country_hotel11" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Banyan Tree Yangshuo</a></h4>
                                                            <ul>
                                                                <li>Location: Southern China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>Banyan Tree Yangshuo is a luxury hotel in Yangshuo County in southern China, a region famed for its natural beauty. An elegant, palatial building surrounded by soaring karst rock formations and forest-covered hills, inside you’ll find a stylish contemporary property with luxurious accommodations.</li>
                                                                <li>Best for:<span>Couples, Family-friendly, Luxury Hotel, Landscapes & Scenery</span></li>
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
                                                            <img src="images/country_hotel12.jpg" alt="country_hotel12" className="img-fluid" />
                                                        </a>
                                                        <div className="card_slider_cnt places_to_stay_cnt">
                                                            <h4><a href="#">Sanctuary Yangzi Explorer</a></h4>
                                                            <ul>
                                                                <li>Location: Xi'an, Sichuan & Central China | China</li>
                                                                <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                                                <li>The Sanctuary Yangzi Explorer is an ultra-luxurious ship which runs cruises along China’s Yangtze River. Smaller than other cruise ships of its type, carrying just 124 passengers, the ship combines attentive service with the comfort of a luxury hotel, complete with a spa and even a theatre, alongside a wide-ranging programme of activities.</li>
                                                                <li>Best for:<span>Cruise, Setting & Views, Seriously special, Wildlife & Nature</span></li>
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
                    <div className="tab-pane fade" id="pills-when-to-go" role="tabpanel" aria-labelledby="pills-when-to-go-tab" tabIndex="0">
                        <div className="container-md">
                            <section className="destination_para">
                                <p>As the world’s second largest state by land area and with a host of diverse terrains and latitudes, the climate changes radically. With too-hot-to-handle summers and bone-chillingly cold winters, the best time to visit is in spring (April-May in the north and March-April in the south) and autumn (October-November in the north and September-October in the south), when temperatures are mild – unless experiencing extreme weather climates is your thing.</p>
                            </section>
                        </div>

                        <section className="card_blk_row dark_grey">
                            <div className="container-md">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card_blk_inr card_blk_overlay">
                                            <a href="#" target="_blank">
                                                <img src="images/country_detail01.jpg" alt="Card image 07" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Itinerary Ideas in China</h3>
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
                                                <img src="images/country_detail02.jpg" alt="Card image 08" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>See all Places to Stay in China</h3>
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
        </Layout>
    );
}
