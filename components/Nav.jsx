import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NavLink } from ".";
import { userService, destinationService, holidaytypesService } from "services";
import Head from "next/head";
import * as React from "react";
import { store, useGlobalState } from "state-pool";
export { Nav };

function Nav() {
  const [user, setUser] = useState(null);
  const [menu, setmenu] = useState(null);
  // const [regionWiseUrl, setMyVariable] = useState("");
  const [destinationLandingList, setDestinationLandingList] = useState();
  const [holidaytypesList, setHolidaytypesList] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndexHoliday, setActiveIndexHoliday] = useState(null);
  const [menuMain, setmmenuMain] = useState(null);
  const [goBack, setgoBack] = useState(null);
  const [menuTrigger, setmenuTrigger] = useState(null);
  const [closeMenu, setcloseMenu] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [pageInfo, setPageInfo] = useState();

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

  const discovermore = () => {
    router.push("/holiday-types/special-occasions");
  };

  const wildlifeholiday = () => {
    router.push(
      "/holiday-types/wildlife-holidays/wildlife-holidays-itineraries"
    );
  };

  const foodies = () => {
    router.push(
      "/holiday-types/wildlife-holidays/wildlife-holidays-itineraries"
    );
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    //setActiveIndex();
    //setActiveIndex(null);
  };

  const handleMouseEnterHoliday = (index) => {
    setActiveIndexHoliday(index);
  };

  const handleMouseLeaveHoliday = () => {
    // setActiveIndexHoliday(0);
    // setActiveIndexHoliday(null);
  };

  const hideOverlay = () => {
    setOverlayVisible(true);
  };

  const showOverlay = () => {
    setOverlayVisible(true);
  };

  const hideBackButton = () => {
    document.querySelector(".mobile-menu-head").classList.remove("active");
  };

  const generateDynamicLinkCountries = (countryName, destinationcode) => {
    const modifieddestinaitonName = destinationcode
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    const modifiedcountryName = countryName
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    if (countryName) {
      return (
        regionWiseUrl +
        `/destinations/${modifieddestinaitonName}/${modifiedcountryName}`
      );
    }
  };

  const redirectToAllLink = (id) => {
    const lowercasecountry = id?.replace(/ /g, "-").toLowerCase();
    router.push(
      `${regionWiseUrl}/destinations/${lowercasecountry}/${lowercasecountry}-countries`
    );
    setOverlayVisible(false);
  };

  const redirectToHolidayLink = (id) => {
    const lowercasecountry = id?.replace(/ /g, "-").toLowerCase();
    router.push(
      `${regionWiseUrl}/holiday-types/${lowercasecountry}/${lowercasecountry}-itineraries`
    );
    setOverlayVisible(false);
  };

  const handleClientReview = () => {
    router.push(regionWiseUrl + `/why-us/client-reviews`);
  };

  const makeAnEnquiry = () => {
    // router.push(`/make-an-enquiry`);
    let pageinfo = JSON.parse(localStorage.getItem("PageInfo"));
    router.push(
      `${regionWiseUrl}/make-an-enquiry?pType=${pageinfo?.pType}&pCode=${pageinfo?.pCode}`
    );
  };

  const router = useRouter();

  const ExpertsButton = () => {
    const router = useRouter();

    const handleClick = () => {
      router.push(regionWiseUrl + `/why-us/our-people`);
    };

    return (
      <button className="btn header_nav_btn" onClick={handleClick}>
        MEET OUR EXPERTS
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000"
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
    );
  };

  const dynamicLink = (itemName, id) => {
    const modifieditem = itemName
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    if (itemName) {
      return regionWiseUrl + `/destinations/${modifieditem}`;
    } else if (itemId && itemId == "AS") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "AU") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "CA") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "EU") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "IO") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else if (itemId && itemId == "IS") {
      return regionWiseUrl + `/continent?destinationcode=` + id;
    } else {
      return "#";
    }
  };

  const dynamicLinkas = (itemId, id) => {
    // if (itemId && itemId == 'AF') {
    //     return regionWiseUrl + `/destinations/africa/` + id;
    // }
    if (itemId) {
      return regionWiseUrl + `/continent/` + id;
    } else if (itemId && itemId == "AS") {
      return regionWiseUrl + `/continent/` + id;
    } else if (itemId && itemId == "AU") {
      return regionWiseUrl + `/continent/` + id;
    } else if (itemId && itemId == "CA") {
      return regionWiseUrl + `/continent/` + id;
    } else if (itemId && itemId == "EU") {
      return regionWiseUrl + `/continent/` + id;
    } else if (itemId && itemId == "IO") {
      return regionWiseUrl + `/continent/` + id;
    } else if (itemId && itemId == "IS") {
      return regionWiseUrl + `/continent/` + id;
    } else {
      return "#";
    }
  };

  const dynamicLinkCountry = (itemId, itemIdCountry, id) => {
    if (itemId) {
      return regionWiseUrl + `/country?countrycode=` + id;
    } else {
      return "#";
    }

    // if (itemId && itemId == 'AF') {
    //     if (itemIdCountry == 'TZ') {
    //         return regionWiseUrl + `/country?countrycode=tanzania`;
    //     } else if (itemIdCountry == 'ZA') {
    //         return regionWiseUrl + `/country?countrycode=south-africa`;
    //     }
    // } else if (itemId && itemId == 'AS') {
    //     if (itemIdCountry == 'ID') {
    //         return regionWiseUrl + `/country?countrycode=indonesia`;
    //     } else if (itemIdCountry == 'JP') {
    //         return regionWiseUrl + `/country?countrycode=japan`;
    //     }
    // } else if (itemId && itemId == 'AU') {
    //     if (itemIdCountry == 'AU') {
    //         return regionWiseUrl + `/country?countrycode=australia`;
    //     } else if (itemIdCountry == 'NZ') {
    //         return regionWiseUrl + `/country?countrycode=new-zealand`;
    //     }
    // } else if (itemId && itemId == 'IS') {
    //     if (itemIdCountry == 'BT') {
    //         return regionWiseUrl + `/country?countrycode=bhutan`;
    //     } else if (itemIdCountry == 'IN') {
    //         return regionWiseUrl + `/country?countrycode=india`;
    //     }
    // } else {
    //     return "#";
    // }
  };

  const dynamicLinkHoliday = (itemName, id) => {
    const modifieditem = itemName
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    if (itemName) {
      return (
        regionWiseUrl +
        `/holiday-types/${modifieditem}/${modifieditem}-itineraries`
      );
    }
  };

  const dynamicLinkCountryHoliday = (grpName, typeName, id) => {
    const modifiedGrpName = grpName
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();
    const modifiedtypeName = typeName
      ?.replace(/ /g, "-")
      ?.replace(/&/g, "and")
      .toLowerCase();

    if (grpName) {
      if (typeName) {
        return (
          regionWiseUrl +
          `/holiday-types/${modifiedGrpName}/${modifiedtypeName}`
        );
      }
    }
  };

  useEffect(() => {
    const menu = document.querySelector(".menu"); //Nav tag
    setmenu(menu);

    const menuMain = menu?.querySelector(".menu-main"); //ul tag
    setmmenuMain(menuMain);

    const goBack = menu?.querySelector(".go-back"); //mobile back
    setmenu(goBack);

    const menuTrigger = document.querySelector(".mobile-menu-trigger"); //header icon
    setmenu(menuTrigger);

    const closeMenu = menu?.querySelector(".mobile-menu-close"); // mobile close
    setmenu(closeMenu);

    setPageInfo(JSON.parse(localStorage.getItem("PageInfo")));

    window.onresize = function () {
      if (this.innerWidth > 991) {
        if (menu.classList.contains("active")) {
          toggleMenu();
        }
      }
    };

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

    document.querySelector(".menu-overlay").addEventListener("click", () => {
      toggleMenu();
    });

    let subMenu;
    menuMain?.addEventListener("click", (e) => {
      if (!menu.classList.contains("active")) {
        return;
      }

      if (e.target.closest(".menu-item-has-children")) {
        const hasChildren = e.target.closest(".menu-item-has-children");
        showSubMenu(hasChildren);
      }
    });

    goBack?.addEventListener("click", () => {
      hideSubMenu();
    });

    const script = document.createElement("script");

    script.src = "https://use.typekit.net/foobar.js";
    script.async = true;

    document.body.appendChild(script);

    destinationService.getDestinationLandingList().then((x) => {
      // const sortedData = x.data
      //   .sort(
      //     (a, b) => a.attributes.id - b.attributes.id
      //   );
      const sortedData = x.data.sort((a, b) => a.attributes.destination_name.localeCompare(b.attributes.destination_name));
      setDestinationLandingList(sortedData);
    });

    holidaytypesService.getHolidaytypesLandingList().then((x) => {
      const sortedData = x.data.sort(
        (a, b) => a.attributes.serial_number - b.attributes.serial_number
      );
      setHolidaytypesList(sortedData);
    });

    setActiveIndex(0);
    setActiveIndexHoliday(0);

    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // const [value, setValue] = React.useState('fruit');

  // const handleChange = (event) => {
  //     setValue(event.target.value);

  // localStorage.setItem('site_region', event.target.value);
  // store.setState("site_region", event.target.value);

  //     window.site_region = event.target.value;
  // };

  function logout() {
    userService.logout();
  }

  let subMenu;
  menuMain?.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) {
      return;
    }

    if (e.target.closest(".menu-item-has-children")) {
      const hasChildren = e.target.closest(".menu-item-has-children");
      showSubMenu(hasChildren);
    }
  });
  goBack?.addEventListener("click", () => {
    hideSubMenu();
  });
  menuTrigger?.addEventListener("click", () => {
    toggleMenu();
  });
  closeMenu?.addEventListener("click", () => {
    toggleMenu();
  });

  function toggleMenu() {
    const menu = document.querySelector(".menu");
    if (menu) {
      menu.classList.toggle("active");
      document.querySelector(".menu-overlay").classList.toggle("active");
    } else {
      console.error("Menu element not found");
    }
  }

  function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu?.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    const menuTitle =
      hasChildren.querySelector("svg").parentNode.childNodes[0].textContent;
    document.querySelector(".mobile-menu-head").classList.add("active");
    document.querySelector(".current-menu-title").innerHTML = menuTitle;
  }

  function hideSubMenu() {
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
      subMenu.classList.remove("active");
    }, 300);
    document.querySelector(".current-menu-title").innerHTML = "";
    document.querySelector(".mobile-menu-head").classList.remove("active");
  }

  // only show nav when logged in
  // if (!user) return null;

  // only show nav when logged in
  // if (!user) return null;

  return (
    <>
      <nav>
        <Head>
          {/* <script
            type="text/javascript"
            src="/assets/javascripts/navigation.js"
          ></script> */}
        </Head>
        <div className="menu-overlay"></div>

        <div className="menu menu_new overlay">
          <div className="mobile-menu-head">
            <div className="go-back">
              <svg
                onClick={hideBackButton}
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 267 512.43"
              >
                <path
                  fillRule="nonzero"
                  d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z"
                />
              </svg>
            </div>
            <div className="current-menu-title"></div>
            <button
              className="btn fa-solid fa-xmark mobile-menu-close"
              onClick={() => {
                const menuNav = document.querySelector(".menu"); //Nav tag
                menuNav.classList.toggle("active");
                document
                  .querySelector(".menu-overlay")
                  .classList.toggle("active");
              }}
            ></button>
          </div>

          <ul className="menu-main overlay">
            <li className="menu-item-has-children">
              <NavLink
                onMouseEnter={showOverlay}
                onClick={hideOverlay}
                href={regionWiseUrl + "/destinations"}
                className="nav-item nav-link"
              >
                Destinations
                <svg
                  //onClick={() => showBackButton("Destinations")}
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
              </NavLink>
              {/* <NavLink href="javascript:void(0)">Destinations
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                    </NavLink> */}
              {overlayVisible && (
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="header_country_list">
                            <ul>
                              {destinationLandingList?.map(
                                (destinationItem, i) => (
                                  <li
                                    key={i}
                                    className={`header_country_label ${activeIndex === i
                                      ? "active responsive_drpdwn_cls"
                                      : ""
                                      }`}
                                    onMouseEnter={() => handleMouseEnter(i)}
                                    onMouseLeave={handleMouseLeave}
                                  >
                                    <NavLink
                                      onMouseEnter={showOverlay}
                                      onClick={hideOverlay}
                                      href={dynamicLink(
                                        destinationItem?.attributes
                                          ?.friendly_url,
                                        destinationItem?.id
                                      )}
                                      as={dynamicLinkas(
                                        destinationItem?.attributes
                                          ?.destination_code,
                                        destinationItem?.id
                                      )}
                                    >
                                      {
                                        destinationItem?.attributes
                                          ?.destination_name
                                      }
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
                                    </NavLink>
                                    <div className="header_country_list_inr">
                                      <ul>
                                        {destinationItem?.attributes?.countries?.data.map(
                                          (destinationCountry, i) =>
                                            i <= 7 ? (
                                              <li key={i}>
                                                <NavLink
                                                  onMouseEnter={showOverlay}
                                                  onClick={hideOverlay}
                                                  href={generateDynamicLinkCountries(
                                                    destinationCountry
                                                      ?.attributes
                                                      ?.country_name,
                                                    destinationItem?.attributes
                                                      ?.destination_name
                                                  )}
                                                >
                                                  {
                                                    destinationCountry
                                                      ?.attributes?.country_name
                                                  }
                                                </NavLink>
                                              </li>
                                            ) : (
                                              ""
                                            )
                                        )}
                                      </ul>
                                      <button
                                        className="btn header_nav_btn"
                                        onClick={() =>
                                          redirectToAllLink(
                                            destinationItem?.attributes
                                              ?.destination_name
                                          )
                                        }
                                      >
                                        See all{" "}
                                        {
                                          destinationItem?.attributes
                                            ?.destination_name
                                        }
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#000"
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
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="header_nav_cnt">
                            <h4>Socially-Distanced holidays</h4>
                            <p>
                              Get away from it all, in Exsus style. We're
                              championing the art of socially-distanced luxury
                              holidays, from private islands and exceptional
                              villas to awesome adventures and unique glamping
                              experiences. Escape, explore and relax in
                              beautiful destinations all over the world. Get
                              away from the crowds and enjoy a memorable
                              off-the-beaten-track holiday like no other.
                            </p>
                            <button
                              className="btn header_nav_btn"
                              onClick={discovermore}
                            >
                              Discover more
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000"
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
                        <div className="col-md-6">
                          <div className="header_nav_cnt">
                            <h4>Special occasions</h4>
                            <p>
                              Discover some of our favourite ways to celebrate a
                              special occasion, whether that's an anniversary, a
                              birthday, a proposal, or just because... From
                              proposing in a secluded spot by Iguazu Falls to
                              enjoying exclusive use of your very own private
                              island in the Maldives, get some inspiration for
                              your own celebration and give yourself something
                              to look forward to!
                            </p>
                            <button
                              className="btn header_nav_btn"
                              onClick={discovermore}
                            >
                              Discover more
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000"
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
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="menu-item-has-children">
              <NavLink
                onMouseEnter={showOverlay}
                onClick={hideOverlay}
                href={regionWiseUrl + "/holiday-types"}
              >
                Holiday types
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
              </NavLink>
              {overlayVisible && (
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="header_country_list">
                            <ul>
                              {holidaytypesList?.map((holidaystypesItem, i) => (
                                <li
                                  key={holidaystypesItem?.id}
                                  className={`header_country_label ${activeIndexHoliday === i
                                    ? "active responsive_drpdwn_cls"
                                    : ""
                                    }`}
                                  onMouseEnter={() =>
                                    handleMouseEnterHoliday(i)
                                  }
                                  onMouseLeave={handleMouseLeaveHoliday}
                                >
                                  <NavLink
                                    onMouseEnter={showOverlay}
                                    onClick={hideOverlay}
                                    href={dynamicLinkHoliday(
                                      holidaystypesItem?.attributes
                                        ?.friendly_url,
                                      holidaystypesItem?.id
                                    )}
                                  >
                                    {
                                      holidaystypesItem?.attributes
                                        ?.holiday_type_group_name
                                    }
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
                                  </NavLink>
                                  <div className="header_country_list_inr">
                                    <ul>
                                      {holidaystypesItem?.attributes?.holiday_types?.data.map(
                                        (holidaytypesCountry, i) =>
                                          i <= 7 ? (
                                            <li key={holidaytypesCountry?.id}>
                                              <NavLink
                                                onMouseEnter={showOverlay}
                                                onClick={hideOverlay}
                                                href={dynamicLinkCountryHoliday(
                                                  holidaystypesItem?.attributes
                                                    ?.friendly_url,
                                                  holidaytypesCountry
                                                    ?.attributes
                                                    ?.holiday_type_name,
                                                  holidaytypesCountry?.id
                                                )}
                                              >
                                                {
                                                  holidaytypesCountry
                                                    ?.attributes
                                                    ?.holiday_type_name
                                                }
                                              </NavLink>
                                            </li>
                                          ) : (
                                            ""
                                          )
                                      )}
                                    </ul>
                                    <button
                                      className="btn header_nav_btn"
                                      onClick={() =>
                                        redirectToHolidayLink(
                                          holidaystypesItem?.attributes
                                            ?.friendly_url
                                        )
                                      }
                                    >
                                      See all{" "}
                                      {
                                        holidaystypesItem?.attributes
                                          ?.holiday_type_group_name
                                      }
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#000"
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
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="header_nav_cnt">
                            <h4>FOODIE HOLIDAYS</h4>
                            <p>
                              A big part of any luxury holiday is enjoying the
                              local food and drink. Make the most of it with a
                              foodie-focused holiday, whether that's sampling
                              the gourmet delights of Italy or tasting
                              world-renowned wines in sun-dappled vineyards in
                              stunning worldwide locations.
                            </p>
                            <button
                              className="btn header_nav_btn"
                              onClick={foodies}
                            >
                              Discover more
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000"
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
                        <div className="col-md-6">
                          <div className="header_nav_cnt">
                            <h4>WILDLIFE HOLIDAYS</h4>
                            <p>
                              Come face to face with the world's most iconic
                              animals on an epic luxury wildlife holiday. Go on
                              safari with the Big Five in South Africa, explore
                              the wildlife-rich Galapagos, meet orangutans in
                              Borneo, and see polar bears in Canada or penguins
                              in Antarctica. The options are endless...
                            </p>
                            <button
                              className="btn header_nav_btn"
                              onClick={wildlifeholiday}
                            >
                              Discover more
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000"
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
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="menu-item-has-children">
              <NavLink
                // onMouseEnter={showOverlay}
                //onClick={hideOverlay}
                href={regionWiseUrl + "/special-offers"}
              >
                Special offers
              </NavLink>
            </li>
            <li className="menu-item-has-children">
              <NavLink
                //onMouseEnter={showOverlay}
                // onClick={hideOverlay}
                href={regionWiseUrl + "/blog"}
              >
                Blog
              </NavLink>
            </li>
            <li className="menu-item-has-children">
              <NavLink
                onMouseEnter={showOverlay}
                onClick={hideOverlay}
                href={regionWiseUrl + "/why-us"}
              >
                Why us
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
              </NavLink>
              {overlayVisible && (
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="header_country_list">
                            <ul>
                              <li className="header_country_label active">
                                <NavLink
                                  onMouseEnter={showOverlay}
                                  onClick={hideOverlay}
                                  href={regionWiseUrl + "/about-us"}
                                >
                                  About us
                                </NavLink>
                              </li>
                              <li className="header_country_label">
                                <NavLink
                                  onMouseEnter={showOverlay}
                                  onClick={hideOverlay}
                                  href="https://mailchi.mp/exsus.com/brochure-request"
                                >
                                  Request a brochure
                                </NavLink>
                              </li>
                              <li className="header_country_label">
                                <NavLink
                                  onMouseEnter={showOverlay}
                                  onClick={hideOverlay}
                                  href={
                                    regionWiseUrl +
                                    "/about-us/creating-your-trip"
                                  }
                                >
                                  Creating your trip
                                </NavLink>
                              </li>
                              <li className="header_country_label">
                                <NavLink
                                  onMouseEnter={showOverlay}
                                  onClick={hideOverlay}
                                  // href={region + "/why-us/our-people"}
                                  href={regionWiseUrl + "/why-us/our-people"}
                                >
                                  Meet the Exsus Team
                                </NavLink>
                              </li>
                              <li className="header_country_label">
                                <NavLink
                                  onMouseEnter={showOverlay}
                                  onClick={hideOverlay}
                                  href={
                                    regionWiseUrl + "/why-us/client-reviews"
                                  }
                                >
                                  Client reviews
                                </NavLink>
                              </li>
                              <li className="header_country_label">
                                <NavLink
                                  onMouseEnter={showOverlay}
                                  onClick={hideOverlay}
                                  href={
                                    regionWiseUrl + "/about-us/about-gift-list"
                                  }
                                >
                                  Honeymoon Gift List
                                </NavLink>
                              </li>
                              <li className="header_country_label">
                                <NavLink
                                  onMouseEnter={showOverlay}
                                  onClick={hideOverlay}
                                  href="/contact-us"
                                >
                                  Contact Us
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="header_nav_cnt">
                            <h4>MEET OUR EXPERTS</h4>
                            <p>
                              Our passionate and knowledgeable team of
                              well-travelled experts can tailor-make your
                              perfect luxury holiday, honeymoon or family
                              adventure to over 90 destinations all over the
                              world, from Italy to India.
                            </p>
                            <ExpertsButton />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="header_nav_cnt">
                            <h4>What clients say about us</h4>
                            <p>
                              From honeymooners to families, find out what our
                              recent travellers have to say about their holidays
                              with Exsus and how our experts have ensured their
                              experience goes above and beyond, from start to
                              finish.
                            </p>
                            <button
                              className="btn header_nav_btn"
                              onClick={handleClientReview}
                            >
                              Read Our Reviews
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000"
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
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="menu-item-has-children">
              <NavLink
                onMouseEnter={showOverlay}
                onClick={hideOverlay}
                href="https://mailchi.mp/exsus.com/brochure-request"
              >
                Brochure
              </NavLink>
            </li>
          </ul>

          <button
            className="btn prmry_btn make_enqury_btn"
            onClick={makeAnEnquiry}
          >
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
      </nav>
    </>
  );
}
