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
            <section className="trvl_info_row terms_conditions_row">
                <div className="container">
                    <div className="bookmark_row">
                        <ul>
                            <li><a href="homepage.html">Home</a></li>
                            <li>Terms and conditions</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="trvl_title">WEBSITE TERMS OF USE</h2>
                        <h2 className="transfrm_none">Your attention is drawn to the clauses in these Conditions in bold type which exclude or limit Exsus Travel Limited's liability.</h2>
                        <h2 className="small_title_text">1. BASIS OF AGREEMENT</h2>
                        <p className="mb-4">Your use of this website ("the Website") is subject to these Conditions, which may be amended from time to time. Accordingly, by using the Website you are deemed to accept these Conditions without modification by you. If you do not agree with these Conditions you are not authorised to use the Website.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="small_title_text">2.0 USE OF THE WEBSITE</h2>
                        <ul>
                            <li><i>2.1</i> You acknowledge that your use of the Website and submittal of an enquiry reply form does not constitute a contract or other agreement between you and us and that the Website solely provides a venue for us to advertise our products and services.</li>
                            <li><i>2.2</i> We grant you the right to access the Website for your personal and non-commercial use. You may for your own use only, view, copy and print out materials included on it (except for any source codes).</li>
                            <li><i>2.3</i> Subject to clause 2.2, you may not modify, copy, distribute, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products or services obtained from the Website, its contents and any related software.</li>
                            <li><i>2.4</i> You warrant to us that you will not use the Website for any purpose that is unlawful or prohibited, or not authorised, by these Conditions.</li>
                            <li><i>2.5</i> You acknowledge that the inclusion of hyperlinks on the Website does not imply any endorsement by us of the material on such websites or any association with their operators and that if you use these hyperlinks you will be leaving the Website.</li>
                            <li><i>2.6</i> You acknowledge that when you click on a link which takes you to a third party website, we are not responsible for the content on the website.</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="small_title_text">3. INTELLECTUAL PROPERTY RIGHTS</h2>
                        <p className="mb-4">You acknowledge that the copyright in and all other intellectual property rights in the Website, its contents and the underlying software and any related software belong to, or are licensed to us and that, except as provided by these Conditions, you will acquire no rights in the Website, its contents and/or the underlying software and/or any related software</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="small_title_text">4. VIRUSESS</h2>
                        <p>Whilst we will take reasonable steps to exclude viruses from the Website, we cannot guarantee such exclusion and no liability is accepted for viruses. You are recommended to take all appropriate safeguards against viruses before accessing the Website, its contents and the underlying software and/or any related software.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="small_title_text">5. OUR OBLIGATIONS AND DISCLAIMER</h2>
                        <ul>
                            <li><i>5.1</i> We may at any time and for any reason correct without liability any typographical, clerical or other error or omission in the information contained on the Website, and we reserve the right to make amendments and/or improvements of or to the Website at any time.</li>
                            <li><i>5.2</i> The material featured on the Website is provided on an "as is" and "as available" basis. The descriptions given on the Website are based on inspections made on our behalf and on information passed to us. Inspections can take place several months before the information appears on the Website. Descriptions given are therefore descriptions of what normally exists at a given destination or venue. Further, the available facilities and amenities may be affected by local conditions, such as inclement weather, or the season: for example, but without limitation, entertainment is often sporadic or non-existent in low season. Accordingly we do not give any warranty (express or implied) or make any representation that:</li>
                            <li><i>5.2.1</i> the material will be suitable for any particular requirement of yours or use by you;</li>
                            <li><i>5.2.2</i> our online service will operate error free or without interruption or that any errors will be corrected; or</li>
                            <li><i>5.2.3</i> the material is complete, accurate or up to date.</li>
                            <li><i>5.3</i> We have no liability for any errors or omissions in postings or for hyperlinks contained on the Website. We shall exercise reasonable care in compiling the Website; however we have no liability for any action (or any lack of action) taken by any person or organisation, wherever they are based, as a result, direct or otherwise, of information contained on the Website.</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="small_title_text">6. LIABILITY</h2>
                        <ul>
                            <li><i>6.1</i> Subject to clauses</li>
                            <li><i>6.2</i> our liability, and the liability of our agents, employees and sub-contractors, to you or any other party for any loss or damage whatsoever arising in connection with the Website, its contents or any use of it or them (whether under these Conditions or any contract or in consequence of misrepresentation, mis-statement or tortious act or omission, or otherwise, including, without limitation, liability for negligence or breach of statutory duty) is limited as follows:</li>
                            <li><i>6.1.1</i> no liability is accepted for any financial loss or loss of anticipated savings, profits or otherwise;</li>
                            <li><i>6.1.2</i> no liability is accepted for any consequential loss or damage, costs, expenses or other claims for consequential compensation whatsoever (whether or not we have been advised of the possibility of such loss occurring); and/or</li>
                            <li><i>6.1.3</i> all other liability is limited as per the booking conditions that are supplied with each booking and which are available separately on request.</li>
                            <li><i>6.2</i> Nothing in these Conditions shall exclude our liability for death or personal injury as a result of negligence.</li>
                            <li><i>6.3</i> In accordance with the Consumer Transactions (Restrictions on Statements) Order 1976 nothing in these Conditions shall affect your statutory rights as a consumer.</li>
                        </ul>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="small_title_text">7. MATTERS BEYOND OUR REASONABLE CONTROL</h2>
                        <p>If we cannot provide you with access to the Website and/or the on-line services in accordance with these Conditions because of something beyond our reasonable control, including (without limitation) act of God, lightning, flood, exceptionally severe weather, fire, explosion, war, civil disorder, industrial disputes, acts or omissions of persons for whom we are not responsible (including telecommunications and internet service providers) or acts of local or central Government or other competent authorities, we will not be liable to you as a result.</p>
                    </div>
                    <div className="trvl_info_cntnt">
                        <h2 className="small_title_text">8. GENERAL</h2>
                        <ul>
                            <li><i>8.1</i> These Conditions constitute the entire agreement between you and us relating to your use of the Website, supersede any previous agreement or understanding and may not be varied by you. All other terms and conditions, express or implied by statute or otherwise, but subject to clauses 1 above and</li>
                            <li><i>8.2</i> below, are excluded to the fullest extent permitted by law.</li>
                            <li><i>8.3</i> In these Conditions words importing gender include each other gender; references to persons include bodies corporate, firms and unincorporated associations; and the singular includes the plural and vice versa.</li>
                            <li><i>8.4</i> The headings in these Conditions are included for convenience only and shall not affect their interpretation.</li>
                            <li><i>8.5</i> Nothing in these Conditions is expressly or impliedly intended to confer on any third party any right to enforce any of its provisions pursuant to the Contracts (Rights of Third Parties) Act 1999 except our agents, employees and sub-contractors as provided for by clause.</li>
                            <li><i>8.6</i> Any notice required or permitted to be given by either of us to the other under these Conditions shall be in writing and in the English language and addressed to us at our registered office and to you at the address given on the [enquiry reply form] or to such other address as may at the relevant time have been notified to the other by giving notice pursuant to this clause. Any such notice shall be sufficiently given if forwarded by first className pre-paid mail (if both of us are situated within the United Kingdom) or sent by air mail (in all other circumstances) and shall be deemed to have been received and given (a) in the case of first className pre-paid mail, two days after the date of mailing and (b) in the case of pre-paid air mail, 7 days after the date of mailing.</li>
                            <li><i>8.7</i> No delay or failure by us to exercise any of our powers, rights and remedies under these Conditions shall operate as a waiver of them, nor shall any single or partial exercise of any such powers, rights or remedies preclude any other or further exercise of them. No waiver by us of any breach of these Conditions by you shall be considered as a waiver of any subsequent breach of the same or any other provision.</li>
                            <li><i>8.8</i> In the event that a provision is rendered void or unenforceable it shall be ineffective to the extent of such invalidity or unenforceability without invalidating or rendering unenforceable the remaining provisions of these Conditions, and any such invalidity or unenforceability in any jurisdiction shall not invalidate or render unenforceable that provision or those other provisions in any other jurisdiction.</li>
                            <li><i>8.9</i> These Conditions are subject to the laws of the United Kingdom and you agree for our benefit to submit to the exclusive jurisdiction of the UK Courts.</li>
                            <li><i>8.10</i> Use of the Website is unauthorised in any jurisdiction that does not give effect to any provisions of these Conditions, including (without limitation) clause</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="make_enqury_row">
                <div className="container">
                    <h3>YOUR JOURNEY STARTS HERE</h3>
                    <p>call us on 020 7337 9010 to start planning your perfect trip</p>
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
