import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();
// const aboutusPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?filters[custom-page][page_code][$eq]=Destinations&populate[0]=custom_page_images`;

export const giftListService = {
    getGiftListPage,
};


function getGiftListPage() {
    const privacyPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=about-gift-list`;
    return fetchWrapper.get(privacyPageUrl);
}
