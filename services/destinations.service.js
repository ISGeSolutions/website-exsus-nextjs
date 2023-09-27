import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
let region = 'uk';
if (typeof window !== 'undefined') {
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

// console.log('publicRuntimeConfig.apiUrl', publicRuntimeConfig);
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const destinationService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    getAll,
    getById,
    getAllDropdown,
    getDestinationLandingPage,
    getDestinationLandingList,
    getDestinationDetails,
    getAllItineraries,
    getItineraryDetails,
    getItinerariesByDestination
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
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages-destinations`;
    return fetchWrapper.get(destinationLandingPageUrl);
}

function getDestinationLandingList() {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?fields[0]=destination_code&fields[1]=destination_name&populate[destination_images][fields][2]=image_path&populate[destination_images][fields][3]=image_type&populate[countries][fields][4]=country_code&populate[countries][fields][5]=country_name`;
    return fetchWrapper.get(destinationLandingListUrl);

    // const destinationLandingListUrl = 'https://my.baileyrobinson.com/mydhruvapi/api/v1/mydhruv/Authentication/gettoken/BRGMDA2023';
    // console.log('destinationLandingListUrl', destinationLandingListUrl);

    // const obj = {
    //     emailid: "shivam@isgesolutions.com",
    //     password: "test"
    // }
    // return fetchWrapper.post(destinationLandingListUrl, obj);
}

function getDestinationDetails(id) {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/destinations/` + id + `?populate=destination_images,countries.country_images`;
    return fetchWrapper.get(destinationDetailsUrl);
}

function getItinerariesByDestination(id, page) {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    const destinationDetailsUrl =
        `${publicRuntimeConfig.apiUrl}/api/destinations/` +
        id +
        `?populate[0]=itineraries.itinerary_images&pagination[page]=${page}&pagination[pageSize]=9`;
    return fetchWrapper.get(destinationDetailsUrl);
}

function getAllItineraries(page) {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries?populate[itinerary_images][fields][0]=image_path&populate[itinerary_images][fields][1]=image_type&populate[itinerary_country_contents][filters][website_country][$eq]=${region}&pagination[page]=${page}&pagination[pageSize]=9`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}
function getItineraryDetails() {
    const itinerariesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/itineraries/1?populate[0]=itinerary_details&filters[itin_code]=0000000348`;
    return fetchWrapper.get(itinerariesDetailsUrl);
}




