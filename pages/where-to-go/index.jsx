import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { useRouter } from 'next/router';
import { NavLink } from 'components';



export default Index;

function Index() {
    const router = useRouter();
    const [users, setUsers] = useState(null);
    let regionWiseUrl = '/uk';
    let region = 'uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            regionWiseUrl = '/' + window.site_region;
            region = window.site_region;
            // setMyVariable(window.site_region);
        }
    }
    const generateDynamicLink = () => {
        // console.log('item', item);
        return regionWiseUrl + `/where-to-go-detail`;
    };

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));
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
                        <button
                            type="button"
                            data-bs-target="#carouselExampleInterval"
                            data-bs-slide-to="5"
                            aria-label="Slide 6"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item active"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls when_to_go_banner01"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls when_to_go_banner02"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls when_to_go_banner03"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls when_to_go_banner04"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls when_to_go_banner05"></div>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="carousel-item"
                            data-bs-interval="5000"
                        >
                            <div className="banner_commn_cls when_to_go_banner06"></div>
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
                            <li>When to go</li>
                        </ul>
                    </div>

                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">WHERE TO GO ON A LUXURY HOLIDAY</h2>
                        <p className="when_to_go_para">
                            Our guide to the best holiday destinations for every month of the
                            year
                        </p>
                        <p className="mb-4">
                            Wherever you want to go and whatever you want to see, our guide
                            will help you navigate your way around the world. Simply click on
                            a month you'd like to be away and see where we recommend as being
                            at its best at that time of year. Alternatively, to discuss when
                            and where you'd like to travel next, call our team of travel
                            experts on 020 7337 9010
                        </p>
                    </div>

                    <section className="month_wise_row">
                        <h3 className="title_cls">Month-by month holiday calendar</h3>
                        <div className="row">
                            <NavLink href={generateDynamicLink()}>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in January</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/jan_month.jpg"
                                                alt="jan-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            Kick off the New Year somewhere amazing and uplifting,
                                            whether you go in search of winter sun or embrace the snow
                                            for a season of activity and adventure.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in January &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </NavLink>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in February</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/feb_month.jpg"
                                            alt="feb-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        Escape the winter and head to the tropics while the
                                        weather’s still warm and the crowds have thinned or explore
                                        European cities on a cultural break.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in February &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in March</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/march_month.jpg"
                                            alt="march-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        Whether it’s a springtime escape, an early Easter break or
                                        something between winter and summer to see you through, head
                                        to the beach or catch the last of the Northern Lights.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in March &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in April</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/april_month.jpg"
                                            alt="april-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        While the Mediterranean hots up, head further afield to
                                        safari in Namibia, watch wildlife in the Galapagos or
                                        witness the cherry blossom in Japan.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in April &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in May</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/may_month.jpg"
                                            alt="may-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        Make the most of the bank holidays with a European escape or
                                        find wildlife in the vast landscapes of Botswana or Zambia.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in May &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in June</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/june_month.jpg"
                                            alt="june-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        With the arrival of summer, hit the beach before the crowds,
                                        go on the ultimate road trip in the USA, or enjoy the dry
                                        season in Peru.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in June &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in July</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/july_month.jpg"
                                            alt="july-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        While it’s busy in Europe, head to Iceland or go further for
                                        adventure and the trip of a lifetime combining safaris and
                                        Indian Ocean barefoot luxury.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in July &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in August</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/aug_month.jpg"
                                            alt="august-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        While everyone else is away, look for these hidden gems or
                                        search for wildlife, activity and adventure in more secluded
                                        spots.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in August &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in September</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/sep_month.jpg"
                                            alt="sep-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        As things quieten down after the summer, head to France or
                                        Santorini, go on safari in Kenya or enjoy the spectacle of
                                        the Fall foliage in the USA.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in September &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in October</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/oct_month.jpg"
                                            alt="oct-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        Get a final hit of European sunshine, take the chance to
                                        bask in the southern hemisphere's springtime, or look out
                                        for an idyllic island escape in Bali.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in October &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in November</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/nov_month.jpg"
                                            alt="nov-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        Travel for winter sunshine or a hit of wilderness, with
                                        wildlife in Brazil, activities in New Zealand, empty spaces
                                        in Patagonia and the deserts of Oman all ideal places to
                                        visit this month.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in November &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="month_wise_cnt_blk">
                                    <h4>Where to go on holiday in December</h4>
                                    <a href="when_to_go_detail.html">
                                        <img
                                            src="images/dec_month.jpg"
                                            alt="dec-month"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <p>
                                        Whether it’s Christmas in Cuba or snow and sports in Norway,
                                        blissful beaches in Sri Lanka or sizzling barbecues in
                                        Australia, or New Year in an overwater villa in the Indian
                                        Ocean, the festive months make a great time to travel.{" "}
                                        <a href="when_to_go_detail.html">
                                            See where we'd recommend in December &gt;
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section className="card_blk_row dark_grey py-5">
                <div className="container">
                    <div className="book_wth_confdnce">
                        <h2>THREE REASONS TO BOOK WITH CONFIDENCE</h2>
                        <div className="row">
                            <div className="col-lg-4">
                                <h3>Specialist Expertise</h3>
                                <p>
                                    With over 20 years’ experience of creating incredible journeys
                                    and tailor-made luxury honeymoons, all around the world, our
                                    destination experts have first-hand experience of their
                                    dedicated areas and frequently travel to them to stay on top
                                    of what’s best, what’s new and what not to miss, so can advise
                                    you personally.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <h3>Tailor-made trips</h3>
                                <p>
                                    All trips put together through us are designed to suit
                                    individual needs and interests. Personalise an itinerary by
                                    adding more time in your favourite place, including an
                                    incredible experience you’d like to have or adding something
                                    out of the ordinary, so your holiday turns into a trip of a
                                    lifetime.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <h3>Fully protected</h3>
                                <p>
                                    From the moment you start planning your trip, you will have a
                                    dedicated expert looking after you. While away, we’ll provide
                                    24/7 support and emergency contact to ensure that everything
                                    runs smoothly. We are members of ABTA, ATOL and AITO so you
                                    can rest assured your holiday is fully protected.{" "}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="card_blk_inr card_blk_overlay start_planng_holdy_blk">
                                <a href="#" target="_blank">
                                    <img
                                        src="images/start_planng_holdy.jpg"
                                        alt="start_planng_holdy"
                                        className="img-fluid"
                                    />
                                    <div className="card_blk_cntnt card_blk_cntnt_top">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Start planning your next holiday</h3>
                                                </div>
                                            </div>
                                            <div className="col-1 ps-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#ffffff"
                                                    shape-rendering="geometricPrecision"
                                                    text-rendering="geometricPrecision"
                                                    image-rendering="optimizeQuality"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    viewBox="0 0 267 512.43"
                                                >
                                                    <path
                                                        fill-rule="nonzero"
                                                        d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    className="btn prmry_btn strt_planng_btn"
                                                    onclick="window.open('contact_us.html')"
                                                >
                                                    Make an enquiry
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="#ffffff"
                                                        shape-rendering="geometricPrecision"
                                                        text-rendering="geometricPrecision"
                                                        image-rendering="optimizeQuality"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        viewBox="0 0 267 512.43"
                                                    >
                                                        <path
                                                            fill-rule="nonzero"
                                                            d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card_blk_inr card_blk_overlay mt-3 mt-md-0">
                                <a href="#" target="_blank">
                                    <img
                                        src="images/about_us_card01.jpg"
                                        alt="Card image 07"
                                        className="img-fluid"
                                    />
                                    <div className="card_blk_cntnt card_blk_cntnt_top">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Explore our destinations</h3>
                                                </div>
                                            </div>
                                            <div className="col-1 ps-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#ffffff"
                                                    shape-rendering="geometricPrecision"
                                                    text-rendering="geometricPrecision"
                                                    image-rendering="optimizeQuality"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    viewBox="0 0 267 512.43"
                                                >
                                                    <path
                                                        fill-rule="nonzero"
                                                        d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="card_blk_inr card_blk_overlay mb-0">
                                <a href="#">
                                    <img
                                        src="images/about_us_card02.jpg"
                                        alt="Card image 08"
                                        className="img-fluid"
                                    />
                                    <div className="card_blk_cntnt card_blk_cntnt_top">
                                        <div className="row align-items-center">
                                            <div className="col-11">
                                                <div className="card_blk_txt">
                                                    <h3>Explore our Holiday types</h3>
                                                </div>
                                            </div>
                                            <div className="col-1 ps-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#ffffff"
                                                    shape-rendering="geometricPrecision"
                                                    text-rendering="geometricPrecision"
                                                    image-rendering="optimizeQuality"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    viewBox="0 0 267 512.43"
                                                >
                                                    <path
                                                        fill-rule="nonzero"
                                                        d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
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
                            shape-rendering="geometricPrecision"
                            text-rendering="geometricPrecision"
                            image-rendering="optimizeQuality"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            viewBox="0 0 267 512.43"
                        >
                            <path
                                fill-rule="nonzero"
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
                                    shape-rendering="geometricPrecision"
                                    text-rendering="geometricPrecision"
                                    image-rendering="optimizeQuality"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    viewBox="0 0 267 512.43"
                                >
                                    <path
                                        fill-rule="nonzero"
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
