import { useState, useEffect } from "react";

import { Link, Spinner, Signup, FriendlyUrl } from "components";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import {
  destinationService,
  alertService,
  userService,
  whyusService,
  homeService,
} from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import generateDynamicLink from "components/utils/generateLink";
import Image from "next/image";

export default Index;

function Index() {
  const router = useRouter();

  const [destinations, setDestinations] = useState();

  // const [destinationLandingDetails, setDestinationLandingDetails] = useState();
  const [destinationLandingList, setDestinationLandingList] = useState();
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [backgroundImgWhentogo, setBackgroundImgWhentogo] = useState({});
  const [visible, setVisible] = useState(2);
  const [visiblePagination, setVisiblePagination] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [subTitle, setSubTitle] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightCorner] = useState(null);
  let dictionaryPage = 1;

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") {
        region = window.site_region;
        regionWiseUrl = "/" + window.site_region;
      }
    }
  }

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  function capitalizeEveryWord(text) {
    return text?.replace(/\b\w+/g, function (match) {
      if (match.toLowerCase() === "made") {
        return match.toLowerCase();
      }
      return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });
  }

  const dynamicImage = (itemId) => {
    return itemId;
  };

  const dynamicLink = (itemName, id) => {
    const modifieditem = itemName
      .replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    if (itemName) {
      return regionWiseUrl + `/destinations/${modifieditem}`;
    } else if (itemId && itemId == "AS") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "AU") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "CA") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "EU") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "IO") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "IS") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    }
  };

  const wheretogoRedirect = () => {
    router.push("/where-to-go"); // Redirect to '/new-route'
  };

  const handleWhenToGoClick = () => {
    router.push(regionWiseUrl + "/where-to-go");
  };

  // const handleHrefClick = (event) => {
  //   event.preventDefault();
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
      //
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
        //
        // You can access it using localStorage.getItem('yourKey')

        if (matches) {
          let replacement = "";
          try {
            matches.forEach((match, index, matches) => {
              const matchString = match.replace(/{|}/g, "");
              if (!storedData[matchString]) {
                if (storedData[matchString.toLowerCase()]) {
                  replacement = storedData[matchString.toLowerCase()];
                }
              } else {
                replacement = storedData[matchString];
                if (!replacement) {
                  replacement = storedData[matchString.toLowerCase()];
                }
              }
              const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
              if (checkStr && replacement) {
                modifiedString = modifiedString.replace(checkStr, replacement);
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
  };

  useEffect(() => {
    $(".succss_msg_parnt").hide();
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    destinationService
      .getDestinationLandingList()
      .then((x) => {
        setDestinationLandingList(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    whyusService
      .getAllDestinationTravelReviews()
      .then((x) => {
        setTestimonials(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    destinationService
      .getCustomPagesData("destinations")
      .then((x) => {
        setDestinations(x.data[0]);
        localStorage.setItem(
          "PageInfo",
          JSON.stringify({
            pType: "CUST",
            pCode: x?.data[0]?.attributes?.page_code,
          })
        );
        const imageCheck = x.data[0].attributes.custom_page_images.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element.attributes.image_type == "center") {
            // setBackgroundImgWhentogo(element.attributes);
          } else if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element.attributes.image_path);
          }
        });
        const whenToGoImage =
          x.data[0]?.attributes?.custom_page_contents?.data?.filter(
            (res) => res.attributes?.content_name == "WhenToGoWhereImagePath"
          )[0]?.attributes?.content_value;
        setBackgroundImgWhentogo(
          whenToGoImage?.includes("https")
            ? whenToGoImage
            : `https://online.exsus.com/${whenToGoImage}`
        );
        setBackgroundImage(newBackgroundImages);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    // const carousel1 = document.querySelector("#carouselExampleInterval");
    // if (carousel1) {
    //   new bootstrap.Carousel(carousel1);
    // }

    // const carousel = document.querySelector("#Testimonials");
    // if (carousel) {
    //   new bootstrap.Carousel(carousel);
    // }
  }, []);

  return (
    <>
      <Head>
        <title>
          {dictioneryFunction(
            destinations?.attributes?.custom_page_contents?.data?.filter(
              (res) => res.attributes?.content_name == "Title"
            )[0]?.attributes?.content_value
          )}
        </title>
        <meta
          name="description"
          content={dictioneryFunction(
            destinations?.attributes?.custom_page_contents?.data?.filter(
              (res) => res.attributes?.content_name == "MetaDescription"
            )[0]?.attributes?.content_value
          )}
        ></meta>
        <script
          type="text/javascript"
          src="/assets/javascripts/card-slider.js"
        ></script>
      </Head>
      {isLoading ? (
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
                  <NavLink
                    key={index}
                    href="#"
                    onClick={handleHrefClick}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    data-bs-interval="5000"
                  >
                    <div
                      className="banner_commn_cls"
                      style={{ backgroundImage: `url(${imagePath})` }}
                    ></div>
                  </NavLink>
                ))}
              </div>
            </div>
            <Inspireme />
          </section>

          <section className="card_blk_row destinations_blk_row light_grey">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl
                  data={"home/" + destinations?.attributes?.page_friendly_url}
                ></FriendlyUrl>
              </div>
              <div className="row">
                <div className="destinations_cntnt_blk">
                  <h2>
                    {capitalizeEveryWord(
                      dictioneryFunction(
                        destinations?.attributes?.custom_page_contents?.data?.filter(
                          (res) =>
                            res.attributes?.content_name ==
                            "LuxuryHolidaysHeader"
                        )[0]?.attributes?.content_value
                      )
                    )}
                  </h2>
                  <p
                    // className="mb-3"
                    dangerouslySetInnerHTML={{
                      __html: dictioneryFunction(
                        destinations?.attributes?.custom_page_contents?.data?.filter(
                          (res) => res.attributes?.content_name == "Long_Text"
                        )[0]?.attributes?.content_value
                      ),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </section>

          <section className="card_blk_row destinations_blk_row">
            <div className="container">
              <div className="row">
                {destinationLandingList?.map((destinationItem, id) => (
                  <div className="col-sm-6" key={destinationItem?.id}>
                    <div className="card_blk_inr">
                      <NavLink
                        href={dynamicLink(
                          destinationItem?.attributes?.friendly_url,
                          destinationItem?.id
                        )}
                      >
                        <img
                          src={dynamicImage(
                            destinationItem?.attributes?.destination_images?.data.filter(
                              (res) => res?.attributes.image_type == "thumbnail"
                            )[0]?.attributes.image_path
                          )}
                          alt="destination01"
                          className="img-fluid"
                        />

                        <div className="card_blk_cntnt card_blk_sml_arw">
                          <div className="row align-items-center">
                            <div className="col-11">
                              <div className="card_blk_txt">
                                <h3 className="mb-0">
                                  {
                                    destinationItem?.attributes
                                      ?.destination_name
                                  }
                                </h3>
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
            className="destination_text_overlay_row"
            style={{
              backgroundImage: `url(${backgroundImgWhentogo})`,
            }}
          >
            <div className="container-fluid">
              <div className="destination_text_overlay_inr">
                <div className="destination_new_inr">
                  <h4>
                    {
                      destinations?.attributes?.custom_page_contents?.data?.filter(
                        (res) => res.attributes?.content_name == "BestTimeHeader"
                      )[0]?.attributes?.content_value
                    }
                  </h4>
                  <h5>
                    {
                      destinations?.attributes?.custom_page_contents?.data?.filter(
                        (res) => res.attributes?.content_name == "BestTimeText"
                      )[0]?.attributes?.content_value
                    }
                  </h5>
                  {/* style={{ backgroundImage: `url(${backgroundImage})` }} */}
                  <button
                    className="btn prmry_btn make_enqury_btn"
                    onClick={handleWhenToGoClick}
                  >
                    View travel calender
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
              </div>
            </div>
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
                      key={_?.id}
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
                        <p>
                          {dictioneryFunction(text?.attributes.review_text.replace(/&nbsp;/g, ' '))
                            ?.replace(/&nbsp/g, "")
                            ?.replace(/&rsquo/g, "'")
                            ?.replace(/;/g, "")}
                        </p>
                        <span>{text?.attributes.client_name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="make_enqury_row">
            <div className="container">
              <EnquiryButton />
            </div>
          </section>

          <section
            aria-label="Sign up for newsletter"
            className="newslettr_row"
          >
            <div className="container">
              <h4>Sign up for our newsletter
                <span>Receive our latest news and special offers</span></h4>
              <Signup />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
