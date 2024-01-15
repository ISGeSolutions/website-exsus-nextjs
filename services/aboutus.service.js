import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();
// const aboutusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;

export const aboutusService = {
  getAll,
  getById,
  getAboutusPage,
  getDictionaryDetails,
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

function getAboutusPage() {
  //  ('baseUrl_dropdown', baseUrl_dropdown);
  const aboutusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[page_code][$eq]=About-us&populate[0]=custom_page_images&populate[1]=custom_page_contents`;
  return fetchWrapper.get(aboutusPageUrl);
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
