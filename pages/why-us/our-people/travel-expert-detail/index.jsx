import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { userService, homeService } from "services";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { whyusService, destinationService } from "../../../../services";
var Carousel = require("react-responsive-carousel").Carousel;
import { FriendlyUrl } from "../../../../components";
import { EnquiryButton } from "../../../../components/common/EnquiryBtn";

export default Index;

function Index() {
  const router = useRouter();
  const [users, setUsers] = useState(null);
  const [executiveData, setExecutiveData] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const { prefixOfImage } = useState("https://www.exsus.com/");
  const expertName = router.query?.executiveName?.replace(/-/g, " ");
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [expertData, setExpertData] = useState();
  const [travelContent, setTravelContent] = useState();
  let dictionaryPage = 1;

  const equalHeight = (resize) => {
    var elements = document.getElementsByClassName(
      "card_slider_cnt places_to_stay_cnt"
    ),
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
          debugger;
          if (
            element?.attributes?.website_country?.data?.attributes?.code == "UK"
          ) {
            dynamicObjectUk[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectUk["expiration"] = expirationTime;
            let localStorageUk = JSON.parse(localStorage.getItem("websitecontent_uk"));
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
            let localStorageUS = JSON.parse(localStorage.getItem("websitecontent_us"));
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
            let localStorageAsia = JSON.parse(localStorage.getItem("websitecontent_asia"));
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
            let localStorageIndia = JSON.parse(localStorage.getItem("websitecontent_india"));
            localStorage.setItem(
              "websitecontent_india",
              JSON.stringify({ ...localStorageIndia, ...dynamicObjectIndia })
            );
          }
        });
        if (x?.meta?.pagination?.pageCount > x?.meta?.pagination?.page) {
          dictionaryPage = x?.meta?.pagination?.page + 1
          websiteContentCheck(dictionaryPage)
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
    // debugger;
    let modifiedString = data;
    if (modifiedString) {
      const regex = /{[a-zA-Z0-9-]+}/g;
      const matches = [
        ...new Set(
          typeof modifiedString === "string" ? modifiedString?.match(regex) : ""
        ),
      ];

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
                modifiedString = modifiedString.replace(checkStr, replacement);
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
  };

  equalHeight(true);

  useEffect(() => {
    if (!localStorage.getItem(`websitecontent_${region.replace(
      /in/g,
      "INDIA"
    ).toLowerCase()}`)) {
      websiteContentCheck(dictionaryPage);
    }
    // userService.getAll().then(x => setUsers(x));

    // const carousel = document.querySelector('#carouselExampleInterval');
    // new bootstrap.Carousel(carousel);
    setFriendlyUrl(`home/why us/our people/${expertName}`);
    whyusService
      .getExecutivesById(expertName)
      .then((x) => {
        const response = x.data[0];
        // const str = response?.attributes?.executive_image_path;
        // const substringToCheck = "https://www.exsus.com/";
        // const containsSubstring = str.includes(substringToCheck);
        // if (!containsSubstring) {
        //   const newStr =
        //     substringToCheck + "" + response?.attributes?.executive_image_path;
        //   response.attributes.executive_image_path = newStr;
        // }

        setExpertData(response);
        //setTravelContent(response?.attributes?.travel_executive_contents.data);
        setTravelContent(response);
        setTestimonials(response?.attributes?.travel_reviews.data);

        const data = x.data[0];
        let modifiedString = response?.attributes?.intro_text;

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
              setExecutiveData(modifiedString);
              setIsLoading(false);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
                // setLongText(modifiedString);
              }
            }
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });

    const carousel1 = document.querySelector("#Testimonials");
    if (carousel1) {
      new bootstrap.Carousel(carousel1);
    }

    window.addEventListener("resize", equalHeight(true));
    const slider = document.querySelector(".items");
    const slides = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".button");

    let current = 0;
    let prev = 2;
    let next = 1;

    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener("click", () =>
        i == 0 ? gotoPrev() : gotoNext()
      );
    }

    const gotoPrev = () =>
      current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

    const gotoNext = () => (current < 2 ? gotoNum(current + 1) : gotoNum(0));

    const gotoNum = (number) => {
      current = number;
      prev = current - 1;
      next = current + 1;

      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].classList.remove("prev");
        slides[i].classList.remove("next");
      }

      if (next == 3) {
        next = 0;
      }

      if (prev == -1) {
        prev = 2;
      }

      if (slides[current] != undefined) {
        slides[current].classList.add("active");
      }
      if (slides[prev] != undefined) {
        slides[prev].classList.add("prev");
      }
      if (slides[next] != undefined) {
        slides[next].classList.add("next");
      }
    };
  }, [expertName]);

  return (
    <Layout>
      <Head>
        <script src="assets/javascripts/experts-equal-height.js"></script>
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
          <section className="our_exprts_detls_row">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
              </div>
              <div className="exprts_cntnt_blk">
                <div className="row">
                  <div className="col-md-4 col-lg-3 col-xl-2">
                    <div className="our_exprts_inr">
                      <img
                        src={expertData?.attributes?.executive_image_path}
                        alt="expert01"
                        className="img-fluid"
                      />
                      <ul>
                        <li>
                          <a href="#">
                            <em className="material-symbols-outlined">call</em>
                            {expertData?.attributes?.contact_no}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="material-symbols-outlined">mail</em>
                            Email
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-9 col-xl-10">
                    <h2>{expertData?.attributes?.executive_name}</h2>
                    <h3>{expertData?.attributes?.executive_role}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dictioneryFunction(executiveData),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="our_exprts_slider">
            <div className="container">
              <h3>My Top Tips</h3>
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide "
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {travelContent?.attributes?.travel_executive_contents.data
                    ?.filter((res) => res.attributes.content_type == "Top_tips")
                    ?.map((res1) => (
                      <div className="carousel-item active" key={res1.id}>
                        <div className="our_exprts_slider_grp">
                          <div className="row">
                            <div className="col-md-6 m-auto">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: dictioneryFunction(
                                    res1?.attributes?.intro_text
                                  ),
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <img
                                src={res1.attributes?.image_path}
                                className=""
                                alt="our_exprts_slider01"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </section>

          <section className="our_exprts_img_txt card_blk_row">
            <div className="container">
              <div className="row">
                {travelContent?.attributes?.travel_executive_contents?.data
                  ?.filter((res) => res.attributes.content_type == "Favourites")
                  ?.map((res1) => (
                    <div className="col-sm-6 col-lg-4 col-xxl-3">
                      <div className="card_blk_inr">
                        <div className="item active">
                          <a>
                            <img
                              src={res1.attributes?.image_path}
                              alt="expert_favourite_pic01"
                              className="img-fluid"
                            />

                            <div className="card_blk_cntnt">
                              <div className="row align-items-center">
                                <div className="col-11">
                                  <div className="card_blk_txt">
                                    <h3>{res1?.attributes?.image_text}</h3>
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
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        {/* <p className="card_extra_para">
                          {travelContent?.attributes?.intro_text}
                        </p> */}
                        <p
                          dangerouslySetInnerHTML={{
                            __html: dictioneryFunction(
                              res1?.attributes?.intro_text
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* My favourite pictures  */}
          <section className="favourite_pic_row">
            <div className="container">
              <h3>My favourite pictures</h3>
              <div className="items">
                {travelContent?.attributes?.travel_executive_contents?.data
                  ?.filter(
                    (res) => res.attributes.content_type == "Client_images"
                  )
                  ?.map((res1) => (
                    <div className="item active">
                      <img
                        src={res1.attributes?.image_url}
                        alt="expert_favourite_pic01"
                        className="img-fluid"
                      />
                      <p>{res1?.attributes?.intro_text}</p>
                    </div>
                  ))}
                <div className="button-container">
                  <div className="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fff"
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
                      ></path>
                    </svg>
                  </div>
                  <div className="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fff"
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
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <section
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
                        <p>{text?.attributes.review_short_text}</p>
                        <span>{text?.attributes.client_name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section> */}

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
              <h4>Sign up for our newsletter</h4>
              <h5>Receive our latest news and special offers</h5>
              <Signup />
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}
