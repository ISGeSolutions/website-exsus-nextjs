import { useState, useEffect, useRef } from "react";
import { Link, Spinner, Signup } from "components";
import {
  destinationService,
  alertService,
  userService,
  homeService,
} from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import generateDynamicLink from "components/utils/generateLink";
import Image from "next/image";
import Select, { components } from "react-select";
import CustomMultiValue from "./CustomMultiValue";
import { Alert } from "../../components";
import Iframe from "react-iframe";
import MarkerInfoWindowNext from "../../components/common/MarkerInfoWindowNext";

export default RegionPlacesToStay;

function RegionPlacesToStay(props) {
  props;
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsisLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
  const [itineraries, setItineraries] = useState(null);
  const router = useRouter();
  const [destinationName, setdestinationName] = useState("");
  const itemsPerPage = 12; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  let [page, setPage] = useState(0); // Current page
  const [metaData, setMetaData] = useState([]);
  const [dcode, setdcode] = useState();
  const [alert, setAlert] = useState(null);
  const [allHotels, setAllHotels] = useState([]);
  const [countryOptions, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  let dictionaryPage = 1;
  const [modalKey, setModalKey] = useState(0);
  let [regionName, setRegionName] = useState("");

  const destinationcode = router?.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const regionFrdUrl = router.query?.region;

  const [regionOptions, setAllRegion] = useState([]);
  const newItemsRef = useRef([]);

  const monthOptions = [
    { value: "Show_all", label: "All year" },
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
        region = window.site_region;
        regionWiseUrl = "/" + window.site_region;
      }
    }
  }

  const handleFilterClick = (item) => {
    setAlert(null);
    page = 0;
    setAllHotels([]);
    setCoordinatesArray([]);
    setModalKey(0);
    setActiveItem(item);
    loadMoreData(item);
  };

  const handleOptionRegionChange = (selectedOption) => {
    setAlert(null);
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    if (selectedOption[selectedOption.length - 1]?.value == "Show_all") {
      setSelectedOptionRegion(
        selectedOption.filter((res) => res.value == "Show_all")
      );
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionRegion(
        selectedOption.filter((res) => res.value != "Show_all")
      );
    } else {
      setSelectedOptionRegion(selectedOption);
    }
  };

  const handleOptionMonthChange = (selectedOption) => {
    setAlert(null);
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    if (selectedOption[selectedOption.length - 1]?.value == "Show_all") {
      setSelectedOptionMonth(
        selectedOption.filter((res) => res.value == "Show_all")
      );
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionMonth(
        selectedOption.filter((res) => res.value != "Show_all")
      );
    } else {
      setSelectedOptionMonth(selectedOption);
    }
  };



  // const handleRedirect = (item) => {
  //   return regionWiseUrl + `/hotel-detail?hotelid=${item}`;
  // };
  // const generateDynamicLink = (item) => {
  //   return regionWiseUrl + `/hotel-detail?hotelid=${item}`;
  // };

  const generateDynamicLink = (item) => {
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

  const handleRedirect = (item) => {
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
            .toLowerCase()}/${item?.attributes?.friendly_url}`
    );
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    //  ("closeAlert");
    setAlert(null);
  };

  function onSubmit(e) {
    e.preventDefault();
    //  ("Selected Countries:", selectedOptionCountry);
    //  ("Selected Regions:", selectedOptionRegion);
    //  ("Selected Months:", selectedOptionMonth);
    if (!selectedOptionRegion.length > 0 && !selectedOptionMonth.length > 0) {
      showAlert("Please select atleast one option", "error");
    } else {
      setAllHotels([]);
      setCoordinatesArray([]);
      setModalKey(0);
      page = 0;
      loadMoreData(activeItem);
    }
  }

  const loadMoreData = (item) => {
    if (!selectedOptionRegion?.length > 0 && !selectedOptionMonth?.length > 0) {
      setIsLoading(true);

      destinationService
        .getRegionWiseHotels(page + 1, regionFrdUrl, item, region)
        .then((response) => {
          setMetaData(response.meta.pagination);
          const newHotels = response?.data;
          if (newHotels.length > 0) {
            setAllHotels((prevItineraries) =>
              [...prevItineraries, ...newHotels].reduce(
                (accumulator, current) =>
                  accumulator.some((item) => item.id === current.id)
                    ? accumulator
                    : [...accumulator, current],
                []
              )
            );
            newItemsRef.current = [];
            setPage(page + 1);
          }
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
          setTimeout(() => {
            if (newItemsRef.current.length > 0 && allHotels?.length > 0) {
              newItemsRef?.current[0]?.scrollIntoView();
            }
          }, 0);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      destinationService
        .HotelFilterOnRegionDetail(
          selectedOptionRegion,
          selectedOptionMonth,
          item,
          region,
          page + 1,
          regionFrdUrl
        )
        .then((response) => {
          setMetaData(response.meta.pagination);
          const newItineraries = response.data;
          if (newItineraries.length > 0) {
            setAllHotels((prevItineraries) =>
              [...prevItineraries, ...newItineraries].reduce(
                (accumulator, current) =>
                  accumulator.some((item) => item.id === current.id)
                    ? accumulator
                    : [...accumulator, current],
                []
              )
            );
            newItemsRef.current = [];
            setPage(page + 1);
          }
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
          setTimeout(() => {
            if (newItemsRef.current.length > 0 && allHotels?.length > 0) {
              newItemsRef?.current[0]?.scrollIntoView();
            }
          }, 0);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
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


  useEffect(() => {
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    setSelectedOptionRegion([]);
    setSelectedOptionMonth(monthOptions[0]);

    destinationService
      .getRegionByName(regionFrdUrl)
      .then((x) => {
        setRegionData(x.data[0].attributes);
        setRegionName(x.data[0]?.attributes?.region_name);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    // destinationService
    //   .getDestinationDetails(destinationcode)
    //   .then((x) => {
    //     setdestinationName(x.data.attributes.destination_name);
    //     setAllCountries(
    //       x.data?.attributes?.countries?.data.map((item) => ({
    //         id: item.id,
    //         country_code: item?.attributes?.country_code,
    //         value: item?.attributes?.country_name,
    //         label: item?.attributes?.country_name,
    //       }))
    //     );
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     // Handle any errors here
    //     // console.error(error);
    //     setIsLoading(false);
    //   });

    destinationService.getPropertyTypeDropDown().then((x) => {
      let arrayOfObjects = [
        {
          property_type_code: "Show_all",
          value: "Show_all",
          label: "Everything",
        },
      ];
      arrayOfObjects = [
        ...arrayOfObjects,
        ...x.data?.map((item) => ({
          property_type_code: item?.attributes?.property_type_code,
          value: item?.attributes?.property_type_name,
          label: item?.attributes?.property_type_name,
        })),
      ];
      setAllRegion(arrayOfObjects);
      setSelectedOptionRegion(arrayOfObjects[0]);

    });

    loadMoreData(activeItem);

    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {

        const redirectUrl =
          regionWiseUrl +
          "/destinations/" +
          destinationcode
            ?.replace(/ /g, "-")
            .replace(/&/g, "and")
            .toLowerCase() +
          "/" +
          countrycode.replace(/ /g, "-").replace(/&/g, "and").toLowerCase() +
          "/" +
          regionName?.attributes?.region_name
            ?.replace(/ /g, "-")
            .replace(/&/g, "and")
            .toLowerCase();

        regionWiseUrl +
          `/ destinations / ${destinationcode?.replace(
            / /g,
            "-"
          )} /${countrycode?.replace(/ /g, "-")}/${regionName}`;
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [router, destinationcode, countrycode, regionName]);

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
              <p
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(
                    regionData?.places_to_stay_intro_text?.replace(/\n/g, ''),
                  ),
                }}
              />
            </section>
          </div>

          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls text_lowercase">
                All recommended hotels in {regionName?.replace(/\b\w/g, (char) => char.toUpperCase())}
              </h3>
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00 dropdown_width100">
                  <div className="row">
                    <div className="col-12">
                      <form onSubmit={onSubmit} className="form_padg">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="dropdown_grp_blk dropdown_grp_doubl">
                            <div className="banner_dropdwn_blk">
                              <Select
                                placeholder={"Filter by property type"}
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
                                placeholder={"Filter by date of travel"}
                                className="select_container_country"
                                classNamePrefix="select_country"
                                isDisabled={isDisabled}
                                isLoading={isLoader}
                                isClearable={isClearable}
                                styles={styles}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                name="color"
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
                      </form>
                    </div>
                    <div className="col-12">
                      <div className="destination_filter_result d-block d-lg-flex">
                        <p>
                          We've found {metaData?.total} hotels in{" "}
                          {destinationName} for you
                          <button
                            type="button"
                            className="btn btn-primary modal_link_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#placesToStayModal"
                          >
                            See all accomodations on Map
                          </button>
                        </p>
                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                          <label className="pt-2 pt-lg-0">Arrange by:</label>
                          <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
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
                          </ul>
                        </div>
                      </div>
                    </div>
                    {allHotels?.slice(0, allHotels.length).map((item, ind) => (
                      <div
                        className="col-sm-6 col-lg-4 col-xxl-3"
                        key={item.id}
                        ref={ind >= allHotels.length - 12 ? el => newItemsRef.current.push(el) : null}
                      >
                        <div className="card_slider_inr">
                          <div className="card_slider">
                            <NavLink
                              href={generateDynamicLink(item)}
                              className="card_slider_img"
                              key={item.id}
                            >
                              {item?.attributes?.hotel_images?.data.map(
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
                              {/* <img src="" alt="destination_hotel01" className="img-fluid" /> */}
                            </NavLink>
                            <div className="card_slider_cnt places_to_stay_cnt">
                              <h4 key={item.id}>
                                <a href={generateDynamicLink(item)}>
                                  {dictioneryFunction(
                                    item?.attributes?.hotel_name
                                  )}
                                </a>
                              </h4>
                              <ul>
                                <li>Location: {item?.attributes?.location}</li>
                                {item?.attributes?.hotel_country_contents?.data?.map(
                                  (item) => {
                                    return (
                                      <li className="price_guide_tooltip">
                                        Price guide:
                                        <span
                                          key={item?.id}
                                          tabIndex="0"
                                          data-title={
                                            item?.attributes?.price_guide_text
                                          }
                                        >
                                          {item?.attributes?.currency_symbol.repeat(
                                            Math.abs(
                                              item?.attributes
                                                ?.price_guide_value
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
                                <li
                                  dangerouslySetInnerHTML={{
                                    __html: dictioneryFunction(
                                      item?.attributes?.intro_text
                                    ),
                                  }}
                                ></li>
                                <li>
                                  Best for:
                                  <span>
                                    {item?.attributes?.recommended_for_text}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <button
                              className="btn card_slider_btn justify-content-end"
                              onClick={() => handleRedirect(item)}
                            >
                              <span className="view_itnry_link">
                                View this hotel
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
      <div
        className="modal fade"
        id="placesToStayModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                All accomodation on Map
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal_map_blk">
                <MarkerInfoWindowNext key={modalKey} data={coordinatesArray} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
