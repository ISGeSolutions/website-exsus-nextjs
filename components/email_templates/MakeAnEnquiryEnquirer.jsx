// import * as React from 'react';
import { Html, style } from '@react-email/html';
import { Button } from '@react-email/button';
import React, { useState, useEffect } from 'react';

export function MakeAnEnquiryEnquirer(props) {

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
            <center>
                <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                    <tr>
                        <td align="center" valign="top" id="bodyCell">
                            {/* {< !--BEGIN TEMPLATE // -->} */}
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" valign="top" id="templatePreheader">
                                        {/* {    < !--[if (gte mso 9)|(IE)]>
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                            <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif] -->} */}
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                            <tr>
                                                <td valign="top" class="preheaderContainer"></td>
                                            </tr>
                                        </table>
                                        {/* { < !--[if (gte mso 9)|(IE)]>
                                                </td>
                                            </tr>
                                        </table>
                                        <![endif]-->} */}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" id="templateHeader">
                                        {/* {    < !--[if (gte mso 9)|(IE)]>
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                            <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif]-->} */}
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                            <tr>
                                                <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                                                    <tbody class="mcnImageBlockOuter">
                                                        <tr>
                                                            <td valign="top" style="padding:0px" class="mcnImageBlockInner">
                                                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                                                    <tbody><tr>
                                                                        <td class="mcnImageContent" valign="top" style="padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                                                            <img align="center" alt="" src="https://gallery.mailchimp.com/d876b08a2cc0d389689940a4c/images/8c9870e1-25f1-4333-9103-f51e5579eef3.jpg" width="600" style="max-width:600px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage"></img>


                                                                        </td>
                                                                    </tr>
                                                                    </tbody></table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                                                        <tbody class="mcnDividerBlockOuter">
                                                            <tr>
                                                                <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                                                    <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                                                                        <tbody><tr>
                                                                            <td>
                                                                                <span></span>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                    {/* {< !--            
                < td class="mcnDividerBlockInner" style="padding: 18px;">
                                                                                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->} */}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                                                        <tbody class="mcnImageBlockOuter">
                                                            <tr>
                                                                <td valign="top" style="padding:0px" class="mcnImageBlockInner">
                                                                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                                                        <tbody><tr>
                                                                            <td class="mcnImageContent" valign="top" style="padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;">

                                                                                <a href="https://www.exsus.com/" title="" class="" target="_blank">
                                                                                    <img align="center" alt="" src="https://gallery.mailchimp.com/d876b08a2cc0d389689940a4c/images/1077b72e-e390-4c7e-b148-78c43a9e82b5.jpg" width="600" style="max-width:600px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage"></img>
                                                                                </a>

                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table></td>
                                            </tr>
                                        </table>
                                        {/* //             {  < !--[if (gte mso 9)|(IE)]>
                                        //         </td>
                                        //     </tr>
                                        // </table>
                                        // <![endif]-->} */}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" id="templateUpperBody">
                                        {/* // {                                    < !--[if (gte mso 9)|(IE)]>
                                        // <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                        //     <tr>
                                        //         <td align="center" valign="top" width="600" style="width:600px;">
                                        //             <![endif]-->} */}
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                            <tr>
                                                <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                                                    <tbody class="mcnDividerBlockOuter">
                                                        <tr>
                                                            <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 0px 18px;">
                                                                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;">
                                                                    <tbody><tr>
                                                                        <td>
                                                                            <span></span>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody></table>
                                                                {/* {< !--            
                < td class="mcnDividerBlockInner" style="padding: 18px;">
                                                                            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->} */}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table></td>
                                            </tr>
                                        </table>
                                        {/* //             {  < !--[if (gte mso 9)|(IE)]>
                                        //         </td>
                                        //     </tr>
                                        // </table>
                                        // <![endif]-->} */}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" id="templateColumns">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                            <tr>
                                                <td valign="top">
                                                    {/* // {  < !--[if (gte mso 9)|(IE)]>
                                                    // <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                    //     <tr>
                                                    //         <td align="center" valign="top" width="300" style="width:300px;">
                                                    //             <![endif]-->} */}
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="300" class="columnWrapper">
                                                        <tr>
                                                            <td valign="top" class="columnContainer"></td>
                                                        </tr>
                                                    </table>
                                                    {/* {< !--[if (gte mso 9)|(IE)]>
                                                            </td>
                                                            <td align="center" valign="top" width="300" style="width:300px;">
                                                                <![endif]-->} */}
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="300" class="columnWrapper">
                                                        <tr>
                                                            <td valign="top" class="columnContainer"></td>
                                                        </tr>
                                                    </table>
                                                    {/* {  < !--[if (gte mso 9)|(IE)]>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <![endif]-->} */}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" id="templateLowerBody">
                                        {/* { < !--[if (gte mso 9)|(IE)]>
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                            <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif]-->} */}
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                            <tr>
                                                <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                                                    <tbody class="mcnTextBlockOuter">
                                                        <tr>
                                                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                                {/* {	< !--[if mso]>
                                                                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                                                                <tr>
                                                                                    <![endif]-->

                                                                                    <!--[if mso]>
                                                                                    <td valign="top" width="600" style="width:600px;">
                                                                                        <![endif]-->} */}
                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                                    <tbody><tr>

                                                                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                                                                            One of our travel experts will get back to you as soon as possible, either within the next 24 hours or the next working day, should we receive your enquiry on a weekend or public holiday. With over 20 years’ experience of crafting luxury holidays, we will help you turn your travel dreams into reality.<br />
                                                                            &nbsp;<br />
                                                                            In the meantime, feel free to call us on +44 (0) 207 563 1304 or email us at: <a href="mailto:escape@exsus.com">escape@exsus.com</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody></table>
                                                                {/* {< !--[if mso]>
                                                                                            </td>
                                                                                            <![endif]-->

                                                                                            <!--[if mso]>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <![endif]-->} */}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                                                        <tbody class="mcnDividerBlockOuter">
                                                            <tr>
                                                                <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 0px 18px;">
                                                                    <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;">
                                                                        <tbody><tr>
                                                                            <td>
                                                                                <span></span>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                    {/* {< !--            
                < td class="mcnDividerBlockInner" style="padding: 18px;">
                                                                                    <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->} */}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table></td>
                                            </tr>
                                        </table>
                                        {/* //             {  < !--[if (gte mso 9)|(IE)]>
                                                //         </td>
                                                //     </tr>
                                                // </table>
                                                // <![endif]-->} */}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" id="templateFooter">
                                        {/* // {  < !--[if (gte mso 9)|(IE)]>
                                                // <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                //     <tr>
                                                //         <td align="center" valign="top" width="600" style="width:600px;">
                                                //             <![endif]-->} */}
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                            <tr>
                                                <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                                                    <tbody class="mcnImageBlockOuter">
                                                        <tr>
                                                            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                                                    <tbody><tr>
                                                                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                                                            <img align="center" alt="" src="https://gallery.mailchimp.com/d876b08a2cc0d389689940a4c/images/e8c14899-b9d0-4dcf-bcab-a1fe9d6d9fae.jpg" width="559" style="max-width:559px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage"></img>


                                                                        </td>
                                                                    </tr>
                                                                    </tbody></table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                                                        <tbody class="mcnDividerBlockOuter">
                                                            <tr>
                                                                <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 5px 18px;">
                                                                    <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EEEEEE;">
                                                                        <tbody><tr>
                                                                            <td>
                                                                                <span></span>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                    {/* {< !--            
                < td class="mcnDividerBlockInner" style="padding: 18px;">
                                                                                        <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->} */}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                                                        <tbody class="mcnTextBlockOuter">
                                                            <tr>
                                                                <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                                    {/* { 	< !--[if mso]>
                                                                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                                                                            <tr>
                                                                                                <![endif]-->

                                                                                                <!--[if mso]>
                                                                                                <td valign="top" width="600" style="width:600px;">
                                                                                                    <![endif]-->} */}
                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                                        <tbody><tr>

                                                                            <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                                                                                <em>The Exsus name is at the heart of what we do&nbsp;<br />
                                                                                    Exsuscitare, v.t.to awaken, breathe life into&nbsp;</em>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                    {/* {< !--[if mso]>
                                                                                                </td>
                                                                                                <![endif]-->

                                                                                                <!--[if mso]>
                                                                                            </tr>
                                                                                        </table>
                                                                                        <![endif]-->} */}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;">
                                                        <tbody class="mcnFollowBlockOuter">
                                                            <tr>
                                                                <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;">
                                                                        <tbody><tr>
                                                                            <td align="center" style="padding-left:9px;padding-right:9px;">
                                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent">
                                                                                    <tbody><tr>
                                                                                        <td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px;">
                                                                                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                                                                                <tbody><tr>
                                                                                                    <td align="center" valign="top">
                                                                                                        {/* {< !--[if mso]>
                                                                                                                            <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                                                                                                <tr>
                                                                                                                                    <![endif]-->

                                                                                                                                    <!--[if mso]>
                                                                                                                                    <td align="center" valign="top">
                                                                                                                                        <![endif]-->} */}


                                                                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                                                            <tbody><tr>
                                                                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                                                                        <tbody><tr>
                                                                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                                                                    <tbody><tr>

                                                                                                                                        <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                                                            <a href="https://twitter.com/Exsustravel/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-twitter-48.png" style="display:block;" height="24" width="24" class=""></img></a>
                                                                                                                                        </td>


                                                                                                                                    </tr>
                                                                                                                                    </tbody></table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        </tbody></table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            </tbody></table>

                                                                                                        {/* {   < !--[if mso]>
                                                                                                                                    </td>
                                                                                                                                    <![endif]-->

                                                                                                                                    <!--[if mso]>
                                                                                                                                    <td align="center" valign="top">
                                                                                                                                        <![endif]-->} */}


                                                                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                                                            <tbody><tr>
                                                                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                                                                        <tbody><tr>
                                                                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                                                                    <tbody><tr>

                                                                                                                                        <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                                                            <a href="https://www.facebook.com/ExsusTravel" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-facebook-48.png" style="display:block;" height="24" width="24" class=""></img></a>
                                                                                                                                        </td>


                                                                                                                                    </tr>
                                                                                                                                    </tbody></table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        </tbody></table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            </tbody></table>

                                                                                                        {/* { < !--[if mso]>
                                                                                                                                    </td>
                                                                                                                                    <![endif]-->

                                                                                                                                    <!--[if mso]>
                                                                                                                                    <td align="center" valign="top">
                                                                                                                                        <![endif]-->} */}


                                                                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                                                            <tbody><tr>
                                                                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                                                                        <tbody><tr>
                                                                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                                                                    <tbody><tr>

                                                                                                                                        <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                                                            <a href="https://www.instagram.com/exsustravel/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-instagram-48.png" style="display:block;" height="24" width="24" class=""></img></a>
                                                                                                                                        </td>


                                                                                                                                    </tr>
                                                                                                                                    </tbody></table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        </tbody></table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            </tbody></table>

                                                                                                        {/* { < !--[if mso]>
                                                                                                                                    </td>
                                                                                                                                    <![endif]-->

                                                                                                                                    <!--[if mso]>
                                                                                                                                    <td align="center" valign="top">
                                                                                                                                        <![endif]-->} */}


                                                                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                                                            <tbody><tr>
                                                                                                                <td valign="top" style="padding-right:0; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                                                                        <tbody><tr>
                                                                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                                                                    <tbody><tr>

                                                                                                                                        <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                                                            <a href="http://www.pinterest.com/exsustravel/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-pinterest-48.png" style="display:block;" height="24" width="24" class=""></img></a>
                                                                                                                                        </td>


                                                                                                                                    </tr>
                                                                                                                                    </tbody></table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        </tbody></table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            </tbody></table>

                                                                                                        {/* {  < !--[if mso]>
                                                                                                                                    </td>
                                                                                                                                    <![endif]-->

                                                                                                                                    <!--[if mso]>
                                                                                                                                </tr>
                                                                                                                            </table>
                                                                                                                            <![endif]-->} */}
                                                                                                    </td>
                                                                                                </tr>
                                                                                                </tbody></table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table></td>
                                            </tr>
                                        </table>
                                        {/* //             { < !--[if (gte mso 9)|(IE)]>
                                                //         </td>
                                                //     </tr>
                                                // </table>
                                                // <![endif]-->} */}
                                    </td>
                                </tr>
                            </table>
                            {/* // {< !-- // END TEMPLATE -->} */}
                        </td>
                    </tr>
                </table>
            </center>
        </Html>
    );
}
