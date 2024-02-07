import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/api/email_api`;
const baseUrlEnquiries = `${publicRuntimeConfig.apiUrl}/api/enquiries`;

export const enquiryService = {
    makeanenquiry,
    sendEnquiryMail
};

function sendEnquiryMail(contactusData) {
    let postdata = contactusData;
    postdata.emailpage = 'Enquiry';
    const currentUrl = window?.location?.origin + '/api/email_api   ';
    return fetchWrapper.post(`${currentUrl}`, postdata);
}

function makeanenquiry(enquiryData) {
    if (enquiryData?.data?.id) {
        enquiryData.data.attributes.email_sent_ind = true;
        let data = { data: enquiryData.data.attributes }
        return fetchWrapper.put(`${baseUrlEnquiries}/${enquiryData?.data?.id}`, data);
    } else {
        return fetchWrapper.post(`${baseUrlEnquiries}`, enquiryData);
    }
}


