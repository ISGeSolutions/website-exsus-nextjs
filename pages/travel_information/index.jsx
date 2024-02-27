import { useState, useEffect } from "react";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { customeService, homeService } from "../../services/custome.service";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { FriendlyUrl } from "../../components";
import Head from "next/head";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [travelInfo, setTravelInfo] = useState(null);

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

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
          } catch (error) {
            if (error.message === "Loop break") {
            } else if (error.message === "Region not found") {
            }
          }
        }
      }
    } else {
    }
  };

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));
    customeService.getTravelInformation().then((x) => {
      setTravelInfo(x.data[0].attributes);
      localStorage.setItem(
        "PageInfo",
        JSON.stringify({
          pType: "CUST",
          pCode: x?.data[0]?.attributes?.page_code,
        })
      );
    });
  }, []);

  return (
    <>
      <Head>
        <title>
          {
            travelInfo?.custom_page_contents?.data?.filter(
              (res) => res?.attributes?.content_name == "Title"
            )[0]?.attributes?.content_value
          }
        </title>
      </Head>
      <Layout>
        <section className="trvl_info_row">
          <div className="container">
            <div className="bookmark_row">
              <FriendlyUrl
                data={`home/${dictioneryFunction(
                  travelInfo?.page_friendly_url
                )}`}
              ></FriendlyUrl>
            </div>
            <div className="trvl_info_cntnt trvl_info_para_blk">
              <h2 className="trvl_title">
                {
                  travelInfo?.custom_page_contents?.data?.filter(
                    (res) => res.attributes?.content_name == "HeadingTag"
                  )[0]?.attributes?.content_value
                }
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: travelInfo?.custom_page_contents?.data?.filter(
                    (res) => res.attributes?.content_name == "Long_Text"
                  )[0]?.attributes?.content_value,
                }}
              ></p>
            </div>
            {/* <p>
                Exsus Travel is committed to safe and responsible travel. The
                links below provide pre-trip advice and practical information
                for all your holiday essentials. Please advise your travel
                expert of any special requirements at the outset of the booking
                process.
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>TRAVEL ADVICE</h2>
              <p>
                The Foreign, Commonwealth & Development Office have up-to-date
                advice on staying safe and healthy abroad. For the latest travel
                advice from the Foreign & Commonwealth Office including security
                and local laws, plus passport and visa information check:{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.gov.uk/foreign-travel-advice
                </a>
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>ABTA PROTECTION</h2>
              <p className="mb-4">
                Exsus Travel Ltd is a Member of ABTA with membership number
                Y6561. ABTA and ABTA Members help holidaymakers to get the most
                from their travel and assist them when things do not go
                according to plan. We are obliged to maintain a high standard of
                service to you by ABTA’s Code of Conduct. We can also offer you
                ABTA’s scheme for the resolution of disputes which is approved
                by the Chartered Trading Standards Institute. If we can’t
                resolve your complaint, go to{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.abta.com
                </a>{" "}
                to use ABTA’s simple procedure. Further information on the Code
                and ABTA’s assistance in resolving disputes can be found on{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.abta.com.
                </a>
              </p>
              <p>
                For further information about ABTA, the Code of Conduct and the
                arbitration scheme available to you if you have a complaint,
                contact ABTA, 30 Park Street, London SE1 9EQ. Tel: 020 3117 0500
                or{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.abta.com.
                </a>
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>ATOL PROTECTION</h2>
              <p>
                Flights that are sold with a UK departure and flight-inclusive
                holidays that are sold within the EEA on this website are
                financially protected by the ATOL scheme. Please ask us to
                confirm what protection may apply to your booking. If you do not
                receive an ATOL Certificate then the booking will not be
                ATOL-protected. Please see our booking terms for information or
                for more information about financial protection and the ATOL
                Certificate go to:{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.caa.co.uk.
                </a>{" "}
                Our ATOL number is 5126.
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>AITO MEMBERSHIP</h2>
              <p className="mb-4">
                Exsus Travel is a member of AITO, The Specialist Travel
                Association. AITO encourages the highest standards in all
                aspects of tour operating and customer service. Exsus Travel
                abides by the Association’s Code of Conduct and Quality Charter.
              </p>
              <p>
                Visit{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.aito.com
                </a>{" "}
                for more information
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>PASSPORT & VISAS</h2>
              <p>
                Please ensure all passports have a minimum of 6 months validity
                on your return date of travel, visas may be required, and it is
                your responsibility to ensure you obtain the appropriate visa
                for the country you are visiting and hold valid passports. You
                can check your visa requirements by contacting your local
                embassy or by visiting:{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.cibtvisas.co.uk/exsus.
                </a>
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>TRAVEL TO USA</h2>
              <p>
                Those seeking to travel to the United States under the Visa
                Waiver Program are subject to enhanced security requirements.
                All eligible travellers who wish to travel under the Visa Waiver
                Program must apply for authorisation before travel using the
                following process:{" "}
                <a href="#" onClick={handleHrefClick}>
                  https://esta.cbp.dhs.gov
                </a>
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>HEALTH</h2>
              <p>
                Please ensure you have the correct vaccinations before
                travelling and note that some countries require certificates for
                mandatory vaccinations. Visit the NHS website for advice and
                speak with your GP or a travel clinic well in advance of your
                journey.{" "}
                <a href="#" onClick={handleHrefClick}>
                  www.fitfortravel.nhs.uk
                </a>
              </p>
            </div>
            <div className="trvl_info_cntnt">
              <h2>TRAVEL INSURANCE</h2>
              <p>
                Please take the time to ensure you have adequate travel
                insurance for your trip when you book your holiday so that you
                have cover in the event of cancellation, such as due to an
                illness or a serious accident. Cover should also include medical
                expenses and repatriation in the event of accident or illness.
                We also recommend you have cover for personal belongings, travel
                delay, personal liability and overseas legal expenses. If you
                intend to take part in any adventurous activities or sports on
                your trip, including trekking, you should ensure you have
                sufficient cover for these also.
              </p> */}
            {/* </div> */}
          </div>
        </section>

        <section className="make_enqury_row">
          <div className="container">
            <EnquiryButton />
          </div>
        </section>

        <section aria-label="Sign up for newsletter" className="newslettr_row">
          <div className="container">
            <h4>Sign up for our newsletter</h4>
            <h5>Receive our latest news and special offers</h5>
            <Signup />
          </div>
        </section>
      </Layout>
    </>
  );
}
