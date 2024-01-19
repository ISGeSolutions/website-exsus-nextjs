import React, { useState, useEffect } from "react";
import { Signup, FriendlyUrl } from "components";
import { MyLoader } from "./../../components/MyLoader";
// import { Link, Spinner } from 'components';
import { Layout } from "components/users";
import { whyusService, destinationService, homeService } from "services";
import { NavLink } from "components";
import { useRouter } from "next/router";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useTranslation } from "react-i18next";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
// import ReactGA from 'react-ga';
// import ReactPixel from 'react-facebook-pixel';
// import ReactPixel from '../../components/facebookPixel'; // Import your Facebook Pixel configuration
// import ReactPixel from 'react-facebook-pixel';

import ReactGA from "react-ga4";
// ReactGA.initialize('G-2H6GP9JWWY');

export default Index;

function Index() {
  // ReactPixel.pageView();

  // ReactGA.pageview(window.location.pathname + window.location.search);
  // ReactGA.pageview('/why-us'); // Specify the URL or route for the page
  // ReactPixel.pageView(); // Track a page view event

  const [whyusDetails, setWhyusDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [customPageData, setCustomData] = useState([]);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [subTitle, setSubTitle] = useState(null);

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") {
        regionWiseUrl = "/" + window.site_region;
        region = window.site_region;
      }
    }
  }

  const websiteContentCheck = (matches, modifiedString) => {
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
          setLongText(modifiedString);
        }
      });
  };

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/why-us",
      title: "Custom Title",
    });
    ReactGA.event({
      category: "test category",
      action: "Test action",
      label: "Test label", // optional
      value: 99, // optional, must be a number
      nonInteraction: true, // optional, true/false
      transport: "xhr", // optional, beacon/xhr/image
    });

    // const carousel = document.querySelector('#carouselExampleInterval');
    // new bootstrap.Carousel(carousel);

    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    whyusService
      .getWhyusPage()
      .then((x) => {
        setWhyusDetails(x?.data[0]?.attributes);

        setCustomData(x.data[0]?.attributes?.custom_page_contents);

        const data = x.data[0]?.attributes?.custom_page_contents?.data;

        let modifiedString = "";
        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value.toUpperCase());
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              modifiedString = element?.attributes?.content_value;
              // setLongText(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightCorner(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Sub_Title") {
              setSubTitle(element?.attributes?.content_value);
            }
          });
        }

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
          // You can access it using localStorage.getItem('yourKey')
          if (matches) {
            let replacement = "";
            try {
              matches.forEach((match, index, matches) => {
                const matchString = match.replace(/{|}/g, "");
                if (!storedData[matchString]) {
                  throw new Error("Loop break");
                } else {
                  replacement = storedData[matchString];
                }
                const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
                if (checkStr && replacement) {
                  modifiedString = modifiedString.replace(
                    checkStr,
                    replacement
                  );
                }
              });
              setLongText(modifiedString);
              setIsLoading(false);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
                //  ("Loop has been stopped.");
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                //  ("Loop has been stopped.");
                setLongText(modifiedString);
              }
            }
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>{whyusDetails?.page_friendly_url}</title>
      </Head>

      <Layout>
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
                  {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button> */}
                  {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="3" aria-label="Slide 4"></button> */}
                  {whyusDetails?.custom_page_images?.data?.map(
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
                </div>
                <div className="carousel-inner">
                  {whyusDetails?.custom_page_images?.data?.map(
                    (element, index) =>
                      element?.attributes?.image_type == "banner" && (
                        <NavLink
                          href="#"
                          className="carousel-item active"
                          data-bs-interval="5000"
                          key={index}
                        >
                          <div
                            className="banner_commn_cls"
                            style={{
                              backgroundImage: `url(${element?.attributes?.image_path})`,
                            }}
                          ></div>
                        </NavLink>
                      )
                  )}
                  {/* <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner01"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner02"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner03"></div>
                        </a>
                        <a href="#" target="_blank" className="carousel-item" data-bs-interval="5000">
                            <div className="banner_commn_cls about_us_banner04"></div>
                        </a> */}
                </div>
              </div>
            </section>

            <section className="trvl_info_row">
              <div className="container">
                <div className="bookmark_row">
                  {/* <div>
                                        <h1>{t('appTitle')}</h1>
                                        <p>{t('welcomeMessage')}</p>
                                    </div> */}
                  {/* {/ <p style={{ color: `white` }}>{destinations?.attributes?.page_friendly_url}</p > /} */}
                  <FriendlyUrl
                    data={"home/" + whyusDetails?.page_friendly_url}
                  ></FriendlyUrl>
                </div>
                <div className="trvl_info_cntnt">
                  <h2 className="trvl_title">
                    {
                      customPageData?.data?.filter(
                        (res) => res.attributes?.content_name == "HeadingTag"
                      )[0]?.attributes?.content_value
                    }
                  </h2>
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: customPageData?.data?.filter(
                        (res) => res.attributes?.content_name == "Long_Text"
                      )[0]?.attributes?.content_value,
                    }}
                  /> */}
                  <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: longText }}
                  ></p>
                </div>
              </div>
            </section>

            <section className="card_blk_row dark_grey py-5">
              <div className="container">
                <div className="book_wth_confdnce">
                  {/* <h3
                    dangerouslySetInnerHTML={{
                      _html: whyusDetails?.data?.filter(
                        (res) => res.attributes?.content_name == "Short_Text"
                      )[0]?.attributes?.content_value,
                    }}
                  ></h3> */}
                  <div className="row">
                    <div className="col-lg-4">
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: whyusDetails?.content_value,
                        }}
                      /> */}
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: customPageData?.data?.filter(
                            (res) =>
                              res.attributes?.content_name == "Short_Text"
                          )[0]?.attributes?.content_value,
                        }}
                      /> */}
                      {/* <h3>Specialist Expertise</h3>
                                <p>With over 20 years’ experience of creating incredible journeys and tailor-made luxury honeymoons, all around the world, our destination experts have first-hand experience of their dedicated areas and frequently travel to them to stay on top of what’s best, what’s new and what not to miss, so can advise you personally.</p> */}
                    </div>
                    {/* <div className="col-lg-4">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: whyusDetails?.content_value,
                        }}
                      />
                      {/* <h3>Tailor-made trips</h3>
                                <p>All trips put together through us are designed to suit individual needs and interests. Personalise an itinerary by adding more time in your favourite place, including an incredible experience you’d like to have or adding something out of the ordinary, so your holiday turns into a trip of a lifetime.</p> */}
                    {/* </div> */}
                    {/* <div className="col-lg-4">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: whyusDetails?.content_value,
                        }}
                      /> */}
                    {/* <h3>Fully protected</h3>
                                <p>From the moment you start planning your trip, you will have a dedicated expert looking after you. While away, we’ll provide 24/7 support and emergency contact to ensure that everything runs smoothly. We are members of ABTA, ATOL and AITO so you can rest assured your holiday is fully protected. </p> */}
                    {/* </div> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="card_blk_inr card_blk_overlay">
                      <NavLink href={`/destinations`}>
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
                      </NavLink>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="card_blk_inr card_blk_overlay">
                      <NavLink href={`/holiday-types`}>
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
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
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
      </Layout>
    </>
  );
}
