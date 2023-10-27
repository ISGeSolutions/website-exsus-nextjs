import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/holiday_types`;
const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[page_code][$eq]=holiday_types&populate[0]=custom_page_images`;
// const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_page`;

// const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types?fields[0]=holiday_type_code&fields[1]=holiday_type_name&populate[holiday_type_images][fields][2]=image_path&populate[holiday_type_images][fields][3]=image_type`;
// const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_list`;
const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups?filters[main_page_ind][$eq]=true&fields[0]=holiday_type_group_code&fields[1]=holiday_type_group_name&populate[holiday_type_group_images][fields][2]=image_path&populate[holiday_type_group_images][fields][3]=image_type&populate[holiday_type_group_images][filters][image_type][$eq]=thumbnail&populate[holiday_types][fields][4]=holiday_type_code&populate[holiday_types][fields][5]=holiday_type_name&fields[6]=main_page_ind&fields[7]=main_page_serial_number`;
const holidaytypesLandingListUrlHomePage = `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups?fields[0]=holiday_type_group_code&fields[1]=holiday_type_group_name&populate[holiday_type_group_images][fields][2]=image_path&populate[holiday_type_group_images][fields][3]=image_type&populate[holiday_type_group_images][filters][image_type][$eq]=thumbnail&populate[holiday_types][fields][4]=holiday_type_code&populate[holiday_types][fields][5]=holiday_type_name&fields[6]=home_page_ind&fields[7]=home_page_serial_number&filters[home_page_ind][$eq]=true`;

const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types/1?populate[0]=holiday_type_images`;
// const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_details`;

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const holidaytypesService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getAll,
  getById,
  getHolidaytypesLandingPage,
  getHolidaytypesLandingList,
  getHolidaytypeDetails,
  getHolidaytypeDetailsById,
  getHolidaytypesLandingListHomePage,
  getDictionaryDetails,
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getHolidaytypesLandingListHomePage() {
  return fetchWrapper.get(holidaytypesLandingListUrlHomePage);
}

function getHolidaytypesLandingPage() {
  return fetchWrapper.get(holidaytypesLandingPageUrl);
}

function getHolidaytypesLandingList() {
  return fetchWrapper.get(holidaytypesLandingListUrl);
}

function getHolidaytypeDetails(id) {
  // let id1 = 1;
  // https://mock.apidog.com/m1/379394-0-default/api/holiday-type-groups/1?populate[0]=holiday_type_group_images
  const holidaytypesDetailsUrl =
    `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups/` +
    id +
    `?populate[0]=holiday_type_group_images`;
  return fetchWrapper.get(holidaytypesDetailsUrl);
}

function getHolidaytypeDetailsById(id) {
  const holidaytypesDetailsUrl =
    `${publicRuntimeConfig.apiUrl}/api/holiday-types/` +
    id +
    `?populate[0]=holiday_type_images`;
  return fetchWrapper.get(holidaytypesDetailsUrl);
}

function getDictionaryDetails(matches, region) {
  // https://cms-api.excelleresolutions.com/api/website-country-contents?populate[0]=website_country&filters[content_word][$in][1]=holiday&filters[content_word][$in][2]=Holiday&filters[website_country][code][$eq]=US
  var tempUrl = `${publicRuntimeConfig.apiUrl}/api/website-country-contents?populate[0]=website_country`;

  matches.forEach((match, index, matches) => {
    // Use JavaScript string interpolation to replace the variable
    const inc = index + 1;
    const matchStr = match.replace(/{|}/g, "");
    if (index === matches.length - 1) {
      tempUrl =
        tempUrl +
        "&filters[content_word][$in][" +
        inc +
        "]=" +
        matchStr +
        "&filters[website_country][code][$eq]=" +
        region;
    } else {
      tempUrl =
        tempUrl + "&filters[content_word][$in][" + inc + "]=" + matchStr;
    }
  });

  if (tempUrl) {
    return fetchWrapper.get(tempUrl);
  }
}
