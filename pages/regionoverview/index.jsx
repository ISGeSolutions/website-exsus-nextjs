import { useState, useEffect } from "react";
import { destinationService } from "services";
import { NavLink } from "components";
import { useRouter } from "next/router";
import { homeService } from "../../services";

export default RegionOverview;

function RegionOverview({ props, onDataFromChild }) {
  const router = useRouter();
  const [itineraries, setItineraries] = useState(null);
  const itemsPerPage = 9; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [regionData, setRegionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [allRegions, setAllRegions] = useState([]);
  let dictionaryPage = 1;
  const destinationcode = router?.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const friendlyUrl = router.query?.region;
  const regionName = router.query?.region
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();

  const { overview_text } = props?.data || {};
  const country_name = props?.data?.country_name || "";

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") {
        region = window.site_region;
        regionWiseUrl = "/" + window.site_region;
      }
    }
  }

  const generateDynamicLinkRegions = (regionName) => {
    if (regionName != undefined && regionName) {
      const modifieditem = regionName
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
      if (regionName) {
        return (
          regionWiseUrl +
          `/destinations/${destinationcode
            .replace(/ /g, "-")
            .replace(/&/g, "and")
            .toLowerCase()}/${countrycode
              .replace(/ /g, "-")
              .replace(/&/g, "and")
              .toLowerCase()}/${modifieditem}`
        );
      }
    }
  };

  // Function to send data to the parent
  const sendDataToParentHandler = (data) => {
    // Send the data to the parent
    onDataFromChild(data);
    // You can perform other actions related to sending data to the parent
  };

  const handleRedirect = () => {
    router.push(
      regionWiseUrl +
      `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`
    );
  };

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`
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
                modifiedString = websiteContentCheck(matches, modifiedString);
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
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    destinationService
      .getRegionByName(regionName)
      .then((x) => {
        setRegionData(x.data[0].attributes);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    destinationService
      .getRegions(countrycode)
      .then((x) => {
        setAllRegions(x.data[0]?.attributes?.regions?.data.filter(res => res.attributes.friendly_url != friendlyUrl));
        x.data[0]?.attributes?.regions?.data;
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });

    window.addEventListener("resize", equalHeight(true));
    // Using window.onload to detect full page load
    // window.onload = () => {
    //   setTimeout(() => {
    //     let reName = "";
    //     let destName = "";
    //     let countryName = "";

    //     if (!regionName || regionName == "undefined") {
    //       reName = localStorage.getItem("region_name");
    //     } else {
    //       reName = regionName?.attributes?.region_name;
    //     }
    //     if (!destinationcode) {
    //       destName = localStorage.getItem("destination_code");
    //     } else {
    //       destName = destinationcode;
    //     }
    //     if (!countrycode) {
    //       countryName = localStorage.getItem("country_code");
    //     } else {
    //       countryName = countrycode;
    //     }
    //     const redirectUrl =
    //       regionWiseUrl +
    //       "/destinations/" +
    //       destName
    //         ?.replace(/ /g, "-")
    //         .replace(/&/g, "and")
    //         .toLowerCase() +
    //       "/" +
    //       countryName
    //         ?.replace(/ /g, "-")
    //         .replace(/and/g, "&")
    //         .replace(/&/g, "and")
    //         .toLowerCase() +
    //       "/" +
    //       reName
    //         ?.replace(/ /g, "-")
    //         .replace(/&/g, "and")
    //         .toLowerCase();

    //     if (redirectUrl) {
    //       router.push(redirectUrl);
    //     }
    //   }, 0);
    // };
  }, [regionName, destinationcode, countrycode]);

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
                  __html: dictioneryFunction(regionData.overview_text),
                }}
              />
            </section>
          </div>

          <section className="favrites_blk_row favrites_blk_small_card_row">
            <div className="container">
              <h3 className="title_cls">Other regions in {countrycode}</h3>
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
                  {allRegions?.map(
                    (regions, i) =>
                      // Add a condition to check if country_name is not null
                      regions.attributes.region_name && (
                        <div
                          className="card_slider_inr card_slider_inr_sml"
                          key={regions?.id}
                        >
                          <NavLink
                            href={generateDynamicLinkRegions(
                              regions?.attributes.region_name
                            )}
                          >
                            <div className="card_slider_inr_sml_img">
                              <img
                                src={
                                  regions?.attributes?.region_images?.data.filter(
                                    (res) =>
                                      res.attributes.image_type === "thumbnail"
                                  )[0]?.attributes?.image_path
                                }
                                alt={
                                  regions?.attributes?.region_images?.data.filter(
                                    (res) =>
                                      res.attributes?.image_type === "thumbnail"
                                  )[0]?.attributes?.image_alt_text
                                }
                                className="img-fluid"
                              />
                            </div>
                            <h4>
                              {regions.attributes.region_name}
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
          <section className="card_blk_row dark_grey">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card_blk_inr card_blk_overlay">
                    <a onClick={() => sendDataToParentHandler("itineraries")}>
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
                                {regionData.region_name}
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
                                {regionData.region_name}
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
