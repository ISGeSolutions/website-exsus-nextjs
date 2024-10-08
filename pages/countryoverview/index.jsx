import { useState, useEffect } from "react";
import { destinationService, homeService, countriesService } from "services";
import { NavLink } from "components";
import { useRouter } from "next/router";
import { formatPrice } from "../../components/utils/priceFormater";
import Head from "next/head";

export default CountryOverview;

function CountryOverview({ sendDataToChild, onDataFromChild, dataToChild }) {
  const router = useRouter();
  const [itineraries, setItineraries] = useState(null);
  const [hotels, setHotels] = useState(null);
  const itemsPerPage = 9; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [countryData, setCountryData] = useState(dataToChild);
  const [countryHighlight, setCountryHighlight] = useState("");
  // const { overview_text } = props?.data || {};
  //  (props?.data);
  const [showAllParagraphs, setShowAllParagraphs] = useState(true);
  let dictionaryPage = 1;

  const toggleParagraphs = () => {
    setShowAllParagraphs((prev) => !prev);
  };

  const countrycode = router.query?.country
    ?.replace(/-/g, " ")
    .replace(/-and-/g, " & ")
    .toLowerCase();
  const [isLoading, setIsLoading] = useState(false);
  const destinationcode = router.query?.continent
    ?.replace(/-/g, " ")
    .replace(/-and-/g, " & ")
    .toLowerCase();
  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
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

  // Function to send data to the parent
  const sendDataToParentHandler = (data) => {
    // Send the data to the parent
    onDataFromChild(data);
    // You can perform other actions related to sending data to the parent
  };

  const equalHeight = (resize) => {
    var elements = document.getElementsByClassName("card_slider_cnt1"),
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

  const generateDynamicLink1 = (item) => {
    let hotelName = item?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    return (
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, "and")
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

  const handleRedirect1 = (item) => {
    let hotelName = item?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    router.push(
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, "and")
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

  const generateDynamicLink = (item) => {
    let countryName =
      item?.attributes?.countries?.data[0]?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
    return (
      regionWiseUrl +
      `/destinations/${item?.attributes?.destinations?.data[0]?.attributes?.destination_name
        ?.replace(/&/g, "and")
        .replace(/ /g, "-")
        .toLowerCase()}/${countryName}/${countryName}-itineraries/${item?.attributes?.friendly_url
      }`
    );
  };

  const handleRedirect = (item) => {
    let countryName =
      item?.attributes?.countries?.data[0]?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
    router.push(
      regionWiseUrl +
      `/destinations/${item?.attributes?.destinations?.data[0]?.attributes?.destination_name
        ?.replace(/&/g, "and")
        .replace(/ /g, "-")
        .toLowerCase()}/${countryName}/${countryName}-itineraries/${item?.attributes?.friendly_url
      }`
    );
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
                if (storedData[matchString.toLowerCase()]) {
                  replacement = storedData[matchString.toLowerCase()];
                }
              } else {
                replacement = storedData[matchString];
                if (!replacement) {
                  replacement = storedData[matchString.toLowerCase()];
                }
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
      } else {
      }
    }
  };

  const formattedHtml = (htmlData) => {
    const replacedHtml = htmlData?.replace(/\{more\}/g, '...');
    return replacedHtml?.replace(/<br \/>\s*<br \/>/g, "<br /><br /></p><p>")
      .replace(/\\n/g, "");
  };

  equalHeight(true);

  useEffect(() => {
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    // window.scrollTo(0, 0);
    if (countrycode) {
      countriesService.getCountryDetails(countrycode).then((x) => {
        setCountryData(x?.data[0]?.attributes);
      });
    }

    destinationService
      .getCountryFavItineraries(countryData?.country_name, region)
      .then((x) => {
        setItineraries(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    // setAllExecutives(x.data);
    destinationService
      .getCountryFavHotels(countryData?.country_name, region)
      .then((x) => {
        setHotels(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    window.addEventListener("resize", equalHeight(true));
  }, [countrycode, dataToChild, countryData]);

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider02.js"
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
          <div className="container">
            <section className="destination_para title_heading">
              <p
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(countryData?.overview_text?.replace(/\\&quot;/g, '"')?.replace(/\\n/g, ""))?.replace(/\\/g, ''),

                }}
              />
            </section>
            {countryData?.country_highlights?.length > 0 ? (
              <section className="country_highlight_row">
                <div className="country_highlight_inr country_highlight_para_blk">
                  {/* <p>{countryData?.country_highlights}</p> */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dictioneryFunction(
                        formattedHtml(
                          showAllParagraphs
                            ? countryData?.country_highlights
                            : countryData?.country_highlights?.split(
                              "<br />"
                            )[0]
                        )
                      ),
                    }}
                  ></p>
                  {countryData?.country_highlights && (
                    <button className="btn" onClick={toggleParagraphs}>
                      <span>
                        {showAllParagraphs ? "Read less" : "Read more"}
                      </span>
                    </button>
                  )}
                </div>
              </section>
            ) : (
              ""
            )}
          </div>

          {itineraries?.length > 0 ? (
            <section className="favrites_blk_row light_dark_grey">
              <div className="container">
                <h3 className="title_cls">
                  Holidays in {countryData?.country_name} Handpicked by Exsus
                </h3>
                <div className={itineraries?.length < 5 ? 'card_slider_row card_btn_hide' : 'card_slider_row'
                }>
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
                                    key={element.id}
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
                                {dictioneryFunction(
                                  item?.attributes?.itin_name
                                )}
                              </a>
                            </h4>
                            {/* <NavLink href={generateDynamicLink(item)}>
                          </NavLink> */}
                            <ul>
                              <li>
                                {dictioneryFunction(
                                  item?.attributes?.header_text
                                )}
                              </li>
                              <li>
                                {dictioneryFunction(
                                  item?.attributes?.sub_header_text
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
                            <span>
                              {dictioneryFunction(
                                item?.attributes?.no_of_nites_notes
                              )}
                            </span>
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
            </section>
          ) : (
            ""
          )}

          {hotels?.length > 0 && (
            <section className="favrites_blk_row light_grey">
              <div className="container">
                <h3 className="title_cls">
                  PLACES TO STAY IN {countryData?.country_name} HANDPICKED BY
                  EXSUS
                </h3>
                <div className={hotels?.length < 5 ? 'card_slider_row01 card_btn_hide' : 'card_slider_row01'
                }>
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
                    {hotels?.map((item) => (
                      <div className="card_slider_inr01" key={item.id}>
                        <div className="card_slider">
                          <NavLink
                            href={generateDynamicLink1(item)}
                            className="card_slider_img"
                          >
                            {item?.attributes?.hotel_images?.data.map(
                              (element, index) =>
                                element.attributes.image_type == "thumbnail" ? (
                                  <img
                                    key={element.id}
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
                              <a href={generateDynamicLink1(item)}>
                                {item?.attributes?.hotel_name}
                              </a>
                            </h4>
                            <ul>
                              <li>Location: {item?.attributes?.location}</li>
                              {item?.attributes?.hotel_country_contents?.data?.map(
                                (item) => {
                                  return (
                                    <li
                                      className="price_guide_tooltip"
                                      key={item?.id}
                                    >
                                      Price guide:
                                      <span
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
                                <span>{item?.attributes?.best_for_text}</span>
                              </li>
                            </ul>
                          </div>
                          <button
                            className="btn card_slider_btn justify-content-end light_grey_btn_bg"
                            onClick={() => handleRedirect1(item)}
                          >
                            <span className="view_itnry_link">
                              View hotel
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
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
            </section>
          )}
          <section className="card_blk_row dark_grey">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card_blk_inr card_blk_overlay">
                    <a
                      target="_blank"
                      onClick={() => sendDataToParentHandler("itineraries")}
                    >
                      <img
                        src={countryData?.see_all_itin_image_path}
                        alt="Card image 07"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                {dictioneryFunction(countryData?.see_all_itin_text)}
                              </h3>
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

                <div className="col-sm-6">
                  <div className="card_blk_inr card_blk_overlay">
                    <a
                      onClick={() => sendDataToParentHandler("places-to-stay")}
                    >
                      <img
                        src={countryData?.see_all_hotel_image_path}
                        alt="Card image 08"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                {dictioneryFunction(countryData?.see_all_hotel_text)}
                              </h3>
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
        </div>
      )}
    </>
  );
}
