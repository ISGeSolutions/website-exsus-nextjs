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
  const countryPageUrl = `${publicRuntimeConfig.apiUrl}/api/countries?filters[country_name][$eq]=${country_name?.replace(/&/g, "%26")}&populate[0]=country_images&populate[1]=country_month_activities&populate[3]=regions`;
  return fetchWrapper.get(countryPageUrl);
}
