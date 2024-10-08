import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();
// const whyusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;

export const whyusService = {
  getAll,
  getById,
  getWhyusPage,
  getAllExecutives,
  getExecutivesById,
  getAllTravelReviews,
  getAllDestinationTravelReviews,
  getExsusReviews,
  getAllReviews,
  getAllHomeTravelReviews,
  getExpertsPage,
  getReviewsCustomePage
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

function getWhyusPage() {
  //  ('baseUrl_dropdown', baseUrl_dropdown);
  const whyusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[page_code][$eq]=Why-us&populate[0]=custom_page_images&populate[1]=custom_page_contents`;
  return fetchWrapper.get(whyusPageUrl);
}

function getExsusReviews() {
  const exsusReviewsUrl = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?populate[0]=travel_executive`;
  return fetchWrapper.get(exsusReviewsUrl);
}

function getExecutivesById(name) {
  const whyusPageUrl = `${publicRuntimeConfig.apiUrl}/api/travel-executives?filters[executive_name][$eq]=${name}&populate[0]=travel_executive_contents&populate[1]=travel_reviews`;
  return fetchWrapper.get(whyusPageUrl);
}

function getAllExecutives() {
  //  ('baseUrl_dropdown', baseUrl_dropdown);
  const allExecutivesUrl = `${publicRuntimeConfig.apiUrl}/api/travel-executives?populate[0]=travel_executive_contents&populate[1]=travel_reviews`;
  return fetchWrapper.get(allExecutivesUrl);
}

function getAllTravelReviews() {
  const allReviews = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?populate[0]=travel_executive`;
  return fetchWrapper.get(allReviews);
}

function getAllDestinationTravelReviews() {
  const allReviews = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?filters[destination_page_ind][$eq]=true&sort[0]=destination_serial_number:asc`;
  return fetchWrapper.get(allReviews);
}

function getAllHomeTravelReviews() {
  const allReviews = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?populate[0]=travel_executive&filters[home_page_ind][$eq]=true&sort[0]=home_page_serial_number:asc`;
  return fetchWrapper.get(allReviews);
}

function getAllReviews() {
  const reviewsUrl = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?populate[0]=travel_executive`;
  return fetchWrapper.get(reviewsUrl);
}

function getExpertsPage() {
  const privacyPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=our-people`;
  return fetchWrapper.get(privacyPageUrl);
}

function getReviewsCustomePage() {
  const reviewsUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=Exsus-Reviews`;
  return fetchWrapper.get(reviewsUrl);
}
