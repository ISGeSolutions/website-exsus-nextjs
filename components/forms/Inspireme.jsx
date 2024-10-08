import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { element } from "prop-types";
import {
  destinationService,
  holidaytypesService,
  userService,
  homeService,
  alertService,
} from "services";
import CustomModal from "../CustomModal";
import { Alert } from "../Alert";

export { Inspireme };

function Inspireme(props) {
  const { divRef } = props;
  const router = useRouter();
  const [destinationLandingList, setDestinationLandingList] = useState();
  const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();
  const [queryParameters, setQueryParameters] = useState();
  const [month, setMonth] = useState();
  let selectedOptionId = 0;
  // form validation rules
  const validationSchema = Yup.object().shape({
    destination: Yup.string(),
    reason: Yup.string(),
    month: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;
  const [alert, setAlert] = useState(null);

  let region = "";
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
    setAlert(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle the onChange event
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected value in state
  };

  function onSubmit(data) {
    // const { pathname, query } = router;

    // // Clone the existing query object and remove the specific query parameter
    // const newQuery = { ...query };
    // delete newQuery.myQueryParam; // Replace 'myQueryParam' with your query parameter name

    // // Use the push method to navigate to the same page with the updated query
    // router.push({
    //   pathname,
    //   query: newQuery,
    // });

    let destination = "";
    let reason = "";
    let month = "";

    if (data?.destination) {
      destination = data?.destination;
    } else if (queryParameters?.where) {
      destination = queryParameters?.where;
    }

    if (data?.reason) {
      reason = data?.reason;
    } else if (queryParameters?.what) {
      reason = queryParameters?.what;
    }

    if (data?.month) {
      month = data?.month;
      setMonth(month);
    } else if (queryParameters?.when) {
      month = queryParameters?.when;
      setMonth(month);
    }
    if (!data.destination && !data.reason && !data.month) {
      showAlert("Please select atleast one option", "error");
      setQueryParameters(null);
      reset();
    } else {
      const currentDomain = window.location.origin;
      const newRoute =
        `${currentDomain}/${region}/advance-search?where=` +
        destination +
        `&what=` +
        reason +
        `&when=` +
        month;
      router.push(newRoute);
      // console.log(router.route);
      // const nextRouter = useRouter();
      // console.log(nextRouter);
      //nextRouter.push(newRoute);
      //   router.route =
      //   `${region}/advance-search?where=` +
      //   destination +
      //   `&what=` +
      //   reason +
      //   `&when=` +
      //   month;
      // const newroute = router.route;
      // router.push(newroute);
      reset();
      setQueryParameters(null);
    }
  }

  useEffect(() => {
    destinationService.getDestinationInspireMe().then((x) => {
      const sortedData = x.data.sort(
        (a, b) =>
          a.attributes.main_page_serial_number -
          b.attributes.main_page_serial_number
      );
      setDestinationLandingList(sortedData);
    });

    holidaytypesService.getHolidaytypesLandingList().then((x) => {
      const sortedData = x.data.sort((a, b) =>
        a.id -
        b.id
      )
      setHolidaytypesLandingList(sortedData);
    });

    setQueryParameters(router.query);
  }, [divRef, router.query]);

  return (
    <>
      {alert && alert.message && alert.type && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="banner_dropdwn_row">
          <div className="container">
            <div className="banner_dropdwn_inr d-block d-md-flex">
              <div className="banner_dropdwn_blk">
                <div className="select_drpdwn">
                  <select
                    defaultValue={selectedOptionId}
                    onChange={handleSelectChange}
                    aria-label="Choose a destination"
                    name="destination"
                    {...register("destination")}
                    className={`form-select ${errors.destination ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Choose a destination</option>
                    {destinationLandingList?.map((element, i) => (
                      <option
                        selected={
                          element?.attributes?.destination_code ===
                          queryParameters?.where
                        }
                        key={element?.id}
                        value={element?.attributes?.destination_code}
                      >
                        {element?.attributes?.destination_name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback mb-1">
                    {errors.destination?.message}
                  </div>
                </div>
              </div>
              <div className="banner_dropdwn_blk ps-0 ps-md-2">
                <div className="select_drpdwn">
                  <select
                    defaultValue={selectedOptionId}
                    aria-label="Choose a reason"
                    name="reason"
                    {...register("reason")}
                    className={`form-select ${errors.reason ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Choose a reason</option>
                    {holidaytypesLandingList?.map((element, i) => (
                      <option
                        key={element?.id}
                        value={element?.attributes?.holiday_type_group_code}
                        selected={
                          element?.attributes?.holiday_type_group_code ===
                          queryParameters?.what
                        }
                      >
                        {element?.attributes?.holiday_type_group_name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback mb-1">
                    {errors.reason?.message}
                  </div>
                </div>
              </div>
              <div className="banner_dropdwn_blk ps-0 ps-md-2">
                <div className="select_drpdwn">
                  <select
                    defaultValue={""}
                    aria-label="Choose a month"
                    name="month"
                    {...register("month")}
                    className={`form-select ${errors.month ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Choose a month</option>
                    <option value="1" selected={queryParameters?.when == 1}>
                      January
                    </option>
                    <option value="2" selected={queryParameters?.when == 2}>
                      February
                    </option>
                    <option value="3" selected={queryParameters?.when == 3}>
                      March
                    </option>
                    <option value="4" selected={queryParameters?.when == 4}>
                      April
                    </option>
                    <option value="5" selected={queryParameters?.when == 5}>
                      May
                    </option>
                    <option value="6" selected={queryParameters?.when == 6}>
                      June
                    </option>
                    <option value="7" selected={queryParameters?.when == 7}>
                      July
                    </option>
                    <option value="8" selected={queryParameters?.when == 8}>
                      August
                    </option>
                    <option value="9" selected={queryParameters?.when == 9}>
                      September
                    </option>
                    <option value="10" selected={queryParameters?.when == 10}>
                      October
                    </option>
                    <option value="11" selected={queryParameters?.when == 11}>
                      November
                    </option>
                    <option value="12" selected={queryParameters?.when == 12}>
                      December
                    </option>
                  </select>
                  <div className="invalid-feedback mb-1">
                    {errors.month?.message}
                  </div>
                </div>
              </div>
              <div className="banner_inspire_btn ps-0 ps-md-2">
                <button type="submit" className="btn btn-primary prmry_btn">
                  Inspire me
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
    </>
  );
}
