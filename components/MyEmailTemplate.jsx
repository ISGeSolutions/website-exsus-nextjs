import React from 'react';
import { Email, Item, A } from 'react-html-email';

const MyEmailTemplate = ({ props }) => {
  console.log('props', props);
  <Email title="My Email Template">
    <Item>
      <h1>Hello, World!</h1>
      <p>This is a sample email template.</p>
      <A href="https://example.com">Visit Example.com</A>
    </Item>
  </Email>
}
 
// const MyEmailTemplate = (props) => (
//   <Email title="My Email Template">
//     <Item>
//       <h1>Hello, World!</h1>
//       <p>This is a sample email template.</p>
//       <A href="https://example.com">Visit Example.com</A>
//     </Item>
//   </Email>
// );

export default MyEmailTemplate;
