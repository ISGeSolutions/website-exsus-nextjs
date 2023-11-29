import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import { destinationService, alertService, userService } from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default ContinentOverview;

function ContinentOverview({ sendDataToParent }) {
  const router = useRouter();
  const [itineraries, setItineraries] = useState(null);
  const [valueWithBr, setnewValueWithBr] = useState("");
  const destinationcode = router.query.continent
    .replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const itemsPerPage = 9; // Number of items to load per page
  const [allCountries, setAllCountries] = useState([]);
  const [destinationName, setdestinationName] = useState("");
  const { t } = useTranslation();
  const [holidayTitle, setHolidayTitle] = useState(t("holidayTitle"));
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  const handleClick = (e) => {
    // Call the callback function to send data to the parent
    sendDataToParent(e);
  };

  // let region = "uk";
  // let regionWiseUrl = "/uk";
  // if (typeof window !== "undefined") {
  //   if (window && window.site_region) {
  //     regionWiseUrl = "/" + window.site_region;
  //     region = window.site_region;
  //     // setMyVariable(window.site_region);
  //   }
  // }

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") regionWiseUrl = "/" + window.site_region;
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

  const handleRedirect = () => {
    const modifiedName = item.replace(/ /g, "-").toLowerCase();
    router.push(
      regionWiseUrl +
        `/destinations/${destinationcode}/itinerary/${destinationcode}-iteneraries/${modifiedName}`
    );
  };

  const generateDynamicLink = (item) => {
    const modifiedName = item.replace(/ /g, "-").toLowerCase();
    return (
      regionWiseUrl +
      `/destinations/${destinationcode}/itinerary/${destinationcode}-iteneraries/${modifiedName}`
    );
  };

  // const generateDynamicLink = (item) => {
  //   return (
  //     regionWiseUrl +
  //     `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`
  //   );
  // };

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

  equalHeight(true);

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
          setnewValueWithBr(modifiedString);
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
      // debugger;
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
                modifiedString = websiteContentCheck(
                  matches,
                  region,
                  modifiedString
                );
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
    destinationService
      .getDestinationDetails(destinationcode)
      .then((x) => {
        // const lines = x.data.attributes?.overview_text.split('\n');
        setdestinationName(x.data[0].attributes.destination_name);
        setnewValueWithBr(x.data[0].attributes?.overview_text);
        // // Find and store matches in an array
        // const regex = /{[a-zA-Z0-9-]+}/g;
        // const matches = [...new Set(modifiedString.match(regex))];
        // let storedDataString = "";
        // let storedData = "";
        // if (region == "uk") {
        //   storedDataString = localStorage.getItem("websitecontent_uk");
        //   storedData = JSON.parse(storedDataString);
        // } else if (region == "us") {
        //   storedDataString = localStorage.getItem("websitecontent_us");
        //   storedData = JSON.parse(storedDataString);
        // } else if (region == "asia") {
        //   storedDataString = localStorage.getItem("websitecontent_asia");
        //   storedData = JSON.parse(storedDataString);
        // } else if (region == "in") {
        //   storedDataString = localStorage.getItem("websitecontent_india");
        //   storedData = JSON.parse(storedDataString);
        // }
        // if (storedData !== null) {
        //   // You can access it using localStorage.getItem('yourKey')
        //   if (matches) {
        //     let replacement = "";
        //     try {
        //       matches.forEach((match, index, matches) => {
        //         const matchString = match.replace(/{|}/g, "");
        //         if (!storedData[matchString]) {
        //           websiteContentCheck(matches, region, modifiedString);
        //           throw new Error("Loop break");
        //         } else {
        //           replacement = storedData[matchString];
        //         }
        //         const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
        //         if (checkStr && replacement) {
        //           modifiedString = modifiedString.replace(
        //             checkStr,
        //             replacement
        //           );
        //         }
        //       });
        //       // Set the modified string in state
        //       setnewValueWithBr(modifiedString);
        //     } catch (error) {
        //       if (error.message === "Loop break") {
        //         // Handle the loop break here
        //         // console.log("Loop has been stopped.");
        //       } else if (error.message === "Region not found") {
        //         // Handle the loop break here
        //         // console.log("Loop has been stopped.");
        //         setnewValueWithBr(modifiedString);
        //       }
        //     }
        //   }
        // } else {
        //   // The item with 'yourKey' does not exist in local storage
        //   // Display the matched words
        //   if (matches) {
        //     websiteContentCheck(matches, region, modifiedString);
        //   }
        // }

        // setnewValueWithBr(valueWithBr);
        // setAllCountries(x.data[0]?.attributes?.countries?.data);
        // setnewValueWithBr(valueWithBr);
        // setAllCountries(x.data?.attributes?.countries?.data);
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
        const redirectUrl = regionWiseUrl + "/destinations/" + destinationcode;

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
            <section className="destination_para">
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
          </div>

          {/* Favourite trip ideas */}
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">Favourite trip ideas</h3>
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    {itineraries?.map((item) => (
                      <div
                        className="col-sm-6 col-lg-4 col-xxl-3"
                        key={item.id}
                      >
                        <div className="card_slider_inr">
                          <div className="card_slider">
                            <NavLink
                              href={generateDynamicLink(
                                item?.attributes?.itin_name
                              )}
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
                            <div className="card_slider_cnt">
                              <NavLink
                                href={generateDynamicLink(
                                  item?.attributes?.itin_name
                                )}
                              >
                                <h4>
                                  <a>{item?.attributes?.itin_name}</a>
                                </h4>
                              </NavLink>
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
                                <li>
                                  {
                                    item?.attributes?.itinerary_country_contents
                                      ?.data[0]?.attributes
                                      ?.guideline_price_notes_index
                                  }
                                </li>
                                <li>
                                  Travel to:
                                  <span>
                                    {item?.attributes?.travel_to_text}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <button className="btn card_slider_btn">
                              <span>{item?.attributes?.no_of_nites_notes}</span>
                              <span
                                className="view_itnry_link"
                                onClick={handleRedirect}
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
                        src="images/destination_overview01.jpg"
                        alt="Card image 07"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                See all Itinerary Ideas in {destinationName}
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
                        src="images/destination_overview02.jpg"
                        alt="Card image 08"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                See all Places to Stay in {destinationName}
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
