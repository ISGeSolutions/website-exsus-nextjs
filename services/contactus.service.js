import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/email_api`;
// const baseUrlBrochure = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;;

export const contactusService = {
    makeanenquiry,
    sendEnquiryMail
};

function sendEnquiryMail(contactusData) {
    let postdata = contactusData;
    postdata.emailpage = 'makeAnEnquiry';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
}

function makeanenquiry(brochureData) {
    if (brochureData.data.id) {
        brouchereData["email_flag"] = true;
        return fetchWrapper.put(`${baseUrlEnquiries}`, brochureData);
    } else {
        brochureData["email_flag"] = false;
        return fetchWrapper.post(`${baseUrlEnquiries}`, brochureData);
    }
}


