import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
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
            <header className="brochure_header_row">
                <div className="container-md">
                    <img src="images/brochure_header_img.jpg" alt="brochure_header_img" />
                    <h1>Request Brochures</h1>
                    <p>Our brochure, titled ‘Escape the Obvious’, highlights the very finest experiences in our most popular destinations, and can be used to inspire your clients to discover some of the most spectacular places in the world on a unique, bespoke holiday crafted by our knowledgeable and experienced experts.
                    </p>
                    <p>Below, please specify how many brochures you would like up to the quantity of four, if you require a digital version only please select this option. A digital version will also be sent out to all agents who request brochures in the post.</p>
                </div>
            </header>
            <main className="contact_form_row">
                <div className="container-md">
                    <form>
                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input validatn_cls">
                                    <input type="text" className="form-control" aria-label="First name *" placeholder="First name *" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" className="form-control" aria-label="Last name *" placeholder="Last name *" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="email" className="form-control" aria-label="Email *" placeholder="Email *" />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="number" className="form-control" aria-label="ABTA number *" placeholder="ABTA number *" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" className="form-control" aria-label="Travel agent name *" placeholder="Travel agent name *" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="select_drpdwn validatn_cls">
                                    <select className="form-select" aria-label="How many brochures would you like?">
                                        <option value="Digital brochures only">Digital brochures only</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" className="form-control" aria-label="Address line 1" placeholder="Address line 1" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" className="form-control" aria-label="Address line 2" placeholder="Address line 2" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" className="form-control" aria-label="City" placeholder="City" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" className="form-control" aria-label="State/Prov/Region" placeholder="State/Prov/Region" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" className="form-control" aria-label="Postal/Zip" placeholder="Postal/Zip" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="select_drpdwn validatn_cls">
                                    <select className="form-select" aria-label="Country">
                                        <option selected="">Country</option>
                                        <option value="USA">USA</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Chad">Chad</option>
                                        <option value="China">China</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="contact_form_cntnt">
                        <div className="row">
                            <div className="col-12">
                                <div className="contact_form_cntnt_left">
                                    <h3>Sign Up To Receive Our Trade Newsletters</h3>
                                    <p>We’d love to contact you by newsletter from time to time, including holiday inspiration and special offers for your clients. Please tick the box below if you'd like to hear from us.</p>
                                    <div className="form-check mb-3">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">YES, I'd like to receive the latest news, offers and brochure by email.</label>
                                    </div>
                                    <p>Should you wish to unsubscribe from our e-newsletters at any point, you can do so using the link in the footer of any e-newsletter you receive from us. We will not share your details at any point. For more information about our privacy practices please visit our website. By confirming your subscription below, you agree that we will process your information in accordance with this policy.</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row align-items-center mb-3">
                                    <div className="col-sm-2 col-md-1 text-center mb-3 mb-sm-0">
                                        <img src="images/mailchimp-gdpr.svg" alt="mailchimp-gdpr" />
                                    </div>
                                    <div className="col-sm-10 col-md-11">
                                        <div className="contact_form_cntnt_left">
                                            <p className="mb-0">We use Mailchimp as our marketing platform. By clicking below to subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. <a href="https://mailchimp.com/legal/terms/">Learn more about Mailchimp's privacy practices here.</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase">Request Brochures<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <section className="brochure_testimonial_row">
                <div className="container-md">
                    <p>“Probably the best family holiday we've ever had. The activities were spot on for our adventurous kids”
                        <span>— A Tonge and family travelled to Canada</span>
                    </p>
                </div>
            </section>

            <footer className="brochure_footer_row">
                <p>
                    If you have any issues requesting a brochure,<br />
                    please call us on 0207 563 1304 or email <a href="#">escape@exsus.com</a>
                </p>
            </footer>
        </Layout>
    );
}
