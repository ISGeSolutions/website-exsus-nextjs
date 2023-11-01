import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;
// const baseUrlBrochure = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;;

export const brochureService = {
    saveDataToDB,
    sendBrochurerMail
};

function sendBrochurerMail(contactusData) {
    let postdata = contactusData;
    postdata.emailpage = 'contactus';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
}

function saveDataToDB(brochureData) {
    if (brochureData.data.id) {
        brouchereData["email_flag"] = true;
        return fetchWrapper.put(`${baseUrlEnquiries}`, brochureData);
    } else {
        brochureData["email_flag"] = false;
        return fetchWrapper.post(`${baseUrlEnquiries}`, brochureData);
    }
}


