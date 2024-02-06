import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userService, destinationService } from "services";
import { NavLink } from "./../NavLink";
import { Nav, Alert } from "components";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import Select from "react-select";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import plusSlides from "public/assets/javascripts/navigation.js";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import Link from "next/link";

export { Layout };

function Layout({ children }) {
  const router = useRouter();
  const currentUrl = router.asPath;
  // const regionWiseUrl = '/uk';
  const [regionWiseUrll, setMyVariable] = useState("uk");
  const [selectedRegion, setVariable] = useState("");
  const { ver } = router.query;
  const [telePhoneNumber, SetTelePhoneNumber] = useState();

  // form validation rules
  const validationSchema = Yup.object().shape({
    searchText: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const countries = [
    {
      value: "uk",
      label: "UK SITE",
      image: "./../../images/uk-flag-round-circle-icon.svg",
      country_name: "UK",
    },
    {
      value: "us",
      label: "US SITE",
      image: "/../../images/usa-flag-round-circle-icon.svg",
      country_name: "US",
    },
    {
      value: "asia",
      label: "ASIA SITE",
      image: "./../../images/thailand-flag-round-circle-icon.svg",
      country_name: "ASIA",
    },
    {
      value: "in",
      label: "INDIA SITE",
      image: "/../../images/india-flag-round-circle-icon.svg",
      country_name: "INDIA",
    },
  ];
  const [selected, setSelected] = useState();
  // const { i18n } = useTranslation();

  const isObjectEmpty = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  let region = "";

  //let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window.site_region !== "uk") {
        regionWiseUrl = "/" + window.site_region;
        region = window.site_region;
      }
    }
  }

  const handleSearch = () => {
    router.push("/search");
  };

  // Function to check if any string in the array is present in the sentence
  const isAnyStringInSentence = (strings, sentence) => {
    for (let i = 0; i < strings.length; i++) {
      if (sentence.includes(strings[i] + "/")) {
        return true; // Return true if any string is found
      }
    }
    return false; // Return false if none of the strings are found
  };

  const handleChange = (selectedOption) => {
    // Do something
    setMyVariable(selectedOption.value);
    setSelected(selectedOption);
    i18n.changeLanguage(selectedOption.value);

    localStorage.setItem("site_region", selectedOption.value);
    window.site_region = selectedOption.value;
    const pathRouter = router.asPath;
    let myArray = [];

    //
    const regionArr = ["uk", "us", "asia", "in"];
    if (
      router.asPath === "/" ||
      router.asPath === "/uk" ||
      router.asPath === "/us" ||
      router.asPath === "/asia" ||
      router.asPath === "/in"
    ) {
      //  ("At least one string is found in the sentence.");
      myArray = pathRouter.split("/");
    } else if (isAnyStringInSentence(regionArr, router.asPath)) {
      //  ("At least one string is found in the sentence.");
      myArray = pathRouter.split("/");
    } else {
      //  ("None of the strings are found in the sentence.");
      myArray[0] = "";
      myArray[1] = "uk";
      myArray = myArray.concat(pathRouter.split("/").slice(1));
    }

    let newPath = "";
    myArray.forEach((element, index) => {
      if (index == 0) {
        newPath = element;
      } else if (index == 1) {
        if (myArray.length > 2) {
          if (element) {
            if (selectedOption.value == "uk") {
              if (!regionArr.includes(element)) {
                newPath = newPath + "/" + element;
              }
            } else if (regionArr.includes(element)) {
              newPath = newPath + "/" + selectedOption.value;
            } else {
              newPath = newPath + "/" + selectedOption.value + "/" + element;
            }
          }
        }
      } else if (index > 1) {
        newPath = newPath + "/" + element;
      }
    });
    // myArray.forEach((element, index) => {
    //   if (index === 0) {
    //     if (selectedOption.value != "uk") {
    //       newPath = "/" + selectedOption.value;
    //     }
    //   } else {
    //     newPath = newPath + "/" + element;
    //   }
    // });
    router.push(newPath);
    // router?.replace('/uk/continent?destinationcode=africa&id=1');
  };

  const handleChange1 = (selectedOption) => {
    this.plusSlides.openLeftNav();
  };

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
          // setnewValueWithBr(modifiedString);
        }
      });
  };

  useEffect(() => {
    // Temporarily disable warnings in the development environment
    console.warn = () => {};

    $(".header_country_list > ul .header_country_label").on(
      "mouseenter",
      function (event) {
        $(".header_country_list > ul .header_country_label").removeClass(
          "active"
        );
        $(this).addClass("active");
      }
    );

    $(".header_country_label").click(function () {
      $(".header_country_label").removeClass("responsive_drpdwn_cls");
      $(this).addClass("responsive_drpdwn_cls");
    });
    // setSelected(countries[0]);
    if (ver) {
      const foundPerson = countries.find((person) => person.value === ver);

      const foundPersonBoolean = isObjectEmpty(foundPerson);

      if (!foundPersonBoolean) {
        // handleChange(foundPerson);
        // setSelected(foundPerson);
        // setMyVariable(foundPerson.value);
        // localStorage.setItem("site_region", foundPerson.value);
        // window.site_region = foundPerson.value;
      }
    }

    const { pathname, search, hash, href } = window.location;
    const site_region_local = localStorage.getItem("site_region");

    if(pathname == '/uk' || pathname == '/us' || pathname == '/asia' || pathname == '/in') {
      region = pathname;
      countries.forEach((element) => {
        if (element.value == pathname.slice(1)) {
          handleChange(element);
          setSelected(element);
          setMyVariable(element.value);
          localStorage.setItem("site_region", element.value);
          window.site_region = element.value;
        }
      });
    } else {
      if (site_region_local !== null && site_region_local !== undefined) {
        // The variable is set in local storage and is not undefined
        window.region = site_region_local;
        region = site_region_local;
        countries.forEach((element) => {
          if (element.value == site_region_local) {
            handleChange(element);
            setSelected(element);
            setMyVariable(element.value);
            localStorage.setItem("site_region", element.value);
            window.site_region = element.value;
          }
        });
      } else {
        // The variable is not set in local storage or is undefined
        if (typeof window !== "undefined") {
          if (window && window.site_region) {
            if (window.site_region !== "uk") {
              region = window.site_region;
              countries.forEach((element) => {
                if (element.value == window.site_region) {
                  handleChange(element);
                  setSelected(element);
                  setMyVariable(element.value);
                  localStorage.setItem("site_region", element.value);
                  window.site_region = element.value;
                }
              });
            }
          }
        }
      }
    }

    i18n.changeLanguage(region);

    let modifiedString = "${TelephoneNumber}";

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
              websiteContentCheck(matches, modifiedString);
              throw new Error("Loop break");
            } else {
              replacement = storedData[matchString];
            }
            const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
            if (checkStr && replacement) {
              modifiedString = modifiedString.replace(checkStr, replacement);
            }
          });
          // Set the modified string in state
          SetTelePhoneNumber(modifiedString);
        } catch (error) {
          if (error.message === "Loop break") {
            // Handle the loop break here
            //  ("Loop has been stopped.");
          } else if (error.message === "Region not found") {
            // Handle the loop break here
            //  ("Loop has been stopped.");
            SetTelePhoneNumber(modifiedString);
          }
        }
      }
    } else {
      if (matches) {
        websiteContentCheck(matches, region, modifiedString);
      }
    }
  }, [ver, region]);

  return (
    <div>
      <header className="header_blk_row header">
        <Head>
          {/* <script type="text/javascript" src="/assets/javascripts/navigation.js"></script> */}
        </Head>
        <div className="container">
          <div className="header_blk_inr">
            <section className="header_item_left ">
              <div className="mobile_trigger_btn d-block d-lg-none">
                <a
                  className="btn-link"
                  href="#"
                  onClick={() => {
                    document.getElementById("sideMenuLeft").style.width =
                      "100%";
                  }}
                >
                  <em className="fa-solid fa-ellipsis"></em>
                </a>
              </div>
              <div className="side_menu_left" id="sideMenuLeft">
                <div className="side_menu_hdr">
                  <button
                    className="btn fa-solid fa-xmark"
                    onClick={() => {
                      document.getElementById("sideMenuLeft").style.width = "0";
                    }}
                  ></button>
                </div>
                <div className="dropdown header_drpdown">
                  {/* <Select id="long-value-select" 
                                        instanceId="long-value-select"
                                        options={countries}
                                        value={selected}
                                        onChange={handleChange} autoFocus={true}
                                        formatOptionLabel={country => (
                                            <div className="country-option">
                                                <img src={country.image} alt="country-image" />
                                                <span>{country.label}</span>
                                            </div>
                                        )}
                                    /> */}

                  <Select
                    id="long-value-select"
                    className="react-select-container"
                    style={{ boxShadow: `none !important` }}
                    classNamePrefix="react-select"
                    instanceId="long-value-select"
                    options={countries}
                    value={selected}
                    defaultValue={countries[0]}
                    onChange={handleChange}
                    autoFocus={false}
                    formatOptionLabel={(country) => (
                      <div className="country-option">
                        <img src={country.image} alt="country-image" />
                        <span>{country.label}</span>
                      </div>
                    )}
                  />

                  {/* <select className="btn btn-secondary dropdown-toggle" onChange={e => handleRegion(e.target.value)}>
                                        <option className="dropdown-item" value="uk">UK</option>
                                        <option className="dropdown-item" value="us">US</option>
                                        <option className="dropdown-item" value="asia">Asia</option>
                                        <option className="dropdown-item" value="in">India</option>
                                    </select> */}
                  {/* <select id="id_select2_example" onChange={e => handleRegion(e.target.value)}>
                                        <option data-img_src="images/uk-flag-round-circle-icon.svg">UK site</option>
                                        <option data-img_src="images/usa-flag-round-circle-icon.svg">US site</option>
                                        <option data-img_src="images/thailand-flag-round-circle-icon.svg">Asia site</option>
                                        <option data-img_src="images/india-flag-round-circle-icon.svg">India site</option>
                                    </select> */}
                  {/* <NavLink className="btn btn-secondary dropdown-toggle" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="main-role-image" src="./../../images/uk-flag-round-circle-icon.svg" alt="united-kingdom-flag-icon" /><span className=' main-role'>
                                            UK site
                                        </span>
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink className="dropdown-item" value="uk-uk-flag-round-circle-icon.svg" href="javascript:void(0)">
                                                <img src="./../../images/uk-flag-round-circle-icon.svg" alt="usa-flag-round-circle-icon" />
                                                UK site
                                            </NavLink></li>
                                        <li>
                                            <NavLink className="dropdown-item" value="us-usa-flag-round-circle-icon.svg" href="javascript:void(0)">
                                                <img src="./../../images/usa-flag-round-circle-icon.svg" alt="usa-flag-round-circle-icon" />
                                                US site
                                            </NavLink></li>
                                        <li><NavLink className="dropdown-item" value="asia" href="javascript:void(0)"><img src="./../.././../../images/thailand-flag-round-circle-icon.svg" alt="thailand-flag-round-circle-icon" />Asia site</NavLink></li>
                                        <li><NavLink className="dropdown-item" value="in" href="javascript:void(0)"><img src="./../../images/india-flag-round-circle-icon.svg" alt="india-flag-round-circle-icon" />India site</NavLink></li>
                                    </ul> */}
                </div>
                <form onSubmit={handleSubmit(handleSearch)}>
                  <div className="input-group srch_site_box">
                    <input
                      name="searchText"
                      type="text"
                      className="form-control"
                      placeholder="Search site"
                      aria-label="Search site"
                      aria-describedby="button-addon2"
                      {...register("searchText")}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="submit"
                      id="button-addon2"
                    >
                      <span className="material-symbols-outlined">search</span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
            <section className="header_item_center">
              <h1>
                <NavLink href="/">
                  Exsus<span>Travel</span>
                </NavLink>
              </h1>
            </section>
            <section className="header_item_right d-flex d-lg-inline-block justify-content-end align-items-center">
              <div className="header_call_icn">
                <NavLink href="/make-an-enquiry" className="header_mail_icn">
                  <em
                    className="material-symbols-outlined"
                    title="Make an enquiry"
                  >
                    mail
                  </em>
                  <label className="d-none d-lg-block"></label>
                </NavLink>
                <NavLink href="tel:020 7337 9010">
                  <em className="material-symbols-outlined">call</em>
                  <span
                    className="d-none d-lg-block"
                    dangerouslySetInnerHTML={{ __html: telePhoneNumber }}
                  ></span>
                </NavLink>
              </div>
              <div className="mobile_trigger_btn mobile-menu-trigger d-block d-lg-none">
                <a
                  href="#"
                  onClick={() => {
                    const menuLayout = document.querySelector(".menu"); //Nav tag
                    menuLayout.classList.toggle("active");
                    document
                      .querySelector(".menu-overlay")
                      .classList.toggle("active");
                  }}
                >
                  <em className="fa-solid fa-bars"></em>
                </a>
              </div>
            </section>
          </div>
          <Nav />
          <Alert />
        </div>
      </header>
      <main id="root">{children}</main>
      <Analytics />
      <footer>
        <div className="container">
          <section className="footer_img_row d-block d-sm-flex">
            <div className="atol_logo_blk">
              <NavLink
                href="https://www.abta.com/abta-member-search"
                target="_blank"
              >
                <img
                  src="/images/abta_new_logo.png"
                  alt="Abta logo"
                  className="img-fluid"
                />{" "}
              </NavLink>
              {/* <img
                src="/images/abta_new_logo.png"
                alt="Abta logo"
                className="img-fluid"
                href="https://www.abta.com/abta-member-search"
              /> */}
              <img
                src="/images/atol-new-logo.png"
                alt="Atol logo"
                className="img-fluid"
              />{" "}
              <img
                src="/images/AITO.png"
                alt="Aito logo"
                className="img-fluid"
              />{" "}
              <img
                src="/images/iata-accredagent.png"
                alt="Iata logo"
                className="img-fluid"
              />
            </div>
            <div className="social_icons_blk">
              <ul>
                <li>
                  <NavLink
                    target="_blank"
                    href="https://www.facebook.com/ExsusTravel"
                  >
                    <em className="fa-brands fa-facebook-f"></em>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    target="_blank"
                    href="https://twitter.com/Exsustravel/"
                  >
                    <em className="fa-brands fa-twitter"></em>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    target="_blank"
                    href="https://www.instagram.com/exsustravel/"
                  >
                    <em className="fa-brands fa-instagram"></em>{" "}
                  </NavLink>
                </li>
              </ul>
            </div>
          </section>

          <section className="quick_links_row">
            <div className="row">
              <div className="col-sm-6 col-md-3 col-lg-3">
                <div className="quick_links_parnt" aria-label="Services">
                  <h6>Services</h6>
                  <ul>
                    <li>
                      <NavLink href="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink href={region + "/contact-us"}>
                        Contact us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={region + "/make-an-enquiry"}>
                        Online Enquiry
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/travel_information">
                        Travel Information
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/coronavirus_information">
                        Coronavirus Information
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-md-3 col-lg-3">
                <div className="quick_links_parnt" aria-label="More Exsus">
                  <h6>More Exsus</h6>
                  <ul>
                    <li>
                      <NavLink href={region + "/destinations"}>
                        Destinations
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={region + "/holiday-types"}>
                        Holiday Types
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={region + "/special-offers"}>
                        Offers
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={region + "/blog"}>Blog</NavLink>
                    </li>
                    <li>
                      <NavLink href={region + "/where-to-go"}>
                        When to go
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-md-3 col-lg-3">
                <div className="quick_links_parnt" aria-label="Exsus Sites">
                  <h6>Exsus Sites</h6>
                  <ul>
                    <li>
                      <NavLink href="#" target="_blank">
                        UK
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/asia" target="_blank">
                        Asia
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/in" target="_blank">
                        India
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/us" target="_blank">
                        USA
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-md-3 col-lg-3">
                <div className="quick_links_parnt" aria-label="About Exsus">
                  <h6>About Exsus</h6>
                  <ul>
                    <li>
                      <NavLink href={region + "/about-us"}>About us</NavLink>
                    </li>
                    <li>
                      <NavLink href={region + "/why-us/our-people"}>
                        Meet our travel experts
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={"/about-us/careers"}>
                        Careers at Exsus
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href={region + "/about-us/friend-referral-offer"}
                      >
                        Exsus referral scheme
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/travel-agent-brochures">
                        Travel agent brochures
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="copyright_info_row d-block d-lg-flex">
            <p className="copyright_text">
              &copy; 2022 Exsus Travel. Experts in luxury tailor-made holidays.
            </p>
            <div className="prvcy_polcy_list">
              <ul>
                <li>
                  <NavLink href={region + "/privacy-policy"}>
                    Privacy policy & cookies
                  </NavLink>
                </li>
                <li>
                  <NavLink href={region + "/terms-and-conditions"}>
                    Website terms of use
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="https://www.exsus.com/pdf/bookingforms/ExsusTravelUKBookingForm.pdf"
                    target="_blank"
                  >
                    Booking terms & conditions
                  </NavLink>
                </li>
              </ul>
            </div>
          </section>

          <section className="address_blk_row">
            Exsus Travel Limited t/a Exsus Travel. Registered in England and
            Wales at this address: 1 Burwood Place, London, W2 2UT. Company No.
            3385363. VAT No. 719-221840.
          </section>

          <section className="book_with_confidnce_row">
            <h6>Book with confidence</h6>
            <p>
              <strong>ATOL</strong>All the flights and flight-inclusive holidays
              on this website are financially protected by the ATOL scheme. When
              you pay you will be supplied with an ATOL Certificate. Please ask
              for it and check to ensure that everything you booked (flights,
              hotels and other services) is listed on it. Please see our booking
              conditions for further information or for more information about
              financial protection and the ATOL Certificate go to:{" "}
              <NavLink href="http://www.caa.co.uk" target="_blank">
                www.caa.co.uk
              </NavLink>
            </p>
            <p>
              <strong>ABTA</strong>We are a member of ABTA (ABTA No. Y6561)
              which means you have the benefit of ABTA’s assistance and Code of
              Conduct. We provide full financial protection for your money.
            </p>
            <p>
              <strong>International Passenger Protection (IPP)</strong>All
              passengers booking with Exsus Travel Ltd are fully protected for
              the initial deposit and subsequently the balance of all monies
              received by us, including repatriation costs and arrangements,
              arising from cancellation or curtailment of your single service
              travel arrangements due to the insolvency of Exsus Travel Ltd.
              <span className="d-block pt-3"></span>
              Exsus Travel Ltd has taken out an insurance provided by
              International Passenger Protection Ltd (IPP) with Liberty Mutual
              Insurance Europe SE (LMIE) trading as Liberty Specialty Markets, a
              member of the Liberty Mutual Insurance Group. LMIE's registered
              office: 5-7 rue Leon Laval, L-3372, Leudelange, Grand Duchy of
              Luxembourg, Registered Number B232280 (Registre de Commerce et des
              Sociétés). LMIE is a European public limited liability company and
              is supervised by the Commissariat aux Assurances and licensed by
              the Luxembourg Minister of Finance as an insurance and reinsurance
              company. This insurance is only valid for passengers who book and
              pay directly with/to Exsus Travel Ltd.
              <span className="d-block pt-3"></span>
              In the event of our insolvency please make contact as soon as
              practically possible giving full details of what has happened
              quoting the name of your Travel Operator:
              <span className="d-block pt-3"></span>
              IPP Claims at Sedgwick
              <span className="d-block"></span>
              Telephone: +44 (0)345 266 1872
              <span className="d-block"></span>
              Email:{" "}
              <NavLink href="mailto:Insolvency-claims@ipplondon.co.uk">
                Insolvency-claims@ipplondon.co.uk
              </NavLink>{" "}
              or online at{" "}
              <NavLink href="http://www.ipplondon.co.uk/claims.as">
                http://www.ipplondon.co.uk/claims.asp
              </NavLink>
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
}
