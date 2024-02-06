import { useState, useEffect } from "react";
import { Signup, FriendlyUrl } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService } from "services";
import { NavLink } from "components";
import Head from "next/head";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { useRouter } from "next/router";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
  const router = useRouter();

    const handleRedirect = () => {
      router.push("contact-us/thankyou");
    };

  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <section className="contact_form_row">
          <div className="container">
            <h2>Get in touch</h2>
            <p className="contact_para">
              Ready to start planning your next trip? Or perhaps you have a more
              general question? Call us, email us or fill in our online form
              below.
            </p>

            <div className="contact_wrapper_blk">
              <div className="row pt-4">
                <div className="col-sm-6 col-lg-3">
                  <div className="contact_card_inr_blk">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                    <h3>Visit us</h3>
                    <ul>
                      <li>Unit 305, Mirror Works,</li>
                      <li>12 Marshgate Ln, London,</li>
                      <li>E15 2NH</li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="contact_card_inr_blk">
                    <span className="material-symbols-outlined">mail</span>
                    <h3>Mail</h3>
                    <ul>
                      <li>escape@exsus.com</li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="contact_card_inr_blk">
                    <span className="material-symbols-outlined">call</span>
                    <h3>Call us</h3>
                    <ul>
                      <li>UK : 020 7563 1310</li>
                      <li>USA (New York) : +1 516 518 8174</li>
                      <li>USA (Toll free number) : +1 833 735 0550</li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="contact_card_inr_blk">
                    <span className="material-symbols-outlined">schedule</span>
                    <h3>Opening Hours (GMT)</h3>
                    <ul>
                      <li>Monday - Thursday (09:00am - 05:30pm)</li>
                      <li>Friday (09:00am - 05:00pm)</li>
                      <li>Saturday (10:00am - 04:00pm)</li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 pt-4">
                  <form
                    className="needs-validation contact_form_blk"
                    novalidate
                  >
                    <h3>Write to us</h3>
                    <div className="row pt-3">
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="First name *"
                            placeholder="First name *"
                            required
                          />
                          <div className="invalid-tooltip">
                            Please enter first name.
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Last name *"
                            placeholder="Last name"
                            required
                          />
                          <div className="invalid-tooltip">
                            Please enter last name.
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="email"
                            className="form-control"
                            aria-label="Email *"
                            placeholder="Email *"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="number"
                            className="form-control"
                            aria-label="Telephone *"
                            placeholder="Telephone *"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form_textarea">
                          <textarea
                            className="form-control"
                            placeholder="Enter your message"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary prmry_btn"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          target="_blank"
                          onClick={() => handleRedirect()}
                        >
                          Send Message
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
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="full_loader_parnt_blk" style="display: none;">
            <div className="loader-circle-2"></div>
          </div> */}
        </section>

        <section className="make_enqury_row">
          <div className="container">
            <EnquiryButton />
          </div>
        </section>

        {/* NewsLetter */}
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
