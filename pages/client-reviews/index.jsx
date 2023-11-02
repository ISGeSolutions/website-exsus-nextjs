import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { whyusService } from "../../services/whyus.service";
import { NavLink } from "components";
import { FriendlyUrl } from "../../components";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
  const [clientReviews, setClientReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [valueWithBr, setnewValueWithBr] = useState("");
  const [friendlyUrl, setFriendlyUrl] = useState("");
  const [careerData, setCareerData] = useState(null);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);

  let regionWiseUrl = "/uk";
  let region = "uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      region = window.site_region;
      // setMyVariable(window.site_region);
    }
  }

  const websiteContentCheck = (matches, region, modifiedString) => {
    whyusService.getDictionaryDetails(matches, region).then((responseObj) => {
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
        setnewValueWithBr(modifiedString);
      }
    });
  };

  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleInterval");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }
    setFriendlyUrl(`home/Why us/Exsus Reviews`);
    whyusService
      .getAllReviews()
      .then((x) => {
        setClientReviews(x.data);

        // Dictionary
        let modifiedString = x.data.attributes?.review_text;
        // Find and store matches in an array
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

              // Set the modified string in state
              setnewValueWithBr(modifiedString);
              // console.log(modifiedString);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                // console.log("Loop has been stopped.");
                setnewValueWithBr(modifiedString);
              }
            }
          }
        } else {
          // The item with 'yourKey' does not exist in local storage
          // Display the matched words
          if (matches) {
            websiteContentCheck(matches, region, modifiedString);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    whyusService
      .getReviewsCustomePage()
      .then((x) => {
        setCareerData(x.data[0]);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        // console.log("consolelog", data);
        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              setLongText(
                element?.attributes?.content_value.replace(/h4/g, "h2")
              );
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
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
              </div>

              <div className="trvl_info_cntnt">
                <h2 className="trvl_title">{headingTag}</h2>
                <p
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: longText,
                  }}
                ></p>
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

          {/* NewsLetter */}
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
    </Layout>
  );
}
