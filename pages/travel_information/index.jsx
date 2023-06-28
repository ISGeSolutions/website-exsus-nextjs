import { useState, useEffect } from 'react';

import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <Layout>
            {/* <h4 className='mt-2'>This is destination page</h4> */}
            <section className="trvl_info_row">
                <div className="container-md">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li><a href="about_us.html">About us</a></li>
                            <li>Useful links</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">Travel information</h2>
                        <p>Exsus Travel is committed to safe and responsible travel. The links below provide pre-trip advice and practical information for all your holiday essentials. Please advise your travel expert of any special requirements at the outset of the booking process.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>TRAVEL ADVICE</h2>
                        <p>The Foreign, Commonwealth & Development Office have up-to-date advice on staying safe and healthy abroad. For the latest travel advice from the Foreign & Commonwealth Office including security and local laws, plus passport and visa information check: <a href="#">www.gov.uk/foreign-travel-advice</a></p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>ABTA PROTECTION</h2>
                        <p className="mb-4">Exsus Travel Ltd is a Member of ABTA with membership number Y6561. ABTA and ABTA Members help holidaymakers to get the most from their travel and assist them when things do not go according to plan. We are obliged to maintain a high standard of service to you by ABTA’s Code of Conduct. We can also offer you ABTA’s scheme for the resolution of disputes which is approved by the Chartered Trading Standards Institute. If we can’t resolve your complaint, go to <a href="#">www.abta.com</a> to use ABTA’s simple procedure. Further information on the Code and ABTA’s assistance in resolving disputes can be found on <a href="#">www.abta.com.</a></p>
                        <p>For further information about ABTA, the Code of Conduct and the arbitration scheme available to you if you have a complaint, contact ABTA, 30 Park Street, London SE1 9EQ. Tel: 020 3117 0500 or <a href="#">www.abta.com.</a></p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>ATOL PROTECTION</h2>
                        <p>Flights that are sold with a UK departure and flight-inclusive holidays that are sold within the EEA on this website are financially protected by the ATOL scheme. Please ask us to confirm what protection may apply to your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL-protected. Please see our booking terms for information or for more information about financial protection and the ATOL Certificate go to: <a href="#">www.caa.co.uk.</a> Our ATOL number is 5126.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>AITO MEMBERSHIP</h2>
                        <p className="mb-4">Exsus Travel is a member of AITO, The Specialist Travel Association. AITO encourages the highest standards in all aspects of tour operating and customer service. Exsus Travel abides by the Association’s Code of Conduct and Quality Charter.</p>
                        <p>Visit <a href="#">www.aito.com</a> for more information</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>PASSPORT & VISAS</h2>
                        <p>Please ensure all passports have a minimum of 6 months validity on your return date of travel, visas may be required, and it is your responsibility to ensure you obtain the appropriate visa for the country you are visiting and hold valid passports. You can check your visa requirements by contacting your local embassy or by visiting: <a href="#">www.cibtvisas.co.uk/exsus.</a></p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>TRAVEL TO USA</h2>
                        <p>Those seeking to travel to the United States under the Visa Waiver Program are subject to enhanced security requirements. All eligible travellers who wish to travel under the Visa Waiver Program must apply for authorisation before travel using the following process:  <a href="#">https://esta.cbp.dhs.gov</a></p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>HEALTH</h2>
                        <p>Please ensure you have the correct vaccinations before travelling and note that some countries require certificates for mandatory vaccinations. Visit the NHS website for advice and speak with your GP or a travel clinic well in advance of your journey. <a href="#">www.fitfortravel.nhs.uk</a></p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2>TRAVEL INSURANCE</h2>
                        <p>Please take the time to ensure you have adequate travel insurance for your trip when you book your holiday so that you have cover in the event of cancellation, such as due to an illness or a serious accident. Cover should also include medical expenses and repatriation in the event of accident or illness.  We also recommend you have cover for personal belongings, travel delay, personal liability and overseas legal expenses. If you intend to take part in any adventurous activities or sports on your trip, including trekking, you should ensure you have sufficient cover for these also.</p>
                    </div>
                </div>
            </section>

            <section className="make_enqury_row">
                <div className="container-md">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
                    <button className="btn prmry_btn make_enqury_btn">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                    </button>
                </div>
            </section>

            <section aria-label="Sign up for newsletter" className="newslettr_row">
                <div className="container-md">
                    <h4>Sign up for our newsletter</h4>
                    <h5>Receive our latest news and special offers</h5>
                    <Signup />
                    {/* <form className="newslettr_form d-block d-sm-flex">
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
                    </form> */}
                </div>
            </section>
        </Layout>
    );
}
