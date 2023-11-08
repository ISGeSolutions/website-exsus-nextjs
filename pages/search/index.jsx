import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));
  }, []);

  return (
    <Layout>
      <section class="favrites_blk_row dark_grey pt-5">
        <div class="container-md">
          <h2 class="search_result_title">Search result for Asia site</h2>
          <div class="search_result_input d-block d-md-flex">
            <input
              class="form-control search mb-3 mb-md-0"
              id="search"
              type="search"
              placeholder="Search here"
              autocomplete="off"
            />
            <div class="banner_inspire_btn ps-0 ps-md-2">
              <button
                type="button"
                class="btn btn-primary prmry_btn"
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

          <div class="destination_filter_result">
            <p>We've found about 1191 results.</p>
          </div>
          <div class="search_result_list_parnt">
            <ul>
              <li class="d-inline-block d-sm-flex">
                <div class="search_result_inr_cnt">
                  <h3>
                    <a href="#">Request a brochure</a>
                  </h3>
                  <a href="#">https://mailchi.mp/exsus.com/brochure-request</a>
                  <p>
                    Titled ‘Escape the Obvious’, our brochure highlights the
                    very finest experiences in our most popular destinations,
                    and can be used to inspire you to discover some of the most
                    spectacular places in the world on a unique, bespoke holiday
                    crafted by our knowledgeable and experienced experts
                  </p>
                </div>
              </li>
              <li class="d-inline-block d-sm-flex">
                <a href="#" class="search_result_img_blk">
                  <img src="images/search_result01.jpg" alt="search_result01" />
                </a>
                <div class="search_result_inr_cnt">
                  <h3>
                    <a href="#">
                      Asia Gardens Hotel & Thai Spa | Luxury Hotels in Spain |
                      Exsus
                    </a>
                  </h3>
                  <a href="#">
                    https://www.exsus.com/destinations/europe/spain/alicante/asia-gardens-hotel-and-thai-spa
                  </a>
                  <p>
                    Asia Gardens Hotel & Thai Spa is an exotic array of tropical
                    gardens, divine swimming pools and Balinese style interiors,
                    the perfect Asian getaway - this side of Asia
                  </p>
                </div>
              </li>
              <li class="d-inline-block d-sm-flex">
                <a href="#" class="search_result_img_blk">
                  <img src="images/search_result02.jpg" alt="search_result02" />
                </a>
                <div class="search_result_inr_cnt">
                  <h3>
                    <a href="#">Articles on Asia | Luxury Travel | Exsus</a>
                  </h3>
                  <a href="#">
                    https://www.exsus.com/destinations/asia/asia-blog-posts
                  </a>
                  <p>Blogs, articles and top tips on Asia</p>
                </div>
              </li>
              <li class="d-inline-block d-sm-flex">
                <a href="#" class="search_result_img_blk">
                  <img src="images/search_result03.jpg" alt="search_result03" />
                </a>
                <div class="search_result_inr_cnt">
                  <h3>
                    <a href="#">
                      Articles on Indonesia, Asia | Luxury Travel | Exsus
                    </a>
                  </h3>
                  <a href="#">
                    https://www.exsus.com/destinations/asia/indonesia/indonesia-blog-posts
                  </a>
                  <p>Blogs, articles and top tips on Indonesia and Asia</p>
                </div>
              </li>
              <li class="d-inline-block d-sm-flex">
                <a href="#" class="search_result_img_blk">
                  <img src="images/search_result01.jpg" alt="search_result01" />
                </a>
                <div class="search_result_inr_cnt">
                  <h3>
                    <a href="#">
                      Luxury Holidays to Asia & Where to Stay | Exsus Travel
                    </a>
                  </h3>
                  <a href="#">https://www.exsus.com/destinations/asia</a>
                  <p>
                    Asia is highly addictive. This colourful continent is
                    jam-packed with culture, adventure and variety - perfect for
                    a luxury holiday
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div class="search_result_pagination">
            <div class="search_result_pagination_inr">
              <ul>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      />
                    </svg>
                  </a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li>
                  <a href="#">6</a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </a>
                </li>
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

      <section aria-label="Sign up for newsletter" class="newslettr_row">
        <div class="container">
          <h4>Sign up for our newsletter</h4>
          <h5>Receive our latest news and special offers</h5>
          <form class="newslettr_form d-block d-sm-flex">
            <div class="newlettr_inpt">
              <input
                type="text"
                class="form-control"
                placeholder="Full name and title"
              />
            </div>
            <div class="newlettr_inpt ps-0 ps-sm-2">
              <input
                type="email"
                class="form-control"
                placeholder="Your email address"
              />
            </div>
            <div class="newlettr_btn ps-0 ps-sm-2">
              <button type="submit" class="btn btn-primary prmry_btn">
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
    </Layout>
  );
}
