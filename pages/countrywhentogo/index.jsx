import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  destinationService,
  homeService,
  countriesService,
} from "../../services";
import { NavLink } from "react-router-dom";

export default CountryWhentogo;

function CountryWhentogo({ onDataFromChild, sendDataToParent }) {
  //  ("country", country);
  const [countryData, setCountryData] = useState();
  const router = useRouter();
  const [whenToGoData, setModifiedData] = useState(null);
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const [isLoading, setIsLoading] = useState(true);
  const destinationcode = router.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
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

  // const generateTds = (starting_point, quantity, text, url) => {
  //   const tds = Array.from({ length: 12 }, (_, i) => {
  //     const isColspan = starting_point === i + 1 && quantity > 0;

  //     if (isColspan) {
  //       return (
  //         <td key={i} colSpan={quantity} className="calender_trip_detls">
  //           <a href={url}>{/* Replace '#' with your actual link */}
  //             {text}
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43">
  //               <path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path>
  //             </svg>
  //           </a>
  //         </td>
  //       );
  //     } else {
  //       return <td key={i}></td>;
  //     }
  //   });

  //   return tds;
  // };

  const generateTds = (starting_point, quantity, text, url) => {
    const tds = [];

    // Generate empty cells before colspan
    for (let i = 0; i < starting_point - 1; i++) {
      tds.push(<td key={i}></td>);
    }

    // Generate colspan cell
    if (quantity > 0) {
      tds.push(
        <td
          key={starting_point - 1 + quantity}
          colSpan={quantity}
          className="calender_trip_detls"
        >
          <a href={url}>
            {text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 267 512.43"
            >
              <path
                fill-rule="nonzero"
                d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
              />
            </svg>
          </a>
        </td>
      );
    }

    // Generate empty cells after colspan
    for (let i = starting_point - 1 + quantity; i < 12; i++) {
      tds.push(<td key={i}></td>);
    }

    return tds;
  };

  const sendDataToParentHandler = (data) => {
    // Send the data to the parent
    onDataFromChild(data);
    // You can perform other actions related to sending data to the parent
  };

  const handleClick = (e) => {
    // Call the callback function to send data to the parent
    sendDataToParent(e);
  };

  const generateDynamicLink = (item) => {
    //  ('item', item);
    return regionWiseUrl + `/hotel-detail?hotelid=${item}`;
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
                modifiedString = modifiedString.replace(checkStr, replacement);
              }
            });
            return modifiedString;
          } catch (error) {
            if (error) {
              return data;
            }
          }
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

    countriesService
      .getCountryDetails(countrycode)
      .then((x) => {
        debugger;
        setCountryData(x.data[0]);
        //?.attributes?.country_month_activities  attributes.whentogo_intro_text
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    const sortedData =
      countryData?.attributes?.country_month_activities?.data?.sort((a, b) => {
        const seqA = parseInt(a.attributes.serial_number, 10);
        const seqB = parseInt(b.attributes.serial_number, 10);

        return seqA - seqB;
      });

    const modifiedData = sortedData?.map((item) => {
      const attributes = item.attributes;
      const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ];

      // Find the starting point and quantity
      let startingPoint = null;
      let quantity = 0;

      for (let i = 0; i < months.length; i++) {
        if (attributes[months[i]]) {
          if (startingPoint === null) {
            startingPoint = i + 1;
          }
          quantity++;
        }
      }

      return {
        ...item,
        attributes: {
          ...attributes,
          starting_point: startingPoint,
          quantity: quantity,
        },
      };
    });
    setModifiedData(modifiedData);

    window.onload = () => {
      setTimeout(() => {
        const redirectUrl =
          regionWiseUrl +
          `/destinations/${destinationcode}/${countrycode?.replace(/ /g, "-")}`;
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [countrycode, countryData]);

  return (
    <>
      <div className="container">
        <section className="destination_para">
          <p
            dangerouslySetInnerHTML={{
              __html: dictioneryFunction(
                countryData?.attributes?.whentogo_intro_text
              ),
            }}
          />
          {/* <p>{countryData?.country_month_activities?.data}</p> */}
        </section>
      </div>
      <section className="calender_blk_row light_dark_grey">
        <div className="container">
          <h3>
            Our favourite experience-oriented trips to {countrycode} by month
          </h3>
          <p>
            The team at Exsus has incorporated some of {countrycode}'s best
            experiences into recommended trips. Click on an experience to view
            each trip
          </p>
          <div className="calender_blk_inr">
            <table>
              <tbody>
                <tr>
                  <th>Jan</th>
                  <th>Feb</th>
                  <th>Mar</th>
                  <th>Apr</th>
                  <th>May</th>
                  <th>Jun</th>
                  <th>Jul</th>
                  <th>Aug</th>
                  <th>Sep</th>
                  <th>Oct</th>
                  <th>Nov</th>
                  <th>Dec</th>
                </tr>
                <tr>
                  {/* Add 12 empty cells */}
                  {Array.from({ length: 12 }, (_, index) => (
                    <td key={index}></td>
                  ))}
                </tr>
                {whenToGoData?.map((item, rowIndex) => (
                  <>
                    <tr key={item.id}>
                      {generateTds(
                        item?.attributes?.starting_point,
                        item?.attributes?.quantity,
                        item?.attributes?.link_text,
                        item?.attributes?.link_url
                      )}
                    </tr>
                    <tr>
                      {/* Add 12 empty cells */}
                      {Array.from({ length: 12 }, (_, index) => (
                        <td key={index}></td>
                      ))}
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Card */}
      <section className="card_blk_row dark_grey">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="card_blk_inr card_blk_overlay">
                <a onClick={() => handleClick("itineraries")}>
                  <img
                    src="\images\country_detail01.jpg"
                    alt="Card image 07"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt card_blk_cntnt_top">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>
                            See all Itinerary Ideas in{" "}
                            {countryData?.attributes?.country_name}
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
                </a>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card_blk_inr card_blk_overlay">
                <a onClick={() => handleClick("places-to-stay")}>
                  <img
                    src="\images\country_detail02.jpg"
                    alt="Card image 08"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt card_blk_cntnt_top">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>
                            See all Places to Stay in{" "}
                            {countryData?.attributes?.country_name}
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
