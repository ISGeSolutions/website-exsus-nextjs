import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/itineraries`;;

// export const destiantionsService = {
//     getDestinationsList
// };

// function getDestinationsList() {
//     return fetchWrapper.get(`${baseUrl}`);
// }

console.log('publicRuntimeConfig.apiUrl', publicRuntimeConfig);
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const itinerariesService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    getAll,
    getById
};

function getAll() {
    console.log('baseUrl', baseUrl);
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}
