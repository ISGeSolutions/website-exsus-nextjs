import getConfig from "next/config";
import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/api/email_api`;
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/enquiries`;

export const contactUsService = {
  contactus,
  sendContactUsMail,
  getCustomeContact,
};

function sendContactUsMail(contactusData) {
  let postdata = contactusData;
  postdata.emailpage = "contactus";
  const currentUrl = window?.location?.origin + "/api/email_api   ";
  return fetchWrapper.post(`${currentUrl}`, postdata);
}

function contactus(contactUsData) {
  if (contactUsData?.data?.id) {
    contactUsData.data.attributes.email_sent_ind = true;
    let data = { data: contactUsData.data.attributes };
    return fetchWrapper.put(
      `${baseUrlEnquiries}/${contactUsData?.data?.id}`,
      data
    );
  } else {
    return fetchWrapper.post(`${baseUrlEnquiries}`, contactUsData);
  }
}

function getCustomeContact() {
  const contactUsCustomeUrl = `${publicRuntimeConfig.apiUrl}/api/custom-pages?populate[0]=custom_page_images&populate[1]=custom_page_contents&filters[page_code][$eq]=Contact-us`;
  return fetchWrapper.get(contactUsCustomeUrl);
}
