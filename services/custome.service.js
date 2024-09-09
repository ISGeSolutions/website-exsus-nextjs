import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();

export const customeService = {
  getTravelInformation,
  getAdvanceSearch,
};

function getTravelInformation() {
  const travelInformationUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=Useful-Links`;
  return fetchWrapper.get(travelInformationUrl);
}

function getAdvanceSearch() {
  const travelInformationUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=Advanced-search`;
  return fetchWrapper.get(travelInformationUrl);
}

function getWhereToGoDetails(monthName) {
  const travelInformationUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=${monthName?.toLowerCase()}`;
  return fetchWrapper.get(travelInformationUrl);
}

