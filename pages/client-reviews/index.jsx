import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { whyusService } from "../../services/whyus.service";
import { NavLink } from "components";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
  const [clientReviews, setClientReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleInterval");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }

    whyusService
      .getAllReviews()
      .then((x) => {
        setClientReviews(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout>
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
              <div className="carousel-inner">
                <a
                  href="#"
                  target="_blank"
                  className="carousel-item active"
                  data-bs-interval="5000"
                >
                  <div className="banner_commn_cls exsus_reviews_banner"></div>
                </a>
              </div>
            </div>
          </section>
          <section className="trvl_info_row">
            <div className="container">
              <div className="bookmark_row">
                <ul>
                  <li>
                    <a href="homepage.html">Home</a>
                  </li>
                  <li>
                    <a href="why_us.html">Why us</a>
                  </li>
                  <li>Exsus Reviews</li>
                </ul>
              </div>

              <div className="trvl_info_cntnt">
                <h2 className="trvl_title">EXSUS TRAVEL REVIEWS</h2>
                <p className="mb-4">
                  Exsus Travel has more than 20 years' experience of creating
                  luxury tailor-made holidays all around the world. Over the
                  years, we've received countless testimonials from people who
                  have travelled with us on a luxury holiday, bespoke honeymoon
                  or family adventure. Many of these clients come back time and
                  again for their tailor-made travel. Below is a selection of
                  reviews from clients who've returned from a holiday with us
                  recently.
                </p>
                <p className="mb-4">
                  We're delighted to have won the 2021 Feefo Platinum Trusted
                  Service Award, an independent seal of excellence that has
                  recognised Exsus Travel for delivering exceptional customer
                  service for two years in a row, as rated by those who have
                  travelled with us.
                </p>
                <a href="https://www.feefo.com/en-GB/reviews/exsus-travel?withMedia=false&timeFrame=ALL&displayFeedbackType=SERVICE" />
                <img
                  className="img-fluid"
                  src="/images/feefo_platinum_service.png"
                  alt="feefo_platinum_service"
                />
              </div>

              {clientReviews?.map((element) => (
                <div className="trvl_info_cntnt">
                  <h2 className="text-capitalize">
                    {element?.attributes?.review_header}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: element?.attributes?.review_text,
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="make_enqury_row">
            <div className="container">
              <h3>YOUR JOURNEY STARTS HERE</h3>
              <p>
                call us on 020 7337 9010 to start planning your perfect trip
              </p>
              <button
                className="btn prmry_btn make_enqury_btn"
                onclick="window.open('contact_us.html')"
              >
                Make an enquiry
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillrule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 267 512.43"
                >
                  <path
                    fillrule="nonzero"
                    d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                  />
                </svg>
              </button>
            </div>
          </section>

          <section
            aria-label="Sign up for newsletter"
            className="newslettr_row"
          >
            <div className="container">
              <h4>Sign up for our newsletter</h4>
              <h5>Receive our latest news and special offers</h5>
              <form className="newslettr_form d-block d-sm-flex">
                <div className="newlettr_inpt">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name and title"
                  />
                </div>
                <div className="newlettr_inpt ps-0 ps-sm-2">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                  />
                </div>
                <div className="newlettr_btn ps-0 ps-sm-2">
                  <button type="submit" className="btn btn-primary prmry_btn">
                    Sign up
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillrule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 267 512.43"
                    >
                      <path
                        fillrule="nonzero"
                        d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}
