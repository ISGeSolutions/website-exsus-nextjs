import { useState, useEffect } from "react";
import { Signup } from "components";
import { Layout } from "components/users";
import { destinationService } from "../../../services";
import { giftListService, homeService } from "../../../services";
import { FriendlyUrl } from "../../../components";
import Head from "next/head";
import { EnquiryButton } from "../../../components/common/EnquiryBtn";
import { ImageSlider } from "../../../components/ImageSlider";

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
  let dictionaryPage = 1;
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

  const disableAnchorTags = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // Disable anchor tags
    const anchorTags = tempElement.querySelectorAll("a");
    anchorTags.forEach((anchor) => {
      anchor.removeAttribute("href");
    });

    return tempElement.innerHTML;
  };

  const websiteContentCheck1 = (matches, modifiedString) => {
    destinationService
      .getDictionaryDetails(matches, region)
      .then((responseObj) => {
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


  const websiteContentCheck = (pageNo) => {
    homeService
      .getAllWebsiteContent(region, pageNo)
      .then((x) => {
        const response = x?.data;

        // Calculate the expiration time (1 day from the current time)
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

        const dynamicObject = {};
        const dynamicObjectUk = {};
        const dynamicObjectUs = {};
        const dynamicObjectAsia = {};
        const dynamicObjectIndia = {};

        response.forEach((element, index) => {
          // Create an object with the data and expiration time
          dynamicObject[element?.attributes?.content_word] =
            element?.attributes?.content_translation_text;
          dynamicObject["code"] =
            element?.attributes?.website_country?.data?.attributes?.code;
          dynamicObject["expiration"] = expirationTime;

          if (
            element?.attributes?.website_country?.data?.attributes?.code == "UK"
          ) {
            dynamicObjectUk[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectUk["expiration"] = expirationTime;
            let localStorageUk = JSON.parse(
              localStorage.getItem("websitecontent_uk")
            );
            localStorage.setItem(
              "websitecontent_uk",
              JSON.stringify({ ...localStorageUk, ...dynamicObjectUk })
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code == "US"
          ) {
            dynamicObjectUs[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectUs["expiration"] = expirationTime;
            let localStorageUS = JSON.parse(
              localStorage.getItem("websitecontent_us")
            );
            localStorage.setItem(
              "websitecontent_us",
              JSON.stringify({ ...localStorageUS, ...dynamicObjectUs })
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "ASIA"
          ) {
            dynamicObjectAsia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectAsia["expiration"] = expirationTime;
            let localStorageAsia = JSON.parse(
              localStorage.getItem("websitecontent_asia")
            );
            localStorage.setItem(
              "websitecontent_asia",
              JSON.stringify({ ...localStorageAsia, ...dynamicObjectAsia })
            );
          }
          if (
            element?.attributes?.website_country?.data?.attributes?.code ==
            "INDIA"
          ) {
            dynamicObjectIndia[element?.attributes?.content_word] =
              element?.attributes?.content_translation_text;
            dynamicObjectIndia["expiration"] = expirationTime;
            let localStorageIndia = JSON.parse(
              localStorage.getItem("websitecontent_india")
            );
            localStorage.setItem(
              "websitecontent_india",
              JSON.stringify({ ...localStorageIndia, ...dynamicObjectIndia })
            );
          }
        });
        if (x?.meta?.pagination?.pageCount > x?.meta?.pagination?.page) {
          dictionaryPage = x?.meta?.pagination?.page + 1;
          websiteContentCheck(dictionaryPage);
        }
        setWebsiteContent(x.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });
  };

  const dictioneryFunction = (data) => {
    let modifiedString = data;
    if (modifiedString) {
      const regex = /{[a-zA-Z0-9-]+}/g;
      const matches = [...new Set(modifiedString.match(regex))];

      let storedDataString = "";
      let storedData = "";
      //
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
        //
        // You can access it using localStorage.getItem('yourKey')
        if (matches) {
          let replacement = "";
          try {
            matches.forEach((match, index, matches) => {
              const matchString = match.replace(/{|}/g, "");
              if (!storedData[matchString]) {
                if (storedData[matchString.toLowerCase()]) {
                  replacement = storedData[matchString.toLowerCase()];
                }
              } else {
                replacement = storedData[matchString];
                if (!replacement) {
                  replacement = storedData[matchString.toLowerCase()];
                }
              }
              const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
              if (checkStr && replacement) {
                modifiedString = modifiedString.replace(checkStr, replacement);
              }
            });
            return modifiedString;
          } catch (error) {
            if (error.message === "Loop break") {
            } else if (error.message === "Region not found") {
            }
          }
        }
      } else {
      }
    }
  };

  useEffect(() => {

    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    giftListService
      .getGiftListPage()
      .then((x) => {
        //
        setCustomData(x.data[0]);
        localStorage.setItem(
          "PageInfo",
          JSON.stringify({
            pType: "CUST",
            pCode: x?.data[0]?.attributes?.page_code,
          })
        );
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
              modifiedString = disableAnchorTags(
                element?.attributes?.content_value
              );
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
                  websiteContentCheck1(matches, modifiedString);
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
              <ImageSlider data={backgroundImage}></ImageSlider>
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
                </div>
                <div dangerouslySetInnerHTML={{ __html: longText }} />
              </div>
            </section>

            {/* Enquiry */}
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
                <h4>Sign up for our newsletter
                  <span>Receive our latest news and special offers</span></h4>
                <Signup />
              </div>
            </section>
          </div>
        )}
      </Layout>
    </>
  );
}
