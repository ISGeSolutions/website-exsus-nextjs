import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/holiday_types`;
const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=holiday-types`;
// const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_page`;

// const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types?fields[0]=holiday_type_code&fields[1]=holiday_type_name&populate[holiday_type_images][fields][2]=image_path&populate[holiday_type_images][fields][3]=image_type`;
// const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_list`;
const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups?filters[main_page_ind][$eq]=true&fields[0]=holiday_type_group_code&fields[1]=holiday_type_group_name&populate[holiday_type_group_images][fields][2]=image_path&populate[holiday_type_group_images][fields][3]=image_type&populate[holiday_type_group_images][filters][image_type][$eq]=thumbnail&populate[holiday_types][fields][4]=holiday_type_code&populate[holiday_types][fields][5]=holiday_type_name&fields[6]=main_page_ind&fields[7]=serial_number&sort[0]=serial_number:asc`;
const holidaytypesLandingListUrlHomePage = `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups?fields[0]=holiday_type_group_code&fields[1]=holiday_type_group_name&fields[2]=home_page_short_text&fields[3]=home_page_title&populate[holiday_type_group_images][fields][2]=image_path&populate[holiday_type_group_images][fields][3]=image_type&populate[holiday_type_group_images][filters][image_type][$eq]=thumbnail&populate[holiday_types][fields][4]=holiday_type_code&populate[holiday_types][fields][5]=holiday_type_name&fields[6]=home_page_ind&fields[7]=home_page_serial_number&filters[home_page_ind][$eq]=true`;

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
  getItinerariesByHolidayTypeGroup,
  getItinerariesByHolidayTypes,
  getDestinationDropDown,
  getItinerariesByDestinations,
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

function getHolidaytypeDetails(groupName) {
  // let id1 = 1;
  // https://mock.apidog.com/m1/379394-0-default/api/holiday-type-groups/1?populate[0]=holiday_type_group_images
  const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups?filters[holiday_type_group_name][$eq]=${groupName}&populate[0]=holiday_type_group_images`;
  return fetchWrapper.get(holidaytypesDetailsUrl);
}

function getHolidaytypeDetailsById(typeName) {
  const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types?filters[holiday_type_name][$eq]=${typeName}&populate[0]=holiday_type_images`;
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

function getItinerariesByHolidayTypeGroup(page, name, region, item) {
  if (item == "price") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_type_groups][holiday_type_group_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&sort[0]=price:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "recommended") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_type_groups][holiday_type_group_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_type_groups][holiday_type_group_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&sort[0]=itin_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "duration") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_type_groups][holiday_type_group_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&sort[0]=no_of_nites:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getItinerariesByHolidayTypes(page, name, region, item) {
  if (item == "recommended") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_types][holiday_type_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "price") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_types][holiday_type_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "duration") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_types][holiday_type_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&sort[0]=no_of_nites:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[holiday_types][holiday_type_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&sort[0]=itin_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getDestinationDropDown() {
  const destinationDropDownData = `${publicRuntimeConfig.apiUrl}/api/destinations?filters[main_page_ind][$eq]=true`;
  return fetchWrapper.get(destinationDropDownData);
}

function getItinerariesByDestinations(page, destinationArray, region, item) {
  // Initialize an empty array to store the filters
  const filters = [];
  if (destinationArray[0] != "Show_all") {
    destinationArray?.forEach((destination, index) => {
      filters.push(
        `[filters][destination][destination_code][$in][${index + 1}]=${destination}`
      );
    });
  }


  // Construct the final API call URL
  let itinerariesDetailsUrl =
    `${publicRuntimeConfig.apiUrl}/api/itineraries` +
    (filters.length > 0 ? "?" + filters?.join("&") : "?") +
    `populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
      /in/g,
      "INDIA"
    )}&pagination[page]=${page}&pagination[pageSize]=12&populate[holiday_type_groups][fields][2]=holiday_type_group_code&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  if (item == "price") {
    itinerariesDetailsUrl = `${itinerariesDetailsUrl}`;
  } else if (item == "recommended") {
    itinerariesDetailsUrl = `${itinerariesDetailsUrl}`;
  } else if (item == "duration") {
    itinerariesDetailsUrl = `${itinerariesDetailsUrl}&sort[0]=no_of_nites:asc`;
  } else if (item == "alphabetical") {
    itinerariesDetailsUrl = `${itinerariesDetailsUrl}&sort[0]=itin_name:asc`;
  }
  return fetchWrapper.get(itinerariesDetailsUrl);
}
