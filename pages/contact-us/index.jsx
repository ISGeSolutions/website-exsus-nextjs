import { useState, useEffect } from 'react';
import { Link, Spinner, Signup } from 'components';
import { Layout } from 'components/users';
import { contactusService, alertService } from 'services';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default Index;

function Index() {
    // const [users, setUsers] = useState(null);
    // useEffect(() => {
    //     userService.getAll().then(x => setUsers(x));
    // }, []);
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Please select title'),
        firstname: Yup.string()
            .required('First Name is required'),
        surname: Yup.string()
            .required('Surname is required'),
        email: Yup.string()
            .required('Email address is required'),
        telephone: Yup.string()
            .required('Telephone is required'),
        besttimetocall: Yup.string(),
        liketogo: Yup.string()
            .required('Please enter where would you like to go?'),
        tellus: Yup.string(),
        getintouch: Yup.string()
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // console.log('onSubmit', data);
        return contactusService.makeanenquiry(data)
            .then(() => {
                alertService.success('Make an enquiry successful', { keepAfterRouteChange: true });
                router.push('contact-us');
            })
            .catch(alertService.error);
    }


    return (
        <Layout>
            {/* <h4 className='mt-2'>This is destination page</h4> */}
            <section className="contact_form_row">
                <div className="container-md">
                    <h2>Escape the obvious - tailor-make your trip today</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-4">
                                <div className="select_drpdwn">
                                    <select aria-label="Title" name="title" {...register('title')} className={`form-select ${errors.title ? 'is-invalid' : ''}`}>
                                        <option value="">Title *</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Dr">Dr</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Lord">Lord</option>
                                        <option value="Lady">Lady</option>
                                        <option value="Sir">Sir</option>
                                    </select>
                                    <div className="invalid-feedback mb-1">{errors.title?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" aria-label="First name *" placeholder="First name *" name="firstname" {...register('firstname')} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback mb-1">{errors.firstname?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="text" aria-label="Surname *" placeholder="Surname *" name="surname" {...register('surname')} className={`form-control ${errors.surname ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback mb-1">{errors.surname?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="email" aria-label="Email *" placeholder="Email *" name="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback mb-1">{errors.email?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="form-input">
                                    <input type="number" aria-label="Telephone *" placeholder="Telephone *" name="telephone" {...register('telephone')} className={`form-control ${errors.telephone ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback mb-1">{errors.telephone?.message}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className="select_drpdwn">
                                    <select aria-label="Best time to call" name="besttimetocall" {...register('besttimetocall')} className={`form-select ${errors.besttimetocall ? 'is-invalid' : ''}`}>
                                        <option value="">Best time to call</option>
                                        <option value="No Preference">No Preference</option>
                                        <option value="8.30am - 12pm (GMT)">8.30am - 12pm (GMT)</option>
                                        <option value="12pm - 3pm (GMT)">12pm - 3pm (GMT)</option>
                                        <option value="12pm - 3pm (GMT)">12pm - 3pm (GMT)</option>
                                        <option value="3pm - 6pm (GMT)">3pm - 6pm (GMT)</option>
                                    </select>
                                    <div className="invalid-feedback mb-1">{errors.besttimetocall?.message}</div>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-4">
                            <div className="col-12">
                                <div className="form_input">
                                    <input type="text" aria-label="Where & When you would like to go?" placeholder="Where & When you would like to go? *" name="liketogo" {...register('liketogo')} className={`form-control ${errors.liketogo ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback mb-1">{errors.liketogo?.message}</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form_textarea">
                                    <textarea placeholder="Tell us more about your plans i.e. how much you would like to spend, who is travelling, what is important to you etc?" rows="3" name="tellus" {...register('tellus')} className={`form-control ${errors.tellus ? 'is-invalid' : ''}`}>
                                    </textarea>
                                    <div className="invalid-feedback mb-1">{errors.tellus?.message}</div>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-4">
                            <div className="col-sm-6 col-md-7">
                                <div className="select_drpdwn">
                                    <select aria-label="What prompted you to get in touch?" name="getintouch" {...register('getintouch')} className={`form-select ${errors.getintouch ? 'is-invalid' : ''}`}>
                                        <option value="">What prompted you to get in touch?</option>
                                        <option value="Repeat client">Repeat client</option>
                                        <option value="Friend or Family">Friend or Family</option>
                                        <option value="Google search">Google search</option>
                                        <option value="Google advert">Google advert</option>
                                        <option value="Social media">Social media</option>
                                        <option value="Website or blog">Website or blog</option>
                                        <option value="Other*">Other*</option>
                                    </select>
                                    <div className="invalid-feedback mb-1">{errors.getintouch?.message}</div>
                                    <span className="form_input_info">* Required form fields</span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-5">
                                <button disabled={formState.isSubmitting} type="submit" className="btn btn-primary prmry_btn">
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}Send Enquiry
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="contact_form_cntnt">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="contact_form_cntnt_left">
                                    <h3>Sign Up To Receive Our Newsletters & Brochure</h3>
                                    <p>We’d love to contact you by newsletter from time to time, including holiday inspiration and special offers. Please tick the box below if you'd like to hear from us. If you wish to unsubscribe, you can do so at any time. We will not share your details at any point.</p>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">YES, I'd like to receive the latest news, offers and brochure by email.</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact_form_cntnt_right mt-3 mt-lg-0">
                                    <p>Alternatively, call <span>020 7337 9010</span> or email <a href="#">escape@exsus.com</a> to speak to one of our travel experts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text_overlay_row">
                <div className="container-md">
                    <h4>Book with Confidence</h4>
                    <h5>ATOL, ABTA & AITO PROTECTED</h5>
                    <ul>
                        <li>Over 20 years of luxury travel </li>
                        <li>First-hand experience of every destination</li>
                        <li>All holidays designed to suit individual needs</li>
                        <li>Only the best hotels and local partners used</li>
                        <li>24/7 support and emergency contact</li>
                    </ul>
                </div>
            </section>

            <section aria-label="Sign up htmlFor newsletter" className="newslettr_row">
                <div className="container-md">
                    <h4>Sign up htmlFor our newsletter</h4>
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
                    </form>*/}
                </div>
            </section>
        </Layout>
    );
}
