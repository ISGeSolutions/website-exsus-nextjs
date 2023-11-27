import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { NavLink } from "components";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { whyusService, destinationService } from "../../../services";
var Carousel = require("react-responsive-carousel").Carousel;
import { FriendlyUrl } from "../../../components";
import { EnquiryButton } from "../../../components/common/EnquiryBtn";
//import Index from "..";
export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [allExecutives, setAllExecutives] = useState([]);
  const router = useRouter();
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [customData, setCustomData] = useState(null);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightContent] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState([]);

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
      if (window.site_region !== "uk") {
        regionWiseUrl = "/" + window.site_region;
        region = window.site_region;
      }
    }
  }
  const handleRedirect = (item) => {
    const modifiedName = item.replace(/ /g, "-").toLowerCase();
    router.push(regionWiseUrl + `/why-us/our-people/${modifiedName}`);
  };

  const websiteContentCheck = () => {
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
            localStorage.setItem(
              "websitecontent_uk",
              JSON.stringify(dynamicObjectUk)
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code == "US"
          ) {
            dynamicObjectUs[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectUs["expiration"] = expirationTime;
            localStorage.setItem(
              "websitecontent_us",
              JSON.stringify(dynamicObjectUs)
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "ASIA"
          ) {
            dynamicObjectAsia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectAsia["expiration"] = expirationTime;
            localStorage.setItem(
              "websitecontent_asia",
              JSON.stringify(dynamicObjectAsia)
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "INDIA"
          ) {
            dynamicObjectIndia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectIndia["expiration"] = expirationTime;
            localStorage.setItem(
              "websitecontent_india",
              JSON.stringify(dynamicObjectIndia)
            );
          }
        });

        setWebsiteContent(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });
  };

  // const ExpertDetail = ({ data }) => {
  //     const router = useRouter();
  //     const handleButtonClick = () => {
  //         router.push(`/travel-expert-detail?expertid=${data}`); // Navigate to the /travel-expert-detail page
  //     };

  //     return (
  //         // JSX for your component
  //         <button className="btn prmry_btn make_enqury_btn" onClick={handleButtonClick}>Read more
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
  //         </button>);
  // };

  equalHeight(true);

  useEffect(() => {
    setFriendlyUrl(`Home/Why us/Our people`);
    const localStorageDictionary = localStorage.getItem("websitecontent_uk");

    whyusService
      .getAllExecutives()
      .then((x) => {
        const modifiedData = [];
        // setAllExecutives(x.data);
        const data = x.data;
        if (data) {
          let modifiedString = "";
          data.forEach((element, index) => {
            let content = {};
            modifiedString = element?.attributes?.intro_text;
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
                      const checkStr = new RegExp(
                        `\\$\\{${matchString}\\}`,
                        "g"
                      );
                      if (checkStr && replacement) {
                        modifiedString = modifiedString.replace(
                          checkStr,
                          replacement
                        );
                      }
                    });
                    content = element.attributes;
                    content["intro_text"] = modifiedString;
                    modifiedData.push(content);
                    setIsLoading(false);
                  } catch (error) {
                    if (error.message === "Loop break") {
                    } else if (error.message === "Region not found") {
                    }
                  }
                }
              }
            } else {
              modifiedData.push(element.attributes);
            }

            setIsLoading(false);
          });
        }
        // console.log(modifiedData);
        setAllExecutives(modifiedData);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    whyusService
      .getExpertsPage()
      .then((x) => {
        setCustomData(x.data[0]);
        const imageCheck = x.data[0].attributes.custom_page_images.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element.attributes.image_path);
          }
        });
        setBackgroundImage(newBackgroundImages);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              setLongText(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightContent(element?.attributes?.content_value);
            }
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    const carousel = document.querySelector("#carouselExampleInterval");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }

    const carousel1 = document.querySelector("#Testimonials");
    if (carousel1) {
      new bootstrap.Carousel(carousel1);
    }

    window.addEventListener("resize", equalHeight(true));
  }, []);

  return (
    <Layout>
      <Head>
        <script src="assets/javascripts/experts-equal-height.js"></script>
        <title>{title}</title>
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
            {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/./../images//destination_banner.jpg" />
                    </div>
                </Carousel> */}
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
                      style={{ backgroundImage: `url(${imagePath})` }}
                    ></div>
                  </NavLink>
                ))}
              </div>
            </div>
          </section>

          {/* Meet our experts call */}
          <section className="our_exprts_row">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
              </div>
              <div className="row">
                {allExecutives?.map((res, index) => (
                  <div className="col-sm-6 col-lg-4 col-xxl-3" key={res.id}>
                    <div className="our_exprts_inr" key={res.id}>
                      <img
                        key={res.id}
                        src={res?.executive_image_path}
                        alt="expert01"
                        className="img-fluid"
                      />
                      <div className="expert_info" key={res.id}>
                        <h2>{res?.executive_name}</h2>
                        <h3>{res?.executive_role}</h3>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: res?.intro_text,
                          }}
                        />
                      </div>
                      <button
                        key={res.id}
                        className="btn prmry_btn make_enqury_btn"
                        onClick={() => handleRedirect(res?.executive_name)}
                      >
                        Read more
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
                      {/* {" "} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Client Testimonials */}
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
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="5"
                    aria-label="Slide 6"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="6"
                    aria-label="Slide 7"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#Testimonials"
                    data-bs-slide-to="7"
                    aria-label="Slide 8"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        All the personal details and touches were amazing and
                        much appreciated. Too many highlights to say! So much
                        history, lovely spots to stay, the people, the curries,
                        the fruit...
                      </p>
                      <span>
                        Suzie & Henry travelled to Sri Lanka, March 2022
                      </span>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        Charlotte was excellent as always - friendly and
                        approachable, with lots of ideas when discussing
                        itineraries, and the mix of city and sea worked well.
                      </p>
                      <span>
                        Filippo E travelled to Portugal, February 2022
                      </span>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        We loved Costa Rica. Ashleigh was great at organising
                        our trip, and when coronavirus changed everything, she
                        comforted us and reassured us that we were able to get
                        home.
                      </p>
                      <span>
                        Suzie & Henry travelled to Costa Rica, March 2020
                      </span>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        Katie was a very good communicator and was quick to
                        research our specific requests. We loved everything
                        about our trip, especially seeing penguins and giraffes!
                      </p>
                      <span>
                        Exsus travellers who travelled to South Africa in
                        December 2019/January 2020
                      </span>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        Our holiday in Africa was excellent. Mark went out of
                        his way to organise this trip for us. We loved it - OMG
                        it was the most magical place.
                      </p>
                      <span>
                        Ms J. Tighe travelled to South Africa, Botswana and
                        Zimbabwe, September 2019
                      </span>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        Ashleigh was amazing. She listened to all our
                        preferences and interests and put together the most
                        perfect itinerary for us.
                      </p>
                      <span>
                        Exsus travellers who travelled to Peru, September 2019
                      </span>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        Our holiday was honestly awesome. Gina tailored the trip
                        extremely well to our needs, and everything was
                        brilliant. We had a fantastic time.
                      </p>
                      <span>
                        The Tonge family travelled to Norway, August 2019
                      </span>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="5000">
                    <div className="carousel-caption">
                      <p>
                        From beginning to end, our holiday was like a fairytale.
                        We would not change a thing.
                      </p>
                      <span>
                        Mike & Debbie Edwards travelled to Italy, July/August
                        2019
                      </span>
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
    </Layout>
  );
}
