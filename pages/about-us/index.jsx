import { useState, useEffect } from "react";
import { Signup, FriendlyUrl } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService, destinationService, homeService } from "services";
import { NavLink } from "components";
import Head from "next/head";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from "next/router";

export default Index;

function Index() {
  const router = useRouter();
  const [whyusDetails, setWhyusDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [valueWithBr, setnewValueWithBr] = useState("");
  const [customPageContent, setCustomPage] = useState([]);
  const [friendlyUrl, setFriendlyUrl] = useState();
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

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleInterval");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }

    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    aboutusService
      .getAboutusPage()
      .then((x) => {
        setWhyusDetails(x.data[0].attributes);
        setCustomPage(x.data[0].attributes?.custom_page_contents);
        setFriendlyUrl(
          `make-an-enquiry/${x.data[0]?.attributes?.page_friendly_url}`
        );
        localStorage.setItem(
          "PageInfo",
          JSON.stringify({
            pType: "CUST",
            pCode: x?.data[0]?.attributes?.page_code,
          })
        );
        let modifiedString = x.data.attributes?.page_content_1;
        //  ("  ", modifiedString);

        // Find and store matches in an array
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
                  websiteContentCheck(matches, region, modifiedString);
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

              // Set the modified string in state
              setnewValueWithBr(modifiedString);
              //  (modifiedString);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
                //  ("Loop has been stopped.");
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                //  ("Loop has been stopped.");
                setnewValueWithBr(modifiedString);
              }
            }
          }
        } else {
          // The item with 'yourKey' does not exist in local storage
          // Display the matched words
          if (matches) {
            websiteContentCheck(matches, region, modifiedString);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [valueWithBr]);

  return (
    <>
      <Head>
        <title>
          {
            whyusDetails?.custom_page_contents.data?.filter(
              (res) => res?.attributes?.content_name == "Title"
            )[0]?.attributes?.content_value
          }
        </title>
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
                          onClick={handleHrefClick}
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
                </div>
              </div>
            </section>

            <section className="trvl_info_row">
              <div className="container">
                <div className="bookmark_row">
                  <FriendlyUrl
                    data={"home/" + whyusDetails?.page_friendly_url}
                  ></FriendlyUrl>
                </div>

                <div className="trvl_info_cntnt about_us_para_blk">
                  <h2 className="trvl_title">
                    {
                      customPageContent?.data?.filter(
                        (res) => res.attributes?.content_name == "HeadingTag"
                      )[0]?.attributes?.content_value
                    }
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: customPageContent?.data?.filter(
                        (res) => res.attributes?.content_name == "Long_Text"
                      )[0]?.attributes?.content_value,
                    }}
                  />
                </div>
              </div>
            </section>

            <section className="card_blk_row dark_grey py-5">
              <div className="container">
                <div className="book_wth_confdnce about_us_sectn">
                  <h2>{whyusDetails?.page_content_2}</h2>
                  <div className="row">
                    <div className="col-12">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: customPageContent?.data?.filter(
                            (res) =>
                              res.attributes?.content_name == "Short_Text"
                          )[0]?.attributes?.content_value,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="card_blk_inr card_blk_overlay">
                      <NavLink href={regionWiseUrl + `/destinations`}>
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
                      <NavLink href={regionWiseUrl + `/holiday-types`}>
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
                <h4>Sign up for our newsletter
                  <span>Receive our latest news and special offers</span></h4>
                <Signup />
              </div>
            </section>
          </div>
        )}
      </Layout>
    </>
  );
}
