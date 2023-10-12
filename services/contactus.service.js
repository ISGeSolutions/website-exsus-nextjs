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
    let postdata = contactusData;
    postdata.emailpage = 'contactus';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
}

function brochureRequest(brochureData) {
    return fetchWrapper.post(`${baseUrlBrochure}`, brochureData);
}


