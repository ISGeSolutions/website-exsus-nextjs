import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { FriendlyUrl } from "../../components";
import Head from "next/head";
import {
  termsCondtionsService,
  whyusService,
  destinationService,
} from "../../services";

export default Index;

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [privacyPolicyData, setprivacyPolicyData] = useState(null);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightContent] = useState(null);
  const [customData, setCustomData] = useState([]);

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

  const websiteContentCheck = (matches, modifiedString) => {
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

  useEffect(() => {
    termsCondtionsService
      .gettermsConditionPage()
      .then((x) => {
        setCustomData(x.data[0]);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        // data.forEach(res => {

        // })
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
              modifiedString = element?.attributes?.content_value
                ?.replace(/class/g, "className")
                .replace(/h3/g, "h2")
                .replace(/class/g, "className")
                .replace(/<!-- SOF Top text html -->/g, "")
                .replace(/class/g, "className")
                .replace(/<!-- EOF Top text html -->/g, "");
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightContent(element?.attributes?.content_value);
            }
          });

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
        }
        setIsLoading(false);
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
            <section className="trvl_info_row terms_conditions_row">
              <div className="container">
                <div className="bookmark_row">
                  <FriendlyUrl
                    data={"home/" + customData?.attributes?.page_friendly_url}
                  ></FriendlyUrl>
                </div>
                <div className="trvl_info_cntnt">
                  <h2 className="trvl_title">{headingTag}</h2>
                </div>
                <div dangerouslySetInnerHTML={{ __html: longText }}></div>
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
                  onClick="window.open('contact_us.html')"
                >
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
    </>
  );
}
