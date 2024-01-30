// import * as React from 'react';
import { Html, style } from '@react-email/html';
import { Button } from '@react-email/button';
import React, { useState, useEffect } from 'react';

export function MakeAnEnquiryConsultant(props) {
    const { enquiryDetails } = props;
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
            <body>

                <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%">
                    <tbody>
                        <tr>
                            <td>
                                <table class="content" bgcolor="#fff" align="center" style={{ border: `1px solid #666666`, margin: `15px auto` }} cellPadding="0" cellSpacing="0" width="600px">
                                    <tr>
                                        <td align="center" bgcolor="#252525" style={{ padding: `15px` }}>
                                            <img src="@hosturlimages/images/logo.png" alt="emailer_logo" width="120" height="36" align="center" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FFFFFF">
                                            <table border="0" cellPadding="0" cellSpacing="0" width="95%" align="center" style={{ padding: `0 0 20px` }}>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `15px 5px 0`, fontWeight: `bold`, textTransform: `uppercase` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2">Holiday Enquire Request</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2">The following request was recieved at <a href="http://www.exsus.com" style={{ textDecoration: `none`, color: `#8aad56`, fontWeight: `bold` }}>exsus.com</a> @CreatedDate</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `5px 5px` }}>
                                                        <font face="Verdana" color="#333333" size="2"><strong>Contact Information </strong></font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Title: </strong>{enquiryDetails?.title}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>First Name: </strong>{enquiryDetails?.first_name}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Last Name: </strong>{enquiryDetails?.last_name}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Email: </strong>{enquiryDetails?.email_id}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Telephone: </strong>{enquiryDetails?.telephone_no}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>US Site?: </strong>{enquiryDetails?.site_region}</font>
                                                    </td>
                                                </tr>
                                                {/* <!--<tr>
                                                <td bgcolor="#fff" height="20px" style={{padding:`10px 5px`, borderBottom: `1px solid #f0f0f0`}}>
                                                    <font face="Verdana" color="#5d5d5d" size="2"><strong>Country of residence: </strong> @Country</font>
                                                </td>
                                            </tr>--> */}
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Best Time To Contact: </strong>{enquiryDetails?.best_time_to_call}</font>
                                                    </td>
                                                </tr>
                                                {/* <!--<tr>
                                                <td bgcolor="#fff" height="20px" style={{padding:`10px 5px`, borderBottom: `1px solid #f0f0f0`}}>
                                                    <font face="Verdana" color="#5d5d5d" size="2"><strong>Holiday Budget: </strong> @HolidayBudget</font>
                                                </td>
                                            </tr>--> */}
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Note: </strong>{enquiryDetails?.note}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Preferred Destinations: </strong>{enquiryDetails?.preferred_place_time}</font>
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                <!--  <td bgcolor="#fff" height="20px" style={{padding:`10px 5px`, borderBottom: `1px solid #f0f0f0`}}>
                                                    <font face="Verdana" color="#5d5d5d" size="2"><strong>Approximate Departure Date: </strong> @DepartureDate</font>
                                                </td>
                                            </tr>--> */}
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>How did you hear about us: </strong>{enquiryDetails?.source_of_marketing}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Would like to receive information on holiday offers: </strong>{enquiryDetails?.receivedOffers}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>I was just looking at: </strong>{enquiryDetails?.pageHeader}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Page Url: </strong>{enquiryDetails?.previous_page}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Ad: </strong>{enquiryDetails?.ad}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Adgroup: </strong>{enquiryDetails?.adGrp}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Source: </strong>{enquiryDetails?.source_of_marketing}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Medium: </strong>{enquiryDetails?.medium}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Campaign: </strong>{enquiryDetails?.campaign}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Content: </strong>{enquiryDetails?.content}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Enquiry reference number: </strong>{enquiryDetails?.enqRefNo}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Submitted at: </strong>{enquiryDetails?.submitted_at}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Submitted from: </strong>{enquiryDetails?.submittedFrom} </font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Submission Location: </strong>{enquiryDetails?.submittedLocationCode}</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><strong>Receive offers: </strong>{enquiryDetails?.receivedOffers}</font>
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
        </Html >
    );
}
