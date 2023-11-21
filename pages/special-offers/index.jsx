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
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { useRouter } from "next/router";

var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const router = useRouter();
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

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") regionWiseUrl = "/" + window.site_region;
    }
  }

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
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
    specialoffersService
      .getAllOffers()
      .then((x) => {
        setAllOffers(x.data);
        setFriendlyUrl(`home/special offers`);
      })
      .catch((error) => {
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
          </section>

          <section className="card_blk_row destinations_blk_row light_grey">
            <div className="container">
              <div className="bookmark_row">
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
                  <h3 className="title_cls pb-0">
                    Our favourite special offers on luxury holidays
                  </h3>
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

          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
            <div className="container">
              <div className="card_slider_row">
                <div className="carousel00 width_100">
                  <div className="row">
                    {allOffers?.map((res) => (
                      <div className="col-sm-6 col-lg-4 col-xxl-3">
                        <div className="card_slider_inr">
                          <div className="card_slider">
                            <NavLink
                              key={res?.id}
                              href={generateDynamicLink(res?.id)}
                            >
                              {/* console.log error => Dont add anchor tag for the below element. you can use onclick fun. */}
                              <span
                                key={res?.id}
                                href="#"
                                className="card_slider_img"
                              >
                                <img
                                  key={res?.id}
                                  src={res.attributes.thumbnail_image_path}
                                  alt="offer_card01"
                                  className="img-fluid"
                                />
                                <span className="img_specl_offer">
                                  Special offer
                                </span>
                              </span>
                            </NavLink>
                            <div className="card_slider_cnt">
                              <NavLink
                                key={res?.id}
                                href={generateDynamicLink(res?.id)}
                              >
                                <h4>
                                  {/* console.log error => Dont add anchor tag for the below element. you can use onclick fun. */}
                                  <span key={res?.id} href="#">
                                    {res?.attributes?.offer_text}
                                  </span>
                                </h4>
                              </NavLink>
                              <ul>
                                <li>
                                  Location: {res?.attributes?.subtitle_text}
                                </li>
                                <li>
                                  <p>
                                    Price guide:
                                    <span
                                      key={res?.id}
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
                                  Special offer: {res?.attributes?.title_text}
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
                                key={res?.id}
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <section className="make_enqury_row">
            <div className="container">
              <EnquiryButton />
            </div>
          </section> */}

          {/* <section
            aria-label="Sign up for newsletter"
            className="newslettr_row"
          >
            <div className="container">
              <h4>Sign up for our newsletter</h4>
              <h5>Receive our latest news and special offers</h5>
              <Signup />
            </div>
          </section> */}
        </div>
      )}
    </>
  );
}
