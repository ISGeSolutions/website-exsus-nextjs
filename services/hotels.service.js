import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl_dropdown = `${publicRuntimeConfig.apiUrl}/destinations_dropdown`;;

const baseUrl = `${publicRuntimeConfig.apiUrl}/destinations`;;

// export const destiantionsService = {
//     getDestinationsList
// };

// function getDestinationsList() {
//     return fetchWrapper.get(`${baseUrl}`);
// }

console.log('publicRuntimeConfig.apiUrl', publicRuntimeConfig);
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const hotelService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    getAll,
    getById,
    getAllDropdown
};

function getAllDropdown() {
    console.log('baseUrl_dropdown', baseUrl_dropdown);
    return fetchWrapper.get(baseUrl_dropdown);
}

function getAll() {
    console.log('baseUrl', baseUrl);
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}
