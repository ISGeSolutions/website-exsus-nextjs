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
import CustomMultiValue from "./CustomMultiValue";
import { Alert } from "../../components";

export default ContinentPlacesToStay;

function ContinentPlacesToStay(props) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(null);
  const [itineraries, setItineraries] = useState(null);
  const router = useRouter();
  const [destination, setdestination] = useState("");
  const itemsPerPage = 12; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [page, setPage] = useState(0); // Current page
  const [metaData, setMetaData] = useState([]);
  const [decode, setdcode] = useState();
  const destinationcode = router.query.continent
    .replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const [allHotels, setAllHotels] = useState([]);
  const [countryOptions, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");
  const [alert, setAlert] = useState(null);
  const [regionOptions, setAllRegion] = useState([]);

  const { divRef } = props;

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") regionWiseUrl = "/" + window.site_region;
    }
  }

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

  const loadMoreData = (item) => {
    destinationService
      .getAllHotels(page + 1, item, decode, region)
      .then((response) => {
        console.log("response", response);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function onSubmit(data) {
    data.preventDefault();
    console.log("Selected Countries:", selectedOptionCountry);
    console.log("Selected Regions:", selectedOptionRegion);
    console.log("Selected Months:", selectedOptionMonth);

    if (!data.destination && !data.reason && !data.month) {
      showAlert("Please select atleast one option", "error");
    } else {
      router.push(
        `advance-search?where=` +
        data?.destination +
        `&what=` +
        data?.reason +
        `&when=` +
        data?.month
      );
    }
  }

  const handleFilterClick = (item) => {
    page = 0;
    setAllHotels([]);
    setActiveItem(item);
    loadMoreData(item);
  };

  const handleRedirect = (item) => {
    let hotelName = item?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    router.push(
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, " and ")
        .replace(/ /g, "-")
        .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name?.replace(
          / /g,
          "-"
        ).replace(/&/g, "and").toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name?.replace(
          / /g,
          "-"
        ).replace(/&/g, "and").toLowerCase()}/${hotelName}`)
  };

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

  const generateDynamicLink = (item) => {
    let hotelName = item?.attributes?.friendly_url
      ?.replace(/ /g, "-")
      .toLowerCase()
      .replace(/&/g, "and");
    return (
      regionWiseUrl +
      `/destinations/${item?.attributes?.destination?.data?.attributes?.destination_name
        ?.replace(/&/g, " and ")
        .replace(/ /g, "-")
        .toLowerCase()}/hotels/${item?.attributes?.country?.data?.attributes?.country_name?.replace(
          / /g,
          "-"
        ).replace(/&/g, "and").toLowerCase()}/${item?.attributes?.region?.data?.attributes?.region_name?.replace(
          / /g,
          "-"
        ).replace(/&/g, "and").toLowerCase()}/${hotelName}`
    );
  };

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
    setSelectedOptionCountry();
    setSelectedOptionRegion();
    setSelectedOptionMonth();

    // destinationService.getAllItineraries().then(x => {
    //     setItineraries(x.data);
    //     setIsLoading(false);
    // }).catch((error) => {

    //     setIsLoading(false);
    // });
    destinationService
      .getDestinationDetails(destinationcode)
      .then((x) => {
        setdestination(x.data[0].attributes);
        setdcode(x.data[0].attributes.destination_code);
        setAllCountries(
          x.data[0]?.attributes?.countries?.data.map((item) => ({
            id: item.id,
            country_code: item?.attributes?.country_code,
            value: item?.attributes?.country_name,
            label: item?.attributes?.country_name,
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    destinationService.getPropertyTypeDropDown().then((x) => {
      setAllRegion(
        x.data?.map((item) => ({
          //id: i.id,
          property_type_code: item?.attributes?.property_type_code,
          value: item?.attributes?.property_type_name,
          label: item?.attributes?.property_type_name,
        }))
      );
    });

    loadMoreData(activeItem);

    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {
        const redirectUrl = regionWiseUrl + "/destinations/" + destinationcode;

        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };

    divRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [destinationcode, router, decode]);

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
                    destination.placestostay_intro_text
                  ),
                }}
              />
            </section>
          </div>

          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <h3 className="title_cls">
                All recommended hotels in {destination.destination_name}
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
                                className="select_container_country"
                                classNamePrefix="select_country"
                                placeholder={"Filter by country"}
                                styles={styles}
                                isMulti
                                isDisabled={isDisabled}
                                isLoading={isLoading}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                //value={selectedOptionCountry}
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
                                placeholder="Filter by date of travel"
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
                    </form>
                    <div className="col-12">
                      <div className="destination_filter_result d-block d-lg-flex">
                        <p>
                          We've found {metaData?.total} hotels in{" "}
                          {destination?.destination_name} for you
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

                    {/* Continent place to stay Hotels */}
                    {allHotels?.slice(0, allHotels.length).map((item) => (
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
                              {/* <img
                                src=""
                                alt="destination_hotel01"
                                className="img-fluid"
                              /> */}
                            </NavLink>
                            <div className="card_slider_cnt places_to_stay_cnt">
                              <h4>
                                <a href="#">{item?.attributes?.hotel_name}</a>
                              </h4>
                              <ul>
                                <li>Location: {item?.attributes?.location}</li>
                                {item?.attributes?.hotel_country_contents?.data?.map(
                                  (item) => {
                                    return (
                                      <li class="price_guide_tooltip">
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

                                <li>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.attributes?.intro_text,
                                    }}
                                  />
                                </li>
                                {/* <li>{item?.attributes?.intro_text}</li> */}
                                <li>
                                  Best for:
                                  <span>{item?.attributes?.best_for_text}</span>
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
