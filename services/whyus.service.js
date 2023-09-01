import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import { fetchWrapper } from 'helpers';
const { publicRuntimeConfig } = getConfig();
// const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;

export const whyusService = {
    getAll,
    getById,
    getWhyusPage
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

function getWhyusPage() {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    const destinationLandingPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages/3?filters[page_code][$eq]=Why-us&populate[0]=custom_page_images`;
    return fetchWrapper.get(destinationLandingPageUrl);
}
