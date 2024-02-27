import { useState, useEffect, useRef } from "react";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import {
  userService,
  countriesService,
  destinationService,
  itinerariesService,
  homeService,
  hotelService,
} from "services";
import Iframe from "react-iframe";
import { NavLink } from "components";
import { useRouter } from "next/router";
import Select from "react-select";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require("react-responsive-carousel").Carousel;

import CountryRegions from "../countryregions/index"; // Adjust the path accordingly
import CountrytItinararies from "../countryitineraries/index"; // Adjust the path accordingly
import CountryPlaceToStay from "../countryplacetostay/index"; // Adjust the path accordingly
import CountryWhentogo from "../countrywhentogo/index"; // Adjust the path accordingly
import CountryOverview from "../countryoverview/index"; // Adjust the path accordingly
import { FriendlyUrl } from "../../components";
import { ImageSlider } from "../../components/ImageSlider";
import Head from "next/head";
import MarkerInfoWindowNext from "../../components/common/MarkerInfoWindowNext";

export default Country;

function Country() {
  const router = useRouter();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [activeButton, setActiveButton] = useState("images");
  const destinationcode = router.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  //  (destinationcode, countrycode);
  // const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
  // const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
  // const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [mapVariable, setMapVariable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [headingText, setHeadingText] = useState("");
  let [isShowMap, setIsShowMap] = useState(true);
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  let dictionaryPage = 1;
  const divRef = useRef();
  const tabContentRefs = {
    overview: useRef(null),
    countries: useRef(null),
    itineraries: useRef(null),
    places_to_stay: useRef(null),
  };
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // State to track the active tab
  const [dataToSendToChild, setDataToSendToChild] = useState("Initial Data");
  const [dataReceivedFromChild, setDataReceivedFromChild] = useState(null);

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

  const handleOptionCountryChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    setSelectedOptionCountry(selectedOption);
    // this.setState({ selectedOption }, () =>
    // );
  };

  // Function to send data to the child
  const sendDataToChild = () => {
    // Send the data to the child
    setDataToSendToChild(countryData?.attributes);

    // You can perform other actions related to sending data
  };

  // Callback function to receive data from the child
  const handleDataFromChild = (data) => {
    // Process or use the data received from the child
    toggleTab(data);
  };

  const handleOptionRegionChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    setSelectedOptionRegion(selectedOption);
  };

  const handleOptionMonthChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    setSelectedOptionMonth(selectedOption);
  };

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`
    );
  };

  const handleRedirect = () => {
    router.push(
      regionWiseUrl +
        `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`
    );
  };

  const handleTabClick = (tab) => {
    setActiveButton(tab);
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

  const toggleTab = (itemId) => {
    var text = countryData?.attributes?.header_text;
    if (itemId == "overview") {
      setIsShowMap(true);
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }`
      );
      text = "LUXURY HOLIDAYS IN " + countrycode.toUpperCase();
    } else if (itemId == "regions") {
      setIsShowMap(true);
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }/${countryData?.attributes?.friendly_url}-regions`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }/${countryData?.attributes?.friendly_url} regions`
      );
      text = "REGIONS IN " + countrycode.toUpperCase(); // action="/countryregions?countrycode=south-africa"
    } else if (itemId == "itineraries") {
      setIsShowMap(false);
      let destCode = "";
      if (!countrycode) {
        destCode = localStorage.getItem("country_code");
      } else {
        destCode = countrycode;
      }
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode
          ?.replace(/&/g, "and")
          ?.replace(/ /g, "-")}/${destCode
          ?.replace(/&/g, "and")
          ?.replace(/ /g, "-")}/${destCode
          ?.replace(/&/g, "and")
          ?.replace(/ /g, "-")}-itineraries`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode?.replace(
          / /g,
          "-"
        )}/${destCode}/${destCode} itineraries`
      );
      text = countrycode?.toUpperCase() + " ITINERARIES"; // action="/countryitineraries?countrycode=south-africa"
    } else if (itemId == "places-to-stay") {
      setIsShowMap(false);
      handleTabClick("images");
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }/${countryData?.attributes?.friendly_url}-places-to-stay`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }/places to stay ${countryData?.attributes?.friendly_url}`
      );
      text = "LUXURY HOTELS, CAMPS & LODGES IN " + countrycode.toUpperCase(); // action="/countryplacetostay?countrycode=south-africa"
    } else if (itemId == "when-to-go") {
      setIsShowMap(false);
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }/${countryData?.attributes?.friendly_url}-when-to-go`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode?.replace(/ /g, "-")}/${
          countryData?.attributes?.friendly_url
        }/when to go to ${countryData?.attributes?.friendly_url}`
      );
      text = "WHEN TO GO TO " + countrycode.toUpperCase(); // action="/countryplacetostay?countrycode=south-africa"
    } else {
      text = "LUXURY SAFARI HOLIDAYS IN " + countrycode.toUpperCase();
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
  };

  const websiteContentCheck = () => {
    homeService
      .getAllWebsiteContent()
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
          } catch (error) {}
        }
      }
    }
  };

  useEffect(() => {
    if (countrycode && countrycode != "undefined") {
      localStorage.setItem("country_code", countrycode);
    }


    if (router.asPath.includes("itineraries")) {
      toggleTab("itineraries");
    } else if (router.asPath.includes("countries")) {
      toggleTab("countries");
    }

    window.scrollTo(0, 0);

    // userService.getAll().then(x => setUsers(x));
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    // const carousel = document.querySelector("#carouselExampleInterval");
    // if (carousel) {
    //   new bootstrap.Carousel(carousel);
    // }

    if (countrycode) {
      countriesService
        .getCountryDetails(countrycode)
        .then((x) => {
          localStorage.setItem(
            "PageInfo",
            JSON.stringify({
              pType: "COUN",
              pCode: x?.data[0]?.attributes?.country_code,
            })
          );
          const filteredData = x.data[0].attributes?.regions?.data?.filter(
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
          setCountryData(x.data[0]);
          setDataToSendToChild(x.data[0]?.attributes);
          setHeadingText("LUXURY HOLIDAYS IN " + countrycode.toUpperCase());
          setFriendlyUrl(`Home/Destinations/${destinationcode}/${countrycode}`);
          const map_latitude = x.data[0].attributes?.map_latitude;
          const map_longitude = x.data[0].attributes?.map_longitude;
          // const map_latitude = "40.7128";
          // const map_longitude = "-74.0060";
          const mapTemp =
            `https://www.google.com/maps/embed/v1/place?q=` +
            map_latitude +
            `,` +
            map_longitude +
            `&key=AIzaSyDIZK8Xr6agksui1bV6WjpyRtgtxK-YQzE`;
          setMapVariable(mapTemp);
          const imageCheck = x.data[0].attributes?.country_images?.data;
          const newBackgroundImages = [];
          imageCheck.forEach((element) => {
            if (element?.attributes?.image_type == "banner") {
              newBackgroundImages.push(element?.attributes?.image_path);
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

    window.onload = () => {
      setTimeout(() => {
        regionWiseUrl +
          `/destinations/${destinationcode?.replace(
            / /g,
            "-"
          )}/${countrycode?.replace(/ /g, "-")}`;
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
        cycle: true,
        pause: "none",
      });
    }, 2000);
  }, [countrycode]);

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <title>
          {dictioneryFunction(countryData?.attributes?.page_meta_title)}
        </title>
        <meta
          content={dictioneryFunction(
            countryData?.attributes?.page_meta_description
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
                      target="_blank"
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      data-bs-interval="3000"
                      data-pause="false"
                      data-ride="carousel"
                    >
                      <div
                        className="banner_commn_cls"
                        style={{ backgroundImage: `url(${imagePath})` }}
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

          {/* Country sub tabs */}
          <section
            className="destination_tab_row light_grey pb-0"
            ref={divRef}
            // id="scrollToElement"
          >
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl
                  data={friendlyUrl.replace(/%20/g, " ")}
                ></FriendlyUrl>
              </div>
              <div className="destination_tab_inr">
                <h2 className="tab_tilte">
                  {dictioneryFunction(headingText.replace(/%20/g, " "))}
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
                        activeTab === "regions" ? "active nav-link" : "nav-link"
                      }
                      onClick={() => toggleTab("regions")}
                      id="pills-countries-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-countries"
                      type="button"
                      role="tab"
                      aria-controls="pills-countries"
                      aria-selected="false"
                    >
                      Regions
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
                  <li className="nav-item" role="presentation">
                    <button
                      className={
                        activeTab === "when-to-go"
                          ? "active nav-link"
                          : "nav-link"
                      }
                      onClick={() => toggleTab("when-to-go")}
                      id="pills-when-to-go-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-when-to-go"
                      type="button"
                      role="tab"
                      aria-controls="pills-when-to-go"
                      aria-selected="false"
                    >
                      When to go
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
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
                  <CountryOverview
                    // data={countryData?.attributes}
                    // sendDataToParent={handleDataFromChild}

                    sendDataToChild={sendDataToChild}
                    onDataFromChild={handleDataFromChild}
                    dataToChild={dataToSendToChild}
                  />
                </div>
              )}
              {activeTab === "regions" && (
                <div
                  className={
                    activeTab === "regions"
                      ? "active show tab-pane fade"
                      : "tab-pane fade"
                  }
                  id="pills-countries"
                  role="tabpanel"
                  aria-labelledby="pills-countries-tab"
                  tabIndex="0"
                  ref={tabContentRefs["regions"]}
                >
                  <CountryRegions
                    data={countryData?.attributes}
                    sendDataToParent={handleDataFromChild}
                  />
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
                  ref={tabContentRefs["itineraries"]}
                >
                  <CountrytItinararies
                    data={countryData?.attributes}
                    sendDataToParent={handleDataFromChild}
                    divRef={divRef}
                  />
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
                  <CountryPlaceToStay
                    data={countryData?.attributes}
                    sendDataToParent={handleDataFromChild}
                    divRef={divRef}
                  />
                </div>
              )}
              {activeTab === "when-to-go" && (
                <div
                  className={
                    activeTab === "when-to-go"
                      ? "active show tab-pane fade"
                      : "tab-pane fade"
                  }
                  id="pills-when-to-go"
                  role="tabpanel"
                  aria-labelledby="pills-when-to-go-tab"
                  tabIndex="0"
                >
                  <CountryWhentogo
                    data={countryData?.attributes}
                    sendDataToParent={handleDataFromChild}
                  />
                </div>
              )}
            </div>
          </section>

          {/* enqury */}
          <section className="make_enqury_row">
            <div className="container">
              <EnquiryButton />
            </div>
          </section>

          {/* newsletter */}
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
