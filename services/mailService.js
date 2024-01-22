var nodemailer = require("nodemailer");
// const { Email, Item, Span, A, renderEmail } = require('@react-email/html');
// import { EmailTemplate } from '../components/MyEmailTemplate';
// import { renderEmail } from '@react-email/html';
import { renderEmail } from "react-html-email";
import { constant_data } from "./../data/email_template_constants.json";

import { render } from "@react-email/render";
// import nodemailer from 'nodemailer';
import { ContactUsEmailTemplate } from "../components/ContactUsEmailTemplate";
import { NewsLetterEmailTemplate } from "../components/NewsLetterEmailTemplate";
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
    let emailHtml = "";
    if (emailpage == "contactus") {
      emailHtml = render(<ContactUsEmailTemplate emailDetails={data} />);
    } else if (emailpage == "newsletter") {
      emailHtml = render(<NewsLetterEmailTemplate emailDetails={data} />);
      mailTo = constant_data?.newsLetter[0]?.NewsLetterMailTo.split(",");
      subject = constant_data?.newsLetter[0]?.NewsLetterMailSubject;
      mailFrom = constant_data?.newsLetter[0]?.NewsLetterMailFrom;
    }

    var mailOptions = {
      from: mailFrom,
      to: toEmail,
      subject: subject,
      text: otpText,
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve(false);
      } else {
        if (mailTo.length > 0) {
          mailTo.forEach(element => {
            var mailOptions_consultant = {
              from: mailFrom,
              to: element,
              subject: subject,
              text: otpText,
              html: emailHtml,
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
        resolve(true);
      }
    });
  });
}
