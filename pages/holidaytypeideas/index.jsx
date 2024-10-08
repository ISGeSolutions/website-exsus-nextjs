import { useState, useEffect } from "react";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { FriendlyUrl } from "../../components";
import {
  userService,
  holidaytypesService,
  destinationService,
  homeService,
} from "services";
import { Inspireme } from "components";
import { useRouter } from "next/router";
import { NavLink } from "components";
import Head from "next/head";
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
  const [holidayTypes, setholidayTypes] = useState(null);
  const [holidaytypesDetails, setHolidaytypesDetails] = useState();
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [valueWithBr, setnewValueWithBr] = useState("");
  const [headingText, setHeadingText] = useState(
    "LUXURY SAFARI HOLIDAYS IN AFRICA"
  );
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [activeItem, setActiveItem] = useState("recommended");
  let [page, setPage] = useState(0); // Current page
  const [metaData, setMetaData] = useState([]);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const itemsPerPage = 12; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [selectedDestinations, setDestinations] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [alert, setAlert] = useState(null);
  const [queryParameters, setQueryParameters] = useState();
  const [selectedOptionDestination, setSelectedOptionDestination] =
    useState(null);
  const holidaytypename = router.query?.holidaytypeideas
    ?.replace(/-/g, " ")
    .replace(/-and-/g, " & ")
    .toLowerCase();
  const holidayGrpName = router.query?.holidaytypeitineraries
    ?.replace(/-/g, " ")
    .replace(/-and-/g, " & ")
    .toLowerCase();
  const [destinationOptions, setAllDestination] = useState([]);
  let dictionaryPage = 1;

  const validationSchema = Yup.object().shape({
    destination: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

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

  const LoadMorePagination = ({ data }) => {
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  };

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  const handleOptionCountryChange = (selectedOption) => {
    setAlert(null);
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

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  const generateDynamicLink = (item) => {
    const modifiedDestinationName = item?.attributes?.destination_name
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    const country = item?.attributes?.sub_header_text
      ?.replace(/ /g, "-")?.replace(/&/g, "and")
      .toLowerCase();
    return (
      regionWiseUrl +
      `/destinations/${modifiedDestinationName}/${country}/${country}-itineraries/${item?.attributes?.friendly_url}`
    );
  };

  const handleRedirect = (item) => {
    const modifiedDestinationName = item?.attributes?.destination_name
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    const country = item?.attributes?.sub_header_text
      ?.replace(/ /g, "-")?.replace(/&/g, "and")
      .toLowerCase();
    router.push(
      regionWiseUrl +
      `/destinations/${modifiedDestinationName}/${country}/${country}-itineraries/${item?.attributes?.friendly_url}`
    );
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

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    //  ("closeAlert");
    setAlert(null);
  };

  const loadMoreData = (item) => {
    setAlert(null);
    holidaytypesService
      .getItinerariesByHolidayTypes(page + 1, holidaytypename, region, item)
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

  const equalHeight = (resize) => {
    var elements = document.getElementsByClassName(
      "card_slider_cnt places_to_stay_cnt1"
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
          } catch (error) { }
        }
      }
    }
  };

  equalHeight(true);

  useEffect(() => {

    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    // holidaytypesService.getAll().then(x => {

    //     const desiredKey = 1; // The desired key to access
    //     const desiredHolidayTypes = x.find(item => item.id == desiredKey);
    //     setholidayTypes(desiredHolidayTypes.holiday_type_translations[0].holiday_type_overview_text);
    // });

    // destinationService
    //   .getAllItineraries()
    //   .then((x) => {
    //     //setItineraries(x.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //   });

    holidaytypesService
      .getHolidaytypeDetailsById(holidaytypename)
      .then((x) => {
        localStorage.setItem(
          "PageInfo",
          JSON.stringify({
            pType: "HTYP",
            pCode: x?.data[0]?.attributes?.holiday_type_code,
          })
        );
        setTitle(x.data[0].attributes?.page_meta_title);
        setHolidaytypesDetails(x.data[0].attributes);
        setFriendlyUrl(
          `home/holiday-types/${holidayGrpName}/${holidaytypename}`
        );
        //  ()
        const oldText = x.data[0].attributes?.overview_text;
        var newValueWithBr = oldText?.replace(/\\n/g, "");
        setnewValueWithBr(newValueWithBr);
        const imageCheck = x.data[0].attributes.holiday_type_images.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element.attributes.image_path);
            // setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data.attributes.holiday_type_images.data[0].attributes.image_path);
          } else if (element.attributes.image_type == "thumbnail") {
            // setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data.attributes.holiday_type_images.data[0].attributes.image_path);
          }
        });
        setBackgroundImage(newBackgroundImages);
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
      setSelectedOptionDestination(arrayOfObjects[0]);
      // setAllDestination(
      //   x.data?.map((item) => ({
      //     //id: i.id,
      //     destination_code: item?.attributes?.destination_code,
      //     value: item?.attributes?.destination_name,
      //     label: item?.attributes?.destination_name,
      //   }))
      // );
    });

    loadMoreData(activeItem);

    window.addEventListener("resize", equalHeight(true));
  }, [holidaytypename, router]);

  return (
    <>
      <Head>
        <title>{dictioneryFunction(title)}</title>
      </Head>
      {alert && alert.message && alert.type && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
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
                  <NavLink
                    href="#"
                    onClick={handleHrefClick}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    data-bs-interval="5000"
                  >
                    <div
                      className="banner_commn_cls"
                      style={{ backgroundImage: `url(${imagePath})` }}
                    ></div>
                  </NavLink>
                ))}
              </div>
            </div>
          </section>

          <section className="destination_tab_row light_grey pb-0">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
              </div>

              <div className="destination_tab_inr">
                <h2 className="tab_tilte">
                  {holidaytypesDetails?.header_text}
                </h2>
                <div className="destinations_cntnt_blk destination_para pt-0">
                  <p dangerouslySetInnerHTML={{ __html: dictioneryFunction(valueWithBr) }} />
                </div>
              </div>
            </div>
          </section>

          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">
                TOP DESTINATIONS FOR {dictioneryFunction(holidaytypesDetails?.header_text)}
              </h3>
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-12 col-md-8 col-lg-6 col-xl-5 m-auto">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="banner_dropdwn_blk single_dropdwn_blk">
                            <Select
                              id="long-value-select"
                              instanceId="long-value-select"
                              className="select_container_country"
                              classNamePrefix="select_country"
                              placeholder={"Filter by destinations "}
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
                          {holidaytypesDetails?.header_text}
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

                    {/* {itineraries?.map((item) => ( */}
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
                                        key={element.id}
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
                                  <li>
                                    {dictioneryFunction(
                                      item?.attributes?.sub_header_text
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
                                  {dictioneryFunction(
                                    item?.attributes?.no_of_nites_notes
                                  )}
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
        </div>
      )}
    </>
  );
}
