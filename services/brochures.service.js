import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;
// const baseUrlBrochure = `${publicRuntimeConfig.apiUrl}/api/brochure-requests`;;

export const brochureService = {
    saveDataToDB,
    sendBrochurerMail
};

function sendBrochurerMail(brochureData) {
    let postdata = brochureData;
    postdata.emailpage = 'brochureRequest';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
}

function saveDataToDB(brochureData) {
    // if (brochureData.data.id) {
    //     brouchereData["email_flag"] = true;
    return fetchWrapper.post(`${baseUrlEnquiries}`, brochureData);
    // } else {
    //     brochureData["email_flag"] = false;
    //     return fetchWrapper.post(`${baseUrlEnquiries}`, brochureData);
    // }
}


