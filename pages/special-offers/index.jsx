import { useState, useEffect } from "react";
import { useRef } from "react";
import { Link, Spinner, Signup, FriendlyUrl } from "components";
import Iframe from "react-iframe";
import { Layout } from "components/users";
import {
  userService,
  specialoffersService,
  destinationService,
} from "services";
import { NavLink } from "components";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [allOffers, setAllOffers] = useState([]);
  const [destinations, setDestinations] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [mapVariable, setMapVariable] = useState(null);
  const [subTitle, setSubTitle] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState([]);


  const handleRedirect = () => {
    router.push(regionWiseUrl + `/hotel-detail`);
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
  //let region = "uk";
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
      if (window.site_region !== "uk") regionWiseUrl = "/" + window.site_region;
    }
  }

  const generateDynamicLink = (item) => {
    return regionWiseUrl + `/hotel-detail`;
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

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    specialoffersService
      .getAllOffers()
      .then((x) => {
        setAllOffers(x.data);
        setIsLoading(false);
        setFriendlyUrl(`home/special offers`);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    specialoffersService
      .getOffersCustomePage()
      .then((x) => {
        setCareerData(x.data[0]);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        const imageCheck = x.data[0].attributes?.custom_page_images?.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element?.attributes?.image_type == "banner") {
            newBackgroundImages.push(element?.attributes?.image_path);
          }
        });
        setBackgroundImage(newBackgroundImages);
        let modifiedString = "";

        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value.toUpperCase());
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              modifiedString = element?.attributes?.content_value;
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightCorner(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Sub_Title") {
              setSubTitle(element?.attributes?.content_value);
            }
          });
        }

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
              setLongText(modifiedString);
              setIsLoading(false);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
                setLongText(modifiedString);
              }
            }
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });

    const carousel = document.querySelector("#carouselExampleInterval");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }

    window.addEventListener("resize", equalHeight(true));
    // return () => {
    //   // Cleanup code (if needed) when the component unmounts
    //   tooltipList.forEach(tooltip => tooltip.dispose());
    // };

  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={metaDescription}></meta>
        {/* <script
          type="text/javascript"
          src="/assets/javascripts/bootstrap.min.js"
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
                    href="#"
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

          <section className="card_blk_row destinations_blk_row light_grey">
            <div className="container">
              <div className="bookmark_row">
                {/* {/ <p style={{ color: `white` }}>{destinations?.attributes?.page_friendly_url}</p > /} */}
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
              </div>
              <div className="row">
                <div className="destinations_cntnt_blk">
                  <h2>{headingTag}</h2>
                  <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: longText }}
                  ></p>
                </div>
              </div>
            </div>
          </section>

          <section className="card_blk_row destinations_blk_row pb-0">
            <div className="container">
              <div className="row">
                <div className="col-12 favrites_blk_row pb-0">
                  <h3 className="title_cls pb-0">{subTitle}</h3>
                  <div className="destination_contries_filter d-flex justify-content-around">
                    <ul>
                      <li>
                        <a href="#" className="active">
                          Exsus recommends
                        </a>
                      </li>
                      <li>
                        <a href="#">Alphabetical</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Offer on Hotels */}
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <div className="card_slider_row">
                <div className="carousel00 width_100">
                  <div className="row">
                    {allOffers?.map((res) => (
                      <NavLink href={generateDynamicLink(res.id)}>
                        <div
                          className="col-sm-6 col-lg-4 col-xxl-3"
                          key={res.id}
                        >
                          <div className="card_slider_inr">
                            <div className="card_slider">
                              <a className="card_slider_img">
                                <img
                                  src={res.attributes.thumbnail_image_path}
                                  alt="offer_card01"
                                  className="img-fluid"
                                />
                                <span className="img_specl_offer">
                                  Special offer
                                </span>
                              </a>
                              <div className="card_slider_cnt">
                                <h4>
                                  <a>{res.attributes.offer_text}</a>
                                </h4>
                                <ul>
                                  <li>
                                    Location: {res.attributes.subtitle_text}
                                  </li>
                                  <li>
                                    <p>
                                      Price guide:
                                      <span
                                        tabIndex="0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-title="£200-£350 per person per night"
                                        data-bs-trigger="hover"
                                      >
                                        £££<label>££</label>
                                      </span>
                                    </p>
                                  </li>
                                  <li className="pink_text">
                                    Special offer: {res.attributes.title_text}
                                  </li>
                                  <li>
                                    Best for:
                                    <span>
                                      Luxury Hotel, Setting & Views, Beach,
                                      Family-friendly
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <button className="btn card_slider_btn justify-content-end">
                                <span
                                  className="view_itnry_link"
                                  onClick={handleRedirect}
                                >
                                  View this hotel
                                  <em className="fa-solid fa-chevron-right"></em>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enqury */}
          <section className="make_enqury_row">
            <div className="container">
              <h3>YOUR JOURNEY STARTS HERE</h3>
              <p>
                call us on 020 7337 9010 to start planning your perfect trip
              </p>
              <button className="btn prmry_btn make_enqury_btn">
                Make an enquiry
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
              </button>
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
