import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/enquiries`;
const baseUrlBrochure = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;;

export const contactusService = {
    makeanenquiry,
    brochureRequest
};

function makeanenquiry(contactusData) {
    return fetchWrapper.post(`${baseUrlEnquiries}`, contactusData);
}

function brochureRequest(brochureData) {
    return fetchWrapper.post(`${baseUrlBrochure}`, brochureData);
}


