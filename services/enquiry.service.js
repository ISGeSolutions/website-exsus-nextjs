import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/api/email_api`;
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/enquiries`;

export const enquiryService = {
    makeanenquiry,
    sendEnquiryMail
};

function sendEnquiryMail(contactusData) {
    let postdata = contactusData;
    postdata.emailpage = 'makeAnEnquiry';
    const currentUrl = window?.location?.origin + '/api/email_api   ';
    return fetchWrapper.post(`${currentUrl}`, postdata);
}

function makeanenquiry(enquiryData) {
    // if (brochureData.data.id) {
    return fetchWrapper.post(`${baseUrlEnquiries}`, enquiryData);
    // } else {
    //     return fetchWrapper.post(`${baseUrlEnquiries}`, brochureData);
    // }
}


