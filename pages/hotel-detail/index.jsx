import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService } from "services";
import { NavLink } from "components";
import { useRouter } from "next/router";
import { FriendlyUrl } from "../../components";
import Iframe from "react-iframe";
import Head from "next/head";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { destinationService } from "../../services";

export default Index;

function Index() {
  const [whyusDetails, setWhyusDetails] = useState(null);
  const [mapVariable, setMapVariable] = useState(null);

  const router = useRouter();
  const hotelName = router?.query?.hotelName;
  const countryName = router?.query?.countryName;
  const regionName = router?.query?.location?.replace(/and/g, "&").replace(/-/g, " ").toLowerCase();
  const [hotelData, setHotelData] = useState([]);
  const [hotels, setAllHotels] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [travelTimes, setTraveltimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [friendlyUrl, setFriendlyUrl] = useState("");
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


  const generateDynamicLink = (item) => {
    // let locationCountry = item?.attributes?.location?.toLowerCase().replace(/&/g, "and");
    // let countryName = locationCountry.match(/\|(.+)/);
    // countryName = countryName ? countryName[1].trim() : null;
    // let location = locationCountry?.match(/(.+?)\|/);
    // location = location ? location[1].trim() : null;
    // let hotelName = item?.attributes?.friendly_url?.replace(/ /g, "-").toLowerCase().replace(/&/g, "and");
    // return regionWiseUrl + `/destinations/${destinationcode?.replace(/&/g, " and ")
    //   .replace(/ /g, "-")
    //   .toLowerCase()}/hotels/${countryName?.replace(/ /g, "-")}/${location?.replace(/ /g, "-")}/${hotelName}`;
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
                modifiedString = websiteContentCheck(matches, region, modifiedString);
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
          }
        }
      }
    }
  }

  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleInterval");
    const carouselMain = document.querySelector("#carouselExampleIntervalMain");
    if (carouselMain) {
      new bootstrap.Carousel(carouselMain);
    }



    destinationService
      .getHotelById(hotelName, region)
      .then((x) => {
        // setWhyusDetails(x.data.attributes);
        setFriendlyUrl(
          `home/destinations/${router.query?.continent}/${router.query?.country}/${regionName}/${router.query?.hotelName}`
        );
        const mapTemp =
          `https://www.google.com/maps/embed/v1/place?q=` +
          x.data[0]?.attributes?.map_latitude +
          `,` +
          x.data[0]?.attributes?.map_longitude +
          `&key=AIzaSyDIZK8Xr6agksui1bV6WjpyRtgtxK-YQzE`;
        setMapVariable(mapTemp);
        setHotelData(x.data[0].attributes);
        let bestTimeTravelData = [];
        x.data[0].attributes?.hotel_travel_times?.data.forEach((res) => {
          if (res?.attributes?.travel_time_value == "TT2") {
            res.attributes.class_name = "shade03";
          } else if (res?.attributes?.travel_time_value == "TT3") {
            res.attributes.class_name = "shade02";
          } else if (res?.attributes?.travel_time_value == "TT4") {
            res.attributes.class_name = "shade01";
          } else if (res?.attributes?.travel_time_value == "TT1") {
            res.attributes.class_name = "shade04";
          }
          bestTimeTravelData.push(res);
        });
        setTraveltimes(bestTimeTravelData);
        const imageCheck = x.data[0].attributes.hotel_images.data;
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


    destinationService
      .getRegionWiseHotelsInHotelDetail(regionName, region)
      .then((response) => {
        setAllHotels(response?.data);
        console.log(response?.data);
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
      });
  }, [hotelName]);

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
        <title>{dictioneryFunction(hotelData?.meta_title)}</title>
        <meta content={dictioneryFunction(hotelData?.meta_description)}></meta>
        {/* <script
          type="text/javascript"
          src="/assets/javascripts/card-slider-equal-height.js"
        ></script> */}
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
                {backgroundImage.map((imagePath, index) => (
                  <a
                    key={index}
                    target="_blank"
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    data-bs-interval="5000"
                  >
                    <div
                      className="banner_commn_cls"
                      style={{ backgroundImage: `url(${imagePath})` }}
                    ></div>
                  </a>
                ))}
              </div>
            </div>
            <div className="banner_tab_blk">
              <button className="btn banner_map_tab">Map</button>
              <button className="btn banner_img_tab banner_tab_active">
                Images
              </button>
            </div>
            <div className="banner_map_blk">
              <Iframe
                width="640px"
                height="320px"
                id=""
                className=""
                display="block"
                src={mapVariable}
                position="relative"
                style="border:0;"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" */}
            </div>
            {/* <p>{mapVariable}</p> */}
          </section>

          <section className="trvl_info_row">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
                {/* <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="destinations.html">Destinations</a></li>
                            <li><a href="destination_detail.html">Asia</a></li>
                            <li><a href="country_detail.html">China</a></li>
                            <li><a href="region_detail.html">Beijing & Northern China</a></li>
                            <li>Rosewood Beijing</li>
                        </ul> */}
              </div>

              <div className="trvl_info_cntnt">
                <h2 className="trvl_title mb-3">{hotelData.hotel_name}</h2>
                <h3 className="trvl_title_sub_white mb-3">
                  Location: {hotelData.location}
                </h3>
                <p className="mb-4">
                  Price guide:
                  <span
                    tabIndex="0"
                    title={hotelData?.hotel_country_contents?.data[0]?.attributes?.price_guide_text}
                  >{hotelData?.hotel_country_contents?.data[0]?.attributes?.currency_symbol.repeat(Math.abs(hotelData?.hotel_country_contents?.data[0]?.attributes?.price_guide_value))}
                    <label>
                      {hotelData?.hotel_country_contents?.data[0]?.attributes?.currency_symbol.repeat(Math.abs(5 - hotelData?.hotel_country_contents?.data[0]?.attributes?.price_guide_value))}
                    </label>
                  </span>
                </p>
                {/* <p className="mb-4">The Rosewood is a sanctuary of peace and comfort in the heart of one of the world’s most exciting cities: Beijing. The hotel combines a fantastic location with a world-className hotel experience, including five international restaurants, sleek, luxurious accommodation and personalised spa treatments. It sits in the glitzy neighbourhood of Chaoyang, which is famed for its shops and bars.</p> */}
                <p
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: hotelData?.video_url }}
                />
              </div>

              <section className="country_highlight_row itinery_hightlight_row mb-0">
                <div className="row">
                  <div className="col-sm-9">
                    <div className="country_highlight_inr">
                      <div>
                        <span>Perfect for</span>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: hotelData?.perfect_for_text,
                          }}
                        />
                      </div>
                      <div>
                        <span>In the know</span>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: hotelData?.in_the_know_text,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="itinery_highlight_inr">
                      <ul>
                        <li>RECOMMENDED FOR...</li>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: hotelData?.recommended_for_text,
                          }}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section className="itinery_detls_row">
            <div className="container">
              <div
                dangerouslySetInnerHTML={{ __html: hotelData?.overview_text }}
              />
            </div>
          </section>

          <section className="best_time_blk_row">
            <div className="container">
              <section className="best_time_blk_inr">
                <h3>BEST TIME TO GO</h3>
                <div className="row">
                  <div className="col-lg-4">
                    <ul className="best_time_blk_left">
                      <li>
                        <span className="shade01"></span>Best time to travel
                      </li>
                      <li>
                        <span className="shade02"></span>Good time to travel
                        (but some limitations)
                      </li>
                      <li>
                        <span className="shade03"></span>Travel is possible (but
                        it’s not the best time)
                      </li>
                      <li>
                        <span className="shade04"></span>Travel is not
                        recommended
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-8">
                    <ul className="best_time_blk_right">
                      <li className="mt-3 mt-lg-0" value="1">
                        Jan
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "1"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="2">
                        Feb
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "2"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="3">
                        Mar
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "3"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="4">
                        Apr
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "4"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="5">
                        May
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "5"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="6">
                        June
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "6"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="7">
                        July
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "7"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="8">
                        Aug
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "8"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="9">
                        Sep
                        <span
                          className={
                            travelTimes?.filter(
                              (res) => res?.attributes?.travel_time_month == "9"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="10">
                        Oct
                        <span
                          className={
                            travelTimes?.filter(
                              (res) =>
                                res?.attributes?.travel_time_month == "10"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="11">
                        Nov
                        <span
                          className={
                            travelTimes?.filter(
                              (res) =>
                                res?.attributes?.travel_time_month == "11"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                      <li className="mt-3 mt-lg-0" value="12">
                        Dec
                        <span
                          className={
                            travelTimes?.filter(
                              (res) =>
                                res?.attributes?.travel_time_month == "12"
                            )[0]?.attributes.class_name
                          }
                        ></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="map_blk_row">
                <h3 className="pb-2">Hotel location</h3>
                <p>The Rosewood is just half an hour’s drive from Beijing Capital International Airport.</p>
                <div className="map_blk_inr">
                  <div className="map_blk_inr">
                    <Iframe
                      width="640px"
                      src={mapVariable}
                      style="border:0;"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934863.062786615!2d90.8116600393164!3d12.820811668700316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1682416568153!5m2!1sen!2sin" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section className="favrites_blk_row">
            <div className="container">
              <h3 className="title_cls">
                {/* PLACES TO STAY IN {countryData?.country_name} HANDPICKED BY
                EXSUS */}
              </h3>
              <div className="card_slider_row">
                <i id="leftt">
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
                      d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z"
                    />
                  </svg>
                </i>
                <div className="carousel00">
                  {hotels?.map((item) => (
                    <div className="card_slider_inr" key={item.id}>
                      <div className="card_slider">
                        <NavLink
                          href=""
                          className="card_slider_img"
                        >
                          {item?.attributes?.hotel_images?.data.map(
                            (element, index) =>
                              element.attributes.image_type == "thumbnail" ? (
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
                                  <li>
                                    Price guide:
                                    <span
                                      key={item?.id}
                                      tabIndex="0"
                                      title={item?.attributes?.price_guide_text}
                                    >
                                      {item?.attributes?.currency_symbol.repeat(
                                        Math.abs(
                                          item?.attributes?.price_guide_value
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
                              <span>
                                {item?.attributes?.best_for_text}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="btn card_slider_btn justify-content-end"
                        >
                          <span className="view_itnry_link">
                            View this hotel
                            <em className="fa-solid fa-chevron-right"></em>
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {hotels?.length > 4 && (
                  <i id="right">
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
                  </i>
                )}
              </div>
            </div>
            {/* <div className="full_loader_parnt_blk loader_parnt_blk" style="display: block;"><div className="loader-circle-2"></div></div> */}
          </section>
          {/* <section className="favrites_blk_row light_grey">
                <div className="container">
                    <h3 className="title_cls">More places to stay in Beijing & Northern China</h3>
                    <div className="card_slider_row">
                        <i id="left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" /></svg>
                        </i>
                        <div className="carousel00 region_carousel00">
                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="images/region_hotel02.jpg" alt="region_hotel02" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a >The Opposite House</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>Chic Design, City Hotel, Boutique Hotel, History &amp; Heritage</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="images/country_hotel06.jpg" alt="country_hotel06" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a >Aman Summer Palace</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>Luxury Hotel, City Hotel, Chic Design, Setting &amp; Views</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="images/region_hotel03.jpg" alt="region_hotel03" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a >Jing's Residence</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>History &amp; Heritage, Cultural Immersion, Peace &amp; Quiet, Couples</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                            <div className="card_slider_inr">
                                <div className="card_slider">
                                    <a className="card_slider_img">
                                        <img src="images/region_hotel01.jpg" alt="region_hotel01" className="img-fluid" />
                                    </a>
                                    <div className="card_slider_cnt places_to_stay_cnt">
                                        <h4><a >Four Seasons Beijing</a></h4>
                                        <ul>
                                            <li>Location: Beijing &amp; Northern China | China</li>
                                            <li>Price guide:<span tabIndex="0" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="£200-£350 per person per night">£££<label>££</label></span></li>
                                            <li>Best for:<span>Luxury Hotel, City Hotel, Chic Design, Setting &amp; Views</span></li>
                                        </ul>
                                    </div>
                                    <button className="btn card_slider_btn justify-content-end light_grey_btn_bg">
                                        <span className="view_itnry_link">View this hotel<em className="fa-solid fa-chevron-right"></em></span>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <i id="right">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                        </i>
                    </div>
                </div>
                <div className="full_loader_parnt_blk loader_parnt_blk" style="display: none;"><div className="loader-circle-2"></div></div>
            </section> */}

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

