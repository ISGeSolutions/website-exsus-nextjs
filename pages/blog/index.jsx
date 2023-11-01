import { useState, useEffect } from "react";

import { Link, Spinner, Signup, FriendlyUrl } from "components";
import { Layout } from "components/users";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import Head from "next/head";
import { NavLink } from "components";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require("react-responsive-carousel").Carousel;
import {
  destinationService,
  holidaytypesService,
  blogsService,
  userService,
  homeService,
  alertService,
} from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const router = useRouter();
  const [destinationLandingList, setDestinationLandingList] = useState();
  const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();
  const [allBlogsData, setAllBlogsData] = useState([]);
  const itemsPerPage = 12; // Number of items to load per page
  const [page, setPage] = useState(0); // Current page
  const [metaData, setMetaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [activeItem, setActiveItem] = useState("recommended");

  const validationSchema = Yup.object().shape({
    //title: Yup.string().required("Title is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email_id: Yup.string().required("Email id is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;


  let regionWiseUrl = "/uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      // setMyVariable(window.site_region);
    }
  }

  const onSubmit = (e) => {

    console.log(e);
  };

  const generateDynamicLink = (item) => {
    const modifiedGrpName = item
      .replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    return regionWiseUrl + `/blog/${modifiedGrpName}`;
  };

  const handleFilterClick = (item) => {
    page = 0;
    setAllBlogsData([]);
    setActiveItem(item);
    loadMoreData(item);
  };

  const loadMoreData = (item) => {
    blogsService
      .getAllBlogs(page + 1, item)
      .then((x) => {
        setMetaData(x.meta.pagination);
        setFriendlyUrl(`home/blog`);
        const response = [...x.data].sort(
          (a, b) => a.attributes.serial_number - b.attributes.serial_number
        );
        response.forEach((element, index) => {
          const str = element?.attributes?.blog_image_path;
          const substringToCheck = "https://www.exsus.com/";
          const containsSubstring = str.includes(substringToCheck);
          if (!containsSubstring) {
            const newStr =
              substringToCheck + "" + element?.attributes?.blog_image_path;
            response[index].attributes.blog_image_path = newStr;
          }
        });
        const newItineraries = response;
        if (newItineraries.length > 0) {
          setAllBlogsData((prevItineraries) =>
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
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
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
      .getDestinationLandingList()
      .then((x) => {
        setDestinationLandingList(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    holidaytypesService
      .getHolidaytypesLandingList()
      .then((x) => {
        setHolidaytypesLandingList(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    // blogsService.getAllBlogs().then(x => {
    //     const response = [...x.data].sort((a, b) => a.attributes.serial_number - b.attributes.serial_number);
    //     response.forEach((element, index) => {
    //         const str = element?.attributes?.blog_image_path;
    //         const substringToCheck = 'https://www.exsus.com/';
    //         const containsSubstring = str.includes(substringToCheck);
    //         if (!containsSubstring) {
    //             const newStr = substringToCheck + '' + element?.attributes?.blog_image_path;
    //             response[index].attributes.blog_image_path = newStr;
    //         }
    //     });
    //     setAllBlogsData(response);
    // })
    loadMoreData(activeItem);

    const carousel = document.querySelector("#carouselExampleInterval");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }

    window.addEventListener("resize", equalHeight(true));
  }, []);

  return (
    <>
      <Head>
        <title>Luxury Blogs | Exsus Travel</title>
      </Head>
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
              {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/images/blog_banner01.jpg" />
                    </div>
                </Carousel> */}
              <div
                id="carouselExampleInterval"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <a
                    href="#"
                    target="_blank"
                    className="carousel-item active"
                    data-bs-interval="5000"
                  >
                    <div className="banner_commn_cls blog_banner01"></div>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    className="carousel-item"
                    data-bs-interval="5000"
                  >
                    <div className="blog_banner02 banner_commn_cls"></div>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    className="carousel-item"
                    data-bs-interval="5000"
                  >
                    <div className="blog_banner03 banner_commn_cls"></div>
                  </a>
                </div>
              </div>
            </section>

            <section className="card_blk_row destinations_blk_row light_grey">
              <div className="container">
                <div className="bookmark_row">
                  <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
                </div>
                <div className="destinations_cntnt_blk">
                  <h2>OUR TRAVEL BLOG</h2>
                  <p>
                    Be inspired by our blog posts, written by our travel experts
                    from all around the world and drawing on their discoveries
                    and first-hand experiences, from Africa to Antarctica.
                    Escape the obvious with Exsus Travel.
                  </p>
                </div>
                <div className="row">
                  <div className="col-sm-8 col-lg-6 m-auto mt-3">
                    <div className="country_highlight_row mb-0">
                      <div className="country_highlight_inr text-center">
                        <p>SIGN UP TO RECEIVE OUR NEWSLETTER</p>
                        <button
                          className="btn prmry_btn blog_sign_up_btn"
                          data-bs-toggle="modal"
                          data-bs-target="#blogModal"
                        >
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
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Search our blog */}
            <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
              <div className="container">
                <h3 className="title_cls">Search our blog</h3>
                <div className="card_slider_row">
                  <div className="carousel00 region_carousel00">
                    <div className="row">
                      <div className="col-12">
                        <div className="destination_dropdwn_row d-block d-md-flex">
                          <div className="banner_dropdwn_blk">
                            <div className="select_drpdwn">
                              <select
                                aria-label="Choose a destination"
                                name="destination"
                                {...register("destination")}
                                className={`form-select ${errors.destination ? "is-invalid" : ""
                                  }`}
                              >
                                <option value="">Choose a destination</option>
                                {destinationLandingList?.map((element, i) => (
                                  <option
                                    key={element?.id}
                                    value={
                                      element?.attributes?.destination_code
                                    }
                                  >
                                    {element?.attributes?.destination_name}
                                  </option>
                                ))}
                              </select>
                              <div className="invalid-feedback mb-1">
                                {errors.destination?.message}
                              </div>
                            </div>
                          </div>
                          <div className="banner_dropdwn_blk ps-0 ps-md-2">
                            <div className="select_drpdwn">
                              <select
                                aria-label="Choose a reason"
                                name="reason"
                                {...register("reason")}
                                className={`form-select ${errors.reason ? "is-invalid" : ""
                                  }`}
                              >
                                <option value="">Choose a category</option>
                                {holidaytypesLandingList?.map((element, i) => (
                                  <option
                                    key={element?.id}
                                    value={
                                      element?.attributes
                                        ?.holiday_type_group_code
                                    }
                                  >
                                    {
                                      element?.attributes
                                        ?.holiday_type_group_name
                                    }
                                  </option>
                                ))}
                              </select>
                              <div className="invalid-feedback mb-1">
                                {errors.reason?.message}
                              </div>
                            </div>
                          </div>
                          <div className="banner_inspire_btn ps-0 ps-md-2">
                            <button
                              type="button"
                              className="btn btn-primary prmry_btn"
                            >
                              Inspire me
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
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="destination_filter_result d-block d-lg-flex">
                          <p>We've found 77 holiday ideas in Asia for you</p>
                          <div className="destination_contries_filter d-inline-block d-lg-flex">
                            <label className="pt-2 pt-lg-0">Arrange by:</label>
                            <ul className="d-inline-block d-lg-flex pt-2 pt-lg-0">
                              <li>
                                <a
                                  className={
                                    activeItem === "recommended" ? "active" : ""
                                  }
                                  onClick={() =>
                                    handleFilterClick("recommended")
                                  }
                                >
                                  Exsus Recommends
                                </a>
                              </li>
                              <li>
                                <a
                                  className={
                                    activeItem === "date" ? "active" : ""
                                  }
                                  onClick={() => handleFilterClick("date")}
                                >
                                  By date
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Blogs Data */}
                      {allBlogsData
                        ?.slice(0, allBlogsData.length)
                        .map((res) => (
                          <div
                            className="col-sm-6 col-lg-4 col-xxl-3"
                            key={res.id}
                          >
                            <div className="blog_cnt_inr">
                              <NavLink
                                href={generateDynamicLink(
                                  res.attributes.blog_header_text
                                )}
                              >
                                {res?.attributes?.blog_image_path && (
                                  <img
                                    src={res?.attributes?.blog_image_path}
                                    alt="blog01"
                                    className="img-fluid"
                                  />
                                )}
                                <h4>{res?.attributes?.blog_header_text}</h4>
                                <span className="btn-primary prmry_btn">
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
                                    ></path>
                                  </svg>
                                </span>
                              </NavLink>
                            </div>
                          </div>
                        ))}

                      {/* Pagination */}
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

            <div
              className="modal fade blog_modal_parnt"
              id="blogModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img
                      src="/images/banner-logo.png"
                      alt="banner-logo"
                      className="img-fluid"
                    />
                    <h5>Inspire Me</h5>
                    <p>
                      Looking for inspiration? When you sign up to our free
                      newsletter you’ll get the latest exciting ideas and luxury
                      travel offers from our specialists straight to your inbox
                    </p>
                    <div className="contact_form_row">

                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="select_drpdwn">
                                <select
                                  name="title"
                                  className="form-select"
                                  aria-label="Title"
                                  {...register('title')} // Register the select field with react-hook-form
                                >
                                  <option defaultValue>Title *</option>
                                  <option value="Mr">Mr</option>
                                  <option value="Mrs">Mrs</option>
                                  <option value="Ms">Ms</option>
                                  <option value="Miss">Miss</option>
                                  <option value="Dr">Dr</option>
                                  <option value="Professor">Professor</option>
                                  <option value="Lord">Lord</option>
                                  <option value="Lady">Lady</option>
                                  <option value="Sir">Sir</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input">
                                <input
                                  type="text"
                                  name="first_name"
                                  {...register('first_name')} // Register the input field with react-hook-form
                                  className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                  aria-label="First name *"
                                  placeholder="First name *"
                                />
                                <div className="invalid-feedback mb-1">
                                  {errors.first_name?.message}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input">
                                <input
                                  type="text"
                                  name="last_name"
                                  {...register('last_name')} // Register the input field with react-hook-form
                                  className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                  aria-label="Last name *"
                                  placeholder="Last name *"
                                />
                                <div className="invalid-feedback mb-1">
                                  {errors.last_name?.message}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input">
                                <input
                                  type="email"
                                  name="email_id"
                                  {...register('email_id')} // Register the input field with react-hook-form
                                  className={`form-control ${errors.email_id ? 'is-invalid' : ''}`}
                                  aria-label="Email *"
                                  placeholder="Email *"
                                />
                                <div className="invalid-feedback mb-1">
                                  {errors.email_id?.message}
                                </div>
                              </div>
                            </div>
                            <button className="btn prmry_btn mx-auto" type="submit">
                              Subscribe
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
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </form>

                    </div>
                    <p>* Required form fields</p>
                    <p>
                      Occasionally we may use the above information to send you
                      relevant news, updates and offers. You can opt out at any
                      time and we will not share your information at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
