import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";
let region = "uk";
if (typeof window !== "undefined") {
  if (window && window.site_region) {
    region = window.site_region;
    // setMyVariable(window.site_region);
  }
}
const { publicRuntimeConfig } = getConfig();

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const specialoffersService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getAllOffers,
  getOffersCustomePage,
};

function getAllOffers(region) {
  const specialoffersUrl = `${publicRuntimeConfig.apiUrl}/api/special-offers?populate[0]=hotel&populate[hotel][populate][country][fields][0]=country_code&populate[hotel][populate][country][fields][1]=country_name&populate[hotel][populate][region][fields][2]=region_code&populate[hotel][populate][region][fields][3]=region_name&populate[hotel][populate][destination][fields][0]=destination_code&populate[hotel][populate][destination][fields][1]=destination_name&populate[hotel][populate][hotel_country_contents][filters][website_country][$eq]=${region}`;
  return fetchWrapper.get(specialoffersUrl);
}

function getOffersCustomePage() {
  const specialoffersUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=offers`;
  return fetchWrapper.get(specialoffersUrl);
}
