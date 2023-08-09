import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl_dropdown = `${publicRuntimeConfig.apiUrl}/destinations_dropdown`;

const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;
// const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/destination_landing_page`;

const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/destinations?fields[0]=destination_code&fields[1]=destination_name&populate[0]=destination_images`;
// const destinationLandingListUrl = `${publicRuntimeConfig.apiUrl}/destination_landing_list`;

const destinationDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/destinations/1?populate[0]=destination_images`;
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
    getDestinationDetails
};

function getAllDropdown() {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    return fetchWrapper.get(baseUrl_dropdown);
}

function getAll() {
    // console.log('baseUrl', baseUrl);
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getDestinationLandingPage() {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    return fetchWrapper.get(destinationLandingPageUrl);
}

function getDestinationLandingList() {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    return fetchWrapper.get(destinationLandingListUrl);
}

function getDestinationDetails() {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    return fetchWrapper.get(destinationDetailsUrl);
}

