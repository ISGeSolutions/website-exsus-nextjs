import { useState, useEffect } from "react";
import { Link, Spinner, Alert, Signup } from "components";
import { Layout } from "components/users";
import { contactusService, alertService } from "services";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import Modal from './../../components/Modal';
// import 'react-modal/lib/components/Modal/';
import MyModal from "../../components/Modal"; // Adjust the path as needed
import CustomModal from "../../components/CustomModal";
// import './../../styles/globals.css'; // Import the modal styles

export default Index;

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  // const [formOptions, setFormOptions] = useState(null);
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please select title"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email_id: Yup.string().required("Email id address is required"),
    telephone_no: Yup.string().required("Telephone is required"),
    best_time_to_call: Yup.string(),
    preferred_place_time: Yup.string().required(
      "Please enter where would you like to go?"
    ),
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
    const data1 = {
      data: data,
    };

    // return contactusService.makeanenquiry(data1).then((res) => {
    return contactusService
      .sendEnquiryMail({ data })
      .then(() => {
        // return contactusService
        //   .makeanenquiry(res)
        //   .then(() => {
        router.push('thank-you');
        // showAlert("Operation succeeded", "success");
        // reset();
        // })
        // .catch((error) => {
        //   showAlert("Operation failed", "error");
        // });
      })
      .catch((error) => {
        showAlert("Operation failed", "error");
      });
    // });
  }

  useEffect(() => { }, []);

  return (
    <Layout>
      {/* <h4 className='mt-2'>This is destination page</h4> */}
      <section className="contact_form_row">
        <div className="container">
          <h2>Escape the obvious - tailor-make your trip today</h2>
          {/* <button onClick={() => showAlert('Operation succeeded', 'success')}>Show Success Alert</button>
                    <button onClick={() => showAlert('Operation failed', 'error')}>Show Error Alert</button> */}
          {alert && alert.message && alert.type && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={closeAlert}
            />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row pt-4">
              <div className="col-sm-6 col-md-4">
                <div className="select_drpdwn">
                  <select
                    aria-label="Title"
                    name="title"
                    {...register("title")}
                    className={`form-select ${errors.title ? "is-invalid" : ""
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
              <div className="col-sm-6 col-md-4">
                <div className="form-input">
                  <input
                    type="text"
                    aria-label="First name *"
                    placeholder="First name *"
                    name="first_name"
                    {...register("first_name")}
                    className={`form-control ${errors.first_name ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback mb-1">
                    {errors.first_name?.message}
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-input">
                  <input
                    type="text"
                    aria-label="last_name *"
                    placeholder="last name *"
                    name="last_name"
                    {...register("last_name")}
                    className={`form-control ${errors.last_name ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback mb-1">
                    {errors.last_name?.message}
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-input">
                  <input
                    type="email_id"
                    aria-label="email_id *"
                    placeholder="Email *"
                    name="email_id"
                    {...register("email_id")}
                    className={`form-control ${errors.email_id ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback mb-1">
                    {errors.email_id?.message}
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-input">
                  <input
                    type="number"
                    aria-label="Telephone *"
                    placeholder="Telephone *"
                    name="telephone_no"
                    {...register("telephone_no")}
                    className={`form-control ${errors.telephone_no ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback mb-1">
                    {errors.telephone_no?.message}
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="select_drpdwn">
                  <select
                    aria-label="Best time to call"
                    name="Best time to call"
                    {...register("best_time_to_call")}
                    className={`form-select ${errors.best_time_to_call ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Best time to call</option>
                    <option value="No Preference">No Preference</option>
                    <option value="8.30am - 12pm (GMT)">
                      8.30am - 12pm (GMT)
                    </option>
                    <option value="12pm - 3pm (GMT)">12pm - 3pm (GMT)</option>
                    <option value="12pm - 3pm (GMT)">12pm - 3pm (GMT)</option>
                    <option value="3pm - 6pm (GMT)">3pm - 6pm (GMT)</option>
                  </select>
                  <div className="invalid-feedback mb-1">
                    {errors.best_time_to_call?.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className="col-12">
                <div className="form_input">
                  <input
                    type="text"
                    aria-label="Where & When you would like to go?"
                    placeholder="Where & When you would like to go? *"
                    name="preferred_place_time"
                    {...register("preferred_place_time")}
                    className={`form-control ${errors.preferred_place_time ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback mb-1">
                    {errors.preferred_place_time?.message}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form_textarea">
                  <textarea
                    placeholder="Tell us more about your plans i.e. how much you would like to spend, who is travelling, what is important to you etc?"
                    rows="3"
                    name="note"
                    {...register("note")}
                    className={`form-control ${errors.note ? "is-invalid" : ""
                      }`}
                  ></textarea>
                  <div className="invalid-feedback mb-1">
                    {errors.note?.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className="col-sm-6 col-md-7">
                <div className="select_drpdwn">
                  <select
                    aria-label="What prompted you to get in touch?"
                    name="source_of_marketing"
                    {...register("source_of_marketing")}
                    className={`form-select ${errors.source_of_marketing ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">What prompted you to get in touch?</option>
                    <option value="Repeat client">Repeat client</option>
                    <option value="Friend or Family">Friend or Family</option>
                    <option value="Google search">Google search</option>
                    <option value="Google advert">Google advert</option>
                    <option value="Social media">Social media</option>
                    <option value="Website or blog">Website or blog</option>
                    <option value="Other*">Other*</option>
                  </select>
                  <div className="invalid-feedback mb-1">
                    {errors.source_of_marketing?.message}
                  </div>
                  <span className="form_input_info">
                    * Required form fields
                  </span>
                </div>
              </div>

              <div className="col-sm-6 col-md-5">
                <button
                  disabled={formState.isSubmitting}
                  type="submit"
                  className="btn btn-primary prmry_btn"
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
              <div className="contact_form_cntnt">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="contact_form_cntnt_left">
                      <h3>Sign Up To Receive Our Newsletters & Brochure</h3>
                      <p>
                        We’d love to contact you by newsletter from time to
                        time, including holiday inspiration and special offers.
                        Please tick the box below if you'd like to hear from us.
                        If you wish to unsubscribe, you can do so at any time.
                        We will not share your details at any point.
                      </p>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="exampleCheck1"
                          name="marketing_mail_ind"
                          {...register("marketing_mail_ind")}
                          className={`form-check-input ${errors.marketing_mail_ind ? "is-invalid" : ""
                            }`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          YES, I'd like to receive the latest news, offers and
                          brochure by email.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="contact_form_cntnt_right mt-3 mt-lg-0">
                      <p>
                        Alternatively, call <span>020 7337 9010</span> or email{" "}
                        <a href="javascript:void(0)">escape@exsus.com</a> to speak to one of our
                        travel experts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Book with Confidence */}
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

      {/* NewsLetter */}
      <section
        aria-label="Sign up htmlFor newsletter"
        className="newslettr_row"
      >
        <div className="container">
          <h4>Sign up For our newsletter</h4>
          <h5>Receive our latest news and special offers</h5>
          <Signup />
        </div>
      </section>

      <CustomModal isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
}
