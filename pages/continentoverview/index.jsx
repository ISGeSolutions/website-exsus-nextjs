import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import {
  destinationService,
  alertService,
  userService,
  homeService,
} from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../components/utils/priceFormater";

export default ContinentOverview;

function ContinentOverview({ sendDataToParent }) {
  const router = useRouter();
  const [itineraries, setItineraries] = useState(null);
  const [valueWithBr, setnewValueWithBr] = useState("");
  const destinationcode = router.query.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const itemsPerPage = 9; // Number of items to load per page
  const [allCountries, setAllCountries] = useState([]);
  const [destinationName, setdestinationName] = useState("");
  const { t } = useTranslation();
  const [holidayTitle, setHolidayTitle] = useState(t("holidayTitle"));
  const [isLoading, setIsLoading] = useState(true);
  let dictionaryPage = 1;

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  const handleClick = (e) => {
    // Call the callback function to send data to the parent
    sendDataToParent(e);
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

  const generateDynamicLinkCountries = (countryName) => {
    if (countryName != undefined && countryName) {
      const modifieditem = countryName
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
      if (countryName) {
        return (
          regionWiseUrl + `/destinations/${destinationcode}/${modifieditem}`
        );
      }
    }
  };

  const handleRedirect = (item) => {
    router.push(
      regionWiseUrl +
      `/destinations/${destinationcode}/${destinationcode}-itineraries/${item?.attributes?.friendly_url}`
    );
  };

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/destinations/${destinationcode}/${destinationcode}-itineraries/${item?.attributes?.friendly_url}`
    );
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

  useEffect(() => {
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    destinationService
      .getDestinationDetails(destinationcode)
      .then((x) => {
        // const lines = x.data.attributes?.overview_text.split('\n');
        setdestinationName(x.data[0].attributes.destination_name);
        setnewValueWithBr(x.data[0].attributes?.overview_text);
        setAllCountries(
          x.data[0]?.attributes?.countries?.data
            ?.filter((item) => item.attributes?.popular_ind)
            ?.sort(
              (a, b) =>
                a.attributes?.popular_serial_no -
                b.attributes?.popular_serial_no
            )
        );
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    destinationService
      .getDestinationFavItineraries(destinationcode, region)
      .then((x) => {
        setItineraries(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    // destinationService.getAllCountries().then(x => {
    //   setAllCountries(x.data);
    // })

    window.addEventListener("resize", equalHeight(true));

    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {
        const redirectUrl = `${regionWiseUrl}/destinations/${destinationcode
          ?.replace(/ /g, "-")
          .replace(/&/g, "and")}`;

        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [destinationcode, router, holidayTitle, valueWithBr]);

  return (
    <>
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
            <section className="destination_para destination_para_blk">
              <div
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(valueWithBr),
                }}
              />
            </section>

            <section className="favrites_blk_row favrites_blk_small_card_row">
              <div className="container">
                <h3 className="title_cls">
                  Popular countries in {destinationName}
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

                  {/* Continent Overview Countries */}
                  <div className="carousel00 region_carousel00">
                    {allCountries?.map(
                      (countries, i) =>
                        // Add a condition to check if country_name is not null
                        countries.attributes.country_name && (
                          <div
                            className="card_slider_inr card_slider_inr_sml"
                            key={countries?.id}
                          >
                            <NavLink
                              href={generateDynamicLinkCountries(
                                countries?.attributes.country_name
                              )}
                            >
                              <div className="card_slider_inr_sml_img">
                                <img
                                  src={
                                    countries?.attributes?.country_images?.data.filter(
                                      (res) =>
                                        res.attributes.image_type ===
                                        "thumbnail"
                                    )[0]?.attributes?.image_path
                                  }
                                  alt={
                                    countries?.attributes?.country_images?.data.filter(
                                      (res) =>
                                        res.attributes?.image_type ===
                                        "thumbnail"
                                    )[0]?.attributes?.image_alt_text
                                  }
                                  className="img-fluid"
                                />
                              </div>
                              <h4>
                                {countries.attributes.country_name}
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
                              </h4>
                            </NavLink>
                          </div>
                        )
                    )}
                  </div>
                  {allCountries?.length > 5 ? (
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
          </div>

          {/* Favourite trip ideas */}
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">Favourite trip ideas</h3>
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    {itineraries?.slice(0, 8).map((item) => (
                      <div
                        className="col-sm-6 col-lg-4 col-xxl-3"
                        key={item.id}
                      >
                        <div className="card_slider_inr">
                          <div className="card_slider">
                            <NavLink
                              href={generateDynamicLink(item)}
                              className="card_slider_img"
                            >
                              {item?.attributes?.itinerary_images?.data.map(
                                (element, index) =>
                                  element.attributes.image_type ==
                                    "thumbnail" ? (
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
                            </NavLink>
                            <div className="card_slider_cnt places_to_stay_cnt">
                              <h4>
                                <a href={generateDynamicLink(item)}>
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
                                    {item?.attributes?.travel_to_text}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <button className="btn card_slider_btn">
                              <span>
                                {dictioneryFunction(
                                  item?.attributes?.no_of_nites_notes
                                )}
                              </span>
                              <span
                                className="view_itnry_link"
                                onClick={() => handleRedirect(item)}
                              >
                                View this itinerary
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

          {/* Card */}
          <section className="card_blk_row dark_grey">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card_blk_inr card_blk_overlay">
                    <a
                      target="_blank"
                      onClick={() => handleClick("itineraries")}
                    >
                      <img
                        src="\images\destination_overview01.jpg"
                        alt="Card image 07"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                See all Itinerary Ideas in the {destinationName}
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
                    <a onClick={() => handleClick("places-to-stay")}>
                      <img
                        src="\images\destination_overview02.jpg"
                        alt="Card image 08"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                See all Places to Stay in the {destinationName}
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
