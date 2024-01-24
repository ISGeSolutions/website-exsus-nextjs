// import * as React from 'react';
import { Html, style } from '@react-email/html';
import { Button } from '@react-email/button';
import React, { useState, useEffect } from 'react';

export function ContactUsEnquirer(props) {

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
        <html lang="en">
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
                                <table className="content" bgcolor="#fff" align="center" style="border: 1px solid #666666; margin: 15px auto;" cellPadding="0" cellSpacing="0" width="600px">
                                    <tr>
                                        <td align="center" bgcolor="#252525" style={{ padding: `15px 15px 0` }}>
                                            <img src="@hosturlimages/Content/images/exsuscitare_logo_mob.png" alt="exsuscitare_logo_mob" width="56" height="47" align="center" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" bgcolor="#252525" style={{ padding: `15px` }}>
                                            <img src="@hosturlimages/images/logo.png" alt="emailer_logo" width="120" height="36" align="center" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#252525" style={{ borderTop: `1px dotted #666666` }}>
                                            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                                                <tr>
                                                    <td width="500" align="right" style="padding: 10px 18px; margin: 0 auto;">
                                                        <a style="text-decoration:none; margin: 0 0 0 5px;" target="_blank" href="@facebookLink"><font><b><img src="@hosturlimages/images/facebook.png" alt="facebook" height="25" width="25" /></b></font></a>
                                                        <a style="text-decoration:none; margin: 0 0 0 5px;" target="_blank" href="@twitterLink"><font><b><img src="@hosturlimages/images/twitter.png" alt="twitter" height="25" width="25" /></b></font></a>
                                                        <a style="text-decoration:none; margin: 0 0 0 5px;" target="_blank" href="@gplus"><font><b><img src="@hosturlimages/images/gplus.png" alt="gplus" height="25" width="25" /></b></font></a>
                                                        <a style="text-decoration:none; margin: 0 0 0 5px;" target="_blank" href="@pinterestLink"><font><b><img src="@hosturlimages/images/pinterest.png" alt="pinterest" height="25" width="25" /></b></font></a>
                                                        <a style="text-decoration:none; margin: 0 0 0 5px;" target="_blank" href="@instagramLink"><font><b><img src="@hosturlimages/images/instagram.png" alt="instagram" height="25" width="25" /></b></font></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FFFFFF">
                                            <table border="0" cellPadding="0" cellSpacing="0" width="95%" align="center" style=" padding:0 0 20px;">
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="3"><b style="color:#8aad56; font-weight:bold;">Thank you</b> for contacting Exsus, specialists in luxury tailor-made travel</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2">One of our Travel Specialists will get back to you within 24 hours, or the next working day should we receive your message on a weekend or a public holiday.</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2">We look forward to speaking to you soon.</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style="padding: 15px 5px 0;">
                                                        <font face="Verdana" color="#5d5d5d" size="2">In the meantime why don’t you browse our site for some holiday inspiration:</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                                                        {/* <font face="Verdana" color="#5d5d5d" size="2"> <a href="http://www.exsus.com" style="color:#8aad56; display: block; text-decoration: none; font-weight:bold;" href="mailto:escape@exsus.com">> Homepage</a></font>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><a href="http://www.exsus.com/destinations" style="color:#8aad56;  display: block; text-decoration: none; font-weight:bold;" href="mailto:escape@exsus.com">> Destination</a></font>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><a href="http://www.exsus.com/holiday-types" style="color:#8aad56;  display: block; text-decoration: none; font-weight:bold;" href="mailto:escape@exsus.com">> Holiday Type</a></font>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><a href="http://www.exsus.com/blog" style="color:#8aad56;  display: block; text-decoration: none; font-weight:bold;" href="mailto:escape@exsus.com">> Articles</a></font>
                                                        <font face="Verdana" color="#5d5d5d" size="2"><a href="http://www.exsus.com/offers" style="color:#8aad56;  display: block; text-decoration: none; font-weight:bold;" href="mailto:escape@exsus.com">> Offers</a></font> */}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                                                        <font face="Verdana" color="#5d5d5d" size="2">The Exsus Team.</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                                                        <img src="@hosturlimages/images/atol01.png" alt="atol" height="45" width="45" />
                                                        <font face="Verdana" color="#5d5d5d" size="2">
                                                            <b style="display: block; padding: 15px 0 0;">Opening hours: Monday to Thursday 9am-6pm GMT, Fridays 9am-5pm GMT</b>
                                                        </font>
                                                    </td>
                                                </tr>

                                            </table>
                                        </td>
                                    </tr>
                                    <tr bgcolor="#252525">
                                        <td style="padding:0;">
                                            <table bgcolor="#252525" border="0" align="left" cellPadding="0" cellSpacing="0" width="100%" style=" padding:0 0 20px;">
                                                <tr>
                                                    <td style="padding: 10px 15px 0; display:block;">
                                                        <font face="Verdana" color="#fff" size="2"><b>Exsus Travel</b></font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0px 15px 0; display:block;">
                                                        <font face="Verdana" color="#fff" size="2">Address: 62-64 Baker Street, Marylebone, London, W1U 7DF</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0px 15px 0; display:block;">
                                                        <font face="Verdana" color="#fff" size="2">Tel: +44 (0)20 7337 9010</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0px 15px 0; display:block;">
                                                        <font face="Verdana" color="#fff" size="2">Email: escape@exsus.com</font>
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
        </html>

    );
}
