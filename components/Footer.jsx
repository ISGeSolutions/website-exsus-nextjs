import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userService } from "../services";
import { NavLink } from "./NavLink";
import { Nav, alert } from "./Nav";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import plusSlides from "public/assets/javascripts/navigation.js";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import Link from "next/link";

export { Footer };

function Footer() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const currentUrl = router.asPath;
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
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);
  const openPdfInNewTab = () => {
    // Construct the static URL of the PDF file
    const pdfUrl = "/pdf/bookingforms/ExsusTravelRestofWorldBookingForm.pdf";

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };
  const [value, setValue] = React.useState("fruit");

  const handleChange = (event) => {
    setValue(event.target.value);

    // localStorage.setItem('site_region', event.target.value);
    // store.setState("site_region", event.target.value);

    window.site_region = event.target.value;
  };

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  // if (!user) return null;

  return (
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
            <img src="/images/AITO.png" alt="Aito logo" className="img-fluid" />{" "}
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
                    <NavLink href={region + "/contact-us"}>Contact us</NavLink>
                  </li>
                  <li>
                    <NavLink href={region + "/make-an-enquiry"}>
                      Online Enquiry
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href={region + "/about-us/useful-links"}>
                      Travel Information
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href={region + "/landing/coronavirus"}>
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
                    <NavLink href={region + "/special-offers"}>Offers</NavLink>
                  </li>
                  <li>
                    <NavLink href={region + "/blog"}>Blog</NavLink>
                  </li>
                  <li>
                    <NavLink href={region + "/where-to-go"}>When to go</NavLink>
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
                    <NavLink href={region + "/about-us/careers"}>
                      Careers at Exsus
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href={region + "/about-us/friend-referral-offer"}>
                      Exsus referral scheme
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="https://mailchi.mp/exsus.com/brochure-request-trade"
                      target="_blank"
                    >
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
                {/* <button className="btn btn-link" onClick={openPdfInNewTab}>Open PDF in New Tab</button> */}
                <a href={currentUrl} onClick={openPdfInNewTab}>
                  Booking terms & conditions
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="address_blk_row">
          Exsus Travel Limited t/a Exsus Travel. Registered in England and Wales
          at this address: 1 Burwood Place, London, W2 2UT. Company No. 3385363.
          VAT No. 719-221840.
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
            <strong>ABTA</strong>We are a member of ABTA (ABTA No. Y6561) which
            means you have the benefit of ABTA’s assistance and Code of Conduct.
            We provide full financial protection for your money.
          </p>
          <p>
            <strong>International Passenger Protection (IPP)</strong>All
            passengers booking with Exsus Travel Ltd are fully protected for the
            initial deposit and subsequently the balance of all monies received
            by us, including repatriation costs and arrangements, arising from
            cancellation or curtailment of your single service travel
            arrangements due to the insolvency of Exsus Travel Ltd.
            <span className="d-block pt-3"></span>
            Exsus Travel Ltd has taken out an insurance provided by
            International Passenger Protection Ltd (IPP) with Liberty Mutual
            Insurance Europe SE (LMIE) trading as Liberty Specialty Markets, a
            member of the Liberty Mutual Insurance Group. LMIE's registered
            office: 5-7 rue Leon Laval, L-3372, Leudelange, Grand Duchy of
            Luxembourg, Registered Number B232280 (Registre de Commerce et des
            Sociétés). LMIE is a European public limited liability company and
            is supervised by the Commissariat aux Assurances and licensed by the
            Luxembourg Minister of Finance as an insurance and reinsurance
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
  );
}
