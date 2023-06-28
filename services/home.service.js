import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/inspireMe`;

export const homeService = {
    inspireMe
};

function inspireMe(inspiremeData) {
    return fetchWrapper.post(`${baseUrl}`, inspiremeData);
}
