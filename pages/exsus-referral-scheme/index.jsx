import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <Layout>
            <section class="banner_blk_row">
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div class="carousel-inner">
                <a href="#" target="_blank" class="carousel-item active" data-bs-interval="5000">
                    <div class="banner_commn_cls about_us_banner01"></div>
                </a>
                <a href="#" target="_blank" class="carousel-item" data-bs-interval="5000">
                    <div class="banner_commn_cls about_us_banner02"></div>
                </a>
                <a href="#" target="_blank" class="carousel-item" data-bs-interval="5000">
                    <div class="banner_commn_cls about_us_banner03"></div>
                </a>           
                <a href="#" target="_blank" class="carousel-item" data-bs-interval="5000">
                    <div class="banner_commn_cls about_us_banner04"></div>
                </a>           
            </div>
        </div> 
    </section>

    <section class="trvl_info_row">
        <div class="container-md">
            <div class="bookmark_row">
                <ul>
                    <li><a href="homepage.html">Home</a></li>
                    <li><a href="about_us.html">Why us</a></li>
                    <li>Friend Referral Offer</li>
                </ul>
            </div>
            <div class="trvl_info_cntnt">
                <h2 class="trvl_title">EXSUS TRAVEL'S REFERRAL SCHEME</h2>
                <p class="mb-4">Refer a friend to Exsus Travel, and if they go on to book a luxury tailor-made holiday with us, you will receive a £100 voucher (if you are a UK-based client), or a $150 voucher (if you are a US-based client), as a thank you from us.</p>
                <p class="mb-4">And that's not all: for every additional friend referred who goes on to make a booking, you will receive additional vouchers.</p>
                <p class="mb-4">To make a referral or find out more, call 020 7337 9010 to speak to one of our travel experts, or send us an <a href="#">email</a>.</p>
                <p><i>Terms and conditions apply</i></p>
            </div>
        </div>
    </section>

     <section class="card_blk_row dark_grey">
        <div class="container-md">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card_blk_inr card_blk_overlay">
                        <a href="#" target="_blank">
                            <img src="images/about_us_card01.jpg" alt="Card image 07" class="img-fluid" />
                            <div class="card_blk_cntnt card_blk_cntnt_top">
                                <div class="row align-items-center">
                                    <div class="col-11">
                                        <div class="card_blk_txt">
                                            <h3>Explore our destinations</h3>
                                        </div>
                                    </div>
                                    <div class="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>                                
                            </div>
                        </a>                        
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card_blk_inr card_blk_overlay">
                        <a href="#">
                            <img src="images/about_us_card02.jpg" alt="Card image 08" class="img-fluid" />
                            <div class="card_blk_cntnt card_blk_cntnt_top">
                                <div class="row align-items-center">
                                    <div class="col-11">
                                        <div class="card_blk_txt">
                                            <h3>Explore our Holiday types</h3>
                                        </div>
                                    </div>
                                    <div class="col-1 ps-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                                    </div>
                                </div>
                                
                            </div>
                        </a>
                    </div>
                </div>                
            </div>
        </div>
    </section>

    <section class="make_enqury_row">
        <div class="container-md">
            <h3>YOUR JOURNEY STARTS HERE</h3>
            <p>call us on 020 7337 9010 to start planning your perfect trip</p>
            <button class="btn prmry_btn make_enqury_btn" onclick="window.open('contact_us.html')">Make an enquiry
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                    </button>
                </div>
                </form>
        </div>
    </section>
        </Layout>
    );
}
