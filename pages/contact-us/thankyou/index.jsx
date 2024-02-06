import { useState, useEffect } from "react";
import { Signup, FriendlyUrl } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService } from "services";
import { NavLink } from "components";
import Head from "next/head";
import { EnquiryButton } from "../../../components/common/EnquiryBtn";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from "next/router";

export default Index;

function Index() {
  useEffect(() => {}, []);

  return (
    <Layout>
      <section class="trvl_info_row">
        <div class="container">
          <div class="bookmark_row">
            <ul>
              <li>
                <a href="homepage.html">Home</a>
              </li>
              <li>
                <a href="contact_us.html">Contact us</a>
              </li>
              <li>Thank you</li>
            </ul>
          </div>

          <div class="trvl_info_cntnt">
            <h2 class="trvl_title">Thank you for Contacting us</h2>
            <p class="mb-4">
              All of our holidays are truly tailor-made, offering you complete
              choice and freedom. One of our experienced destination experts
              will get back to you within 24 hours or the next working day
              (should we receive your enquiry on a weekend or a public holiday)
              to start creating your perfect trip.
            </p>
            <p class="mb-4">
              In the meantime, please feel free to call us on 020 7337 9010.
            </p>
            <p class="mb-4">Thank you once again for getting in touch.</p>
            <p class="mb-4">The Exsus team</p>
            <p>
              Opening hours: Monday to Thursday 9am-5:30pm GMT, 9am-5pm on
              Fridays, 10am-4pm GMT on Saturdays
            </p>
          </div>
        </div>
      </section>

      <section class="card_blk_row dark_grey py-5">
        <div class="container">
          <div class="book_wth_confdnce">
            <h2>THREE REASONS TO BOOK WITH CONFIDENCE</h2>
            <div class="row">
              <div class="col-lg-4">
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
              <div class="col-lg-4">
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
              <div class="col-lg-4">
                <h3>Fully protected</h3>
                <p>
                  From the moment you start planning your trip, you will have a
                  dedicated expert looking after you. While away, we’ll provide
                  24/7 support and emergency contact to ensure that everything
                  runs smoothly. We are members of ABTA, ATOL and AITO so you
                  can rest assured your holiday is fully protected.{" "}
                </p>
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

      {/* NewsLetter */}
      <section aria-label="Sign up for newsletter" className="newslettr_row">
        <div className="container">
          <h4>Sign up for our newsletter</h4>
          <h5>Receive our latest news and special offers</h5>
          <Signup />
        </div>
      </section>
    </Layout>
  );
}
