import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();
// const aboutusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;

export const creatintripsService = {
  getAll,
  getById,
  getCreatingTripPage,
};

function getAllDropdown() {
  //  ('baseUrl_dropdown', baseUrl_dropdown);
  // return fetchWrapper.get(baseUrl_dropdown);
}

function getAll() {
  //  ('baseUrl', baseUrl);
  // return fetchWrapper.get(baseUrl);
}

function getById(id) {
  // return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getCreatingTripPage() {
  const creatingTripsPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=Creating-Your-Trip`;
  return fetchWrapper.get(creatingTripsPageUrl);
}
