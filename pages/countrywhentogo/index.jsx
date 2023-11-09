import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default CountryWhentogo;

function CountryWhentogo(props) {
  // console.log("country", country);
  const [countryData, setCountryData] = useState(props?.data);

  const router = useRouter();
  const countrycode = router.query?.country
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();
  const [isLoading, setIsLoading] = useState(true);
  const destinationcode = router.query?.continent
    ?.replace(/-and-/g, " & ")
    .replace(/-/g, " ")
    .toLowerCase();

  // let regionWiseUrl = "/uk";
  // let region = "uk";
  // if (typeof window !== "undefined") {
  //   if (window && window.site_region) {
  //     regionWiseUrl = "/" + window.site_region;
  //     region = window.site_region;

  //     // setMyVariable(window.site_region);
  //   }
  // }

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
                modifiedString = modifiedString.replace(
                  checkStr,
                  replacement
                );
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
  }

  useEffect(() => {
    // Using window.onload to detect full page load
    window.onload = () => {
      setTimeout(() => {
        const redirectUrl =
          regionWiseUrl + `/destinations/${destinationcode}/${countrycode}`;
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }, 0);
    };
  }, [countrycode]);

  return (
    <>
      <div className="container">
        <section className="destination_para">
          <p dangerouslySetInnerHTML={{ __html: dictioneryFunction(countryData?.whentogo_intro_text) }} />
        </section>
      </div>

      {/* Card */}
      <section className="card_blk_row dark_grey">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="card_blk_inr card_blk_overlay">
                <a href="#" target="_blank">
                  <img
                    src="./../../images/country_detail01.jpg"
                    alt="Card image 07"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt card_blk_cntnt_top">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>See all Itinerary Ideas in China</h3>
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
                <a href="#">
                  <img
                    src="./../../images/country_detail02.jpg"
                    alt="Card image 08"
                    className="img-fluid"
                  />
                  <div className="card_blk_cntnt card_blk_cntnt_top">
                    <div className="row align-items-center">
                      <div className="col-11">
                        <div className="card_blk_txt">
                          <h3>See all Places to Stay in China</h3>
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
