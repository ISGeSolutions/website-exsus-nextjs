import { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { Layout, FriendlyUrl, Signup } from "components";
import {
  userService,
  holidaytypesService,
  destinationService,
  homeService,
} from "services";
import Head from "next/head";
import { useRouter } from "next/router";
import { NavLink } from "components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require("react-responsive-carousel").Carousel;
import CustomMultiValue from "./CustomMultiValue";
import Select, { components } from "react-select";
import { Alert } from "../../components";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { formatPrice } from "../../components/utils/priceFormater";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [holidaytypesDetails, setHolidaytypesDetails] = useState();
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [valueWithBr, setnewValueWithBr] = useState("");
  const [headingText, setHeadingText] = useState(
    "LUXURY SAFARI HOLIDAYS IN AFRICA"
  );
  const [itineraries, setItineraries] = useState([]);
  let [page, setPage] = useState(0); // Current page
  const itemsPerPage = 12; // Number of items to load per page
  const [metaData, setMetaData] = useState([]);
  const [holidayName, setHolidayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [selectedDestinations, setDestinations] = useState("");

  // const [visibleItems, setVisibleItems] = useState(itemsPerPage)
  const router = useRouter();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [title, setTitle] = useState("");
  const [alert, setAlert] = useState(null);
  const [activeItem, setActiveItem] = useState("recommended");
  const [selectedOptionDestination, setSelectedOptionDestination] =
    useState(null);
  const [destinationOptions, setAllDestination] = useState([]);
  const [queryParameters, setQueryParameters] = useState();

  const validationSchema = Yup.object().shape({
    destination: Yup.string(),
  });
  let dictionaryPage = 1;

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const hcode = router?.query?.holidaytypegroup
    ?.replace(/-and-/g, " & ")
    .toLowerCase();

  const width = "250px";
  const styles = {
    control: (provided) => ({
      ...provided,
      width,
    }),
    menu: (provided) => ({
      ...provided,
      width,
    }),
    valueContainer: (provided, state) => ({
      whiteSpace: "nowrap",
      // textOverflow: "ellipsis",
      overflow: "hidden",
      flex: "1 1 0%",
      position: "relative",
    }),
    input: (provided, state) => ({
      ...provided,
      display: "inline",
    }),
  };

  const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = "transparent";
    if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";

    const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "inherit",
      display: "flex ",
    };

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style,
    };

    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <input type="checkbox" checked={isSelected} readOnly />
        {children}
      </components.Option>
    );
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
  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    //  ("closeAlert");
    setAlert(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionCountryChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    if (selectedOption[selectedOption.length - 1]?.value == "Show_all") {
      setSelectedOptionDestination(
        selectedOption.filter((res) => res.value == "Show_all")
      );
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionDestination(
        selectedOption.filter((res) => res.value != "Show_all")
      );
    } else {
      setSelectedOptionDestination(selectedOption);
    }
  };

  const handleFilterClick = (item) => {
    setAlert(null);
    if (selectedDestinations.length == 0) {
      page = 0;
      setItineraries([]);
      setActiveItem(item);
      loadMoreData(item);
    } else {
      page = 0;
      setItineraries([]);
      setActiveItem(item);
      loadMoreDataWithDestination(item, selectedDestinations);
    }
  };

  const generateDynamicLink = (item) => {
    const modifiedDestinationName = item?.attributes?.destination_name
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    const country = item?.attributes?.sub_header_text
      ?.replace(/ /g, "-")
      .toLowerCase();
    return (
      regionWiseUrl +
      `/destinations/${modifiedDestinationName}/itinerary/${country}/${country}-itinerary/${item?.attributes?.friendly_url}`
    );
  };

  const handleRedirect = () => {
    const modifiedDestinationName = item?.attributes?.destination_name
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    const country = item?.attributes?.sub_header_text
      ?.replace(/ /g, "-")
      .toLowerCase();
    router.push(
      regionWiseUrl +
        `/destinations/${modifiedDestinationName}/itinerary/${country}/${country}-itinerary/${item?.attributes?.friendly_url}`
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

  const dynamicLinkCountryHoliday = (typeName) => {
    const modifiedGrpName = holidaytypesDetails?.friendly_url
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    const modifiedtypeName = typeName
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();

    if (typeName) {
      return (
        regionWiseUrl + `/holiday-types/${modifiedGrpName}/${modifiedtypeName}`
      );
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

  useEffect(() => {
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    setSelectedOptionDestination([]);
    holidaytypesService
      .getHolidaytypeDetailsByFriendlyUrl(hcode)
      .then((x) => {
        setTitle(x.data[0].attributes.page_meta_title);

        setHolidaytypesDetails(x.data[0].attributes);
        setFriendlyUrl(
          `home/holiday types/${x.data[0].attributes.friendly_url}`
        );
        setHolidayName(x.data[0].attributes.holiday_type_group_name);
        setTitle(x.data[0].attributes.page_meta_title);

        const imageCheck =
          x.data[0].attributes?.holiday_type_group_images?.data;
        setHolidaytypesDetails(x.data[0].attributes);

        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element?.attributes?.image_type == "banner") {
            newBackgroundImages.push(element?.attributes?.image_path);
          } else if (element.attributes.image_type == "thumbnail") {
          }
        });
        setBackgroundImage(newBackgroundImages);
        newBackgroundImages;
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    holidaytypesService.getDestinationDropDown().then((x) => {
      let arrayOfObjects = [
        {
          destination_code: "Show_all",
          value: "Show_all",
          label: "Show all",
        },
      ];
      arrayOfObjects = [
        ...arrayOfObjects,
        ...x.data?.map((item) => ({
          destination_code: item?.attributes?.destination_code,
          value: item?.attributes?.destination_name,
          label: item?.attributes?.destination_name,
        })),
      ];
      setAllDestination(arrayOfObjects);
    });

    window.addEventListener("resize", equalHeight(true));
    setTimeout(() => {
      // $('.carousel').carousel();
      $(".carousel").carousel({
        interval: 250 * 10,
      });
    }, 2000);
  }, [router, valueWithBr, hcode]);

  return (
    <>
      {alert && alert.message && alert.type && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
      <Head>
        <title>{dictioneryFunction(title)}</title>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider02.js"
        ></script>{" "}
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
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
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
                {/* <a href="#" target="_blank" className="carousel-item active" data-bs-interval="5000">
                            <div className="banner_commn_cls"> */}
                {backgroundImage.map((imagePath, index) => (
                  // <img src={imagePath} alt="holiday_types_detls_card02" className="img-fluid" />
                  <NavLink
                    href="#"
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    data-bs-interval="5000"
                  >
                    <div
                      key={index}
                      className="banner_commn_cls"
                      style={{ backgroundImage: `url(${imagePath})` }}
                    ></div>
                  </NavLink>
                ))}
              </div>
            </div>
          </section>

          <section className="destination_tab_row light_grey">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
              </div>

              <div className="destination_tab_inr">
                <h2 className="tab_tilte">
                  {dictioneryFunction(holidaytypesDetails?.header_text)}
                </h2>
                <div className="destinations_cntnt_blk destination_para pt-0">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dictioneryFunction(
                        holidaytypesDetails?.overview_text
                      ),
                    }}
                  />
                </div>
                <section className="favrites_blk_row favrites_blk_small_card_row mb-0">
                  <h3 className="title_cls">{`DISCOVER YOUR ${dictioneryFunction(
                    holidaytypesDetails?.header_text
                  )}`}</h3>
                  <div className="card_slider_row">
                    <i id="left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        viewBox="0 0 267 512.43"
                      >
                        <path
                          fill-rule="nonzero"
                          d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z"
                        />
                      </svg>
                    </i>
                    <div className="carousel00 region_carousel00">
                      {holidaytypesDetails?.holiday_types?.data?.map(
                        (holiday, i) =>
                          // Add a condition to check if country_name is not null
                          holiday.attributes.holiday_type_name && (
                            <div
                              className="card_slider_inr card_slider_inr_sml"
                              key={holiday?.id}
                            >
                              <NavLink
                                href={dynamicLinkCountryHoliday(
                                  holiday?.attributes.holiday_type_name
                                )}
                              >
                                <div className="card_slider_inr_sml_img">
                                  <img
                                    src={
                                      holiday?.attributes?.holiday_type_images?.data.filter(
                                        (res) =>
                                          res.attributes.image_type ===
                                          "thumbnail"
                                      )[0]?.attributes?.image_path
                                    }
                                    alt={
                                      holiday?.attributes?.holiday_type_images?.data.filter(
                                        (res) =>
                                          res.attributes?.image_type ===
                                          "thumbnail"
                                      )[0]?.attributes?.image_alt_text
                                    }
                                    className="img-fluid"
                                  />
                                </div>
                                <h4>
                                  {holiday.attributes.holiday_type_name}
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
                    {holidaytypesDetails?.holiday_types?.data?.length > 5 ? (
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
                </section>
              </div>
            </div>
          </section>

          {/* Enqury */}
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
      )}
    </>
  );
}
