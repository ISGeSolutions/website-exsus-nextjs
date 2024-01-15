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
  getPropertyTypeDropDown,
  getMoreItineraries,
  ItineraryFilterOnDestItineraryDetail,
};

function getAllDropdown() {
  // console.log('baseUrl_dropdown', baseUrl_dropdown);
  // return fetchWrapper.get(baseUrl_dropdown);
}

function getAll() {
  // console.log('baseUrl', baseUrl);
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
  const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?filters[main_page_ind][$eq]=true&fields[0]=destination_code&fields[1]=destination_name&fields[2]=serial_number&populate[destination_images][fields][2]=image_path&populate[destination_images][fields][3]=image_type&populate[countries][fields][4]=country_code&populate[countries][fields][5]=country_name&populate[countries][fields][6]=serial_number&populate[countries][sort][0]=serial_number&populate[countries][filters][serial_number][$gt]=0&sort[0]=main_page_serial_number`;
  return fetchWrapper.get(destinationLandingListUrl);
}

function getDestinationInspireMe() {
  const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?filters[main_page_ind][$eq]=true&fields[0]=destination_code&fields[1]=destination_name&populate[destination_images][fields][2]=image_path&populate[destination_images][fields][3]=image_type&populate[countries][fields][4]=country_code&populate[countries][fields][5]=country_name&fields[6]=main_page_ind&fields[7]=main_page_serial_number`;
  return fetchWrapper.get(destinationLandingListUrl);
}

function getDestinationDetails(name) {
  // console.log('baseUrl_dropdown', baseUrl_dropdown);
  const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/destinations?filters[destination_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[destination_images][filters][image_type][$eq]=banner&populate[countries][filters][popular_ind][$eq]=true&populate[countries][sort][0]=popular_serial_no&populate[countries][fields][3]=country_name&populate[countries][populate][4]=country_images&populate[countries][populate][country_images][filters][image_type][$eq]=thumbnail`;
  return fetchWrapper.get(destinationDetailsUrl);
}

function getAllItineraries(page, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getAllRegionItineraries(page, name, item, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[region][region_name][$eq]=${name.replace(
      /&/g,
      "%26"
    )}&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getItinerariesInspireMe(page, destination, reason, month, region) {
  // Initialize an empty array to store the filters
  const filters = [];

  // Conditionally add filters based on UI parameters
  if (destination) {
    filters.push(
      `[filters][destination][destination_code][$eq]=${destination}`
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
    `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&populate[holiday_type_groups][fields][2]=holiday_type_group_code&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getAllItinerariesHomePage(region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?filters[home_page_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      .replace(/&/g, "%26")
      .replace(
        /in/g,
        "INDIA"
      )}&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getFavIti() {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
      /&/g,
      "%26"
    )}&pagination[page]=1&pagination[pageSize]=6&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getDestinationFavItineraries(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?filters[destination][destination_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&filters[destination_favourite_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      .replace(/&/g, "%26")
      .replace(
        /in/g,
        "INDIA"
      )}&sort[0]=country_favourite_serial_number&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getCountryFavItineraries(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?filters[country][country_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&filters[country_favourite_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      .replace(/&/g, "%26")
      .replace(
        /in/g,
        "INDIA"
      )}&sort[0]=country_favourite_serial_number&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getCountryFavHotels(name, region) {
  const hotelsDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/hotels?filters[country][country_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&filters[country_favourite_ind][$eq]=true&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country][$eq]=${region}&sort[0]=country_favourite_serial_number&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
  return fetchWrapper.get(hotelsDetailsUrl);
}

function getItineraryDetails(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?populate[0]=itinerary_details&filters[friendly_url]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
      /in/g,
      "INDIA"
    )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name&populate[itinerary_details]=itinerary_details`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getItinerariesByDestination(dcode, page, item, region) {
  if (item == "price") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][destination][destination_code][$eq]=${dcode.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        .replace(/&/g, "%26")
        .replace(
          /in/g,
          "INDIA"
        )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "recommended") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][destination][destination_code][$eq]=${dcode.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        .replace(/&/g, "%26")
        .replace(
          /in/g,
          "INDIA"
        )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "duration") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][destination][destination_code][$eq]=${dcode.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=no_of_nites:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "alphabetical") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][destination][destination_code][$eq]=${dcode.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        .replace(/&/g, "%26")
        .replace(
          /in/g,
          "INDIA"
        )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=itin_name:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  }

  // console.log('baseUrl_dropdown', baseUrl_dropdown);
}

function getCountryWiseItinerary(name, page, item, region) {
  if (item == "price") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[country][country_name][$eq]=${name.replace(
        /&/g,
        "%26"
      )}&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "recommended") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[country][country_name][$eq]=${name.replace(
        /&/g,
        "%26"
      )}&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "duration") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&filters[country][country_name][$eq]=${name.replace(
        /&/g,
        "%26"
      )}&sort[0]=no_of_nites:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  } else if (item == "alphabetical") {
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12&filters[country][country_name][$eq]=${name.replace(
        /&/g,
        "%26"
      )}&sort[0]=itin_name:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(destinationDetailsUrl);
  }

  // console.log('baseUrl_dropdown', baseUrl_dropdown);
}

function getMoreItineraries(country, region) {
  const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region
      .replace(/&/g, "%26")
      .replace(
        /in/g,
        "INDIA"
      )}&filters[country][country_name][$eq]=${country.replace(
        /&/g,
        "%26"
      )}&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
  return fetchWrapper.get(destinationDetailsUrl);
}

function getAllHotels(page, item, decode, region) {
  if (item == "recommended") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][destination][destination_code][$eq]=${decode}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region.replace(
        /in/g,
        "INDIA"
      )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?[filters][destination][destination_code][$eq]=${decode}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country]=${region.replace(
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

function getRegionWiseHotels(page, name, filter, region) {
  if (filter == "recommended") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?filters[region][region_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&pagination[page]=${page}&populate[hotel_country_contents][filters][website_country]=${region}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (filter == "alphabetical") {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
      }/api/hotels?filters[region][region_name][$eq]=${name?.replace(
        /&/g,
        "%26"
      )}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&populate[hotel_country_contents][filters][website_country]=${region}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getRegionWiseHotelsInHotelDetail(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/hotels?filters[region][region_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[1]=hotel_travel_times&populate[hotel_country_contents][filters][website_country]=${region
      .replace(/&/g, "%26")
      .replace(
        /in/g,
        "INDIA"
      )}&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getCustomPagesData(pageName) {
  const customPage = `${publicRuntimeConfig.apiUrl
    }/api/custom-pages?filters[page_code][$eq]=${pageName.replace(
      /&/g,
      "%26"
    )}&[populate][0]=custom_page_images&populate[1]=custom_page_contents`;
  return fetchWrapper.get(customPage);
}

function getRegions(countryName) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/countries?filters[country_name][$eq]=${countryName?.replace(
      /&/g,
      "%26"
    )}&populate[0]=destination&populate[1]=regions.region_images`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getHotelById(name, region) {
  const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl
    }/api/hotels?filters[friendly_url][$eq]=${name}&populate[hotel_images][fields][0]=image_path&populate[hotel_images][fields][1]=image_type&populate[hotel_country_contents][filters][website_country][$eq]=${region
      .replace(/&/g, "%26")
      .replace(
        /in/g,
        "INDIA"
      )}&populate[hotel_travel_times]=hotel_travel_times&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name&populate[special_offers]=special-offers`;
  return fetchWrapper.get(itinerariesDetailsUrl);
}

function getItinerariesInAdvanceSearch(dcode, page, region, item) {
  if (item == "duration") {
    const destinationadvanceSearchUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][destination][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=no_of_nites:asc&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&populate[region][fields][0]=region_name`;
    return fetchWrapper.get(destinationadvanceSearchUrl);
  } else if (item == "Low-High") {
    const destinationadvanceSearchUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][destination][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=price:asc`;
    return fetchWrapper.get(destinationadvanceSearchUrl);
  } else if (item == "High-Low") {
    const destinationadvanceSearchUrl = `${publicRuntimeConfig.apiUrl
      }/api/itineraries?[filters][destination][destination_code][$eq]=${dcode?.replace(
        /&/g,
        "%26"
      )}&populate[itinerary_country_contents][filters][website_country][$eq]=${region.replace(
        /in/g,
        "INDIA"
      )}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=price:des`;
    return fetchWrapper.get(destinationadvanceSearchUrl);
  }
}

function getRegionByName(name) {
  const regionsURL = `${publicRuntimeConfig.apiUrl
    }/api/regions?filters[region_name][$eq]=${name?.replace(
      /&/g,
      "%26"
    )}&populate[0]=region_images&populate[1]=country`;
  return fetchWrapper.get(regionsURL);
}

function getDictionaryDetails(matches, region) {
  debugger;
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
  page
) {
  const filters = [];

  // Conditionally add filters based on UI parameters
  if (countries.length > 0) {
    const filterValues = countries.map((country) => country.value);

    // Combine the filter values using commas
    const combinedFilterValues = filterValues.join(",").replace(/&/g, "%26");
    filters.push(
      `[filters][country][country_name][$eq]=${combinedFilterValues}`
    );
  }

  if (months.length > 0) {
    const filterValues = months.map((month) => month.value);

    // Combine the filter values using commas
    const combinedFilterValues = filterValues.join(",");
    filters.push(
      `[filters][itinerary_travel_times][travel_time_month][$eq]=${combinedFilterValues}`
    );
  }

  if (reasons) {
    const filterValuesForReasons = reasons.map((reason) => reason.value);
    filters.push(
      `[filters][best_for_text][$contains]=${filterValuesForReasons}`
    );
  }

  if (item == "price") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl}/api/itineraries` +
      (filters.length > 0 ? "?" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        .replace(/&/g, "%26")
        .replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "recommended") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl}/api/itineraries` +
      (filters.length > 0 ? "?" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        .replace(/&/g, "%26")
        .replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "duration") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl}/api/itineraries` +
      (filters.length > 0 ? "?" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        .replace(/&/g, "%26")
        .replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&sort[0]=no_of_nites:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  } else if (item == "alphabetical") {
    const itinerariesDetailsUrl =
      `${publicRuntimeConfig.apiUrl}/api/itineraries` +
      (filters.length > 0 ? "?" + filters.join("&") : "") +
      `&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&&populate[itinerary_country_contents][filters][website_country][$eq]=${region
        .replace(/&/g, "%26")
        .replace(
          /in/g,
          "INDIA"
        )}&pagination[page]=${page}&pagination[pageSize]=12&populate[destination][fields][0]=destination_name&populate[country][fields][0]=country_name&sort[0]=itin_name:asc`;
    return fetchWrapper.get(itinerariesDetailsUrl);
  }
}

function getPropertyTypeDropDown() {
  const regionDropDownData = `${publicRuntimeConfig.apiUrl}/api/property-types`;
  return fetchWrapper.get(regionDropDownData);
}
