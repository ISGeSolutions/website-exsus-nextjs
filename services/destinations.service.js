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
    getRegionById,
    getDictionaryDetails
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
    const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?filters[main_page_ind][$eq]=true&fields[0]=destination_code&fields[1]=destination_name&populate[destination_images][fields][2]=image_path&populate[destination_images][fields][3]=image_type&populate[countries][fields][4]=country_code&populate[countries][fields][5]=country_name`;
    return fetchWrapper.get(destinationLandingListUrl);
}

function getDestinationInspireMe() {
    const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?filters[main_page_ind][$eq]=true&fields[0]=destination_code&fields[1]=destination_name&populate[destination_images][fields][2]=image_path&populate[destination_images][fields][3]=image_type&populate[countries][fields][4]=country_code&populate[countries][fields][5]=country_name&fields[6]=main_page_ind&fields[7]=main_page_serial_number`;
    return fetchWrapper.get(destinationLandingListUrl);
}

function getDestinationDetails(name) {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    const destinationDetailsUrl =
        `${publicRuntimeConfig.apiUrl}/api/destinations?filters[destination_name]=${name}&populate=destination_images,countries.country_images`;
    return fetchWrapper.get(destinationDetailsUrl);
}

function getAllItineraries(page) {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=12`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}

function getAllItinerariesHomePage() {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?filters[home_page_ind][$eq]=true&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=1&pagination[pageSize]=6`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}

function getFavIti() {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=1&pagination[pageSize]=6`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}

function getItineraryDetails(id, code) {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries/${id}?populate[0]=itinerary_details&filters[itin_code]=${code}`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}

function getItinerariesByDestination(dcode, page, item) {
    if (item == "price") {
        const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?[filters][destination][destination_code][$eq]=${dcode}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12`;
        return fetchWrapper.get(destinationDetailsUrl);

    } else if (item == "recommended") {
        const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?[filters][destination][destination_code][$eq]=${dcode}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12`;
        return fetchWrapper.get(destinationDetailsUrl);

    } else if (item == "duration") {
        const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?[filters][destination][destination_code][$eq]=${dcode}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=no_of_nites_notes:asc`;
        return fetchWrapper.get(destinationDetailsUrl);

    } else if (item == "alphabetical") {
        const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?[filters][destination][destination_code][$eq]=${dcode}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=itin_name:asc`;
        return fetchWrapper.get(destinationDetailsUrl);
    }

    // console.log('baseUrl_dropdown', baseUrl_dropdown);
}

function getAllHotels(page, item) {
    if (item == "recommended") {
        const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/hotels?populate[0]=hotel_images&populate[1]=hotel_travel_times&pagination[page]=${page}&pagination[pageSize]=12`;
        return fetchWrapper.get(itinerariesDetailsUrl);
    } else if (item == "alphabetical") {
        const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/hotels?populate[0]=hotel_images&populate[1]=hotel_travel_times&pagination[page]=${page}&pagination[pageSize]=12&sort[0]=hotel_name:asc`;
        return fetchWrapper.get(itinerariesDetailsUrl);
    }

}

function getCustomPagesData(pageName) {
    const customPage = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[page_code][$eq]=${pageName}&[populate][0]=custom_page_images`;
    return fetchWrapper.get(customPage);
}

function getRegions(countryName) {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/countries?filters[country_name][$eq]=${countryName}&populate[0]=destination&populate[1]=regions`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}

function getHotelById(id) {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/hotels/${id}?populate[0]=hotel_images&populate[1]=hotel_travel_times`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}

function getItinerariesInAdvanceSearch(dcode, page) {
    const destinationadvanceSearchUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?[filters][destination][destination_code][$eq]=${dcode}&populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&pagination[page]=${page}&pagination[pageSize]=12`;
    return fetchWrapper.get(destinationadvanceSearchUrl);
}

function getRegionById(id) {
    const regionsURL = `${publicRuntimeConfig.apiUrl}/api/regions/${id}?populate[0]=region_images&populate[1]=country`;
    return fetchWrapper.get(regionsURL);
}

function getDictionaryDetails(matches, region) {

    // https://cms-api.excelleresolutions.com/api/website-country-contents?populate[0]=website_country&filters[content_word][$in][1]=holiday&filters[content_word][$in][2]=Holiday&filters[website_country][code][$eq]=US
    var tempUrl = `${publicRuntimeConfig.apiUrl}/api/website-country-contents?populate[0]=website_country`;

    matches.forEach((match, index, matches) => {
        // Use JavaScript string interpolation to replace the variable
        const inc = (index + 1);
        const matchStr = match.replace(/{|}/g, '');
        if (index === matches.length - 1) {
            tempUrl = tempUrl + "&filters[content_word][$in][" + inc + "]=" + matchStr + "&filters[website_country][code][$eq]=" + region;
        } else {
            tempUrl = tempUrl + "&filters[content_word][$in][" + inc + "]=" + matchStr;
        }
    });

    if (tempUrl) {
        return fetchWrapper.get(tempUrl);
    }
}
