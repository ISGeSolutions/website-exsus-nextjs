import { useState, useEffect } from "react";

import { Link, Spinner, Alert } from "components";
import { Layout } from "components/users";
import {
  userService,
  contactusService,
  alertService,
  brochureService,
} from "services";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import Select, { components } from "react-select";
import CustomMultiValue from "./CustomMultiValue";
import Head from "next/head";

export default Index;
const width = "250px";
const styles = {
  control: (provided) => ({
    ...provided,
    width,
  }),
  menu: (provided) => ({
    ...provided,
    width,
  }),
  valueContainer: (provided, state) => ({
    whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
    overflow: "hidden",
    flex: "1 1 0%",
    position: "relative",
  }),
  input: (provided, state) => ({
    ...provided,
    display: "inline",
  }),
};

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} readOnly />
      {children}
    </components.Option>
  );
};
function Index() {
  const router = useRouter();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [selectedOptionRegion, setSelectedOptionRegion] = useState(null);
  const [alert, setAlert] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email_id: Yup.string().required("Email id is required"),
    newsletter_mail_ind: Yup.string().required(
      "Newsletter mail indicator is required"
    ),
    phone_no: Yup.string().required("Phone number is required"),
    destination: Yup.string(),
    // region: Yup.string().required("Region is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const handleOptionRegionChange = (selectedOption) => {
    selectedOption = selectedOption.filter(
      (i) => i.value !== "" && typeof i.value !== "undefined"
    );
    setSelectedOptionRegion(selectedOption);
  };
  const countinentOptions = [
    { value: "Europe", label: "Europe" },
    { value: "North Africa", label: "North Africa" },
    { value: "Africa", label: "Africa" },
    { value: "Asia", label: "Asia" },
    { value: "Indian subcontinent", label: "Indian subcontinent" },
    { value: "Australasia", label: "Australasia" },
    { value: "USA and Canada", label: "USA and Canada" },
    { value: "Latin America", label: "Latin America" },
  ];

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    //  ("closeAlert");
    setAlert(null);
  };

  let region = "uk";
  let regionWiseUrl = "";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      if (window && window.site_region !== "uk") {
        regionWiseUrl = "/" + window.site_region;
        region = window.site_region;
      }
    }
  }

  const generateDynamicLink = () => {
    return regionWiseUrl + `/travel-agent-brochures`;
  };

  function onSubmit(data) {
    data["site_region"] = region == "us" ? "Yes" : "No";
    data["submitted_at"] = new Date().toLocaleDateString();
    data["previous_page"] = document.referrer;
    const data1 = {
      data: data,
    };
    return brochureService
      .saveDataToDB(data1)
      .then((res) => {
        return brochureService
          .sendBrochurerMail({ data })
          .then(() => {
            alertService.success("Brochure request is sent successfully", {
              keepAfterRouteChange: true,
            });
            router.push("brochure");
            // setFormSubmit(true);
          })
          .catch((error) => {
            showAlert("Operation failed", "error");
          });
      })
      .catch((error) => {
        showAlert("Operation failed", "error");
      });
  }

  const handleMouseOver = () => {
    document.querySelector(".captch_parnt_blk").classList.add("captch_opn");
  };

  const handleMouseOverReset = () => {
    document.querySelector(".captch_parnt_blk").classList.remove("captch_opn");
  };

  useEffect(() => {
    const captchIcnBlk = document.querySelector(".captch_icn_blk");
    const otherElements = document.querySelectorAll(
      ".brochure_header_row, .contact_form_row .brochure_form_row, .brochure_testimonial_row"
    );

    // setFormSubmit(false);

    captchIcnBlk.addEventListener("mouseover", handleMouseOver);

    otherElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOverReset);
    });

    return () => {
      captchIcnBlk.removeEventListener("mouseover", handleMouseOver);

      otherElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOverReset);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>Request Brochure - Exsus Travel</title>
        <script
          type="text/javascript"
          src="/assets/javascripts/bootstrap.min.js"
        ></script>
      </Head>
      <Layout>
        <header className="brochure_header_row brochure_header_extr_cls">
          <div className="container">
            <img
              src="images/brochure_header_img.jpg"
              alt="brochure_header_img"
            />
            <h1>Request Brochures</h1>
            <p>
              Our brochure, titled ‘Escape the Obvious’, highlights the very
              finest experiences in our most popular destinations, and can be
              used to inspire your clients to discover some of the most
              spectacular places in the world on a unique, bespoke holiday
              crafted by our knowledgeable and experienced experts.
            </p>
            <p>
              In order to help reduce our impact on the environment, we will
              only be sending out digital copies of the brochure. To request
              yours, please provide the information below and one will be sent
              to you straight away.
            </p>
            <p>
              If you're a Travel Agent, please{" "}
              <a href={generateDynamicLink()}>click here</a> .
              {/* <a href="/brochure-request-trade">click here</a> . */}
            </p>
          </div>
        </header>

        <main className="contact_form_row brochure_form_row">
          {alert && alert.message && alert.type && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={closeAlert}
            />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row pt-4">
                <div className="col-md-4">
                  <div className="form-input">
                    <input
                      type="text"
                      name="first_name"
                      {...register("first_name")}
                      className={`form-control ${
                        errors.first_name ? "is-invalid" : ""
                      }`}
                      aria-label="First name *"
                      placeholder="First name *"
                    />
                    <div className="invalid-feedback mb-1">
                      {errors.first_name?.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-input">
                    <input
                      type="text"
                      name="title"
                      {...register("last_name")}
                      className={`form-control ${
                        errors.last_name ? "is-invalid" : ""
                      }`}
                      aria-label="Last name *"
                      placeholder="Last name *"
                    />
                    <div className="invalid-feedback mb-1">
                      {errors.last_name?.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-input">
                    <input
                      type="email"
                      name="email_id"
                      {...register("email_id")}
                      className={`form-control ${
                        errors.email_id ? "is-invalid" : ""
                      }`}
                      aria-label="Email *"
                      placeholder="Email *"
                    />
                    <div className="invalid-feedback mb-1">
                      {errors.email_id?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-md-4">
                  <div className="form-input">
                    <input
                      type="number"
                      aria-label="Phone number *"
                      placeholder="Phone number *"
                      {...register("phone_no")}
                      className={`form-control ${
                        errors.phone_no ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="brochure_select_dropdown">
                    <div className="banner_dropdwn_blk">
                      <div className="select_drpdwn">
                        <Select
                          id="long-value-select"
                          instanceId="long-value-select"
                          className="select_container_country"
                          classNamePrefix="select_country"
                          placeholder={"Filter by regions"}
                          styles={styles}
                          isMulti
                          isDisabled={isDisabled}
                          isLoading={isLoading}
                          isClearable={isClearable}
                          isRtl={isRtl}
                          isSearchable={isSearchable}
                          value={selectedOptionRegion}
                          onChange={handleOptionRegionChange}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          options={countinentOptions}
                          components={{
                            Option: InputOption,
                            MultiValue: CustomMultiValue,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-input">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Where would you like to go?"
                      {...register("destination")}
                      placeholder="Where would you like to go? (Optional)"
                    />
                  </div>
                </div>
              </div>
              <div className="contact_form_cntnt">
                <div className="row">
                  <div className="col-12">
                    <div className="contact_form_cntnt_left">
                      <h3>Sign Up To Receive Our Trade Newsletters</h3>
                      <p>
                        We’d love to contact you by newsletter from time to
                        time, including holiday inspiration and special offers
                        for your clients. Please tick the box below if you'd
                        like to hear from us.
                      </p>
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          name="newsletter_mail_ind"
                          {...register("newsletter_mail_ind")}
                          className={`form-check-input ${
                            errors.newsletter_mail_ind ? "is-invalid" : ""
                          }`}
                          id="exampleCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          YES, I'd like to receive the latest news, offers and
                          brochure by email.
                        </label>
                        <div className="invalid-feedback mb-1">
                          {errors.newsletter_mail_ind?.message}
                        </div>
                      </div>
                      <p>
                        Should you wish to unsubscribe from our e-newsletters at
                        any point, you can do so using the link in the footer of
                        any e-newsletter you receive from us. We will not share
                        your details at any point. For more information about
                        our privacy practices please visit our website. By
                        confirming your subscription below, you agree that we
                        will process your information in accordance with this
                        policy.
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row align-items-center mb-3">
                      <div className="col-sm-2 col-md-1 text-center mb-3 mb-sm-0">
                        <img
                          src="images/mailchimp-gdpr.svg"
                          alt="mailchimp-gdpr"
                        />
                      </div>
                      <div className="col-sm-10 col-md-11">
                        <div className="contact_form_cntnt_left">
                          <p className="mb-0">
                            We use Mailchimp as our marketing platform. By
                            clicking below to subscribe, you acknowledge that
                            your information will be transferred to Mailchimp
                            for processing.{" "}
                            <a href="https://mailchimp.com/legal/terms/">
                              Learn more about Mailchimp's privacy practices
                              here.
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn prmry_btn make_enqury_btn mx-auto text-uppercase"
                      type="submit"
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Request Brochures
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
                </div>
              </div>
            </div>
          </form>
          {/* {formSubmit ? (
          ) : (
            <p>Thank you page</p>
          )} */}
          <section className="captch_parnt_blk">
            <div className="captch_icn_blk">
              <img src="\assets\images\captcha.png" alt="captcha" />
              <div className="captch_links_blk">
                <a
                  href="https://www.google.com/intl/en/policies/privacy/"
                  target="_blank"
                >
                  Privacy
                </a>{" "}
                <span>-</span>{" "}
                <a
                  href="https://www.google.com/intl/en/policies/terms/"
                  target="_blank"
                >
                  Terms
                </a>
              </div>
            </div>
            <div className="captch_contnt_blk">
              <span>
                protected by <strong>reCAPTCHA</strong>
              </span>
              <div className="captch_links_blk">
                <a
                  href="https://www.google.com/intl/en/policies/privacy/"
                  target="_blank"
                >
                  Privacy
                </a>{" "}
                <span>-</span>{" "}
                <a
                  href="https://www.google.com/intl/en/policies/terms/"
                  target="_blank"
                >
                  Terms
                </a>
              </div>
            </div>
          </section>
        </main>
        <section className="brochure_testimonial_row">
          <div className="container">
            <p>
              “Probably the best family holiday we've ever had. The activities
              were spot on for our adventurous kids”
              <span>— A Tonge and family travelled to Canada</span>
            </p>
          </div>
        </section>

        <footer className="brochure_footer_row">
          <p>
            If you have any issues requesting a brochure,
            <br />
            please call us on 0207 563 1304 or email{" "}
            <a href="javascript:void(0)">escape@exsus.com</a>
          </p>
        </footer>
      </Layout>
    </>
  );
}
