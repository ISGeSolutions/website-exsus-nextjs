import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService, homeService } from "services";
import { NavLink } from "components";
import { useRouter } from "next/router";
import { FriendlyUrl } from "../../components";
import Iframe from "react-iframe";
import Head from "next/head";
//import $ from "jquery";
import MarkerInfoWindowNext from "../../components/common/MarkerInfoWindowNext";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { destinationService } from "../../services";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { formatPrice } from "../../components/utils/priceFormater";

var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const [mapVariable, setMapVariable] = useState(null);
  let dictionaryPage = 1;
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const router = useRouter();
  const hotelName = router?.query?.hotelName;
  const countryName = router?.query?.country;
  const regionName = router?.query?.location
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const continentCode = router.query?.continent;
  const [hotelData, setHotelData] = useState([]);
  const [hotels, setAllHotels] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [travelTimes, setTraveltimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [moreItineraries, setMoreItineraries] = useState(null);
  const [itineraries, setItineraries] = useState(null);

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

  // const generateDynamicLink = (item) => {
  //   return (
  //     regionWiseUrl +
  //     `/destinations/${destinationcode}/itinerary/${destinationcode}-itineraries/${item?.attributes?.friendly_url}`
  //   );
  // };

  // const handleRedirect = (item) => {
  //   // const modifiedName = item.replace(/ /g, "-").toLowerCase();
  //   router.push(
  //     regionWiseUrl +
  //       `/destinations/${destinationcode}/itinerary/${destinationcode}-itineraries/${item?.attributes?.friendly_url}`
  //   );
  // };

  const generateDynamicLink = (item) => {
    let hotelName = item?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    return (
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, " and ")
        .replace(/ /g, "-")
        .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}/${hotelName}`
    );
  };

  const handleRedirect = (item) => {
    router.push(
      regionWiseUrl +
        `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
          ?.replace(/&/g, " and ")
          .replace(/ /g, "-")
          .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name
          ?.replace(/ /g, "-")
          .replace(/&/g, "and")
          .toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name
          ?.replace(/ /g, "-")
          .replace(/&/g, "and")
          .toLowerCase()}/${item?.attributes?.friendly_url}`
    );
  };

  const generateDynamicLinkForItinerary = (item) => {
    return (
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, " and ")
        .replace(/ /g, "-")
        .toLowerCase()}/itinerary/${item?.attributes?.country?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}/${item?.attributes?.country?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}-itineraries/${item?.attributes?.friendly_url}`
    );
  };

  const handleRedirectForItinerary = (item) => {
    return (
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, " and ")
        .replace(/ /g, "-")
        .toLowerCase()}/itinerary/${item?.attributes?.country?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}/${item?.attributes?.country?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}-itineraries/${item?.attributes?.friendly_url}`
    );
  };

  const websiteContentCheck = () => {
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
          } catch (error) {}
        }
      }
    }
  };

  const specl_offer_hghtltd_btn = () => {
    $(".specl_offer_hghtltd_expnded").slideDown();
  };

  const specl_offer_hghtltd_expnded = () => {
    $(".specl_offer_hghtltd_expnded").slideUp();
  };

  useEffect(() => {
    if (hotelName || regionName || continentCode || countryName) {
      if (
        !localStorage.getItem(
          `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
        )
      ) {
        websiteContentCheck(dictionaryPage);
      }

      destinationService
        .getHotelById(hotelName, region)
        .then((x) => {
          setFriendlyUrl(
            `home/destinations/${continentCode}/${countryName}/${regionName}/${hotelName}`
          );
          // const map_latitude = x.data[0]?.attributes?.map_latitude;
          // const map_longitude = x.data[0]?.attributes?.map_longitude;
          // const map_zoom = x.data[0].attributes.map_zoom_level;
          // const mapTemp =
          //   `https://www.google.com/maps/embed/v1/place?q=` +
          //   map_latitude +
          //   `,` +
          //   map_longitude +
          //   `&key=AIzaSyDIZK8Xr6agksui1bV6WjpyRtgtxK-YQzE`;
          // setMapVariable(mapTemp);
          setHotelData(x.data[0].attributes);
          let bestTimeTravelData = [];
          x.data[0].attributes?.hotel_travel_times?.data.forEach((res) => {
            if (res?.attributes?.travel_time_value == "TT2") {
              res.attributes.class_name = "shade03";
            } else if (res?.attributes?.travel_time_value == "TT3") {
              res.attributes.class_name = "shade02";
            } else if (res?.attributes?.travel_time_value == "TT4") {
              res.attributes.class_name = "shade01";
            } else if (res?.attributes?.travel_time_value == "TT1") {
              res.attributes.class_name = "shade04";
            }
            bestTimeTravelData.push(res);
          });
          setTraveltimes(bestTimeTravelData);
          const imageCheck = x.data[0].attributes.hotel_images.data;
          const newBackgroundImages = [];
          imageCheck.forEach((element) => {
            if (element.attributes.image_type == "banner") {
              newBackgroundImages.push(element.attributes.image_path);
            } else if (element.attributes.image_type == "thumbnail") {
            }
          });

          setBackgroundImage(newBackgroundImages);

          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });

      destinationService
        .getRegionWiseHotelsInHotelDetail(regionName, region)
        .then((response) => {
          setAllHotels(
            response?.data?.filter(
              (res) => res.attributes?.friendly_url != hotelName
            )
          );
          const filteredData = response?.data?.filter((item) => {
            const { map_latitude, map_longitude } = item.attributes;
            return (
              map_latitude !== null &&
              map_latitude !== "" &&
              map_longitude !== null &&
              map_longitude !== ""
            );
          });
          const newCoordinates = filteredData.map((item) => ({
            lat: parseFloat(item.attributes.map_latitude),
            lng: parseFloat(item.attributes.map_longitude),
            name: item.attributes?.hotel_name,
            image: item.attributes?.hotel_images?.data?.filter(
              (res) => res?.attributes?.image_type == "thumbnail"
            )[0]?.attributes?.image_path,
            url:
              regionWiseUrl +
              `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
                ?.replace(/&/g, " and ")
                .replace(/ /g, "-")
                .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name
                ?.replace(/ /g, "-")
                .replace(/&/g, "and")
                .toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name
                ?.replace(/ /g, "-")
                .replace(/&/g, "and")
                .toLowerCase()}/${item?.attributes?.friendly_url
                ?.replace(/&/g, " and ")
                .replace(/ /g, "-")
                .toLowerCase()}`,
          }));
          setCoordinatesArray((prevCoordinates) => [
            ...prevCoordinates,
            ...newCoordinates,
          ]);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });

      destinationService
        .getRegionWiseItinerariesInHotelDetail(region, regionName)
        .then((response) => {
          setMoreItineraries(response?.data);

          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });

      setTimeout(() => {
        // $('.carousel').carousel();
        $(".carousel").carousel({
          interval: 250 * 10,
        });
      }, 2000);
    }
  }, [hotelName, regionName, continentCode, countryName]);

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <title>{dictioneryFunction(hotelData?.meta_title)}</title>
        <meta content={dictioneryFunction(hotelData?.meta_description)}></meta>
        {/* <script
          type="text/javascript"
          src="/assets/javascripts/card-slider-equal-height.js"
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
            {backgroundImage ? (
              <div
                id="carouselExampleInterval"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
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
                      // target="_blank"
                      href="javascript:void(0)"
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      data-interval="5000"
                    >
                      <div
                        className="banner_commn_cls"
                        style={{ backgroundImage: `url(${imagePath})` }}
                      ></div>
                    </NavLink>
                  ))}
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
                  data={dictioneryFunction(friendlyUrl)}
                ></FriendlyUrl>
              </div>

              <div className="trvl_info_cntnt specl_offr_para_blk">
                <h2 className="trvl_title mb-3">
                  {dictioneryFunction(hotelData.hotel_name)}
                </h2>
                <h3 className="trvl_title_sub_white mb-3">
                  Location: {hotelData.location}
                </h3>
                <p className="price_guide_hotel_tooltip">
                  Price guide:{" "}
                  <span
                    tabIndex="0"
                    data-title={
                      hotelData?.hotel_country_contents?.data[0]?.attributes
                        ?.price_guide_text
                    }
                  >
                    {hotelData?.hotel_country_contents?.data[0]?.attributes?.currency_symbol.repeat(
                      Math.abs(
                        hotelData?.hotel_country_contents?.data[0]?.attributes
                          ?.price_guide_value
                      )
                    )}
                    <label>
                      {hotelData?.hotel_country_contents?.data[0]?.attributes?.currency_symbol.repeat(
                        Math.abs(
                          5 -
                            hotelData?.hotel_country_contents?.data[0]
                              ?.attributes?.price_guide_value
                        )
                      )}
                    </label>
                  </span>
                </p>
                <br />
                <p
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: hotelData?.video_url }}
                />
              </div>

              {hotelData?.special_offers?.data?.length > 0 ? (
                <div className="specl_offer_hghtltd_blk specl_offer_accordn_blk">
                  <button
                    className="btn specl_offer_hghtltd_btn"
                    onClick={specl_offer_hghtltd_btn}
                  >
                    {/* Special offer: save upto 20% off plus complimentary
                    transfers and high tea */}
                    Special offer:{" "}
                    {dictioneryFunction(
                      hotelData?.special_offers?.data[0]?.attributes?.title_text
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                      image-rendering="optimizeQuality"
                      className="up_arrow"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      viewBox="0 0 512 266.77"
                    >
                      <path
                        fill-rule="nonzero"
                        d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"
                      />
                    </svg>
                  </button>
                  <div
                    className="specl_offer_hghtltd_expnded"
                    onClick={specl_offer_hghtltd_expnded}
                  >
                    <p
                      className="mb-4"
                      dangerouslySetInnerHTML={{
                        __html: dictioneryFunction(
                          hotelData?.special_offers?.data[0]?.attributes
                            ?.overview_text
                        ),
                      }}
                    ></p>
                    {/* <p>
                      Includes return road transfers to and from Harry Mwanga
                      Nkumbula International Airport and complimentary high tea.
                    </p>
                    <p>Valid for stays until 15 December 2023.</p>
                    <p>
                      All offers are subject to availability at the time of
                      booking, blackout dates, minimum stays may apply and room
                      exclusions may apply. Terms and conditions apply.
                    </p> */}
                    <button
                      className="btn itinery_btn read_more"
                      fdprocessedid="wch0hj"
                      title="Slide up"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        className=""
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        viewBox="0 0 512 266.77"
                      >
                        <path
                          fill-rule="nonzero"
                          d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              <section className="country_highlight_row itinery_hightlight_row mb-0">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="country_highlight_inr">
                      <p>
                        <span>Perfect for</span>
                        {hotelData?.perfect_for_text
                          ?.replace(/&nbsp/g, "")
                          ?.replace(/&rsquo/g, "")
                          ?.replace(/:/g, "")
                          ?.replace(/;/g, "")
                          ?.replace(/<\/?em>/g, "")}
                      </p>
                      <p>
                        <span>In the know</span>
                        {hotelData?.in_the_know_text
                          ?.replace(/&nbsp/g, "")
                          ?.replace(/&rsquo/g, "")
                          ?.replace(/:/g, "")
                          ?.replace(/;/g, "")
                          ?.replace(/<\/?em>/g, "")}
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="itinery_highlight_inr">
                      <ul>
                        <li>RECOMMENDED FOR...</li>
                        {hotelData?.best_for_text
                          ?.replace(/{|'}|(\s*)/g, "")
                          ?.split(",")
                          ?.map((value, index) => (
                            <li key={index}>{value}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section className="itinery_detls_row">
            <div className="container">
              <div
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(hotelData?.overview_text),
                }}
              />
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
                      <li className="mt-3 mt-lg-0" value="1">
                        Jan
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "1"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="2">
                        Feb
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "2"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="3">
                        Mar
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "3"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="4">
                        Apr
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "4"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="5">
                        May
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "5"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="6">
                        June
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "6"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="7">
                        July
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "7"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="8">
                        Aug
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "8"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="9">
                        Sep
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "9"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="10">
                        Oct
                        <span
                          className={
                            travelTimes?.filter(
                              (res) =>
                                res?.attributes?.travel_time_month == "10"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="11">
                        Nov
                        <span
                          className={
                            travelTimes?.filter(
                              (res) =>
                                res?.attributes?.travel_time_month == "11"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="12">
                        Dec
                        <span
                          className={
                            travelTimes?.filter(
                              (res) =>
                                res?.attributes?.travel_time_month == "12"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              {coordinatesArray && (
                <section className="map_blk_row">
                  <h3 className="pb-2">Hotel location</h3>
                  <p>
                    The Rosewood is just half an hour’s drive from Beijing
                    Capital International Airport.
                  </p>
                  <div className="map_blk_inr">
                    <div className="map_blk_inr">
                      {/* <Iframe
                      width="640px"
                      src={mapVariable}
                      style="border:0;"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    /> */}
                      <MarkerInfoWindowNext data={coordinatesArray} />
                      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </section>

          {hotels?.length > 0 ? (
            <section className="favrites_blk_row">
              <div className="container">
                <h3 className="title_cls">
                  MORE PLACE TO STAY IN {hotelData.location}
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
                  <div className="carousel00">
                    {hotels?.map((item) => (
                      <div className="card_slider_inr" key={item.id}>
                        <div className="card_slider">
                          <NavLink
                            href={generateDynamicLink(item)}
                            className="card_slider_img"
                          >
                            {item?.attributes?.hotel_images?.data.map(
                              (element, index) =>
                                element.attributes.image_type == "thumbnail" ? (
                                  <img
                                    key={index}
                                    src={element.attributes.image_path}
                                    alt={element.attributes.image_alt_text}
                                    className="img-fluid"
                                  />
                                ) : (
                                  ""
                                )
                            )}
                          </NavLink>
                          <div className="card_slider_cnt places_to_stay_cnt">
                            <h4>
                              <a href={generateDynamicLink(item)}>
                                {dictioneryFunction(
                                  item?.attributes?.hotel_name
                                )}
                              </a>
                            </h4>
                            <ul>
                              <li>
                                Location:{" "}
                                {dictioneryFunction(item?.attributes?.location)}
                              </li>
                              {item?.attributes?.hotel_country_contents?.data?.map(
                                (item) => {
                                  return (
                                    <li className="price_guide_tooltip">
                                      Price guide:
                                      <span
                                        key={item?.id}
                                        tabIndex="0"
                                        data-title={
                                          item?.attributes?.price_guide_text
                                        }
                                      >
                                        {item?.attributes?.currency_symbol.repeat(
                                          Math.abs(
                                            item?.attributes?.price_guide_value
                                          )
                                        )}
                                        <label>
                                          {item?.attributes?.currency_symbol.repeat(
                                            Math.abs(
                                              5 -
                                                item?.attributes
                                                  ?.price_guide_value
                                            )
                                          )}
                                        </label>
                                      </span>
                                    </li>
                                  );
                                }
                              )}
                              <li>
                                Best for:
                                <span>
                                  {dictioneryFunction(
                                    item?.attributes?.best_for_text
                                  )}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button
                            className="btn card_slider_btn justify-content-end"
                            onClick={() => handleRedirect(item)}
                          >
                            <span className="view_itnry_link">
                              View this hotel
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hotels?.length > 4 ? (
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
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
          ) : (
            " "
          )}

          {moreItineraries?.length > 0 ? (
            <section className="favrites_blk_row light_grey">
              <div className="container">
                <h3 className="title_cls">
                  STAY AT {dictioneryFunction(hotelData.hotel_name)} ON THESE
                  TRIPS
                </h3>
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
                    {moreItineraries?.map((item) => (
                      <div className="card_slider_inr01" key={item.id}>
                        <div className="card_slider">
                          <NavLink
                            href={generateDynamicLinkForItinerary(item)}
                            className="card_slider_img"
                          >
                            {item?.attributes?.itinerary_images?.data.map(
                              (element, index) =>
                                element.attributes.image_type == "thumbnail" ? (
                                  <img
                                    key={element.id}
                                    src={element.attributes.image_path}
                                    alt="destination card01"
                                    className="img-fluid"
                                  />
                                ) : (
                                  ""
                                )
                            )}
                          </NavLink>
                          <div className="card_slider_cnt places_to_stay_cnt">
                            <h4>
                              <a href={generateDynamicLinkForItinerary(item)}>
                                {dictioneryFunction(
                                  item?.attributes?.itin_name
                                )}
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
                              <li>
                                {dictioneryFunction(
                                  item?.attributes?.country?.data?.attributes
                                    ?.country_name
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
                                    {`From ${
                                      res1.attributes?.currency_symbol ?? ""
                                    }${
                                      formatPrice(res1.attributes?.price) ??
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
                            className="btn card_slider_btn light_grey_btn_bg"
                            onClick={() => handleRedirectForItinerary(item)}
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
                  {moreItineraries?.length > 4 ? (
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
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
          ) : (
            ""
          )}

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
