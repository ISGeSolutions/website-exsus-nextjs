import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";
import { func } from "prop-types";
let region = "uk";
if (typeof window !== "undefined") {
  if (window && window.site_region) {
    region = window.site_region;
    // setMyVariable(window.site_region);
  }
}
const { publicRuntimeConfig } = getConfig();
const baseUrl_dropdown = `${publicRuntimeConfig.apiUrl}/destinations_dropdown`;

const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;
// const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/destination_landing_page`;

const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?fields[0]=destination_code&fields[1]=destination_name&populate[0]=destination_images`;
// const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/destination_landing_list`;
// const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/destination_list_with_images`;

// const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/destinations/1?populate[0]=destination_images`;
// const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/destination_details`;

const baseUrl = `${publicRuntimeConfig.apiUrl}/destinations`;

// export const destiantionsService = {
//     getDestinationsList
// };

// function getDestinationsList() {
//     return fetchWrapper.get(`${baseUrl}`);
// }

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const destinationService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getAll,
  getById,
  getRegionWiseHotels,
  getAllDropdown,
  getDestinationLandingPage,
  getDestinationLandingList,
  getDestinationDetails,
  getAllItineraries,
  getItineraryDetails,
  getItinerariesByDestination,
  getAllHotels,
  getAllItinerariesHomePage,
  getCustomPagesData,
  getRegions,
  getHotelById,
  getItinerariesInAdvanceSearch,
  getDestinationInspireMe,
  getRegionByName,
  getDictionaryDetails,
  getCustomeData,
  getItinerariesInspireMe,
  getAllCountryWiseHotels,
  getCountryWiseItinerary,
  getDestinationFavItineraries,
  getAllRegionItineraries,
  getCountryFavItineraries,
  getCountryFavHotels,
  getRegionWiseHotelsInHotelDetail,
  getRegionWiseItinerariesInHotelDetail,
  getPropertyTypeDropDown,
  getMoreItineraries,
  ItineraryFilterOnDestItineraryDetail,
  ItineraryFilterOnCountryDetail,
  hotelFilterOnContinentPlaceToStay,
  hotelFilterOnCountryPlaceToStay,
  ItineraryFilterOnRegionDetail,
  HotelFilterOnRegionDetail,
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

function getDestinationLandingPage() {
  const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages-destinations`;
  return fetchWrapper.get(destinationLandingPageUrl);
}

function getDestinationLandingList() {
  const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?filters[main_page_ind][$eq]=true&fields[0]=destination_code&fields[1]=destination_name&fields[2]=serial_number&fields[3]=friendly_url&populate[destination_images][fields][2]=image_path&populate[destination_images][fields][3]=image_type&populate[countries][fields][4]=country_code&populate[countries][fields][5]=country_name&populate[countries][fields][6]=serial_number&populate[countries][sort][0]=serial_number&populate[countries][filters][serial_number][$gt]=0&sort[0]=main_page_serial_number`;
  return fetchWrapper.get(destinationLandingListUrl);
}

function getDestinationInspireMe() {
  const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?filters[main_page_ind][$eq]=true&fields[0]=destination_code&fields[1]=destination_name&populate[destination_images][fields][2]=image_path&populate[destination_images][fields][3]=image_type&populate[countries][fields][4]=country_code&populate[countries][fields][5]=country_name&fields[6]=main_page_ind&fields[7]=main_page_serial_number`;
  return fetchWrapper.get(destinationLandingListUrl);
}

function getDestinationDetails(name) {
  //  ('baseUrl_dropdown', baseUrl_dropdown);
  const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/destinations?filters[friendly_url][$eq]=${name}&populate[destination_images][filters][0][image_type][$eq]=banner&populate[destination_images][filters][show_on_web_ind][$eq]=true&populate[countries][sort]=recommended_serial_number&populate[countries][populate][country_images][filters][image_type][$eq]=thumbnail`;
  return fetchWrapper.get(destinationDetailsUrl);
}

function getAllItineraries(page, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getAllRegionItineraries(page, name, item, region) {
  if (item == "recommended") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=itin_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "duration") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=no_of_nites:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "price") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name12&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getItinerariesInspireMe(page, destination, reason, month, region) {
  // Initialize an empty array to store the filters
  const filters = [];

  // Conditionally add filters based on UI parameters
  if (destination) {
    filters.push(
      `[filters][destinations][destination_code][$eq]=${destination}`
    );
  }

  if (month) {
    filters.push(
      `[filters][itinerary_travel_times][travel_time_month][$eq]=${month}`
    );
  }

  if (reason) {
    filters.push(
      `[filters][holiday_type_groups][holiday_type_group_code][$eq]=${reason}`
    );
  }

  // Construct the final API call URL
  const itinerariesDetailsUrl =
    `${publicRuntimeConfig.apiUrl}/api/itineraries` +
    (filters.length > 0 ? "?" + filters.join("&") : "") +
    `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&populate[holiday_type_groups][fields][2]=holiday_type_group_code&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getAllItinerariesHomePage(region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?filters[home_page_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      ?.replace(/&/g, "%26")
      ?.replace(
        /in/g,
        "INDIA"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getFavIti() {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
      /&/g,
      "%26"
    )}&pagination[page]=1&pagination[pageSize]=6&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getDestinationFavItineraries(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?filters[destinations][friendly_url][$eq]=${name}&filters[destination_favourite_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      ?.replace(/&/g, "%26")
      ?.replace(
        /in/g,
        "INDIA"
      )}&sort[0]=destination_favourite_serial_number&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getCountryFavItineraries(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?[filters][show_on_web_ind][$eq]=true&filters[countries][country_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&filters[country_favourite_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      ?.replace(/&/g, "%26")
      ?.replace(
        /in/g,
        "INDIA"
      )}&sort[0]=country_favourite_serial_number&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getCountryFavHotels(name, region) {
  const hotelsDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/hotels?filters[country][country_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&filters[country_favorite_ind][$eq]=true&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country][$eq]=${region}&sort[0]=country_favorite_serial_number&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
  return fetchWrapper.get(hotelsDetailsUrl);
}

function getItineraryDetails(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?populate[0]=itinerary_details&filters[friendly_url]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
      /in/g,
      "INDIA"
    )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&populate[regions][fields][0]=region_name&populate[itinerary_details]=itinerary_details`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getItinerariesByDestination(dcode, page, item, region) {
  if (item == "price") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:asc`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "recommended") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "duration") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=no_of_nites_notes:asc&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "alphabetical") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=itin_name:asc&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  }

  //  ('baseUrl_dropdown', baseUrl_dropdown);
}

function getCountryWiseItinerary(name, page, item, region) {
  if (item == "price") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:asc&filters[countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);

  } else if (item == "recommended") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "duration") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=no_of_nites:asc&filters[countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "alphabetical") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&sort[0]=itin_name:asc&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  }

  //  ('baseUrl_dropdown', baseUrl_dropdown);
}

function getMoreItineraries(country, region) {
  const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?[filters][show_on_web_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      ?.replace(/&/g, "%26")
      ?.replace(
        /in/g,
        "INDIA"
      )}&filters[countries][country_name][$eq]=${country?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(destinationDetailsUrl);
}

function getAllHotels(page, item, decode, region) {
  if (item == "recommended") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][destination][destination_code][$eq]=${decode}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][destination][destination_code][$eq]=${decode}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=hotel_name:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getAllCountryWiseHotels(page, item, name, region) {
  if (item == "recommended") {
    const countryHotelDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&populate[hotel_country_contents][filters][website_country]=${region}&pagination[page]=${page}&filters[country][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&pagination[pageSize]=12&sort[0]=hotel_name:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(countryHotelDetailsUrl);
  } else if (item == "alphabetical") {
    const countryHotelDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&pagination[page]=${page}&populate[hotel_country_contents][filters][website_country]=${region}&filters[country][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&sort[0]=hotel_name:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(countryHotelDetailsUrl);
  }
}

function getRegionWiseHotels(page, name, item, region) {
  if (item == "recommended") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?filters[region][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&pagination[page]=${page}&populate[hotel_country_contents][filters][website_country]=${region}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name&sort[0]=region_recommended_serial_number:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?filters[region][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&populate[hotel_country_contents][filters][website_country]=${region}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name&sort[0]=hotel_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getRegionWiseHotelsInHotelDetail(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/hotels?filters[region][region_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&populate[hotel_country_contents][filters][website_country]=${region
      ?.replace(/&/g, "%26")
      ?.replace(
        /in/g,
        "INDIA"
      )}&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getRegionWiseItinerariesInHotelDetail(region, name) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?[filters][show_on_web_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&filters[regions][region_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getCustomPagesData(pageName) {
  const customPage = `${publicRuntimeConfig.apiUrl
    }/api/custom-pages?filters[page_code][$eq]=${pageName?.replace(
      /&/g,
      "%26"
    )}&[populate][0]=custom_page_images&populate[1]=custom_page_contents`;
  return fetchWrapper.get(customPage);
}

function getRegions(countryName) {
  const regionDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/countries?filters[country_name][$eq]=${countryName?.replace(
      /&/g,
      "%26"
    )?.replace(/ and /g, " %26 ")}&populate[0]=destination&&populate[regions][sort][0]=serial_number&populate[regions][filters][show_on_web_ind][$eq]=true&populate[regions][populate]=region_images`;
  return fetchWrapper.get(regionDetailsUrl);
}

function getHotelById(name, region) {
  const hotelDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/hotels?filters[friendly_url][$eq]=${name}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country][$eq]=${region
      ?.replace(/&/g, "%26")
      ?.replace(
        /in/g,
        "INDIA"
      )}&populate[hotel_travel_times]=hotel_travel_times&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name&populate[special_offers]=special-offers`;
  return fetchWrapper.get(hotelDetailsUrl);
}

function getItinerariesInAdvanceSearch(
  dcode,
  dcodeReason,
  dcodeMonth,
  page,
  region,
  item
) {
  const filters = [];

  if (dcode) {
    filters.push(`[filters][destinations][destination_code][$eq]=${dcode}`);
  }

  if (dcodeMonth) {
    filters.push(
      `[filters][itinerary_travel_times][travel_time_month][$eq]=${dcodeMonth}`
    );
  }

  if (dcodeReason) {
    filters.push(
      `[filters][holiday_type_groups][holiday_type_group_code][$eq]=${dcodeReason}`
    );
  }
  if (item == "duration") {
    const destinationadvanceSearchUrl =
      `${publicRuntimeConfig.apiUrl}/api/itineraries` +
      (filters.length > 0 ? "?" + filters.join("&") : "") +
      `&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=no_of_nites_notes:asc&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&populate[regions][fields][0]=region_name`;
    return fetchWrapper.get(destinationadvanceSearchUrl);
  } else if (item == "asc") {
    const destinationadvanceSearchUrl =
      `${publicRuntimeConfig.apiUrl}/api/itineraries` +
      (filters.length > 0 ? "?" + filters.join("&") : "") +
      `&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:asc&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&populate[regions][fields][0]=region_name`;
    return fetchWrapper.get(destinationadvanceSearchUrl);
  } else if (item == "desc") {
    const destinationadvanceSearchUrl =
      `${publicRuntimeConfig.apiUrl}/api/itineraries` +
      (filters.length > 0 ? "?" + filters.join("&") : "") +
      `&populate[itinerary_country_contents][filters][website_country][$eq]=${region?.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:desc&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&populate[regions][fields][0]=region_name`;
    return fetchWrapper.get(destinationadvanceSearchUrl);
  }
}

function getRegionByName(name) {
  const regionsURL = `${publicRuntimeConfig.apiUrl
    }/api/regions?filters[friendly_url][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[0]=region_images&populate[1]=country`;
  return fetchWrapper.get(regionsURL);
}

function getDictionaryDetails(matches, region) {
  var tempUrl = `${publicRuntimeConfig.apiUrl}/api/website-country-contents?populate[0]=website_country`;
  let matchStr =
    typeof matches === "string"
      ? matches
      : Array.isArray(matches) && matches.length > 0
        ? matches[0]
        : "";
  // let output = input?.replace(/[{}]/g, '')
  matchStr = matchStr?.replace(/{|}/g, "");

  tempUrl =
    tempUrl +
    `&filters[content_word][$in]=${matchStr}&filters[website_country][code][$eq]=${region?.replace(
      /in/g,
      "INDIA"
    )}`;

  if (tempUrl) {
    return fetchWrapper.get(tempUrl);
  }
}

function getCustomeData() {
  const destinationCustomeData = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=destinations`;
  return fetchWrapper.get(destinationCustomeData);
}

function ItineraryFilterOnDestItineraryDetail(
  countries,
  reasons,
  months,
  item,
  region,
  page,
  dcode
) {
  const filters = [];

  // Conditionally add filters based on UI parameters
  if (countries.length > 0) {
    if (countries[0]?.value != "Show_all") {
      // const filterValues = countries.map((country) => country.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",")?.replace(/&/g, "%26");
      countries?.forEach((country, index) => {
        filters.push(
          `[filters][countries][country_name][$in][${index}]=${country.value}`
        );
      });
    }
  }

  if (months.length > 0) {
    if (months[0]?.value != "Show_all") {
      // const filterValues = months.map((month) => month.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",");
      months?.forEach((month, index) => {
        filters.push(
          `[filters][itinerary_travel_times][travel_time_month][$in][${index}]=${month.value}`
        );
      });
    }
  }

  if (reasons) {
    if (reasons[0]?.value != "Show_all") {
      //const filterValuesForReasons = reasons.map((reason) => reason.value);
      reasons?.forEach((reason, index) => {
        filters.push(
          `[filters][best_for_text][$contains][${index}]=${reason.value}`
        );
      });
    }
  }

  if (item == "price") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "recommended") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "duration") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[desti nations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=no_of_nites:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][destinations][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=itin_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function ItineraryFilterOnCountryDetail(
  regions,
  reasons,
  months,
  item,
  region,
  page,
  name
) {
  const filters = [];

  // Conditionally add filters based on UI parameters
  if (regions.length > 0) {
    if (regions[0]?.value != "Show_all") {
      // const filterValues = countries.map((country) => country.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",")?.replace(/&/g, "%26");
      regions?.forEach((regionss, index) => {
        filters.push(
          `[filters][regions][region_name][$in][${index}]=${regionss.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (reasons) {
    if (reasons[0]?.value != "Show_all") {
      //const filterValuesForReasons = reasons.map((reason) => reason.value);
      reasons?.forEach((reason, index) => {
        filters.push(
          `[filters][best_for_text][$contains][${index}]=${reason.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (months.length > 0) {
    if (months[0]?.value != "Show_all") {
      // const filterValues = months.map((month) => month.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",");
      months?.forEach((month, index) => {
        filters.push(
          `[filters][itinerary_travel_times][travel_time_month][$in][${index}]=${month.value}`
        );
      });
    }
  }

  if (item == "price") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "recommended") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "duration") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=no_of_nites:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][countries][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        ?.replace(/&/g, "%26")
        ?.replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=itin_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getPropertyTypeDropDown() {
  const regionDropDownData = `${publicRuntimeConfig.apiUrl}/api/property-types`;
  return fetchWrapper.get(regionDropDownData);
}

function hotelFilterOnContinentPlaceToStay(
  countries,
  reasons,
  months,
  item,
  region,
  page,
  dcode
) {
  const filters = [];

  // Conditionally add filters based on UI parameters
  if (countries.length > 0) {
    if (countries[0]?.value != "Show_all") {
      countries?.forEach((country, index) => {
        filters.push(
          `[filters][country][country_name][$in][${index}]=${country.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (months.length > 0) {
    if (months[0]?.value != "Show_all") {
      months?.forEach((month, index) => {
        filters.push(
          `[filters][hotel_travel_times][travel_time_month][$in][${index}]=${month.value}`
        );
      });
    }
  }

  if (reasons) {
    if (reasons[0]?.value != "Show_all") {
      //const filterValuesForReasons = reasons.map((reason) => reason.value);
      reasons?.forEach((reason, index) => {
        filters.push(
          `[filters][best_for_text][$contains][${index}]=${reason.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (item == "recommended") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl}/api/hotels?[filters][destination][destination_code][$eq]=${dcode}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl}/api/hotels?[filters][destination][destination_code][$eq]=${dcode}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=hotel_name:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function hotelFilterOnCountryPlaceToStay(
  regions,
  reasons,
  months,
  item,
  region,
  page,
  name
) {
  const filters = [];

  // Conditionally add filters based on UI parameters
  if (regions.length > 0) {
    if (regions[0]?.value != "Show_all") {
      // const filterValues = countries.map((country) => country.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",")?.replace(/&/g, "%26");
      regions?.forEach((regionss, index) => {
        filters.push(
          `[filters][region][region_name][$in][${index}]=${regionss.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (months.length > 0) {
    if (months[0]?.value != "Show_all") {
      // const filterValues = months.map((month) => month.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",");
      months?.forEach((month, index) => {
        filters.push(
          `[filters][hotel_travel_times][travel_time_month][$in][${index}]=${month.value}`
        );
      });
    }
  }

  if (reasons) {
    if (reasons[0]?.value != "Show_all") {
      //const filterValuesForReasons = reasons.map((reason) => reason.value);
      reasons?.forEach((reason, index) => {
        filters.push(
          `[filters][best_for_text][$contains][${index}]=${reason.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (item == "recommended") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][country][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][country][country_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region?.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=hotel_name:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function ItineraryFilterOnRegionDetail(
  regions,
  months,
  item,
  region,
  page,
  name
) {
  const filters = [];

  if (regions.length > 0) {
    if (regions[0]?.value != "Show_all") {
      // const filterValues = countries.map((country) => country.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",")?.replace(/&/g, "%26");
      regions?.forEach((regionss, index) => {
        filters.push(
          `[filters][regions][region_name][$in][${index}]=${regionss.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (months.length > 0) {
    if (months[0]?.value != "Show_all") {
      // const filterValues = months.map((month) => month.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",");
      months?.forEach((month, index) => {
        filters.push(
          `[filters][itinerary_travel_times][travel_time_month][$in][${index}]=${month.value}`
        );
      });
    }
  }

  if (item == "recommended") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][region_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][region_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=itin_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "duration") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][region_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=no_of_nites:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "price") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][show_on_web_ind][$eq]=true&[filters][regions][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[regions][region_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[destinations][fields][0]=destination_name&populate[countries][fields][0]=country_name&sort[0]=price${region !== "uk" ? "_" + region?.replace(/in/g, "india") : ""
      }:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function HotelFilterOnRegionDetail(regions, months, item, region, page, name) {
  const filters = [];
  if (regions.length > 0) {
    if (regions[0]?.value != "Show_all") {
      // const filterValues = countries.map((country) => country.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",")?.replace(/&/g, "%26");
      regions?.forEach((regionss, index) => {
        filters.push(
          `[filters][region][friendly_url][$in][${index}]=${regionss.value?.replace(
            /&/g,
            "%26"
          )}`
        );
      });
    }
  }

  if (months.length > 0) {
    if (months[0]?.value != "Show_all") {
      // const filterValues = months.map((month) => month.value);

      // // Combine the filter values using commas
      // const combinedFilterValues = filterValues.join(",");
      months?.forEach((month, index) => {
        filters.push(
          `[filters][hotel_travel_times][travel_time_month][$in][${index}]=${month.value}`
        );
      });
    }
  }

  if (item == "recommended") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][region][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&pagination[page]=${page}&populate[hotel_country_contents][filters][website_country]=${region}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][region][friendly_url][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}` +
      (filters.length > 0 ? "&" + filters.join("&") : "") +
      `&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&populate[hotel_country_contents][filters][website_country]=${region}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name&sort[0]=hotel_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}
