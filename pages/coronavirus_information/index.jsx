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
                    <li>Coronavirus Travel information</li>
                </ul>
            </div>

            <div className="trvl_info_cntnt">
                <h2 className="trvl_title">Coronavirus Travel information</h2>
                <p className="mb-4">The outbreak of Coronavirus (Covid-19) has, understandably, caused a lot of uncertainty around international travel and whether or not it is safe to do so. Please be assured that at Exsus Travel the wellbeing of our travellers is our primary concern and we are doing all we can to help those impacted by this ongoing, unprecedented situation. </p>
                <p>To do this we are working closely with our partners on the ground in every country, ensuring we always have the most up-to-date information to hand, and liaising with our hotels and guides to ensure that our travellers are as safe as possible, without impacting on the quality of our luxury tailor-made holidays. This includes ensuring current local guidelines and procedures in all our destinations are strictly adhered to and securely in place, including on social distancing, hygiene and sanitation. We are also carefully following the Government's Foreign, Commonwealth & Development Office (FCDO) guidance on foreign travel.</p>
            </div>
            <div className="trvl_info_cntnt">
                <h2 className="trvl_title_white">NEW FLEXIBLE BOOKING CONDITIONS</h2>
                <p className="mb-4">While we understand that many people have put holiday plans on hold during this difficult time, we want to encourage you not to forget your thirst for new adventures and desire to see the world. A holiday is something to look forward to, and we’d argue that that’s something we all really need right now!</p>
                <p className="mb-4">So, to help make planning your next holiday a little easier, we have put in place a set of new flexible booking conditions.</p>
                <p>For any new bookings for the foreseeable future, we will waive our own amendment and cancellation charges, and you will only be required to cover the cost of any applicable airline, hotel and other third-party supplier charges.</p>
            </div>
            <div className="trvl_info_cntnt">
                <h2 className="trvl_title_white">ADDITIONAL INFORMATION</h2>
                <p className="mb-4">You should be aware that, in order to limit an increase in Coronavirus cases, many countries have changed their entry requirements and introduced Coronavirus screening policies and other rules and regulations for travellers - and this situation regularly changes in destinations around the world. We would always recommend that you comply with these procedures and check the FCDO website in advance of your trip for more detailed, destination-specific information at the time of travel. In cases where you are are due to travel to a country that the FCDO advises against 'all but essential' travel to, our experts will reach out to organise alternative arrangements.</p>
                <p className="mb-4">Official guidance and information, including the countries that are currently exempt from FCDO advice against 'all but essential' travel, can be found on the <a href="https://www.gov.uk/foreign-travel-advice" target="_blank">Foreign Commonwealth & Development Office website</a> and on the <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank">World Health Association (WHO) website.</a></p>
                <p>The thrill of travel and discovering new places never goes away, and we continue to offer holidays and experiences that go above and beyond, in usual Exsus style - we want you to get back out into the world as soon and as safely as possible. We are here for you: if you have any questions or concerns regarding your holiday(s) with us and on the destinations that are best to visit at any given time, please contact our Exsus experts, who will be happy to assist and offer their advice and recommendations. </p>
            </div>
        </div>
    </section>

    <section className="tailor_made_holidys_row">
        <div className="container-md">
            <div className="tailor_made_holidys_inr">
                <h3>All Exsus Travel holidays are tailor-made</h3>
                <p>All itineraries on our website are designed as a starting point. Tell us your budget/wishlist/preferred length of stay and we'll help you select the best hotels and experiences, so your holiday is totally personalised.</p>
                <div className="btn_grp">
                    Call 020 7337 9010 or 
                    <button className="m-2 btn prmry_btn make_enqury_btn">Make an enquiry
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <section className="make_enqury_row">
        <div className="container-md">
            <h3>YOUR JOURNEY STARTS HERE</h3>
            <p>call us on 020 7337 9010 to start planning your perfect trip</p>
            <button className="btn prmry_btn make_enqury_btn">Make an enquiry
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"/></svg>
                    </button>
                </div>
                </form> */}
        </div>
    </section>
        </Layout>
    );
}
