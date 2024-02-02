import { useState, useEffect } from "react";
import { Signup, FriendlyUrl } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService } from "services";
import { NavLink } from "components";
import Head from "next/head";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from "next/router";

export default Index;

function Index() {
  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <section className="trvl_info_row">
          <div className="container">
            <div className="bookmark_row">
              <ul>
                <li>
                  <a href="homepage.html">Home</a>
                </li>
                <li>Gift List</li>
              </ul>
            </div>

            <div className="trvl_info_cntnt">
              <h2 className="trvl_title">HONEYMOON GIFT LIST</h2>
              <div className="gift_list_parnt">
                <h2 className="text-capitalize">Guest</h2>
                <p className="mb-4">
                  Please log in using your reference number (you do not need a
                  password)
                </p>
              </div>
              <div className="gift_list_parnt">
                <h2 className="text-capitalize">Travellers</h2>
                <p className="mb-4">
                  Please log in using your reference number and password.
                </p>
              </div>
            </div>
            <div className="contact_form_row">
              <form>
                <div className="row">
                  <div className="col-sm-6 col-md-5">
                    <div className="form-input">
                      <input
                        type="number"
                        className="form-control"
                        aria-label="Reference number"
                        placeholder="Reference number"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-5">
                    <div className="form-input">
                      <input
                        type="password"
                        className="form-control"
                        aria-label="Password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button className="btn prmry_btn mx-auto mb-5">
                      Login
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        imageRendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
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
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
