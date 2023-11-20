import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import { destinationService, alertService, userService } from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import generateDynamicLink from "components/utils/generateLink";
import Image from "next/image";
import Select, { components } from "react-select";
import CustomMultiValue from "../continentitineraries/CustomMultiValue";
import { Alert } from "../../components";


export default CountryPlaceToStay;

function CountryPlaceToStay(props) {
  const router = useRouter();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
  const [itineraries, setItineraries] = useState(null);
  const itemsPerPage = 12; // Number of items to load per page
  const [page, setPage] = useState(0); // Current page
  const [countryData, setCountryData] = useState(props?.data);
  const [metaData, setMetaData] = useState([]);
  const [alert, setAlert] = useState(null);
  const destinationcode = router.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();

  const [dcode, setdcode] = useState();
  const [allHotels, setAllHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");

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

  const countryOptions = [
    { value: "Asia", label: "Asia" },
    { value: "Hong Kong & Macau", label: "Hong Kong & Macau" },
    { value: "Malaysia & Borneo", label: "Malaysia & Borneo" },
    { value: "Singapore", label: "Singapore" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Japan", label: "Japan" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "China", label: "China" },
    { value: "Thailand", label: "Thailand" },
    { value: "Burma", label: "Burma" },
    { value: "Laos", label: "Laos" },
  ];

  const regionOptions = [
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

  const monthOptions = [
    { value: "All months", label: "All months" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const loadMoreData = (item) => {
    destinationService
      .getAllHotels(page + 1, item)
      .then((response) => {
        // console.log(response);
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
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    // console.log("closeAlert");
    setAlert(null);
  };




  function onSubmit(e) {
    e.preventDefault();
    // console.log(e);
    if (!e.destination && !e.reason && !e.month) {
      showAlert("Please select atleast one option", "error");
    } else {
      router.push(
        `advance-search?where=` +
        e?.destination +
        `&what=` +
        e?.reason +
        `&when=` +
        e?.month
      );
    }
  }

  const handleRedirect = (item) => {
    return regionWiseUrl + `/hotel-detail?hotelid=${item}`;
  };

  const handleOptionCountryChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    setSelectedOptionCountry(selectedOption);
    // this.setState({ selectedOption }, () =>
    // );
  };

  const handleFilterClick = (item) => {
    page = 0;
    setAllHotels([]);
    setActiveItem(item);
    loadMoreData(item);
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

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
    if (visible + 3 >= length) {
      setVisiblePagination(false);
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

  const websiteContentCheck = (matches, region, modifiedString) => {
    destinationService
      .getDictionaryDetails(matches, region)
      .then((responseObj) => {
        if (responseObj) {
          const res = responseObj?.data;
          res.forEach((element, index) => {
            const replacement = element?.attributes?.content_translation_text;
            const matchString = element?.attributes?.content_word;
            const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
            if (checkStr && replacement) {
              modifiedString = modifiedString.replace(checkStr, replacement);
            }
          });

          // Set the modified string in state
          setnewValueWithBr(modifiedString);
        }
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
                modifiedString = modifiedString.replace(
                  checkStr,
                  replacement
                );
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
  }

  const generateDynamicLink = (item) => {
    // console.log('item', item);
    return regionWiseUrl + `/hotel-detail?hotelid=${item}`;
  };

  useEffect(() => {
    setSelectedOptionCountry(countryOptions[0]);
    setSelectedOptionRegion(regionOptions[0]);
    setSelectedOptionMonth(monthOptions[0]);

    // destinationService.getAllItineraries().then(x => {
    //     setItineraries(x.data);
    //     setIsLoading(false);
    // }).catch((error) => {
    //     // Handle any errors here
    //     // console.error(error);
    //     setIsLoading(false);
    // });

    loadMoreData(activeItem);

    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {
        const redirectUrl =
          regionWiseUrl + `/destinations/${destinationcode}/${countrycode}`;
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [countrycode]);

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
              <p dangerouslySetInnerHTML={{ __html: dictioneryFunction(countryData?.placestostay_intro_text) }} />
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
                  <form onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="dropdown_grp_blk">
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                              <Select
                                id="long-value-select"
                                instanceId="long-value-select"
                                className="select_container_country"
                                classNamePrefix="select_country"
                                placeholder="Filter by country"
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
                                placeholder="Filter by region"
                                // defaultValue={regionOptions[0]}
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
                                name="color"
                                options={regionOptions}
                                isMulti
                                // value={selectedOptionRegion}
                                onChange={handleOptionRegionChange}
                                components={{
                                  Option: InputOption,
                                  MultiValue: CustomMultiValue,
                                }}
                              />
                            </div>
                            <div className="banner_dropdwn_blk ps-0 ps-md-2">
                              <Select
                                placeholder="Filter by month"
                                className="select_container_country"
                                classNamePrefix="select_country"
                                // defaultValue={monthOptions[0]}
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
                                // value={selectedOptionMonth}
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
                      <div className="col-12">
                        <div className="destination_filter_result d-block d-lg-flex">
                          <p>
                            We've found 358 hotels in Asia for you
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
                        <div className="col-sm-6 col-lg-4 col-xxl-3" key={item.id}>
                          <div className="card_slider_inr">
                            <div className="card_slider">
                              <NavLink
                                className="card_slider_img"
                                href={generateDynamicLink(item.id)}
                              >
                                <img
                                  src="./../../../images/destination_hotel02.jpg"
                                  alt="destination_hotel02"
                                  className="img-fluid"
                                />
                              </NavLink>
                              <div className="card_slider_cnt places_to_stay_cnt">
                                <h4>
                                  <a href="#">{item?.attributes?.hotel_name}</a>
                                </h4>
                                <ul>
                                  <li>Location: {item?.attributes?.location}</li>
                                  <li>
                                    Price guide:
                                    <span
                                      tabIndex="0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      data-bs-title="£200-£350 per person per night"
                                    >
                                      <label>
                                        {item?.attributes?.price_guide_text}
                                      </label>
                                    </span>
                                  </li>
                                  <li>{item?.attributes?.intro_text}</li>
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
                                onClick={() => handleRedirect(item.id)}
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
                            className="btn prmry_btn make_enqury_btn mx-auto text-uppercase"
                            onClick={loadMoreData}
                          >
                            Show{" "}
                            {metaData.total - page * itemsPerPage > 12
                              ? 12
                              : metaData.total - page * itemsPerPage > 12}{" "}
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
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
