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
  const [longText, setLongText] = useState(null);

  let dictionaryPage = 1;

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

  const websiteContentCheck = (pageNo) => {
    homeService
      .getAllWebsiteContent(region, pageNo)
      .then((x) => {
        const response = x?.data;

        // Calculate the expiration time (1 day from the current time)
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

        const dynamicObject = {};
        const dynamicObjectUk = {};
        const dynamicObjectUs = {};
        const dynamicObjectAsia = {};
        const dynamicObjectIndia = {};

        response.forEach((element, index) => {
          // Create an object with the data and expiration time
          dynamicObject[element?.attributes?.content_word] =
            element?.attributes?.content_translation_text;
          dynamicObject["code"] =
            element?.attributes?.website_country?.data?.attributes?.code;
          dynamicObject["expiration"] = expirationTime;

          if (
            element?.attributes?.website_country?.data?.attributes?.code == "UK"
          ) {
            dynamicObjectUk[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectUk["expiration"] = expirationTime;
            let localStorageUk = JSON.parse(
              localStorage.getItem("websitecontent_uk")
            );
            localStorage.setItem(
              "websitecontent_uk",
              JSON.stringify({ ...localStorageUk, ...dynamicObjectUk })
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code == "US"
          ) {
            dynamicObjectUs[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectUs["expiration"] = expirationTime;
            let localStorageUS = JSON.parse(
              localStorage.getItem("websitecontent_us")
            );
            localStorage.setItem(
              "websitecontent_us",
              JSON.stringify({ ...localStorageUS, ...dynamicObjectUs })
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "ASIA"
          ) {
            dynamicObjectAsia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectAsia["expiration"] = expirationTime;
            let localStorageAsia = JSON.parse(
              localStorage.getItem("websitecontent_asia")
            );
            localStorage.setItem(
              "websitecontent_asia",
              JSON.stringify({ ...localStorageAsia, ...dynamicObjectAsia })
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "INDIA"
          ) {
            dynamicObjectIndia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectIndia["expiration"] = expirationTime;
            let localStorageIndia = JSON.parse(
              localStorage.getItem("websitecontent_india")
            );
            localStorage.setItem(
              "websitecontent_india",
              JSON.stringify({ ...localStorageIndia, ...dynamicObjectIndia })
            );
          }
        });
        if (x?.meta?.pagination?.pageCount > x?.meta?.pagination?.page) {
          dictionaryPage = x?.meta?.pagination?.page + 1;
          websiteContentCheck(dictionaryPage);
        }
        setWebsiteContent(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });
  };

  const dictioneryFunction = (data) => {
    let modifiedString = data;
    if (modifiedString) {
      const regex = /{[a-zA-Z0-9-]+}/g;
      const matches = [...new Set(modifiedString.match(regex))];

      let storedDataString = "";
      let storedData = "";
      //
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
        //
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
                modifiedString = modifiedString.replace(checkStr, replacement);
              }
            });
            return modifiedString;
            setIsLoading(false);
          } catch (error) {
            if (error.message === "Loop break") {
            } else if (error.message === "Region not found") {
            }
          }
        }
      } else {
      }
    }
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
        setLongText(
          x.data[0]?.attributes?.custom_page_contents?.data?.[4].attributes
            .content_value
        );

        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });

    setTimeout(() => {
      // $('.carousel').carousel();
      $(".carousel").carousel({
        interval: 250 * 10,
      });
    }, 2000);
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
              {whyusDetails?.custom_page_images?.data ? (
                <div
                  id="carouselExampleInterval"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
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
                          <a
                            key={index}
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                            data-interval="5000"
                          >
                            <div
                              className="banner_commn_cls"
                              style={{
                                backgroundImage: `url(${element?.attributes?.image_path})`,
                              }}
                            ></div>
                          </a>
                        )
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </section>

            <section className="trvl_info_row">
              <div className="container">
                <div className="bookmark_row">
                  <FriendlyUrl
                    data={"home/" + whyusDetails?.page_friendly_url}
                  ></FriendlyUrl>
                </div>
                <div className="trvl_info_cntnt why_us_para_blk">
                  <h2 className="trvl_title">
                    {
                      customPageData?.data?.filter(
                        (res) => res.attributes?.content_name == "HeadingTag"
                      )[0]?.attributes?.content_value
                    }
                  </h2>
                  <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                      __html: dictioneryFunction(longText),
                    }}
                  ></p>
                </div>
              </div>
            </section>

            <section className="card_blk_row dark_grey py-5">
              <div className="container">
                <div className="book_wth_confdnce">
                  <div className="row">
                    <div className="col-12">
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: whyusDetails?.content_value,
                        }}
                      /> */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: dictioneryFunction(
                            customPageData?.data?.filter(
                              (res) =>
                                res.attributes?.content_name == "Short_Text"
                            )[0]?.attributes?.content_value
                          ),
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="card_blk_inr card_blk_overlay">
                      <NavLink href={`/destinations`}>
                        <img
                          src="/images/about_us_card01.jpg"
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
                          src="/images/about_us_card02.jpg"
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
