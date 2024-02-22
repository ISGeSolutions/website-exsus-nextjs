import React, { useState, useEffect, useRef } from "react";
import { destinationService } from "services";
import Iframe from "react-iframe";
import Head from "next/head";
import { useRouter } from "next/router";
import { FriendlyUrl, Signup } from "../../components";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import Country from "../country/index"; // Adjust the path accordingly
import ContinentCountry from "../continentcountries/index"; // Adjust the path accordingly
import ContinentItinararies from "../continentitineraries/index"; // Adjust the path accordingly
import ContinentPlacesToStay from "../continentplacetostay/index"; // Adjust the path accordingly
import ContinentOverview from "../continentoverview/index"; // Adjust the path accordingly
import { useTranslation } from "react-i18next";
import { homeService } from "../../services";
import MarkerInfoWindowNext from "../../components/common/MarkerInfoWindowNext";
import { ImageSlider } from "../../components/ImageSlider";

export default Index;

function Index() {
  const [destinationDetails, setDestinationDetails] = useState();
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [headingText, setHeadingText] = useState("");
  const [mapVariable, setMapVariable] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // State to track the active tab
  const router = useRouter();
  let dictionaryPage = 1;
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const destinationcode = router.query.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const destinationTab = router.query?.continenttab;
  var itinerarytab = router.components;
  const handleDataFromChild = (data) => {
    // Update the parent component's state with data received from the child
    toggleTab(data);
  };
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [destinationName, setdestinationName] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [parentData, setParentData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let [isShowMap, setIsShowMap] = useState(true);
  //let isShowMap = true;

  const tabContentRefs = {
    overview: useRef(null),
    countries: useRef(null),
    itineraries: useRef(null),
    places_to_stay: useRef(null),
  };
  const [activeButton, setActiveButton] = useState("images");
  const divRef = useRef();
  const { t } = useTranslation();

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

  // <button className="btn header_nav_btn">
  //   MEET OUR EXPERTS
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     fill="#000"
  //     shapeRendering="geometricPrecision"
  //     textRendering="geometricPrecision"
  //     imageRendering="optimizeQuality"
  //     fillRule="evenodd"
  //     clipRule="evenodd"
  //     viewBox="0 0 267 512.43"
  //   >
  //     <path
  //       fillRule="nonzero"
  //       d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
  //     />
  //   </svg>
  // </button>;

  const toggleTab = (itemId) => {
    var text;

    if (itemId == "overview") {
      setIsShowMap(true);
      const redirectUrl =
        regionWiseUrl + `/destinations/${destinationDetails?.friendly_url}`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(`Home/Destinations/${destinationDetails?.friendly_url}`);
      text = destinationDetails?.header_text;
    } else if (itemId == "countries") {
      setIsShowMap(true);
      let destCode = "";
      if (!destinationcode) {
        destCode = localStorage.getItem("destination_code");
      } else {
        destCode = destinationcode;
      }
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destCode
          .replace(/&/g, "and")
          .replace(/ /g, "-")
          .toLowerCase()}/${destCode
          .replace(/&/g, "and")
          .replace(/ /g, "-")
          .toLowerCase()}-countries`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationDetails?.friendly_url}/${destinationDetails?.friendly_url} countries`
      );
      text = `COUNTRIES IN ${destinationName}`;
    } else if (itemId == "itineraries") {
      setIsShowMap(false);
      let destCode = "";
      if (!destinationcode) {
        destCode = localStorage.getItem("destination_code");
      } else {
        destCode = destinationcode;
      }
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destCode
          .replace(/&/g, "and")
          .replace(/ /g, "-")
          .toLowerCase()}/${destCode
          .replace(/&/g, "and")
          .replace(/ /g, "-")
          .toLowerCase()}-itineraries`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(`Home/Destinations/${destCode}/${destCode} Itineraries`);
      text = `TAILOR-MADE ${destinationName} HOLIDAY ITINERARIES`;
    } else if (itemId == "places-to-stay") {
      setIsShowMap(false);
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationDetails?.friendly_url}/${destinationDetails?.friendly_url}-places-to-stay`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationDetails?.friendly_url}/Places to stay in ${destinationDetails?.friendly_url}`
      );
      text = `PLACES TO STAY IN ${destinationName}`;
    }
    setHeadingText(text);
    if (activeTab !== itemId) {
      setActiveTab(itemId);
      // window.history.pushState(null, null, redirectUrl); // Update the URL
    }

    var targetDiv = document.getElementById("scrollToElement");

    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }

    // if (activeTab == "itineraries") {
    //   //setIsShowMap(false);
    //   isShowMap = false;
    // }else if(activeTab ){

    // }
    // if (tabContentRefs[itemId]?.current) {
    //   tabContentRefs[itemId]?.current.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
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

  const handleTabClick = (tab) => {
    setActiveButton(tab);
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
          } catch (error) {}
        }
      }
    }
  };

  equalHeight(true);

  const handlePopState = (event) => {
    // Perform any actions you want when the back button is pressed
    if (myArrayPath[1] === "destinations") {
      router.push("/destinations/" + destinationcode);
    }
  };

  useEffect(() => {
    window.onpopstate = () => {
      // Your logic here
      window.location.reload();
    };

    // Get the current URL
    // const currentUrl = window.location.href;

    // Create a URL object
    // const urlObject = new URL(currentUrl);

    // Extract elements
    // const pathname = urlObject.pathname;
    // const protocol = urlObject.protocol;
    // const host = urlObject.host;
    // const search = urlObject.search;
    // const hash = urlObject.hash;

    // const myArrayPath = pathname.split("/");

    // Add event listener when the component mounts
    // window.addEventListener('popstate', handlePopState);

    // window.addEventListener('popstate', handlePopState);

    if (destinationcode && destinationcode != "undefined") {
      localStorage.setItem("destination_code", destinationcode);
    }

    if (router.query?.continentSlug) {
      if (router.asPath.includes("itineraries")) {
        toggleTab("itineraries");
      } else if (router.asPath.includes("countries")) {
        toggleTab("countries");
      }
    }

    window.scrollTo(0, 0);

    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    if (destinationcode) {
      destinationService
        .getDestinationDetails(destinationcode)
        .then((x) => {
          setDestinationDetails(x.data[0].attributes);
          localStorage.setItem(
            "PageInfo",
            JSON.stringify({
              pType: "INTE",
              pCode: x?.data[0]?.attributes?.destination_code,
            })
          );
          const filteredData = x.data[0].attributes?.countries?.data?.filter(
            (item) => {
              const { map_latitude, map_longitude } = item.attributes;
              return (
                map_latitude !== null &&
                map_latitude !== "" &&
                map_longitude !== null &&
                map_longitude !== ""
              );
            }
          );
          // Create an array of objects with parsed latitude and longitude
          const newCoordinates = filteredData.map((item) => ({
            lat: parseFloat(item.attributes.map_latitude),
            lng: parseFloat(item.attributes.map_longitude),
            name: item.attributes?.hotel_name,
            image: item.attributes?.hotel_images?.data?.filter(
              (res) => res?.attributes?.image_type == "thumbnail"
            )[0]?.attributes?.image_path,
            url:
              regionWiseUrl +
              `/destinations/${x.data[0].attributes?.friendly_url
                ?.replace(/&/g, "and")
                .replace(/ /g, "-")
                .toLowerCase()}/${item?.attributes?.friendly_url
                ?.replace(/ /g, "-")
                .replace(/&/g, "and")
                .toLowerCase()}`,
          }));
          // // Update the state with the accumulated coordinates
          setCoordinatesArray((prevCoordinates) => [
            ...prevCoordinates,
            ...newCoordinates,
          ]);
          // console.log(x.data[0].attributes);
          setHeadingText(x.data[0]?.attributes?.header_text);

          setFriendlyUrl(
            `Home/Destinations/${x.data[0].attributes.friendly_url}`
            // `Home/Destinations/${destinationDetails?.friendly_url}/${destinationDetails?.friendly_url}-itineraries`
          );
          setMetaTitle(x.data[0].attributes.page_meta_title);
          // const map_latitude = x.data[0].attributes?.map_latitude;
          // const map_longitude = x.data[0].attributes?.map_longitude;
          setdestinationName(x.data[0].attributes.destination_name);
          const map_latitude = x.data[0]?.attributes?.map_latitude;
          const map_longitude = x.data[0]?.attributes?.map_longitude;
          const map_zoom = x.data[0].attributes.map_zoom_level;

          const mapTemp =
            `https://www.google.com/maps/embed/v1/place?q=` +
            map_latitude +
            `,` +
            map_longitude +
            "" +
            `&zoom=${map_zoom != null ? map_zoom : 0}` +
            `&key=AIzaSyDIZK8Xr6agksui1bV6WjpyRtgtxK-YQzE`;
          setMapVariable(mapTemp);
          const imageCheck = x.data[0].attributes?.destination_images?.data;
          const newBackgroundImages = [];
          imageCheck.forEach((element) => {
            if (element.attributes.image_type == "banner") {
              newBackgroundImages.push(element.attributes.image_path);
            }
          });
          setBackgroundImage(newBackgroundImages);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

    $(".banner_map_tab").click(function () {
      $(".banner_map_blk").addClass("banner_map_active");
    });
    $(".banner_img_tab").click(function () {
      $(".banner_map_blk").removeClass("banner_map_active");
    });

    $(".banner_tab_blk button").click(function () {
      $(".banner_tab_blk button").removeClass("banner_tab_active");
      $(this).addClass("banner_tab_active");
    });

    $(document).ready(function () {
      $(".destination_contries_filter li a").click(function () {
        $(".destination_contries_filter li a").removeClass("active");
        $(this).addClass("active");
      });
    });
    window.onload = () => {
      setTimeout(() => {
  
        let destCode = "";
        if (!destinationcode) {
          destCode = localStorage.getItem("destination_code");
        } else {
          destCode = destinationcode;
        }
        const redirectUrl = `${regionWiseUrl}/destinations/${destCode
          ?.replace(/ /g, "-")
          .replace(/&/g, "and")}`;

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

    return () => {
      // Remove event listener when the component is unmounted
      window.removeEventListener("popstate", handlePopState);
    };
  }, [destinationcode]);

  return (
    <>
      <Head>
        <title>{dictioneryFunction(metaTitle)}</title>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider02.js"
        ></script>
        <meta
          content={dictioneryFunction(
            destinationDetails?.page_meta_description
          )}
        ></meta>
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
            <ImageSlider data={backgroundImage}></ImageSlider>
            {/* {backgroundImage ? (
              <div
                id="carouselExampleInterval"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators" id="scrollToElement">
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
                    <a
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      data-interval="5000"
                    >
                      <div
                        className="banner_commn_cls"
                        style={{
                          backgroundImage: `url(${imagePath})`,
                        }}
                      ></div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )} */}

            {isShowMap ? (
              <div className="banner_tab_blk">
                <button
                  className={`btn banner_map_tab ${
                    activeButton === "map" ? "banner_tab_active" : ""
                  }`}
                  onClick={() => handleTabClick("map")}
                >
                  Map
                </button>
                <button
                  className={`btn banner_img_tab ${
                    activeButton === "images" ? "banner_tab_active" : ""
                  }`}
                  onClick={() => handleTabClick("images")}
                >
                  Images
                </button>
              </div>
            ) : (
              ""
            )}
            <div
              className={`banner_map_blk ${
                activeButton === "map" ? "banner_map_active" : ""
              }`}
            >
              <MarkerInfoWindowNext data={coordinatesArray} />
              {/* src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" */}
            </div>

            {/* <p>{mapVariable}</p> */}
          </section>

          {/* Continent Sub tabs */}
          <div>
            <section
              className="destination_tab_row light_grey pb-0"
              ref={divRef}
            >
              <div className="container">
                <div className="bookmark_row">
                  <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
                </div>
                <div className="destination_tab_inr" id="scrollToElement">
                  {/* mt-3 */}
                  <h2 className="tab_tilte">
                    {/* {destinationDetails?.header_text} */}
                    {dictioneryFunction(headingText)}
                  </h2>
                  <ul
                    className="nav nav-pills justify-content-center"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className={
                          activeTab === "overview"
                            ? "active nav-link"
                            : "nav-link"
                        }
                        onClick={() => toggleTab("overview")}
                        id="pills-overview-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-overview"
                        type="button"
                        role="tab"
                        aria-controls="pills-overview"
                        aria-selected="true"
                      >
                        Ovierview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={
                          activeTab === "countries"
                            ? "active nav-link"
                            : "nav-link"
                        }
                        onClick={() => toggleTab("countries")}
                        id="pills-countries-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-countries"
                        type="button"
                        role="tab"
                        aria-controls="pills-countries"
                        aria-selected="false"
                      >
                        Countries
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={
                          activeTab === "itineraries"
                            ? "active nav-link"
                            : "nav-link"
                        }
                        onClick={() => toggleTab("itineraries")}
                        id="pills-itineraries-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-itineraries"
                        type="button"
                        role="tab"
                        aria-controls="pills-itineraries"
                        aria-selected="false"
                      >
                        Itineraries
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={
                          activeTab === "places-to-stay"
                            ? "active nav-link"
                            : "nav-link"
                        }
                        onClick={() => toggleTab("places-to-stay")}
                        id="pills-places-to-stay-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-places-to-stay"
                        type="button"
                        role="tab"
                        aria-controls="pills-places-to-stay"
                        aria-selected="false"
                      >
                        Places to stay
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tab-content" id="pills-tabContent">
                {/* {activeTab === 'home' && <div>Home Content</div>}
                {activeTab === 'about' && <div>About Content</div>}
                {activeTab === 'contact' && <div>Contact Content</div>} */}
                {activeTab === "overview" && (
                  <div
                    className={
                      activeTab === "overview"
                        ? "active show tab-pane fade"
                        : "tab-pane fade"
                    }
                    id="pills-overview"
                    role="tabpanel"
                    aria-labelledby="pills-overview-tab"
                    tabIndex="0"
                    ref={tabContentRefs["overview"]}
                  >
                    <ContinentOverview sendDataToParent={handleDataFromChild} />
                  </div>
                )}
                {activeTab === "countries" && (
                  <div
                    className={
                      activeTab === "countries"
                        ? "active show tab-pane fade"
                        : "tab-pane fade"
                    }
                    id="pills-countries"
                    role="tabpanel"
                    aria-labelledby="pills-countries-tab"
                    tabIndex="0"
                    ref={tabContentRefs["countries"]}
                  >
                    <ContinentCountry sendDataToParent={handleDataFromChild} />
                  </div>
                )}
                {activeTab === "itineraries" && (
                  <div
                    className={
                      activeTab === "itineraries"
                        ? "active show tab-pane fade"
                        : "tab-pane fade"
                    }
                    id="pills-itineraries"
                    role="tabpanel"
                    aria-labelledby="pills-itineraries-tab"
                    tabIndex="0"
                    ref={tabContentRefs["itinararies"]}
                  >
                    <ContinentItinararies divRef={divRef} />
                  </div>
                )}
                {activeTab === "places-to-stay" && (
                  <div
                    className={
                      activeTab === "places-to-stay"
                        ? "active show tab-pane fade"
                        : "tab-pane fade"
                    }
                    id="pills-places-to-stay"
                    role="tabpanel"
                    aria-labelledby="pills-places-to-stay-tab"
                    tabIndex="0"
                    ref={tabContentRefs["places-to-stay"]}
                  >
                    <ContinentPlacesToStay divRef={divRef} />
                  </div>
                )}
              </div>
            </section>

            <section className="make_enqury_row">
              <div className="container">
                <EnquiryButton />
              </div>
            </section>

            {/* NewsLetter */}
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
        </div>
      )}
    </>
  );
}
