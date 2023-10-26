import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl1}/api/marketing-clients`;

export const homeService = {
    // inspireMe,
    signUp,
    saveDataToDB,
    getAllWebsiteContent
};

// function inspireMe(inspiremeData) {
//     return fetchWrapper.post(`${baseUrl}`, inspiremeData);
// }

function saveDataToDB(signUpData) {
    if (signUpData.id) {
        signUpData.data["email_flag"] = true;
        let saveEmailUrl = `http://localhost:4000/email_records/${signUpData.id}`;
        return fetchWrapper.put(`${saveEmailUrl}`, signUpData);
    } else {
        let saveEmailUrl = `http://localhost:4000/email_records`;
        return fetchWrapper.post(`${saveEmailUrl}`, signUpData.data);
    }
}

function signUp(signUpData) {
    let postdata = signUpData;
    postdata.emailpage = 'newsletter';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
    // return fetchWrapper.post(`${baseUrl}`, signUpData);
}

function getAllWebsiteContent() {
    // https://cms-api.excelleresolutions.com/api/website-country-contents?populate[0]=website_country
    const websitecontentUrl = `${publicRuntimeConfig.apiUrl}/api/website-country-contents?populate[0]=website_country&pagination[pageSize]=1000`;

    return fetchWrapper.get(websitecontentUrl);
}
