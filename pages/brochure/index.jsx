import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default Index;

function Index() {
    // const [users, setUsers] = useState(null);
    // useEffect(() => {
    //     userService.getAll().then(x => setUsers(x));
    // }, []);

    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required('Title is required'),
        lastname: Yup.string()
            .required('First Name is required'),
        email: Yup.string()
            .required('Email is required'),
        abtanumber: Yup.string()
            .required('EBTA number is required'),
        travelagentname: Yup.string()
            .required('Travel agent name is required'),
        digitalbrochureonly: Yup.string()
            .required('digital brochure is required'),
        addressline1: Yup.string()
            .required('Address line 1 required'),
        addressline2: Yup.string()
            .required('Address line 2 is required'),
        city: Yup.string()
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
        zip: Yup.string()
            .required('Zip code is required'),
        country: Yup.string()
            .required('Country is required'),
        yes: Yup.string()
            .required('Checkbox is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        console.log('onSubmit', data);
        return contactusService.makeanenquiry(data)
            .then(() => {
                alertService.success('Make an enquiry successful', { keepAfterRouteChange: true });
                router.push('contact-us');
            })
            .catch(alertService.error);
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-md">
                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="firstname" {...register('firstname')} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} aria-label="First name *" placeholder="First name *" />
                                    <div className="invalid-feedback mb-1">{errors.firstname?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="title" {...register('lastname')} className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} aria-label="Last name *" placeholder="Last name *" />
                                    <div className="invalid-feedback mb-1">{errors.lastname?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="email" name="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} aria-label="Email *" placeholder="Email *" />
                                    <div className="invalid-feedback mb-1">{errors.email?.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="number" name="abtanumber" {...register('abtanumber')} className={`form-control ${errors.abtanumber ? 'is-invalid' : ''}`} aria-label="ABTA number *" placeholder="ABTA number *" />
                                    <div className="invalid-feedback mb-1">{errors.abtanumber?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="travelagentname" {...register('travelagentname')} className={`form-control ${errors.travelagentname ? 'is-invalid' : ''}`} aria-label="Travel agent name *" placeholder="Travel agent name *" />
                                    <div className="invalid-feedback mb-1">{errors.travelagentname?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="select_drpdwn">
                                    <select name="digitalbrochureonly" {...register('digitalbrochureonly')} className={`form-select select_drpdwn ${errors.digitalbrochureonly ? 'is-invalid' : ''}`} aria-label="How many brochures would you like?">
                                        <option value="Digital brochures only">Digital brochures only</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    <div className="invalid-feedback mb-1">{errors.digitalbrochureonly?.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="addressline1" {...register('addressline1')} className={`form-control ${errors.addressline1 ? 'is-invalid' : ''}`} aria-label="Address line 1" placeholder="Address line 1" />
                                    <div className="invalid-feedback mb-1">{errors.addressline1?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="addressline2" {...register('addressline2')} className={`form-control ${errors.addressline2 ? 'is-invalid' : ''}`} aria-label="Address line 2" placeholder="Address line 2" />
                                    <div className="invalid-feedback mb-1">{errors.addressline2?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="city" {...register('city')} className={`form-control ${errors.city ? 'is-invalid' : ''}`} aria-label="City" placeholder="City" />
                                    <div className="invalid-feedback mb-1">{errors.city?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="state" {...register('state')} className={`form-control ${errors.state ? 'is-invalid' : ''}`} aria-label="State/Prov/Region" placeholder="State/Prov/Region" />
                                    <div className="invalid-feedback mb-1">{errors.state?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" name="zip" {...register('zip')} className={`form-control ${errors.zip ? 'is-invalid' : ''}`} aria-label="Postal/Zip" placeholder="Postal/Zip" />
                                    <div className="invalid-feedback mb-1">{errors.zip?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div name="country" {...register('country')} className={`select_drpdwn ${errors.country ? 'is-invalid' : ''}`}>
                                    <select className="form-select" aria-label="Country">
                                        <option selected="">Country</option>
                                        <option value="USA">USA</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Chad">Chad</option>
                                        <option value="China">China</option>
                                    </select>
                                    <div className="invalid-feedback mb-1">{errors.country?.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="contact_form_cntnt">
                            <div className="row">
                                <div className="col-12">
                                    <div className="contact_form_cntnt_left">
                                        <h3>Sign Up To Receive Our Trade Newsletters</h3>
                                        <p>We’d love to contact you by newsletter from time to time, including holiday inspiration and special offers for your clients. Please tick the box below if you'd like to hear from us.</p>
                                        <div className="form-check mb-3">
                                            <input type="checkbox" name="yescheckbox" {...register('yescheckbox')} className={`form-check-input ${errors.yescheckbox ? 'is-invalid' : ''}`} id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">YES, I'd like to receive the latest news, offers and brochure by email.</label>
                                            <div className="invalid-feedback mb-1">{errors.yescheckbox?.message}</div>
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
                                    <button className="btn prmry_btn make_enqury_btn mx-auto text-uppercase">Request Brochures<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>

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
