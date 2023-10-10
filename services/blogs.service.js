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

export const blogsService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    getAllBlogs,
    getAllBlogsHomePage
};



function getAllBlogs(page) {
    const blogsUrl = `${publicRuntimeConfig.apiUrl}/api/blogs?pagination[page]=${page}&pagination[pageSize]=12`;
    return fetchWrapper.get(blogsUrl);
}


function getAllBlogsHomePage() {
    const blogsUrl = `${publicRuntimeConfig.apiUrl}/api/blogs`;
    return fetchWrapper.get(blogsUrl);
}






