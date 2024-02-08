import { useState, useEffect } from "react";
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
import CustomMultiValue from "../continentitineraries/CustomMultiValue";
import { Alert } from "../../components";
import Iframe from "react-iframe";
import MarkerInfoWindowNext from "../../components/common/MarkerInfoWindowNext";

export default CountryPlaceToStay;

function CountryPlaceToStay(props) {
  const router = useRouter();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [selectedOptionCountry, setSelectedOptionCountry] = useState([]);
  const [selectedOptionRegion, setSelectedOptionRegion] = useState([]);
  const [selectedOptionMonth, setSelectedOptionMonth] = useState([]);
  const [itineraries, setItineraries] = useState(null);
  const itemsPerPage = 12; // Number of items to load per page
  let [page, setPage] = useState(0); // Current page
  const [countryData, setCountryData] = useState(props?.data);
  const [metaData, setMetaData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [reasonOptions, setAllReason] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const destinationcode = router.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const [modalKey, setModalKey] = useState(0);
  const [dcode, setdcode] = useState();
  const [allHotels, setAllHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");
  let dictionaryPage = 1;

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

  const handleFilterClick = (item) => {
    setAlert(null);
    page = 0;
    setAllHotels([]);
    setCoordinatesArray([]);
    setModalKey(0);
    setActiveItem(item);
    loadMoreData(item);
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

  // const countryOptions = [
  //   { value: "Asia", label: "Asia" },
  //   { value: "Hong Kong & Macau", label: "Hong Kong & Macau" },
  //   { value: "Malaysia & Borneo", label: "Malaysia & Borneo" },
  //   { value: "Singapore", label: "Singapore" },
  //   { value: "Indonesia", label: "Indonesia" },
  //   { value: "Japan", label: "Japan" },
  //   { value: "Cambodia", label: "Cambodia" },
  //   { value: "Vietnam", label: "Vietnam" },
  //   { value: "China", label: "China" },
  //   { value: "Thailand", label: "Thailand" },
  //   { value: "Burma", label: "Burma" },
  //   { value: "Laos", label: "Laos" },
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

  const loadMoreData = (item) => {
    if (
      !selectedOptionCountry?.length > 0 &&
      !selectedOptionRegion?.length > 0 &&
      !selectedOptionMonth?.length > 0
    ) {
      setIsLoading(true);
      destinationService
        .getAllCountryWiseHotels(page + 1, item, countrycode, region)
        .then((response) => {
          //  (response);
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
              `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
                ?.replace(/&/g, "and")
                .replace(/ /g, "-")
                .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name
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
          // Update the state with the accumulated coordinates
          setCoordinatesArray((prevCoordinates) => [
            ...prevCoordinates,
            ...newCoordinates,
          ]);
          setModalKey((prevKey) => prevKey + 1);
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle any errors here
          // console.error(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      destinationService
        .hotelFilterOnCountryPlaceToStay(
          selectedOptionCountry,
          selectedOptionRegion,
          selectedOptionMonth,
          item,
          region,
          page + 1,
          countrycode
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
            itineraries;
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
              `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
                ?.replace(/&/g, "and")
                .replace(/ /g, "-")
                .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name
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
          // Update the state with the accumulated coordinates
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
    }
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
    "Selected Countries:", selectedOptionCountry;
    "Selected Regions:", selectedOptionRegion;
    "Selected Months:", selectedOptionMonth;

    if (
      !selectedOptionCountry.length > 0 &&
      !selectedOptionRegion.length > 0 &&
      !selectedOptionMonth.length > 0
    ) {
      showAlert("Please select atleast one option", "error");
    } else {
      setAllHotels([]);
      setCoordinatesArray([]);
      setModalKey(0);
      page = 0;
      loadMoreData(activeItem);
    }
  }

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
        .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name
        ?.replace(/ /g, "-")
        .replace(/&/g, "and")
        .toLowerCase()}/${hotelName}`
    );
  };

  const handleRedirect = (item) => {
    let hotelName = item?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    router.push(
      regionWiseUrl +
        `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
          ?.replace(/&/g, "and")
          .replace(/ /g, "-")
          .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name
          ?.replace(/ /g, "-")
          .replace(/&/g, "and")
          .toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name
          ?.replace(/ /g, "-")
          .replace(/&/g, "and")
          .toLowerCase()}/${hotelName}`
    );
  };

  const handleOptionCountryChange = (selectedOption) => {
    setAlert(null);
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    if (selectedOption[selectedOption.length - 1]?.value == "Show_all") {
      setSelectedOptionCountry(
        selectedOption.filter((res) => res.value == "Show_all")
      );
    } else if (selectedOption[0]?.value == "Show_all") {
      setSelectedOptionCountry(
        selectedOption.filter((res) => res.value != "Show_all")
      );
    } else {
      setSelectedOptionCountry(selectedOption);
    }
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

  // const showMoreItems = () => {
  //   setVisible((prevValue) => prevValue + 3);
  //   if (visible + 3 >= length) {
  //     setVisiblePagination(false);
  //   }
  // };

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
            if (error) {
              return data;
            }
          }
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
    setSelectedOptionCountry([]);
    setSelectedOptionRegion([]);
    setSelectedOptionMonth([]);

    // destinationService.getAllItineraries().then(x => {
    //     setItineraries(x.data);
    //     setIsLoading(false);
    // }).catch((error) => {
    //     // Handle any errors here
    //     // console.error(error);
    //     setIsLoading(false);
    // });

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
      setAllReason(arrayOfObjects);
      // setAllReason(
      //   x.data?.map((item) => ({
      //     //id: i.id,
      //     property_type_code: item?.attributes?.property_type_code,
      //     value: item?.attributes?.property_type_name,
      //     label: item?.attributes?.property_type_name,
      //   }))
      // );
    });

    destinationService
      .getRegions(countrycode)
      .then((x) => {
        let arrayOfObjects = [
          {
            region_code: "Show_all",
            value: "Show_all",
            label: x.data[0].attributes.country_name,
          },
        ];
        arrayOfObjects = [
          ...arrayOfObjects,
          ...x.data[0]?.attributes?.regions?.data.map((item) => ({
            region_code: item?.attributes?.region_code,
            value: item?.attributes?.region_name,
            label: item?.attributes?.region_name,
          })),
        ];
        setAllRegions(arrayOfObjects);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    loadMoreData(activeItem);

    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {
        const redirectUrl =
          regionWiseUrl +
          `/destinations/${destinationcode}/${countrycode?.replace(/ /g, "-")}`;
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [router, countrycode]);

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
                    countryData?.placestostay_intro_text
                  ),
                }}
              />
            </section>
          </div>
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">
                All recommended hotels in {countryData?.country_name}
              </h3>

              {/* Inspire Me */}
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    <form onSubmit={onSubmit}>
                      <div className="col-12">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="dropdown_grp_blk">
                            <div className="banner_dropdwn_blk ">
                              <Select
                                id="long-value-select"
                                instanceId="long-value-select"
                                className="select_container_country"
                                classNamePrefix="select_country"
                                placeholder={"Filter by region"}
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
                                options={allRegions}
                                components={{
                                  Option: InputOption,
                                  MultiValue: CustomMultiValue,
                                }}
                              />
                            </div>
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
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
                                options={reasonOptions}
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
                      </div>
                    </form>
                    <div className="col-12">
                      <div className="destination_filter_result d-block d-lg-flex">
                        <p>
                          We've found {metaData?.total} hotels in{" "}
                          {countryData?.country_name} for you
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

                    {/* Country Place to stay hotels */}
                    {allHotels?.slice(0, allHotels.length).map((item) => (
                      <div
                        className="col-sm-6 col-lg-4 col-xxl-3"
                        key={item.id}
                      >
                        <div className="card_slider_inr">
                          <div className="card_slider">
                            <NavLink
                              className="card_slider_img"
                              href={generateDynamicLink(item)}
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
                                      <li
                                        className="price_guide_tooltip"
                                        key={item?.id}
                                      >
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
                                <li className="place_to_stay_para">
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.attributes?.intro_text,
                                    }}
                                  />
                                </li>
                                <li>
                                  Best for:
                                  <span key={item.id}>
                                    {item?.attributes?.best_for_text}
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

                    {/* Pagination  */}
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
