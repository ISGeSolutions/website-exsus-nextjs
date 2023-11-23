import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { FriendlyUrl } from "../../components";
import { hotelService, destinationService, countriesService } from "services";
import Iframe from "react-iframe";
import { useRouter } from "next/router";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

import Head from "next/head";
import { NavLink } from "components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { element } from "prop-types";
var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const router = useRouter();
  const [itineraries, setItineraries] = useState(null);
  const [bannerImages, setBannerImages] = useState(null);
  const itin_name = router.query?.itineraryName
    ? router.query?.itineraryName?.replace(/-/g, " ").toLowerCase()
    : router.query?.itineraries?.replace(/-/g, " ").toLowerCase();
  const itin_code = router.query.itinerarycode;
  const [title, setTitle] = useState("");
  const countrycode = router.query.countrycode;
  const destinationcode = router.query.destinationcode;
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [overViewText, setOverViewText] = useState(null);

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") {
        region = window.site_region;
        regionWiseUrl = "/" + window.site_region;
      }
    }
  }

  const equalHeight = (resize) => {
    var elements = document.getElementsByClassName("card_slider_cnt"),
      allHeights = [],
      i = 0;
    if (resize === true) {
      for (i = 0; i < elements.length; i++) {
        elements[i].style.height = "auto";
      }
    }
    for (i = 0; i < elements.length; i++) {
      var elementHeight = elements[i].clientHeight;
      allHeights.push(elementHeight);
    }
    for (i = 0; i < elements.length; i++) {
      elements[i].style.height = Math.max.apply(Math, allHeights) + "px";
      if (resize === false) {
        elements[i].className = elements[i].className + " show";
      }
    }
  };

  const EnquiryBtn = () => {
    const router = useRouter();

    const handleEnquiryClick = () => {
      router.push(`/contact-us`); // Navigate to the /enquiry page
    };

    return (
      <button
        className="btn prmry_btn make_enqury_btn"
        onClick={handleEnquiryClick}
      >
        {" "}
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
    );
  };

  const websiteContentCheck = (matches, region, modifiedString) => {
    destinationService
      .getDictionaryDetails(matches, region)
      .then((responseObj) => {
        if (responseObj) {
          const res = responseObj?.data;
          res.forEach((element, index) => {
            const replacement = element?.attributes?.content_translation_text;
            const matchString = element?.attributes?.content_word;
            const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
            if (checkStr && replacement) {
              modifiedString = modifiedString.replace(checkStr, replacement);
            }
          });

          // Set the modified string in state
          // setLongText(modifiedString);
        }
      });
  };

  const dictioneryFunction = (data) => {
    let modifiedString = data;
    if (modifiedString) {
      const regex = /{[a-zA-Z0-9-]+}/g;
      const matches = [...new Set(modifiedString.match(regex))];

      let storedDataString = "";
      let storedData = "";

      if (region == "uk") {
        storedDataString = localStorage.getItem("websitecontent_uk");
        storedData = JSON.parse(storedDataString);
      } else if (region == "us") {
        storedDataString = localStorage.getItem("websitecontent_us");
        storedData = JSON.parse(storedDataString);
      } else if (region == "asia") {
        storedDataString = localStorage.getItem("websitecontent_asia");
        storedData = JSON.parse(storedDataString);
      } else if (region == "in") {
        storedDataString = localStorage.getItem("websitecontent_india");
        storedData = JSON.parse(storedDataString);
      }
      if (storedData !== null) {
        // debugger;
        // You can access it using localStorage.getItem('yourKey')

        if (matches) {
          let replacement = "";
          try {
            matches.forEach((match, index, matches) => {
              const matchString = match.replace(/{|}/g, "");
              if (!storedData[matchString]) {
                websiteContentCheck(matches, region, modifiedString);
                throw new Error("Loop break");
              } else {
                replacement = storedData[matchString];
              }
              const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
              if (checkStr && replacement) {
                modifiedString = modifiedString.replace(checkStr, replacement);
              }
            });
            return modifiedString;
          } catch (error) {
            if (error.message === "Loop break") {
            } else if (error.message === "Region not found") {
            }
          }
        }
      }
    } else {
    }
  };

  equalHeight(true);

  const overTextFun = (text) => {
    return text?.replace(/\\n/g, "");
  };

  useEffect(() => {
    // console.log(itin_name)
    // console.log(router.query);
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    $(document).ready(function () {
      $(".itinery_detls_expnded").hide();
      $(".itinery_btn").click(function () {
        $(this).toggleClass("read_more");
        $(this).prev(".itinery_detls_expnded").slideToggle("slow");
      });
    });

    if (countrycode) {
      countriesService
        .getCountryDetails(countrycode)
        .then((x) => {
          setCountries(x.data?.attributes?.country_name);
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle any errors here
          // console.error(error);
          setIsLoading(false);
        });
    } else if (destinationcode) {
      destinationService
        .getDestinationDetails(destinationcode)
        .then((x) => {
          setCountries(
            x.data?.attributes?.countries?.data[0]?.attributes?.country_name
          );
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle any errors here
          // console.error(error);
          setIsLoading(false);
        });
    }

    destinationService
      .getItineraryDetails(itin_name)
      .then((x) => {
        //
        const bannerImages = [];
        const imageCheck = x.data[0]?.attributes?.itinerary_details.data;
        setFriendlyUrl(
          `home/destinations/${router.query?.continent}/${router.query?.country
          }/${x.data[0].attributes.friendly_url
          }`
        );
        setTitle(x.data[0].attributes.meta_title);
        imageCheck.forEach((banner, index) => {
          bannerImages.push(banner?.attributes?.image_path);
          // if (banner?.attributes?.image_type == 'banner') {
          //     bannerImages.push(banner?.attributes?.image_path);
          // }
        });

        setBannerImages(bannerImages);
        setItineraries(x.data[0]);

        // const carousel = document.querySelector('#Testimonials');
        // new bootstrap.Carousel(carousel);

        window.addEventListener("resize", equalHeight(true));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [itin_name, itin_code, countrycode, destinationcode]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider02.js"
        ></script> */}
        {/* <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script> */}
      </Head>
      {isLoading ? (
        // <MyLoader />
        <div
          className="full_loader_parnt_blk loader_parnt_blk"
          style={{ display: `block !important` }}
        >
          <div className="loader-circle-2"></div>
        </div>
      ) : (
        <div>
          <section className="banner_blk_row">
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {bannerImages?.map(
                  (element, index) =>
                    element?.attributes?.image_type == "banner" && (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleInterval"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                      ></button>
                    )
                )}
                {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
              </div>
              <div className="carousel-inner">
                {bannerImages?.map((element, index) => (
                  <NavLink
                    href="#"
                    className="carousel-item active"
                    data-bs-interval="5000"
                    key={index}
                  >
                    <div
                      className="banner_commn_cls"
                      style={{ backgroundImage: `url(${element})` }}
                    ></div>
                  </NavLink>
                ))}
              </div>
            </div>
          </section>

          {/* <section className="banner_blk_row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel"> */}
          {/* <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="5" aria-label="Slide 6"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="6" aria-label="Slide 7"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="7" aria-label="Slide 8"></button>
                    </div> */}
          {/* <div className="carousel-inner">
                        {bannerImages?.map((element, index) => (
                            <img key={index} src={`https://d33ys3jnmuivbg.cloudfront.net/ilimages` + element} alt="destination card01" className="img-fluid" />
                        ))} */}
          {/* <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls itinery_overvw_banner01"></div>
                        </a> */}

          {/* <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="itinery_overvw_banner02 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="itinery_overvw_banner03 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="itinery_overvw_banner04 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="itinery_overvw_banner05 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="itinery_overvw_banner06 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="itinery_overvw_banner07 banner_commn_cls"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="itinery_overvw_banner08 banner_commn_cls"></div>
                        </a> */}

          {/* </div>
                </div>
            </section> */}

          <section className="trvl_info_row">
            <div className="container">
              <div className="bookmark_row">
                {/* <p style={{ color: `white` }}>
                  {itineraries?.attributes?.friendly_url}
                </p> */}
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
                {/* <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="destinations.html">Destinations</a></li>
                            <li><a href="destination_detail.html">Asia</a></li>
                            <li><a href="country_detail.html">China</a></li>
                            <li><a href="region_detail.html">Beijing & Northern China</a></li>
                            <li><a href="region_detail.html">Beijing & Northern China Itineraries</a></li>
                            <li>China like an Emperor</li>
                        </ul> */}
              </div>

              <div className="trvl_info_cntnt">
                <h2 className="trvl_title">
                  {itineraries?.attributes?.itin_name}
                  <span className="mt-2 d-block white_text_colr">
                    {dictioneryFunction(itineraries?.attributes?.header_text)}
                  </span>
                </h2>
                <h3 className="trvl_title_sub">
                  {dictioneryFunction(itineraries?.attributes?.sub_header_text)}
                </h3>
                <p className="mb-4">
                  <span>Duration: </span>
                  {itineraries?.attributes?.no_of_nites_notes}
                </p>
                <p className="mb-4">
                  <span>Price: </span>
                  {
                    itineraries?.attributes?.itinerary_country_contents?.data[0]
                      ?.attributes?.guideline_price_notes
                  }
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: dictioneryFunction(
                      itineraries?.attributes?.overview_text
                    ),
                  }}
                />
              </div>

              <section className="country_highlight_row itinery_hightlight_row mb-0">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="country_highlight_inr">
                      <span>Perfect for</span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: itineraries?.attributes?.perfect_for_text,
                        }}
                      ></p>
                      {/* <p>
                        {/* dangerouslySetInnerHTML=
                        {{
                          __html: itineraries?.attributes?.perfect_for_text,
                        // }} */}
                      {/* {itineraries?.attributes?.perfect_for_text} */}
                      {/* </p>  */}
                      <p>
                        <span>In the know</span>Combine your holiday in China
                        with a stopover in glamorous{" "}
                        <span className="me-0 text-capitalize">Dubai</span>.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="itinery_highlight_inr">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: itineraries?.attributes?.best_for_text,
                        }}
                      />
                      {/* <ul>
                                        <li>Best for</li>
                                        <li>Seriously special</li>
                                        <li>Luxury hotel</li>
                                        <li>Cultural immersion</li>
                                        <li>Honeymoon</li>
                                    </ul> */}
                    </div>
                  </div>
                </div>
              </section>

              <section className="tailor_made_holidys_row">
                <div className="tailor_made_holidys_inr">
                  <h3>All Exsus Travel holidays are tailor-made</h3>
                  <p>
                    All itineraries on our website are designed as a starting
                    point. Tell us your budget/wishlist/preferred length of stay
                    and we'll help you select the best hotels and experiences,
                    so your holiday is totally personalised.
                  </p>
                  <div className="btn_grp">
                    Call 020 7337 9010 or
                    {/* <button className="btn prmry_btn make_enqury_btn ml-2" style={{ marginLeft: '10px' }}>Make an enquiry
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button> */}
                    <EnquiryBtn />
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section className="itinery_detls_row">
            <div className="container">
              <h3 className="title_cls">Itinerary details</h3>

              {itineraries?.attributes?.itinerary_details?.data?.map(
                (element, index) => (
                  <div className="itinery_detls_cntnt" key={index}>
                    <div className="row">
                      <div className="col-sm-7 pe-sm-0">
                        <div className="itinery_detls_para">
                          {/* <h3><span>3 nights</span>BEIJING</h3> */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: overTextFun(
                                element?.attributes?.overview_text
                              ),
                            }}
                          />
                          <div className="itinery_detls_expnded">
                            {/* <p>from the East Gate. You’ll enjoy a private guided tour of the palace, which was the summer retreat of the royals of the Qing dynasty, walking along its pretty waterfront paths and around landscaped gardens.</p>
                                        <p>During your stay here you’ll also be expertly guided around many of Beijing’s other landmarks, including Tiananmen Square, the unmissable Forbidden City, an impressive complex dating back to the Ming and Qing dynasties, and the Temple of Heaven, where you can join in a local tai chi session. In the evening, visit a bustling night market and feast on Peking duck at one of the city’s best restaurants.</p>
                                        <p>You’ll also spend a day visiting the iconic Great Wall, including a tour of the Tibetan-Buddhist Lama Temple on the way. Get under the wall’s skin with a guided tour of Mutianyu, one of the best-preserved sections of the wall.</p> */}
                          </div>
                          {/* <button className="btn itinery_btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" className="up_arrow" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                    </button> */}
                        </div>
                      </div>
                      <div className="col-sm-5 ps-sm-0">
                        <div className="itinery_detls_img">
                          <img
                            src={element?.attributes?.image_path}
                            alt={element?.attributes?.image_text}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* <div className="itinery_detls_cntnt">
                        <div className="row">
                            <div className="col-sm-7 pe-sm-0">
                                <div className="itinery_detls_para">
                                    <h3><span>3 nights</span>BEIJING</h3>
                                    <p>Beijing is simply intoxicating, and you can’t fail to be swept up in the buzz of history, culture and modern flair, from the incredible Forbidden City to the futuristic theatres and galleries.</p>
                                    <p>Your hotel here, the <a href="#">Aman Summer Palace</a>, is really rather special – this is where former guests stayed, and it is set within its walls, just a few steps</p>
                                    <div className="itinery_detls_expnded">
                                        <p>from the East Gate. You’ll enjoy a private guided tour of the palace, which was the summer retreat of the royals of the Qing dynasty, walking along its pretty waterfront paths and around landscaped gardens.</p>
                                        <p>During your stay here you’ll also be expertly guided around many of Beijing’s other landmarks, including Tiananmen Square, the unmissable Forbidden City, an impressive complex dating back to the Ming and Qing dynasties, and the Temple of Heaven, where you can join in a local tai chi session. In the evening, visit a bustling night market and feast on Peking duck at one of the city’s best restaurants.</p>
                                        <p>You’ll also spend a day visiting the iconic Great Wall, including a tour of the Tibetan-Buddhist Lama Temple on the way. Get under the wall’s skin with a guided tour of Mutianyu, one of the best-preserved sections of the wall.</p>
                                    </div>
                                    <button className="btn itinery_btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" className="up_arrow" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-5 ps-sm-0">
                                <div className="itinery_detls_img">
                                    <img src="./../.../../../../../images/itinery_cntnt01.jpg" alt="itinery_cntnt01" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="itinery_detls_cntnt">
                        <div className="row">
                            <div className="col-sm-7 pe-sm-0">
                                <div className="itinery_detls_para">
                                    <h3><span>3 nights</span>LIJIANG</h3>
                                    <p>From Beijing, you’ll make your way to the attractive hillside city of Lijiang and your second Aman hotel, <a href="#">Amandayan</a>, which sits beneath the imposing Jade Dragon Snow Mountain and takes inspiration for its wow-factor interiors from local cultures and crafts such as Dongba wood carvings.</p>
                                    <p>Immerse yourself in the area’s pretty villages, which offer a unique insight</p>
                                    <div className="itinery_detls_expnded">
                                        <p>into rural China and its age-old traditions. You will spend an afternoon on a private tour of historic Lijiang, which formed part of the Ancient Tea Horse Road and displays cultural influences spanning the centuries, its traditional architecture set against a dramatic backdrop of jagged mountains and lakes.</p>
                                        <p>Additional tours vary according to the time of year you visit – these may include the ancient town of Yuhu and temples such as Zhiyun.</p>
                                    </div>
                                    <button className="btn itinery_btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" className="up_arrow" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-5 ps-sm-0">
                                <div className="itinery_detls_img">
                                    <img src="../../../../../images/itinery_cntnt02.jpg" alt="itinery_cntnt01" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="itinery_detls_cntnt">
                        <div className="row">
                            <div className="col-sm-7 pe-sm-0">
                                <div className="itinery_detls_para">
                                    <h3><span>3 nights</span>HANGZHOU</h3>
                                    <p>Your next stop is Hangzhou and <a href="#">Amanfayun</a>, which is modelled on a traditional Chinese village and is nestled amongst forests, tea plantations, bamboo groves and Buddhist temples near the beautiful West Lake. On arrival you’ll have plenty of time to explore before tucking into a gourmet traditional dinner.</p>
                                    <div className="itinery_detls_expnded">
                                        <p>Walk around the lake and head out on its serene waters on a scenic boat trip, and indulge in a private tour of the Temple of Soul’s Retreat, or Lingyin Temple, which is one of China’s most significant Buddhist temples. Discover the history of tea-making in the area and visit verdant tea plantations, flanked by mountains, on a guided tour of Longjing Tea Village. Longjing or Dragon Well tea is a type of green tea and is one of China’s most popular teas (it is also known as Green Queen). You can also venture further on to Nine Creeks, a stretch of forest and mountains, where you can walk through trees shrouded in mist and breathe clear mountain air.</p>
                                    </div>
                                    <button className="btn itinery_btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" className="up_arrow" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-5 ps-sm-0">
                                <div className="itinery_detls_img">
                                    <img src="../../../../../images/itinery_cntnt03.jpg" alt="itinery_cntnt03" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="itinery_detls_cntnt">
                        <div className="row">
                            <div className="col-sm-7 pe-sm-0">
                                <div className="itinery_detls_para">
                                    <h3><span>3 nights</span>SHANGHAI</h3>
                                    <p>Your final stop is glittering Shanghai, which offers everything from ancient temples to gourmet restaurants and cocktail bars on the top floors of some of the world’s highest skyscrapers, where you can wine and dine while enjoying the spectacular vistas.</p>
                                    <p>Take in a dazzling acrobatics show whose performers display superhuman</p>
                                    <div className="itinery_detls_expnded">
                                        <p>levels of flexibility, accompanied by a gourmet dinner that showcases Shanghai’s fantastic cuisine, before being taken back to your hotel. We’ve picked the regal <a href="#">Peninsula</a> for your stay here: in a perfect location on the Bund riverfront, this award-winning hotel has world-className facilities, including not one but two Michelin-starred restaurants, and beautiful views over the waterfront and beyond – head to the glamorous rooftop terrace to make the most of them.</p>
                                    </div>
                                    <button className="btn itinery_btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" className="up_arrow" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-5 ps-sm-0">
                                <div className="itinery_detls_img">
                                    <img src="../../../../../images/itinery_cntnt04.jpg" alt="itinery_cntnt04" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div> */}
            </div>
          </section>

          <section className="best_time_blk_row">
            <div className="container">
              <section className="best_time_blk_inr">
                <h3>BEST TIME TO GO</h3>
                <div className="row">
                  <div className="col-lg-4">
                    <ul className="best_time_blk_left">
                      <li>
                        <span className="shade01"></span>Best time to travel
                      </li>
                      <li>
                        <span className="shade02"></span>Good time to travel
                        (but some limitations)
                      </li>
                      <li>
                        <span className="shade03"></span>Travel is possible (but
                        it’s not the best time)
                      </li>
                      <li>
                        <span className="shade04"></span>Travel is not
                        recommended
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-8">
                    <ul className="best_time_blk_right">
                      <li className="mt-3 mt-lg-0">
                        Jan<span className="shade01"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Feb<span className="shade02"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Mar<span className="shade03"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Apr<span className="shade04"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        May<span className="shade01"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        June<span className="shade02"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        July<span className="shade03"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Aug<span className="shade04"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Sep<span className="shade01"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Oct<span className="shade02"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Nov<span className="shade03"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Dec<span className="shade04"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="map_blk_row">
                <h3>Hotel locations for this itinerary</h3>
                <div className="map_blk_inr">
                  <Iframe
                    width="640px"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin"
                    style="border:0;"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                </div>
              </section>
            </div>
          </section>

          <section className="favrites_blk_row">
            <div className="container">
              <h3 className="title_cls">
                Hotels we've recommended for this trip
              </h3>
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
                          src="../../../../../images/country_hotel06.jpg"
                          alt="country_hotel06"
                          className="img-fluid"
                        />
                      </a>
                      <div className="card_slider_cnt">
                        <h4>Aman Summer Palace</h4>
                        <ul>
                          <li>Location: Beijing & Northern China | China</li>
                          <li>
                            Price guide:
                            <span
                              tabIndex="0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              data-bs-title="£200-£350 per person per night"
                            >
                              £££<label>££</label>
                            </span>
                          </li>
                          <li>
                            Best for:
                            <span>
                              Luxury Hotel, City Hotel, Chic Design, Setting &
                              Views
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn justify-content-end">
                        <span className="view_itnry_link">
                          View Hotel
                          <em className="fa-solid fa-chevron-right"></em>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="card_slider_inr">
                    <div className="card_slider">
                      <div className="card_slider_img">
                        <img
                          src="../../../../../images/country_hotel13.jpg"
                          alt="country_hotel13"
                          className="img-fluid"
                        />
                      </div>
                      <div className="card_slider_cnt">
                        <h4>Amandayan</h4>
                        <ul>
                          <li>Location: Yunnan | China</li>
                          <li>
                            Price guide:
                            <span
                              tabIndex="0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              data-bs-title="£200-£350 per person per night"
                            >
                              £££<label>££</label>
                            </span>
                          </li>
                          <li>
                            Best for:
                            <span>
                              Luxury Hotel, Romantic, Seriously special, Chic
                              Design
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn justify-content-end">
                        <span className="view_itnry_link">
                          View hotel
                          <em className="fa-solid fa-chevron-right"></em>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="card_slider_inr">
                    <div className="card_slider">
                      <div className="card_slider_img">
                        <img
                          src="../../../../../images/country_hotel14.jpg"
                          alt="country_hotel14"
                          className="img-fluid"
                        />
                      </div>
                      <div className="card_slider_cnt">
                        <h4>Amanfayun</h4>
                        <ul>
                          <li>
                            Location: Shanghai, Hangzhou & Eastern China | China
                          </li>
                          <li>
                            Price guide:
                            <span
                              tabIndex="0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              data-bs-title="£200-£350 per person per night"
                            >
                              £££<label>££</label>
                            </span>
                          </li>
                          <li>
                            Best for:
                            <span>
                              Honeymoon, Luxury Hotel, Hideaway, Seriously
                              special
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn justify-content-end">
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
                          src="../../../../../images/country_hotel15.jpg"
                          alt="country_hotel15"
                          className="img-fluid"
                        />
                      </div>
                      <div className="card_slider_cnt">
                        <h4>The Peninsula Shanghai</h4>
                        <ul>
                          <li>
                            Location: Shanghai, Hangzhou & Eastern China | China
                          </li>
                          <li>
                            Price guide:
                            <span
                              tabIndex="0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              data-bs-title="£200-£350 per person per night"
                            >
                              £££<label>££</label>
                            </span>
                          </li>
                          <li>
                            Best for:
                            <span>
                              Chic Design, History & Heritage, Food & Wine, City
                              Hotel
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn justify-content-end">
                        <span className="view_itnry_link">
                          View hotel
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
            {/* <div className="full_loader_parnt_blk loader_parnt_blk" style="display: none;"><div className="loader-circle-2"></div></div> */}
          </section>

          <section className="favrites_blk_row light_grey">
            <div className="container">
              <h3 className="title_cls">More itineraries in {countries}</h3>
              <div className="card_slider_row01">
                <i id="leftt">
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
                <div className="carousel01">
                  <div className="card_slider_inr01">
                    <div className="card_slider">
                      <a className="card_slider_img">
                        <img
                          src="../../../../../images/country_card04.jpg"
                          alt="country card04"
                          className="img-fluid"
                        />
                      </a>
                      <div className="card_slider_cnt">
                        <h4>
                          <a href="#">A Journey Through Cathay</a>
                        </h4>
                        <ul>
                          <li>China in Classic Style</li>
                          <li>China</li>
                          <li>From £5,050 per person</li>
                          <li>
                            Travel to:
                            <span>
                              Beijing &amp; Northern China, Shanghai, Hangzhou
                              &amp; Eastern China, Xi'an, Sichuan &amp; Central
                              China
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn light_grey_btn_bg">
                        <span>12 nights</span>
                        <span className="view_itnry_link">
                          View this itinerary
                          <em className="fa-solid fa-chevron-right"></em>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="card_slider_inr01">
                    <div className="card_slider">
                      <div className="card_slider_img">
                        <img
                          src="../../../../../images/country_card02.jpg"
                          alt="country card02"
                          className="img-fluid"
                        />
                      </div>
                      <div className="card_slider_cnt">
                        <h4>
                          <a href="#">In Search of Pandas</a>
                        </h4>
                        <ul>
                          <li>Family Adventure to China</li>
                          <li>China</li>
                          <li>From £6,750 per person</li>
                          <li>
                            Travel to:
                            <span>
                              Beijing &amp; Northern China, Hong Kong &amp;
                              Macau, Southern China, Xi'an, Sichuan &amp;
                              Central China
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn light_grey_btn_bg">
                        <span>13 nights</span>
                        <span className="view_itnry_link">
                          View this itinerary
                          <em className="fa-solid fa-chevron-right"></em>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="card_slider_inr01">
                    <div className="card_slider">
                      <div className="card_slider_img">
                        <img
                          src="../../../../../images/country_card03.jpg"
                          alt="country card03"
                          className="img-fluid"
                        />
                      </div>
                      <div className="card_slider_cnt">
                        <h4>
                          <a href="#">STYLISH HONEYMOON TO CHINA</a>
                        </h4>
                        <ul>
                          <li>A Chinese Romance</li>
                          <li>China</li>
                          <li>From £5,450 per person</li>
                          <li>
                            Travel to:
                            <span>
                              Beijing &amp; Northern China, Hong Kong &amp;
                              Macau, Southern China
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn light_grey_btn_bg">
                        <span>12 nights</span>
                        <span className="view_itnry_link">
                          View itinerary
                          <em className="fa-solid fa-chevron-right"></em>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="card_slider_inr01">
                    <div className="card_slider">
                      <div className="card_slider_img">
                        <img
                          src="../../../../../images/country_card06.jpg"
                          alt="country card06"
                          className="img-fluid"
                        />
                      </div>
                      <div className="card_slider_cnt">
                        <h4>
                          <a href="#">Down the Golden River</a>
                        </h4>
                        <ul>
                          <li>China &amp; Yangtze in Serious Style</li>
                          <li>CHina</li>
                          <li>From £5,850 per person</li>
                          <li>
                            Travel to:
                            <span>
                              Beijing &amp; Northern China, Shanghai, Hangzhou
                              &amp; Eastern China, Xi'an, Sichuan &amp; Central
                              China
                            </span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn card_slider_btn light_grey_btn_bg">
                        <span>11 nights</span>
                        <span className="view_itnry_link">
                          View this itinerary
                          <em className="fa-solid fa-chevron-right"></em>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <i id="rightt">
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
            {/* <div className="full_loader_parnt_blk loader_parnt_blk" style="display: none;"><div className="loader-circle-2"></div></div> */}
          </section>

          <section className="make_enqury_row">
            <div className="container">
              <EnquiryButton />
            </div>
          </section>

          <section
            aria-label="Sign up for newsletter"
            className="newslettr_row"
          >
            <div className="container">
              <h4>Sign up for our newsletter</h4>
              <h5>Receive our latest news and special offers</h5>
              <Signup />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
