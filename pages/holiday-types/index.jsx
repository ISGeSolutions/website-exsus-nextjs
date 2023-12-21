import { useState, useEffect } from "react";

import { Link, Spinner, Signup, FriendlyUrl } from "components";
import { Layout } from "components/users";
import { userService, holidaytypesService } from "services";
import { Inspireme } from "components";
import generateDynamicLink from "components/utils/generateLink";
import { NavLink } from "components";
import { useRouter } from "next/router";
import Head from "next/head";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require("react-responsive-carousel").Carousel;

export default Index;

function Index() {
  const router = useRouter();
  const [users, setUsers] = useState(null);
  const [holidaytypes, setHolidayTypes] = useState();
  // const [destinationLandingDetails, setDestinationLandingDetails] = useState();
  const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();
  // const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [backgroundImgWhentogo, setBackgroundImgWhentogo] = useState({});
  const [bannerImageArr, setBannerImageArr] = useState([]);
  const [thumbnailImageArr, setThumbnailImageArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("recommended");
  const [customPageContent, setCustomPage] = useState([]);

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

  const dynamicImage = (itemId) => {
    return itemId;
  };

  const handleWhenToGoClick = () => {
    router.push("/where-to-go");
  };

  const dynamicLink = (itemName, id) => {
    const modifieditem = itemName
      .replace(/ /g, "-")
      .replace(/&/g, "and")
      .toLowerCase();
    if (itemName) {
      return regionWiseUrl + `/holiday-types/${modifieditem}`;
    }
  };

  const handleFilterClick = (item) => {
    setActiveItem(item);
    // console.log(thumbnailImageArr);
    if (item == "alphabetical") {
      setThumbnailImageArr(
        thumbnailImageArr.sort((a, b) =>
          a?.holiday_type_name.localeCompare(b?.holiday_type_name)
        )
      );
    } else if (item == "recommended") {
      setThumbnailImageArr(thumbnailImageArr.sort((a, b) => a.id - b.id));
    }
  };

  const dynamicBannerImage = (item) => {
    return item;
  };

  const dynamicThumbnailImage = (item) => {
    return item;
  };

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));
    holidaytypesService
      .getHolidaytypesLandingPage()
      .then((x) => {
        setHolidayTypes(x.data[0]);
        setCustomPage(x.data[0]?.attributes?.custom_page_contents);
        // console.log(x.data[0]);
        // setDestinationLandingDetails(x);
        const imageCheck = x?.data[0]?.attributes?.custom_page_images?.data;
        const newBackgroundImages = [];
        imageCheck?.forEach((element) => {
          if (element.attributes.image_type == "center") {
            setBackgroundImgWhentogo(element.attributes);
          } else if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element.attributes.image_path);
            // setBackgroundImage("https://d33ys3jnmuivbg.cloudfront.net/ilimages/" + x.data[0].attributes.custom_page_images.data[0].attributes.image_path);
          }
        });
        setBackgroundImage(newBackgroundImages);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    holidaytypesService
      .getHolidaytypesLandingList()
      .then((x) => {
        const imageCheckType = x.data;
        const thumbnailImageArr = [];
        imageCheckType.forEach((elementMain) => {
          if (elementMain.attributes.holiday_type_group_images.data) {
            const dataInner =
              elementMain.attributes.holiday_type_group_images.data;
            dataInner.forEach((element) => {
              if (element.attributes.image_type == "banner") {
                bannerImageArr.push(element.attributes.image_path);
              } else if (element.attributes.image_type == "thumbnail") {
                const objThumbnail = {
                  id: elementMain?.id,
                  holiday_type_code:
                    elementMain?.attributes?.holiday_type_group_code,
                  holiday_type_name:
                    elementMain?.attributes?.holiday_type_group_name,
                  image_path: element.attributes.image_path,
                };

                thumbnailImageArr.push(objThumbnail);
              }
            });
          }
        });

        setBannerImageArr(bannerImageArr);
        setThumbnailImageArr(thumbnailImageArr);
        setHolidaytypesLandingList(x.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    setTimeout(() => {
      // $('.carousel').carousel();
      $(".carousel").carousel({
        interval: 250 * 10,
      });
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>Holiday Type & Luxury Experience | Exsus Travel</title>
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
                  <NavLink
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
                  data={`home/${holidaytypes?.attributes?.page_friendly_url}`}
                ></FriendlyUrl>
              </div>
              <div className="row">
                <div className="destinations_cntnt_blk">
                  <h2>
                    {
                      customPageContent?.data?.filter(
                        (res) =>
                          res.attributes?.content_name == "LuxuryHolidaysHeader"
                      )[0]?.attributes?.content_value
                    }
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: customPageContent?.data?.filter(
                        (res) =>
                          res.attributes?.content_name == "LuxuryHolidaysText"
                      )[0]?.attributes?.content_value,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </section>

          <section className="card_blk_row destinations_blk_row">
            <div className="container">
              <div className="row">
                <div className="col-12 favrites_blk_row pb-0">
                  <h3 className="title_cls pb-0">
                    {/* {holidaytypes?.attributes?.page_content_2} */}
                    Our favourite holiday types
                  </h3>
                  <div className="destination_contries_filter d-flex justify-content-around">
                    <ul>
                      <li>
                        <a
                          className={
                            activeItem === "recommended" ? "active" : ""
                          }
                          onClick={() => handleFilterClick("recommended")}
                        >
                          Exsus recommends
                        </a>
                      </li>
                      <li>
                        <a
                          className={
                            activeItem === "alphabetical" ? "active" : ""
                          }
                          onClick={() => handleFilterClick("alphabetical")}
                        >
                          Alphabetical
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {thumbnailImageArr?.map((holidaytypesItem, i) => (
                  <div className="col-sm-6" key={i}>
                    <div className="card_blk_inr">
                      <NavLink
                        href={dynamicLink(
                          holidaytypesItem?.holiday_type_name,
                          holidaytypesItem?.id
                        )}
                      >
                        <img
                          src={dynamicThumbnailImage(
                            holidaytypesItem.image_path
                          )}
                          alt="holiday_type01"
                          className="img-fluid"
                        />
                        <div className="card_blk_cntnt card_blk_sml_arw">
                          <div className="row align-items-center">
                            <div className="col-11">
                              <div className="card_blk_txt">
                                <h3 className="mb-0">
                                  {holidaytypesItem?.holiday_type_name}
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
              backgroundImage: `url(${backgroundImgWhentogo?.image_path})`,
            }}
          >
            <div className="container">
              <div className="destination_text_overlay_inr">
                <h4>
                  {
                    customPageContent?.data?.filter(
                      (res) => res.attributes?.content_name == "BestTimeHeader"
                    )[0]?.attributes?.content_value
                  }
                </h4>
                <h5>
                  {
                    customPageContent?.data?.filter(
                      (res) => res.attributes?.content_name == "BestTimeText"
                    )[0]?.attributes?.content_value
                  }
                </h5>

                <h4>{backgroundImgWhentogo?.image_header_text_1}</h4>
                <h5>{backgroundImgWhentogo?.image_header_text_2}</h5>
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
    </>
  );
}
