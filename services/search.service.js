import getConfig from "next/config";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();

export const searchService = {
    searchSite,
    customPage
};


function searchSite(param, page, size) {
    const searchSiteUrl = `${publicRuntimeConfig.apiUrl}/api/search-sites/${param?.toLowerCase()}?pagination[page]=${page}&pagination[size]=${size}`;
    return fetchWrapper.get(searchSiteUrl);
}

function customPage() {
    const customPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=search`;
    return fetchWrapper.get(customPageUrl);
}
