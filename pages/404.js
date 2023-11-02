// pages/404.js

import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const Custom404 = () => {
  const router = useRouter();

  const home = () => {
    router.push(`/`);
  };

  return (
    <section class="page_not_found_parnt">
      <div class="container">
        <span class="bigger_circle"></span>
        <span class="smaller_circle"></span>
        <div class="page_not_found_cnt">
          <ul>
            <li></li>
            <li class="web_page_yellow_dot"></li>
            <li class="web_page_green_dot"></li>
          </ul>
          <div class="page_not_found_cnt_inr">
            <h2>
              404<span>Page not found</span>
            </h2>
            <p>
              We're sorry, the page you requested could not be found. Please go
              back to homepage.
              <button class="btn btn-primary prmry_btn" onClick={home}>
                Back to Homepage
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
    // <div className="container m-5 text-white">
    //   <div className="row">
    //     <div className="col-md-6 offset-md-3 text-center">
    //       <h1 className="display-5">404 - Page Not Found</h1>
    //       <p className="lead m-5">
    //         The page you are looking for does not exist.
    //       </p>
    //       <Link href="/">
    //         <a className="btn btn-success">Go back to the homepage</a>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Custom404;
