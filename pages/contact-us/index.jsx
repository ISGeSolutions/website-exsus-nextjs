import { useState, useEffect } from "react";
import { Signup, FriendlyUrl, Alert } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { EnquiryButton } from "../../components/common/EnquiryBtn";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CustomModal from "../../components/CustomModal";
import getDeviceInfo from "../../components/utils/getCountryInfo";
import MyModal from "../../components/Modal";
import { enquiryService, alertService, contactUsService } from "services";
import globalVariables from "../../config";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default Index;

function Index() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  // const [formOptions, setFormOptions] = useState(null);
  const [pType, setPType] = useState("");
  const [pCode, setPCode] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [country, setCountryInfo] = useState();

  // form validation rules
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email_id: Yup.string().required("Email id address is required"),
    telephone_no: Yup.string().required("Telephone is required"),
    note: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

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

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    //  ("closeAlert");
    setAlert(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleRedirect = () => {
  //   router.push("contact-us/thankyou");
  // };

  function onSubmit(data) {
    data["site_region"] = region == "us" ? "Yes" : "No";
    data["submitted_at"] = new Date().toLocaleDateString();
    data["page_url"] = document.referrer;
    data["loc_by_ip_country_name"] = country?.country;
    data["loc_by_ip_country_code"] = country?.countryCode;
    data["request_type"] = "contactus";
    data["device_info"] = deviceInfo;
    data["ga_account_code"] = globalVariables?.ReactGA_ID;
    const data1 = {
      data: data,
    };

    return contactUsService
      .contactus(data1)
      .then((res) => {
        return contactUsService
          .sendContactUsMail({ data })
          .then(() => {
            return contactUsService
              .contactus(res)
              .then(() => {
                router.push("contact-us/thankyou");
                reset();
              })
              .catch((error) => {
                showAlert("Operation failed", "error");
              });
          })
          .catch((error) => {
            showAlert("Operation failed", "error");
          });
      })
      .catch((error) => {
        showAlert("Operation failed", "error");
      });
  }

  useEffect(() => {
    // Get device information
    getDeviceInfo().then(({ deviceInfo, countryInfo }) => {
      setDeviceInfo(
        `Device-${deviceInfo.os} Browser -${deviceInfo.browser},Version-${deviceInfo.version} ,UserAgentDetails: ${deviceInfo.userAgent} InputType >${deviceInfo.inputType} Device address> ${deviceInfo.deviceAddress}`
      );
      setCountryInfo(countryInfo);
    });
  }, []);

  return (
    <>
      <Layout>
        <section className="contact_form_row">
          <div className="container">
            {alert && alert.message && alert.type && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={closeAlert}
              />
            )}
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
                  {/* Contact Us Form */}
                  <form
                    className="needs-validation contact_form_blk"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h3>Write to us</h3>
                    <div className="row pt-3">
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="text"
                            aria-label="First name *"
                            placeholder="First name *"
                            name="first_name"
                            {...register("first_name")}
                            className={`form-control ${
                              errors.first_name ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-tooltip">
                            {errors.first_name?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="text"
                            aria-label="last_name *"
                            placeholder="last name *"
                            name="last_name"
                            {...register("last_name")}
                            className={`form-control ${
                              errors.last_name ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-tooltip">
                            {errors.last_name?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="email_id"
                            aria-label="email_id *"
                            placeholder="Email *"
                            name="email_id"
                            {...register("email_id")}
                            className={`form-control ${
                              errors.email_id ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-tooltip">
                            {errors.email_id?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="form-input">
                          <input
                            type="number"
                            aria-label="Telephone *"
                            placeholder="Telephone *"
                            name="telephone_no"
                            {...register("telephone_no")}
                            className={`form-control ${
                              errors.telephone_no ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-tooltip">
                            {errors.telephone_no?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form_textarea">
                          <textarea
                            type="text"
                            aria-label="Enter your message"
                            placeholder="Enter your message"
                            name="note"
                            rows="3"
                            {...register("note")}
                            className={`form-control ${
                              errors.note ? "is-invalid" : ""
                            }`}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          disabled={formState.isSubmitting}
                          type="submit"
                          className="btn btn-primary prmry_btn"
                          // data-bs-toggle="modal"
                          // data-bs-target="#staticBackdrop"
                          // target="_blank"
                          // onClick={() => handleRedirect()}
                        >
                          {formState.isSubmitting && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Send Message
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
              </div>
            </div>
          </div>
          <div className="full_loader_parnt_blk" style={{ display: "none" }}>
            <div className="loader-circle-2"></div>
          </div>
        </section>

        {/* Enquiry Function */}
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
