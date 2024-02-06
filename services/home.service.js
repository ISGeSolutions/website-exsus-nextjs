import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const homeService = {
    // inspireMe,
    signUp,
    saveDataToDB,
    getAllWebsiteContent,
    getCustomPagesData
};

// function inspireMe(inspiremeData) {
//     return fetchWrapper.post(`${baseUrl}`, inspiremeData);
// }

function saveDataToDB(signUpData) {
    if (signUpData?.data?.id) {
        signUpData.data.attributes.email_sent_ind = true;
        let data = { data: signUpData.data.attributes }
        let saveEmailUrl = `${baseUrl}/api/enquiries/${signUpData?.data?.id}`;
        return fetchWrapper.put(`${saveEmailUrl}`, data);
    } else {
        let saveEmailUrl = `${baseUrl}/api/enquiries`;
        return fetchWrapper.post(`${saveEmailUrl}`, signUpData);
    }
}

function signUp(signUpData) {
    let postdata = signUpData;
    postdata.emailpage = 'newsletter';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
    // return fetchWrapper.post(`${baseUrl}`, signUpData);
}

function getAllWebsiteContent(region, page) {
    const websitecontentUrl = `${publicRuntimeConfig.apiUrl}/api/website-country-contents?populate[0]=website_country&filters[website_country][code][$eq]=${region?.replace(
        /in/g,
        "INDIA"
    )}&pagination[page]=${page}&pagination[pageSize]=100`;
    return fetchWrapper.get(websitecontentUrl);
}

function getCustomPagesData(pageName) {
    const customPage = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[page_code][$eq]=${pageName}&[populate][0]=custom_page_images&populate[1]=custom_page_contents`;
    return fetchWrapper.get(customPage);
}