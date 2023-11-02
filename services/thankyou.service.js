import getConfig from "next/config";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();

export const thankyouService = {
  getThankYouPage,
};

function getThankYouPage() {
  const careerPageUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=Thank-you`;
  return fetchWrapper.get(careerPageUrl);
}
