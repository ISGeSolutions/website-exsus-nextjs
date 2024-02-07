import getConfig from "next/config";
import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/api/email_api`;
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/enquiries`;

export const contactUsService = {
  contactus,
  sendContactUsMail,
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
