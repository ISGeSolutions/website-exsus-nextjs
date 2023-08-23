import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/holiday_types`;;

const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[page_code][$eq]=holiday_types&populate[0]=custom_page_images`;
// const holidaytypesLandingPageUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_page`;

// const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types?fields[0]=holiday_type_code&fields[1]=holiday_type_name&populate[holiday_type_images][fields][2]=image_path&populate[holiday_type_images][fields][3]=image_type`;
// const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_landing_list`;
const holidaytypesLandingListUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups?fields[0]=holiday_type_group_code&fields[1]=holiday_type_group_name&populate[holiday_type_group_images][fields][2]=image_path&populate[holiday_type_group_images][fields][3]=image_type&populate[holiday_type_group_images][filters][image_type][$eq]=thumbnail&populate[holiday_types][fields][4]=holiday_type_code&populate[holiday_types][fields][5]=holiday_type_name`;

const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types/1?populate[0]=holiday_type_images`;
// const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/holiday_types_details`;

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const holidaytypesService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    getAll,
    getById,
    getHolidaytypesLandingPage,
    getHolidaytypesLandingList,
    getHolidaytypeDetails,
    getHolidaytypeDetailsById
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

function getHolidaytypeDetails(id) {
    let id1 = 1;
    // https://mock.apidog.com/m1/379394-0-default/api/holiday-type-groups/1?populate[0]=holiday_type_group_images
    const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-type-groups/` + id1 + `?populate[0]=holiday_type_group_images`;
    return fetchWrapper.get(holidaytypesDetailsUrl);
}

function getHolidaytypeDetailsById(id) {
    let id1 = 1;
    const holidaytypesDetailsUrl = `${publicRuntimeConfig.apiUrl}/api/holiday-types/` + id1 + `?populate[0]=holiday_type_images`;
    return fetchWrapper.get(holidaytypesDetailsUrl);
}
