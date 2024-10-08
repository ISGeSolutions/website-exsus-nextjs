import { useState, useEffect } from "react";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { FriendlyUrl } from "../../components";
import { privacypolicyService, homeService } from "../../services";
import { destinationService } from "../../services";
import Head from "next/head";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [privacyPolicyData, setprivacyPolicyData] = useState(null);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightContent] = useState(null);
  const [customData, setCustomData] = useState([]);
  let dictionaryPage = 1;

  let region = "uk";
  let regionWiseUrl = "/uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      region = window.site_region;
      // setMyVariable(window.site_region);
    }
  }

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

  useEffect(() => {

    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    privacypolicyService
      .getPrivacyPolicyPage()
      .then((x) => {
        setprivacyPolicyData(x.data[0]);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        let modifiedString = "";
        localStorage.setItem("PageInfo", JSON.stringify({ pType: "CUST", pCode: x?.data[0]?.attributes?.page_code }));
        setCustomData(data);
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
                .replace(/class/g, "className")
                .replace(/h3/g, "h2")
                .replace(/class/g, "className")
                .replace(/<!-- SOF Top text html -->/g, "")
                .replace(/class/g, "className")
                .replace(/<!-- EOF Top text html -->/g, "");
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightCorner(element?.attributes?.content_value);
            }
          });

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
                //  (modifiedString);
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
    // userService.getAll().then(x => setUsers(x));
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
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
            <section className="trvl_info_row privacy_policy_row">
              <div className="container">
                <div className="bookmark_row">
                  <FriendlyUrl
                    data={
                      "home/" + privacyPolicyData?.attributes?.page_friendly_url
                    }
                  ></FriendlyUrl>
                </div>
                <div className="trvl_info_cntnt privacy_para_blk">
                  <h2 className="trvl_title">{headingTag}</h2>
                  {/* {longText} */}
                  <div dangerouslySetInnerHTML={{ __html: longText }} />

                  {/* <p className="mb-4 text-start">This Privacy Policy explains in detail the types of personal data we may collect about you when you interact with us. It also explains how we’ll store and handle that data, and keep it safe.</p>
                        <p className="text-start">We know that there’s a lot of information here, but we want you to be fully informed about your rights, and how Exsus Travel Limited uses your data. We hope the following sections will answer any questions you have but if not, please do get in touch with us. We may change this policy from time to time. Please check back for updates so you are always fully aware of what information is collected and how it is used.</p> */}
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
