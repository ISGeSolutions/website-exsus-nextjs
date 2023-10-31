import { useState, useEffect } from "react";
import { Link, Spinner, Signup } from "components";
import { destinationService, alertService, userService } from "services";
import { Inspireme } from "components";
import Head from "next/head";
import { NavLink } from "components";
import { useRouter } from "next/router";
import generateDynamicLink from "components/utils/generateLink";
import Image from "next/image";

export default Index;

function Index() {
  const router = useRouter();
  const itemsPerPage = 12; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [page, setPage] = useState(0); // Current page
  const dcodestr = router.query.where;
  const [metaData, setMetaData] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const LoadMorePagination = ({ data }) => {
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  };

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  let regionWiseUrl = "/uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      // setMyVariable(window.site_region);
    }
  }

  const loadMoreData = () => {
    destinationService
      .getItinerariesInAdvanceSearch(dcodestr, page + 1)
      .then((response) => {
        setMetaData(response.meta.pagination);
        const newItineraries = response.data;
        if (newItineraries.length > 0) {
          setItineraries((prevItineraries) =>
            [...prevItineraries, ...newItineraries].reduce(
              (accumulator, current) =>
                accumulator.some((item) => item.id === current.id)
                  ? accumulator
                  : [...accumulator, current],
              []
            )
          );
          setPage(page + 1);
        }
      });
  };

  const generateDynamicLink = (item) => {
    return (
      regionWiseUrl +
      `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`
    );
  };

  const handleRedirect = () => {
    router.push(
      regionWiseUrl +
        `/destinations/africa/africa-itineraries/vietnam-in-classic-style`
    );
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

  useEffect(() => {
    destinationService
      .getAllItineraries()
      .then((x) => {
        setItineraries(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    loadMoreData();

    window.addEventListener("resize", equalHeight(true));
  }, [dcodestr]);

  return (
    <>
      <Head>
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
          <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey pt-5">
            <div className="container">
              <h2 className="search_result_title">Your search result</h2>
              <h3 className="title_cls search_result_title_green">
                Find and plan your perfect tailor-made holiday worldwide
              </h3>
              <div className="card_slider_row">
                <div className="carousel00 region_carousel00">
                  <div className="row">
                    <div className="col-12">
                      <div className="destination_dropdwn_row d-block d-md-flex">
                        <div className="banner_dropdwn_blk ps-0 ps-md-2">
                          <Inspireme />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="destination_filter_result d-block d-lg-flex">
                        <p>
                          We've found {metaData.total} holiday ideas that are
                          right for you.
                        </p>
                        <div className="destination_contries_filter d-inline-block d-lg-flex">
                          <label className="pt-2 pt-lg-0">Arrange by:</label>
                          <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                            <li>
                              <a href="#">Low - High</a>
                            </li>
                            <li>
                              <a href="#" className="active">
                                High - Low
                              </a>
                            </li>
                            <li>
                              <a href="#">By duration</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Itineraries */}
                    {itineraries
                      ?.slice(0, visibleItems.length)
                      .map((item, index) => (
                        <div
                          className="col-sm-6 col-lg-4 col-xxl-3"
                          key={item.id}
                        >
                          <div className="card_slider_inr">
                            <div className="card_slider">
                              <NavLink
                                href={generateDynamicLink(item)}
                                className="card_slider_img"
                              >
                                {item?.attributes?.itinerary_images?.data.map(
                                  (element, index) =>
                                    element.attributes.image_type ==
                                    "thumbnail" ? (
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
                              </NavLink>
                              <div className="card_slider_cnt">
                                <h4>
                                  <a href="#">{item?.attributes?.itin_name}</a>
                                </h4>
                                <ul>
                                  <li>{item?.attributes?.header_text}</li>
                                  <li>Indonesia</li>
                                  <li>
                                    {
                                      item?.attributes
                                        ?.itinerary_country_contents?.data[0]
                                        ?.attributes
                                        ?.guideline_price_notes_index
                                    }
                                  </li>
                                  <li>
                                    Travel to:
                                    <span>
                                      {item?.attributes?.sub_header_text}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <button className="btn card_slider_btn">
                                <span>
                                  {item?.attributes?.no_of_nites_notes}
                                </span>
                                <span
                                  className="view_itnry_link"
                                  onClick={handleRedirect}
                                >
                                  View this itinerary
                                  <em className="fa-solid fa-chevron-right"></em>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                    <div className="col-12">
                      {metaData.total > page * itemsPerPage && (
                        <button
                          onClick={loadMoreData}
                          className="btn prmry_btn make_enqury_btn mx-auto text-uppercase"
                          fdprocessedid="r5vpm6s"
                        >
                          Show{" "}
                          {metaData.total - page * itemsPerPage > 12
                            ? 12
                            : metaData.total - page * itemsPerPage > 12}{" "}
                          more items
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            imageRendering="optimizeQuality"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            viewBox="0 0 512 266.77"
                          >
                            <path
                              fillRule="nonzero"
                              d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
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

          {/* NewsLatter */}
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
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
