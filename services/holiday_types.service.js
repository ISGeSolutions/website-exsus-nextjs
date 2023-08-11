import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/holiday_types`;;

// const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[page_code][$eq]=holiday_types&populate[0]=custom_page_images`;
const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_page`;

// const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types?fields[0]=holiday_type_code&fields[1]=holiday_type_name&populate[holiday_type_images][fields][2]=image_path&populate[holiday_type_images][fields][3]=image_type`;
const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_list`;

// const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types/1?populate[0]=holiday_type_images`;
const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_details`;

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const holidaytypesService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    getAll,
    getById,
    getHolidaytypesLandingPage,
    getHolidaytypesLandingList,
    getHolidaytypeDetails
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getHolidaytypesLandingPage() {
    return fetchWrapper.get(holidaytypesLandingPageUrl);
}

function getHolidaytypesLandingList() {
    return fetchWrapper.get(holidaytypesLandingListUrl);
}

function getHolidaytypeDetails() {
    return fetchWrapper.get(holidaytypesDetailsUrl);
}
