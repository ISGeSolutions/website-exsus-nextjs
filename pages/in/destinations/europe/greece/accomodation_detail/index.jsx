import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import Iframe from 'react-iframe'

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
        $(document).ready(function () {
            $(".country_highlight_row .country_highlight_inr button").click(function () {
                $(this).toggleclassName('read_more');
                $(".country_hightlight_expnded").slideToggle();
            });
        });
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
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="6" aria-label="Slide 7"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="7" aria-label="Slide 8"></button>
                    </div>
                    <div className="carousel-inner">
                        <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls accomodtn_overvw_banner01"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="accomodtn_overvw_banner02 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="accomodtn_overvw_banner03 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="accomodtn_overvw_banner04 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="accomodtn_overvw_banner05 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="accomodtn_overvw_banner06 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="accomodtn_overvw_banner07 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="accomodtn_overvw_banner08 banner_commn_cls"></div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="trvl_info_row">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="destinations.html">Destinations</a></li>
                            <li><a href="destination_detail.html">Asia</a></li>
                            <li><a href="country_detail.html">China</a></li>
                            <li><a href="region_detail.html">Beijing & Northern China</a></li>
                            <li>Rosewood Beijing</li>
                        </ul>
                    </div>

                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title mb-3">ROSEWOOD BEIJING</h2>
                        <h3 className="trvl_title_sub_white mb-3">Location: Beijing & Northern China | China</h3>
                        <p className="mb-4">Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></p>
                        <p className="mb-4">The Rosewood is a sanctuary of peace and comfort in the heart of one of the world’s most exciting cities: Beijing. The hotel combines a fantastic location with a world-className hotel experience, including five international restaurants, sleek, luxurious accommodation and personalised spa treatments. It sits in the glitzy neighbourhood of Chaoyang, which is famed for its shops and bars.</p>
                    </div>

                    <section className="country_highlight_row itinery_hightlight_row mb-0">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="country_highlight_inr">
                                    <p><span>Perfect for</span>An ultra-luxurious stay in the heart of Beijing</p>
                                    <p><span>In the know</span>The hotel sits directly opposite the distinctive headquarters of China Central Television, an iconic feature of the Beijing skyline</p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="itinery_highlight_inr">
                                    <ul>
                                        <li>RECOMMENDED FOR...</li>
                                        <li>City Hotel</li>
                                        <li>Luxury hotel</li>
                                        <li>Chic Design</li>
                                        <li>Spa & Wellness</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section className="itinery_detls_row">
                <div className="container">
                    <h3 className="title_cls">Hotel Overview</h3>
                    <div className="itinery_detls_cntnt">
                        <div className="itinery_detls_para text-center px-3 px-md-5">
                            <h3 className="text-center">SENSE OF PLACE</h3>
                            <p>Rosewood Beijing sits in the upmarket Chaoyang District, where grand embassies sit side-by-side with glittering shopping malls. You’re in the heart of the city here, with the bustling bars of Sanlitun and the shops of Silk Street on your doorstep.</p>
                        </div>
                    </div>
                    <div className="itinery_detls_cntnt">
                        <div className="itinery_detls_para text-center px-3 px-md-5">
                            <h3 className="text-center">ROOMS AT ROSEWOOD BEIJING</h3>
                            <p>The rooms and suites are luxurious and full of character, with floor-to-ceiling windows that make the most of the panoramic views over the city’s skyline and the CCTV Tower. Some have private balconies where you can enjoy breakfast overlooking Beijing.</p>
                            <p>They have an elegant dark colour scheme incorporating – in keeping with the hotel’s name – a great deal of rich dark wood, with beautiful woodcut prints decorating the walls. The interiors combine traditional style with modern luxuries, including state-of-the-art entertainment systems and marble bathrooms with bespoke Rosewood amenities and built-in TVs in the mirrors.</p>
                        </div>
                    </div>
                    <div className="itinery_detls_cntnt">
                        <div className="itinery_detls_para text-center px-3 px-md-5">
                            <h3 className="text-center">FOOD & DRINK</h3>
                            <p>With no fewer than five restaurants to choose from, there’s no danger of going hungry at Rosewood Beijing. For a taste of the local cuisine, Country Kitchen serves Beijing and northern Chinese specialities in a cosy, rustic environment, while Red Bowl specialises in traditional hot pot dishes. French cuisine is on offer at Bistrot B, while Cantonese dim sum is served at the House of Dynasties. Finally, the stylish MEI is the place to go for tapas, accompanied by an extensive cocktail menu.</p>
                        </div>
                    </div>
                    <div className="itinery_detls_cntnt">
                        <div className="itinery_detls_para text-center px-3 px-md-5">
                            <h3 className="text-center">FACILITIES</h3>
                            <p>The Sense Spa offers an extensive menu of rejuvenating wellness treatments, with an emphasis on personalising each guest’s experience. There are even massages specially designed for pregnant women, and scrubs and products specifically designed for male guests. The hotel is also home to a state-of-the-art fitness centre, a yoga studio and a beautiful pool.</p>
                        </div>
                    </div>
                    <div className="itinery_detls_cntnt">
                        <div className="itinery_detls_para text-center px-3 px-md-5">
                            <h3 className="text-center">ACTIVITIES AT ROSEWOOD BEIJING</h3>
                            <p>Rosewood’s ‘A Sense of Taste’ programme comprises a range of culinary experiences, from tea tasting at a Taoist temple to a visit to tofu producers in Liugou Village.</p>
                            <p>Other historic highlights of Beijing include the enigmatic Forbidden City, which sits on one side of the vast, iconic and notorious Tiananmen Square, where you can see collections of artwork from the Ming and Qing dynasties. Modern Beijing, meanwhile, is a hub for culture and the arts. Don’t miss the opportunity to catch Peking Opera at the Changan Grand Theatre, or check out some contemporary art at the National Art Museum.</p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="best_time_blk_row">
                <div className="container">
                    <section className="best_time_blk_inr">
                        <h3>BEST TIME TO GO</h3>
                        <div className="row">
                            <div className="col-lg-4">
                                <ul className="best_time_blk_left">
                                    <li><span className="shade01"></span>Best time to travel</li>
                                    <li><span className="shade02"></span>Good time to travel (but some limitations)</li>
                                    <li><span className="shade03"></span>Travel is possible (but it’s not the best time)</li>
                                    <li><span className="shade04"></span>Travel is not recommended</li>
                                </ul>
                            </div>
                            <div className="col-lg-8">
                                <ul className="best_time_blk_right">
                                    <li className="mt-3 mt-lg-0">Jan<span className="shade01"></span></li>
                                    <li className="mt-3 mt-lg-0">Feb<span className="shade02"></span></li>
                                    <li className="mt-3 mt-lg-0">Mar<span className="shade03"></span></li>
                                    <li className="mt-3 mt-lg-0">Apr<span className="shade04"></span></li>
                                    <li className="mt-3 mt-lg-0">May<span className="shade01"></span></li>
                                    <li className="mt-3 mt-lg-0">June<span className="shade02"></span></li>
                                    <li className="mt-3 mt-lg-0">July<span className="shade03"></span></li>
                                    <li className="mt-3 mt-lg-0">Aug<span className="shade04"></span></li>
                                    <li className="mt-3 mt-lg-0">Sep<span className="shade01"></span></li>
                                    <li className="mt-3 mt-lg-0">Oct<span className="shade02"></span></li>
                                    <li className="mt-3 mt-lg-0">Nov<span className="shade03"></span></li>
                                    <li className="mt-3 mt-lg-0">Dec<span className="shade04"></span></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="map_blk_row">
                        <h3 className="pb-2">Hotel location</h3>
                        <p>The Rosewood is just half an hour’s drive from Beijing Capital International Airport.</p>
                        <div className="map_blk_inr">
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                        </div>
                    </section>
                </div>
            </section>

            <section className="favrites_blk_row favrites_blk_no_slider_row">
                <div className="container">
                    <h3 className="title_cls">Stay at Rosewood Beijing on these trips</h3>
                    <div className="card_slider_row">
                        <div className="width_100">
                            <div className="row">
                                <div className="col-sm-6 col-lg-4 col-xxl-3">
                                    <div className="card_slider_inr">
                                        <div className="card_slider">
                                            <a className="card_slider_img">
                                                <img src="./../../../../../../images/country_card06.jpg" alt="country_card06" className="img-fluid" />
                                            </a>
                                            <div className="card_slider_cnt">
                                                <h4>Down the Golden River</h4>
                                                <ul>
                                                    <li>China & Yangtze in Serious Style</li>
                                                    <li>China</li>
                                                    <li>From £5,850 per person</li>
                                                    <li>Travel to:<span>Beijing & Northern China, Shanghai, Hangzhou & Eastern China, Xi'an, Sichuan & Central China</span></li>
                                                </ul>
                                            </div>
                                            <button className="btn card_slider_btn">
                                                <span>11 nights</span>
                                                <span className="view_itnry_link">VIEW ITINERARY<em className="fa-solid fa-chevron-right"></em></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="favrites_blk_row light_grey">
                <div className="container">
                    <h3 className="title_cls">More places to stay in Beijing & Northern China</h3>
                    <div className="card_slider_row">
                        <i id="left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                        </i>
                        <div className="carousel00">
                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="./../../../../../../images/region_hotel02.jpg" alt="region_hotel02" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt">
                                        <h4><a href="#">The Opposite House</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>Chic Design, City Hotel, Boutique Hotel, History &amp; Heritage</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="./../../../../../../images/country_hotel06.jpg" alt="country_hotel06" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt">
                                        <h4><a href="#">Aman Summer Palace</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>Luxury Hotel, City Hotel, Chic Design, Setting &amp; Views</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="./../../../../../../images/region_hotel03.jpg" alt="region_hotel03" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt">
                                        <h4><a href="#">Jing's Residence</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>History &amp; Heritage, Cultural Immersion, Peace &amp; Quiet, Couples</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="./../../../../../../images/region_hotel01.jpg" alt="region_hotel01" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt">
                                        <h4><a href="#">Four Seasons Beijing</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>Luxury Hotel, City Hotel, Chic Design, Setting &amp; Views</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <i id="right">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </i>
                    </div>
                </div>
                <div className="full_loader_parnt_blk loader_parnt_blk" style={{ display: 'none' }}><div className="loader-circle-2"></div></div>
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
                <div className="full_loader_parnt_blk loader_parnt_blk" style={{ display: 'none' }}><div className="loader-circle-2"></div></div>
            </section>
        </Layout>
    );
}
