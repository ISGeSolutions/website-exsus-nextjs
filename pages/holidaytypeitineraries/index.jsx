import { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { Layout, FriendlyUrl, Signup } from "components";
import { userService, holidaytypesService, destinationService } from "services";
import Head from "next/head";
import { useRouter } from "next/router";
import { NavLink } from "components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require("react-responsive-carousel").Carousel;
import CustomMultiValue from "./CustomMultiValue";
import Select, { components } from "react-select";
import { Alert } from "../../components";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

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
  const [page, setPage] = useState(0); // Current page
  const itemsPerPage = 12; // Number of items to load per page
  const [metaData, setMetaData] = useState([]);
  const [holidayName, setHolidayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");

  // const [visibleItems, setVisibleItems] = useState(itemsPerPage)
  const router = useRouter();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [selectedOptionMonth, selectedOptionData] = useState(null);
  const [title, setTitle] = useState("");
  const [alert, setAlert] = useState(null);

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
      if (window.site_region !== "uk") regionWiseUrl = "/" + window.site_region;
    }
  }

  const loadMoreData = () => {
    destinationService
      .getAllItineraries(page + 1)
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

  function onSubmit(data) {
    data.preventDefault();
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

  const handleOptionChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    selectedOptionData(selectedOption);
  };

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=${region}`
    );
  };

  const handleRedirect = () => {
    router.push(
      regionWiseUrl +
        `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=${region}`
    );
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

  const hcode = router.query?.holidaytypeitineraries
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();

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

  const websiteContentCheck = (matches, region, modifiedString) => {
    holidaytypesService
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

  useEffect(() => {
    selectedOptionData(optionsData[0]);
    holidaytypesService
      .getHolidaytypeDetails(hcode)
      .then((x) => {
        setHolidaytypesDetails(x.data[0].attributes);
        setFriendlyUrl(
          `home/holiday types/${x.data[0].attributes.friendly_url}`
        );
        setHolidayName(x.data[0].attributes.holiday_type_group_name);
        setTitle(x.data[0].attributes.page_meta_title);

        const imageCheck = x.data[0].attributes.holiday_type_group_images.data;
        setHolidaytypesDetails(x.data[0].attributes);

        // const oldText = x.data.attributes?.overview_text;
        // var newValueWithBr = oldText?.replace(/\\n/g, "");
        // setnewValueWithBr(newValueWithBr);

        let modifiedString = x.data[0].attributes?.overview_text;

        // Find and store matches in an array
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
              // Set the modified string in state
              setnewValueWithBr(modifiedString);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
                setnewValueWithBr(modifiedString);
              }
            }
          }
        } else {
          // The item with 'yourKey' does not exist in local storage
          // Display the matched words
          if (matches) {
            websiteContentCheck(matches, region, modifiedString);
          }
        }

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

    // destinationService.getAllItineraries().then(x => {
    //     setItineraries(x.data);
    //     setIsLoading(false);
    // });

    loadMoreData();

    window.addEventListener("resize", equalHeight(true));
  }, [router, valueWithBr, hcode]);

  return (
    <>
      {alert && alert.message && alert.type && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
      <Head>
        <title>{title}</title>
        {/* <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script> */}
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
                  <p dangerouslySetInnerHTML={{ __html: valueWithBr }} />
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
                    <form onSubmit={onSubmit}>
                      <div className="col-12">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="banner_dropdwn_blk">
                            <div className="select_drpdwn">
                              <Select
                                defaultValue="destination"
                                id="long-value-select"
                                placeholder={"Filter by destinations"}
                                className="select_container_country"
                                classNamePrefix="select_country"
                                isDisabled={isDisabled}
                                isLoading={isLoading}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                styles={styles}
                                isSearchable={isSearchable}
                                name="color"
                                options={optionsData}
                                isMulti
                                hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                onChange={handleOptionChange}
                                value={selectedOptionMonth}
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
                          We've found {metaData?.total} destinations for{" "}
                          {holidayName}
                        </p>
                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                          <label className="pt-2 pt-lg-0">Arrange by:</label>
                          <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                            <li>
                              <a href="#" className="active">
                                Recommended
                              </a>
                            </li>
                            <li>
                              <a href="#">Alphabetical</a>
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
                              <div className="card_slider_cnt">
                                <h4>
                                  <a href="#">{item?.attributes?.itin_name}</a>
                                </h4>
                                <ul>
                                  <li>{item?.attributes?.header_text}</li>
                                  <li>
                                    {
                                      item?.attributes
                                        ?.itinerary_country_contents?.data[0]
                                        ?.attributes
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
                              <button className="btn card_slider_btn">
                                <span>
                                  {item?.attributes?.no_of_nites_notes}
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
                          onClick={loadMoreData}
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
