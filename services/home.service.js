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
    return fetchWrapper.post(`${baseUrl}`, signUpData);
}
