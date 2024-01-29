import { useState, useEffect } from "react";
import { Link, Spinner, Alert, Signup } from "components";
import { Layout } from "components/users";
import { enquiryService, alertService, thankyouService } from "services";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FriendlyUrl } from "../../../components";
export default Index;

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [thankyouData, setThankYouData] = useState(null);
  const router = useRouter();
  const [friendlyUrl, setFriendlyUrl] = useState();
  let dictionaryPage = 1;

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
                throw new Error("Loop break");
              } else {
                replacement = storedData[matchString];
              }
              const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
              if (checkStr && replacement) {
                modifiedString = modifiedString.replace(checkStr, replacement);
              }
            });
            return modifiedString;
            setIsLoading(false);
          } catch (error) { }
        }
      }
    }
  };

  useEffect(() => {
    thankyouService
      .getThankYouPage()
      .then((x) => {
        setThankYouData(x.data[0]?.attributes);
        // const data = x.data[0]?.attributes?.custom_page_contents?.data;
        setFriendlyUrl(x.data[0]?.attributes?.page_friendly_url);
        // if (data) {
        //   data.forEach((element, index) => {
        //     if (element?.attributes?.content_name == "HeadingTag") {
        //       setHeadingTag(element?.attributes?.content_value);
        //     } else if (element?.attributes?.content_name == "Title") {
        //       setTitle(element?.attributes?.content_value);
        //     } else if (element?.attributes?.content_name == "MetaDescription") {
        //       setMetaDescription(element?.attributes?.content_value);
        //     } else if (element?.attributes?.content_name == "Long_Text") {
        //       setLongText(element?.attributes?.content_value);
        //     } else if (element?.attributes?.content_name == "Right_Header") {
        //       setRightHeader(element?.attributes?.content_value);
        //     } else if (element?.attributes?.content_name == "Right_Corner") {
        //       setRightCorner(element?.attributes?.content_value);
        //     }
        //   });
        // }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout>
      <section className="trvl_info_row">
        <div className="container">
          <div className="bookmark_row">
            <FriendlyUrl
              data={`home/make-an-enquiry/${friendlyUrl}`}
            ></FriendlyUrl>
          </div>

          <div className="trvl_info_cntnt">
            <h2 className="trvl_title">{dictioneryFunction(thankyouData?.custom_page_contents?.data.filter(
              (res) =>
                res.attributes.content_name ===
                "title"
            )[0]?.attributes?.content_value)}</h2>
            {/* <p className="mb-4">
              Exsus is a little different to other travel companies. All of our
              holidays are truly tailor-made, offering you complete choice and
              freedom. One of our experienced destination experts will get back
              to you within 24 hours, or the next working day, should we receive
              your enquiry on a weekend or a public holiday, to start creating
              your perfect trip.
            </p>
            <p className="mb-4">
              In the meantime, please feel free to call us on 020 7337 9010 or
              contact us at <a href="javascript:void(0)"> escape@exsus.com.</a>
            </p>
            <p className="mb-4">Thank you once again for getting in touch.</p>
            <p className="mb-4">The Exsus team</p>
            <p>
              Opening hours: Monday to Thursday 08:30am-6pm GMT and 9am-5pm GMT
              on Fridays
            </p> */}
            <div
              dangerouslySetInnerHTML={{
                __html: dictioneryFunction(thankyouData?.custom_page_contents?.data.filter(
                  (res) =>
                    res.attributes.content_name ===
                    "MakeAnEnquiryThankYouText"
                )[0]?.attributes?.content_value),
              }}
            />
          </div>
        </div>
      </section>
      <section class="card_blk_row dark_grey py-5">
        <div class="container">
          <div class="book_wth_confdnce">
            <div
              dangerouslySetInnerHTML={{
                __html: dictioneryFunction(thankyouData?.custom_page_contents?.data.filter(
                  (res) =>
                    res.attributes.content_name ===
                    "Short_Text"
                )[0]?.attributes?.content_value),
              }}
            />
          </div>
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
    </Layout>
  );
}
