import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { whyusService } from "../../../services/whyus.service";
import { NavLink } from "components";
import { destinationService } from "../../../services";
import { giftListService } from "../../../services";
import { FriendlyUrl } from "../../../components";
import Head from "next/head";
import { EnquiryButton } from "../../../components/common/EnquiryBtn";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
 
export default Index;

function Index() {
  const [clientReviews, setClientReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customeData, setCustomData] = useState(null);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightContent] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState([]);

  let regionWiseUrl = "/uk";
  let region = "uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      region = window.site_region;

      // setMyVariable(window.site_region);
    }
  }

  const websiteContentCheck = (matches, modifiedString) => {
    destinationService.getDictionaryDetails(matches, region).then((responseObj) => {
      if (responseObj) {
        const res = responseObj?.data;
        res.forEach((element, index) => {
          const replacement = element?.attributes?.content_translation_text;
          const matchString = element?.attributes?.content_word;
          const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
          if (checkStr && replacement) {
            modifiedString = modifiedString.replace(checkStr, replacement);
          }
        });

        // Set the modified string in state
        setLongText(modifiedString);
      }
    });
  };

  useEffect(() => {
    giftListService
      .getGiftListPage()
      .then((x) => {
        //  
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
        let modifiedString = "";
        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              modifiedString = element?.attributes?.content_value;
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightCorner(element?.attributes?.content_value);
            }
          });
        }
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
                  websiteContentCheck(matches, modifiedString);
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
              // Set the modified string in state
              setLongText(modifiedString);
              setIsLoading(false);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                setLongText(modifiedString);
              }
            }
          }
        }
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription}></meta>
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
                      href="javascript:void(0)"
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
            <section className="trvl_info_row">
              <div className="container">
                <div className="bookmark_row">
                  <FriendlyUrl
                    data={"home/" + customeData?.attributes?.page_friendly_url}
                  ></FriendlyUrl>
                </div>
                <div className="trvl_info_cntnt">
                  <h2 className="trvl_title">{headingTag}</h2>
                  {/* <div className="mb-4" dangerouslySetInnerHTML={{ _html: longText }}> */}
                  {/* </div> */}
                  {/* <button
                                    className="btn prmry_btn mx-auto mb-5"

                                >
                                    Login to your Gift List
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
                                <div className="gift_list_parnt">
                                    <h2 className="text-capitalize">How to set up a Gift List</h2>
                                    <p className="mb-4">
                                        Always wanted to explore Angkor Wat? Dreamed of romantic dinners
                                        under a starry sky? The Exsus Gift List allows your friends and
                                        family to purchase these special experiences by making cash
                                        contributions towards your holiday.
                                    </p>
                                    <ul className="gift_list_blk">
                                        <li>
                                            To personalise your gift list, you can provide us with a photo
                                            of your choice and a welcome message to your friends and
                                            family to be displayed at the top of your list so you can tell
                                            them a little about your trip and what you will be doing.
                                        </li>
                                        <li>
                                            When we've set up your gift list, you can send your friends
                                            and family the Gift List reference number, which allows them
                                            to view your Gift List online and make cash contributions.
                                            They will then receive an automated confirmation of purchase
                                            email from Exsus.
                                        </li>
                                        <li>
                                            You can log in to your Exsus Gift List using your reference
                                            number and password at any time to see what has been purchased
                                            and by whom. Whilst the Gift List will close for contributions
                                            on the final day of your holiday, you will be able to access
                                            the list for up to a month after you return.
                                        </li>
                                    </ul>
                                    <p>
                                        If you have any further queries about the Gift List, please call
                                        our team on <a href="javascript:void(0)">020 3613 5556</a>
                                    </p>
                                </div>
                                <div className="gift_list_parnt">
                                    <h2 className="text-capitalize">How to buy a gift</h2>
                                    <ul className="gift_list_blk">
                                        <li>
                                            Buying a gift is simple. Once you have logged in using the
                                            reference number given to you, a Gift List created by the
                                            travellers will appear. You will then have the option of
                                            donating a cash gift to contribute to the holiday fund.
                                        </li>
                                        <li>
                                            Once you have selected the amount you would like to
                                            contribute, payment details will be taken and you have the
                                            option of sending a personal message if you wish. You will
                                            also receive a confirmation email after your purchase.
                                        </li>
                                    </ul>
                                    <p className="mb-4">
                                        If you have any queries, please contact our team on{" "}
                                        <a href="javascript:void(0)">020 3613 5556</a>
                                    </p>
                                    <button
                                        className="btn prmry_btn mx-auto"
                                    >
                                        Contribute to a Gift List
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
                                </div> */}
                </div>
                <div dangerouslySetInnerHTML={{ __html: longText }} />
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
      </Layout>
    </>
  );
}
