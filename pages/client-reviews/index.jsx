import { useState, useEffect } from "react";
import { Signup } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { whyusService, destinationService } from "../../services/whyus.service";
import { NavLink } from "components";
import { FriendlyUrl } from "../../components";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

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
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightCorner] = useState(null);

  let regionWiseUrl = "/uk";
  let region = "uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      region = window.site_region;
      // setMyVariable(window.site_region);
    }
  }

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  const websiteContentCheck = (matches, modifiedString) => {
    whyusService.destinationService(matches, region).then((responseObj) => {
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
    // whyusService
    //   .getAllReviews()
    //   .then((x) => {
    //     setClientReviews(x.data);

    //     // Dictionary
    //
    //     let modifiedString = x.data[0]?.attributes?.review_text;
    //      ("modifiedString", modifiedString);
    //     // Find and store matches in an array
    //     const regex = /{[a-zA-Z0-9-]+}/g;
    //     const matches = [...new Set(modifiedString.match(regex))];

    //     let storedDataString = "";
    //     let storedData = "";

    //     if (region == "uk") {
    //       storedDataString = localStorage.getItem("websitecontent_uk");
    //       storedData = JSON.parse(storedDataString);
    //     } else if (region == "us") {
    //       storedDataString = localStorage.getItem("websitecontent_us");
    //       storedData = JSON.parse(storedDataString);
    //     } else if (region == "asia") {
    //       storedDataString = localStorage.getItem("websitecontent_asia");
    //       storedData = JSON.parse(storedDataString);
    //     } else if (region == "in") {
    //       storedDataString = localStorage.getItem("websitecontent_india");
    //       storedData = JSON.parse(storedDataString);
    //     }

    //     if (storedData !== null) {
    //       // You can access it using localStorage.getItem('yourKey')
    //       if (matches) {
    //         let replacement = "";
    //         try {
    //           matches.forEach((match, index, matches) => {
    //             const matchString = match.replace(/{|}/g, "");
    //             if (!storedData[matchString]) {
    //               websiteContentCheck(matches, region, modifiedString);
    //               throw new Error("Loop break");
    //             } else {
    //               replacement = storedData[matchString];
    //             }
    //             const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
    //             if (checkStr && replacement) {
    //               modifiedString = modifiedString.replace(
    //                 checkStr,
    //                 replacement
    //               );
    //             }
    //           });

    //           // Set the modified string in state
    //           setnewValueWithBr(modifiedString);
    //           //  (modifiedString);
    //         } catch (error) {
    //           if (error.message === "Loop break") {
    //             // Handle the loop break here
    //             //  ("Loop has been stopped.");
    //           } else if (error.message === "Region not found") {
    //             // Handle the loop break here
    //             //  ("Loop has been stopped.");
    //             setnewValueWithBr(modifiedString);
    //           }
    //         }
    //       }
    //     } else {
    //       // The item with 'yourKey' does not exist in local storage
    //       // Display the matched words
    //       if (matches) {
    //         websiteContentCheck(matches, region, modifiedString);
    //       }
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //   });

    whyusService
      .getReviewsCustomePage()
      .then((x) => {
        setCareerData(x.data[0]);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;

        let modifiedString = "";
        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value.toUpperCase());
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              modifiedString = element?.attributes?.content_value;
              //setLongText(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightCorner(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Sub_Title") {
              setSubTitle(element?.attributes?.content_value);
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

              setLongText(modifiedString);

              setIsLoading(false);
            } catch (error) {
              if (error.message === "Loop break") {
                // Handle the loop break here
                //  ("Loop has been stopped.");
              } else if (error.message === "Region not found") {
                // Handle the loop break here
                //  ("Loop has been stopped.");
                setLongText(modifiedString);
              }
            }
          }
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
                  onClick={handleHrefClick}
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

              <div className="trvl_info_cntnt client_review_para_blk">
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
