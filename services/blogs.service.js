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
    getAllBlogsHomePage,
    getBlogDetails
};



function getAllBlogs(page, item) {
    if (item == "date") {
        const blogsUrl = `${publicRuntimeConfig.apiUrl}/api/blogs?pagination[page]=${page}&pagination[pageSize]=12?sort[0]=blog_date:asc`;
        return fetchWrapper.get(blogsUrl);
    } else {
        const blogsUrl = `${publicRuntimeConfig.apiUrl}/api/blogs?pagination[page]=${page}&pagination[pageSize]=12`;
        return fetchWrapper.get(blogsUrl);
    }


}


function getAllBlogsHomePage() {
    const blogsUrl = `${publicRuntimeConfig.apiUrl}/api/blogs`;
    return fetchWrapper.get(blogsUrl);
}


function getBlogDetails(blogName) {
    const blogsUrl = `${publicRuntimeConfig.apiUrl}/api/blogs?filters[blog_header_text][$eq]=${blogName}`;
    return fetchWrapper.get(blogsUrl);
}






