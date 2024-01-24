var nodemailer = require("nodemailer");
// const { Email, Item, Span, A, renderEmail } = require('@react-email/html');
// import { EmailTemplate } from '../components/MyEmailTemplate';
// import { renderEmail } from '@react-email/html';
import { renderEmail } from "react-html-email";
import { constant_data } from "./../data/email_template_constants.json";

import { render } from "@react-email/render";
// import nodemailer from 'nodemailer';
import { ContactUsEmailTemplate } from "../components/email_templates/ContactUsEmailTemplate";
import { NewsLetterEmailTemplate } from "../components/email_templates/NewsLetterEmailTemplate";
import { MakeAnEnquiryConsultant } from "../components/email_templates/MakeAnEnquiryConsultant";
import { MakeAnEnquiryEnquirer } from "../components/email_templates/MakeAnEnquiryEnquirer";
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText, data, emailpage) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "Outlook365",
      host: "smtp.office365.com",
      auth: {
        user: "noreply@exsus.com",
        pass: "wF9AHt3A7xXf1",
      },
      port: "587",
      enableSsl: "true",
      secure: true,
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      // debug: true,
      // logger:true
    });
    // const emailHtml = renderEmail(<MyEmailTemplate url="https://example.com" />);
    let mailTo = [];
    let mailFrom = "";
    let emailHtmlConsultant = "";
    let emailHtmlUser = "";
    let subjectConsultant = "";
    let subjectUser = "";
    switch (emailpage) {
      case "contactus":
        emailHtmlConsultant = render(<ContactUsEmailTemplate emailDetails={data} />);
        break;

      case "newsletter":
        emailHtmlConsultant = render(<NewsLetterEmailTemplate emailDetails={data} />);
        mailTo = constant_data?.newsLetter[0]?.NewsLetterMailTo.split(",");
        subjectConsultant = constant_data?.newsLetter[0]?.NewsLetterMailSubject;
        mailFrom = constant_data?.newsLetter[0]?.NewsLetterMailFrom;
        break;

      case "makeAnEnquiry":
        emailHtmlConsultant = render(<MakeAnEnquiryConsultant emailDetails={data} />);
        mailTo = constant_data?.makeAnEnquiry[0]?.EnquiryConsultantMailTo?.split(",");
        subjectConsultant = constant_data?.makeAnEnquiry[0]?.EnquiryConsultantMailSubject;
        mailFrom = constant_data?.makeAnEnquiry[0]?.EnquiryConsultantMailFrom;
        emailHtmlUser = render(<MakeAnEnquiryEnquirer emailDetails={data} />);
        subjectUser = constant_data?.makeAnEnquiry[0]?.EnquiryEnquirerMailSubject;
        break;

      default:
        // Handle the default case if emailpage doesn't match any of the cases
        break;
    }

    if (emailHtmlUser) {
      var mailOptions = {
        from: mailFrom,
        to: toEmail,
        subject: subjectUser,
        text: otpText,
        html: emailHtmlUser,
      };
    }


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve(false);
      }
      if (mailTo.length > 0) {
        mailTo.forEach(element => {
          var mailOptions_consultant = {
            from: mailFrom,
            to: element,
            subject: subjectConsultant,
            text: otpText,
            html: emailHtmlConsultant,
          };
          transporter.sendMail(mailOptions_consultant, function (error, info) {
            if (error) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        });
      }
    });
  });
}
