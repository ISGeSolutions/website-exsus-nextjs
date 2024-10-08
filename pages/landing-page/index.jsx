import { useState, useEffect } from "react";
import { userService } from "services";
import { Link } from "components";
import { store, useGlobalState } from "state-pool";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { homeService, alertService } from "services";

export default Index;

function Index() {
  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // var site_region = localStorage.getItem('site_region');
    // const [count, setCount] = useGlobalState("site_region");
    // const [user, setUser, updateUser] = useGlobalState("site_region", {default: null});
    // setCountFun();
    //  ('region', window.site_region);
  }, []);

  function setCountFun() {
    setCount(e.target.value);
  }

  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    destination: Yup.string().required("Destination is required"),
    reason: Yup.string().required("Reason is required"),
    month: Yup.string().required("Month is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return homeService
      .inspireMe(data)
      .then(() => {
        alertService.success("Make an enquiry successful", {
          keepAfterRouteChange: true,
        });
        router.push("home");
      })
      .catch(alertService.error);
  }

  // form validation rules
  const validationSchema2 = Yup.object().shape({
    fullnameAndTitle: Yup.string().required("Full and Title is required"),
  });

  const formOptions2 = { resolver: yupResolver(validationSchema2) };

  const { register2, handleSubmit2, formState2 } = useForm(formOptions2);
  const { errors2 } = formState2;

  // get functions to build form with useForm() hook
  // const { registerSignup, handleSignup, formStateSignup } = useForm(formOptionsSignup);
  // const { errorsSignup } = formStateSignup;

  function onSignup(data) {
    //  ('onSignup', data);
    // return  homeService.inspireMe(data)
    //     .then(() => {
    //         alertService.success('Sign up successfull', { keepAfterRouteChange: true });
    //         router.push('home');
    //     })
    //     .catch(alertService.error);
  }

  return (
    <>
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
          </div>
          <div className="carousel-inner">
            <a
              href="#"
              onClick={handleHrefClick}
              target="_blank"
              className="carousel-item active"
              data-bs-interval="5000"
            >
              <div className="banner_img_custom01 banner_commn_cls"></div>
              <div className="carousel-caption">
                <img
                  src="images/banner-logo.png"
                  alt="banner-logo"
                  className="img-fluid"
                />
                <h2>Discover the Seychelles</h2>
              </div>
            </a>
            <a
              href="#"
              onClick={handleHrefClick}
              target="_blank"
              className="carousel-item"
              data-bs-interval="5000"
            >
              <div className="banner_img_custom02 banner_commn_cls"></div>
              <div className="carousel-caption">
                <img
                  src="images/banner-logo.png"
                  alt="banner-logo"
                  className="img-fluid"
                />
                <h2>Perfect for romance</h2>
              </div>
            </a>
            <a
              href="#"
              onClick={handleHrefClick}
              target="_blank"
              className="carousel-item"
              data-bs-interval="5000"
            >
              <div className="banner_img_custom03 banner_commn_cls"></div>
              <div className="carousel-caption">
                <img
                  src="images/banner-logo.png"
                  alt="banner-logo"
                  className="img-fluid"
                />
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
                    <select
                      aria-label="Choose a destination"
                      name="destination"
                      {...register("destination")}
                      className={`form-select ${errors.destination ? "is-invalid" : ""
                        }`}
                    >
                      <option value="">Choose a destination</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="South America">South America</option>
                      <option value="Indian Subcontinent">
                        Indian Subcontinent
                      </option>
                      <option value="North America & Caribbean">
                        North America & Caribbean
                      </option>
                      <option value="Africa">Africa</option>
                      <option value="Central America">Central America</option>
                      <option value="Australasia & South Pacific">
                        Australasia & South Pacific
                      </option>
                      <option value="Middle East & North Africa">
                        Middle East & North Africa
                      </option>
                      <option value="Indian ocean">Indian ocean</option>
                    </select>
                    <div className="invalid-feedback mb-1">
                      {errors.destination?.message}
                    </div>
                  </div>
                </div>
                <div className="banner_dropdwn_blk ps-0 ps-md-2">
                  <div className="select_drpdwn">
                    <select
                      aria-label="Choose a reason"
                      name="reason"
                      {...register("reason")}
                      className={`form-select ${errors.reason ? "is-invalid" : ""
                        }`}
                    >
                      <option value="">Choose a reason</option>
                      <option value="Adventure Holidays">
                        Adventure Holidays
                      </option>
                      <option value="Classic Journeys">Classic Journeys</option>
                      <option value="Trains, Planes, Cars & Cruises">
                        Trains, Planes, Cars & Cruises
                      </option>
                      <option value="Food & Culture Holidays">
                        Food & Culture Holidays
                      </option>
                      <option value="Family Holidays">Family Holidays</option>
                      <option value="Once in a lifetime holidays">
                        Once in a lifetime holidays
                      </option>
                      <option value="Short breaks & Escapes">
                        Short breaks & Escapes
                      </option>
                      <option value="Wildlife & Safari Holidays">
                        Wildlife & Safari Holidays
                      </option>
                      <option value="Luxury Beach holidays">
                        Luxury Beach holidays
                      </option>
                      <option value="Special occasions">
                        Special occasions
                      </option>
                    </select>
                    <div className="invalid-feedback mb-1">
                      {errors.reason?.message}
                    </div>
                  </div>
                </div>
                <div className="banner_dropdwn_blk ps-0 ps-md-2">
                  <div className="select_drpdwn">
                    <select
                      aria-label="Choose a month"
                      name="month"
                      {...register("month")}
                      className={`form-select ${errors.month ? "is-invalid" : ""
                        }`}
                    >
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
                    <div className="invalid-feedback mb-1">
                      {errors.month?.message}
                    </div>
                  </div>
                </div>
                <div className="banner_inspire_btn ps-0 ps-md-2">
                  <button type="submit" className="btn btn-primary prmry_btn">
                    Inspire me
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
              </div>
            </div>
          </div>
        </form>
      </section>

      <section className="card_blk_row">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick} target="_blank">
                  <img
                    src="images/card_img01.jpg"
                    alt="Card image 01"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Bespoke Honeymoon ideas</h3>
                          <p>The ultimate romantic escapes</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick}>
                  <img
                    src="images/card_img02.jpg"
                    alt="Card image 02"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Once in a lifetime journeys</h3>
                          <p>Holidays out of the ordinary</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick}>
                  <img
                    src="images/card_img03.jpg"
                    alt="Card image 03"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Tailor-made Family holidays</h3>
                          <p>Memorable family trips worldwide</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick}>
                  <img
                    src="images/card_img04.jpg"
                    alt="Card image 04"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Adventure holidays</h3>
                          <p>Off-the-beaten-track holidays</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick}>
                  <img
                    src="images/card_img05.jpg"
                    alt="Card image 05"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Cultural holidays</h3>
                          <p>Immerse yourself in culture</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick}>
                  <img
                    src="images/card_img06.jpg"
                    alt="Card image 06"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Wildlife holidays</h3>
                          <p>Ultimate wildlife-spotting adventures</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="favrites_blk_row">
        <div className="container">
          <h3 className="title_cls">Favourite trip ideas</h3>
          <div className="card_slider_row">
            <i id="left">
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
                  d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z"
                />
              </svg>
            </i>
            <div className="carousel00 region_carousel00">
              <div className="card_slider_inr">
                <div className="card_slider">
                  <a className="card_slider_img">
                    <img
                      src="images/card_slider01.jpg"
                      alt="slider image 01"
                      className="img-fluid"
                    />
                  </a>
                  <div className="card_slider_cnt places_to_stay_cnt">
                    <h4>Luxury Holidays to Egypt</h4>
                    <ul>
                      <li>Egypt</li>
                      <li>From £3,690 per person</li>
                      <li>
                        Travel to:<span>Alexandria, Aswan, Cairo</span>
                      </li>
                    </ul>
                  </div>
                  <button className="btn card_slider_btn">
                    <span>9 nights</span>
                    <span className="view_itnry_link">
                      View itinerary
                      <em className="fa-solid fa-chevron-right"></em>
                    </span>
                  </button>
                </div>
              </div>

              <div className="card_slider_inr">
                <div className="card_slider">
                  <div className="card_slider_img">
                    <img
                      src="images/card_slider02.jpg"
                      alt="slider image 02"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card_slider_cnt places_to_stay_cnt">
                    <h4>Luxury India train journey: Delhi to Mumbai</h4>
                    <ul>
                      <li>India</li>
                      <li>From £5,595 per person</li>
                      <li>
                        Travel to:
                        <span>Delhi & Around, Mumbai & Western India</span>
                      </li>
                    </ul>
                  </div>
                  <button className="btn card_slider_btn">
                    <span>9 nights</span>
                    <span className="view_itnry_link">
                      View itinerary
                      <em className="fa-solid fa-chevron-right"></em>
                    </span>
                  </button>
                </div>
              </div>

              <div className="card_slider_inr">
                <div className="card_slider">
                  <div className="card_slider_img">
                    <img
                      src="images/card_slider03.jpg"
                      alt="slider image 03"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card_slider_cnt places_to_stay_cnt">
                    <h4>Magical Maldives holiday</h4>
                    <ul>
                      <li>Maldives</li>
                      <li>From £3,200 per person</li>
                      <li>
                        Travel to:<span>Maldives</span>
                      </li>
                    </ul>
                  </div>
                  <button className="btn card_slider_btn">
                    <span>7 nights</span>
                    <span className="view_itnry_link">
                      View itinerary
                      <em className="fa-solid fa-chevron-right"></em>
                    </span>
                  </button>
                </div>
              </div>

              <div className="card_slider_inr">
                <div className="card_slider">
                  <div className="card_slider_img">
                    <img
                      src="images/card_slider04.jpg"
                      alt="slider image 04"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card_slider_cnt places_to_stay_cnt">
                    <h4>Masai Mara Migration</h4>
                    <ul>
                      <li>Kenya</li>
                      <li>From £7,265 per person</li>
                      <li>
                        Travel to:
                        <span>
                          Kenya coast, Laikipia, Meru & Central Kenya, Masai
                          Mara
                        </span>
                      </li>
                    </ul>
                  </div>
                  <button className="btn card_slider_btn">
                    <span>9 nights</span>
                    <span className="view_itnry_link">
                      View itinerary
                      <em className="fa-solid fa-chevron-right"></em>
                    </span>
                  </button>
                </div>
              </div>

              <div className="card_slider_inr">
                <div className="card_slider">
                  <div className="card_slider_img">
                    <img
                      src="images/card_slider05.jpg"
                      alt="slider image 05"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card_slider_cnt places_to_stay_cnt">
                    <h4>A luxury british isles cruise</h4>
                    <ul>
                      <li>UK</li>
                      <li>From £5,190 per person</li>
                    </ul>
                  </div>
                  <button className="btn card_slider_btn">
                    <span>12 nights</span>
                    <span className="view_itnry_link">
                      View itinerary
                      <em className="fa-solid fa-chevron-right"></em>
                    </span>
                  </button>
                </div>
              </div>

              <div className="card_slider_inr">
                <div className="card_slider">
                  <div className="card_slider_img">
                    <img
                      src="images/card_slider06.jpg"
                      alt="slider image 06"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card_slider_cnt places_to_stay_cnt">
                    <h4>Big game & grapevines</h4>
                    <ul>
                      <li>South Africa</li>
                      <li>From £5,185 per person</li>
                      <li>
                        Travel to:{" "}
                        <span>
                          Cape town & around, greater kruger & panorama region,
                          Winelands
                        </span>
                      </li>
                    </ul>
                  </div>
                  <button className="btn card_slider_btn">
                    <span>9 nights</span>
                    <span className="view_itnry_link">
                      View itinerary
                      <em className="fa-solid fa-chevron-right"></em>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <i id="right">
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
            </i>
          </div>
        </div>
      </section>

      <section
        aria-label="Client Testimonials"
        className="testimonials_blk_row"
      >
        <div className="container">
          <div
            id="Testimonials"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="5"
                aria-label="Slide 6"
              ></button>
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="6"
                aria-label="Slide 7"
              ></button>
              <button
                type="button"
                data-bs-target="#Testimonials"
                data-bs-slide-to="7"
                aria-label="Slide 8"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    All the personal details and touches were amazing and much
                    appreciated. Too many highlights to say! So much history,
                    lovely spots to stay, the people, the curries, the fruit...
                  </p>
                  <span>Suzie & Henry travelled to Sri Lanka, March 2022</span>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    Charlotte was excellent as always - friendly and
                    approachable, with lots of ideas when discussing
                    itineraries, and the mix of city and sea worked well.
                  </p>
                  <span>Filippo E travelled to Portugal, February 2022</span>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    We loved Costa Rica. Ashleigh was great at organising our
                    trip, and when coronavirus changed everything, she comforted
                    us and reassured us that we were able to get home.
                  </p>
                  <span>Suzie & Henry travelled to Costa Rica, March 2020</span>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    Katie was a very good communicator and was quick to research
                    our specific requests. We loved everything about our trip,
                    especially seeing penguins and giraffes!
                  </p>
                  <span>
                    Exsus travellers who travelled to South Africa in December
                    2019/January 2020
                  </span>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    Our holiday in Africa was excellent. Mark went out of his
                    way to organise this trip for us. We loved it - OMG it was
                    the most magical place.
                  </p>
                  <span>
                    Ms J. Tighe travelled to South Africa, Botswana and
                    Zimbabwe, September 2019
                  </span>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    Ashleigh was amazing. She listened to all our preferences
                    and interests and put together the most perfect itinerary
                    for us.
                  </p>
                  <span>
                    Exsus travellers who travelled to Peru, September 2019
                  </span>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    Our holiday was honestly awesome. Gina tailored the trip
                    extremely well to our needs, and everything was brilliant.
                    We had a fantastic time.
                  </p>
                  <span>The Tonge family travelled to Norway, August 2019</span>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-caption">
                  <p>
                    From beginning to end, our holiday was like a fairytale. We
                    would not change a thing.
                  </p>
                  <span>
                    Mike & Debbie Edwards travelled to Italy, July/August 2019
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card_blk_row">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick} target="_blank">
                  <img
                    src="images/card_img07.jpg"
                    alt="Card image 07"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Luxury Family Safaris in Africa - Favourite</h3>
                          <p>July 04 2022</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4">
              <div className="card_blk_inr">
                <a href="#" onClick={handleHrefClick}>
                  <img
                    src="images/card_img08.jpg"
                    alt="Card image 08"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Luxury Family Holidays in the Galapagos</h3>
                          <p>July 04 2022</p>
                        </div>
                      </div>
                      <div className="col-1 ps-0">
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
          <h4>Sign up for our newsletter
            <span>Receive our latest news and special offers</span></h4>
          <form
            className="newslettr_form d-block d-sm-flex"
            onSubmit={handleSubmit2(onSignup)}
          >
            <div className="newlettr_inpt">
              <input
                type="text"
                placeholder="Full name and title"
                name="fullnameAndTitle"
                {...register2("fullnameAndTitle")}
              />
              <div className="invalid-feedback mb-1">
                {errors2.fullnameAndTitle?.message}
              </div>
            </div>
            {/* <div className="newlettr_inpt ps-0 ps-sm-2">
                            <input type="email" placeholder="Your email address" name="emailId" {...registerSignup('emailId')} className={`form-control ${errorsSignup.emailId ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback mb-1">{errorsSignup.emailId?.message}</div>
                        </div> */}
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
    </>
  );
}
