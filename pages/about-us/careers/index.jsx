import { useState, useEffect } from "react";
import { Link, Spinner, Signup, FriendlyUrl } from "components";
import { Layout } from "components/users";
import { careeratexsusService, homeService } from "services";
import Head from "next/head";
import { EnquiryButton } from "../../../components/common/EnquiryBtn";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [careerData, setCareerData] = useState(null);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCornet, setRightContent] = useState(null);
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

  const handleHrefClick = (event) => {
    event.preventDefault();
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
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    careeratexsusService
      .getCareerPage()
      .then((x) => {
        setCareerData(x.data[0]);
        localStorage.setItem("PageInfo", JSON.stringify({ pType: "CUST", pCode: x?.data[0]?.attributes?.page_code }));
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              //  (element?.attributes?.content_value);
              setLongText(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightContent(element?.attributes?.content_value);
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
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription}></meta>
      </Head>
      <section className="trvl_info_row">
        <div className="container">
          <div className="bookmark_row">
            <FriendlyUrl
              data={"Home / " + careerData?.attributes?.page_friendly_url}
            ></FriendlyUrl>
            {/* <ul>
              <li>
                <a href="homepage.html">Home</a>
              </li>
              <li>
                <a href="about_us.html">About us</a>
              </li>
              <li>Careers</li>
            </ul> */}
          </div>
          <div className="trvl_info_cntnt careers_para_blk">
            <h2 className="trvl_title">{headingTag}</h2>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: dictioneryFunction(longText) }}
            />
          </div>
          {/* <div className="trvl_info_cntnt">
            <h2 className="trvl_title_white">
              Sales & Marketing Support (Assistant Level)
            </h2>
            <p className="mb-4">
              Are you passionate about travelling? Keen to work in the travel
              and leisure industry? If so, an exciting job opportunity has
              arisen to join Exsus Travel in Sales and Marketing Support.
            </p>
            <p className="mb-4">
              This is an excellent opportunity to get involved in all aspects of
              the daily running of Exsus Travel.
            </p>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>On the sales side, duties may include:</p>
                  <ul>
                    <li>Working on the travel booking system</li>
                    <li>Assisting with drafting quotes for clients</li>
                    <li>Sourcing and logging imagery/video footage</li>
                    <li>
                      Checking and editing travel itineraries as necessary
                    </li>
                    <li>
                      Researching and fact-checking practical information, such
                      as for transfers and excursions
                    </li>
                    <li>
                      Preparing, printing, and sending itineraries and travel
                      wallets to our clients
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>On the marketing side, duties may include:</p>
                  <ul>
                    <li>
                      Using the Content Management System to update content and
                      images on the website
                    </li>
                    <li>Copywriting, such as for hotels and itineraries</li>
                    <li>Writing and posting social media content</li>
                    <li>Helping to upload marketing offers to various sites</li>
                    <li>
                      Assisting the Marketing Manager with adhoc duties as
                      required
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mb-4">
              No two days are the same, and there will be a range of other
              miscellaneous tasks to assist with as and when they come up.
            </p>
            <p className="mb-4">
              This position is ideal for someone who has a passion for travel,
              an eye for writing inspiring content, and is a hard-working
              all-rounder. In return, you’ll learn about all aspects of sales
              and marketing.
            </p>
            <div className="row">
              <div className="col-12 mb-3">
                <div className="careers_list_blk">
                  <p>Desired skills & requirements:</p>
                  <ul>
                    <li>
                      Must have excellent copywriting skills and an eye for
                      attention to detail.
                    </li>
                    <li>
                      Must be well-organised and be able to multi-task under
                      pressure.
                    </li>
                    <li>Possess a passion for travel and tourism</li>
                    <li>Be creative minded</li>
                    <li>
                      Have a willingness to learn (we sell over 90 destinations
                      worldwide with lots of travel content to get to grips
                      with!)
                    </li>
                    <li>
                      Some background in copywriting is preferred, though you
                      will be given training as needed
                    </li>
                    <li>
                      Prior experience working in a sales or marketing is
                      preferred but not a pre-requisite
                    </li>
                    <li>
                      Must have excellent copywriting skills and a high
                      attention to detail. You must be well-organised and be
                      able to multi-task under pressure
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="trvl_info_cntnt">
            <h2 className="trvl_title_white">Accounts Assistant</h2>
            <p className="mb-4">
              A great opportunity has arisen to join Exsus Travel as an Accounts
              Assistant. The purpose of this role is to support the Finance
              Director to deliver all financial requirements of the business.
            </p>
            <p className="mb-4">
              This position would suit someone who has either recently graduated
              university with an accounts degree or has some experience working
              in a finance department.
            </p>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>Key Responsibilities:</p>
                  <ul>
                    <li>Posting and reconciliation of all bank transactions</li>
                    <li>
                      Posting of supplier invoices and making payments to
                      suppliers
                    </li>
                    <li>Checking and posting credit card transactions</li>
                    <li>Support with preparing management accounts</li>
                    <li>
                      Support the Finance Director with any ad-hoc activities
                      and admin as necessary
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>Key Requirements:</p>
                  <ul>
                    <li>Strong MS Excel skills</li>
                    <li>Highly numerate</li>
                    <li>Must have a good basic knowledge of a Trial Balance</li>
                    <li>
                      Must be a confident communicator, as you will regularly
                      liaise with the sales team and our suppliers
                    </li>
                    <li>
                      Some knowledge of accounting software is preferred, though
                      you will be given training as needed
                    </li>
                    <li>
                      Prior experience working in a finance department is
                      preferred but not a pre-requisite
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mb-4">
              To apply, please send your CV and cover letter to{" "}
              <a href="#" onClick={handleHrefClick}>recruitment@exsus.com</a>
            </p>
          </div>
          <div className="trvl_info_cntnt">
            <h2 className="trvl_title_white">
              Travel Sales Specialist (various destinations WORLDWIDE)
            </h2>
            <p className="mb-4">
              We are looking for a travel sales specialist to join our busy
              team, covering various destinations worldwide. If you share our
              passion for travel, have at least two years' travel sales
              experience (ideally in the luxury sector) and love creating
              unique, inspirational trips, we would love to hear from you.
            </p>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>
                    Reporting to the Head of Sales, your key responsibilities
                    will be:
                  </p>
                  <ul>
                    <li>
                      To work closely with high-end, discerning clients to
                      create tailor-made trips using your first-hand knowledge
                      and personal expertise
                    </li>
                    <li>
                      To respond quickly to new enquiries, build rapport with
                      clients and show a good understanding of your clients'
                      needs
                    </li>
                    <li>To design innovative and inspiring itineraries</li>
                    <li>
                      To work closely with our marketing team to provide insight
                      into new product and share ideas about your specialist
                      area/s
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>Desired skills and experience:</p>
                  <ul>
                    <li>
                      At least two years' previous sales experience within the
                      travel industry, preferably the luxury sector
                    </li>
                    <li>
                      To be target motivated whilst delivering a high level of
                      customer service
                    </li>
                    <li>
                      To have a proven track record of achieving monthly and
                      quarterly sales targets
                    </li>
                    <li>To have a high level of commercial acumen</li>
                    <li>To have the ability to work well under pressure</li>
                    <li>
                      To possess excellent communication skills – both written
                      and verbal
                    </li>
                    <li>
                      To be passionate about travel, with a curiosity to learn
                      about new regions and develop your expertise
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mb-4">
              To apply, please send your CV and cover letter, stating clearly
              which area/s you specialise in, to{" "}
              <a href="#" onClick={handleHrefClick}>recruitment@exsus.com </a>
            </p>
          </div> */}
        </div>
      </section>

      <section className="make_enqury_row">
        <div className="container">
          <EnquiryButton />
        </div>
      </section>

      <section aria-label="Sign up for newsletter" className="newslettr_row">
        <div className="container">
          <h4>Sign up for our newsletter
            <span>Receive our latest news and special offers</span></h4>
          <Signup />
        </div>
      </section>
    </Layout>
  );
}
