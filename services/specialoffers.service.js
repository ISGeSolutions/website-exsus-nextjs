import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
let region = 'uk';
if (typeof window !== 'undefined') {
    if (window && window.site_region) {
        region = window.site_region;
        // setMyVariable(window.site_region);
    }
}
const { publicRuntimeConfig } = getConfig();

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const specialoffersService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    getAllBlogs
};



function getAllBlogs() {
    const specialoffersUrl = `${publicRuntimeConfig.apiUrl}/api/special-offers`;
    return fetchWrapper.get(specialoffersUrl);
}





