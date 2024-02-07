import { useState, useEffect } from "react";
import { Link, Spinner, Alert, Signup } from "components";
import { Layout } from "components/users";
import { enquiryService, alertService } from "services";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import Modal from './../../components/Modal';
// import 'react-modal/lib/components/Modal/';
import MyModal from "../../components/Modal"; // Adjust the path as needed
import CustomModal from "../../components/CustomModal";
import getDeviceInfo from "../../components/utils/getCountryInfo";
// import './../../styles/globals.css'; // Import the modal styles
import globalVariables from "../../config";

export default Index;

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  // const [formOptions, setFormOptions] = useState(null);
  const router = useRouter();
  const [pType, setPType] = useState("");
  const [pCode, setPCode] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [country, setCountryInfo] = useState();

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please select title"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email_id: Yup.string().required("Email id address is required"),
    telephone_no: Yup.string().required("Telephone is required"),
    best_time_to_call: Yup.string(),
    preferred_place_time: Yup.string(),
    note: Yup.string(),
    source_of_marketing: Yup.string(),
    source_of_marketing_other_text: Yup.string(
      "test source_of_marketing_other_text"
    ),
    marketing_mail_ind: Yup.boolean(false),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleRadioChange = (e) => {
    // Check if the selected option is "Other*"
    if (e.target.value === "Other*") {
      document.getElementsByClassName("other_reason_input").style.display =
        "block";
    } else {
      document.getElementsByClassName("other_reason_input").style.display =
        "none";
    }
    // setShowOtherInput(e.target.value === "Other*");
  };

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

  const handleHrefClick = (event) => {
    event.preventDefault();
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

  function onSubmit(data) {
    data["site_region"] = region == "us" ? "Yes" : "No";
    data["submitted_at"] = new Date().toLocaleDateString();
    data["page_url"] = document.referrer;
    data["loc_by_ip_country_name"] = country?.country;
    data["loc_by_ip_country_code"] = country?.countryCode;
    data["product_type"] = pType;
    data["request_type"] = "Enquiry";
    data["product_code"] = pCode;
    data["device_info"] = deviceInfo;
    data["ga_account_code"] = globalVariables?.ReactGA_ID;
    const data1 = {
      data: data,
    };

    return enquiryService
      .makeanenquiry(data1)
      .then((res) => {
        return enquiryService
          .sendEnquiryMail({ data })
          .then(() => {
            return enquiryService
              .makeanenquiry(res)
              .then(() => {
                router.push("make-an-enquiry/thankyou");
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
    setPType(router?.query?.pType);
    setPCode(router?.query?.pCode);
    getDeviceInfo().then(({ deviceInfo, countryInfo }) => {
      setDeviceInfo(
        `Device-${deviceInfo.os} Browser -${deviceInfo.browser},Version-${deviceInfo.version} ,UserAgentDetails: ${deviceInfo.userAgent} InputType >${deviceInfo.inputType} Device address> ${deviceInfo.deviceAddress}`
      );
      setCountryInfo(countryInfo);
    });
  }, []);

  return (
    <Layout>
      <section className="make_enqry_form_row">
        <div className="container">
          <h2>Start planning your trip</h2>
          {alert && alert.message && alert.type && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={closeAlert}
            />
          )}
          <div className="make_enqry_wrapper_blk">
            <div className="row">
              <div className="col-lg-8">
                <form
                  className="needs-validation"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="make_enqry_left_blk">
                    <div className="make_enqry_left_inr">
                      <h3>Your travel plans</h3>
                      <div className="row">
                        <div className="col-12">
                          <div className="form_input">
                            <input
                              type="text"
                              aria-label="Where you would like to go?"
                              placeholder="Where you would like to go? *"
                              name="preferred_place_time"
                              {...register("preferred_place_time")}
                              className={`form-control ${
                                errors.preferred_place_time ? "is-invalid" : ""
                              }`}
                            />
                            <div className="invalid-feedback mb-1">
                              {errors.preferred_place_time?.message}
                            </div>{" "}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form_textarea">
                            <textarea
                              placeholder="Tell us more about your plans i.e. how much you would like to spend, who is travelling, what is important to you etc?"
                              rows="3"
                              name="note"
                              {...register("note")}
                              className={`form-control ${
                                errors.note ? "is-invalid" : ""
                              }`}
                            ></textarea>
                            <div className="invalid-feedback mb-1">
                              {errors.note?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="make_enqry_left_inr">
                      <h3>Your details</h3>
                      <div className="make_enqry_info_blk">
                        <div className="make_enqry_info_icn_blk">
                          <span className="material-symbols-outlined">
                            info
                          </span>
                        </div>
                        <div className="make_enqry_cntnt_blk">
                          Exsus Travel takes the security and privacy of your
                          data very seriously. Please read our{" "}
                          <a href="privacy_policy.html">privacy policy</a> for
                          further details.
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-6 col-lg-4">
                          <div className="select_drpdwn">
                            <select
                              aria-label="Title"
                              name="title"
                              {...register("title")}
                              className={`form-select ${
                                errors.title ? "is-invalid" : ""
                              }`}
                            >
                              <option value="">Title *</option>
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
                            <div className="invalid-feedback mb-1">
                              {errors.title?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
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
                            <div className="invalid-feedback mb-1">
                              {errors.first_name?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
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
                            <div className="invalid-feedback mb-1">
                              {errors.last_name?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
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
                            <div className="invalid-feedback mb-1">
                              {errors.email_id?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
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
                            <div className="invalid-feedback mb-1">
                              {errors.telephone_no?.message}
                            </div>{" "}
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-4 position-relative">
                          <div className="select_drpdwn">
                            <select
                              aria-label="Best time to call"
                              name="Best time to call"
                              {...register("best_time_to_call")}
                              className={`form-select ${
                                errors.best_time_to_call ? "is-invalid" : ""
                              }`}
                            >
                              <option value="">Best time to call</option>
                              <option value="No Preference">
                                No Preference
                              </option>
                              <option value="8.30am - 12pm (GMT)">
                                8.30am - 12pm (GMT)
                              </option>
                              <option value="12pm - 3pm (GMT)">
                                12pm - 3pm (GMT)
                              </option>
                              <option value="12pm - 3pm (GMT)">
                                12pm - 3pm (GMT)
                              </option>
                              <option value="3pm - 6pm (GMT)">
                                3pm - 6pm (GMT)
                              </option>
                            </select>
                            <div className="invalid-feedback mb-1">
                              {errors.best_time_to_call?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="make_enqry_left_inr">
                      <h3>Further information</h3>
                      <div className="row">
                        <div className="make_enqry_checkbx_blk">
                          <p>What prompted you to get in touch today? *</p>
                          <div className="make_enqry_checkbx_grp">
                            {[
                              "Repeat client",
                              "Friend or Family",
                              "Google search",
                              "Google advert",
                              "Social media",
                              "Website or blog",
                              "Other*",
                            ].map((option, index) => (
                              <div
                                key={index}
                                className="form-check make_enqry_checkbx_inr"
                              >
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id={`exampleCheck${index + 1}`}
                                  name="source_of_marketing"
                                  value={option}
                                  onChange={handleRadioChange}
                                  {...register("source_of_marketing")}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`exampleCheck${index + 1}`}
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                          {/* {showOtherInput && ( */}
                          {/* <div className="other_reason_input">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Please give a brief description."
                              {...register("source_of_marketing_other_text")}
                            />
                          </div> */}
                          {/* )} */}
                          <div className="form-check promotion_checkbox">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck5"
                              name="promotion-checkbox"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck5"
                            >
                              We’d like to keep you up to date with travel news,
                              inspiration from our experts, and our latest
                              offers. Please tick this box if you’d prefer not
                              to hear from us.
                            </label>
                          </div>
                          {/* </>
                          )} */}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          disabled={formState.isSubmitting}
                          type="submit"
                          className="btn btn-primary prmry_btn make_enqry_send_inq_btn"
                        >
                          {formState.isSubmitting && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Send Enquiry
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
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-sm-6 col-lg-12">
                    <div className="make_enqry_right_blk">
                      <div className="make_enqry_call_blk">
                        <span className="material-symbols-outlined">call</span>
                        <h3>Call us</h3>
                        <ul>
                          <li>UK : 020 7563 1310</li>
                          <li>USA (New York) : +1 516 518 8174</li>
                          <li>USA (Toll free number) : +1 833 735 0550</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-12">
                    <div className="make_enqry_right_blk">
                      <div className="make_enqry_offce_hrs_blk">
                        <span className="material-symbols-outlined">
                          schedule
                        </span>
                        <h3>Office hours (GMT)</h3>
                        <ul>
                          <li>Monday - Thursday (09:00am - 05:30pm)</li>
                          <li>Friday (09:00am - 05:00pm)</li>
                          <li>Saturday (10:00am - 04:00pm)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="full_loader_parnt_blk" style={{ display: "none" }}>
          <div className="loader-circle-2"></div>
        </div>
      </section>

      <section className="text_overlay_row">
        <div className="container">
          <h4>Book with Confidence</h4>
          <h5>ATOL, ABTA & AITO PROTECTED</h5>
          <ul>
            <li>Over 20 years of luxury travel </li>
            <li>First-hand experience of every destination</li>
            <li>All holidays designed to suit individual needs</li>
            <li>Only the best hotels and local partners used</li>
            <li>24/7 support and emergency contact</li>
          </ul>
        </div>
      </section>

      <CustomModal isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
}
