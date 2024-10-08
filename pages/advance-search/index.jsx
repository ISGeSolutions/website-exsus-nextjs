import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import { destinationService, homeService } from "services";
import { customeService } from "../../services/custome.service";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { Alert } from "../../components";
import { formatPrice } from "../../components/utils/priceFormater";

export default Index;

function Index() {
  const router = useRouter();
  const itemsPerPage = 12; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [page, setPage] = useState(0); // Current page
  const dcodestr = router?.query?.where;
  const dcodeReason = router?.query?.what;
  const dcodeMonth = router?.query?.when;
  const [metaData, setMetaData] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const LoadMorePagination = ({ data }) => {
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  };
  const [activeItem, setActiveItem] = useState("asc");
  const [alert, setAlert] = useState(null);
  const [advanceSearch, setAdvanceSearch] = useState(null);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };
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

  const loadMoreData = (item) => {
    setIsLoading(true);
    destinationService
      .getItinerariesInAdvanceSearch(
        dcodestr,
        dcodeReason,
        dcodeMonth,
        page + 1,
        region,
        item
      )
      .then((response) => {
        setMetaData(response.meta.pagination);
        const newItineraries = response.data;
        if (newItineraries.length > 0) {
          setItineraries((prevItineraries) =>
            [...prevItineraries, ...newItineraries].reduce(
              (accumulator, current) =>
                accumulator.some((item) => item.id === current.id)
                  ? accumulator
                  : [...accumulator, current],
              []
            )
          );
          setPage(page + 1);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        // Handle any errors here
        setAlert(error);
        setIsLoading(true);
      });
  };

  const generateDynamicLink = (item) => {
    let countryName =
      item?.attributes?.countries?.data[0]?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();

    return (
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination_name
        ?.replace(/&/g, "and")
        .replace(/ /g, "-")
        .toLowerCase()}/${countryName}/${countryName}-itineraries/${item?.attributes?.friendly_url
      }`
    );
  };

  //destination_name destination_name

  const handleRedirect = (item) => {
    let countryName =
      item?.attributes?.countries?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase();

    router.push(
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination_name
        ?.replace(/&/g, "and")
        .replace(/ /g, "-")
        .toLowerCase()}/${countryName}/${countryName}-itineraries/${item?.attributes?.friendly_url
      }`
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

  const closeAlert = () => {
    setAlert(null);
  };

  const handleFilterClick = (item) => {
    setAlert(null);
    page = 0;
    setItineraries([]);
    setActiveItem(item);
    loadMoreData(item);
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

    customeService.getAdvanceSearch().then((x) => {
      setAdvanceSearch(x.data[0]?.attributes);
      localStorage.setItem(
        "PageInfo",
        JSON.stringify({
          pType: "CUST",
          pCode: x?.data[0]?.attributes?.page_code,
        })
      );
    });
    setIsLoading(false);
    loadMoreData(activeItem);

    window.addEventListener("resize", equalHeight(true));
  }, [dcodestr, dcodeMonth, dcodeReason]);

  return (
    <>
      {alert && alert.message && alert.type && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
      <Head>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <title>
          {
            advanceSearch?.custom_page_contents?.data?.filter(
              (res) => res?.attributes?.content_name == "Title"
            )[0]?.attributes?.content_value
          }
        </title>
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
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey pt-5">
            <div className="container">
              <h2 className="search_result_title">
                {
                  advanceSearch?.custom_page_contents?.data?.filter(
                    (res) => res.attributes?.content_name == "HeadingTag"
                  )[0]?.attributes?.content_value
                }
              </h2>
              <h3 className="title_cls search_result_title_green">
                Find and plan your perfect tailor-made holiday worldwide
              </h3>
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    <div className="col-12">
                      <div className="destination_dropdwn_row d-block d-md-flex">
                        <div className="banner_dropdwn_blk ps-0 ps-md-2 advnce_srch_dropdwn_blk">
                          <Inspireme />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="destination_filter_result d-block d-lg-flex">
                        <p>
                          We've found{" "}
                          {metaData?.total > 0 ? metaData?.total : 0} holiday
                          ideas that are right for you.
                        </p>
                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                          <label className="pt-2 pt-lg-0">Arrange by:</label>
                          <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                            <li>
                              <a
                                className={activeItem === "asc" ? "active" : ""}
                                onClick={() => handleFilterClick("asc")}
                              >
                                Low - High
                              </a>
                            </li>
                            <li>
                              <a
                                className={
                                  activeItem === "desc" ? "active" : ""
                                }
                                onClick={() => handleFilterClick("desc")}
                              >
                                High - Low
                              </a>
                            </li>
                            <li>
                              <a
                                className={
                                  activeItem === "duration" ? "active" : ""
                                }
                                onClick={() => handleFilterClick("duration")}
                              >
                                By duration
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Itineraries */}
                    {itineraries
                      ?.slice(0, visibleItems.length)
                      .map((item, index) => (
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

                                  {item?.attributes?.itinerary_country_contents?.data
                                    .filter(
                                      (res) =>
                                        res.attributes.website_country.toLowerCase() ===
                                        region.replace(/in/g, "india")
                                    )
                                    .map((res1) => (
                                      <li key={res1.id}>
                                        {`from ${res1.attributes?.currency_symbol ?? ""
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
                                  {item?.attributes?.no_of_nites_notes}
                                </span>
                                <span className="view_itnry_link">
                                  View this itinerary
                                  <em className="fa-solid fa-chevron-right"></em>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                    <div className="col-12">
                      {metaData.total > page * itemsPerPage && (
                        <button
                          type="button"
                          onClick={() => loadMoreData(activeItem)}
                          className="btn prmry_btn make_enqury_btn mx-auto text-uppercase"
                          fdprocessedid="r5vpm6s"
                        >
                          SHOW{" "}
                          {metaData.total - page * itemsPerPage > 12
                            ? 12
                            : metaData.total - page * itemsPerPage > 12}{" "}
                          MORE HOLIDAY IDEAS
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            imageRendering="optimizeQuality"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            viewBox="0 0 512 266.77"
                          >
                            <path
                              fillRule="nonzero"
                              d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enqury */}
          <section className="make_enqury_row">
            <div className="container">
              <EnquiryButton />
            </div>
          </section>

          {/* NewsLatter */}
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
