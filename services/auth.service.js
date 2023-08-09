import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
// const baseUrl_dropdown = `${publicRuntimeConfig.apiUrl}/destinations_dropdown`;;

const baseUrl = `${publicRuntimeConfig.apiUrl}/api/auth/local [POST]`;

// console.log('publicRuntimeConfig.apiUrl', publicRuntimeConfig);

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const authService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}
