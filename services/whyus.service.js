import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import { fetchWrapper } from 'helpers';
const { publicRuntimeConfig } = getConfig();
// const whyusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;

export const whyusService = {
    getAll,
    getById,
    getWhyusPage,
    getAllExecutives,
    getExecutivesById,
    getAllTravelReviews,
    getExsusReviews,
    getAllReviews
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
    const whyusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages/3?filters[page_code][$eq]=Why-us&populate[0]=custom_page_images`;
    return fetchWrapper.get(whyusPageUrl);
}

function getExsusReviews() {
    const exsusReviewsUrl = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?populate[0]=travel_executive`;
    return fetchWrapper.get(exsusReviewsUrl);
}

function getExecutivesById() {
    const whyusPageUrl = `${publicRuntimeConfig.apiUrl}/api/travel-executives/1?populate[0]=travel_executive_contents&populate[1]=travel_reviews`;
    return fetchWrapper.get(whyusPageUrl);
}


function getAllExecutives() {
    // console.log('baseUrl_dropdown', baseUrl_dropdown);
    const allExecutivesUrl = `${publicRuntimeConfig.apiUrl}/api/travel-executives?populate[0]=travel_executive_contents&populate[1]=travel_reviews`;
    return fetchWrapper.get(allExecutivesUrl);
}

function getAllTravelReviews() {
    const allReviews = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?populate[0]=travel_executive`;
    return fetchWrapper.get(allReviews);
}

function getAllReviews() {
    const reviewsUrl = `${publicRuntimeConfig.apiUrl}/api/travel-reviews?populate[0]=travel_executive`;
    return fetchWrapper.get(reviewsUrl);
}