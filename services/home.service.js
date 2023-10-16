import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl1}/api/marketing-clients`;

export const homeService = {
    // inspireMe,
    signUp
};

// function inspireMe(inspiremeData) {
//     return fetchWrapper.post(`${baseUrl}`, inspiremeData);
// }

function signUp(signUpData) {
    let postdata = signUpData;
    postdata.emailpage = 'newsletter';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
    // return fetchWrapper.post(`${baseUrl}`, signUpData);
}
