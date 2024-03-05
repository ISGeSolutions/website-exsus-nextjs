import { useState, useEffect } from "react";
import { destinationService, homeService } from "services";
import Iframe from "react-iframe";
import Head from "next/head";
import React from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import RegionitIneraries from "../regionitineraries/index"; // Adjust the path accordingly
import RegionOverview from "../regionoverview/index"; // Adjust the path accordingly
import RegionPlacesToStay from "../regionplacestostay/index"; // Adjust the path accordingly
import { FriendlyUrl, Signup } from "../../components";
import { ImageSlider } from "../../components/ImageSlider";
import MarkerInfoWindowNext from "../../components/common/MarkerInfoWindowNext";

export default Index;

function Index() {
  const [destinationDetails, setDestinationDetails] = useState();
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [headingText, setHeadingText] = useState("");
  const [mapVariable, setMapVariable] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // State to track the active tab
  const router = useRouter();
  const regionid = router.query.region;
  let dictionaryPage = 1;
  const [destinationName, setdestinationName] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [parentData, setParentData] = useState("");
  const [regionData, setRegionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [activeButton, setActiveButton] = useState("images");
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const destinationcode = router?.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  let regionName = router.query?.region
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const tabContentRefs = {
    overview: useRef(null),
    itineraries: useRef(null),
    "places-to-stay": useRef(null),
  };
  let [isShowMap, setIsShowMap] = useState(true);

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

  // const EnquiryButton = () => {
  //   const router = useRouter();

  //   const handleEnquiryClick = () => {
  //     router.push(regionWiseUrl + `/contact-us`); // Navigate to the /enquiry page
  //   };

  //   return (
  //     <button
  //       className="btn prmry_btn make_enqury_btn"
  //       onClick={handleEnquiryClick}
  //     >
  //       {" "}
  //       Make an enquiry
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="#ffffff"
  //         shapeRendering="geometricPrecision"
  //         textRendering="geometricPrecision"
  //         imageRendering="optimizeQuality"
  //         fillRule="evenodd"
  //         clipRule="evenodd"
  //         viewBox="0 0 267 512.43"
  //       >
  //         <path
  //           fillRule="nonzero"
  //           d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
  //         />
  //       </svg>
  //     </button>
  //   );
  // };

  <button className="btn header_nav_btn">
    MEET OUR EXPERTS
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
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
  </button>;

  const handleDataFromChild = (data) => {
    // Update the parent component's state with data received from the child
    toggleTab(data);
  };

  const handleTabClick = (tab) => {
    setActiveButton(tab);
  };

  const toggleTab = (itemId) => {
    var text;
    setActiveButton("images");

    if (itemId == "overview") {
      setIsShowMap(true);
      handleTabClick("images");
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode.replace(
          / /g,
          "-"
        )}/${countrycode.replace(/ /g, "-")}/${regionName.replace(/ /g, "-")}`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode.replace(
          / /g,
          "-"
        )}/${countrycode.replace(/ /g, "-")}/${regionName.replace(/ /g, "-")}`
      );
      text = regionName;
    } else if (itemId == "itineraries") {
      setIsShowMap(false);
      handleTabClick("images");
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode.replace(
          / /g,
          "-"
        )}/${countrycode.replace(/ /g, "-")}/${regionName.replace(
          / /g,
          "-"
        )}/${regionName.replace(/ /g, "-")}-itineraries`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode.replace(
          / /g,
          "-"
        )}/${countrycode.replace(/ /g, "-")}/${regionName.replace(
          / /g,
          "-"
        )} Itineraries`
      );
      text = `${regionName} ITINERARIES`;
    } else if (itemId == "places-to-stay") {
      setIsShowMap(false);
      handleTabClick("images");
      const redirectUrl =
        regionWiseUrl +
        `/destinations/${destinationcode.replace(
          / /g,
          "-"
        )}/${countrycode.replace(/ /g, "-")}/${regionName.replace(
          / /g,
          "-"
        )}/${regionName.replace(/ /g, "-")}-places-to-stay`;
      window.history.pushState(null, null, redirectUrl);
      setFriendlyUrl(
        `Home/Destinations/${destinationcode.replace(
          / /g,
          "-"
        )}/${countrycode.replace(
          / /g,
          "-"
        )}/Places to stay in ${regionName.replace(/ /g, "-")}`
      );
      text = `LUXURY HOTELS IN THE ${regionName}`;
    } else {
      text = `LUXURY SAFARI HOLIDAYS IN ${regionName}`;
    }
    setHeadingText(text);
    if (activeTab !== itemId) {
      setActiveTab(itemId);
      // window.history.pushState(null, null, redirectUrl); // Update the URL
    }
    const targetDiv = document.getElementById("scrollToElement");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
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

  equalHeight(true);

  const addStringBeforeSecondLastSlash = (inputString, newString) => {
    // Split the string by slashes
    const segments = inputString.split("/");

    // Insert the new string before the second last segment
    segments.splice(-2, 0, newString);

    // Join the segments back into a string
    const resultString = segments.join("/");

    return resultString;
  };

  useEffect(() => {
    const searchString = "itineraries";
    const currentUrl = window.location.href;
    const segments = currentUrl?.split("/");
    if (
      currentUrl.includes(searchString) &&
      !segments[segments.length - 1].includes("intineraries")
    ) {
      const newUrl = addStringBeforeSecondLastSlash(currentUrl, "itinerary");
      router.push(newUrl);
      // console.log(`The URL contains "${searchString}"`);
    } else {
      regionName = segments[segments.length - 1]?.replace(/-and-/g, " & ")
        .replace(/-/g, " ")
        .toLowerCase();;
      if (
        !localStorage.getItem(
          `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
        )
      ) {
        websiteContentCheck(dictionaryPage);
      }
      if (regionName != undefined && regionName != "undefined") {
        localStorage.setItem("region_name", regionName);
      }
      if (destinationcode != undefined) {
        localStorage.setItem("destination_code", destinationcode);
      }
      if (countrycode != undefined) {
        localStorage.setItem("country_code", countrycode);
      }
      window.scrollTo(0, 0);
      // destinationService.getAllItineraries().then(x => {
      //     setItineraries(x.data);
      // });

      // destinationService.getDestinationDetails(destinationcode).then((x) => {
      //   setHeadingText(x.data.attributes.page_meta_title);
      // });

      setFriendlyUrl(
        `home/destinations/${destinationcode?.replace(
          /%20/g,
          "-"
        )}/${countrycode}/${regionName}`
      );

      destinationService
        .getRegionByName(regionName)
        .then((x) => {
          setRegionData(x.data[0]);
          localStorage.setItem(
            "PageInfo",
            JSON.stringify({
              pType: "REGN",
              pCode: x?.data[0]?.attributes?.region_code,
            })
          );
          debugger;

          setHeadingText(x.data[0]?.attributes?.region_name);
          const imageCheck = x.data[0].attributes.region_images.data;
          const newBackgroundImages = [];
          imageCheck.forEach((element) => {
            if (element.attributes.image_type == "banner") {
              newBackgroundImages.push(element.attributes.image_path);
            } else if (element.attributes.image_type == "thumbnail") {
            }
          });
          setBackgroundImage(newBackgroundImages);
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle any errors here
          // console.error(error);
          setIsLoading(false);
        });

      destinationService
        .getRegions(countrycode)
        .then((x) => {
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
            name: item.attributes?.region_name,
            image: item.attributes?.region_images?.data?.filter(
              (res) => res?.attributes?.image_type == "thumbnail"
            )[0]?.attributes?.image_path,
            url:
              regionWiseUrl +
              `/destinations/${destinationcode?.replace(/&/g, "and")
                .replace(/ /g, "-")
                .toLowerCase()}/${x.data[0].attributes?.friendly_url
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
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle any errors here
          // console.error(error);
          setIsLoading(false);
        });



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
          let reName = "";
          let destName = "";
          let countryName = "";
          if (!regionName || regionName == "undefined") {
            reName = localStorage.getItem("region_name");
          } else {
            reName = regionName;
          }
          if (!destinationcode) {
            destName = localStorage.getItem("destination_code");
          } else {
            destName = destinationcode;
          }
          if (!countrycode) {
            countryName = localStorage.getItem("country_code");
          } else {
            countryName = countrycode;
          }
          const redirectUrl =
            regionWiseUrl +
            "/destinations/" +
            destName?.replace(/ /g, "-").replace(/&/g, "and").toLowerCase() +
            "/" +
            countryName
              ?.replace(/ /g, "-")
              .replace(/and/g, "&")
              .replace(/&/g, "and")
              .toLowerCase() +
            "/" +
            reName?.replace(/ /g, "-").replace(/&/g, "and").toLowerCase();

          regionWiseUrl +
            `/ destinations / ${destinationcode?.replace(
              / /g,
              "-"
            )} /${countrycode?.replace(/ /g, "-")}`;
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
    }
  }, [regionName, destinationcode, countrycode]);

  return (
    <>
      <Head>
        <title>
          {dictioneryFunction(regionData?.attributes?.page_meta_title)}
        </title>
        <meta
          content={dictioneryFunction(
            regionData?.attributes?.page_meta_description
          )}
        ></meta>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
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
                <div className="carousel-indicators" id="targetDiv">
                  
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
                      data-bs-interval="5000"
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
                  className={`btn banner_map_tab ${activeButton === "map" ? "banner_tab_active" : ""
                    }`}
                  onClick={() => handleTabClick("map")}
                >
                  Map
                </button>
                <button
                  className={`btn banner_img_tab ${activeButton === "images" ? "banner_tab_active" : ""
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
              className={`banner_map_blk ${activeButton === "map" ? "banner_map_active" : ""
                }`}
            >
              <MarkerInfoWindowNext data={coordinatesArray} />


              {/* src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" */}
            </div>
            {/* <p>{mapVariable}</p> */}
          </section>

          <section className="destination_tab_row light_grey pb-0">
            <div className="container">
              {/* id="targetDiv" */}
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl} />
              </div>

              {/* Regions sub tabs */}
              <div className="destination_tab_inr">
                <h2 className="tab_tilte">
                  {/* {destinationDetails?.header_text} */}
                  {headingText}
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
                  <RegionOverview onDataFromChild={handleDataFromChild} />
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
                  <RegionitIneraries data={regionData?.attributes} />
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
                  <RegionPlacesToStay data={regionData?.attributes} />
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
