import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/countries`;

// export const destiantionsService = {
//     getDestinationsList
// };

// function getDestinationsList() {
//     return fetchWrapper.get(`${baseUrl}`);
// }

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const countriesService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getAll,
  getCountryDetails,
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getCountryDetails(country_name) {
  const countryPageUrl = `${publicRuntimeConfig.apiUrl}/api/countries?filters[country_name][$eq]=${country_name?.replace(/ & /g, " %26 ")?.replace(/ and /g, " %26 ")}&populate[country_images]=true&populate[country_month_activities]=true&&populate[regions][sort][0]=serial_number&populate[regions][filters][show_on_web_ind][$eq]=true&populate[regions][populate]=region_images`;
  return fetchWrapper.get(countryPageUrl);
}
