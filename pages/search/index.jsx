import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { EnquiryButton } from "../../components/common/EnquiryBtn";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);

  const handleHrefClick = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));
  }, []);

  return (
    <Layout>
      <section className="favrites_blk_row dark_grey pt-5">
        <div className="container-md">
          <h2 className="search_result_title">Search result for Asia site</h2>
          <div className="search_result_input d-block d-md-flex">
            <input
              className="form-control search mb-3 mb-md-0"
              id="search"
              type="search"
              placeholder="Search here"
              autocomplete="off"
            />
            <div className="banner_inspire_btn ps-0 ps-md-2">
              <button
                type="button"
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

          <div className="destination_filter_result">
            <p>We've found about 1191 results.</p>
          </div>
          <div className="search_result_list_parnt">
            <ul>
              <li className="d-inline-block d-sm-flex">
                <div className="search_result_inr_cnt">
                  <h3>
                    <a href="#" onClick={handleHrefClick}>
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
              <li className="d-inline-block d-sm-flex">
                <a
                  href="#"
                  onClick={handleHrefClick}
                  className="search_result_img_blk"
                >
                  <img src="images/search_result01.jpg" alt="search_result01" />
                </a>
                <div className="search_result_inr_cnt">
                  <h3>
                    <a href="#" onClick={handleHrefClick}>
                      Asia Gardens Hotel & Thai Spa | Luxury Hotels in Spain |
                      Exsus
                    </a>
                  </h3>
                  <a href="#" onClick={handleHrefClick}>
                    https://www.exsus.com/destinations/europe/spain/alicante/asia-gardens-hotel-and-thai-spa
                  </a>
                  <p>
                    Asia Gardens Hotel & Thai Spa is an exotic array of tropical
                    gardens, divine swimming pools and Balinese style interiors,
                    the perfect Asian getaway - this side of Asia
                  </p>
                </div>
              </li>
              <li className="d-inline-block d-sm-flex">
                <a
                  href="#"
                  onClick={handleHrefClick}
                  className="search_result_img_blk"
                >
                  <img src="images/search_result02.jpg" alt="search_result02" />
                </a>
                <div className="search_result_inr_cnt">
                  <h3>
                    <a href="#" onClick={handleHrefClick}>
                      Articles on Asia | Luxury Travel | Exsus
                    </a>
                  </h3>
                  <a href="#" onClick={handleHrefClick}>
                    https://www.exsus.com/destinations/asia/asia-blog-posts
                  </a>
                  <p>Blogs, articles and top tips on Asia</p>
                </div>
              </li>
              <li className="d-inline-block d-sm-flex">
                <a
                  href="#"
                  onClick={handleHrefClick}
                  className="search_result_img_blk"
                >
                  <img src="images/search_result03.jpg" alt="search_result03" />
                </a>
                <div className="search_result_inr_cnt">
                  <h3>
                    <a href="#" onClick={handleHrefClick}>
                      Articles on Indonesia, Asia | Luxury Travel | Exsus
                    </a>
                  </h3>
                  <a href="#" onClick={handleHrefClick}>
                    https://www.exsus.com/destinations/asia/indonesia/indonesia-blog-posts
                  </a>
                  <p>Blogs, articles and top tips on Indonesia and Asia</p>
                </div>
              </li>
              <li className="d-inline-block d-sm-flex">
                <a
                  href="#"
                  onClick={handleHrefClick}
                  className="search_result_img_blk"
                >
                  <img src="images/search_result01.jpg" alt="search_result01" />
                </a>
                <div className="search_result_inr_cnt">
                  <h3>
                    <a href="#" onClick={handleHrefClick}>
                      Luxury Holidays to Asia & Where to Stay | Exsus Travel
                    </a>
                  </h3>
                  <a href="#" onClick={handleHrefClick}>
                    https://www.exsus.com/destinations/asia
                  </a>
                  <p>
                    Asia is highly addictive. This colourful continent is
                    jam-packed with culture, adventure and variety - perfect for
                    a luxury holiday
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="search_result_pagination">
            <div className="search_result_pagination_inr">
              <ul>
                <li>
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
                </li>
                <li className="active">
                  <a href="#" onClick={handleHrefClick}>
                    1
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleHrefClick}>
                    2
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleHrefClick}>
                    3
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleHrefClick}>
                    4
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleHrefClick}>
                    5
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleHrefClick}>
                    6
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleHrefClick}>
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
    </Layout>
  );
}
