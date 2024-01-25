import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService, creatintripsService } from "services";
import { NavLink } from "components";
import { FriendlyUrl } from "../../../components";
import Head from "next/head";
import { EnquiryButton } from "../../../components/common/EnquiryBtn";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
  const [whyusDetails, setWhyusDetails] = useState(null);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [creatingTripsData, setCreatingTripsData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightContent] = useState(null);

  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleInterval");
    new bootstrap.Carousel(carousel);
    setFriendlyUrl(`Home/About us/Creating your Trip`);
    aboutusService.getAboutusPage().then((x) => {
      setWhyusDetails(x.data.attributes);
    });

    creatintripsService
      .getCreatingTripPage()
      .then((x) => {
        setCreatingTripsData(x.data[0]);
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
              setRightCorner(element?.attributes?.content_value);
            }
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription}></meta>
      </Head>
      <section className="banner_blk_row">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <a
              href="javascript:void(0)"
              target="_blank"
              className="carousel-item active"
              data-bs-interval="5000"
            >
              <div className="banner_commn_cls creating_your_trip_banner"></div>
            </a>
          </div>
        </div>
      </section>

      <section className="trvl_info_row">
        <div className="container">
          <div className="bookmark_row">
            <FriendlyUrl
              data={
                "Home / " + creatingTripsData?.attributes?.page_friendly_url
              }
            ></FriendlyUrl>
          </div>

          <div className="trvl_info_cntnt">
            <h2 className="trvl_title">{headingTag}</h2>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: longText }}
            />
          </div>
        </div>
      </section>

      <section className="card_blk_row dark_grey pt-5 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="card_blk_inr card_blk_overlay">
                <NavLink href={`/destinations`}>
                  <img
                    src="\images\about_us_card01.jpg"
                    alt="Card image 07"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt card_blk_cntnt_top">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Explore our destinations</h3>
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

            <div className="col-sm-6">
              <div className="card_blk_inr card_blk_overlay">
                <NavLink href={`/holiday-types`}>
                  <img
                    src="\images\about_us_card02.jpg"
                    alt="Card image 08"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt card_blk_cntnt_top">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>Explore our Holiday types</h3>
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
          </div>
        </div>
      </section>

      <section className="make_enqury_row">
        <div className="container">
          <EnquiryButton />
        </div>
      </section>

      <section aria-label="Sign up for newsletter" className="newslettr_row">
        <div className="container">
          <h4>Sign up for our newsletter</h4>
          <h5>Receive our latest news and special offers</h5>
          <Signup />
        </div>
      </section>
    </Layout>
  );
}
