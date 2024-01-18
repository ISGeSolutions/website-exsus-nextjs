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
import generateDynamicLink from "components/utils/generateLink";
import Image from "next/image";

export default ContinentCountry;

function ContinentCountry({ sendDataToParent }) {
  const router = useRouter();
  const destinationcode = router.query.continent
    .replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const query = router.query;
  const [allCountries, setAllCountries] = useState([]);
  const [destination, setdestination] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");

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

  const handleClick = (e) => {
    sendDataToParent(e);
  };

  const generateDynamicLinkCountries = (countryName) => {
    if (countryName) {
      const modifieditem = countryName
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
      if (countryName) {
        return (
          regionWiseUrl +
          `/destinations/${destinationcode
            .replace(/ /g, "-")
            .replace(/&/g, "and")
            .toLowerCase()}/${modifieditem}`
        );
      }
    }
  };

  const websiteContentCheck = () => {
    homeService
      .getAllWebsiteContent(region)
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
            localStorage.setItem(
              "websitecontent_uk",
              JSON.stringify(dynamicObjectUk)
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code == "US"
          ) {
            dynamicObjectUs[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectUs["expiration"] = expirationTime;
            localStorage.setItem(
              "websitecontent_us",
              JSON.stringify(dynamicObjectUs)
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "ASIA"
          ) {
            dynamicObjectAsia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectAsia["expiration"] = expirationTime;
            localStorage.setItem(
              "websitecontent_asia",
              JSON.stringify(dynamicObjectAsia)
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "INDIA"
          ) {
            dynamicObjectIndia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectIndia["expiration"] = expirationTime;
            localStorage.setItem(
              "websitecontent_india",
              JSON.stringify(dynamicObjectIndia)
            );
          }
        });

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
          } catch (error) { }
        }
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(`websitecontent_${region.replace(
      /in/g,
      "INDIA"
    ).toLowerCase()}`)) {
      websiteContentCheck();
    }
    destinationService
      .getDestinationDetails(destinationcode)
      .then((x) => {
        setdestination(x.data[0].attributes);
        setAllCountries(x.data[0].attributes?.countries?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {
        const redirectUrl = `${regionWiseUrl}/destinations/${destinationcode}`;

        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [destinationcode, router, query]);

  const handleFilterClick = (item) => {
    setActiveItem(item);
    if (item == "alphabetical") {
      setAllCountries(
        allCountries.sort((a, b) =>
          a.attributes.country_name.localeCompare(b.attributes.country_name)
        )
      );
      // console.log(allCountries);
    } else if (item == "recommended") {
      setAllCountries(allCountries.sort((a, b) => a.id - b.id));
      // console.log(allCountries);
    }
  };

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
                  __html: dictioneryFunction(destination?.countries_intro_text),
                }}
              />
            </section>
          </div>

          <section className="card_blk_row destinations_blk_row light_dark_grey">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="destination_contries_filter d-block d-md-flex">
                    <ul>
                      <li>
                        <a
                          className={
                            activeItem === "recommended" ? "active" : ""
                          }
                          onClick={() => handleFilterClick("recommended")}
                        >
                          Exsus recommends
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

                {/* Continent countries */}
                {allCountries?.map(
                  (countries, i) =>
                    // Add a condition to check if country_name is not null
                    countries.attributes.country_name && (
                      <div
                        className="col-sm-6 col-lg-4 col-xxl-3"
                        key={countries?.id}
                      >
                        <div className="card_blk_inr">
                          <NavLink
                            href={generateDynamicLinkCountries(
                              countries?.attributes.country_name
                            )}
                          >
                            <img
                              src={
                                countries?.attributes?.country_images?.data.filter(
                                  (res) =>
                                    res.attributes.image_type === "thumbnail"
                                )[0]?.attributes?.image_path
                              }
                              alt={
                                countries?.attributes?.country_images?.data.filter(
                                  (res) =>
                                    res.attributes?.image_type === "thumbnail"
                                )[0]?.attributes?.image_alt_text
                              }
                              className="img-fluid"
                            />
                            <div className="card_blk_cntnt card_blk_sml_arw">
                              <div className="row align-items-center">
                                <div className="col-11">
                                  <div className="card_blk_txt">
                                    <h3 className="mb-0">
                                      {countries?.attributes?.country_name}
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
                          </NavLink>
                        </div>
                      </div>
                    )
                )}
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
                                See all Itinerary Ideas in{" "}
                                {destination.destination_name}
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
                                See all Places to Stay in{" "}
                                {destination.destination_name}
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
