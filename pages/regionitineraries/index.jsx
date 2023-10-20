import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import { destinationService, alertService, userService } from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import generateDynamicLink from "components/utils/generateLink";
import Image from "next/image";
import CustomMultiValue from "../continentitineraries/CustomMultiValue";
import Select, { components } from "react-select";

export default CountryItinararies;

function CountryItinararies(country) {
  console.log("country", country);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const itemsPerPage = 12; // Number of items to load per page
  const [isLoading, setIsLoading] = useState(true);

  const [metaData, setMetaData] = useState([]);

  const router = useRouter();
  const { countrycode } = router.query;

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
    { value: "", label: "Filter by region" },
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
    { value: "", label: "Filter by region" },
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
    { value: "", label: "Filter by month" },
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

  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  // const handleLoadMore = () => {
  //     // console.log('handleLoadMore')
  //     setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
  // };

  const handleOptionCountryChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    setSelectedOptionCountry(selectedOption);
    // this.setState({ selectedOption }, () =>
    // );
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

  let regionWiseUrl = "/uk";
  let region = "uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      region = window.site_region;

      // setMyVariable(window.site_region);
    }
  }

  const loadMoreData = () => {
    destinationService
      .getAllItineraries(page + 1)
      .then((response) => {
        setMetaData(response.meta.pagination);
        const responseTemp = [...response.data].sort(
          (a, b) => a.attributes.serial_number - b.attributes.serial_number
        );
        const newItineraries = responseTemp;
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
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });
  };

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/itinerarydetail?itineraryid=${item.id}&itinerarycode=${item.attributes.itin_code}`
    );
  };

  const handleRedirect = (item) => {
    router.push(
      regionWiseUrl +
        `/itinerarydetail?itineraryid=${item.id}&itinerarycode=${item.attributes.itin_code}`
    );
  };

  const equalHeight = (resize) => {
    var elements = document.getElementsByClassName("card_slider_cnt"),
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

  useEffect(() => {
    setSelectedOptionCountry(countryOptions[0]);
    setSelectedOptionRegion(regionOptions[0]);
    setSelectedOptionMonth(monthOptions[0]);

    loadMoreData();

    window.addEventListener("resize", equalHeight(true));

    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {
        const redirectUrl =
          regionWiseUrl + "/country?countrycode=" + countrycode;
        // debugger;
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [countrycode]);

  return (
    <>
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
                  __html: country?.data?.overview_text,
                }}
              />
            </section>
          </div>

          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">
                All Luxury Holiday Ideas in {country?.data?.country_name}
              </h3>
              <div className="card_slider_row">
                <div className="carousel00">
                  <div className="row">
                    <div className="col-12">
                      <div className="destination_dropdwn_row d-block d-md-flex">
                        <div className="dropdown_grp_blk">
                          <div className="banner_dropdwn_blk ps-0 ps-md-2">
                            <Select
                              placeholder="Filter by reason"
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
                            type="button"
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
                          We've found {metaData?.total} holiday ideas in Asia
                          for you
                        </p>
                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                          <label className="pt-2 pt-lg-0">Arrange by:</label>
                          <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                            <li>
                              <a href="#">By price</a>
                            </li>
                            <li>
                              <a href="#" className="active">
                                Recommended
                              </a>
                            </li>
                            <li>
                              <a href="#">Alphabetical</a>
                            </li>
                            <li>
                              <a href="#">By duration</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
                                      alt="destination card01"
                                      className="img-fluid"
                                    />
                                  ) : (
                                    ""
                                  )
                              )}
                              {/* <img src={backgroundThumbnailImg(item?.attributes?.itinerary_images?.data)} alt="destination card01" className="img-fluid" /> */}
                            </NavLink>
                            <div className="card_slider_cnt">
                              <h4>
                                <a href="#">{item?.attributes?.itin_name}</a>
                              </h4>
                              <ul>
                                <li>{item?.attributes?.header_text}</li>
                                {/* <li>Indonesia</li> */}
                                <li>
                                  {
                                    item?.attributes?.itinerary_country_contents
                                      ?.data[0]?.attributes
                                      ?.guideline_price_notes_index
                                  }
                                </li>
                                <li>
                                  Travel to:
                                  <span>
                                    {item?.attributes?.sub_header_text}
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
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
