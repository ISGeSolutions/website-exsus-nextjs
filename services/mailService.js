var nodemailer = require("nodemailer");
// const { Email, Item, Span, A, renderEmail } = require('@react-email/html');
// import { EmailTemplate } from '../components/MyEmailTemplate';
// import { renderEmail } from '@react-email/html';
// const { render } = require('@react-email/html');
// import { renderEmail } from 'react-html-email';
// import MyEmailTemplate from './../components/MyEmailTemplate';
// import { Email, Item, A } from 'react-html-email';

//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText) {
    var transporter = nodemailer.createTransport({
        // service: "gmail",
        // auth: {
        //     user: "spchobhe@gmail.com",
        //     pass: "avuhoxxdmvszzzpg",
        // },

        service: "Outlook365",
        host: "smtp.office365.com",
        auth: {
            user: "noreply@exsus.com",
            pass: "wF9AHt3A7xXf1",
        },
        port: "587",
        enableSsl: "true",
        secure: false,
        tls: {
            ciphers: "SSLv3",
        },
        requireTLS: true,
        // debug: true,
        // logger:true
    });

    // const emailHtml = renderEmail(<EmailTemplate url="https://example.com" />);

    // const emailHtml = renderEmail(
    //     <EmailTemplate title="Sample Email">
    //       {/* Email content */}
    //     </EmailTemplate>
    //   );

    // const emailHtml = renderEmail(
    //     <Email title="My Email Template">
    //         <Item>
    //             <h1>Hello, World!</h1>
    //             <p>This is a sample email template.</p>
    //             <p>{otpText}</p>
    //             <A href="https://example.com">Visit Example.com</A>
    //         </Item>
    //     </Email>
    // );

    // const emailHtml = renderEmail(<MyEmailTemplate url="https://example.com" />);

    var mailOptions = {
        from: 'noreply@exsus.com',
        to: toEmail,
        subject: subject,
        text: otpText,
        // html: emailHtml,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new Error(error);
        } else {
            console.log("Email Sent");
            return true;
        }
    });
}