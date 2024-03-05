import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NavLink } from ".";
import { userService, destinationService } from "services";
import Select from "react-select";
import * as Yup from "yup";
import { Nav, Alert } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import i18n from "i18next";

import * as React from "react";

import { store, useGlobalState } from "state-pool";

export { Header };

function Header() {
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
      image: "/./../../images/uk-flag-round-circle-icon.svg",
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
      image: "/./../../images/thailand-flag-round-circle-icon.svg",
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

  const handleSearch = (data) => {
    router.push(`/search?search=${data?.searchText}`);
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
    const currentDomain = window.location.origin;
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
    router.push(newPath);
    // router?.replace('/uk/continent?destinationcode=africa&id=1');
  };

  const websiteContentCheck = (modifiedString) => {
    let currRegion = region ? region : "uk";
    destinationService
      .getDictionaryDetails(modifiedString, currRegion?.replace(/\//g, ""))
      .then((responseObj) => {
        if (responseObj) {
          const res = responseObj?.data;
          res.forEach((element, index) => {
            const replacement = element?.attributes?.content_translation_text;
            const matchString = element?.attributes?.content_word;
            const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
            if (checkStr && replacement) {
              SetTelePhoneNumber(replacement);
            }
          });

          // Set the modified string in state
          // setnewValueWithBr(modifiedString);
        }
      });
  };

  // const openPdfInNewTab = () => {
  //     // Construct the static URL of the PDF file
  //     const pdfUrl = '/pdf/bookingforms/ExsusTravelRestofWorldBookingForm.pdf';

  //     // Open the PDF in a new tab
  //     window.open(pdfUrl, '_blank');
  // };

  useEffect(() => {
    console.warn = () => { };

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

    if (
      pathname == "/uk" ||
      pathname == "/us" ||
      pathname == "/asia" ||
      pathname == "/in"
    ) {
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
    if (region.replace(/\//g, "") == "uk") {
      storedDataString = localStorage.getItem("websitecontent_uk");
      storedData = JSON.parse(storedDataString);
    } else if (region.replace(/\//g, "") == "us") {
      storedDataString = localStorage.getItem("websitecontent_us");
      storedData = JSON.parse(storedDataString);
    } else if (region.replace(/\//g, "") == "asia") {
      storedDataString = localStorage.getItem("websitecontent_asia");
      storedData = JSON.parse(storedDataString);
    } else if (region.replace(/\//g, "") == "in") {
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
              websiteContentCheck(matchString);
              throw new Error("Loop break");
            } else {
              replacement = storedData[matchString];
            }
            const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
            if (checkStr && replacement) {
              modifiedString = modifiedString.replace(checkStr, replacement);
              SetTelePhoneNumber(modifiedString);
            }
          });
          // Set the modified string in state
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
        const matchString = matches[0].replace(/{|}/g, "");
        websiteContentCheck(matchString);
      }
    }
  }, [ver, region]);

  const [value, setValue] = React.useState("fruit");
  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  // if (!user) return null;

  return (
    <header className="header_blk_row header">
      <div className="container">
        <div className="header_blk_inr">
          <section className="header_item_left ">
            <div className="mobile_trigger_btn d-block d-lg-none">
              <a
                className="btn-link"
                href="#"
                onClick={() => {
                  document.getElementById("sideMenuLeft").style.width = "100%";
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
  );
}
