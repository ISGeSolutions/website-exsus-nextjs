import React, { useState, useEffect } from "react";
import {
  destinationService,
  homeService,
  alertService,
  userService,
  blogsService,
} from "services";
import { NavLink } from "components";
import { useRouter } from "next/router";
// import stylesCon from './ContinentItenararies.module.css';
import Select, { components } from "react-select";
import CustomMultiValue from "./CustomMultiValue";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, FriendlyUrl } from "../../components";
import { formatPrice } from "../../components/utils/priceFormater";

export default ContinentItinararies;

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

function ContinentItinararies(props) {
  console.log(props);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [visible, setVisible] = useState(3);
  const [visiblePagination, setVisiblePagination] = useState(true);
  const itemsPerPage = 12; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  let [page, setPage] = useState(0); // Current page
  const [metaData, setMetaData] = useState([]);
  const router = useRouter();
  const [dcode, setdcode] = useState();
  const destinationcode = router.query.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const [countryOptions, setAllCountries] = useState([]);
  const [regionOptions, setAllRegion] = useState([]);
  const [destination, setdestination] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");
  const [alert, setAlert] = useState("");
  const { divRef } = props;

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

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    // console.log("closeAlert");
    setAlert(null);
    // setAlert("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadMoreData = (item) => {
    if (
      !selectedOptionCountry.length > 0 &&
      !selectedOptionRegion.length > 0 &&
      !selectedOptionMonth.length > 0
    ) {
      setIsLoading(true);
      destinationService
        .getItinerariesByDestination(dcode, page + 1, item, region)
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
    } else {
      setIsLoading(true);
      destinationService
        .ItineraryFilterOnDestItineraryDetail(
          selectedOptionCountry,
          selectedOptionRegion,
          selectedOptionMonth,
          item,
          region,
          page + 1
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
            console.log(itineraries);
            setPage(page + 1);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    // console.log(page);
  };

  // const countryOptions = [
  //     { value: "Asia", label: "Asia" },
  //     { value: "Hong Kong & Macau", label: "Hong Kong & Macau" },
  //     { value: "Malaysia & Borneo", label: "Malaysia & Borneo" },
  //     { value: "Singapore", label: "Singapore" },
  //     { value: "Indonesia", label: "Indonesia" },
  //     { value: "Japan", label: "Japan" },
  //     { value: "Cambodia", label: "Cambodia" },
  //     { value: "Vietnam", label: "Vietnam" },
  //     { value: "China", label: "China" },
  //     { value: "Thailand", label: "Thailand" },
  //     { value: "Burma", label: "Burma" },
  //     { value: "Laos", label: "Laos" }
  // ];

  const monthOptions = [
    { value: "Show_all", label: "All months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const LoadMorePagination = ({ data }) => {
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  };

  const handleOptionCountryChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    if (selectedOption[selectedOption.length - 1]?.value == "Show_all") {
      setSelectedOptionCountry(selectedOption.filter(res => res.value == "Show_all"));
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionCountry(selectedOption.filter(res => res.value != "Show_all"));
    } else {
      setSelectedOptionCountry(selectedOption);
    }
  };

  const handleOptionRegionChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    if (selectedOption[selectedOption.length - 1]?.value == "Show_all") {
      setSelectedOptionRegion(selectedOption.filter(res => res.value == "Show_all"));
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionRegion(selectedOption.filter(res => res.value != "Show_all"));
    } else {
      setSelectedOptionRegion(selectedOption);
    }
  };

  const handleOptionMonthChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    if (selectedOption[selectedOption.length - 1]?.value == "Show_all") {
      setSelectedOptionMonth(selectedOption.filter(res => res.value == "Show_all"));
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionMonth(selectedOption.filter(res => res.value != "Show_all"));
    } else {
      setSelectedOptionMonth(selectedOption);
    }
  };

  function onSubmit(data) {
    data.preventDefault();
    console.log("Selected Countries:", selectedOptionCountry);
    console.log("Selected Regions:", selectedOptionRegion);
    console.log("Selected Months:", selectedOptionMonth);
    // console.log(data);
    if (
      !selectedOptionCountry.length > 0 &&
      !selectedOptionRegion.length > 0 &&
      !selectedOptionMonth.length > 0
    ) {
      showAlert("Please select atleast one option", "error");
    } else {
      setItineraries([]);
      page = 0;
      loadMoreData(activeItem);
    }
  }

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/destinations/${destinationcode}/itinerary/${destinationcode}-itineraries/${item?.attributes?.friendly_url}`
    );
  };

  const handleRedirect = (item) => {
    // const modifiedName = item.replace(/ /g, "-").toLowerCase();
    router.push(
      regionWiseUrl +
      `/destinations/${destinationcode}/itinerary/${destinationcode}-itineraries/${item?.attributes?.friendly_url}`
    );
  };

  const handleFilterClick = (item) => {
    setAlert(null);
    page = 0;
    setItineraries([]);
    setActiveItem(item);
    loadMoreData(item);
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

  equalHeight(true);

  useEffect(() => {
    if (!localStorage.getItem(`websitecontent_${region.replace(
      /in/g,
      "INDIA"
    ).toLowerCase()}`)) {
      websiteContentCheck();
    }
    setSelectedOptionCountry([]);
    setSelectedOptionRegion([]);
    setSelectedOptionMonth([]);
    destinationService
      .getDestinationDetails(destinationcode)
      .then((x) => {
        debugger
        setdestination(x.data[0].attributes);
        setdcode(x.data[0].attributes.destination_code);
        loadMoreData(activeItem);
        
        let arrayOfObjects = [{
          destination_code: "Show_all",
          value: "Show_all",
          label: x.data[0].attributes.destination_name,
        }];
        arrayOfObjects = [...arrayOfObjects, ...x.data[0]?.attributes?.countries?.data.map((item) => ({
            id: item.id,
            country_code: item?.attributes?.country_code,
            value: item?.attributes?.country_name,
            label: item?.attributes?.country_name,
        }))];
        setAllCountries(arrayOfObjects);

        // setAllCountries(
        //   x.data[0]?.attributes?.countries?.data.map((item) => ({
        //     id: item.id,
        //     country_code: item?.attributes?.country_code,
        //     value: item?.attributes?.country_name,
        //     label: item?.attributes?.country_name,
        //   }))
        // );
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    destinationService.getPropertyTypeDropDown().then((x) => {
      
      let arrayOfObjects = [{
        property_type_code: "Show_all",
        value: "Show_all",
        label: "Everything"
      }];
      arrayOfObjects = [...arrayOfObjects, ...x.data?.map((item) => ({
        property_type_code: item?.attributes?.property_type_code,
          value: item?.attributes?.property_type_name,
          label: item?.attributes?.property_type_name,
      }))];
      setAllRegion(arrayOfObjects);
      // setAllRegion(
      //   x.data?.map((item) => ({
      //     //id: i.id,
      //     property_type_code: item?.attributes?.property_type_code,
      //     value: item?.attributes?.property_type_name,
      //     label: item?.attributes?.property_type_name,
      //   }))
      // );
    });

    // window.addEventListener("resize", equalHeight(true));

    // Using window.onload to detect full page load

    window.onload = () => {
      setTimeout(() => {
        const redirectUrl = `${regionWiseUrl}/destinations/${destinationcode}`;

        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
    // divRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [destinationcode, router, dcode]);

  return (
    <>
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
          <div className="container">
            <section className="destination_para">
              <div
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(
                    destination.itineraries_intro_text
                  ),
                }}
              />
            </section>
          </div>
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">
                All Luxury Holiday Ideas in {destination.destination_name}
              </h3>

              {/* Inspire Me */}
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    <form onSubmit={onSubmit}>
                      <div className="col-12">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="dropdown_grp_blk">
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                              <Select
                                id="long-value-select"
                                instanceId="long-value-select"
                                classNamePrefix="select_country"
                                className="select_container_country"
                                placeholder={"Filter by country"}
                                styles={styles}
                                isMulti
                                isDisabled={isDisabled}
                                isLoading={isLoader}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                value={selectedOptionCountry}
                                onChange={handleOptionCountryChange}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                options={countryOptions}
                                components={{
                                  Option: InputOption,
                                  MultiValue: CustomMultiValue,
                                }}
                              />
                            </div>
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                              <Select
                                placeholder={"Filter by reason"}
                                className="select_container_country"
                                classNamePrefix="select_country"
                                isDisabled={isDisabled}
                                isLoading={isLoader}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                hideSelectedOptions={false}
                                styles={styles}
                                closeMenuOnSelect={false}
                                isSearchable={isSearchable}
                                options={regionOptions}
                                isMulti
                                value={selectedOptionRegion}
                                onChange={handleOptionRegionChange}
                                components={{
                                  Option: InputOption,
                                  MultiValue: CustomMultiValue,
                                }}
                              />
                            </div>
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                              <Select
                                placeholder={"Filter by month"}
                                className="select_container_country"
                                classNamePrefix="select_country"
                                isDisabled={isDisabled}
                                isLoading={isLoader}
                                isClearable={isClearable}
                                styles={styles}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                closeMenuOnSelect={false}
                                options={monthOptions}
                                hideSelectedOptions={false}
                                isMulti
                                value={selectedOptionMonth}
                                onChange={handleOptionMonthChange}
                                components={{
                                  Option: InputOption,
                                  MultiValue: CustomMultiValue,
                                }}
                              />
                            </div>
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
                          We've found {metaData.total} holiday ideas in{" "}
                          {destination.destination_name} for you
                        </p>
                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                          <label className="pt-2 pt-lg-0">Arrange by:</label>
                          <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                            {/* <li><a className={activeItem === 'price' ? 'active' : ''} onClick={() => handleFilterClick('price')}>By price</a></li> */}
                            <li>
                              <div>
                                <a
                                  className={
                                    activeItem === "recommended" ? "active" : ""
                                  }
                                  onClick={() =>
                                    handleFilterClick("recommended")
                                  }
                                >
                                  Recommended
                                </a>
                              </div>
                            </li>
                            <li>
                              <div>
                                <a
                                  className={
                                    activeItem === "alphabetical"
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() =>
                                    handleFilterClick("alphabetical")
                                  }
                                >
                                  Alphabetical
                                </a>
                              </div>
                            </li>
                            <li>
                              <div>
                                <a
                                  className={
                                    activeItem === "duration" ? "active" : ""
                                  }
                                  onClick={() => handleFilterClick("duration")}
                                >
                                  By duration
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Continent Itineraries */}
                    {itineraries?.slice(0, itineraries.length).map((item) => (
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
                                      alt={element.attributes.image_alt_text}
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
                              // href={generateDynamicLink(
                              //   item?.attributes?.itin_name
                              // )}
                              >
                              </NavLink> */}
                              <ul>
                                <li>{item?.attributes?.sub_header_text}</li>
                                {item?.attributes?.itinerary_country_contents?.data
                                  .filter(
                                    (res) =>
                                      res.attributes.website_country.toLowerCase() ===
                                      region.replace(/in/g, "india")
                                  )
                                  .map((res1) => (
                                    <li key={res1.id}>
                                      {`From ${res1.attributes?.currency_symbol ?? ""
                                        }${formatPrice(res1.attributes?.price) ?? "xxxx"
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
                              <span>{item?.attributes?.no_of_nites_notes}</span>
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
                          type="button"
                          onClick={() => loadMoreData(activeItem)}
                          className="btn prmry_btn make_enqury_btn mx-auto text-uppercase"
                          fdprocessedid="r5vpm6s"
                        >
                          Show{" "}
                          {metaData.total - page * itemsPerPage > 12
                            ? 12
                            : metaData.total - page * itemsPerPage}{" "}
                          more holiday
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
                            />
                          </svg>
                        </button>
                      )}
                    </div>
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
