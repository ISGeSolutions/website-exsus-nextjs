import { useState, useEffect } from "react";

import { Link, Spinner, Signup, FriendlyUrl } from "components";
import {
  destinationService,
  alertService,
  userService,
  whyusService,
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

  const dynamicImage = (itemId) => {
    return itemId;
  };

  const EnquiryButton = () => {
    const router = useRouter();

    const handleEnquiryClick = () => {
      router.push("/contact-us"); // Navigate to the /enquiry page
    };

    return (
      <button
        className="btn prmry_btn make_enqury_btn"
        onClick={handleEnquiryClick}
      >
        {" "}
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
    );
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
    router.push("/where-to-go");
  };

  useEffect(() => {
    // destinationService.getAll().then(x => {
    //     console.log('x', x);
    //     setDestinations(x)
    // });

    // destinationService.getDestinationLandingPage().then(x => {

    //     // setDestinationLandingDetails(x)

    // });

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
      .getAllTravelReviews()
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
        const imageCheck = x.data[0].attributes.custom_page_images.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element.attributes.image_type == "center") {
            setBackgroundImgWhentogo(element.attributes);
          } else if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element.attributes.image_path);
          }
        });
        const whenToGoImage =
          destinations?.attributes?.custom_page_contents?.data?.filter(
            (res) => res.attributes?.content_name == "WhenToGoWhereImagePath"
          )[0]?.attributes?.content_value;
        setBackgroundImgWhentogo(
          whenToGoImage?.includes("https")
            ? whenToGoImage
            : "https://online.exsus.com/" + whenToGoImage
        );
        setBackgroundImage(newBackgroundImages);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    const carousel1 = document.querySelector("#carouselExampleInterval");
    if (carousel1) {
      new bootstrap.Carousel(carousel1);
    }

    const carousel = document.querySelector("#Testimonials");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          {
            destinations?.attributes?.custom_page_contents?.data?.filter(
              (res) => res.attributes?.content_name == "Title"
            )[0]?.attributes?.content_value
          }
        </title>
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
                  data={destinations?.attributes?.page_friendly_url}
                ></FriendlyUrl>
              </div>
              <div className="row">
                <div className="destinations_cntnt_blk">
                  <h2>
                    {
                      destinations?.attributes?.custom_page_contents?.data?.filter(
                        (res) =>
                          res.attributes?.content_name == "LuxuryHolidaysHeader"
                      )[0].attributes?.content_value
                    }
                  </h2>
                  <p>
                    {
                      destinations?.attributes?.custom_page_contents?.data?.filter(
                        (res) =>
                          res.attributes?.content_name == "LuxuryHolidaysText"
                      )[0].attributes?.content_value
                    }
                  </p>
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
                          destinationItem?.attributes?.destination_name,
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
            <div className="container">
              <div className="destination_text_overlay_inr">
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

          <section className="make_enqury_row">
            <div className="container">
              <h3>{destinations?.attributes?.page_content_3}</h3>
              <p>{destinations?.attributes?.page_content_4}</p>
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
    </>
  );
}
