import { useState, useEffect } from "react";
import { destinationService } from "services";
import { NavLink } from "components";
import { useRouter } from "next/router";

export default CountryOverview;

function CountryOverview(props) {
  const router = useRouter();
  const [itineraries, setItineraries] = useState(null);
  const itemsPerPage = 9; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [countryData, setCountryData] = useState(props?.data);
  // const { overview_text } = props?.data || {};
  // console.log(props?.data);

  const countrycode = router.query?.country
    ?.replace(/-/g, " ")
    .replace(/and/g, "&")
    .toLowerCase();
  const [isLoading, setIsLoading] = useState(false);
  const destinationcode = router.query?.continent
    ?.replace(/-/g, " ")
    .replace(/and/g, "&")
    .toLowerCase();
  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  // let regionWiseUrl = "/uk";
  // if (typeof window !== "undefined") {
  //   if (window && window.site_region) {
  //     regionWiseUrl = "/" + window.site_region;
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

  const handleRedirect = () => {
    router.push(
      regionWiseUrl +
      `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`
    );
  };

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/itinerarydetail?itinerarycode=vietnam-in-classic-style&countrycode=asia`
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


  const dictioneryFunction = (data) => {
    let modifiedString = data;
    if (modifiedString) {
      const regex = /{[a-zA-Z0-9-]+}/g;
      const matches = [...new Set(modifiedString.match(regex))];

      let storedDataString = "";
      let storedData = "";
      // debugger;
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

        // debugger;
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
            return modifiedString;
            setIsLoading(false);
          } catch (error) {
            if (error.message === "Loop break") {

            } else if (error.message === "Region not found") {

            }
          }
        }
      }
    } else {
    }
  }

  equalHeight(true);

  useEffect(() => {
    // destinationService
    //   .getAllItineraries()
    //   .then((x) => {
    //     setItineraries(x.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //   });


    // setAllExecutives(x.data);

    window.addEventListener("resize", equalHeight(true));

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
  }, [countrycode, props]);

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
              <p dangerouslySetInnerHTML={{ __html: dictioneryFunction(countryData?.overview_text) }} />
            </section>
          </div>
          <section class="country_highlight_row">
            <div class="country_highlight_inr" dangerouslySetInnerHTML={{ __html: dictioneryFunction(countryData?.country_highlights) }}>
            </div>
          </section>
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container-md">
              <h3 className="title_cls pt-5">
                Holidays in {countryData?.country_name} Handpicked by Exsus
              </h3>
              <div className="card_slider_row">
                {/* <div className="carousel00 region_carousel00">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3 col-xxl-3">
                      <div className="card_slider_inr">
                        <div className="card_slider">
                          <a className="card_slider_img">
                            <img
                              src="images/country_card01.jpg"
                              alt="country card01"
                              className="img-fluid"
                            />
                          </a>
                          <div className="card_slider_cnt">
                            <h4>
                              <a href="#">China Like an Emperor</a>
                            </h4>
                            <ul>
                              <li>China in Ultimate Style</li>
                              <li>China</li>
                              <li>From £11,250 per person</li>
                              <li>
                                Travel to:
                                <span>
                                  Beijing & Northern China, Shanghai, Hangzhou &
                                  Eastern China, Yunnan
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button className="btn card_slider_btn">
                            <span>12 nights</span>
                            <span className="view_itnry_link">
                              View this itinerary
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 col-xxl-3">
                      <div className="card_slider_inr">
                        <div className="card_slider">
                          <div className="card_slider_img">
                            <img
                              src="images/country_card02.jpg"
                              alt="country card02"
                              className="img-fluid"
                            />
                          </div>
                          <div className="card_slider_cnt">
                            <h4>
                              <a href="#">In Search of Pandas</a>
                            </h4>
                            <ul>
                              <li>Family Adventure to China</li>
                              <li>China</li>
                              <li>From £6,750 per person</li>
                              <li>
                                Travel to:
                                <span>
                                  Beijing & Northern China, Hong Kong & Macau,
                                  Southern China, Xi'an, Sichuan & Central China
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button className="btn card_slider_btn">
                            <span>13 nights</span>
                            <span
                              className="view_itnry_link"
                              onclick="window.location.href='itinerary_detail.html'"
                            >
                              View this itinerary
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 col-xxl-3">
                      <div className="card_slider_inr">
                        <div className="card_slider">
                          <div className="card_slider_img">
                            <img
                              src="images/country_card03.jpg"
                              alt="country card03"
                              className="img-fluid"
                            />
                          </div>
                          <div className="card_slider_cnt">
                            <h4>
                              <a href="#">STYLISH HONEYMOON TO CHINA</a>
                            </h4>
                            <ul>
                              <li>A Chinese Romance</li>
                              <li>China</li>
                              <li>From £5,450 per person</li>
                              <li>
                                Travel to:
                                <span>
                                  Beijing & Northern China, Hong Kong & Macau,
                                  Southern China
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button className="btn card_slider_btn">
                            <span>12 nights</span>
                            <span
                              className="view_itnry_link"
                              onclick="window.location.href='itinerary_detail.html'"
                            >
                              View itinerary
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </section>
          <section className="favrites_blk_row favrites_blk_no_slider_row light_grey">
            <div className="container-md">
              <h3 className="title_cls pt-5">
                PLACES TO STAY IN {countryData?.country_name} HANDPICKED BY EXSUS
              </h3>
              <div className="card_slider_row">
                {/* <div className="carousel00 region_carousel00">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3 col-xxl-3">
                      <div className="card_slider_inr">
                        <div className="card_slider">
                          <a className="card_slider_img">
                            <img
                              src="images/country_hotel01.jpg"
                              alt="country_hotel01"
                              className="img-fluid"
                            />
                          </a>
                          <div className="card_slider_cnt">
                            <h4>
                              <a href="#">Capella Shanghai</a>
                            </h4>
                            <ul>
                              <li>
                                Location: Shanghai, Hangzhou & Eastern China |
                                China
                              </li>
                              <li>
                                Price guide:
                                <span
                                  tabindex="0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  data-bs-title="£200-£350 per person per night"
                                >
                                  £££<label>££</label>
                                </span>
                              </li>
                              <li>
                                Travel to:
                                <span>
                                  Boutique Hotel, History & Heritage, Cultural
                                  Immersion, Food & Wine
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                            <span
                              className="view_itnry_link"
                              onclick="window.location.href='accomodation_detail.html'"
                            >
                              View hotel
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 col-xxl-3">
                      <div className="card_slider_inr">
                        <div className="card_slider">
                          <div className="card_slider_img">
                            <img
                              src="images/country_hotel02.jpg"
                              alt="country_hotel02"
                              className="img-fluid"
                            />
                          </div>
                          <div className="card_slider_cnt">
                            <h4>
                              <a href="#">Six Senses Qing Cheng Mountain</a>
                            </h4>
                            <ul>
                              <li>
                                Location: Xi'an, Sichuan & Central China | China
                              </li>
                              <li>
                                Price guide:
                                <span
                                  tabindex="0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  data-bs-title="£200-£350 per person per night"
                                >
                                  £££<label>££</label>
                                </span>
                              </li>
                              <li>
                                Travel to:
                                <span>
                                  Wildlife & Nature, Walking & Trekking, Setting
                                  & Views, Landscapes & Scenery
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                            <span
                              className="view_itnry_link"
                              onclick="window.location.href='accomodation_detail.html'"
                            >
                              View hotel
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 col-xxl-3">
                      <div className="card_slider_inr">
                        <div className="card_slider">
                          <div className="card_slider_img">
                            <img
                              src="images/country_hotel03.jpg"
                              alt="country_hotel03"
                              className="img-fluid"
                            />
                          </div>
                          <div className="card_slider_cnt">
                            <h4>
                              <a href="#">Alila Yangshuo</a>
                            </h4>
                            <ul>
                              <li>Location: Southern China | China</li>
                              <li>
                                Price guide:
                                <span
                                  tabindex="0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  data-bs-title="£200-£350 per person per night"
                                >
                                  £££<label>££</label>
                                </span>
                              </li>
                              <li>
                                Travel to:
                                <span>
                                  Couples, First-timers, Landscapes & Scenery,
                                  Setting & Views
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                            <span
                              className="view_itnry_link"
                              onclick="window.location.href='accomodation_detail.html'"
                            >
                              View hotel
                              <em className="fa-solid fa-chevron-right"></em>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </section>

          {/* <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                <div className="container">
                    <h3 className="title_cls">Favourite trip ideas</h3>
                    <div className="card_slider_row">
                        <div className="carousel00 region_carousel00">
                            <div className="row">
                                {itineraries?.map((item) => (
                                    <div className="col-sm-6 col-lg-3 col-xxl-3" key={item.id}>
                                        <div className="card_slider_inr">
                                            <div className="card_slider">
                                                <NavLink href={generateDynamicLink(item)} className="card_slider_img">
                                                    {item?.attributes?.itinerary_images?.data.map((element, index) => (
                                                        element.attributes.image_type == 'thumbnail' ? (
                                                            <img key={index} src={element.attributes.image_path} alt="destination card01" className="img-fluid" />
                                                        ) : (
                                                            ''
                                                        )
                                                    ))}
                                                </NavLink>
                                                <div className="card_slider_cnt">
                                                    <h4><a href="#">{item?.attributes?.itin_name}</a></h4>
                                                    <ul>
                                                        <li>{item?.attributes?.header_text}</li>
                                                        <li>Indonesia</li>
                                                        <li>{item?.attributes?.itinerary_country_contents?.data[0]?.attributes?.guideline_price_notes_index}</li>
                                                        <li>Travel to:<span>{item?.attributes?.sub_header_text}</span></li>
                                                    </ul>
                                                </div>
                                                <button className="btn card_slider_btn">
                                                    <span>{item?.attributes?.no_of_nites_notes}</span>
                                                    <span className="view_itnry_link" onClick={handleRedirect}>View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                )}

                                <div className="col-12">
                                    {visibleItems < itineraries?.length && (
                                        <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase" onClick={handleLoadMore}>Show 9 more holiday ideas
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 266.77"><path fillRule="nonzero" d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
          <section className="card_blk_row dark_grey">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card_blk_inr card_blk_overlay">
                    <a href="#" target="_blank">
                      <img
                        src="./../../../images/destination_overview01.jpg"
                        alt="Card image 07"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>See all Itinerary Ideas in {countryData?.country_name}</h3>
                            </div>
                          </div>
                          <div className="col-1 ps-0">
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
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card_blk_inr card_blk_overlay">
                    <a href="#">
                      <img
                        src="./../../../images/destination_overview02.jpg"
                        alt="Card image 08"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt card_blk_cntnt_top">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>See all Places to Stay in {countryData?.country_name}</h3>
                            </div>
                          </div>
                          <div className="col-1 ps-0">
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
                          </div>
                        </div>
                      </div>
                    </a>
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
