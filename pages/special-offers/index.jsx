import { useState, useEffect } from "react";
import { useRef } from "react";
import { Link, Spinner, Signup, FriendlyUrl } from "components";
import Iframe from "react-iframe";
import { Layout } from "components/users";
import {
  userService,
  specialoffersService,
  destinationService,
  homeService,
} from "services";
import { NavLink } from "components";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { useRouter } from "next/router";
import { ImageSlider } from "../../components/ImageSlider";

var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const router = useRouter();
  const [allOffers, setAllOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [subTitle, setSubTitle] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [activeItem, setActiveItem] = useState("recommended");
  let dictionaryPage = 1;
  const [isMinimized, setMinimized] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const handleExpandButtonClick = () => {
    setMinimized((prev) => !prev);
  };

  const handleNextButtonClick = () => {
    if (textareaValue.trim() !== "") {
      setShowThankYou(true);
    }
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

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

  const handleRedirect = (res) => {
    res;
    // return regionWiseUrl + `/hotel-detail`;
    let hotelName = res?.attributes?.hotel?.data?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    router.push(
      regionWiseUrl +
        `/destinations/${res?.attributes?.hotel?.data?.attributes?.destination?.data?.attributes?.destination_name
          ?.replace(/ /g, "-")
          .toLowerCase()
          .replace(
            /&/g,
            "and"
          )}/${res?.attributes?.hotel?.data?.attributes?.country?.data?.attributes?.country_name
          ?.replace(/ /g, "-")
          .replace(
            /&/g,
            "and"
          )}/${res?.attributes?.hotel?.data?.attributes?.region?.data?.attributes?.region_name
          ?.replace(/ /g, "-")
          .replace(/&/g, "and")
          .toLowerCase()}/${hotelName}`
    );
  };

  const generateDynamicLink = (res) => {
    res;
    // return regionWiseUrl + `/hotel-detail`;
    let hotelName = res?.attributes?.hotel?.data?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    return (
      regionWiseUrl +
      `/destinations/${res?.attributes?.hotel?.data?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, "and")
        .replace(/ /g, "-")
        .toLowerCase()}/${res?.attributes?.hotel?.data?.attributes?.country?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(
          /&/g,
          "and"
        )}/${res?.attributes?.hotel?.data?.attributes?.region?.data?.attributes?.region_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}/${hotelName}`
    );
  };

  const getDynamicPage = (item) => {
    return `${regionWiseUrl}/${item}`;
  };

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  const equalHeight = (resize) => {
    var elements = document.getElementsByClassName(
        "card_slider_cnt places_to_stay_cnt"
      ),
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

  equalHeight(true);

  const handleFilterClick = (item) => {
    setActiveItem(item);
    if (item == "alphabetical") {
      setAllOffers(
        allOffers.sort((a, b) =>
          a.attributes.offer_text.localeCompare(b.attributes.offer_text)
        )
      );
      //  (allCountries);
    } else if (item == "recommended") {
      setAllOffers(allOffers.sort((a, b) => a.id - b.id));
      //  (allCountries);
    }
  };

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

  useEffect(() => {
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    specialoffersService
      .getAllOffers(region)
      .then((x) => {
        setAllOffers(x.data);
        // setAllOffers([]);

        setFriendlyUrl(`home/special offers`);
      })
      .catch((error) => {});

    specialoffersService
      .getOffersCustomePage()
      .then((x) => {
        setCareerData(x.data[0]);
        localStorage.setItem(
          "PageInfo",
          JSON.stringify({
            pType: "CUST",
            pCode: x?.data[0]?.attributes?.page_code,
          })
        );
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        const imageCheck = x.data[0].attributes?.custom_page_images?.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element?.attributes?.image_type == "banner") {
            newBackgroundImages.push(element?.attributes?.image_path);
          }
        });
        setBackgroundImage(newBackgroundImages);

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
      })
      .catch((error) => {
        setIsLoading(false);
      });

    window.addEventListener("resize", equalHeight(true));
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={metaDescription}></meta>
        {/* <script
          type="text/javascript"
          src="/assets/javascripts/bootstrap.min.js"
        ></script> */}
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
            <ImageSlider data={backgroundImage}></ImageSlider>
          </section>

          <section className="card_blk_row destinations_blk_row light_grey">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
              </div>
              <div className="row">
                <div className="destinations_cntnt_blk">
                  <h2>{headingTag}</h2>
                  <p
                    // className="mb-4"
                    dangerouslySetInnerHTML={{ __html: longText }}
                  ></p>
                </div>
              </div>
            </div>
          </section>
          {allOffers.length > 0 ? (
            <>
              <section className="card_blk_row destinations_blk_row pb-0">
                <div className="container">
                  <div className="row">
                    <div className="col-12 favrites_blk_row pb-0">
                      <h3 className="title_cls pb-0">{subTitle}</h3>
                      <div className="destination_contries_filter d-flex justify-content-around">
                        <ul>
                          <li>
                            <a
                              className={
                                activeItem === "recommended" ? "active" : ""
                              }
                              onClick={() => handleFilterClick("recommended")}
                            >
                              Exsus Recommends
                            </a>
                          </li>
                          <li>
                            <a
                              className={
                                activeItem === "alphabetical" ? "active" : ""
                              }
                              onClick={() => handleFilterClick("alphabetical")}
                            >
                              Alphabetical
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                <div className="container">
                  <div className="card_slider_row">
                    <div className="carousel00 width_100">
                      <div className="row">
                        {allOffers?.map((res) => (
                          <div className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="card_slider_inr">
                              <div className="card_slider">
                                <NavLink
                                  key={"spcOffer" + res?.id}
                                  href={generateDynamicLink(res)}
                                >
                                  {/*   error => Dont add anchor tag for the below element. you can use onclick fun. */}
                                  <span href="#" className="card_slider_img">
                                    <img
                                      src={res.attributes.thumbnail_image_path}
                                      alt="offer_card01"
                                      className="img-fluid"
                                    />
                                    <span className="img_specl_offer">
                                      Special offer
                                    </span>
                                  </span>
                                </NavLink>
                                <div className="card_slider_cnt places_to_stay_cnt">
                                  <h4>
                                    {/*   error => Dont add anchor tag for the below element. you can use onclick fun. */}
                                    <a href={generateDynamicLink(res)}>
                                      {res?.attributes?.offer_text}
                                    </a>
                                  </h4>
                                  <ul>
                                    <li>
                                      Location:{" "}
                                      {
                                        res?.attributes?.hotel?.data?.attributes
                                          ?.location
                                      }
                                    </li>
                                    {res?.attributes?.hotel?.data?.attributes?.hotel_country_contents?.data?.map(
                                      (res) => {
                                        return (
                                          <li
                                            className="price_guide_tooltip"
                                            key={"spcPrice" + res?.id}
                                          >
                                            Price guide:
                                            <span
                                              tabIndex="0"
                                              data-title={
                                                res?.attributes
                                                  ?.price_guide_text
                                              }
                                            >
                                              {res?.attributes?.currency_symbol.repeat(
                                                Math.abs(
                                                  res?.attributes
                                                    ?.price_guide_value
                                                )
                                              )}
                                              <label>
                                                {res?.attributes?.currency_symbol.repeat(
                                                  Math.abs(
                                                    5 -
                                                      res?.attributes
                                                        ?.price_guide_value
                                                  )
                                                )}
                                              </label>
                                            </span>
                                          </li>
                                        );
                                      }
                                    )}
                                    <li className="pink_text">
                                      Special offer:{" "}
                                      {res?.attributes?.title_text}
                                    </li>
                                    <li>
                                      Best for:
                                      <span>
                                        Luxury Hotel, Setting & Views, Beach,
                                        Family-friendly
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <button
                                  className="btn card_slider_btn justify-content-end"
                                  onClick={() => handleRedirect(res)}
                                >
                                  <span className="view_itnry_link">
                                    View this hotel
                                    <em className="fa-solid fa-chevron-right"></em>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section className="card_blk_row destinations_blk_row pb-0">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="no_offer_found_blk">
                      <p>
                        We've found 0 holiday ideas that match your search
                        criteria.
                      </p>
                      <p>
                        Please try changing one of the elements of your query
                        and search again.
                      </p>
                      <p>
                        Alternatively, explore our{" "}
                        <a href={getDynamicPage("destinations")}>
                          destinations
                        </a>{" "}
                        or{" "}
                        <a href={getDynamicPage("holiday-types")}>
                          holiday collections
                        </a>{" "}
                        to start planning your next escape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section
            className={`chat_window_parnt_blk ${
              isMinimized ? "chat_window_minised" : ""
            }`}
          >
            <div
              className="chat_window_inr_blk"
              style={{ display: showThankYou ? "none" : "block" }}
            >
              <p>
                Is there anything we should improve on this special offer page?
                <button
                  className="btn chat_window_expnd_btn"
                  onClick={handleExpandButtonClick}
                >
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
              </p>
              <textarea
                value={textareaValue}
                onChange={handleTextareaChange}
              ></textarea>
              <p className="chat_window_footer_blk">
                <a href="https://www.hotjar.com/try/surveys/?utm_source=client&utm_medium=poll&utm_campaign=insights">
                  <img src="images/hotjar-logo-small.svg" alt="hotjar" /> Made
                  with Hotjar
                </a>
                <button
                  className="btn prmry_btn chat_window_next_btn"
                  onClick={handleNextButtonClick}
                  disabled={!textareaValue.trim()}
                >
                  Next
                </button>
              </p>
            </div>

            <div
              className="chat_thank_you_blk"
              style={{ display: showThankYou ? "block" : "none" }}
            >
              <p className="chat_thank_you_title">
                Thank you for answering this survey. Your feedback is highly
                appreciated!
              </p>
              <p>
                Before you go, can we connect your response with data (device,
                usage, cookies, behavior, and interactions) related to your
                visits? This will help us give you a better experience.{" "}
                <a href="https://www.hotjarconsent.com/">More information</a>
              </p>
              <div className="chat_thank_you_btn">
                <button className="btn">No thanks</button>
                <button className="btn prmry_btn">Yes, Sure</button>
              </div>
              <div className="chat_thank_you_footer">
                Exsus Travel Limited
                <a href="privacy-policy">Privacy policy</a>
              </div>
            </div>
          </section>

          {/* Enquiry */}
          <section className="make_enqury_row">
            <div className="container">
              <EnquiryButton />
            </div>
          </section>

          {/* NewsLetter */}
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
