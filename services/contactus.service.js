import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api/enquiries`;;

export const contactusService = {
    makeanenquiry
};

function makeanenquiry(contactusData) {
    return fetchWrapper.post(`${baseUrl}`, contactusData);
}
