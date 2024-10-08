import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { FriendlyUrl } from "../../components";
import {
  hotelService,
  destinationService,
  countriesService,
  homeService,
} from "services";
import Iframe from "react-iframe";
import { useRouter } from "next/router";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

import Head from "next/head";
import { NavLink } from "components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { element } from "prop-types";
import { formatPrice } from "../../components/utils/priceFormater";
import MarkerInfoWindowNext from "../../components/common/MarkerInfoWindowNext";
import { ImageSlider } from "../../components/ImageSlider";
var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const router = useRouter();
  const [itineraries, setItineraries] = useState(null);
  const [moreItineraries, setMoreItineraries] = useState(null);
  const [hotels, setHotelData] = useState(null);
  const [bannerImages, setBannerImages] = useState(null);
  const itin_name = router.query?.itineraryName
    ? router.query?.itineraryName
    : router.query?.itineraries?.toLowerCase();
  const itin_code = router.query?.itinerarycode;
  const [title, setTitle] = useState("");
  const countrycode = router.query?.countrycode;
  const destinationcode = router.query?.destinationcode;
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  let dictionaryPage = 1;
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [modalKey, setModalKey] = useState(0);
  const [showAllParagraphs, setShowAllParagraphs] = useState(false);
  const [telephoneNumber, SetTelePhoneNumber] = useState("${TelephoneNumber}");

  // Function to toggle between all paragraphs and only the first paragraph
  const toggleParagraphs = (index) => {
    setShowAllParagraphs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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

  const EnquiryBtn = () => {
    const router = useRouter();
    const handleEnquiryClick = () => {
      let pageinfo = JSON.parse(localStorage.getItem("PageInfo"));
      //router.push(region + `/make-an-enquiry`); // Navigate to the /enquiry page
      router.push(
        `${regionWiseUrl}/make-an-enquiry?pType=${pageinfo?.pType}&pCode=${pageinfo?.pCode}`
      );
    };

    return (
      <button
        className="btn prmry_btn make_enqury_btn"
        onClick={handleEnquiryClick}
      >
        {" "}
        Make an enquiry
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
      </button>
    );
  };

  const formattedHtml = (htmlData) => {
    return htmlData?.replace(/<br \/>\s*<br \/>/g, "<br /><br /></p><p>");
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
        .toLowerCase()}/${item?.attributes?.country?.data?.attributes?.country_name
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
        .toLowerCase()}/${item?.attributes?.country?.data?.attributes?.country_name
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
        .replace(/ /g, " ")
        .toLowerCase()}/${countryName}-itineraries/${item?.attributes?.friendly_url
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
        .replace(/ /g, " ")
        .toLowerCase()}/${countryName}-itineraries/${item?.attributes?.friendly_url
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
      }
    } else {
    }
  };

  const addStringBeforeSecondLastSlash = (inputString, newString) => {
    // Split the string by slashes
    const segments = inputString.split("/");
    // Insert the new string before the second last segment
    segments.splice(-3, 0, newString);

    // Join the segments back into a string
    const resultString = segments.join("/");

    return resultString;
  };
  equalHeight(true);

  useEffect(() => {

    router.beforePopState(({ as }) => {
      const searchString = "itineraries";
      if (as?.includes(searchString)) {
        if (as !== router?.asPath && router?.asPath) {
          // / Find the index of 'itineraries'
          const index = as?.indexOf("itineraries");

          // Extract the substring
          const result = as?.substring(0, index + "itineraries".length);
          router.push(result);
          return false;
        }
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  useEffect(() => {

    const searchString = "itineraries";
    const currentUrl = window.location.href;
    const segments = currentUrl?.split("/");
    if (
      !currentUrl.includes(searchString) &&
      !segments[segments.length - 1].includes(searchString) &&
      !segments[segments.length - 1].includes("places-to-stay")
    ) {
      const secondPrevUrl = localStorage.getItem("prevUrl");
      localStorage.setItem("secondPrevUrl", secondPrevUrl);
      const newUrl = addStringBeforeSecondLastSlash(currentUrl, "hotels");
      router.push(newUrl);
      // console.log(`The URL contains "${searchString}"`);
    } else if (segments[segments.length - 1].includes(searchString)) {
      segments.pop();
      const newUrl = segments.join("/");
      router.push(newUrl);
    } else if (segments[segments.length - 1].includes("places-to-stay")) {
      segments.pop();
      const newUrl = segments.join("/");
      router.push(newUrl);
    } else {
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

      $(document).ready(function () {
        $(".itinery_detls_expnded").hide();
        $(".itinery_btn").click(function () {
          $(this).toggleClass("read_more");
          $(this).prev(".itinery_detls_expnded").slideToggle("slow");
        });
      });

      if (countrycode) {
        countriesService
          .getCountryDetails(countrycode)
          .then((x) => {
            setCountries(x.data?.attributes?.country_name);
            setIsLoading(false);
          })
          .catch((error) => {
            // Handle any errors here
            // console.error(error);
            setIsLoading(false);
          });
      } else if (destinationcode) {
        destinationService
          .getDestinationDetails(destinationcode)
          .then((x) => {
            setCountries(
              x.data?.attributes?.countries?.data[0]?.attributes?.country_name
            );
            setDestinationDetails(x.data[0].attributes);
            setIsLoading(false);
          })
          .catch((error) => {
            // Handle any errors here
            // console.error(error);
            setIsLoading(false);
          });
      }

      destinationService
        .getItineraryDetails(itin_name, region)
        .then((x) => {
          setItineraries(x.data[0]);
          localStorage.setItem(
            "PageInfo",
            JSON.stringify({
              pType: "CTPL",
              pCode: x?.data[0]?.attributes?.itin_code,
            })
          );
          const bannerImages = [];
          const imageCheck = x.data[0]?.attributes?.itinerary_images?.data;

          // setFriendlyUrl(
          //   `home/destinations/${router.query?.continent}/${
          //     router.query?.country
          //   }/${x.data[0].attributes.itin_name.toLowerCase()}`
          // );

          setFriendlyUrl(
            `home/destinations/${router.query?.continent.replace(
              /%20/g,
              " "
            )?.replace(
              /-and-/g,
              " & "
            )}/${router.query?.country?.replace(
              /-and-/g,
              " & "
            )}/${router.query?.itineraryName
              ? router.query?.itineraries.replace(
                /-and-/g,
                " & "
              ) +
              "/" +
              x.data[0].attributes.itin_name.toLowerCase()
              : x.data[0].attributes.itin_name.toLowerCase()
            }`
          );

          setTitle(x.data[0].attributes.meta_title);
          imageCheck.forEach((banner, index) => {
            // bannerImages.push(banner?.attributes?.image_path);
            if (banner?.attributes?.image_type == "banner") {
              bannerImages.push(banner?.attributes?.image_path);
            }
          });

          destinationService
            .getMoreItineraries(
              x?.data[0]?.attributes?.countries?.data[0]?.attributes
                ?.country_name,
              region
            )
            .then((response) => {
              setMoreItineraries(
                response?.data?.filter(
                  (res) => res.attributes?.friendly_url != itin_name
                )
              );

              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
            });

          destinationService
            .getRegionWiseHotelsInHotelDetail(
              x?.data[0]?.attributes?.regions?.data[0]?.attributes?.region_name,
              region
            )
            .then((response) => {
              setHotelData(response?.data);
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
                    ?.replace(/&/g, "and")
                    .replace(/ /g, "-")
                    .toLowerCase()}/${item?.attributes?.country?.data?.attributes?.country_name
                      ?.replace(/ /g, "-")
                      .replace(/&/g, "and")
                      .toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name
                        ?.replace(/ /g, "-")
                        .replace(/&/g, "and")
                        .toLowerCase()}/${item?.attributes?.friendly_url
                          ?.replace(/&/g, "and")
                          .replace(/ /g, "-")
                          .toLowerCase()}`,
              }));
              setCoordinatesArray((prevCoordinates) => [
                ...prevCoordinates,
                ...newCoordinates,
              ]);
              setModalKey((prevKey) => prevKey + 1);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
            });

          setBannerImages(bannerImages);

          // const carousel = document.querySelector('#Testimonials');
          // new bootstrap.Carousel(carousel);

          window.addEventListener("resize", equalHeight(true));
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

      // Replace 'itinerary' with '' in the current URL
      const currentUrl = window.location.href;
      const newUrl = currentUrl.replace("/itinerary", "");
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [itin_name, itin_code, countrycode, destinationcode]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider02.js"
        ></script>
        {/* <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script> */}
        <title>{dictioneryFunction(itineraries?.attributes?.meta_title)}</title>
        <meta
          content={dictioneryFunction(
            itineraries?.attributes?.meta_description
          )}
        ></meta>
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
            <ImageSlider data={bannerImages}></ImageSlider>
            {/* <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {bannerImages?.map(
                  (__, index) => (
                    <button
                      key={`index_${index}`}
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  )
                  // element?.attributes?.image_type == "banner" && (
                  // )
                )}
              </div>
              <div className="carousel-inner">
                {bannerImages?.map((element, index) => (
                  <NavLink
                    href="#"
                    onClick={handleHrefClick}
                    key={`ele_${index}`}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    data-bs-interval="5000"
                  >
                    <div
                      className="banner_commn_cls"
                      style={{ backgroundImage: `url(${element})` }}
                    ></div>
                  </NavLink>
                ))}
              </div>
            </div> */}
          </section>

          <section className="trvl_info_row">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl
                  data={dictioneryFunction(
                    friendlyUrl?.replace("/itinerary", "")
                  )}
                ></FriendlyUrl>
              </div>

              <div className="trvl_info_cntnt itinry_para_blk">
                <h2 className="trvl_title">
                  {dictioneryFunction(itineraries?.attributes?.itin_name)}
                  <span className="mt-2 d-block white_text_colr">
                    {dictioneryFunction(itineraries?.attributes?.header_text)}
                  </span>
                </h2>
                <h3 className="trvl_title_sub">
                  {dictioneryFunction(itineraries?.attributes?.sub_header_text)}
                </h3>
                <p className="mb-4">
                  <span>Duration: </span>
                  {dictioneryFunction(
                    itineraries?.attributes?.no_of_nites_notes
                  )}
                </p>
                <p className="mb-4">
                  <span>Price: </span>
                  From{" "}
                  {
                    itineraries?.attributes?.itinerary_country_contents?.data[0]
                      ?.attributes?.currency_symbol
                  }
                  {formatPrice(
                    itineraries?.attributes?.itinerary_country_contents?.data[0]
                      ?.attributes?.price
                  )}{" "}
                  {
                    itineraries?.attributes?.itinerary_country_contents?.data[0]
                      ?.attributes?.guideline_price_notes_index
                  }{" "}
                  {
                    itineraries?.attributes?.itinerary_country_contents?.data[0]
                      ?.attributes?.guideline_price_notes
                  }
                </p>

                <p
                  dangerouslySetInnerHTML={{
                    __html: dictioneryFunction(
                      itineraries?.attributes?.overview_text?.replace(/&nbsp/g, " ")
                        ?.replace(/&lsquo;/g, "'")
                        ?.replace(/;/g, "")
                        ?.replace(/&ndash/g, "-")
                        ?.replace(/&rsquo/g, "'")
                    ),
                  }}
                />
              </div>

              <section className="country_highlight_row itinery_hightlight_row mb-0">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="country_highlight_inr">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `<span>Perfect for</span> ${itineraries?.attributes?.perfect_for_text
                            ? dictioneryFunction(itineraries.attributes.perfect_for_text)
                              ?.replace(/&nbsp/g, " ")
                              ?.replace(/&lsquo;/g, "'")
                              ?.replace(/;/g, "")
                              .replace(/<em>/g, "<i>").replace(/<\/em>/g, "</i>")
                              ?.replace(/&ndash/g, "-")
                              ?.replace(/&rsquo/g, "'")
                            : ""
                            }`,
                        }}
                      ></p>

                      <p
                        dangerouslySetInnerHTML={{
                          __html: `<span>In the know</span> ${itineraries?.attributes?.in_the_know_text
                            ? dictioneryFunction(itineraries.attributes.in_the_know_text)
                              ?.replace(/&nbsp/g, " ")
                              ?.replace(/&lsquo;/g, "'")
                              ?.replace(/;/g, "")
                              .replace(/<em>/g, "<i>").replace(/<\/em>/g, "</i>")
                              ?.replace(/&ndash/g, "-")
                              ?.replace(/&rsquo/g, "'")
                            : ""
                            }`,
                        }}
                      ></p>
                    </div>
                  </div>
                  {/* <div className="col-sm-3">
                    <div className="itinery_highlight_inr">
                      <h4>Best for</h4>
                      <ul>
                        {itineraries?.attributes?.best_for_text?.replace(/{|'}|(\s*)/g, '').split(',').map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  </div> */}
                  <div className="col-sm-3">
                    <div className="itinery_highlight_inr">
                      <ul>
                        <li>Best for</li>
                        {itineraries?.attributes?.best_for_text
                          ?.replace(/[{}']/g, "") // Remove { and } and '
                          .split(",")
                          .map((value, index) => (
                            <li key={index}>{value.trim()}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="tailor_made_holidys_row">
                <div className="tailor_made_holidys_inr">
                  <h3>All Exsus Travel holidays are tailor-made</h3>
                  <p>
                    All itineraries on our website are designed as a starting
                    point. Tell us your budget/wishlist/preferred length of stay
                    and we'll help you select the best hotels and experiences,
                    so your holiday is totally personalised.
                  </p>
                  <div className="btn_grp">
                    Call{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: dictioneryFunction(telephoneNumber),
                      }}
                    ></span>{" "}
                    or <EnquiryBtn />
                  </div>
                </div>
              </section>
            </div>
          </section >

          <section className="itinery_detls_row">
            <div className="container">
              <h3 className="title_cls">Itinerary details</h3>

              {itineraries?.attributes?.itinerary_details?.data?.map(
                (element, index) => (
                  <div className="itinery_detls_cntnt" key={index}>
                    <div className="row">
                      <div className="col-md-7 col-lg-8">
                        <div className="itinery_detls_para itinery_para_blk">
                          <h3>
                            <span>{element?.attributes?.duration?.replace(/<\/?strong>/g, "")}</span>
                            {element?.attributes?.place_name.replace(/&nbsp;/g, " ").replace(/<\/?span>/g, "").replace(/<\/?strong>/g, "")}
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: dictioneryFunction(
                                formattedHtml(
                                  showAllParagraphs[index]
                                    ? element?.attributes?.day_detail_text
                                    : element?.attributes?.day_detail_text.split(
                                      "<br />"
                                    )[0]
                                )
                              ),
                            }}
                          />

                          {/* Button to toggle between all paragraphs and only the first paragraph */}
                          {element?.attributes?.overview_text &&
                            element?.attributes?.overview_text.split("<br />")
                              .length > 1 && (
                              <button
                                className={`btn itinery_btn ${showAllParagraphs[index]
                                  ? " itinery_para_expnd"
                                  : ""
                                  }`}
                                onClick={() => toggleParagraphs(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#ffffff"
                                  shapeRendering="geometricPrecision"
                                  textRendering="geometricPrecision"
                                  imageRendering="optimizeQuality"
                                  className="up_arrow"
                                  viewBox="0 0 512 266.77"
                                >
                                  <path
                                    fillRule="nonzero"
                                    d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"
                                  />
                                </svg>
                              </button>
                            )}
                        </div>
                      </div>
                      <div className="col-md-5 col-lg-4">
                        <div className="itinery_detls_img" key={index}>
                          <img
                            src={element?.attributes?.image_path}
                            alt={element?.attributes?.image_text}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
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
                      <li className="mt-3 mt-lg-0">
                        Jan<span className="shade01"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Feb<span className="shade02"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Mar<span className="shade03"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Apr<span className="shade04"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        May<span className="shade01"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        June<span className="shade02"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        July<span className="shade03"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Aug<span className="shade04"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Sep<span className="shade01"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Oct<span className="shade02"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Nov<span className="shade03"></span>
                      </li>
                      <li className="mt-3 mt-lg-0">
                        Dec<span className="shade04"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              {coordinatesArray.length > 0 && (
                <section className="map_blk_row">
                  <h3>Hotel locations for this itinerary</h3>
                  <div className="map_blk_inr">
                    {/* <Iframe
                    width="640px"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin"
                    style="border:0;"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  /> */}
                    <MarkerInfoWindowNext
                      key={modalKey}
                      data={coordinatesArray}
                    />
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                  </div>
                </section>
              )}
            </div>
          </section>

          {
            hotels?.length > 0 ? (
              <section className="favrites_blk_row">
                <div className="container">
                  <h3 className="title_cls">
                    Hotels we've recommended for this trip
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
                      {hotels?.map((item) => (
                        <div className="card_slider_inr01" key={item.id}>
                          <div className="card_slider">
                            <NavLink
                              key={`hotel_${item.id}`}
                              href={generateDynamicLink1(item)}
                              className="card_slider_img"
                            >
                              {item?.attributes?.hotel_images?.data.map(
                                (element, index) =>
                                  element.attributes.image_type == "thumbnail" ? (
                                    <img
                                      key={`hotel_ele_${element.id}`}
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
                              <h4 key={`slider_${item.id}`}>
                                <a href={generateDynamicLink1(item)}>
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
                                      <li
                                        className="price_guide_tooltip"
                                        key={`item_${item?.id}`}
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
                                  <span key={item.id}>
                                    {dictioneryFunction(
                                      item?.attributes?.best_for_text
                                    )}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <button
                              className="btn card_slider_btn justify-content-end"
                              onClick={() => handleRedirect1(item)}
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
            )
          }

          {
            moreItineraries?.length > 0 ? (
              <section className="favrites_blk_row light_grey">
                <div className="container">
                  <h3 className="title_cls">
                    More itineraries in{" "}
                    {dictioneryFunction(
                      itineraries?.attributes?.countries?.data[0]?.attributes
                        ?.country_name
                    )}
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
                      {moreItineraries?.map((item) => (
                        <div
                          className="card_slider_inr"
                          key={`slider_${item?.id}`}
                        >
                          <div className="card_slider">
                            <NavLink
                              key={item.id}
                              href={generateDynamicLink(item)}
                              className="card_slider_img"
                            >
                              {item?.attributes?.itinerary_images?.data.map(
                                (element, index) =>
                                  element.attributes.image_type == "thumbnail" ? (
                                    <img
                                      key={`iti_${element.id}`}
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
                              <h4 key={item.id}>
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
                                    <li key={`filter_${res1.id}`}>
                                      {`From ${res1.attributes?.currency_symbol ?? ""
                                        }${formatPrice(res1.attributes?.price) ??
                                        " xxxx"
                                        } per person`}
                                    </li>
                                  ))}
                                <li>
                                  Travel to:
                                  <span key={item.id}>
                                    {dictioneryFunction(
                                      item?.attributes?.travel_to_text
                                    )}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <button
                              className="btn card_slider_btn light_grey_btn_bg"
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
                    {moreItineraries?.length > 4 ? (
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
                {/* <div className="full_loader_parnt_blk loader_parnt_blk" style="display: block;"><div className="loader-circle-2"></div></div> */}
              </section>
            ) : (
              " "
            )
          }

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
              <h4>Sign up for our newsletter
                <span>Receive our latest news and special offers</span></h4>
              <Signup />
            </div>
          </section>
        </div >
      )
      }
    </>
  );
}
