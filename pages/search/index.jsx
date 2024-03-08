import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { useRouter } from "next/router";
import { searchService } from "../../services";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Alert } from "../../components";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [itineraries, setItineraries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  let page = 1; // Current page  
  const [metaData, setMetaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let pageSize = 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
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


  // form validation rules
  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Enter something to search!")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    ("closeAlert");
    setAlert(null);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    searchTerm = data?.searchTerm;
    page = 1;
    loadMoreData(searchTerm);
  }

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  const onNumberClick = (index) => {
    setActiveIndex(index);
    page = index + 1;
    loadMoreData(searchTerm);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const generateDynamicUrl = (url) => {
    return regionWiseUrl + "/" + url?.replace(/ /g, "-")?.replace(/&/g, "and").toLowerCase();
  }

  const loadMoreData = (param) => {
    // setIsLoading(true);
    searchService
      .searchSite(param, page, pageSize)
      .then((response) => {
        setMetaData(response.meta.pagination);
        const newResults = response?.data[0];
        if (newResults.length > 0) {
          setSearchResult(newResults);
          setPage(page + 1);
        }
        // const newItineraries = response.data;
        setIsLoading(false);
        setPage(page + 1);
      })
      .catch((error) => {
        // Handle any errors here
        // console.error(error);
        // setIsLoading(false);
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

  const forwardClick = () => {
    page = page + 1;
    loadMoreData(searchTerm);
  }

  const backwordClick = () => {
    if (page > 1) {
      page = page - 1;
    }
    loadMoreData(searchTerm);
  }

  useEffect(() => {
    // console.log(searchTerm);
    // const searchData = router.query?.search;

    const { search } = router.query;
    if (search) {
      setSearchTerm(search);
    }

    if (
      !localStorage.getItem(
        `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
      )
    ) {
      websiteContentCheck(dictionaryPage);
    }

    searchService
      .customPage()
      .then((x) => {
        localStorage.setItem(
          "PageInfo",
          JSON.stringify({
            pType: "CUST",
            pCode: x?.data[0]?.attributes?.page_code,
          })
        );
      })
      .catch((error) => {
        showAlert(error);
      });
    // userService.getAll().then(x => setUsers(x));
    if (search) {
      loadMoreData(search)
    }
  }, [router.query, page]);

  return (

    <Layout>
      {
        isLoading ? (
          // <MyLoader />
          <div
            className="full_loader_parnt_blk loader_parnt_blk"
            style={{ display: `block !important` }}
          >
            <div className="loader-circle-2"></div>
          </div >
        ) : (
          <>
            <section className="favrites_blk_row dark_grey pt-5">
              <div className="container-md">
                <h2 className="search_result_title">Search result for Asia site</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="search_result_input d-block d-md-flex">
                    <input
                      className="form-control search mb-3 mb-md-0"
                      id="search"
                      type="search"
                      value={searchTerm}
                      name="searchTerm"
                      placeholder="Search here"
                      {...register("searchTerm")}
                      autoComplete="off"
                      onChange={handleChange}
                    />
                    <div className="banner_inspire_btn ps-0 ps-md-2">
                      <button
                        type="submit"
                        className="btn btn-primary prmry_btn"
                        fdprocessedid="i8b0e3"
                      >
                        Search
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
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>

                <div className="destination_filter_result">
                  <p>We've found about {metaData?.total ? metaData?.total : 0} results.</p>
                </div>
                <div className="search_result_list_parnt">
                  <ul>
                    <li className="d-inline-block d-sm-flex">
                      <div className="search_result_inr_cnt">
                        <h3>
                          <a href="https://mailchi.mp/exsus.com/brochure-request">
                            Request a brochure
                          </a>
                        </h3>
                        <a href="#" onClick={handleHrefClick}>
                          https://mailchi.mp/exsus.com/brochure-request
                        </a>
                        <p>
                          Titled ‘Escape the Obvious’, our brochure highlights the
                          very finest experiences in our most popular destinations,
                          and can be used to inspire you to discover some of the most
                          spectacular places in the world on a unique, bespoke holiday
                          crafted by our knowledgeable and experienced experts
                        </p>
                      </div>
                    </li>
                    {searchResult?.map((item) => (
                      <li class="d-inline-block d-sm-flex">
                        <a href={generateDynamicUrl(item?.friendly_url)} class="search_result_img_blk">
                          <img src={item?.image_path} alt="search_result01" />
                        </a>
                        <div class="search_result_inr_cnt">
                          <h3><a href={generateDynamicUrl(item?.friendly_url)}>{dictioneryFunction(item?.header_text)}</a></h3>
                          <a href="#" onClick={handleHrefClick}>{generateDynamicUrl(item?.friendly_url)}</a>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: dictioneryFunction(item?.overview_text),
                            }}
                          />
                          {/* <p>Asia Gardens Hotel & Thai Spa is an exotic array of tropical gardens, divine swimming pools and Balinese style interiors, the perfect Asian getaway - this side of Asia</p> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="search_result_pagination">
                  <div className="search_result_pagination_inr">
                    <ul>
                      {/* <li onClick={() => backwordClick()}>
                        <a href="#" onClick={handleHrefClick}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-left"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                            />
                          </svg>
                        </a>
                      </li> */}
                      {Array.from({ length: metaData?.pageCount }, (_, index) => (
                        <li key={index} className={activeIndex === index ? 'active' : ''} onClick={() => onNumberClick(index)}>
                          <a href="#" onClick={handleHrefClick}>
                            {index + 1}
                          </a>
                        </li>

                      ))}
                      {/* <li onClick={() => forwardClick()}>
                        <a href="#" onClick={handleHrefClick} >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </a>
                      </li> */}
                    </ul>
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
          </>
        )}
    </Layout>
  );
}
