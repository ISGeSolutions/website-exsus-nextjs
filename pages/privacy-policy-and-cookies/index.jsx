import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <Layout>
            <section className="trvl_info_row privacy_policy_row">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">EXSUS TRAVEL’S PRIVACY POLICY</h2>
                        <h2 className="transfrm_none">Your privacy is important to us</h2>
                        <p className="mb-4 text-start">This Privacy Policy explains in detail the types of personal data we may collect about you when you interact with us. It also explains how we’ll store and handle that data, and keep it safe.</p>
                        <p className="text-start">We know that there’s a lot of information here, but we want you to be fully informed about your rights, and how Exsus Travel Limited uses your data. We hope the following sections will answer any questions you have but if not, please do get in touch with us. We may change this policy from time to time. Please check back for updates so you are always fully aware of what information is collected and how it is used.</p>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>1. Who We Are</h2>
                        <p className="mb-4">Exsus Travel Limited is a privately owned UK company specialising in luxury tailor-made holidays around the world.</p>
                        <p className="mb-4">Any personal information provided to or gathered by us is controlled by Exsus Travel Limited a company registered in England at 1 Burwood Place, London, W2 2UT. Company number: 03385363.</p>
                        <p className="mb-4">For simplicity throughout this notice, ‘we’ and ‘us’ means Exsus Travel Limited.</p>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>2. The legal basis of us collecting information</h2>
                        <p className="mb-4">The law on data protection sets out a number of different reasons for which a company may collect and process your personal data, including:</p>
                        <ul className="mb-4">
                            <li className="mb-4">- <b>Consent:</b> In specific situations, we can collect and process your data with your consent. For example, when you tick a box to receive email newsletters.</li>
                            <li className="mb-4">- <b>Contractual Obligations:</b> In certain circumstances, we need your personal data to comply with our contractual obligations. For example, if you book a tailor-made holiday through us, we’ll collect your passport details and use them to book your flights.</li>
                            <li className="mb-4">- <b>Legal Compliance:</b> If the law requires us to, we may need to collect and process your data. For example, we can pass on details of people involved in fraud or other criminal activity affecting Exsus Travel to law enforcements agencies.</li>
                            <li>- <b>Legitimate interest:</b> In specific situations, we require your data to pursue our legitimate interests in a way which might reasonably be expected as part of running our business and which does not materially impact your rights, freedom or interests. For example, we will use your purchase history with us to send you or make available personalised offers.</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>3. When do we collect your information?</h2>
                        <p className="mb-4">The information we collect about you will depend on how you interact with us and what services you arrange with us. Depending on the circumstances, we collect information in any of the following ways:</p>
                        <ul className="mb-4">
                            <li>- When you visit any of our websites</li>
                            <li>- When you enquire or search for a holiday on our website</li>
                            <li>- When you download or install one of our apps</li>
                            <li>- When you contact us at our office or via social media, post or email</li>
                            <li>- When you apply for a job with us by email</li>
                            <li>- When you request a brochure, sign up to receive email updates, or participate in any of our competitions, promotions (for example via any social media channels, email or our website), surveys or market research</li>
                            <li>- When you make a complaint via a third party (such as an airline or hotel)</li>
                            <li>- When you attend any events we host</li>
                            <li>- When you attend our offices which usually have CCTV systems operated for the security of both clients and employees. These systems may record your image during your visit.</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>4. What information do we collect about you?</h2>
                        <p>The type of information we collect about you depends on the nature of your interactions with us. Depending on the circumstances, we collect any of the following:</p>
                        <ul className="mb-4">
                            <li className="mb-4">- <b>Details about you:</b> Name, address, email address, telephone number, date of birth, your hotel room preferences, payment details, your reasons for travel (such as for a wedding, birthday or anniversary), meal and other travel preferences or dietary requirements and, if necessary, information about your health to the extent that is relevant to your fitness to fly, your holiday itinerary or to provide you with special assistance</li>
                            <li className="mb-4">- <b>Identification documents:</b> If you are travelling on a route requiring Advance Passenger Information, your passport or identity card details including your passport number, the country in which your passport was issued and the expiry date.</li>
                            <li className="mb-4">- <b>Details about the services you arrange with us:</b> Your travel details, including your travel itinerary, where you are flying from and to, your booking information, any onward travel details if relevant, details of experiences or excursions booked through us, your baggage requirements, any upgrade information, your lounge visits, seat preferences, meal preferences or requirements, details of any special assistance you might need from us and any other information relevant to enable us to provide you with the travel or other services that you’ve arranged with us.</li>
                            <li className="mb-4">- <b>Your interactions with us:</b> Information about your interactions or conversations with us and our employees, including when you make enquiries, comments, complaints or submit feedback to us, via our website, email or verbally via our experts.</li>
                            <li className="mb-4">- <b>Your use of our systems and services:</b> Details of the way in which you use our website, app and social media pages (please see the “11. OUR SITE, APP AND COOKIES” section below for further details).</li>
                            <li>- <b>Job applications:</b> If you apply for a job with us, your CV, work history, educational details and the role you’re applying for.</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>5. How do we use the information we collect about you?</h2>
                        <p className="mb-4">We’ll use your information for a variety of different purposes, some of which will depend on the services that you engage us for. This includes:</p>
                        <ul className="mb-4">
                            <li className="mb-4">- <b>To manage your booking:</b> We will use your information to provide you with any services that you request or purchase from us. This includes booking your hotel, flight, arranging an excursion, transportation or car hire, and issuing you with your tickets (on the basis of performing our contract with you), and providing you with any special assistance (where you provide your consent)</li>
                            <li className="mb-4">- <b>To send you service communications and support services:</b> We will use your information to send you any communications relevant to the services you’ve requested or purchased from us. This includes sending you an email to notify you of changes to your itinerary, or providing you with a voucher, ticket or e-ticket. We will also provide you with customer service and support, deal with your enquiries, scheduling changes, complaints, comments or observations shared with us (on the basis of performing our contract with you or on the basis of our legitimate interests to provide you with customer service).</li>
                            <li className="mb-4">- <b>To send you marketing communications:</b> We will use your information to keep you up to date with the latest news, events, offers, sales, promotions and competitions that we think might be of interest or relevant to you (either on the basis of your consent where we have requested it, or our legitimate interests to provide you with marketing communications where we may lawfully do so) (please see the “10. MARKETING” section below for more information).</li>
                            <li className="mb-4">- <b>To personalise your customer experience:</b> We use your information to provide you with a more personalised service. For example tailoring the communications that we send to you with your preferred destinations, serving you only with advertising that we think you might like and/or enhancing your holiday experience (on the basis of our legitimate interests to present you with the right kinds of products and services).</li>
                            <li className="mb-4">- <b>To improve our customer service:</b> We may record calls to our office and/or monitor calls for the purposes of improving our customer service, ensure quality assurance, training, security and for general business purposes (on the basis of our legitimate interest in improving our customer service).</li>
                            <li className="mb-4">- <b>To process your job applications:</b> We will use your information to process any job applications that you submit to us, whether directly or via an agent or recruiter (speculatively or in response to any ad) (on the basis of our legitimate interest to recruit new employees or contractors).</li>
                            <li className="mb-4">- <b>To optimise our websites and app:</b> If you use our website or app, we will use your information to ensure that the content from our websites is presented in an effective manner for you and your device, to provide you with access to our site and app in a manner that is effective, convenient and optimal, and to provide you with content that is relevant to you, using site analytics and research and in certain circumstances combining that with other information we know about you (on the basis of our legitimate interests to operate and present an effective and convenient website to our website users).</li>
                            <li className="mb-4">- <b>To ensure security and protect our business interests:</b> In certain circumstances, we use your information to ensure the security of our services, buildings, and our employees, including to protect against, investigate and deter fraud and unauthorised or illegal activities, as well as systems testing, maintenance and development (on the basis of our legitimate interests to operate a safe and lawful business or where we have a legal obligation to do so)</li>
                            <li className="mb-4">- <b>To conduct research:</b> We use your information to carry out research about general engagement with our services and systems, or if you choose to participate in customer surveys, consumer focus groups and research (on the basis of our legitimate interests to improve our products, services and customer service).</li>
                            <li>- <b>To comply with our legal obligations:</b> In certain circumstances, we will need to use your information to comply with our legal obligations, for example to comply with any court orders or subpoenas (on the basis of our legitimate interests to comply with a legal obligation).</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>6. Who do we share your information with?</h2>
                        <ul className="mb-4">
                            <li className="mb-4">- <b>Third party suppliers that we work with to fulfil your booking:</b> We may share your information with third party suppliers that provide us with services in connection with the provision of our services to you. This includes for example: airlines, hotels, transport companies, excursion providers, airport authorities, insurance companies, car hire companies, ground handling agencies and postal companies, such as Royal Mail, to send out your itineraries.</li>
                            <li className="mb-4">- <b>Other third party suppliers that we work with in connection with our business:</b> We share your information with third party suppliers that provide us with services in connection with our business and the provision of our services to you. This includes for example: marketing agencies that run our marketing campaigns, IT developers, service providers and hosting providers, third parties that manage promotions or competitions that we may run, third party software companies that provide us with applications on a white label basis (for example, a product produced by one company and sold by another company under their brand), advertising providers and networks, ground agents, site analytics providers, medical service providers and credit card screening companies.</li>
                            <li className="mb-4">- <b>Airports, immigration and other government authorities:</b> Some destinations require airlines and tour operators to provide “Advance Passenger Information” about you to the border/immigration authorities of the country of your travel destination. Advance Passenger Information comprises the basic information contained in your passport that you would be required to present on your arrival.</li>
                            <li className="mb-4">- <b>Third parties for marketing:</b> We share your information with selected third party when you consent to us sharing your information for marketing purposes. For example, when you enter a competition you would need to give consent to receiving marketing from the prize supplier (e.g. hotel, airline) if that is a third party.</li>
                            <li>- <b>Courts or advisors:</b> We share your information with other third parties (including legal services, accountants or other advisors, regulatory authorities, courts and government agencies) where necessary to enable us to enforce our legal rights, or to protect the rights, property or safety of our employees or where such disclosure may be permitted or required by law.</li>
                        </ul>
                        <p className="mb-4">Where we do share your information with third parties, we will require them to maintain appropriate security to protect your information from unauthorised access or processing, unless we have no ability to do so (for example, where we are sharing information with border agencies or enforcement authorities).</p>
                        <p className="mb-4">If you have been referred to us from another site or by any other third party, the information that you provide to them will also be governed by their privacy policy, which we recommend you read. The website may also include hyperlinks to other websites. If you use the hyperlinks then you will be leaving the website. Your access and use of other websites will not be governed by this policy statement and it is your responsibility to check the other websites and the privacy policies that may govern those sites to ascertain how your information and data will be treated if you access and use them.</p>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>7. Where your personal data may be processed</h2>
                        <p>Due to the nature of our business, sometimes we will need to share your personal data with third parties and suppliers outside the European Economic Area (EEA). Countries outside of the EEA protect information differently, and so where we do transfer your information to suppliers based outside of the EEA, we will take all steps necessary to ensure that it is adequately protected and used in accordance with this Privacy Policy.</p>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>8. How long do we keep your information for?</h2>
                        <p>We keep your information for as long as is reasonably necessary to enable us to provide you with the services that you have requested from us, to comply with any legal obligations that require us to keep information, or for as long as we reasonably require for our legitimate interests, including for example for the purposes of exercising our legal rights or defending ourselves against claims.</p>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>9. What are your rights?</h2>
                        <p className="mb-4">You have the right to request the following:</p>
                        <ul className="mb-4">
                            <li>- Access to the personal data we hold about you, free of charge in most cases.</li>
                            <li>- The correction of your personal data when incorrect, out of date or incomplete.</li>
                            <li>- That we stop using your personal data for direct marketing (either through specific channels, or all channels).</li>
                            <li>- That we stop any consent-based processing of your personal data after you withdraw that consent.</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>10. Marketing</h2>
                        <p className="mb-4">We will keep you up to date with our latest news, offers, partnerships, promotions and competitions that we think might be of interest / relevant to you if you have indicated that you are happy to receive marketing communications from us – that is, if you have:</p>
                        <ul className="mb-4">
                            <li>- Purchased services such as a holiday from us and have not told us that you don’t want to hear from us.</li>
                            <li>- Signed up to receive marketing communications from us and have not later told us that you don’t want to hear from us.</li>
                        </ul>
                        <p className="mb-4">If you no longer want to hear from us, you can opt out or unsubscribe by:</p>
                        <ul className="mb-4">
                            <li>- Clicking the “unsubscribe” link contained in any marketing communications that you receive from us.</li>
                            <li>- By email: <a href="#">escape@exsus.com</a></li>
                            <li>- By Phone: 020 7563 1300</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>11. Our Site, App and Cookies</h2>
                        <p className="mb-4">As you may already know, most sites and apps collect certain information automatically in log files about the way in which you interact with them. This might include your IP address, geographical location, device information (such as your hardware model, mobile network information, unique device identifiers), browser type, referral source, length of visit to the site or app, number of page views, the search queries you make, and similar information.</p>
                        <p className="mb-4">This information will be collected by us or by a third party site analytics service provider, such as Google Analytics, and will be collected using cookies.</p>
                        <p className="mb-4">As we’ve described above, we use this information to save your settings, to help improve our functionality and services, run diagnostics, analyse trends, track visitor movements, gather broad demographic information and personalise our services.</p>
                        <p className="mb-4">Cookies are small amounts of information in the form of text files that we store on the device you use to access our site or our marketing communications. Cookies allow us to monitor your use of our services and improve them. For example, a temporary cookie is also used to keep track of your browsing "session".</p>
                        <p className="mb-4">We also use cookies for site analytics purposes and to monitor how customers interact with and receive our marketing communications (for example if you open the marketing communication and/or click on any of our offers). We use this information to try to improve the relevance and tone of our future communications to ensure we’re serving you as best as we can.</p>
                        <p className="mb-4">If you don’t want cookies to be installed on your device, you can change the settings on your browser or device to reject cookies. For more information about how to reject cookies using your internet browser settings, please consult the “Help” section of your internet browser or visit http://www.aboutcookies.org. Please note that if you do set your internet browser to reject cookies, you may not be able to access all of the functions of the site.</p>
                    </div>
                    <div className="trvl_info_cntnt text-start">
                        <h2>12. Any Questions</h2>
                        <p className="mb-4">We hope this Privacy Policy has been helpful in setting out the way we handle your personal data and your rights to control it.</p>
                        <p className="mb-4">If you have any questions that haven’t been covered, please contact us below:</p>
                        <ul className="mb-4">
                            <li>- By email: <a href="#">escape@exsus.com</a></li>
                            <li>- By post: Communications Department, Exsus Travel, 1 Burwood Place, London, W2 2UT</li>
                        </ul>
                        <p className="mb-4">This policy is effective from 30th April 2018.</p>
                    </div>
                </div>
            </section>

            <section className="make_enqury_row">
                <div className="container">
                    <h3>START PLANNING YOUR NEXT TRIP</h3>
                    <p>Call our team on 020 7337 9010</p>
                    <button className="btn prmry_btn make_enqury_btn" onClick="window.open('contact_us.html')">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <form className="newslettr_form d-block d-sm-flex">
                        <div className="newlettr_inpt">
                            <input type="text" className="form-control" placeholder="Full name and title" />
                        </div>
                        <div className="newlettr_inpt ps-0 ps-sm-2">
                            <input type="email" className="form-control" placeholder="Your email address" />
                        </div>
                        <div className="newlettr_btn ps-0 ps-sm-2">
                            <button type="submit" className="btn btn-primary prmry_btn">Sign up
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
