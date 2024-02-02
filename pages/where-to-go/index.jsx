import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { useRouter } from "next/router";
import { NavLink } from "components";
import { whereToGoService } from "../../services";
import { FriendlyUrl, Signup } from "../../components";
import Head from "next/head";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { destinationService, homeService } from "../../services";

export default Index;

function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [customData, setCustomData] = useState(null);
  const [friendlyUrl, SetFriendlyUrl] = useState("");
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState("");
  const [shortText, setShortText] = useState("");
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCorner, setRightCorner] = useState(null);
  const [valueWithBr, setnewValueWithBr] = useState("");
  const [backgroundImage, setBackgroundImage] = useState([]);
  let dictionaryPage = 1;

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window && window.site_region !== "uk") {
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
          } catch (error) {}
        }
      }
    }
  };

  const generateDynamicLink = () => {
    return regionWiseUrl + `/where-to-go-detail`;
  };

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));
    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }
    whereToGoService
      .getWhereToGoPage()
      .then((x) => {
        //
        setCustomData(x.data[0]?.attributes?.custom_page_images);
        SetFriendlyUrl(x.data[0].attributes?.page_friendly_url);
        const imageCheck = x.data[0].attributes.custom_page_images.data;
        const newBackgroundImages = [];
        imageCheck.forEach((element) => {
          if (element.attributes.image_type == "banner") {
            newBackgroundImages.push(element.attributes.image_path);
          }
        });
        setBackgroundImage(newBackgroundImages);
        //  (newBackgroundImages);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        let modifiedString = "";
        //

        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightCorner(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              //
              //  (element?.attributes?.content_value);
              setLongText(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Short_Text") {
              //
              //  (element?.attributes?.content_value);
              setShortText(element?.attributes?.content_value);
            }
          });
        }

        // Find and store matches in an array
        // const regex = /{[a-zA-Z0-9-]+}/g;
        // const matches = [...new Set(modifiedString.match(regex))];

        // let storedDataString = "";
        // let storedData = "";
        // if (region == "uk") {
        //     storedDataString = localStorage.getItem("websitecontent_uk");
        //     storedData = JSON.parse(storedDataString);
        // } else if (region == "us") {
        //     storedDataString = localStorage.getItem("websitecontent_us");
        //     storedData = JSON.parse(storedDataString);
        // } else if (region == "asia") {
        //     storedDataString = localStorage.getItem("websitecontent_asia");
        //     storedData = JSON.parse(storedDataString);
        // } else if (region == "in") {
        //     storedDataString = localStorage.getItem("websitecontent_india");
        //     storedData = JSON.parse(storedDataString);
        // }
        // if (storedData !== null) {
        //     // You can access it using localStorage.getItem('yourKey')
        //     if (matches) {
        //         let replacement = "";
        //         try {
        //             matches.forEach((match, index, matches) => {
        //                 const matchString = match.replace(/{|}/g, "");
        //                 if (!storedData[matchString]) {
        //                     websiteContentCheck(matches, region, modifiedString);
        //                     throw new Error("Loop break");
        //                 } else {
        //                     replacement = storedData[matchString];
        //                 }
        //                 const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
        //                 if (checkStr && replacement) {
        //                     modifiedString = modifiedString.replace(
        //                         checkStr,
        //                         replacement
        //                     );
        //                 }
        //             });
        //             // Set the modified string in state
        //             setLongText(modifiedString);

        //             setIsLoading(false);
        //         } catch (error) {
        //             if (error.message === "Loop break") {
        //                 // Handle the loop break here
        //             } else if (error.message === "Region not found") {
        //                 // Handle the loop break here
        //                 setLongText(modifiedString);

        //             }
        //         }
        //     }
        // }
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });

    const carousel = document.querySelector("#carouselExampleInterval");
    if (carousel) {
      new bootstrap.Carousel(carousel);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{dictioneryFunction(title)}</title>
        <metadata content={dictioneryFunction(metaDescription)}></metadata>
      </Head>
      <Layout>
        <section className="banner_blk_row">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {backgroundImage.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
              {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
            </div>
            <div className="carousel-inner">
              {backgroundImage.map((imagePath, index) => (
                <NavLink
                  key={index}
                  href="#"
                  onClick={handleHrefClick}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="5000"
                >
                  <div
                    className="banner_commn_cls"
                    style={{ backgroundImage: `url(${imagePath})` }}
                  ></div>
                </NavLink>
              ))}
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
              <div
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(longText),
                }}
              />
            </div>

            {/* <section className="month_wise_row">
                            <h3 className="title_cls">Month-by month holiday calendar</h3>
                            <div className="row">
                                <NavLink href={generateDynamicLink()}>
                                    <div className="col-lg-6">
                                        <div className="month_wise_cnt_blk">
                                            <h4>Where to go on holiday in January</h4>
                                            <a href="when_to_go_detail.html">
                                                <img
                                                    src="images/jan_month.jpg"
                                                    alt="jan-month"
                                                    className="img-fluid"
                                                />
                                            </a>
                                            <p>
                                                Kick off the New Year somewhere amazing and uplifting,
                                                whether you go in search of winter sun or embrace the snow
                                                for a season of activity and adventure.{" "}
                                                <a href="when_to_go_detail.html">
                                                    See where we'd recommend in January &gt;
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in February</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/feb_month.jpg"
                                                alt="feb-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            Escape the winter and head to the tropics while the
                                            weather’s still warm and the crowds have thinned or explore
                                            European cities on a cultural break.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in February &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in March</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/march_month.jpg"
                                                alt="march-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            Whether it’s a springtime escape, an early Easter break or
                                            something between winter and summer to see you through, head
                                            to the beach or catch the last of the Northern Lights.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in March &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in April</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/april_month.jpg"
                                                alt="april-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            While the Mediterranean hots up, head further afield to
                                            safari in Namibia, watch wildlife in the Galapagos or
                                            witness the cherry blossom in Japan.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in April &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in May</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/may_month.jpg"
                                                alt="may-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            Make the most of the bank holidays with a European escape or
                                            find wildlife in the vast landscapes of Botswana or Zambia.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in May &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in June</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/june_month.jpg"
                                                alt="june-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            With the arrival of summer, hit the beach before the crowds,
                                            go on the ultimate road trip in the USA, or enjoy the dry
                                            season in Peru.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in June &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in July</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/july_month.jpg"
                                                alt="july-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            While it’s busy in Europe, head to Iceland or go further for
                                            adventure and the trip of a lifetime combining safaris and
                                            Indian Ocean barefoot luxury.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in July &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in August</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/aug_month.jpg"
                                                alt="august-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            While everyone else is away, look for these hidden gems or
                                            search for wildlife, activity and adventure in more secluded
                                            spots.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in August &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in September</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/sep_month.jpg"
                                                alt="sep-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            As things quieten down after the summer, head to France or
                                            Santorini, go on safari in Kenya or enjoy the spectacle of
                                            the Fall foliage in the USA.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in September &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in October</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/oct_month.jpg"
                                                alt="oct-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            Get a final hit of European sunshine, take the chance to
                                            bask in the southern hemisphere's springtime, or look out
                                            for an idyllic island escape in Bali.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in October &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in November</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/nov_month.jpg"
                                                alt="nov-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            Travel for winter sunshine or a hit of wilderness, with
                                            wildlife in Brazil, activities in New Zealand, empty spaces
                                            in Patagonia and the deserts of Oman all ideal places to
                                            visit this month.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in November &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="month_wise_cnt_blk">
                                        <h4>Where to go on holiday in December</h4>
                                        <a href="when_to_go_detail.html">
                                            <img
                                                src="images/dec_month.jpg"
                                                alt="dec-month"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <p>
                                            Whether it’s Christmas in Cuba or snow and sports in Norway,
                                            blissful beaches in Sri Lanka or sizzling barbecues in
                                            Australia, or New Year in an overwater villa in the Indian
                                            Ocean, the festive months make a great time to travel.{" "}
                                            <a href="when_to_go_detail.html">
                                                See where we'd recommend in December &gt;
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section> */}
          </div>
        </section>

        <section className="card_blk_row dark_grey py-5">
          <div className="container">
            <div className="book_wth_confdnce">
              <div
                dangerouslySetInnerHTML={{
                  __html: dictioneryFunction(shortText.replace(/h3/g, "h2")),
                }}
              />

              {/* <h2>THREE REASONS TO BOOK WITH CONFIDENCE</h2>
                            <div className="row">
                                <div className="col-lg-4">
                                    <h3>Specialist Expertise</h3>
                                    <p>
                                        With over 20 years’ experience of creating incredible journeys
                                        and tailor-made luxury honeymoons, all around the world, our
                                        destination experts have first-hand experience of their
                                        dedicated areas and frequently travel to them to stay on top
                                        of what’s best, what’s new and what not to miss, so can advise
                                        you personally.
                                    </p>
                                </div>
                                <div className="col-lg-4">
                                    <h3>Tailor-made trips</h3>
                                    <p>
                                        All trips put together through us are designed to suit
                                        individual needs and interests. Personalise an itinerary by
                                        adding more time in your favourite place, including an
                                        incredible experience you’d like to have or adding something
                                        out of the ordinary, so your holiday turns into a trip of a
                                        lifetime.
                                    </p>
                                </div>
                                <div className="col-lg-4">
                                    <h3>Fully protected</h3>
                                    <p>
                                        From the moment you start planning your trip, you will have a
                                        dedicated expert looking after you. While away, we’ll provide
                                        24/7 support and emergency contact to ensure that everything
                                        runs smoothly. We are members of ABTA, ATOL and AITO so you
                                        can rest assured your holiday is fully protected.{" "}
                                    </p>
                                </div>
                            </div> */}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card_blk_inr card_blk_overlay start_planng_holdy_blk">
                  <a href="#" onClick={handleHrefClick} target="_blank">
                    <img
                      src="images/start_planng_holdy.jpg"
                      alt="start_planng_holdy"
                      className="img-fluid"
                    />
                    <div className="card_blk_cntnt card_blk_cntnt_top">
                      <div className="row align-items-center">
                        <div className="col-11">
                          <div className="card_blk_txt">
                            <h3>Start planning your next holiday</h3>
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
                        <div className="col-12">
                          <button className="btn prmry_btn strt_planng_btn">
                            {/* onClick="window.open('contact_us.html')" */}
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
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card_blk_inr card_blk_overlay mt-3 mt-md-0">
                  <a href="#" onClick={handleHrefClick} target="_blank">
                    <img
                      src="images/about_us_card01.jpg"
                      alt="Card image 07"
                      className="img-fluid"
                    />
                    <div className="card_blk_cntnt card_blk_cntnt_top">
                      <div className="row align-items-center">
                        <div className="col-11">
                          <div className="card_blk_txt">
                            <h3>Explore our destinations</h3>
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
                <div className="card_blk_inr card_blk_overlay mb-0">
                  <a href="#" onClick={handleHrefClick}>
                    <img
                      src="images/about_us_card02.jpg"
                      alt="Card image 08"
                      className="img-fluid"
                    />
                    <div className="card_blk_cntnt card_blk_cntnt_top">
                      <div className="row align-items-center">
                        <div className="col-11">
                          <div className="card_blk_txt">
                            <h3>Explore our Holiday types</h3>
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
