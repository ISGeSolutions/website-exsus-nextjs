import { useState, useEffect } from "react";
import { Signup } from "components";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Inspireme } from "../components";
import Head from "next/head";
import {
  holidaytypesService,
  destinationService,
  blogsService,
  homeService
} from "services";
import { NavLink } from "components";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { whyusService } from "../services";
var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const [thumbnailImage, setThumbnailImageArr] = useState([]);
  const [itineraries, setItineraries] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [websiteContent, setWebsiteContent] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState([]);


  let regionWiseUrl = "/uk";
  let region = 'uk'
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      region = window.site_region;
      // setMyVariable(window.site_region);
    }
  }

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/itinerarydetail?itineraryid=${item.id}&itinerarycode=${item.attributes.itin_code}`
    );
  };

  const generateDynamicLinkBlog = (item) => {
    const modifiedGrpName = item
      .replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    return regionWiseUrl + `/blog/${modifiedGrpName}`;
  };

  const handleRedirect = () => {
    router.push(
      regionWiseUrl +
      `/itinerarydetail?itineraryid=${item.id}&itinerarycode=${item.attributes.itin_code}`
    );
  };

  const dynamicThumbnailImage = (itemId) => {
    return itemId;
  };

  const [destinationLandingList, setDestinationLandingList] = useState();
  const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();

  // form validation rules
  const validationSchema = Yup.object().shape({
    destination: Yup.string(),
    reason: Yup.string(),
    month: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

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

  const dynamicLink = (itemName, id) => {
    const modifieditem = itemName
      .replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    if (itemName) {
      return regionWiseUrl + `/holiday-types/${modifieditem}`;
    }
  };

  const dynamicLinkHolidayas = (itemId, id) => {
    // if (itemId && itemId == 'AF') {
    //     return regionWiseUrl + `/destinations/africa/` + id;
    // }
    if (itemId && itemId == "HG6") {
      return regionWiseUrl + `/holidaytypeitineraries/incredible-journeys/id`;
    } else if (itemId && itemId == "HG5") {
      return regionWiseUrl + `/holidaytypeitineraries/luxury-honeymoons/id`;
    } else if (itemId && itemId == "HG4") {
      return regionWiseUrl + `/holidaytypeitineraries/family-holidays/id`;
    } else if (itemId && itemId == "ADHL") {
      return regionWiseUrl + `/holidaytypeitineraries/adventure-holidays/id`;
    } else if (itemId && itemId == "LBHG") {
      return regionWiseUrl + `/holidaytypeitineraries/luxury-beach-holidays/id`;
    } else if (itemId && itemId == "HG3") {
      return regionWiseUrl + `/holidaytypeitineraries/culture-holidays/id`;
    } else {
      return "#";
    }
  };

  function onSubmit(data) {
    if (!data.destination && !data.reason && !data.month) {
      alertService.success(
        "Sorry, we could not filter your request. Please select atleast one option",
        { keepAfterRouteChange: true }
      );
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

  useEffect(() => {
    $(".succss_msg_parnt").hide();

    destinationService
      .getCustomPagesData("home")
      .then((x) => {
        // debugger;
        const imageCheck = x.data[0]?.attributes?.custom_page_images.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element?.attributes);
          }
        });
        setBackgroundImage(newBackgroundImages);
        console.log(newBackgroundImages)
        setHomePageData(x.data[0].attributes?.custom_page_contents);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    const thumbnailImageArr = [];
    holidaytypesService
      .getHolidaytypesLandingListHomePage()
      .then((x) => {
        const imageCheckType = x.data.sort(
          (a, b) =>
            a.attributes.home_page_serial_number -
            b.attributes.home_page_serial_number
        );
        imageCheckType.forEach((elementMain) => {
          if (elementMain.attributes.holiday_type_group_images.data) {
            const dataInner =
              elementMain.attributes.holiday_type_group_images.data;
            dataInner.forEach((element) => {
              if (element.attributes.image_type == "thumbnail") {
                const objThumbnail = {
                  id: elementMain?.id,
                  holiday_type_code:
                    elementMain?.attributes?.holiday_type_group_code,
                  holiday_type_name:
                    elementMain?.attributes?.holiday_type_group_name,
                  image_path: element.attributes.image_path,
                };
                thumbnailImageArr.push(objThumbnail);
              }
            });
          }
        });

        setThumbnailImageArr(thumbnailImageArr);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    blogsService
      .getAllBlogsHomePage()
      .then((x) => {
        const blogdata = x.data;
        const filteredData = blogdata.filter(
          (entry) => entry.attributes.home_page_ind
        );
        if (filteredData) {
          const sortedData = filteredData.sort(
            (a, b) =>
              a.attributes.home_page_serial_number -
              b.attributes.home_page_serial_number
          );
          sortedData.forEach((element, index) => {
            const str = element?.attributes?.blog_image_path;
            const substringToCheck = "https://www.exsus.com/";
            const containsSubstring = str.includes(substringToCheck);
            if (!containsSubstring) {
              const newStr =
                substringToCheck + "" + element?.attributes?.blog_image_path;
              sortedData[index].attributes.blog_image_path = newStr;
            }
          });
          setSortedData(sortedData);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });


    destinationService
      .getDestinationLandingList()
      .then((x) => {
        setDestinationLandingList(x.data);
        // setDestinationLandingDetails(x)
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    holidaytypesService
      .getHolidaytypesLandingList()
      .then((x) => {
        setHolidaytypesLandingList(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    destinationService
      .getAllItinerariesHomePage(region)
      .then((x) => {
        const response = x.data.sort(
          (a, b) =>
            a.attributes.home_page_serial_number -
            b.attributes.home_page_serial_number
        );
        setItineraries(response);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    whyusService
      .getAllHomeTravelReviews()
      .then((x) => {
        setTestimonials(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    homeService
      .getAllWebsiteContent()
      .then((x) => {
        // debugger;
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
          dynamicObject[element?.attributes?.content_word] = element?.attributes?.content_translation_text;
          dynamicObject['code'] = element?.attributes?.website_country?.data?.attributes?.code;
          dynamicObject['expiration'] = expirationTime;

          if (element?.attributes?.website_country?.data?.attributes?.code == 'UK') {
            dynamicObjectUk[element?.attributes?.content_word] = element?.attributes?.content_translation_text;
            dynamicObjectUk['expiration'] = expirationTime;
            localStorage.setItem("websitecontent_uk", JSON.stringify(dynamicObjectUk));
          }
          if (element?.attributes?.website_country?.data?.attributes?.code == 'US') {
            dynamicObjectUs[element?.attributes?.content_word] = element?.attributes?.content_translation_text;
            dynamicObjectUs['expiration'] = expirationTime;
            localStorage.setItem("websitecontent_us", JSON.stringify(dynamicObjectUs));
          }
          if (element?.attributes?.website_country?.data?.attributes?.code == 'ASIA') {
            dynamicObjectAsia[element?.attributes?.content_word] = element?.attributes?.content_translation_text;
            dynamicObjectAsia['expiration'] = expirationTime;
            localStorage.setItem("websitecontent_asia", JSON.stringify(dynamicObjectAsia));
          }
          if (element?.attributes?.website_country?.data?.attributes?.code == 'INDIA') {
            dynamicObjectIndia[element?.attributes?.content_word] = element?.attributes?.content_translation_text;
            dynamicObjectIndia['expiration'] = expirationTime;
            localStorage.setItem("websitecontent_india", JSON.stringify(dynamicObjectIndia));
          }

        });

        setWebsiteContent(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });


    var site_region = localStorage.getItem("site_region");

    const carouselMain = document.querySelector("#carouselExampleIntervalMain");
    if (carouselMain) {
      new bootstrap.Carousel(carouselMain);
    }
    // setTimeout(() => {
    // }, 100);


    const carousel = document.querySelector("#Testimonials");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }
    // setTimeout(() => {
    // }, 100);


    window.addEventListener("resize", equalHeight(true));
  }, []);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home</title>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
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
                {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
              </div>
              <div className="carousel-inner">
                {backgroundImage.map((imagePath, index) => (
                  <NavLink
                    key={index}
                    href="#"
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    data-bs-interval="5000"
                  >
                    <div
                      className="banner_commn_cls"
                      style={{ backgroundImage: `url(${imagePath.image_path})` }}
                    >                  <div className="carousel-caption">
                        <img
                          src="/images/banner-logo.png"
                          alt="banner-logo"
                          className="img-fluid"
                        />
                        <h2>{imagePath.image_alt_text}</h2>
                      </div></div>
                  </NavLink>
                ))}
              </div>
            </div>
            <Inspireme />
          </section>

          <section className="card_blk_row">
            <div className="container">
              <div className="row">
                {thumbnailImage?.slice(0, 6).map((holidaytypesItem, i) => (
                  <div className="col-sm-6 col-md-6 col-lg-4" key={i}>
                    <div className="card_blk_inr">
                      <NavLink
                        href={dynamicLink(
                          holidaytypesItem?.holiday_type_name,
                          holidaytypesItem?.id
                        )}
                        as={dynamicLinkHolidayas(
                          holidaytypesItem?.holiday_type_name,
                          holidaytypesItem?.id
                        )}
                      >
                        <img
                          src={dynamicThumbnailImage(
                            holidaytypesItem.image_path
                          )}
                          alt="Card image 01"
                          className="img-fluid"
                        />
                        <div className="card_blk_cntnt">
                          <div className="row align-items-center">
                            <div className="col-11">
                              <div className="card_blk_txt">
                                <h3>{holidaytypesItem?.holiday_type_name}</h3>
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
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="favrites_blk_row">
            <div className="container">
              <h3 className="title_cls">Favourite trip ideas</h3>
              <div className="card_slider_row">
                <i id="left">
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
                <div className="carousel00 region_carousel00">
                  {itineraries?.map((item) => (
                    <div className="card_slider_inr" key={item.id}>
                      <div className="card_slider">
                        <NavLink
                          href={generateDynamicLink(item)}
                          className="card_slider_img"
                        >
                          {item?.attributes?.itinerary_images?.data.map(
                            (element, index) =>
                              element.attributes.image_type == "thumbnail" ? (
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
                              <span>{item?.attributes?.sub_header_text}</span>
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
                  ))}
                </div>
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
              </div>
            </div>
            {/* <div className="full_loader_parnt_blk loader_parnt_blk" style="display: block;"><div className="loader-circle-2"></div></div> */}
          </section>

          <section
            aria-label="Client Testimonials"
            className="testimonials_blk_row"
          >
            <div className="container">
              <div
                id="Testimonials"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#Testimonials"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {testimonials.map((text, index) => (
                    <div
                      key={index}
                      target="_blank"
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      data-bs-interval="5000"
                    >
                      <div className="carousel-caption">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: text?.attributes.review_short_text,
                          }}
                        />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: text?.attributes.client_name,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="card_blk_row">
            <div className="container">
              <div className="row">
                {sortedData?.map((res) => (
                  <div className="col-sm-6 col-md-6 col-lg-4" key={res.id}>
                    <div className="card_blk_inr">
                      <NavLink href={generateDynamicLinkBlog(res.attributes?.blog_header_text)}>
                        {res?.attributes?.blog_image_path && (
                          <img
                            src={res?.attributes?.blog_image_path}
                            alt="Card image 07"
                            className="img-fluid"
                          />
                        )}
                        <div className="card_blk_cntnt">
                          <div className="row align-items-center">
                            <div className="col-11">
                              <div className="card_blk_txt">
                                <h3>{res?.attributes?.blog_header_text}</h3>
                                <p>{res?.attributes?.blog_date}</p>
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
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

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
