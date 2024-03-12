import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { homeService, alertService } from "services";
import CustomModal from "../CustomModal";
import { Alert } from "../Alert";
import getDeviceInfo from "../utils/getCountryInfo";
export { Signup };
import globalVariables from "../../config";

function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [country, setCountryInfo] = useState();
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setAlert(null);
    getDeviceInfo().then(({ deviceInfo, countryInfo }) => {
      setDeviceInfo(
        `Device-${deviceInfo.os} Browser -${deviceInfo.browser},Version-${deviceInfo.version} ,UserAgentDetails: ${deviceInfo.userAgent} InputType >${deviceInfo.inputType} Device address> ${deviceInfo.deviceAddress}`
      );
      setCountryInfo(countryInfo);
    });
  }, []);

  const router = useRouter();

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

  // form validation rules
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("Full name and title is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    ("closeAlert");
    setAlert(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // get functions to build form with useForm() hook
  function onSignup(data) {
    let signupData = {
      data: {
        first_name: `${data.first_name}`,
        email_id: `${data.email}`,
        request_type: "newsletter",
        email_sent_ind: false,
        loc_by_ip_country_name: country?.country,
        loc_by_ip_country_code: country?.countryCode,
        page_url: window.location.href,
        device_info: deviceInfo,
        submitted_at: new Date().toLocaleDateString(),
        site_region: region == "us" ? "Yes" : "No",
        ga_account_code: globalVariables?.ReactGA_ID,
      },
    };

    return homeService
      .saveDataToDB(signupData)
      .then((res) => {
        return homeService
          .signUp(signupData)
          .then(() => {
            showAlert("Operation succeeded", "success");
            reset();

            return homeService.saveDataToDB(res).then(() => {
              reset();
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

  return (
    <>
      {alert && alert.message && alert.type && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
      <form
        className="newslettr_form d-block d-sm-flex"
        onSubmit={handleSubmit(onSignup)}
      >
        <div className="newlettr_inpt">
          <input
            type="text"
            placeholder="Full name and title"
            name="fullnameAndTitle"
            {...register("first_name")}
            className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback mb-1">
            {errors.first_name?.message}
          </div>
        </div>
        <div className="newlettr_inpt ps-0 ps-sm-2">
          <input
            type="text"
            placeholder="Your email address"
            name="email"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback mb-1">{errors.email?.message}</div>
        </div>
        <div className="newlettr_btn ps-0 ps-sm-2">
          <button
            disabled={formState.isSubmitting}
            type="submit"
            className="btn btn-primary prmry_btn"
          >
            {formState.isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
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

      <CustomModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
