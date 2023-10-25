import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { whyusService } from "../../services";
var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const router = useRouter();
  const [users, setUsers] = useState(null);
  const [executiveData, setExecutiveData] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const { prefixOfImage } = useState("https://www.exsus.com/");
  const expertId = router.query.expertid;
  const [isLoading, setIsLoading] = useState(true);

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

  const EnquiryButton = () => {
    const router = useRouter();

    const handleEnquiryClick = () => {
      router.push(`/contact-us`); // Navigate to the /enquiry page
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

  equalHeight(true);

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));

    // const carousel = document.querySelector('#carouselExampleInterval');
    // new bootstrap.Carousel(carousel);

    whyusService
      .getExecutivesById(expertId)
      .then((x) => {
        const response = x.data;
        const str = response?.attributes?.executive_image_path;
        const substringToCheck = "https://www.exsus.com/";
        const containsSubstring = str.includes(substringToCheck);
        if (!containsSubstring) {
          const newStr =
            substringToCheck + "" + response?.attributes?.executive_image_path;
          response.attributes.executive_image_path = newStr;
        }
        setExecutiveData(response);
        console.log(response);
        setTestimonials(response.attributes.travel_reviews.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });

    const carousel1 = document.querySelector("#Testimonials");
    new bootstrap.Carousel(carousel1);

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
        console.log(slides[current]);
        slides[current].classList.add("active");
      }
      if (slides[prev] != undefined) {
        slides[prev].classList.add("prev");
      }
      if (slides[next] != undefined) {
        slides[next].classList.add("next");
      }
    };
  }, [expertId]);

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
                <ul>
                  <li>
                    <a href="homepage.html">Home</a>
                  </li>
                  <li>
                    <a href="why_us.html">Why us</a>
                  </li>
                  <li>
                    <a href="our_people.html">Our Team</a>
                  </li>
                  <li>Tom Cloherty</li>
                </ul>
              </div>
              <div className="exprts_cntnt_blk">
                <div className="row">
                  <div className="col-md-4 col-lg-3 col-xl-2">
                    <div className="our_exprts_inr">
                      <img
                        src={executiveData?.attributes?.executive_image_path}
                        alt="expert01"
                        className="img-fluid"
                      />
                      <ul>
                        <li>
                          <a href="#">
                            <em className="material-symbols-outlined">call</em>
                            {executiveData?.attributes?.contact_no}
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
                    <h2>{executiveData?.attributes?.executive_name}</h2>
                    <h3>{executiveData?.attributes?.executive_role}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: executiveData?.attributes?.intro_text,
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
                  {executiveData?.attributes?.travel_executive_contents?.data
                    ?.filter((res) => res.attributes.content_type == "Top_tip")
                    ?.map((res1) => (
                      <div className="carousel-item active" key={res1.id}>
                        <div className="our_exprts_slider_grp">
                          <div className="row">
                            <div className="col-md-6 m-auto">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: res1?.attributes?.intro_text,
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <img
                                src={
                                  res1.attributes?.image_path.startsWith(
                                    "https://www.exsus.com/"
                                  )
                                    ? res1?.attributes?.image_path
                                    : "https://www.exsus.com/" +
                                    res1?.attributes?.image_path
                                }
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
                <div className="col-sm-6 col-lg-4 col-xxl-3">
                  <div className="card_blk_inr">
                    <a href="#" target="_blank">
                      <img
                        src="assets/images/our_exprts_card01.jpg"
                        alt="Card image 01"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>Stay on a private island in the Caribbean</h3>
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
                    <p className="card_extra_para">
                      Jumby Bay is holiday heaven! From its secluded private
                      island location just off of Antigua’s coast, to the
                      luxurious suites and villas, first-className amenities and
                      gorgeous beaches, it is perfect for a special celebration.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xxl-3">
                  <div className="card_blk_inr">
                    <a href="#" target="_blank">
                      <img
                        src="assets/images/our_exprts_card02.jpg"
                        alt="Card image 02"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>Take in the highlights of Cuba</h3>
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
                    <p className="card_extra_para">
                      I love Cuba. This highlights holiday offers a fantastic
                      combination of the cities of Havana and Trinidad and the
                      'Garden of Cuba' at Vinales and Las Terrazas, and you can
                      unwind on the beach in the stunning Cayo Santa Maria.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xxl-3">
                  <div className="card_blk_inr">
                    <a href="#" target="_blank">
                      <img
                        src="assets/images/our_exprts_card03.jpg"
                        alt="Card image 03"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>Unusual places to stay around the world</h3>
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
                    <p className="card_extra_para">
                      I'm a fan of the unusual. Come home from a holiday with
                      stories to tell, after staying at some of these amazing
                      and enchanting places around the world, from a luxury
                      train to a four-poster bed beneath starry skies and a
                      candlelit cave.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xxl-3">
                  <div className="card_blk_inr">
                    <a href="#" target="_blank">
                      <img
                        src="assets/images/our_exprts_card04.jpg"
                        alt="Card image 04"
                        className="img-fluid"
                      />
                      <div className="card_blk_cntnt">
                        <div className="row align-items-center">
                          <div className="col-11">
                            <div className="card_blk_txt">
                              <h3>Find paradise in the Seychelles</h3>
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
                    <p className="card_extra_para">
                      One of my most memorable experiences has been on the
                      island of Desroches in the Seychelles. I was surprised
                      with cocktails on the runway at night time under the stars
                      and had a wonderful meal courtesy of the Four Seasons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="favourite_pic_row">
            <div className="container">
              <h3>My favourite pictures</h3>
              <div className="items">
                {executiveData?.attributes?.travel_executive_contents?.data
                  ?.filter((res) => res.attributes.content_type == "Picture")
                  ?.map((res1) => (
                    <div className="item active">
                      <img
                        src={
                          res1.attributes?.image_path.startsWith(
                            "https://www.exsus.com/"
                          )
                            ? res1?.attributes?.image_path
                            : "https://www.exsus.com/" +
                            res1?.attributes?.image_path
                        }
                        alt="expert_favourite_pic01"
                        className="img-fluid"
                      />
                      <p>{res1?.attributes?.image_text}</p>
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
                        <p>{text?.attributes.review_short_text}</p>
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
              <h3>YOUR JOURNEY STARTS HERE</h3>
              <p>
                call us on 020 7337 9010 to start planning your perfect trip
              </p>
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
