import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl1}/api/marketing-clients`;

export const homeService = {
    // inspireMe,
    signUp,
    saveDataToDB
};

// function inspireMe(inspiremeData) {
//     return fetchWrapper.post(`${baseUrl}`, inspiremeData);
// }

function saveDataToDB(signUpData) {
    if (signUpData.id) {
        signUpData.data["email_flag"] = true;
        return fetchWrapper.put(`${baseUrl}`, signUpData);
    } else {
        return fetchWrapper.post(`${baseUrl}`, signUpData.data);
    }

}


function signUp(signUpData) {
    let postdata = signUpData;
    postdata.emailpage = 'newsletter';
    const currentUrl = window?.location?.origin + '/api/email_api';
    return fetchWrapper.post(`${currentUrl}`, postdata);
    // return fetchWrapper.post(`${baseUrl}`, signUpData);
}
