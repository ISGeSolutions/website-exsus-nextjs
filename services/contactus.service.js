import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/enquiries`;
// const baseUrlBrochure = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;;

export const contactusService = {
    makeanenquiry,
    sendEnquiryMail
};

function sendEnquiryMail(contactusData) {
    let postdata = contactusData;
    postdata.emailpage = 'contactus';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
}

function makeanenquiry(brochureData) {
    if (brochureData.data.id) {
        brouchereData["email_flag"] = true;
        return fetchWrapper.put(`${baseUrlEnquiries}`, brochureData);
    } else {
        brochureData.data["email_flag"] = false;
        return fetchWrapper.post(`${baseUrlEnquiries}`, brochureData);
    }
}


