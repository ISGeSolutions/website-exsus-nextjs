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

function getAllOffers() {
  const specialoffersUrl = `${publicRuntimeConfig.apiUrl}/api/special-offers?populate[0]=hotel&populate[hotel][fields][0]=hotel_code&populate[hotel][fields][1]=hotel_name&populate[hotel][populate][country][fields][2]=country_code&populate[hotel][populate][country][fields][3]=country_name&populate[hotel][populate][region][fields][4]=region_code&populate[hotel][populate][region][fields][5]=region_name&populate[hotel][populate][country][populate][destination][fields][6]=destination_code&populate[hotel][populate][country][populate][destination][fields][7]=destination_name`;
  return fetchWrapper.get(specialoffersUrl);
}

function getOffersCustomePage() {
  const specialoffersUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=offers`;
  return fetchWrapper.get(specialoffersUrl);
}
