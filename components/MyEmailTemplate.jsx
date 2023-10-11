import * as React from 'react';
import { Html, style } from '@react-email/html';
import { Button } from '@react-email/button';

export function MyEmailTemplate(props) {
  const { url } = props;

  return (
    <Html lang="en">
      {/* <Button href={url}>Click me</Button> */}
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
          <tr>
            <td>
              <table class="content" bgcolor="#fff" align="center" style={{ border: `1px solid #666666`, margin: `15px auto` }} cellpadding="0" cellspacing="0" width="600px">
                <tr>
                  <td align="center" bgcolor="#252525" style={{ padding: `15px` }}>
                    <img src="@hosturlimages/images/logo.png" alt="emailer_logo" width="120" height="36" align="center" />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#FFFFFF">
                    <table border="0" cellpadding="0" cellspacing="0" width="95%" align="center" style={{ padding: `0 0 20px` }}>
                      <tr>
                        <td bgcolor="#fff" height="20px" style={{ padding: `15px 5px 0`, fontWeight: `bold`, textTransform: `uppercase` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"> CONTACT US REQUEST </font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="25px" style={{ padding: `15px 5px` }}>
                          <font face="Verdana" color="#5d5d5d" size="2">The following request was recieved at <a href="#" style={{ textDecoration: `none`, color: `#8aad56`, fontWeight: `bold` }}>exsus.com on </a> @CreatedDate</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="25px" style={{ padding: `5px 5px` }}>
                          <font face="Verdana" color="#333333" size="2"><strong>Contact Information </strong></font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>First Name: </strong> @FirstName</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>Last Name: </strong> @LastName</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>Email: </strong> @Email</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>Telephone: </strong> @Telephone</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>Note: </strong> @Note</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>Page Url: </strong> @PageUrl</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>Enquiry reference number: </strong> @EnqRefNo</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>US Site?: </strong> @IsUS</font>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#fff" width="580" height="20px" style={{ padding: `10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                          <font face="Verdana" color="#5d5d5d" size="2"><strong>Submitted at: </strong> @CreatedDate</font>
                        </td>
                      </tr>
                      {/* <tr>
                    <td bgcolor="#fff" width="580" height="20px" style={{ padding:`10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                      <font face="Verdana" color="#5d5d5d" size="2"><strong>Submitted from: </strong> @SubmittedFrom </font>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#fff" width="580" height="20px" style={{ padding:`10px 5px`, borderBottom: `1px solid #f0f0f0` }}>
                      <font face="Verdana" color="#5d5d5d" size="2"><strong>Submission Location: </strong> @SubmittedLocationCode</font>
                    </td>
                  </tr> */}
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </Html>
  );
}
