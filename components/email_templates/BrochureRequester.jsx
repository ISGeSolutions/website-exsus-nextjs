// import * as React from 'react';
import { Html, style } from '@react-email/html';
import { Button } from '@react-email/button';
import React, { useState, useEffect } from 'react';

export function BrochureRequester(props) {

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
            <style jsx>{`
p{
			margin:10px 0;
			padding:0;
		}
		table{
			border-collapse:collapse;
		}
		h1,h2,h3,h4,h5,h6{
			display:block;
			margin:0;
			padding:0;
		}
		img,a img{
			border:0;
			height:auto;
			outline:none;
			text-decoration:none;
		}
		body,#bodyTable,#bodyCell{
			height:100%;
			margin:0;
			padding:0;
			width:100%;
		}
		.mcnPreviewText{
			display:none !important;
		}
		#outlook a{
			padding:0;
		}
		img{
			-ms-interpolation-mode:bicubic;
		}
		table{
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		p,a,li,td,blockquote{
			mso-line-height-rule:exactly;
		}
		a[href^=tel],a[href^=sms]{
			color:inherit;
			cursor:default;
			text-decoration:none;
		}
		p,a,li,td,body,table,blockquote{
			-ms-text-size-adjust:100%;
			-webkit-text-size-adjust:100%;
		}
		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			line-height:100%;
		}
		a[x-apple-data-detectors]{
			color:inherit !important;
			text-decoration:none !important;
			font-size:inherit !important;
			font-family:inherit !important;
			font-weight:inherit !important;
			line-height:inherit !important;
		}
		.templateContainer{
			max-width:600px !important;
		}
		a.mcnButton{
			display:block;
		}
		.mcnImage,.mcnRetinaImage{
			vertical-align:bottom;
		}
		.mcnTextContent{
			word-break:break-word;
		}
		.mcnTextContent img{
			height:auto !important;
		}
		.mcnDividerBlock{
			table-layout:fixed !important;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		body,#bodyTable{
			/*@editable*/background-color:#FAFAFA;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		#bodyCell{
			/*@editable*/border-top:0;
		}
	/*
	@tab Page
	@section Heading 1
	@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
	@style heading 1
	*/
		h1{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:26px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 2
	@tip Set the styling for all second-level headings in your emails.
	@style heading 2
	*/
		h2{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:22px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 3
	@tip Set the styling for all third-level headings in your emails.
	@style heading 3
	*/
		h3{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:20px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 4
	@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
	@style heading 4
	*/
		h4{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:18px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Style
	@tip Set the background color and borders for your email's preheader area.
	*/
		#templatePreheader{
			/*@editable*/background-color:#89ac55;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Preheader
	@section Preheader Text
	@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/color:#2e2d2c;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Link
	@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
	*/
		#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			/*@editable*/color:#2e2d2c;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Header
	@section Header Style
	@tip Set the background color and borders for your email's header area.
	*/
		#templateHeader{
			/*@editable*/background-color:#2e2d2c;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:0;
		}
	/*
	@tab Header
	@section Header Text
	@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Header
	@section Header Link
	@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
	*/
		#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			/*@editable*/color:#bfd886;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:none;
		}
	/*
	@tab Upper Body
	@section Upper Body Style
	@tip Set the background color and borders for your email's upper body area.
	*/
		#templateUpperBody{
			/*@editable*/background-color:#ededed;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:5px;
			/*@editable*/padding-bottom:5px;
		}
	/*
	@tab Upper Body
	@section Upper Body Text
	@tip Set the styling for your email's upper body text. Choose a size and color that is easy to read.
	*/
		#templateUpperBody .mcnTextContent,#templateUpperBody .mcnTextContent p{
			/*@editable*/color:#2e2d2c;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:13px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Upper Body
	@section Upper Body Link
	@tip Set the styling for your email's upper body links. Choose a color that helps them stand out from your text.
	*/
		#templateUpperBody .mcnTextContent a,#templateUpperBody .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Columns
	@section Column Style
	@tip Set the background color and borders for your email's columns.
	*/
		#templateColumns{
			/*@editable*/background-color:#ffffff;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:15px;
			/*@editable*/padding-bottom:0px;
		}
	/*
	@tab Columns
	@section Column Text
	@tip Set the styling for your email's column text. Choose a size and color that is easy to read.
	*/
		#templateColumns .columnContainer .mcnTextContent,#templateColumns .columnContainer .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:13px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Columns
	@section Column Link
	@tip Set the styling for your email's column links. Choose a color that helps them stand out from your text.
	*/
		#templateColumns .columnContainer .mcnTextContent a,#templateColumns .columnContainer .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Lower Body
	@section Lower Body Style
	@tip Set the background color and borders for your email's lower body area.
	*/
		#templateLowerBody{
			/*@editable*/background-color:#ffffff;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:2px solid #EAEAEA;
			/*@editable*/padding-top:0;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Lower Body
	@section Lower Body Text
	@tip Set the styling for your email's lower body text. Choose a size and color that is easy to read.
	*/
		#templateLowerBody .mcnTextContent,#templateLowerBody .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:13px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Lower Body
	@section Lower Body Link
	@tip Set the styling for your email's lower body links. Choose a color that helps them stand out from your text.
	*/
		#templateLowerBody .mcnTextContent a,#templateLowperBody .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Footer
	@section Footer Style
	@tip Set the background color and borders for your email's footer area.
	*/
		#templateFooter{
			/*@editable*/background-color:#2e2d2c;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Footer
	@section Footer Text
	@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/color:#ffffff;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Footer
	@section Footer Link
	@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
	*/
		#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			/*@editable*/color:#656565;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	@media only screen and (min-width:768px){
		.templateContainer{
			width:600px !important;
		}

}	@media only screen and (max-width: 480px){
		body,table,td,p,a,li,blockquote{
			-webkit-text-size-adjust:none !important;
		}

}	@media only screen and (max-width: 480px){
		body{
			width:100% !important;
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		#bodyCell{
			padding-top:10px !important;
		}

}	@media only screen and (max-width: 480px){
		.columnWrapper{
			max-width:100% !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnRetinaImage{
			max-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImage{
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			max-width:100% !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnBoxedTextContentContainer{
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupContent{
			padding:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			padding-top:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			padding-top:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardBottomImageContent{
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockInner{
			padding-top:0 !important;
			padding-bottom:0 !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockOuter{
			padding-top:9px !important;
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnTextContent,.mcnBoxedTextContentColumn{
			padding-right:18px !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			padding-right:18px !important;
			padding-bottom:0 !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcpreview-image-uploader{
			display:none !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 1
	@tip Make the first-level headings larger in size for better readability on small screens.
	*/
		h1{
			/*@editable*/font-size:22px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 2
	@tip Make the second-level headings larger in size for better readability on small screens.
	*/
		h2{
			/*@editable*/font-size:20px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 3
	@tip Make the third-level headings larger in size for better readability on small screens.
	*/
		h3{
			/*@editable*/font-size:18px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 4
	@tip Make the fourth-level headings larger in size for better readability on small screens.
	*/
		h4{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Boxed Text
	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Visibility
	@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
	*/
		#templatePreheader{
			/*@editable*/display:block !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Text
	@tip Make the preheader text larger in size for better readability on small screens.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Header Text
	@tip Make the header text larger in size for better readability on small screens.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Upper Body Text
	@tip Make the upper body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateUpperBody .mcnTextContent,#templateUpperBody .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Column Text
	@tip Make the column text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateColumns .columnContainer .mcnTextContent,#templateColumns .columnContainer .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Lower Body Text
	@tip Make the lower body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateLowerBody .mcnTextContent,#templateLowerBody .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Footer Text
	@tip Make the footer content text larger in size for better readability on small screens.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}
      `}</style>
            <body>
                <center>
                    <table align="center" border="0" cellPadding="0" cellSpacing="0" height="100%" width="100%" id="bodyTable">
                        <tr>
                            <td align="center" valign="top" id="bodyCell">
                                {/* {< !--BEGIN TEMPLATE // -->} */}
                                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                                    <tr>
                                        <td align="center" valign="top" id="templatePreheader">
                                            {/* {    < !--[if (gte mso 9)|(IE)]>
                                        <table align="center" border="0" cellSpacing="0" cellPadding="0" width="600" style="width:600px;">
                                            <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif] -->} */}
                                            <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" className="templateContainer">
                                                <tr>
                                                    <td valign="top" className="preheaderContainer"></td>
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
                                        <table align="center" border="0" cellSpacing="0" cellPadding="0" width="600" style="width:600px;">
                                            <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif]-->} */}
                                            <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" className="templateContainer">
                                                <tr>
                                                    <td valign="top" className="headerContainer"><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnImageBlock" style={{ minWidth: `100 %` }}>
                                                        <tbody className="mcnImageBlockOuter">
                                                            <tr>
                                                                <td valign="top" style={{ padding: `0px` }} className="mcnImageBlockInner">
                                                                    <table align="left" width="100%" border="0" cellPadding="0" cellSpacing="0" className="mcnImageContentContainer" style={{ minWidth: `100 %` }}>
                                                                        <tbody><tr>
                                                                            <td className="mcnImageContent" valign="top" style={{ paddingRight: `0px`, paddingLeft: `0px`, paddingTop: `0`, paddingBottom: `0`, textAlign: `center` }}>


                                                                                <img align="center" alt="" src="https://gallery.mailchimp.com/d876b08a2cc0d389689940a4c/images/8c9870e1-25f1-4333-9103-f51e5579eef3.jpg" width="600" style={{ maxWidth: `600px`, paddingBottom: `0`, display: `inline !important`, verticalAlign: `bottom` }} className="mcnImage"></img>


                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnDividerBlock" style={{ minWidth: `100 %` }}>
                                                            <tbody className="mcnDividerBlockOuter">
                                                                <tr>
                                                                    <td className="mcnDividerBlockInner" style={{ minWidth: `100%`, padding: `18px` }}>
                                                                        <table className="mcnDividerContent" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ minWidth: `100%`, borderTop: `2px solid #EAEAEA` }}>
                                                                            <tbody><tr>
                                                                                <td>
                                                                                    <span></span>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody></table>
                                                                        {/* {< !--            
                < td className="mcnDividerBlockInner" style="padding: 18px;">
                                                                                <hr className="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->} */}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnImageBlock" style={{ minWidth: `100 %` }}>
                                                            <tbody className="mcnImageBlockOuter">
                                                                <tr>
                                                                    <td valign="top" style={{ padding: `0px` }} className="mcnImageBlockInner">
                                                                        <table align="left" width="100%" border="0" cellPadding="0" cellSpacing="0" className="mcnImageContentContainer" style={{ minWidth: `100 %` }}>
                                                                            <tbody><tr>
                                                                                <td className="mcnImageContent" valign="top" style={{ paddingRight: `0px`, paddingLeft: `0px`, paddingTop: `0`, paddingBottom: `0`, textAlign: `center` }}>

                                                                                    <a href="https://www.exsus.com/" title="" className="" target="_blank">
                                                                                        <img align="center" alt="" src="https://gallery.mailchimp.com/d876b08a2cc0d389689940a4c/images/1077b72e-e390-4c7e-b148-78c43a9e82b5.jpg" width="600" style={{ maxWidth: `600px`, paddingBottom: `0`, display: `inline !important`, verticalAlign: `bottom` }} className="mcnImage"></img>
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
                                        // <table align="center" border="0" cellSpacing="0" cellPadding="0" width="600" style="width:600px;">
                                        //     <tr>
                                        //         <td align="center" valign="top" width="600" style="width:600px;">
                                        //             <![endif]-->} */}
                                            <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" className="templateContainer">
                                                <tr>
                                                    <td valign="top" className="bodyContainer"><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnDividerBlock" style={{ minWidth: `100 %` }}>
                                                        <tbody className="mcnDividerBlockOuter">
                                                            <tr>
                                                                <td className="mcnDividerBlockInner" style={{ minWidth: `100%`, padding: `0px 18px` }}>
                                                                    <table className="mcnDividerContent" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ minWidth: `100 %` }}>
                                                                        <tbody><tr>
                                                                            <td>
                                                                                <span></span>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                    {/* {< !--            
                < td className="mcnDividerBlockInner" style="padding: 18px;">
                                                                            <hr className="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
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
                                            <table border="0" cellPadding="0" cellSpacing="0" width="100%" className="templateContainer">
                                                <tr>
                                                    <td valign="top">
                                                        {/* // {  < !--[if (gte mso 9)|(IE)]>
                                                    // <table align="center" border="0" cellSpacing="0" cellPadding="0" width="600" style="width:600px;">
                                                    //     <tr>
                                                    //         <td align="center" valign="top" width="300" style="width:300px;">
                                                    //             <![endif]-->} */}
                                                        <table align="left" border="0" cellPadding="0" cellSpacing="0" width="300" className="columnWrapper">
                                                            <tr>
                                                                <td valign="top" className="columnContainer"></td>
                                                            </tr>
                                                        </table>
                                                        {/* {< !--[if (gte mso 9)|(IE)]>
                                                            </td>
                                                            <td align="center" valign="top" width="300" style="width:300px;">
                                                                <![endif]-->} */}
                                                        <table align="left" border="0" cellPadding="0" cellSpacing="0" width="300" className="columnWrapper">
                                                            <tr>
                                                                <td valign="top" className="columnContainer"></td>
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
                                        <table align="center" border="0" cellSpacing="0" cellPadding="0" width="600" style="width:600px;">
                                            <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif]-->} */}
                                            <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" className="templateContainer">
                                                <tr>
                                                    <td valign="top" className="bodyContainer"><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnTextBlock" style={{ minWidth: `100 %` }}>
                                                        <tbody className="mcnTextBlockOuter">
                                                            <tr>
                                                                <td valign="top" className="mcnTextBlockInner" style={{ paddingTop: `9px` }}>
                                                                    {/* {	< !--[if mso]>
                                                                            <table align="left" border="0" cellSpacing="0" cellPadding="0" width="100%" style="width:100%;">
                                                                                <tr>
                                                                                    <![endif]-->

                                                                                    <!--[if mso]>
                                                                                    <td valign="top" width="600" style="width:600px;">
                                                                                        <![endif]-->} */}
                                                                    <table align="left" border="0" cellPadding="0" cellSpacing="0" style={{ maxWidth: `100%`, minWidth: `100%`, width: `100%` }} className="mcnTextContentContainer">
                                                                        <tbody><tr>

                                                                            <td valign="top" className="mcnTextContent" style={{ paddingTop: `0`, paddingRight: `18px`, paddingBottom: `9px`, paddingLeft: `18px` }}>

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
                                                        <table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnDividerBlock" style={{ minWidth: `100 %` }}>
                                                            <tbody className="mcnDividerBlockOuter">
                                                                <tr>
                                                                    <td className="mcnDividerBlockInner" style={{ minWidth: `100%`, padding: `0px 18px` }}>
                                                                        <table className="mcnDividerContent" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ minWidth: `100 %` }}>
                                                                            <tbody><tr>
                                                                                <td>
                                                                                    <span></span>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody></table>
                                                                        {/* {< !--            
                < td className="mcnDividerBlockInner" style="padding: 18px;">
                                                                                    <hr className="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
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
                                                // <table align="center" border="0" cellSpacing="0" cellPadding="0" width="600" style="width:600px;">
                                                //     <tr>
                                                //         <td align="center" valign="top" width="600" style="width:600px;">
                                                //             <![endif]-->} */}
                                            <table align="center" border="0" cellPadding="0" cellSpacing="0" width="100%" className="templateContainer">
                                                <tr>
                                                    <td valign="top" className="footerContainer"><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnImageBlock" style={{ minWidth: `100 %` }}>
                                                        <tbody className="mcnImageBlockOuter">
                                                            <tr>
                                                                <td valign="top" style={{ padding: `9px` }} className="mcnImageBlockInner">
                                                                    <table align="left" width="100%" border="0" cellPadding="0" cellSpacing="0" className="mcnImageContentContainer" style={{ minWidth: `100 %` }}>
                                                                        <tbody><tr>
                                                                            <td className="mcnImageContent" valign="top" style={{ paddingRight: `9px`, paddingLeft: `9px`, paddingTop: `0`, paddingBottom: `0`, textAlign: `center` }}>


                                                                                <img align="center" alt="" src="https://gallery.mailchimp.com/d876b08a2cc0d389689940a4c/images/e8c14899-b9d0-4dcf-bcab-a1fe9d6d9fae.jpg" width="559"
                                                                                    style={{ maxWidth: `559px`, paddingBottom: `0`, display: `inline !important`, verticalAlign: `bottom` }} className="mcnImage"></img>


                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnDividerBlock" style={{ minWidth: `100 %` }}>
                                                            <tbody className="mcnDividerBlockOuter">
                                                                <tr>
                                                                    <td className="mcnDividerBlockInner" style={{ minWidth: `100%`, padding: `5px 18px` }}>
                                                                        <table className="mcnDividerContent" border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ minWidth: `100%`, borderTop: `2px solid #EEEEEE` }}>
                                                                            <tbody><tr>
                                                                                <td>
                                                                                    <span></span>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody></table>
                                                                        {/* {< !--            
                < td className="mcnDividerBlockInner" style="padding: 18px;">
                                                                                        <hr className="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->} */}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnTextBlock" style={{ minWidth: `100 %` }}>
                                                            <tbody className="mcnTextBlockOuter">
                                                                <tr>
                                                                    <td valign="top" className="mcnTextBlockInner" style={{ paddingTop: `9px` }}>
                                                                        {/* { 	< !--[if mso]>
                                                                                        <table align="left" border="0" cellSpacing="0" cellPadding="0" width="100%" style="width:100%;">
                                                                                            <tr>
                                                                                                <![endif]-->

                                                                                                <!--[if mso]>
                                                                                                <td valign="top" width="600" style="width:600px;">
                                                                                                    <![endif]-->} */}
                                                                        <table align="left" border="0" cellPadding="0" cellSpacing="0" style={{ maxWidth: `100%`, minWidth: `100%`, width: `100%` }} className="mcnTextContentContainer">
                                                                            <tbody><tr>

                                                                                <td valign="top" className="mcnTextContent" style={{ paddingTop: `0`, paddingRight: `18px`, paddingBottom: `9px`, paddingLeft: `18px` }}>

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
                                                        </table><table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnFollowBlock" style={{ minWidth: `100 %` }}>
                                                            <tbody className="mcnFollowBlockOuter">
                                                                <tr>
                                                                    <td align="center" valign="top" style={{ padding: `9px` }} className="mcnFollowBlockInner">
                                                                        <table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnFollowContentContainer" style={{ minWidth: `100 %` }}>
                                                                            <tbody><tr>
                                                                                <td align="center" style={{ paddingLeft: `9px`, paddingRight: `9px` }}>
                                                                                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" style={{ minWidth: `100 %` }} className="mcnFollowContent">
                                                                                        <tbody><tr>
                                                                                            <td align="center" valign="top" style={{ paddingTop: `9px`, paddingRight: `9px`, paddingLeft: `9px` }}>
                                                                                                <table align="center" border="0" cellPadding="0" cellSpacing="0">
                                                                                                    <tbody><tr>
                                                                                                        <td align="center" valign="top">
                                                                                                            {/* {< !--[if mso]>
                                                                                                                            <table align="center" border="0" cellSpacing="0" cellPadding="0">
                                                                                                                                <tr>
                                                                                                                                    <![endif]-->

                                                                                                                                    <!--[if mso]>
                                                                                                                                    <td align="center" valign="top">
                                                                                                                                        <![endif]-->} */}


                                                                                                            <table align="left" border="0" cellPadding="0" cellSpacing="0" style={{ display: `inline` }}>
                                                                                                                <tbody><tr>
                                                                                                                    <td valign="top" style={{ paddingRight: `10px`, paddingBottom: `9px` }} className="mcnFollowContentItemContainer">
                                                                                                                        <table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnFollowContentItem">
                                                                                                                            <tbody><tr>
                                                                                                                                <td align="left" valign="middle" style={{ paddingTop: `5px`, paddingRight: `10px`, paddingBottom: `5px`, paddingLeft: `9px` }}>
                                                                                                                                    <table align="left" border="0" cellPadding="0" cellSpacing="0" width="">
                                                                                                                                        <tbody><tr>

                                                                                                                                            <td align="center" valign="middle" width="24" className="mcnFollowIconContent">
                                                                                                                                                <a href="https://twitter.com/Exsustravel/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-twitter-48.png" style={{ display: `block` }} height="24" width="24" className=""></img></a>
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


                                                                                                            <table align="left" border="0" cellPadding="0" cellSpacing="0" style={{ display: `inline` }}>
                                                                                                                <tbody><tr>
                                                                                                                    <td valign="top" style={{ paddingRight: `10px`, paddingBottom: `9px` }} className="mcnFollowContentItemContainer">
                                                                                                                        <table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnFollowContentItem">
                                                                                                                            <tbody><tr>
                                                                                                                                <td align="left" valign="middle" style={{ paddingTop: `5px`, paddingRight: `10px`, paddingBottom: `5px`, paddingLeft: `9px` }}>
                                                                                                                                    <table align="left" border="0" cellPadding="0" cellSpacing="0" width="">
                                                                                                                                        <tbody><tr>

                                                                                                                                            <td align="center" valign="middle" width="24" className="mcnFollowIconContent">
                                                                                                                                                <a href="https://www.facebook.com/ExsusTravel" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-facebook-48.png" style={{ display: `block` }} height="24" width="24" className=""></img></a>
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


                                                                                                            <table align="left" border="0" cellPadding="0" cellSpacing="0" style={{ display: `inline` }}>
                                                                                                                <tbody><tr>
                                                                                                                    <td valign="top" style={{ paddingRight: `10px`, paddingBottom: `9px` }} className="mcnFollowContentItemContainer">
                                                                                                                        <table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnFollowContentItem">
                                                                                                                            <tbody><tr>
                                                                                                                                <td align="left" valign="middle" style={{ paddingTop: `5px`, paddingRight: `10px`, paddingBottom: `5px`, paddingLeft: `9px` }}>
                                                                                                                                    <table align="left" border="0" cellPadding="0" cellSpacing="0" width="">
                                                                                                                                        <tbody><tr>

                                                                                                                                            <td align="center" valign="middle" width="24" className="mcnFollowIconContent">
                                                                                                                                                <a href="https://www.instagram.com/exsustravel/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-instagram-48.png" style={{ display: `block` }} height="24" width="24" className=""></img></a>
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


                                                                                                            <table align="left" border="0" cellPadding="0" cellSpacing="0" style={{ display: `inline` }}>
                                                                                                                <tbody><tr>
                                                                                                                    <td valign="top" style={{ paddingRight: `0`, paddingBottom: `9px` }} className="mcnFollowContentItemContainer">
                                                                                                                        <table border="0" cellPadding="0" cellSpacing="0" width="100%" className="mcnFollowContentItem">
                                                                                                                            <tbody><tr>
                                                                                                                                <td align="left" valign="middle" style={{ paddingTop: `5px`, paddingRight: `10px`, paddingBottom: `5px`, paddingLeft: `9px` }}>
                                                                                                                                    <table align="left" border="0" cellPadding="0" cellSpacing="0" width="">
                                                                                                                                        <tbody><tr>

                                                                                                                                            <td align="center" valign="middle" width="24" className="mcnFollowIconContent">
                                                                                                                                                <a href="http://www.pinterest.com/exsustravel/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-pinterest-48.png" style={{ display: `block` }} height="24" width="24" className=""></img></a>
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
            </body>
        </Html>
    );
}
