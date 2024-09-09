import { useState, useEffect } from "react";
import { Signup } from "components";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Inspireme } from "../components";
import Head from "next/head";
import {
  holidaytypesService,
  destinationService,
  blogsService,
  homeService,
} from "services";
import { NavLink } from "components";
import { formatPrice } from "../components/utils/priceFormater";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { whyusService } from "../services";

var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const [thumbnailImage, setThumbnailImageArr] = useState([]);
  const [itineraries, setItineraries] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [websiteContent, setWebsiteContent] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState([]);
  const router = useRouter();
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

  const generateDynamicLink = (item) => {
    const modifiedDestinationName = item.attributes?.destination_name
      ?.replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    const countryName =
      item.attributes?.countries?.data[0]?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();

    return (
      regionWiseUrl +
      `/destinations/${modifiedDestinationName}/${countryName}/${countryName}-itineraries/${item.attributes?.friendly_url}`
    );
  };

  const generateDynamicLinkBlog = (item) => {
    const modifiedGrpName = item
      .replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    return regionWiseUrl + `/blog/${modifiedGrpName}`;
  };

  const handleRedirect = (item) => {
    const modifiedDestinationName = item.attributes?.destination_name
      ?.replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();

    router.push(
      regionWiseUrl +
      `/destinations/${modifiedDestinationName}/${modifiedDestinationName}-itineraries/${item.attributes?.friendly_url}`
    );
  };

  const dynamicThumbnailImage = (itemId) => {
    return itemId;
  };

  const [destinationLandingList, setDestinationLandingList] = useState();
  const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();

  // form validation rules
  const validationSchema = Yup.object().shape({
    destination: Yup.string(),
    reason: Yup.string(),
    month: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

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

  const dynamicLink = (itemName, id) => {
    const modifieditem = itemName
      .replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    if (itemName) {
      return (
        regionWiseUrl +
        `/holiday-types/${modifieditem}/${modifieditem}-itineraries`
      );
    }
  };

  // const handleHrefClick = (event) => {
  //   event.preventDefault();
  // };

  const dynamicLinkHolidayas = (itemId, id) => {
    return regionWiseUrl + `/holidaytypeitineraries/incredible-journeys/id`;
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
      }
    } else {
    }
  };

  // const handleHrefClick = (event) => {
  //   event.preventDefault();
  // };

  useEffect(() => {
    $(".succss_msg_parnt").hide();
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    destinationService
      .getCustomPagesData("home")
      .then((x) => {
        localStorage.setItem(
          "PageInfo",
          JSON.stringify({
            pType: "CUST",
            pCode: x?.data[0]?.attributes?.page_code,
          })
        );
        const imageCheck = x.data[0]?.attributes?.custom_page_images.data;
        imageCheck;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element?.attributes);
          }
        });
        setBackgroundImage(newBackgroundImages);
        setHomePageData(x.data[0].attributes?.custom_page_contents);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    const thumbnailImageArr = [];
    holidaytypesService
      .getHolidaytypesLandingListHomePage()
      .then((x) => {

        const imageCheckType = x.data.sort(
          (a, b) =>
            a.attributes.home_page_serial_number -
            b.attributes.home_page_serial_number
        );
        imageCheckType.forEach((elementMain) => {
          if (elementMain.attributes.holiday_type_group_images.data) {
            const dataInner =
              elementMain.attributes.holiday_type_group_images.data;
            dataInner.forEach((element) => {
              if (element.attributes.image_type == "thumbnail") {
                const objThumbnail = {
                  id: elementMain?.id,
                  holiday_type_code:
                    elementMain?.attributes?.holiday_type_group_code,
                  holiday_type_name:
                    elementMain?.attributes?.holiday_type_group_name,
                  image_path: element.attributes.image_path,
                  home_page_short_text:
                    elementMain?.attributes?.home_page_short_text,
                  home_page_title: elementMain?.attributes?.home_page_title,
                  friendly_url: elementMain?.attributes?.friendly_url
                };
                thumbnailImageArr.push(objThumbnail);
              }
            });
          }
        });

        setThumbnailImageArr(thumbnailImageArr);
        thumbnailImageArr;
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    blogsService
      .getAllBlogsHomePage()
      .then((x) => {
        const blogdata = x.data;
        const filteredData = blogdata.filter(
          (entry) => entry.attributes.home_page_ind
        );
        if (filteredData) {
          const sortedData = filteredData.sort(
            (a, b) =>
              a.attributes.home_page_serial_number -
              b.attributes.home_page_serial_number
          );
          sortedData.forEach((element, index) => {
            const str = element?.attributes?.blog_image_path;
            const substringToCheck = "https://www.exsus.com/";
            const containsSubstring = str.includes(substringToCheck);
            if (!containsSubstring) {
              const newStr =
                substringToCheck + "" + element?.attributes?.blog_image_path;
              sortedData[index].attributes.blog_image_path = newStr;
            }
          });
          setSortedData(sortedData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    destinationService
      .getDestinationLandingList()
      .then((x) => {
        setDestinationLandingList(x.data);
        // setDestinationLandingDetails(x)
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    holidaytypesService
      .getHolidaytypesLandingList()
      .then((x) => {
        setHolidaytypesLandingList(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    destinationService
      .getAllItinerariesHomePage(region)
      .then((x) => {
        const response = x.data.sort(
          (a, b) =>
            a.attributes.home_page_serial_number -
            b.attributes.home_page_serial_number
        );
        setItineraries(response);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    whyusService
      .getAllHomeTravelReviews()
      .then((x) => {
        setTestimonials(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    var site_region = localStorage.getItem("site_region");

    window.onload = () => {
      setTimeout(() => {
        const redirectUrl = regionWiseUrl;
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };

    window.addEventListener("resize", equalHeight(true));
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
        <title>Home</title>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
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
            {backgroundImage ? (
              <div
                id="carouselExampleInterval"
                className="carousel"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {backgroundImage.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {backgroundImage.map((imagePath, index) => (
                    <NavLink
                      key={index}
                      href={imagePath.banner_href_url ? imagePath.banner_href_url : "#"}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      data-bs-interval="5000"
                      target="_blank"
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        className="banner_commn_cls"
                        style={{
                          backgroundImage: `url(${imagePath.image_path})`,
                        }}
                      >
                        <div className="carousel-caption">
                          <img
                            src="/images/banner-logo.png"
                            alt="banner-logo"
                            className="img-fluid"
                          />
                          <h2>{imagePath.image_alt_text}</h2>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <Inspireme />
          </section>

          <section className="card_blk_row">
            <div className="container">
              <div className="row">
                {thumbnailImage?.slice(0, 6).map((holidaytypesItem, i) => (
                  <div className="col-sm-6 col-md-6 col-lg-4" key={i}>
                    <div className="card_blk_inr">
                      <NavLink
                        href={dynamicLink(
                          holidaytypesItem?.friendly_url,
                          holidaytypesItem?.id
                        )}
                        as={dynamicLinkHolidayas(
                          holidaytypesItem?.holiday_type_name,
                          holidaytypesItem?.id
                        )}
                      >
                        <img
                          src={dynamicThumbnailImage(
                            holidaytypesItem.image_path
                          )}
                          alt="Card image 01"
                          className="img-fluid"
                        />
                        <div className="card_blk_cntnt">
                          <div className="row align-items-center">
                            <div className="col-11">
                              <div className="card_blk_txt">
                                <h3>
                                  {dictioneryFunction(
                                    holidaytypesItem?.home_page_title
                                  )}
                                </h3>
                                <p>
                                  {dictioneryFunction(
                                    holidaytypesItem?.home_page_short_text
                                  )}
                                </p>
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
                ))}
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
                  {itineraries?.map((item) => (
                    <div className="card_slider_inr" key={item.id}>
                      <div className="card_slider">
                        <NavLink
                          href={generateDynamicLink(item)}
                          className="card_slider_img"
                        >
                          {item?.attributes?.itinerary_images?.data.map(
                            (element, index) =>
                              element.attributes.image_type == "thumbnail" ? (
                                <img
                                  key={index}
                                  src={element.attributes.image_path}
                                  alt="destination card01"
                                  className="img-fluid"
                                />
                              ) : (
                                ""
                              )
                          )}
                          {/* <img src={backgroundThumbnailImg(item?.attributes?.itinerary_images?.data)} alt="destination card01" className="img-fluid" /> */}
                        </NavLink>
                        <div className="card_slider_cnt places_to_stay_cnt">
                          <h4>
                            <a href={generateDynamicLink(item)}>
                              {dictioneryFunction(item?.attributes?.itin_name)}
                            </a>
                          </h4>

                          <ul>
                            <li>
                              {dictioneryFunction(
                                item?.attributes?.header_text
                              )}
                            </li>
                            <li>
                              {dictioneryFunction(
                                item?.attributes?.subheader_text
                              )}
                            </li>
                            {item?.attributes?.itinerary_country_contents?.data
                              .filter(
                                (res) =>
                                  res.attributes.website_country.toLowerCase() ===
                                  region.replace(/in/g, "india")
                              )
                              .map((res1) => (
                                <li key={res1.id}>
                                  {`From ${res1.attributes?.currency_symbol ?? ""
                                    }${formatPrice(res1.attributes?.price) ??
                                    " xxxx"
                                    } per person`}
                                </li>
                              ))}
                            <li>
                              Travel to:
                              <span>
                                {dictioneryFunction(
                                  item?.attributes?.travel_to_text
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="btn card_slider_btn"
                          onClick={() => handleRedirect(item)}
                        >
                          <span>{item?.attributes?.no_of_nites_notes}</span>
                          <span className="view_itnry_link">
                            View this itinerary
                            <em className="fa-solid fa-chevron-right"></em>
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
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
            {/* <div className="full_loader_parnt_blk loader_parnt_blk" style="display: block;"><div className="loader-circle-2"></div></div> */}
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
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#Testimonials"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {testimonials.map((text, index) => (
                    <div
                      key={index}
                      target="_blank"
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      data-bs-interval="5000"
                    >
                      <div className="carousel-caption">
                        <p>
                          {dictioneryFunction(text?.attributes.review_text.replace(/&nbsp;/g, ' '))
                            ?.replace(/&nbsp/g, "")
                            ?.replace(/&rsquo/g, "")
                            ?.replace(/:/g, "")
                            ?.replace(/;/g, "")}
                        </p>
                        <span>{text?.attributes.client_name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="card_blk_row">
            <div className="container">
              <div className="row">
                {sortedData?.map((res) => (
                  <div className="col-sm-6 col-md-6 col-lg-4" key={res.id}>
                    <div className="card_blk_inr">
                      <NavLink
                        href={generateDynamicLinkBlog(
                          res.attributes?.blog_header_text
                        )}
                      >
                        {res?.attributes?.blog_image_path && (
                          <img
                            src={res?.attributes?.blog_image_path}
                            alt="Card image 07"
                            className="img-fluid"
                          />
                        )}
                        <div className="card_blk_cntnt">
                          <div className="row align-items-center">
                            <div className="col-11">
                              <div className="card_blk_txt">
                                <h3>{res?.attributes?.blog_header_text}</h3>
                                <p>{res?.attributes?.blog_date}</p>
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
                ))}
              </div>
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
    </>
  );
}
