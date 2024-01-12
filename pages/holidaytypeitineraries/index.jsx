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

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const hcode = router?.query?.holidaytypeitineraries
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
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

  // const EnquiryButton = () => {
  //   const router = useRouter();

  //   const handleEnquiryClick = () => {
  //     router.push(regionWiseUrl + "/contact-us"); // Navigate to the /enquiry page
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

  // const LoadMorePagination = ({ data }) => {
  //     const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  // }

  // const handleLoadMore = () => {

  //     setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
  // };

  const optionsData = [
    { value: "", label: "Filter by destination" },
    { value: "Everything", label: "Everything" },
    { value: "Barefoot", label: "Barefoot" },
    { value: "Beach", label: "Beach" },
    { value: "Boutique hotel", label: "Boutique hotel" },
    { value: "Chic design", label: "Chic design" },
    { value: "Cultural Immersion", label: "Cultural Immersion" },
    { value: "Eco tourism", label: "Eco tourism" },
    { value: "Family-Friendly", label: "Family-Friendly" },
    { value: "Food & Wine", label: "Food & Wine" },
    { value: "Guiding", label: "Guiding" },
    { value: "Hideaway", label: "Hideaway" },
    { value: "Honeymoon", label: "Honeymoon" },
    { value: "Lodge", label: "Lodge" },
    { value: "Luxury hotel", label: "Luxury Hotel" },
    { value: "Off the beaten track", label: "Off the beaten track" },
    { value: "Owner run", label: "Owner run" },
    { value: "Peace & quiet", label: "Peace & quiet" },
    { value: "Private groups", label: "Private groups" },
    { value: "Romantic", label: "Romantic" },
    { value: "Rustic", label: "Rustic" },
    { value: "Seriously special", label: "Seriously special" },
    { value: "Service & Hospitality", label: "Service & Hospitality" },
    { value: "Setting & Views", label: "Setting & Views" },
    { value: "Snorkelling & Driving", label: "Snorkelling & Driving" },
    { value: "Spa & Wellness", label: "Spa & Wellness" },
    { value: "Unusal", label: "Unusal" },
    { value: "Village life", label: "Village life" },
    { value: "Walking & trekking", label: "Walking & trekking" },
    { value: "Water activities", label: "Water activities" },
    { value: "Wildlife & Nature", label: "Wildlife & Nature" },
    { value: "Adventure", label: "Adventure" },
    { value: "Couples", label: "Couples" },
    { value: "Educational", label: "Educational" },
    { value: "Multi-activity", label: "Multi-activity" },
    { value: "Teenagers", label: "Teenagers" },
    { value: "Landscapes & Scenery", label: "Landscapes & Scenery" },
    { value: "City hotel", label: "City hotel" },
  ];

  // let regionWiseUrl = "/uk";
  // let region = "uk";
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
    // console.log("closeAlert");
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
      setSelectedOptionDestination(selectedOption.filter(res => res.value == "Show_all"));
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionDestination(selectedOption.filter(res => res.value != "Show_all"));
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

  const loadMoreData = (item) => {
    setAlert(null);
    holidaytypesService
      .getItinerariesByHolidayTypeGroup(page + 1, hcode, region, item)
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
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const loadMoreDataWithDestination = (item, destinations) => {
    holidaytypesService
      .getItinerariesByDestinations(page + 1, destinations, region, item)
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
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  function onSubmit() {
    if (selectedOptionDestination.length == 0) {
      showAlert("Please select atleast one option", "error");
      setQueryParameters(null);
      reset();
    } else {
      page = 0;
      let destinationArray = [];
      selectedOptionDestination?.forEach((res) => {
        destinationArray.push(res.destination_code);
      });
      setDestinations(destinationArray);
      setItineraries([]);
      loadMoreDataWithDestination(activeItem, destinationArray);
    }
  }

  // const generateDynamicLink = (item) => {
  //   return (
  //     regionWiseUrl +
  //     `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=${region}`
  //   );
  // };

  const selectedSec = (itemId) => {
    var text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
    if (itemId == "overview") {
      text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
    } else if (itemId == "countries") {
      text = "COUNTRIES IN AFRICA";
    } else if (itemId == "itineraries") {
      text = "TAILOR-MADE AFRICA HOLIDAY ITINERARIES";
    } else if (itemId == "places_to_stay") {
      text = "PLACES TO STAY IN AFRICA";
    } else {
      text = "LUXURY SAFARI HOLIDAYS IN AFRICA";
    }
    setHeadingText(text);
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
    setSelectedOptionDestination([]);
    holidaytypesService
      .getHolidaytypeDetails(hcode)
      .then((x) => {
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
        console.log(newBackgroundImages);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    holidaytypesService
      .getHolidaytypeDetails(hcode)
      .then((x) => {
        setTitle(x.data.attributes.page_meta_title);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    holidaytypesService.getDestinationDropDown().then((x) => {

      let arrayOfObjects = [{
        destination_code: "Show_all",
        value: "Show_all",
        label: "Show all",
      }];
      arrayOfObjects = [...arrayOfObjects, ...x.data?.map((item) => ({
        destination_code: item?.attributes?.destination_code,
        value: item?.attributes?.destination_name,
        label: item?.attributes?.destination_name,
      }))];
      setAllDestination(arrayOfObjects);
    });

    loadMoreData(activeItem);

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
        <title>{title}</title>
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
                    href=""
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
                  {holidaytypesDetails?.header_text}
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
              </div>
            </div>
          </section>

          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">TOP DESTINATIONS FOR {holidayName}</h3>

              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-12 col-md-8 col-lg-6 col-xl-5 m-auto">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="banner_dropdwn_blk">
                            <Select
                              id="long-value-select"
                              instanceId="long-value-select"
                              className="select_container_country"
                              classNamePrefix="select_country"
                              placeholder={"Filter by destination "}
                              styles={styles}
                              isMulti
                              isDisabled={isDisabled}
                              isLoading={isLoader}
                              isClearable={isClearable}
                              isRtl={isRtl}
                              isSearchable={isSearchable}
                              value={selectedOptionDestination}
                              onChange={handleOptionCountryChange}
                              closeMenuOnSelect={false}
                              hideSelectedOptions={false}
                              options={destinationOptions}
                              components={{
                                Option: InputOption,
                                MultiValue: CustomMultiValue,
                              }}
                            />
                            {/* <div className="banner_dropdwn_blk ps-0 ps-md-2">
                            </div> */}
                          </div>
                          <div className="banner_inspire_btn ps-0 ps-md-2">
                            <button
                              type="submit"
                              className="btn btn-primary prmry_btn"
                            >
                              Inspire me
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
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="col-12">
                      <div className="destination_filter_result d-block d-lg-flex">
                        <p>
                          We've found {metaData?.total} destinations for{" "}
                          {holidayName}
                        </p>
                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                          <label className="pt-2 pt-lg-0">Arrange by:</label>
                          <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                            <li>
                              <a
                                className={
                                  activeItem === "price" ? "active" : ""
                                }
                                onClick={() => handleFilterClick("price")}
                              >
                                Price
                              </a>
                            </li>
                            <li>
                              <a
                                className={
                                  activeItem === "recommended" ? "active" : ""
                                }
                                onClick={() => handleFilterClick("recommended")}
                              >
                                Recommended
                              </a>
                            </li>
                            <li>
                              <a
                                className={
                                  activeItem === "alphabetical" ? "active" : ""
                                }
                                onClick={() =>
                                  handleFilterClick("alphabetical")
                                }
                              >
                                Alphabetical
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

                    {/* HolidayType Itineraries */}
                    {itineraries
                      ?.slice(0, itineraries.length)
                      .map((item, index) => (
                        <div
                          className="col-sm-6 col-lg-4 col-xxl-3"
                          key={index}
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
                                {/* <NavLink
                                  href={generateDynamicLink(item)}
                                ></NavLink> */}
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
                                        {`From ${res1.attributes?.currency_symbol ?? ""
                                          }${formatPrice(res1.attributes?.price) ?? " xxxx"
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
                              <button className="btn card_slider_btn">
                                <span>
                                  {dictioneryFunction(
                                    item?.attributes?.no_of_nites_notes
                                  )}
                                </span>
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

                    {/* Pagination */}
                    <div className="col-12">
                      {metaData.total > page * itemsPerPage && (
                        <button
                          onClick={() => {
                            if (selectedDestinations.length === 0) {
                              loadMoreData(activeItem);
                            } else {
                              loadMoreDataWithDestination(
                                activeItem,
                                selectedDestinations
                              );
                            }
                          }}
                          className="btn prmry_btn make_enqury_btn mx-auto text-uppercase"
                          fdprocessedid="r5vpm6s"
                        >
                          Show{" "}
                          {metaData.total - page * itemsPerPage > 12
                            ? 12
                            : metaData.total - page * itemsPerPage > 12}{" "}
                          more items
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
