import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { whyusService } from "../../services/whyus.service";
import { NavLink } from "components";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
    const [clientReviews, setClientReviews] = useState(null);

    useEffect(() => {
        // const carousel = document.querySelector("#carouselExampleInterval");
        // new bootstrap.Carousel(carousel);
        // whyusService.getAllReviews().then((x) => {
        //   console.log(x);
        //   setClientReviews(x.data);
        // });
    }, []);

    return (
        <Layout>
            <section className="banner_blk_row">
                <div
                    id="carouselExampleInterval"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide-to="3"
                            aria-label="Slide 4"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide-to="4"
                            aria-label="Slide 5"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item active"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls gift_list_banner01"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls gift_list_banner02"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls gift_list_banner03"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls gift_list_banner04"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls gift_list_banner05"></div>
                        </a>
                    </div>
                </div>
            </section>
            <section className="trvl_info_row">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li>
                                <a href="homepage.html">Home</a>
                            </li>
                            <li>Gift List</li>
                        </ul>
                    </div>

                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">EXSUS HONEYMOON GIFT LIST</h2>
                        <p className="mb-4">
                            Welcome to the Exsus Gift List. Here you won’t find toasters, Le
                            Creuset dishes or Champagne flutes - rather, by inviting friends
                            and family to make cash contributions, the Exsus Gift List allows
                            you to give or receive those very special moments that you can’t
                            put a price on: magical experiences in spectacular places. Whether
                            it’s a honeymoon, anniversary trip or special birthday, the Gift
                            List allows our clients to turn their holiday into the best
                            present in the world.
                        </p>
                        <button
                            className="btn prmry_btn mx-auto mb-5"
                            onclick="window.open('gift_list_form.html', '_self')"
                        >
                            Login to your Gift List
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#ffffff"
                                shapeRendering="geometricPrecision"
                                textRendering="geometricPrecision"
                                imageRendering="optimizeQuality"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                viewBox="0 0 267 512.43"
                            >
                                <path
                                    fillRule="nonzero"
                                    d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                                ></path>
                            </svg>
                        </button>
                        <div className="gift_list_parnt">
                            <h2 className="text-capitalize">How to set up a Gift List</h2>
                            <p className="mb-4">
                                Always wanted to explore Angkor Wat? Dreamed of romantic dinners
                                under a starry sky? The Exsus Gift List allows your friends and
                                family to purchase these special experiences by making cash
                                contributions towards your holiday.
                            </p>
                            <ul className="gift_list_blk">
                                <li>
                                    To personalise your gift list, you can provide us with a photo
                                    of your choice and a welcome message to your friends and
                                    family to be displayed at the top of your list so you can tell
                                    them a little about your trip and what you will be doing.
                                </li>
                                <li>
                                    When we've set up your gift list, you can send your friends
                                    and family the Gift List reference number, which allows them
                                    to view your Gift List online and make cash contributions.
                                    They will then receive an automated confirmation of purchase
                                    email from Exsus.
                                </li>
                                <li>
                                    You can log in to your Exsus Gift List using your reference
                                    number and password at any time to see what has been purchased
                                    and by whom. Whilst the Gift List will close for contributions
                                    on the final day of your holiday, you will be able to access
                                    the list for up to a month after you return.
                                </li>
                            </ul>
                            <p>
                                If you have any further queries about the Gift List, please call
                                our team on <a href="#">020 3613 5556</a>
                            </p>
                        </div>
                        <div className="gift_list_parnt">
                            <h2 className="text-capitalize">How to buy a gift</h2>
                            <ul className="gift_list_blk">
                                <li>
                                    Buying a gift is simple. Once you have logged in using the
                                    reference number given to you, a Gift List created by the
                                    travellers will appear. You will then have the option of
                                    donating a cash gift to contribute to the holiday fund.
                                </li>
                                <li>
                                    Once you have selected the amount you would like to
                                    contribute, payment details will be taken and you have the
                                    option of sending a personal message if you wish. You will
                                    also receive a confirmation email after your purchase.
                                </li>
                            </ul>
                            <p className="mb-4">
                                If you have any queries, please contact our team on{" "}
                                <a href="#">020 3613 5556</a>
                            </p>
                            <button
                                className="btn prmry_btn mx-auto"
                                onclick="window.open('gift_list_form.html', '_self')"
                            >
                                Contribute to a Gift List
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#ffffff"
                                    shapeRendering="geometricPrecision"
                                    textRendering="geometricPrecision"
                                    imageRendering="optimizeQuality"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    viewBox="0 0 267 512.43"
                                >
                                    <path
                                        fillRule="nonzero"
                                        d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="make_enqury_row">
                <div className="container">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
                    <button
                        className="btn prmry_btn make_enqury_btn"
                        onclick="window.open('contact_us.html')"
                    >
                        Make an enquiry
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            imageRendering="optimizeQuality"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            viewBox="0 0 267 512.43"
                        >
                            <path
                                fillRule="nonzero"
                                d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                            />
                        </svg>
                    </button>
                </div>
            </section>
            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <form className="newslettr_form d-block d-sm-flex">
                        <div className="newlettr_inpt">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full name and title"
                            />
                        </div>
                        <div className="newlettr_inpt ps-0 ps-sm-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Your email address"
                            />
                        </div>
                        <div className="newlettr_btn ps-0 ps-sm-2">
                            <button type="submit" className="btn btn-primary prmry_btn">
                                Sign up
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#ffffff"
                                    shapeRendering="geometricPrecision"
                                    textRendering="geometricPrecision"
                                    imageRendering="optimizeQuality"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    viewBox="0 0 267 512.43"
                                >
                                    <path
                                        fillRule="nonzero"
                                        d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
