import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import {
  destinationService,
  alertService,
  userService,
  countriesService,
  homeService,
} from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import generateDynamicLink from "components/utils/generateLink";
import Image from "next/image";

export default CountryRegions;

function CountryRegions({ sendDataToParent }) {
  const router = useRouter();
  const [allRegions, setAllRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");
  const [countryData, setCountryData] = useState();
  const destinationcode = router?.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
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
                modifiedString = modifiedString.replace(checkStr, replacement);
              }
            });
            return modifiedString;
          } catch (error) {
            if (error) {
              return data;
            }
          }
        }
      }
    }
  };

  const handleFilterClick = (item) => {
    setActiveItem(item);
    if (item == "alphabetical") {
      setAllRegions(
        allRegions.sort((a, b) =>
          a.attributes.region_name.localeCompare(b.attributes.region_name)
        )
      );
    } else if (item == "recommended") {
      setAllRegions(allRegions.sort((a, b) => a.id - b.id));
    }
  };

  const handleClick = (e) => {
    // Call the callback function to send data to the parent
    sendDataToParent(e);
  };

  const generateDynamicLink = (item) => {
    if (item) {
      const modifiedName = item?.attributes?.region_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
      return (
        regionWiseUrl +
        "/destinations/" +
        destinationcode.replace(/ /g, "-").replace(/&/g, "and").toLowerCase() +
        "/" +
        countrycode.replace(/ /g, "-").replace(/&/g, "and").toLowerCase() +
        "/" +
        modifiedName
      );
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
    // const newUrl = regionWiseUrl + `/ destinations / africa / africa - countries`;
    // window.history.pushState(null, null, newUrl);

    countriesService
      .getCountryDetails(countrycode)
      .then((x) => {
        setCountryData(x.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    destinationService
      .getRegions(countrycode)
      .then((x) => {
        setAllRegions(x.data[0]?.attributes?.regions?.data);
        x.data[0]?.attributes?.regions?.data;
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });

    // Using window.onload to detect full page load
    // window.onload = () => {
    //   setTimeout(() => {
    //     regionWiseUrl +
    //       `/ destinations / ${destinationcode} /${countrycode?.replace(
    //         / /g,
    //         "-"
    //       )}`;
    //     if (redirectUrl) {
    //       router.push(redirectUrl);
    //     }
    //   }, 0);
    // };
  }, [countrycode, destinationcode]);

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
              <p
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(
                    countryData?.attributes?.regions_intro_text
                  ),
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

                {/* Country regions */}
                {allRegions?.slice(0, allRegions.length).map((item) => (
                  <div className="col-sm-6 col-lg-4 col-xxl-3" key={item.id}>
                    <div className="card_blk_inr flex-column card_blk_para_blk">
                      <NavLink href={generateDynamicLink(item)}>
                        <img
                          src={
                            item?.attributes?.region_images?.data?.filter(
                              (res) => res.attributes.image_type == "thumbnail"
                            )[0]?.attributes.image_path
                          }
                          alt={
                            item?.attributes?.region_images?.data?.filter(
                              (res) => res.attributes.image_type == "thumbnail"
                            )[0]?.attributes.image_alt_text
                          }
                          className="img-fluid"
                        />
                        <div className="card_blk_cntnt card_blk_sml_arw">
                          <div className="row align-items-center">
                            <div className="col-11">
                              <div className="card_blk_txt">
                                <h3 className="mb-0">
                                  {item?.attributes?.region_name}
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
                      <div
                        dangerouslySetInnerHTML={{
                          __html: dictioneryFunction(
                            item?.attributes?.intro_text
                          ),
                        }}
                      />
                    </div>
                  </div>
                ))}
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
                        src="/./../../../images/destination_overview01.jpg"
                        alt="Card image 07"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                See all Itinerary Ideas in{" "}
                                {countryData?.attributes?.country_name}
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
                        src="/./../../../images/destination_overview02.jpg"
                        alt="Card image 08"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>
                                See all Places to Stay in{" "}
                                {countryData?.attributes?.country_name}
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
