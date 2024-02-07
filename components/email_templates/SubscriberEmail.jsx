// import * as React from 'react';
import { Html, style } from '@react-email/html';
import { Button } from '@react-email/button';
import React, { useState, useEffect } from 'react';

export function SubscriberEmail(props) {

    const { emailDetails } = props;
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Update the current date every second
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Format the current date as a string
    const formattedDate = currentDate.toLocaleString();

    return (
        <Html lang="en">
            {/* <Button href={url}>Click me</Button> */}
            <style jsx>{`
    body {
      margin: 0;
      padding: 0;
      min-width: 100% !important;
    }
    .content {
      width: 100%;
      max-width: 600px;
    }
      `}</style>
            <body>
                <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%">
                    <tbody>
                        <tr>
                            <td>
                                <table class="content" bgcolor="#fff" align="center" style="border: 1px solid #666666; margin: 15px auto;" cellPadding="0" cellSpacing="0" width="600px">
                                    <tr>
                                        <td align="center" bgcolor="#252525" style="padding: 15px;">
                                            <img src="@hosturlimages/images/logo.png" alt="emailer_logo" width="120" height="36" align="center" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FFFFFF">
                                            <table border="0" cellPadding="0" cellSpacing="0" width="95%" align="center" style=" padding:0 0 20px;">
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style="padding: 15px 5px 0; font-weight:bold; text-transform:uppercase;">
                                                        <font face="Verdana" color="#5d5d5d" size="2">SUBSCRIPTION REQUEST</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style="padding: 15px 5px;">
                                                        <font face="Verdana" color="#5d5d5d" size="2">The following request was recieved at <a href="#" style="text-decoration:none; color:#8aad56; font-weight:bold;">exsus.com</a> @CreatedDate</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style="padding:5px 5px;">
                                                        <font face="Verdana" color="#333333" size="2"><strong>Contact Information </strong></font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>First Name: </strong> @FirstName</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Last Name: </strong> @LastName</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Email: </strong> @Email</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>US Site?: </strong> @IsUS</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Page Url: </strong> @PageUrl</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Enquiry reference number: </strong> @EnqRefNo</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Submitted at: </strong> @CreatedDate</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Submitted from: </strong> @SubmittedFrom </font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style="padding:10px 5px; border-bottom: 1px solid #f0f0f0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Submission Location: </strong> @SubmittedLocationCode</font>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </Html>
    );
}
