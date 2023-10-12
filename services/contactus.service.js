import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/enquiries`;
const baseUrlBrochure = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;;

const contactusEmailUrl = `${publicRuntimeConfig.apiUrl}/api/api_four`;

export const contactusService = {
    makeanenquiry,
    brochureRequest
};

function makeanenquiry(contactusData) {
    const currentUrl = window?.location?.origin + '/api/api_four';
    return fetchWrapper.post(`${currentUrl}`, contactusData);
}

function brochureRequest(brochureData) {
    return fetchWrapper.post(`${baseUrlBrochure}`, brochureData);
}


