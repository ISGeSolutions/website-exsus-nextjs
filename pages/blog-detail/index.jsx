import { useState, useEffect } from "react";

import { Link, Spinner, Signup } from "components";
import { Layout } from "components/users";
import { FriendlyUrl } from "../../components";
import { userService, blogsService } from "services";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const router = useRouter();
  const blogName = router.query?.blogdetail
    ?.replace(/-/g, " ")
    .replace(/and/g, "&")
    .replace(/ ( ) /g, " - ")
    .toLowerCase();
  const [blogDetail, setblogdetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [friendlyUrl, setFriendlyUrl] = useState("");



  const validationSchema = Yup.object().shape({
    //title: Yup.string().required("Title is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email_id: Yup.string().required("Email id is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = (e) => {
    //  ("First Name ", first_name);
    //  ("Last Name ", las_name);
    //  ("Email", email_id);

    // (formData);
    //  (e);
  };

  useEffect(() => {
    blogsService
      .getBlogDetails(blogName)
      .then((x) => {
        setblogdetail(x.data[0].attributes);
        setFriendlyUrl(`home/blog/${x.data[0].attributes.blog_header_text}`);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [blogName]);

  return (
    <Layout>
      {isLoading ? (
        // <MyLoader />
        <div
          className="full_loader_parnt_blk loader_parnt_blk"
          style={{ display: `block !important` }}
        >
          <div className="loader-circle-2"></div>
        </div>
      ) : (
        <div>
          <section className="card_blk_row destinations_blk_row blog_detail_row">
            <div className="container">
              <div className="bookmark_row">
                <FriendlyUrl data={friendlyUrl}></FriendlyUrl>
                {/* <ul>
                  <li>
                    <a href="homepage.html">Home</a>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>{blogDetail.blog_header_text}</li>
                </ul> */}
              </div>
              <div className="destinations_cntnt_blk">
                <h2>{blogDetail.blog_header_text}</h2>
                <h3>By Exsus Travel - {blogDetail.blog_date}</h3>
                <a
                  className="blog_detl_link"
                  target="_blank"
                  href="https://twitter.com/Exsustravel/"
                >
                  <em className="fa fa-twitter"></em>Follow us @Exsus
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
                </a>
                <div className="row">
                  <div className="col-lg-8 col-xl-9">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogDetail.blog_text,
                      }}
                    />
                  </div>
                  <div className="col-lg-4 col-xl-3">
                    <div className="article_blk">
                      <i className="bi bi-pencil-square"></i>
                      <p>GET ARTICLES LIKE THIS STRAIGHT TO YOUR INBOX !!!</p>
                      <button
                        className="btn prmry_btn blog_sign_up_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#blogModal"
                      >
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
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="editor_choice_blk">
                      <h4>Editor's choice</h4>
                      <ul>
                        <li>
                          Luxury family holidays in the Galapagos Galapagos
                          Galapagos
                          <a href="javascript:void(0)">
                            Read more
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
                          </a>
                        </li>
                        <li>
                          Bespoke Luxury Holidays
                          <a href="javascript:void(0)">
                            Read more
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
                          </a>
                        </li>
                        <li>
                          Luxury Land-based Holidays in the Galapagos
                          <a href="javascript:void(0)">
                            Read more
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
                          </a>
                        </li>
                        <li>
                          Luxury Caribbean Beach Holidays
                          <a href="javascript:void(0)">
                            Read more
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
                          </a>
                        </li>
                        <li>
                          Luxury Safari Holidays
                          <a href="javascript:void(0)">
                            Read more
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
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="make_enqury_row">
            <div className="container">
              <h3>YOUR JOURNEY STARTS HERE</h3>
              <p>
                call us on 020 7337 9010 to start planning your perfect trip
              </p>
              <button className="btn prmry_btn make_enqury_btn">
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
          </section>

          <section
            aria-label="Sign up for newsletter"
            className="newslettr_row"
          >
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
          <div
            className="modal fade blog_modal_parnt"
            id="blogModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src="/images/banner-logo.png"
                    alt="banner-logo"
                    className="img-fluid"
                  />
                  <h5>Inspire Me</h5>
                  <p>
                    Looking for inspiration? When you sign up to our free
                    newsletter you’ll get the latest exciting ideas and luxury
                    travel offers from our specialists straight to your inbox
                  </p>
                  <div className="contact_form_row">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="select_drpdwn">
                              <select
                                className="form-select"
                                aria-label="Title"
                              >
                                <option defaultValue>Title *</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                                <option value="Miss">Miss</option>
                                <option value="Dr">Dr</option>
                                <option value="Professor">Professor</option>
                                <option value="Lord">Lord</option>
                                <option value="Lady">Lady</option>
                                <option value="Sir">Sir</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-input">
                              {/* <input
                                  type="text"
                                  name="first_name"
                                  {...register("first_name")}
                                  className={`form-control ${
                                    errors.first_name ? "is-invalid" : ""
                                  }`}
                                  aria-label="First name *"
                                  placeholder="First name *"
                                  // value={formData.first_name}
                                  // onChange={handleChange}
                                /> */}
                              <input
                                type="text"
                                name="first_name"
                                {...register("first_name")}
                                className={`form-control ${errors.first_name ? "is-invalid" : ""
                                  }`}
                                aria-label="First name *"
                                placeholder="First name *"
                              />
                              <div className="invalid-feedback mb-1">
                                {errors.first_name?.message}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-input">
                              {/* <input
                                  type="text"
                                  name="last_name"
                                  {...register("last_name")}
                                  className={`form-control ${
                                    errors.last_name ? "is-invalid" : ""
                                  }`}
                                  aria-label="Last name *"
                                  placeholder="Last name *"
                                  // value={formData.last_name}
                                  // onChange={handleChange}
                                /> */}
                              <input
                                type="text"
                                name="title"
                                {...register("last_name")}
                                className={`form-control ${errors.last_name ? "is-invalid" : ""
                                  }`}
                                aria-label="Last name *"
                                placeholder="Last name *"
                              />
                              <div className="invalid-feedback mb-1">
                                {errors.last_name?.message}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-input">
                              {/* <input
                                  type="email"
                                  name="email_id"
                                  {...register("email_id")}
                                  className={`form-control ${
                                    errors.email_id ? "is-invalid" : ""
                                  }`}
                                  aria-label="Email *"
                                  placeholder="Email *"
                                  // value={formData.email_id}
                                  // onChange={handleChange}
                                /> */}
                              <input
                                type="email"
                                name="email_id"
                                {...register("email_id")}
                                className={`form-control ${errors.email_id ? "is-invalid" : ""
                                  }`}
                                aria-label="Email *"
                                placeholder="Email *"
                              />
                              <div className="invalid-feedback mb-1">
                                {errors.email_id?.message}
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn prmry_btn mx-auto"
                            type="submit"
                            data-bs-dismiss="modal"
                          >
                            Subscribe
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
                    </form>
                  </div>
                  <p>* Required form fields</p>
                  <p>
                    Occasionally we may use the above information to send you
                    relevant news, updates and offers. You can opt out at any
                    time and we will not share your information at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
